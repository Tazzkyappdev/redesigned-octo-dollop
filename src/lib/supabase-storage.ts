import { isSupabaseConfigured, supabase } from '@/src/lib/supabase'

const STORAGE_BUCKET = 'tazzky-assets'

function normalizeFileName(fileName: string): string {
  return fileName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.-]/g, '')
}

export async function uploadFileAndGetPublicUrl(file: File, folder: string): Promise<string> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase no esta configurado para subir archivos.')
  }

  const safeName = normalizeFileName(file.name)
  const uniquePart = `${Date.now()}-${crypto.randomUUID()}`
  const path = `${folder}/${uniquePart}-${safeName}`

  const { error: uploadError } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || undefined,
  })

  if (uploadError) {
    throw new Error(uploadError.message)
  }

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)

  if (!data.publicUrl) {
    throw new Error('No se pudo obtener la URL publica del archivo.')
  }

  return data.publicUrl
}
