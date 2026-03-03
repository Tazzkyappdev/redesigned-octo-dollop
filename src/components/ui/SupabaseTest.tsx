'use client'

import React, { useEffect, useState } from 'react'
import { getServiceCategories, getLandingStats } from '../../lib/supabase-functions'
import type { ServiceCategory, LandingStats } from '../../lib/supabase'

export const SupabaseTest = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [stats, setStats] = useState<LandingStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const testConnection = async () => {
      try {
        setLoading(true)
        setError(null)

        // Probar conexión con categorías
        const categoriesResult = await getServiceCategories()
        if (categoriesResult.success && categoriesResult.data) {
          setCategories(categoriesResult.data)
        } else {
          throw new Error('Error al cargar categorías')
        }

        // Probar conexión con estadísticas
        const statsResult = await getLandingStats()
        if (statsResult.success && statsResult.data) {
          setStats(statsResult.data)
        } else {
          throw new Error('Error al cargar estadísticas')
        }

      } catch (err) {
        console.error('Error testing Supabase connection:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    testConnection()
  }, [])

  if (loading) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          <span className="text-blue-700">Probando conexión con Supabase...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="text-red-700 font-medium">❌ Error de conexión:</span>
          <span className="text-red-600">{error}</span>
        </div>
        <div className="mt-2 text-sm text-red-600">
          Verifica que hayas ejecutado el script SQL en Supabase y que las variables de entorno estén configuradas.
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-green-700 font-medium">✅ Conexión exitosa con Supabase</span>
      </div>
      
      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium text-green-700">Categorías cargadas:</span>
          <span className="ml-2 text-sm text-green-600">{categories.length}</span>
        </div>
        
        {stats && (
          <div>
            <span className="text-sm font-medium text-green-700">Estadísticas:</span>
            <div className="ml-2 text-sm text-green-600">
              <div>• Total leads: {stats.totalLeads}</div>
              <div>• Profesionales: {stats.totalProfessionals}</div>
              <div>• Clientes: {stats.clientLeads}</div>
            </div>
          </div>
        )}
        
        <div className="text-xs text-green-600">
          Puedes eliminar este componente una vez que confirmes que todo funciona correctamente.
        </div>
      </div>
    </div>
  )
}
