'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, Lock, Mail, Shield } from 'lucide-react'
import { isSupabaseConfigured, supabase } from '@/src/lib/supabase'
import { isAllowedAdminEmail } from '@/src/lib/admin-auth'

export default function LoginAdminPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return

    const client = supabase

    let isMounted = true

    const checkSession = async () => {
      const { data, error: sessionError } = await client.auth.getSession()
      if (sessionError || !isMounted) return

      const userEmail = data.session?.user?.email
      if (isAllowedAdminEmail(userEmail)) {
        router.replace('/admin-secret-tazzky')
      }
    }

    checkSession()

    return () => {
      isMounted = false
    }
  }, [router])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const normalizedEmail = email.trim().toLowerCase()

    if (!isSupabaseConfigured || !supabase) {
      setError('No se pudo iniciar sesión en este momento.')
      return
    }

    const client = supabase

    if (!isAllowedAdminEmail(normalizedEmail)) {
      setError('Credenciales inválidas')
      return
    }

    setLoading(true)

    const { error: signInError } = await client.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    })

    if (signInError) {
      setError('Credenciales inválidas')
    } else {
      router.replace('/admin-secret-tazzky')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-4 py-10">
        <section className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl shadow-black/50">
          <div className="mb-5 space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/30 bg-lime-300/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-lime-200">
              <Shield size={14} />
              Admin Access
            </span>
            <h1 className="text-xl font-semibold text-white">Ingreso al Panel</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <label htmlFor="email" className="text-sm font-medium text-zinc-200">
              Correo electronico
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder=""
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-10 w-full rounded-lg border border-zinc-800 bg-black pl-10 pr-3 text-sm text-zinc-100 outline-none transition focus:border-lime-300/70 focus:ring-2 focus:ring-lime-200/20"
              />
            </div>

            <label htmlFor="password" className="text-sm font-medium text-zinc-200">
              Contrasena
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder=""
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-10 w-full rounded-lg border border-zinc-800 bg-black pl-10 pr-3 text-sm text-zinc-100 outline-none transition focus:border-lime-300/70 focus:ring-2 focus:ring-lime-200/20"
              />
            </div>

            {error && (
              <p className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                <AlertCircle size={16} />
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !isSupabaseConfigured}
              className="mt-1 h-10 w-full rounded-lg bg-lime-300 text-sm font-semibold text-black transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Validando...' : 'Entrar al Panel'}
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}
