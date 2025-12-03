'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface WaitlistModalProps {
	isOpen: boolean
	onClose: () => void
}

export const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
	const [formData, setFormData] = useState({
		nombre: '',
		email: '',
		telefono: '',
		codigoPostal: '',
		comoSeEntero: '',
		categoriaDeseada: ''
	})

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitError, setSubmitError] = useState<string | null>(null)

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) onClose()
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setSubmitError(null)
		setIsSubmitting(true)
		try {
			const { createLandingLead } = await import('../../lib/supabase-functions')

			const detalles: string[] = []
			if (formData.telefono) detalles.push(`Teléfono: ${formData.telefono}`)
			if (formData.codigoPostal) detalles.push(`CP: ${formData.codigoPostal}`)
			if (formData.comoSeEntero) detalles.push(`Origen: ${formData.comoSeEntero}`)
			if (formData.categoriaDeseada) detalles.push(`Interés: ${formData.categoriaDeseada}`)

			const result = await createLandingLead({
				email: formData.email,
				full_name: formData.nombre,
				interest_type: 'client',
				category: formData.categoriaDeseada || undefined,
				message: detalles.join(' | ') || undefined,
				notification_preference: true
			})

			if (!result.success) {
				const code = (result as any)?.error?.code
				const message = (result as any)?.error?.message
				if (code === '23505') {
					setSubmitError('Este email ya está registrado. Gracias por tu interés.')
				} else {
					setSubmitError(message || 'No pudimos guardar tu registro. Intenta de nuevo en unos minutos.')
				}
				return
			}

			onClose()
		} catch (err: any) {
			const message = err?.message || 'Ocurrió un error inesperado. Intenta de nuevo más tarde.'
			setSubmitError(message)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={handleBackdropClick}
				>
					<motion.div
						className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl w-full max-w-sm sm:max-w-md mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20"
						initial={{ scale: 0.9, opacity: 0, y: 16 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.9, opacity: 0, y: 16 }}
						transition={{ duration: 0.25 }}
					>
						{/* Header */}
						<div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200/50 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
							<h2 className="text-lg sm:text-xl font-bold text-gray-900">Unirse a la lista de espera</h2>
							<button onClick={onClose} className="p-1.5 sm:p-2 hover:bg-gray-100/50 rounded-full transition-colors">
								<X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
							</button>
						</div>

						<form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
							{submitError && (
								<div className="bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-lg p-2 sm:p-3">
									{submitError}
								</div>
							)}
							{/* Nombre */}
							<div>
								<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Nombre *</label>
								<input
									type="text"
									name="nombre"
									value={formData.nombre}
									onChange={handleChange}
									required
									className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent"
									placeholder="Tu nombre completo"
								/>
							</div>

							{/* Correo */}
							<div>
								<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Correo electrónico *</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
									className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent"
									placeholder="tu@email.com"
								/>
							</div>

							{/* Teléfono (opcional) */}
							<div>
								<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Número de teléfono (opcional)</label>
								<input
									type="tel"
									name="telefono"
									value={formData.telefono}
									onChange={handleChange}
									className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent"
									placeholder="+52 55 1234 5678"
								/>
							</div>

							{/* Código Postal (opcional) */}
							<div>
								<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Código postal (opcional)</label>
								<input
									type="text"
									name="codigoPostal"
									value={formData.codigoPostal}
									onChange={handleChange}
									className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent"
									placeholder="29000"
								/>
							</div>

							{/* ¿Cómo se enteró? */}
							<div>
								<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">¿Cómo se enteró de nosotros?</label>
								<select
									name="comoSeEntero"
									value={formData.comoSeEntero}
									onChange={handleChange}
									className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent"
								>
									<option value="">Selecciona una opción</option>
									<option value="Redes sociales">Redes sociales</option>
									<option value="Amigos/Referencias">Amigos/Referencias</option>
									<option value="Búsqueda en Google">Búsqueda en Google</option>
									<option value="Medios/Blogs">Medios/Blogs</option>
									<option value="Otro">Otro</option>
								</select>
							</div>

							{/* Servicio deseado */}
							<div>
								<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">¿Qué servicio te gustaría ver en la app?</label>
								<input
									type="text"
									name="categoriaDeseada"
									value={formData.categoriaDeseada}
									onChange={handleChange}
									className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent"
									placeholder="Ej. Fontanería para remodelaciones"
								/>
							</div>

							<button type="submit" disabled={isSubmitting} className={`w-full ${isSubmitting ? 'bg-[#A6C032] cursor-not-allowed' : 'bg-[#BADB3A] hover:bg-[#A6C032]'} text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg`}>
								{isSubmitting ? 'Enviando...' : 'Enviar'}
							</button>
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
