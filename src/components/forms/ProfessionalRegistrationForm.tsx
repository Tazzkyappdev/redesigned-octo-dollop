'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FileText, PhoneCall, Briefcase, CreditCard, CheckCircle, MapPin, Clock3, ShieldCheck } from 'lucide-react'
import { Button, Input, Select, Textarea, Checkbox } from '../ui'
import { createProfessionalRegistration } from '@/src/lib/supabase-functions'

const serviceCategories = [
	{
		group: 'DIGITALES · Artes gráficas y diseño',
		options: [
			{ value: 'digital-artes-logo-identidad', label: 'Logo e identidad de marca' },
			{ value: 'digital-artes-apps-web', label: 'Diseños de aplicaciones y sitios web' },
			{ value: 'digital-artes-ilustracion', label: 'Arte e ilustraciones' },
			{ value: 'digital-artes-arquitectura', label: 'Arquitectura y diseño de construcción' },
			{ value: 'digital-artes-producto-gaming', label: 'Producto y gaming' },
			{ value: 'digital-artes-visual', label: 'Diseño visual' },
			{ value: 'digital-artes-impresion', label: 'Diseño de impresión' },
			{ value: 'digital-artes-packing', label: 'Packaging y portadas' },
			{ value: 'digital-artes-3d', label: 'Diseño 3D' },
			{ value: 'digital-artes-marketing', label: 'Diseño de marketing' },
			{ value: 'digital-artes-moda', label: 'Diseño de moda y merchandise' },
		],
	},
	{
		group: 'DIGITALES · Programación y tecnología',
		options: [
			{ value: 'digital-tech-web', label: 'Sitios web' },
			{ value: 'digital-tech-apps', label: 'Desarrollo de aplicaciones' },
			{ value: 'digital-tech-software', label: 'Desarrollo de software' },
			{ value: 'digital-tech-mobile', label: 'Apps Móviles' },
			{ value: 'digital-tech-plataformas', label: 'Plataformas de sitios web' },
			{ value: 'digital-tech-soporte', label: 'Soporte y ciberseguridad' },
			{ value: 'digital-tech-blockchain', label: 'Blockchain y criptomonedas' },
		],
	},
	{
		group: 'DIGITALES · Marketing Digital',
		options: [
			{ value: 'digital-marketing-seo', label: 'Posicionamiento en buscadores' },
			{ value: 'digital-marketing-social', label: 'Redes sociales' },
			{ value: 'digital-marketing-metodos', label: 'Métodos y técnicas' },
			{ value: 'digital-marketing-analisis', label: 'Análisis y estrategia' },
			{ value: 'digital-marketing-industria', label: 'Industria y fines específicos' },
		],
	},
	{
		group: 'DIGITALES · Video y animación',
		options: [
			{ value: 'digital-video-edicion', label: 'Edición y postproducción' },
			{ value: 'digital-video-animacion', label: 'Animación' },
			{ value: 'digital-video-graficos', label: 'Gráficos animados' },
			{ value: 'digital-video-social', label: 'Videos sociales y de marketing' },
			{ value: 'digital-video-explicativos', label: 'Videos explicativos' },
			{ value: 'digital-video-productos', label: 'Videos de productos' },
			{ value: 'digital-video-otros', label: 'Otros' },
		],
	},
	{
		group: 'DIGITALES · Escritura y traducción',
		options: [
			{ value: 'digital-escritura-contenido', label: 'Redacción de contenido' },
			{ value: 'digital-escritura-edicion', label: 'Edición y crítica' },
			{ value: 'digital-escritura-traduccion', label: 'Traducción y transcripción' },
			{ value: 'digital-escritura-negocios', label: 'Contenido para negocios y marketing' },
			{ value: 'digital-escritura-profesional', label: 'Redacción profesional' },
			{ value: 'digital-escritura-otros', label: 'Otros' },
		],
	},
	{
		group: 'DIGITALES · Música y audio',
		options: [
			{ value: 'digital-audio-produccion', label: 'Producción y escritura musical' },
			{ value: 'digital-audio-ingenieria', label: 'Ingeniería en audio y postproducción' },
			{ value: 'digital-audio-voz', label: 'Voz en off y transmisión' },
			{ value: 'digital-audio-lecciones', label: 'Lecciones y transcripción' },
			{ value: 'digital-audio-sonido', label: 'Diseño de sonido' },
		],
	},
	{
		group: 'DIGITALES · Negocios',
		options: [
			{ value: 'digital-negocios-constitucion', label: 'Constitución y consultoría' },
			{ value: 'digital-negocios-operaciones', label: 'Operaciones y gestión' },
			{ value: 'digital-negocios-legales', label: 'Servicios jurídicos' },
			{ value: 'digital-negocios-ventas', label: 'Ventas y atención al cliente' },
		],
	},
	{
		group: 'FÍSICOS · Salud y bienestar',
		options: [
			{ value: 'fisicos-salud-medica', label: 'Atención médica a domicilio' },
			{ value: 'fisicos-salud-enfermeria', label: 'Enfermería' },
			{ value: 'fisicos-salud-adultos', label: 'Cuidado de adultos mayores' },
			{ value: 'fisicos-salud-masajes', label: 'Masajes terapéuticos' },
			{ value: 'fisicos-salud-psicologia', label: 'Psicología' },
			{ value: 'fisicos-salud-nutricion', label: 'Nutrición' },
			{ value: 'fisicos-salud-fisioterapia', label: 'Fisioterapia y rehabilitación' },
		],
	},
	{
		group: 'FÍSICOS · Mantenimiento del hogar',
		options: [
			{ value: 'fisicos-hogar-fontaneria', label: 'Fontanería' },
			{ value: 'fisicos-hogar-electricidad', label: 'Electricidad' },
			{ value: 'fisicos-hogar-electrodomesticos', label: 'Reparación de electrodomésticos' },
			{ value: 'fisicos-hogar-jardineria', label: 'Jardinería y mantenimiento de jardines' },
			{ value: 'fisicos-hogar-piscinas', label: 'Cuidado de piscinas' },
			{ value: 'fisicos-hogar-cerrajeria', label: 'Cerrajería' },
			{ value: 'fisicos-hogar-servicios-domesticos', label: 'Servicios domésticos' },
		],
	},
	{
		group: 'FÍSICOS · Reparación de automóviles y motos',
		options: [
			{ value: 'fisicos-autos-mecanica', label: 'Mecánica general' },
			{ value: 'fisicos-autos-chapa-pintura', label: 'Chapa y pintura' },
			{ value: 'fisicos-autos-preventivo', label: 'Mantenimiento preventivo' },
			{ value: 'fisicos-autos-motos', label: 'Mecánica de motocicletas' },
			{ value: 'fisicos-autos-llantas', label: 'Llantas y servicios rápidos' },
			{ value: 'fisicos-autos-estetica', label: 'Estética y detallado vehicular' },
		],
	},
	{
		group: 'FÍSICOS · Belleza y cuidado personal',
		options: [
			{ value: 'fisicos-belleza-peluqueria', label: 'Peluquería' },
			{ value: 'fisicos-belleza-estetica', label: 'Estética facial y corporal' },
			{ value: 'fisicos-belleza-manicura', label: 'Manicura y pedicura' },
			{ value: 'fisicos-belleza-barberia', label: 'Barbería' },
		],
	},
	{
		group: 'FÍSICOS · Eventos y entretenimiento',
		options: [
			{ value: 'fisicos-eventos-organizacion', label: 'Organización de eventos' },
			{ value: 'fisicos-eventos-alquiler', label: 'Alquiler de equipos' },
			{ value: 'fisicos-eventos-animacion', label: 'Animación' },
			{ value: 'fisicos-eventos-catering', label: 'Catering y banquetes' },
		],
	},
	{
		group: 'FÍSICOS · Cuidado de mascotas',
		options: [
			{ value: 'fisicos-mascotas-viajes', label: 'Cuidado durante viajes' },
			{ value: 'fisicos-mascotas-veterinario', label: 'Cuidado veterinario a domicilio' },
			{ value: 'fisicos-mascotas-paseo', label: 'Paseo y ejercicio' },
			{ value: 'fisicos-mascotas-estetica', label: 'Estética y grooming' },
		],
	},
	{
		group: 'FÍSICOS · Servicios profesionales',
		options: [
			{ value: 'fisicos-profesionales-legal', label: 'Asesoría legal' },
			{ value: 'fisicos-profesionales-contables', label: 'Servicios contables y financieros' },
		],
	},
	{
		group: 'FÍSICOS · Fotografía',
		options: [
			{ value: 'fisicos-foto-eventos', label: 'Fotografía para eventos' },
			{ value: 'fisicos-foto-productos', label: 'Fotografía de productos' },
			{ value: 'fisicos-foto-comida', label: 'Fotografía de comida' },
			{ value: 'fisicos-foto-lifestyle', label: 'Fotografía de estilo de vida y moda' },
			{ value: 'fisicos-foto-inmobiliaria', label: 'Fotografía inmobiliaria' },
			{ value: 'fisicos-foto-escenica', label: 'Fotografía escénica' },
		],
	},
]

