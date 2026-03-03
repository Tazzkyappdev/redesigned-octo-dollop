import type { Metadata } from 'next'
import { Header, Footer } from '../../src/components/layout'

export const metadata: Metadata = {
	title: 'Política legal y de privacidad | Tazzky',
	description:
		'Lee nuestra política legal y de privacidad. Conoce cómo protegemos tus datos personales y el marco legal de uso de Tazzky.',
}

export default function PoliticaPrivacidadPage() {
	return (
		<div className="min-h-screen bg-white">
			<Header />
			<main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 text-gray-900">
				<h1 className="text-3xl md:text-4xl font-bold mb-6">Política legal y de privacidad</h1>
				<p className="text-sm text-gray-600 mb-10">Última actualización: 01/01/2025</p>

				<section className="prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#4C7A0E]">
					<h2>1. Introducción</h2>
					<p>
						En Tazzky valoramos tu confianza. Esta política explica de forma clara cómo
						recopilamos, usamos y protegemos tu información, así como los términos
						legales que rigen el uso de nuestra plataforma.
					</p>

					<h2>2. Datos que recopilamos</h2>
					<ul className="list-disc pl-6">
						<li>Datos de contacto: nombre, correo electrónico y teléfono.</li>
						<li>
							Datos de uso: información técnica y de interacción para mejorar la
							experiencia.
						</li>
						<li>Datos de verificación para profesionales cuando aplique.</li>
					</ul>

					<h2>3. Uso de la información</h2>
					<p>Utilizamos los datos para:</p>
					<ul className="list-disc pl-6">
						<li>Proveer y mantener los servicios de la plataforma.</li>
						<li>Comunicarnos contigo y responder a solicitudes.</li>
						<li>Mejorar seguridad, calidad y rendimiento.</li>
					</ul>

					<h2>4. Bases legales</h2>
					<p>
						Tratamos tus datos con base en tu consentimiento, la ejecución de un
						contrato y el interés legítimo de mejora y seguridad del servicio.
					</p>

					<h2>5. Conservación y seguridad</h2>
					<p>
						Aplicamos medidas técnicas y organizativas razonables. Conservamos los datos
						durante el tiempo necesario para los fines indicados o los requeridos por ley.
					</p>

					<h2>6. Compartición de datos</h2>
					<p>
						Podemos compartir datos con proveedores que actúan en nuestro nombre y con
						autoridades cuando exista obligación legal.
					</p>

					<h2>7. Tus derechos</h2>
					<ul className="list-disc pl-6">
						<li>Acceso, rectificación, supresión y portabilidad.</li>
						<li>Oposición y limitación del tratamiento.</li>
						<li>Retiro del consentimiento en cualquier momento.</li>
					</ul>

					<h2>8. Aviso legal</h2>
					<p>
						El uso de Tazzky implica la aceptación de nuestros Términos y Condiciones.
						La información presentada en la plataforma no constituye asesoramiento
						profesional ni garantía de resultado.
					</p>

					<h2>9. Contacto</h2>
					<p>
						Si tienes dudas sobre esta política o deseas ejercer tus derechos, contáctanos
						a través del formulario en la sección «Contáctanos» en el pie de página.
					</p>
				</section>
			</main>
			<Footer />
		</div>
	)
}


