'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Input, Select, Textarea, Checkbox } from '../ui'
import { createProfessionalApplication, checkEmailExists } from '../../lib/supabase-functions'
import { getServiceCategories } from '../../lib/supabase-functions'
import type { ServiceCategory } from '../../lib/supabase'

// Esquema de validación
const professionalFormSchema = z.object({
  full_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un email válido'),
  phone: z.string().optional(),
  category: z.string().min(1, 'Selecciona una categoría'),
  experience_years: z.number().min(0, 'Los años de experiencia no pueden ser negativos'),
  portfolio_url: z.string().url('Ingresa una URL válida').optional().or(z.literal('')),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  availability: z.enum(['full-time', 'part-time']),
  terms_accepted: z.boolean().refine(val => val === true, 'Debes aceptar los términos')
})

type ProfessionalFormData = z.infer<typeof professionalFormSchema>

export const ProfessionalForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [isClient, setIsClient] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProfessionalFormData>({
    resolver: zodResolver(professionalFormSchema),
    defaultValues: {
      availability: 'part-time',
      terms_accepted: false
    }
  })

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

  const onSubmit = async (data: ProfessionalFormData) => {
    try {
      setIsSubmitting(true)
      setSubmitError(null)

      // Verificar si el email ya existe
      const emailCheck = await checkEmailExists(data.email)
      if (emailCheck.success && emailCheck.exists) {
        setSubmitError('Este email ya está registrado. ¿Ya te registraste anteriormente?')
        return
      }

      // Crear la aplicación de profesional
      const result = await createProfessionalApplication({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        category: data.category,
        subcategories: [], // Por ahora vacío, se puede expandir después
        experience_years: data.experience_years,
        portfolio_url: data.portfolio_url || undefined,
        description: data.description,
        availability: data.availability
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
          ¡Aplicación enviada!
        </h3>
        <p className="text-green-700 mb-4">
          Hemos recibido tu aplicación. Te contactaremos pronto para los siguientes pasos.
        </p>
        <div className="text-sm text-green-600 space-y-1">
          <p>✅ Revisaremos tu perfil en 24-48 horas</p>
          <p>✅ Te enviaremos un email con más información</p>
          <p>✅ Acceso prioritario a la plataforma beta</p>
        </div>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="text-green-600 hover:text-green-700 font-medium mt-4"
        >
          Enviar otra aplicación
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
            Únete como profesional
          </h3>
          <p className="text-gray-600">
            Ofrece tus servicios en Tazzky y consigue más clientes. Acceso gratuito durante la beta.
          </p>
        </div>
        <div className="animate-pulse space-y-6">
          <div className="h-12 bg-gray-200 rounded-lg"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
          <div className="h-24 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-200" suppressHydrationWarning>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Únete como profesional
        </h3>
        <p className="text-gray-600">
          Ofrece tus servicios en Tazzky y consigue más clientes. Acceso gratuito durante la beta.
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

        {/* Teléfono */}
        <Input
          label="Teléfono (opcional)"
          type="tel"
          {...register('phone')}
          error={errors.phone?.message}
          placeholder="+52 55 1234 5678"
        />

        {/* Categoría principal */}
        <Select
          label="Categoría principal de servicios"
          {...register('category')}
          error={errors.category?.message}
          placeholder="Selecciona tu categoría principal"
          required
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </Select>

        {/* Años de experiencia */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Años de experiencia
          </label>
          <select
            {...register('experience_years', { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Selecciona años de experiencia</option>
            <option value="0">Menos de 1 año</option>
            <option value="1">1 año</option>
            <option value="2">2 años</option>
            <option value="3">3 años</option>
            <option value="4">4 años</option>
            <option value="5">5 años</option>
            <option value="6">6-10 años</option>
            <option value="11">Más de 10 años</option>
          </select>
          {errors.experience_years && (
            <p className="text-red-600 text-sm mt-1">{errors.experience_years.message}</p>
          )}
        </div>

        {/* Portafolio/Website */}
        <Input
          label="Portafolio o website (opcional)"
          type="url"
          {...register('portfolio_url')}
          error={errors.portfolio_url?.message}
          placeholder="https://tuportafolio.com"
        />

        {/* Descripción de servicios */}
        <Textarea
          label="Describe tus servicios"
          {...register('description')}
          error={errors.description?.message}
          placeholder="Cuéntanos sobre los servicios que ofreces, tu experiencia y especialidades..."
          rows={4}
          required
        />

        {/* Disponibilidad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Disponibilidad
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                value="part-time"
                {...register('availability')}
                className="mr-2"
              />
              <span className="text-sm">Tiempo parcial</span>
            </label>
            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                value="full-time"
                {...register('availability')}
                className="mr-2"
              />
              <span className="text-sm">Tiempo completo</span>
            </label>
          </div>
          {errors.availability && (
            <p className="text-red-600 text-sm mt-1">{errors.availability.message}</p>
          )}
        </div>

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
              Enviando aplicación...
            </div>
          ) : (
            'Enviar aplicación'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>✅ Acceso prioritario a la beta</p>
        <p>✅ Sin comisiones durante la beta</p>
        <p>✅ Soporte directo del equipo</p>
        <p>✅ Posicionamiento destacado en el lanzamiento</p>
      </div>
    </div>
  )
}