const schema = z
	.object({
		representative_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
		business_name: z.string().min(2).max(100),
		specialty: z.string().min(2).max(100),
		service_category: z.string().min(2).max(100),
		years_experience: z
			.preprocess((val) => {
				if (val === '' || val === undefined || val === null) return undefined
				const num = Number(val)
				return isNaN(num) ? undefined : num
			}, z.coerce.number().min(0).max(70).optional()),
		service_city: z.string().min(2).max(50).optional().or(z.literal('')),
		phone: z.string().regex(/^[0-9+\s\-()]+$/).min(10).optional().or(z.literal('')),
		whatsapp: z.string().regex(/^[0-9+\s\-()]+$/).min(10).optional().or(z.literal('')),
		instagram_url: z.string().url().optional().or(z.literal('')),
		facebook_url: z.string().url().optional().or(z.literal('')),
		social_media_url: z.string().url().optional().or(z.literal('')),
		work_photo_url: z.string().url().optional().or(z.literal('')),
		service_type: z.string().min(1, 'Selecciona un tipo de servicio'),
		labor_price: z
			.preprocess((val) => {
				if (val === '' || val === undefined || val === null) return undefined
				const num = Number(val)
				return isNaN(num) ? undefined : num
			}, z.coerce.number().min(0).max(999999).optional()),
		requires_materials: z.boolean().default(false),
		service_zone: z.string().min(2).max(200).optional().or(z.literal('')),
		working_hours: z.string().min(3).max(200).optional().or(z.literal('')),
		bank_account_holder: z.string().min(2).max(100).optional().or(z.literal('')),
		clabe: z.string().regex(/^\d{18}$/).optional().or(z.literal('')),
		email: z.string().email(),		invitation_code: z.string().optional().or(z.literal('')),		terms_accepted: z.boolean().refine(v => v, { message: 'Debes aceptar los términos' }),
		payment_only_tazzky: z.boolean().refine(v => v, { message: 'Debes aceptar los términos de pago' }).optional(),
		no_off_platform_payment: z.boolean().refine(v => v, { message: 'Debes confirmar' }).optional(),
	})
	.superRefine((data, ctx) => {
		if (!data.phone && !data.whatsapp) {
			ctx.addIssue({ path: ['phone'], code: 'custom', message: 'Agrega teléfono o WhatsApp' })
			ctx.addIssue({ path: ['whatsapp'], code: 'custom', message: 'Agrega teléfono o WhatsApp' })
		}
	})

