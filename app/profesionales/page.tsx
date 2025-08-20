import { Header, Footer } from '../../src/components/layout'
import { Hero, Benefits, Process, Steps, EarlyAccess } from '../../src/components/sections'

export default function Profesionales() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#E7F3BB] overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Process />
        <Steps />
        <EarlyAccess />
      </main>
      <Footer />
    </div>
  )
}
