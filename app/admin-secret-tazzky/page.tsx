'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, ShieldAlert } from 'lucide-react'
import { AdminGigForm } from '@/src/components/admin/AdminGigForm'
import { isSupabaseConfigured, supabase } from '@/src/lib/supabase'
import { getAdminEmail, isAllowedAdminEmail } from '@/src/lib/admin-auth'

export default function AdminSecretTazzkyPage() {
  const router = useRouter()
  const adminEmail = useMemo(() => getAdminEmail(), [])

  const [authChecking, setAuthChecking] = useState(true)
  const [isAllowed, setIsAllowed] = useState(false)
  const [currentEmail, setCurrentEmail] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setAuthChecking(false)
      setIsAllowed(false)
      return
    }

    const client = supabase

    let isMounted = true

    const verifyAccess = async () => {
      const { data, error } = await client.auth.getSession()

      if (!isMounted) return

      const email = data.session?.user?.email ?? null
      const allowed = !error && isAllowedAdminEmail(email)

      setCurrentEmail(email)
      setIsAllowed(allowed)
      setAuthChecking(false)

      if (!allowed) {
        router.replace('/login-admin')
      }
    }

    verifyAccess()

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      const email = session?.user?.email ?? null
      const allowed = isAllowedAdminEmail(email)
      setCurrentEmail(email)
      setIsAllowed(allowed)

      if (!allowed) {
        router.replace('/login-admin')
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [router])

  const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    router.replace('/login-admin')
  }

  if (authChecking) {
    return (
      <main className="min-h-screen bg-black text-zinc-100">
        <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
          <p className="text-sm text-zinc-400">Validando sesión de administrador...</p>
        </div>
      </main>
    )
  }

  if (!isAllowed) {
    return (
      <main className="min-h-screen bg-black text-zinc-100">
        <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-6 text-center text-red-100">
            <ShieldAlert className="mx-auto mb-3" />
            <p>Acceso denegado. Redirigiendo al login admin...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <header className="mb-8 flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-lime-300">TAZZKY ADMIN</p>
            <h1 className="mt-2 text-2xl font-semibold text-white">Panel secreto de publicación</h1>
            <p className="mt-2 text-sm text-zinc-400">Sesión activa: {currentEmail ?? adminEmail}</p>
          </div>

          <button
            type="button"
            onClick={signOut}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-black px-4 text-sm text-zinc-200 transition hover:border-lime-300/60 hover:text-lime-200"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </header>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <p className="mb-6 text-sm text-zinc-400">
            Formulario único para crear profesional, gig, paquetes, portfolio y banner hero en una sola operación.
          </p>
          <AdminGigForm />
        </section>
      </div>
    </main>
  )
}
