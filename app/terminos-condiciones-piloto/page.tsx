'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TerminosCondicionesPiloto() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-950">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/profesionales-registro" 
            className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al registro
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Términos y Condiciones del Programa Piloto
          </h1>
          <p className="text-slate-400">
            Última actualización: Diciembre 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 space-y-8 text-slate-300">
          
          <section>
            <p className="mb-4">
              Al registrarte, acceder o participar como profesional dentro del Programa Piloto de Tazzky, 
              aceptas expresamente los presentes Términos y Condiciones.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. OBJETO</h2>
            <p className="mb-4">
              Los presentes Términos y Condiciones tienen por objeto regular la participación de los Profesionistas 
              dentro del Programa Piloto de Tazzky, plataforma tecnológica de intermediación en etapa de desarrollo, 
              mediante la cual se facilita la conexión entre clientes y prestadores de servicios independientes, 
              así como la gestión operativa, comunicación y administración provisional de pagos.
            </p>
            <p>
              Tazzky actúa exclusivamente como intermediario tecnológico y no como empleador, socio, representante, 
              agencia ni subordinado del Profesionista, quien conserva total independencia en la prestación de sus servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. ALCANCE DEL PROGRAMA PILOTO Y USO DE HERRAMIENTAS TEMPORALES</h2>
            <p className="mb-4">
              Tazzky se encuentra en fase de validación operativa. Durante este periodo, podrá utilizar herramientas externas, 
              sistemas de terceros, formularios, chats, enlaces de pago y mecanismos tecnológicos provisionales para simular, 
              operar y validar el modelo de negocio.
            </p>
            <p className="mb-4">
              El Profesionista acepta que dichas herramientas son temporales y podrán ser modificadas, sustituidas o eliminadas 
              sin previo aviso.
            </p>
            <p className="font-semibold text-white mb-2">Tazzky no garantiza:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>volumen mínimo de servicios</li>
              <li>ingresos</li>
              <li>continuidad operativa</li>
              <li>estabilidad técnica absoluta</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. OBLIGACIONES DEL PROFESIONISTA</h2>
            <p className="mb-4">El Profesionista se obliga a:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Prestar sus servicios con calidad, profesionalismo y diligencia</li>
              <li>Proporcionar información veraz, completa y actualizada</li>
              <li>Cumplir fechas y horarios acordados con los clientes</li>
              <li>Utilizar exclusivamente los mecanismos de cobro autorizados por Tazzky</li>
              <li>Gestionar materiales únicamente a través de Tazzky cuando aplique</li>
              <li>No solicitar ni recibir pagos externos</li>
              <li>Utilizar las herramientas temporales indicadas por Tazzky</li>
              <li>Mantener comunicación profesional con clientes y con Tazzky</li>
              <li>Contar con las capacidades técnicas necesarias</li>
              <li>Reportar incidentes, disputas o irregularidades</li>
              <li>Aceptar ajustes operativos propios del proceso de validación</li>
            </ul>
            <p className="mt-4 text-yellow-400">
              El incumplimiento podrá derivar en suspensión o baja definitiva.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. OBLIGACIONES DE TAZZKY</h2>
            <p className="mb-4">Tazzky se compromete a:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Facilitar el acceso al ecosistema tecnológico provisional</li>
              <li>Administrar temporalmente los pagos realizados por los clientes</li>
              <li>Liberar los fondos una vez validado el servicio</li>
              <li>Proteger la integridad de las operaciones</li>
              <li>Brindar soporte operativo básico</li>
              <li>Notificar cambios operativos relevantes</li>
              <li>Actuar como custodio temporal de fondos, sin fungir como entidad financiera</li>
              <li>Implementar medidas razonables de seguridad</li>
              <li>Mantener neutralidad comercial</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. PAGOS Y COMISIONES</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Todos los pagos deberán realizarse exclusivamente a través de Tazzky</li>
              <li>Tazzky retendrá temporalmente los fondos hasta la correcta validación del servicio</li>
              <li>Durante el Programa Piloto no se aplicarán comisiones por intermediación</li>
              <li>Las tarifas de pasarelas de pago externas serán cubiertas por el usuario final</li>
              <li>Los cobros externos constituyen incumplimiento grave</li>
              <li>Estas condiciones aplican tanto para servicios físicos como digitales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. PASARELAS DE PAGO</h2>
            <p>
              Tazzky podrá utilizar pasarelas externas como Stripe, Openpay, Mercado Pago u otras. 
              El Profesionista reconoce que dichas plataformas operan de forma independiente y que sus tiempos, 
              comisiones y políticas no son responsabilidad de Tazzky.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. VALIDACIÓN DE SERVICIOS Y LIBERACIÓN DE FONDOS</h2>
            <p className="mb-4">Una vez concluido el servicio, Tazzky verificará:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>que el cliente recibió el servicio</li>
              <li>que no existan disputas</li>
              <li>que los materiales fueron utilizados conforme a lo cotizado</li>
            </ul>
            <p className="mb-2">La validación podrá tardar entre 24 y 72 horas.</p>
            <p>Tazzky podrá retener fondos en caso de disputas, reclamos o incumplimientos.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. CONFIDENCIALIDAD Y PROTECCIÓN DE DATOS</h2>
            <p className="mb-4">
              Toda información operativa, técnica, financiera, comercial o estratégica será considerada confidencial.
            </p>
            <p className="mb-4">El Profesionista se obliga a:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>No divulgar información interna</li>
              <li>No utilizar datos de clientes fuera de los canales autorizados</li>
              <li>No replicar el modelo de negocio</li>
              <li>Proteger la información recibida</li>
            </ul>
            <p>
              Las obligaciones de confidencialidad permanecerán vigentes por cinco (5) años tras la terminación.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. RESPONSABILIDAD DURANTE EL PROGRAMA PILOTO</h2>
            <p className="mb-4">El Profesionista reconoce que:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>la plataforma puede presentar fallas técnicas</li>
              <li>existen ajustes constantes</li>
              <li>no hay garantías comerciales</li>
              <li>Tazzky no es responsable por la ejecución del servicio</li>
            </ul>
            <p>
              La responsabilidad de Tazzky se limita exclusivamente a la administración tecnológica del proceso.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. LIMITACIÓN DE RESPONSABILIDAD</h2>
            <p className="mb-4">Tazzky no será responsable por:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>fallas del Profesionista</li>
              <li>daños a terceros</li>
              <li>pérdidas económicas</li>
              <li>cancelaciones</li>
              <li>falta de clientes</li>
              <li>decisiones de pasarelas de pago</li>
            </ul>
            <p>
              Cualquier responsabilidad atribuible a Tazzky se limitará al monto retenido no dispersado del servicio específico.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. VIGENCIA Y TERMINACIÓN</h2>
            <p>
              La participación en el Programa Piloto podrá ser suspendida o terminada por cualquiera de las partes 
              sin responsabilidad adicional.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. ACEPTACIÓN DIGITAL</h2>
            <p className="mb-4">
              Al registrarse y marcar la casilla correspondiente, el Profesionista declara que ha leído, entendido 
              y aceptado íntegramente estos Términos y Condiciones.
            </p>
            <p className="text-yellow-400">
              El presente documento es válido aun cuando Tazzky opere en etapa previa a su formal constitución como persona moral.
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link 
            href="/profesionales-registro" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-lime-400 to-green-500 text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-lime-400/50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al registro
          </Link>
        </div>
      </div>
    </div>
  )
}
