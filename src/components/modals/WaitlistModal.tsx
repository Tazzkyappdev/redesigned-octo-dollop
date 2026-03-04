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
		categoriaDeseada: '',
		invitationCode: ''
	})

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitError, setSubmitError] = useState<string | null>(null)
	const [submitSuccess, setSubmitSuccess] = useState(false)

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			resetForm()
			onClose()
		}
	}

	const resetForm = () => {
		setFormData({ nombre: '', email: '', telefono: '', categoriaDeseada: '', invitationCode: '' })
		setSubmitError(null)
		setSubmitSuccess(false)
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
		setSubmitSuccess(false)
		setIsSubmitting(true)
		try {
			const { createLandingLead } = await import('../../lib/supabase-functions')

			const detalles: string[] = []
			if (formData.telefono) detalles.push(`Teléfono: ${formData.telefono}`)
			if (formData.categoriaDeseada) detalles.push(`Interés: ${formData.categoriaDeseada}`)
			if (formData.invitationCode) detalles.push(`Código de Invitación: ${formData.invitationCode}`)

			const result = await createLandingLead({
				email: formData.email,
				full_name: formData.nombre,
				interest_type: 'client',
				category: formData.categoriaDeseada || undefined,
				message: detalles.join(' | ') || undefined,
				notification_preference: true
			})

			if (!result.success) {
				// El error ya es un string amigable de supabase-functions.ts
				const errorMsg = typeof result.error === 'string' ? result.error : 'No pudimos guardar tu registro. Intenta de nuevo en unos minutos.'
				setSubmitError(errorMsg)
				setIsSubmitting(false)
				return
			}

			// Limpiar formulario inmediatamente después de éxito
			setFormData({ nombre: '', email: '', telefono: '', categoriaDeseada: '', invitationCode: '' })
			setIsSubmitting(false)
			setSubmitSuccess(true)
			
			// Cerrar modal después de 2.5 segundos
			setTimeout(() => {
				resetForm()
				onClose()
			}, 2500)
		} catch (err: any) {
			const message = err?.message || 'Ocurrió un error inesperado. Intenta de nuevo más tarde.'
			setSubmitError(message)
			setIsSubmitting(false)
		}
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={handleBackdropClick}
				>
					<motion.div
						className="bg-gray-900/95 backdrop-blur-md rounded-2xl sm:rounded-3xl w-full max-w-sm sm:max-w-md mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10"
						initial={{ scale: 0.9, opacity: 0, y: 16 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.9, opacity: 0, y: 16 }}
						transition={{ duration: 0.25 }}
					>
						{/* Header */}
						<div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-700/50 sticky top-0 bg-gray-900/95 backdrop-blur-sm z-10">
							<h2 className="text-lg sm:text-xl font-bold text-white">Únete a la lista de espera</h2>
							<button onClick={() => { resetForm(); onClose() }} className="p-1.5 sm:p-2 hover:bg-gray-800/50 rounded-full transition-colors">
								<X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
							</button>
						</div>

						<form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
							{submitSuccess && (
								<motion.div
									initial={{ opacity: 0, scale: 0.9, y: -15 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									transition={{ duration: 0.4 }}
									className="bg-gradient-to-br from-[#BADB3A]/20 to-lime-900/30 border-2 border-[#BADB3A] rounded-lg p-6 text-center shadow-2xl"
								>
									<p className="text-4xl sm:text-5xl mb-3 text-white animate-bounce">¡Gracias! ✓</p>
									<p className="text-white text-base sm:text-lg font-bold mb-3">
										Te hemos registrado exitosamente
									</p>
									<p className="text-white text-sm sm:text-base font-semibold mb-2">
										Confirma tu correo: <span className="font-mono text-[#BADB3A] bg-gray-900/50 px-2 py-1 rounded">{formData.email}</span>
									</p>
									<p className="text-white text-xs sm:text-sm">
										Recibirás un email cuando abramos nuestros servicios
									</p>
									<div className="mt-4 flex justify-center gap-1">
										<div className="w-2 h-2 bg-[#BADB3A] rounded-full animate-pulse"></div>
										<div className="w-2 h-2 bg-[#BADB3A] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
										<div className="w-2 h-2 bg-[#BADB3A] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
									</div>
								</motion.div>
							)}
							{submitError && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className="bg-red-900/20 border border-red-500/30 text-red-200 text-xs sm:text-sm rounded-lg p-3"
								>
									{submitError}
								</motion.div>
							)}

							{!submitSuccess && (
								<>
									{/* Descripción */}
									<p className="text-gray-300 text-xs sm:text-sm font-semibold mb-4">
										Registra tu correo para ser de los primeros en contratar talento verificado sin riesgo.
									</p>

									{/* Nombre */}
									<div>
										<label className="block text-xs sm:text-sm font-medium text-gray-200 mb-1">Nombre *</label>
										<input
											type="text"
											name="nombre"
											value={formData.nombre}
											onChange={handleChange}
											required
											disabled={isSubmitting}
											className="w-full px-3 py-2.5 text-sm bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
											placeholder="Tu nombre completo"
										/>
									</div>

									{/* Correo */}
									<div>
										<label className="block text-xs sm:text-sm font-medium text-gray-200 mb-1">Correo electrónico *</label>
										<input
											type="email"
											name="email"
											value={formData.email}
											onChange={handleChange}
											required
											disabled={isSubmitting}
											className="w-full px-3 py-2.5 text-sm bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
											placeholder="tu@email.com"
										/>
									</div>

									{/* Teléfono (opcional) */}
									<div>
										<label className="block text-xs sm:text-sm font-medium text-gray-200 mb-1">Número de teléfono (opcional)</label>
										<input
											type="tel"
											name="telefono"
											value={formData.telefono}
											onChange={handleChange}
											disabled={isSubmitting}
											className="w-full px-3 py-2.5 text-sm bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
											placeholder="+52 55 1234 5678"
										/>
									</div>

									{/* Servicio deseado */}
									<div>
										<label className="block text-xs sm:text-sm font-medium text-gray-200 mb-1">¿Qué servicio te gustaría? (opcional)</label>
										<input
											type="text"
											name="categoriaDeseada"
											value={formData.categoriaDeseada}
											onChange={handleChange}
											disabled={isSubmitting}
											className="w-full px-3 py-2.5 text-sm bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
											placeholder="Ej. Fontanería, Electricidad..."
										/>
									</div>

									{/* Código de Invitación */}
									<div>
										<label className="block text-xs sm:text-sm font-medium text-gray-200 mb-1">¿Tienes un Código de Invitación? (Opcional)</label>
										<input
											type="text"
											name="invitationCode"
											value={formData.invitationCode}
											onChange={handleChange}
											disabled={isSubmitting}
											className="w-full px-3 py-2.5 text-sm bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
											placeholder="Ingresa tu código de invitación"
										/>
									</div>

									<button 
										type="submit" 
										disabled={isSubmitting}
										className={`w-full text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg ${
											isSubmitting
												? 'bg-[#A6C032] cursor-not-allowed'
												: 'bg-[#BADB3A] hover:bg-[#A6C032]'
										}`}
									>
										{isSubmitting ? 'Procesando...' : 'Avisarme cuando abran'}
									</button>
								</>
							)}
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
