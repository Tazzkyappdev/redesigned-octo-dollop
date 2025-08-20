'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Input, Select, Textarea, Checkbox } from '../ui'
import { createLandingLead, checkEmailExists } from '../../lib/supabase-functions'
import { getServiceCategories } from '../../lib/supabase-functions'
import type { ServiceCategory } from '../../lib/supabase'

// Esquema de validación
const leadFormSchema = z.object({
  full_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un email válido'),
  interest_type: z.enum(['client', 'professional']),
  category: z.string().optional(),
  message: z.string().optional(),
  notification_preference: z.boolean().default(true),
  terms_accepted: z.boolean().refine(val => val === true, 'Debes aceptar los términos')
})

type LeadFormData = z.infer<typeof leadFormSchema>

export const LeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [isClient, setIsClient] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      interest_type: 'client',
      notification_preference: true,
      terms_accepted: false
    }
  })

  const interestType = watch('interest_type')

  // Cargar categorías al montar el componente
  React.useEffect(() => {
    setIsClient(true)
    const loadCategories = async () => {
      const result = await getServiceCategories()
      if (result.success && result.data) {
        setCategories(result.data)
      }
    }
    loadCategories()
  }, [])

  const onSubmit = async (data: LeadFormData) => {
    try {
      setIsSubmitting(true)
      setSubmitError(null)

      // Verificar si el email ya existe
      const emailCheck = await checkEmailExists(data.email)
      if (emailCheck.success && emailCheck.exists) {
        setSubmitError('Este email ya está registrado. ¿Ya te registraste anteriormente?')
        return
      }

      // Crear el lead
      const result = await createLandingLead({
        email: data.email,
        full_name: data.full_name,
        interest_type: data.interest_type,
        category: data.category,
        message: data.message,
        notification_preference: data.notification_preference
      })

      if (result.success) {
        setSubmitSuccess(true)
        reset()
      } else {
        setSubmitError('Error al enviar el formulario. Intenta nuevamente.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError('Error inesperado. Intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-green-900 mb-2">
          ¡Registro exitoso!
        </h3>
        <p className="text-green-700 mb-4">
          Te hemos agregado a nuestra lista de espera. Te notificaremos cuando tengas acceso a la beta.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="text-green-600 hover:text-green-700 font-medium"
        >
          Registrar otro email
        </button>
      </div>
    )
  }

  // No renderizar el formulario hasta que esté en el cliente
  if (!isClient) {
    return (
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-200">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Únete a la beta
          </h3>
          <p className="text-gray-600">
            Sé de los primeros en experimentar Tazzky. Acceso gratuito y sin comisiones.
          </p>
        </div>
        <div className="animate-pulse space-y-6">
          <div className="h-12 bg-gray-200 rounded-lg"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-200" suppressHydrationWarning>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Únete a la beta
        </h3>
        <p className="text-gray-600">
          Sé de los primeros en experimentar Tazzky. Acceso gratuito y sin comisiones.
        </p>
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700 text-sm">{submitError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nombre completo */}
        <Input
          label="Nombre completo"
          {...register('full_name')}
          error={errors.full_name?.message}
          placeholder="Tu nombre completo"
          required
        />

        {/* Email */}
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          placeholder="tu@email.com"
          required
        />

        {/* Tipo de interés */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ¿Qué te interesa?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                value="client"
                {...register('interest_type')}
                className="mr-2"
              />
              <span className="text-sm">Buscar servicios</span>
            </label>
            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                value="professional"
                {...register('interest_type')}
                className="mr-2"
              />
              <span className="text-sm">Ofrecer servicios</span>
            </label>
          </div>
          {errors.interest_type && (
            <p className="text-red-600 text-sm mt-1">{errors.interest_type.message}</p>
          )}
        </div>

        {/* Categoría (solo si es cliente) */}
        {interestType === 'client' && categories.length > 0 && (
          <Select
            label="Categoría de interés (opcional)"
            {...register('category')}
            placeholder="Selecciona una categoría"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Select>
        )}

        {/* Mensaje */}
        <Textarea
          label="Mensaje (opcional)"
          {...register('message')}
          placeholder="Cuéntanos qué servicios te interesan o cualquier pregunta que tengas..."
          rows={3}
        />

        {/* Preferencias de notificación */}
        <Checkbox
          label="Quiero recibir notificaciones sobre el lanzamiento de la beta"
          {...register('notification_preference')}
        />

        {/* Términos y condiciones */}
        <Checkbox
          label="Acepto los términos y condiciones y la política de privacidad"
          {...register('terms_accepted')}
          error={errors.terms_accepted?.message}
        />

        {/* Botón de envío */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Enviando...
            </div>
          ) : (
            'Obtener acceso beta'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>✅ Acceso gratuito durante la beta</p>
        <p>✅ Sin comisiones por transacciones</p>
        <p>✅ Soporte directo del equipo</p>
      </div>
    </div>
  )
}