type FormData = z.infer<typeof schema>

export const ProfessionalRegistrationForm = () => {
	const [submitting, setSubmitting] = useState(false)
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [section, setSection] = useState(1)

	const steps = [
		{ number: 1, label: 'Identidad' },
		{ number: 2, label: 'Contacto' },
		{ number: 3, label: 'Servicio' },
		{ number: 4, label: 'Pagos' },
		{ number: 5, label: 'Legal' },
	]

	const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>({
		resolver: zodResolver(schema),
		mode: 'onBlur',
	} as any)

	const serviceType = watch('service_type')
	const filteredCategories = serviceCategories.filter((group) => {
		if (!serviceType) return false
		if (serviceType === 'digital') return group.group.startsWith('DIGITALES')
		if (serviceType === 'fisico') return group.group.startsWith('FÍSICOS')
		return false
	})

	const onSubmit = async (data: FormData) => {
		try {
			setSubmitting(true)
			setError(null)
			
			// Enviar datos a Supabase tal como vienen del formulario
			const result = await createProfessionalRegistration(data)
			
			if (!result.success) {
				setError((result.error as any)?.message || 'Error al enviar el formulario')
				return
			}
			
			setSuccess(true)
			reset()
			setTimeout(() => setSection(1), 2000)
		} catch (err) {
			setError('Error al enviar el formulario: ' + (err as any)?.message || '')
		} finally {
			setSubmitting(false)
		}
	}

	if (success) {
		return (
			<div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
				<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h3 className="text-xl font-bold text-green-900 mb-2">¡Registro exitoso!</h3>
				<p className="text-green-700">Tu solicitud ha sido recibida. Te contactaremos pronto.</p>
			</div>
		)
	}

	const getErrorMessage = (error: any): string => {
		if (!error) return ''
		if (typeof error?.message === 'string') return error.message
		return 'Campo requerido'
	}

	return (
		<div className="max-w-3xl mx-auto">
			<div className="mb-12 space-y-3">
				<div className="flex gap-2">
					{steps.map((step) => (
						<div
							key={step.number}
							className={`flex-1 h-2 rounded-full transition ${
								step.number <= section
									? 'bg-gradient-to-r from-lime-400 to-green-500 shadow-[0_0_0_1px_rgba(132,204,22,0.4)]'
									: 'bg-slate-800'
							}`}
						/>
					))}
				</div>
				<div className="flex justify-between text-xs text-slate-400 px-1">
					{steps.map((step) => (
						<div key={step.number} className="flex flex-col items-center gap-1">
							<div
								className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold transition ${
									step.number <= section
										? 'bg-gradient-to-r from-lime-400 to-green-500 text-slate-950'
										: 'bg-slate-800 text-slate-400'
								}`}
							>
								{step.number}
							</div>
							<span className={step.number === section ? 'text-lime-200 font-semibold' : ''}>{step.label}</span>
						</div>
					))}
				</div>
				<p className="text-center text-sm text-slate-400">Paso {section} de 5</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit as any)} className="space-y-8">
				{section === 1 && (
					<div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
						<div className="flex items-center mb-6">
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-lime-400 to-green-500 flex items-center justify-center text-2xl mr-4">
								<FileText className="w-6 h-6 text-slate-950" />
							</div>
							<h2 className="text-2xl font-bold text-white">Identidad y especialidad</h2>
						</div>
						<p className="text-slate-300 mb-6">Cuéntanos quién eres y tu especialidad (los campos marcados con * son obligatorios)</p>
						<div className="grid md:grid-cols-2 gap-4">
							<Input label="Nombre completo del representante *" {...register('representative_name')} error={getErrorMessage(errors.representative_name)} />
							<Input label="Nombre comercial o negocio *" {...register('business_name')} error={getErrorMessage(errors.business_name)} />
						</div>
						<div className="grid md:grid-cols-2 gap-4 mt-4">
							<Input label="Especialidad principal *" placeholder="Ej. Electricista, Diseñador UI" {...register('specialty')} error={getErrorMessage(errors.specialty)} />
							<Input label="Años de experiencia" type="number" min={0} max={70} {...register('years_experience')} error={getErrorMessage(errors.years_experience)} />
					</div>
					<div className="grid md:grid-cols-2 gap-4 mt-4">
						<Input label="¿Tienes un Código de Invitación? (Opcional)" placeholder="Ingresa tu código de invitación" {...register('invitation_code')} error={getErrorMessage(errors.invitation_code)} />
					</div>
				</div>
				)}

				{section === 2 && (
					<div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
						<div className="flex items-center mb-6">
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-lime-400 to-green-500 flex items-center justify-center text-2xl mr-4">
								<PhoneCall className="w-6 h-6 text-slate-950" />
							</div>
							<h2 className="text-2xl font-bold text-white">Contacto</h2>
						</div>
						<p className="text-slate-300 mb-6">¿Cómo te contactamos y dónde operas? Teléfono o WhatsApp (al menos uno).</p>
						<div className="grid md:grid-cols-2 gap-4">
							<Input label="Teléfono" {...register('phone')} error={getErrorMessage(errors.phone)} />
							<Input label="WhatsApp" {...register('whatsapp')} error={getErrorMessage(errors.whatsapp)} />
						</div>
						<div className="grid md:grid-cols-2 gap-4 mt-4">
							<Input label="Correo electrónico *" type="email" {...register('email')} error={getErrorMessage(errors.email)} />
							<Input label="Ciudad principal de operación" placeholder="Ej. CDMX" {...register('service_city')} error={getErrorMessage(errors.service_city)} />
						</div>
						<div className="grid md:grid-cols-2 gap-4 mt-4">
							<Input
								label="Instagram del negocio o representante"
								placeholder="https://instagram.com/tuusuario"
								{...register('instagram_url')}
								error={getErrorMessage(errors.instagram_url)}
								helperText="Opcional"
							/>
							<Input
								label="Facebook del negocio o representante"
								placeholder="https://facebook.com/tuusuario"
								{...register('facebook_url')}
								error={getErrorMessage(errors.facebook_url)}
								helperText="Opcional"
							/>
						</div>
					</div>
				)}

				{section === 3 && (
					<div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
						<div className="flex items-center mb-6">
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-lime-400 to-green-500 flex items-center justify-center text-2xl mr-4">
								<Briefcase className="w-6 h-6 text-slate-950" />
							</div>
							<h2 className="text-2xl font-bold text-white">Servicio</h2>
						</div>
						<p className="text-slate-300 mb-6">Configura tu servicio y disponibilidad</p>

						<div className="grid md:grid-cols-2 gap-4">
							<Select label="Tipo de servicio *" {...register('service_type')} error={getErrorMessage(errors.service_type)}>
								<option value="">Selecciona tipo</option>
								<option value="digital">Digital / remoto</option>
								<option value="fisico">Presencial / físico</option>
							</Select>
							<Select label="Categoría específica *" {...register('service_category')} error={getErrorMessage(errors.service_category)}>
								<option value="">Selecciona una categoría</option>
								{filteredCategories.map((group) => (
									<optgroup key={group.group} label={group.group}>
										{group.options.map((opt) => (
											<option key={opt.value} value={opt.value}>{opt.label}</option>
										))}
									</optgroup>
								))}
							</Select>
						</div>

						<div className="grid md:grid-cols-2 gap-4 mt-4">
							<Input label="Precio aproximado de mano de obra (MXN)" type="number" step="10" {...register('labor_price')} error={getErrorMessage(errors.labor_price)} />
							<div>
								<Checkbox label="¿Requiere materiales adicionales?" {...register('requires_materials')} />
								<p className="text-xs text-slate-400 mt-2">Marca esta opción si para realizar el servicio necesitas que el cliente proporcione o pague por materiales (pintura, tela, insumos, etc.)</p>
							</div>
						</div>

						<div className="grid md:grid-cols-2 gap-4 mt-6">
							<div className="bg-slate-900/40 border border-lime-400/30 rounded-xl p-4 space-y-3">
								<div className="flex items-center gap-2">
									<MapPin className="w-4 h-4 text-lime-300" />
									<p className="text-sm text-lime-200 font-semibold">Zona de atención</p>
								</div>
								<Textarea
									placeholder="Ej. Puebla centro y Cholula / En remoto"
									rows={3}
									{...register('service_zone')}
									error={getErrorMessage(errors.service_zone)}
								/>
								<p className="text-xs text-slate-400">(Opcional) Describe tus zonas de atención principales y si trabajas en remoto.</p>
							</div>

							<div className="bg-slate-900/40 border border-lime-400/30 rounded-xl p-4 space-y-3">
								<div className="flex items-center gap-2">
									<Clock3 className="w-4 h-4 text-lime-300" />
									<p className="text-sm text-lime-200 font-semibold">Horarios de atención</p>
								</div>
								<Textarea
									placeholder="Ej. Lun-Vie 9:00-18:00, Sáb 10:00-14:00. Indica si atiendes emergencias o fines de semana."
									rows={3}
									{...register('working_hours')}
									error={getErrorMessage(errors.working_hours)}
								/>
								<p className="text-xs text-slate-400">(Opcional) Escribe tus horarios con días, rangos y si ofreces emergencias o turnos nocturnos.</p>
							</div>
						</div>
					</div>
				)}

				{section === 4 && (
					<div className="bg-gradient-to-br from-slate-800/60 to-slate-700/30 border border-slate-700/60 rounded-2xl p-8 backdrop-blur-sm">
						<div className="flex items-center mb-6">
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-lime-400 to-green-500 flex items-center justify-center text-2xl mr-4 shadow-[0_10px_30px_-12px_rgba(132,204,22,0.5)]">
								<CreditCard className="w-6 h-6 text-slate-950" />
							</div>
							<div>
								<h2 className="text-2xl font-bold text-white">Información de Pagos</h2>
								<p className="text-slate-300 text-sm">Solo para depositarte tus ganancias. Puedes completarlo después.</p>
							</div>
						</div>

						<div className="grid md:grid-cols-3 gap-3 mb-6 text-xs text-slate-300">
							<div className="flex items-center gap-2 rounded-lg border border-slate-700/70 bg-slate-900/60 px-3 py-2">
								<ShieldCheck className="w-4 h-4 text-lime-300" />
								<span>Datos encriptados y privados</span>
							</div>
							<div className="flex items-center gap-2 rounded-lg border border-slate-700/70 bg-slate-900/60 px-3 py-2">
								<CheckCircle className="w-4 h-4 text-lime-300" />
								<span>Solo se usa para depositar</span>
							</div>
							<div className="flex items-center gap-2 rounded-lg border border-slate-700/70 bg-slate-900/60 px-3 py-2">
								<CreditCard className="w-4 h-4 text-lime-300" />
								<span>Compatible con bancos MX</span>
							</div>
						</div>

						<div className="space-y-4">
							<Input
								label="Nombre del titular de la cuenta bancaria"
								placeholder="Tal como aparece en tu cuenta"
								{...register('bank_account_holder')}
								error={getErrorMessage(errors.bank_account_holder)}
							/>
							<Input
								label="CLABE interbancaria (18 dígitos)"
								placeholder="Ej. 002910700123456789"
								maxLength={18}
								{...register('clabe')}
								error={getErrorMessage(errors.clabe)}
							/>
							<div className="bg-slate-900/70 border border-lime-400/30 rounded-lg p-4 text-sm text-slate-200">
								<p className="flex items-start gap-2">
									<span className="text-lime-300">ℹ️</span>
									<span>
										Tu CLABE es el número de 18 dígitos que identifica tu cuenta bancaria en México. La usamos únicamente para depositar tus ganancias.
										Puedes editarla o completarla después desde tu perfil.
									</span>
								</p>
							</div>
						</div>
					</div>
				)}

			{section === 5 && (
				<div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-700/30 rounded-2xl p-8 backdrop-blur-sm">
					<div className="flex items-center mb-6">
						<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-lime-400 to-green-500 flex items-center justify-center text-2xl mr-4">
							<CheckCircle className="w-6 h-6 text-slate-950" />
						</div>
						<h2 className="text-2xl font-bold text-white">Aceptación Legal</h2>
					</div>
					<p className="text-slate-300 mb-6">Últimos pasos para activar tu cuenta</p>
					
					{/* Link a términos y condiciones */}
					<div className="bg-lime-400/10 border border-lime-400/30 rounded-lg p-4 mb-6">
						<p className="text-slate-200 mb-3">
							📄 Antes de continuar, es importante que revises nuestros términos y condiciones del programa piloto:
						</p>
						<a 
							href="/terminos-condiciones-piloto" 
							target="_blank" 
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-lime-400 to-green-500 text-slate-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-lime-400/50 transition"
						>
							Ver Términos y Condiciones del Programa Piloto
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
							</svg>
						</a>
					</div>

					<div className="space-y-4">
						<Checkbox label="Acepto los Términos y Condiciones del Programa Piloto de Tazzky *" {...register('terms_accepted')} />
						{errors.terms_accepted && <p className="text-red-400 text-sm">{getErrorMessage(errors.terms_accepted)}</p>}
						<Checkbox label="Acepto que todos los pagos se gestionen únicamente por Tazzky *" {...register('payment_only_tazzky')} />
						{errors.payment_only_tazzky && <p className="text-red-400 text-sm">{getErrorMessage(errors.payment_only_tazzky)}</p>}
						<Checkbox label="Entiendo que está prohibido cobrar por fuera de la plataforma *" {...register('no_off_platform_payment')} />
						{errors.no_off_platform_payment && <p className="text-red-400 text-sm">{getErrorMessage(errors.no_off_platform_payment)}</p>}
						<div className="bg-red-500/10 border border-red-500/40 rounded-lg p-4 mt-4">
							<p className="text-sm text-red-300">🛑 <strong>Importante:</strong> Cobrar por fuera de Tazzky viola nuestros términos y resultará en suspensión permanente.</p>
						</div>
					</div>
				</div>
			)}				{error && (
					<div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
						<p className="text-red-300">{error}</p>
					</div>
				)}

				<div className="flex gap-4 justify-between pt-4">
					<button
						type="button"
						onClick={() => setSection(Math.max(1, section - 1))}
						disabled={section === 1}
						className="px-8 py-3 rounded-lg border border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
					>
						← Anterior
					</button>
					{section === 5 ? (
						<button
							type="submit"
							disabled={submitting}
							className="px-8 py-3 rounded-lg bg-gradient-to-r from-lime-400 to-green-500 text-slate-950 font-bold hover:shadow-lg hover:shadow-lime-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
						>
							{submitting ? 'Enviando...' : '✓ Completar Registro'}
						</button>
					) : (
						<button
							type="button"
							onClick={() => setSection(Math.min(5, section + 1))}
							className="px-8 py-3 rounded-lg bg-gradient-to-r from-lime-400 to-green-500 text-slate-950 font-bold hover:shadow-lg hover:shadow-lime-400/50 transition"
						>
							Siguiente →
						</button>
					)}
				</div>
			</form>
		</div>
	)
}