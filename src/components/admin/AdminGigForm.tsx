'use client'

import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { Pencil, Plus, RefreshCcw, Trash2, Upload } from 'lucide-react'
import { type SupabaseClient } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '@/src/lib/supabase'
import { isAllowedAdminEmail } from '@/src/lib/admin-auth'
import { uploadFileAndGetPublicUrl } from '@/src/lib/supabase-storage'
import { SUPPORTED_CURRENCIES, type SupportedCurrency, normalizeCurrency } from '@/src/lib/currency'

interface CategoryOption {
  id: string
  name: string
  slug: string
}

const FIXED_CATEGORY_SLUGS = [
  'diseno',
  'tecnologia',
  'marketing',
  'foto-video',
  'escritura-y-traduccion',
  'musica-y-audio',
  'negocios',
] as const

const FIXED_CATEGORY_LABELS: Record<(typeof FIXED_CATEGORY_SLUGS)[number], string> = {
  diseno: 'Artes gráficas y diseño',
  tecnologia: 'Programación y tecnología',
  marketing: 'Marketing Digital',
  'foto-video': 'Video y animación',
  'escritura-y-traduccion': 'Escritura y traducción',
  'musica-y-audio': 'Música y audio',
  negocios: 'Negocios',
}

interface PackageInput {
  uiId: number
  type: string
  description: string
  price: string
  currency: SupportedCurrency
  deliveryDays: string
  features: string[]
}

interface PortfolioInput {
  uiId: number
  title: string
  description: string
  existingImageUrl: string | null
  workDate: string
  priceRange: string
  duration: string
}

interface ManagedGigRow {
  id: string
  proId: string
  title: string
  slug: string
  description: string
  categoryId: string | null
  coverImage: string | null
  proFullName: string
  proAvatarUrl: string | null
  proIsTopTalent: boolean
  proIsVerified: boolean
  proLocation: string | null
  proLanguages: string | null
  proBio: string | null
}

interface CoverImagePreview {
  url: string
  name: string
}

const defaultPackage = (uiId: number): PackageInput => ({
  uiId,
  type: '',
  description: '',
  price: '',
  currency: 'MXN',
  deliveryDays: '',
  features: [''],
})

const defaultPortfolio = (uiId: number): PortfolioInput => ({
  uiId,
  title: '',
  description: '',
  existingImageUrl: null,
  workDate: '',
  priceRange: '',
  duration: '',
})

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

async function resolveUniqueGigSlug(
  client: SupabaseClient,
  baseSlug: string,
  currentGigId: string | null = null,
): Promise<string> {
  let candidateSlug = baseSlug
  let suffix = 2

  while (true) {
    const { data, error } = await client
      .from('gigs')
      .select('id')
      .eq('slug', candidateSlug)
      .limit(1)

    if (error) {
      throw new Error(error.message)
    }

    const existingGig = data?.[0]
    if (!existingGig || existingGig.id === currentGigId) {
      return candidateSlug
    }

    candidateSlug = `${baseSlug}-${suffix}`
    suffix += 1
  }
}

export function AdminGigForm() {
  const gigFormRef = useRef<HTMLDivElement | null>(null)

  const [activeTab, setActiveTab] = useState<'gig' | 'banner'>('gig')
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [loadingManagedGigs, setLoadingManagedGigs] = useState(true)
  const [managedGigs, setManagedGigs] = useState<ManagedGigRow[]>([])
  const [deletingGigId, setDeletingGigId] = useState<string | null>(null)

  const [savingGig, setSavingGig] = useState(false)
  const [savingBanner, setSavingBanner] = useState(false)

  const [gigError, setGigError] = useState<string | null>(null)
  const [gigSuccess, setGigSuccess] = useState<string | null>(null)
  const [bannerError, setBannerError] = useState<string | null>(null)
  const [bannerSuccess, setBannerSuccess] = useState<string | null>(null)

  const [fullName, setFullName] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [existingAvatarUrl, setExistingAvatarUrl] = useState<string | null>(null)
  const [isTopTalent, setIsTopTalent] = useState(false)
  const [isVerified, setIsVerified] = useState(true)
  const [location, setLocation] = useState('')
  const [languages, setLanguages] = useState('')
  const [bio, setBio] = useState('')
  const [editingProId, setEditingProId] = useState<string | null>(null)

  const [categoryId, setCategoryId] = useState('')
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [slugEdited, setSlugEdited] = useState(false)
  const [description, setDescription] = useState('')
  const [coverImageFiles, setCoverImageFiles] = useState<File[]>([])
  const [coverImagePreviews, setCoverImagePreviews] = useState<CoverImagePreview[]>([])
  const [existingCoverImageUrl, setExistingCoverImageUrl] = useState<string | null>(null)
  const [editingGigId, setEditingGigId] = useState<string | null>(null)

  const [heroImageFile, setHeroImageFile] = useState<File | null>(null)
  const [heroTitle, setHeroTitle] = useState('')
  const [heroSubtitle, setHeroSubtitle] = useState('')
  const [heroCtaLink, setHeroCtaLink] = useState('')
  const [heroIsActive, setHeroIsActive] = useState(true)

  const [packages, setPackages] = useState<PackageInput[]>([defaultPackage(1)])
  const [portfolioItems, setPortfolioItems] = useState<PortfolioInput[]>([defaultPortfolio(1)])
  const [portfolioFiles, setPortfolioFiles] = useState<Record<number, File | null>>({ 1: null })
  const [counter, setCounter] = useState(2)

  const loadManagedGigs = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoadingManagedGigs(false)
      return
    }

    setLoadingManagedGigs(true)

    const client = supabase
    const { data, error } = await client
      .from('gigs')
      .select('id, pro_id, category_id, title, description, cover_image, slug, marketplace_pros(id, full_name, avatar_url, is_top_talent, is_verified, location, languages, bio)')
      .order('created_at', { ascending: false })

    if (error) {
      setGigError(error.message)
      setLoadingManagedGigs(false)
      return
    }

    const normalized: ManagedGigRow[] = (data ?? []).map((row: any) => {
      const pro = Array.isArray(row.marketplace_pros) ? row.marketplace_pros[0] : row.marketplace_pros

      return {
        id: row.id,
        proId: row.pro_id,
        title: row.title,
        slug: row.slug,
        description: row.description,
        categoryId: row.category_id,
        coverImage: row.cover_image,
        proFullName: pro?.full_name ?? 'Profesional',
        proAvatarUrl: pro?.avatar_url ?? null,
        proIsTopTalent: Boolean(pro?.is_top_talent),
        proIsVerified: Boolean(pro?.is_verified),
        proLocation: pro?.location ?? null,
        proLanguages: pro?.languages ?? null,
        proBio: pro?.bio ?? null,
      }
    })

    setManagedGigs(normalized)
    setLoadingManagedGigs(false)
  }

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoadingCategories(false)
      return
    }

    const client = supabase
    let isMounted = true

    const loadCategories = async () => {
      const { data, error: categoriesError } = await client
        .from('service_categories')
        .select('id, name, slug')
        .order('name', { ascending: true })

      if (!isMounted) return

      if (categoriesError) {
        setGigError(categoriesError.message)
      } else {
        const allowed = (data ?? []).filter((category) => FIXED_CATEGORY_SLUGS.includes(category.slug as (typeof FIXED_CATEGORY_SLUGS)[number]))
        const ordered = FIXED_CATEGORY_SLUGS.map((slug) => {
          const category = allowed.find((item) => item.slug === slug)
          return category ? { ...category, name: FIXED_CATEGORY_LABELS[slug] } : null
        }).filter(Boolean) as CategoryOption[]

        setCategories(ordered)
      }

      setLoadingCategories(false)
    }

    loadCategories()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    loadManagedGigs()
  }, [])

  useEffect(() => {
    if (!slugEdited) {
      setSlug(slugify(title))
    }
  }, [title, slugEdited])

  const canSubmitGig = useMemo(() => {
    const hasCoverImage = coverImageFiles.length > 0 || !!existingCoverImageUrl

    return (
      !savingGig &&
      !!fullName.trim() &&
      !!categoryId &&
      !!title.trim() &&
      !!description.trim() &&
      !!slug.trim() &&
      hasCoverImage
    )
  }, [savingGig, fullName, categoryId, title, description, slug, coverImageFiles.length, existingCoverImageUrl])

  const canSubmitBanner = useMemo(() => {
    return !savingBanner && !!heroImageFile && !!heroTitle.trim()
  }, [savingBanner, heroImageFile, heroTitle])

  const addPackage = () => {
    setPackages((current) => [...current, defaultPackage(counter)])
    setCounter((value) => value + 1)
  }

  const removePackage = (uiId: number) => {
    setPackages((current) => {
      if (current.length <= 1) return current
      return current.filter((item) => item.uiId !== uiId)
    })
  }

  const updatePackage = (uiId: number, field: keyof PackageInput, value: string) => {
    setPackages((current) => current.map((item) => (item.uiId === uiId ? { ...item, [field]: value } : item)))
  }

  const addPackageFeature = (uiId: number) => {
    setPackages((current) =>
      current.map((item) => (item.uiId === uiId ? { ...item, features: [...item.features, ''] } : item)),
    )
  }

  const updatePackageFeature = (uiId: number, featureIndex: number, value: string) => {
    setPackages((current) =>
      current.map((item) => {
        if (item.uiId !== uiId) return item

        const nextFeatures = [...item.features]
        nextFeatures[featureIndex] = value

        return { ...item, features: nextFeatures }
      }),
    )
  }

  const removePackageFeature = (uiId: number, featureIndex: number) => {
    setPackages((current) =>
      current.map((item) => {
        if (item.uiId !== uiId) return item
        if (item.features.length <= 1) return { ...item, features: [''] }

        return {
          ...item,
          features: item.features.filter((_, index) => index !== featureIndex),
        }
      }),
    )
  }

  const addPortfolioItem = () => {
    const nextUiId = counter
    setPortfolioItems((current) => [...current, defaultPortfolio(nextUiId)])
    setPortfolioFiles((current) => ({ ...current, [nextUiId]: null }))
    setCounter((value) => value + 1)
  }

  const removePortfolioItem = (uiId: number) => {
    setPortfolioItems((current) => {
      if (current.length <= 1) return current
      setPortfolioFiles((currentFiles) => {
        const next = { ...currentFiles }
        delete next[uiId]
        return next
      })
      return current.filter((item) => item.uiId !== uiId)
    })
  }

  const updatePortfolioField = (uiId: number, field: keyof PortfolioInput, value: string) => {
    setPortfolioItems((current) => current.map((item) => (item.uiId === uiId ? { ...item, [field]: value } : item)))
  }

  const updatePortfolioFile = (uiId: number, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    setPortfolioFiles((current) => ({ ...current, [uiId]: file }))
  }

  useEffect(() => {
    const nextPreviews = coverImageFiles.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }))

    setCoverImagePreviews(nextPreviews)

    return () => {
      nextPreviews.forEach((preview) => URL.revokeObjectURL(preview.url))
    }
  }, [coverImageFiles])

  const resetGigForm = () => {
    setEditingGigId(null)
    setEditingProId(null)
    setFullName('')
    setAvatarFile(null)
    setExistingAvatarUrl(null)
    setIsTopTalent(false)
    setIsVerified(true)
    setLocation('')
    setLanguages('')
    setBio('')

    setCategoryId('')
    setTitle('')
    setSlug('')
    setSlugEdited(false)
    setDescription('')
    setCoverImageFiles([])
    setCoverImagePreviews([])
    setExistingCoverImageUrl(null)

    setPackages([defaultPackage(1)])
    setPortfolioItems([defaultPortfolio(1)])
    setPortfolioFiles({ 1: null })
    setCounter(2)
  }

  const resetBannerForm = () => {
    setHeroImageFile(null)
    setHeroTitle('')
    setHeroSubtitle('')
    setHeroCtaLink('')
    setHeroIsActive(true)
  }

  const getValidatedClient = async () => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Faltan variables de Supabase en el entorno.')
    }

    const client = supabase
    const { data: sessionData, error: sessionError } = await client.auth.getSession()
    const sessionEmail = sessionData.session?.user?.email

    if (sessionError || !isAllowedAdminEmail(sessionEmail)) {
      throw new Error('No tienes permisos para guardar informacion en el panel admin.')
    }

    return client
  }

  const handleEditGig = async (gig: ManagedGigRow) => {
    if (!isSupabaseConfigured || !supabase) return

    const client = supabase
    setGigError(null)
    setGigSuccess(null)

    const { data: packageData, error: packageError } = await client
      .from('packages')
      .select('type, description, price, currency, delivery_days, features')
      .eq('gig_id', gig.id)
      .order('created_at', { ascending: true })

    if (packageError) {
      setGigError(packageError.message)
      return
    }

    const { data: portfolioData, error: portfolioError } = await client
      .from('portfolio_items')
      .select('title, description, image_url, work_date, price_range, duration')
      .eq('gig_id', gig.id)
      .order('created_at', { ascending: true })

    if (portfolioError) {
      setGigError(portfolioError.message)
      return
    }

    const hydratedPackages = (packageData ?? []).map((item: any, index: number) => ({
      uiId: index + 1,
      type: item.type ?? '',
      description: item.description ?? '',
      price: item.price != null ? String(item.price) : '',
      currency: normalizeCurrency(item.currency),
      deliveryDays: item.delivery_days != null ? String(item.delivery_days) : '',
      features: Array.isArray(item.features) && item.features.length > 0 ? item.features.map((entry: unknown) => String(entry)) : [''],
    }))

    const hydratedPortfolio = (portfolioData ?? []).map((item: any, index: number) => ({
      uiId: (packageData?.length ?? 0) + index + 1,
      title: item.title ?? '',
      description: item.description ?? '',
      existingImageUrl: item.image_url ?? null,
      workDate: item.work_date ?? '',
      priceRange: item.price_range ?? '',
      duration: item.duration ?? '',
    }))

    setEditingGigId(gig.id)
    setEditingProId(gig.proId)
    setFullName(gig.proFullName)
    setAvatarFile(null)
    setExistingAvatarUrl(gig.proAvatarUrl)
    setIsTopTalent(gig.proIsTopTalent)
    setIsVerified(gig.proIsVerified)
    setLocation(gig.proLocation ?? '')
    setLanguages(gig.proLanguages ?? '')
    setBio(gig.proBio ?? '')

    setCategoryId(gig.categoryId ?? '')
    setTitle(gig.title)
    setSlug(gig.slug)
    setSlugEdited(true)
    setDescription(gig.description)
    setCoverImageFiles([])
    setCoverImagePreviews([])
    setExistingCoverImageUrl(gig.coverImage)

    setPackages(hydratedPackages.length > 0 ? hydratedPackages : [defaultPackage(1)])
  const nextPortfolioItems = hydratedPortfolio.length > 0 ? hydratedPortfolio : [defaultPortfolio(1)]
  setPortfolioItems(nextPortfolioItems)
  setPortfolioFiles(Object.fromEntries(nextPortfolioItems.map((item) => [item.uiId, null])) as Record<number, File | null>)
    setCounter(hydratedPackages.length + hydratedPortfolio.length + 2)

    setActiveTab('gig')
    gigFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleDeleteGig = async (gigId: string) => {
    const confirmed = window.confirm('¿Seguro que deseas borrar este servicio? Esta accion no se puede deshacer.')
    if (!confirmed) return

    setDeletingGigId(gigId)
    setGigError(null)
    setGigSuccess(null)

    try {
      const client = await getValidatedClient()
      const { error: deleteGalleryError } = await client.from('gig_gallery').delete().eq('gig_id', gigId)
      if (deleteGalleryError) {
        throw new Error(deleteGalleryError.message)
      }

      const { error } = await client.from('gigs').delete().eq('id', gigId)
      if (error) {
        throw new Error(error.message)
      }

      if (editingGigId === gigId) {
        resetGigForm()
      }

      setGigSuccess('Servicio borrado correctamente.')
      await loadManagedGigs()
    } catch (deleteError) {
      setGigError(deleteError instanceof Error ? deleteError.message : 'Error inesperado al borrar servicio.')
    } finally {
      setDeletingGigId(null)
    }
  }

  const handleGigSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setGigError(null)
    setGigSuccess(null)

    const normalizedSlug = slugify(slug)
    if (!normalizedSlug) {
      setGigError('El slug no puede quedar vacio.')
      return
    }

    if (coverImageFiles.length === 0 && !existingCoverImageUrl) {
      setGigError('Agrega al menos una imagen de portada.')
      return
    }

    const validPackages = packages.filter(
      (item) => item.type.trim() && item.description.trim() && item.price.trim() && item.currency.trim() && item.deliveryDays.trim(),
    )

    if (validPackages.length === 0) {
      setGigError('Agrega al menos un paquete completo.')
      return
    }

    setSavingGig(true)

    try {
      const client = await getValidatedClient()
      const uniqueSlug = await resolveUniqueGigSlug(client, normalizedSlug, editingGigId)
      const avatarUrl = avatarFile
        ? await uploadFileAndGetPublicUrl(avatarFile, 'pros/avatar')
        : existingAvatarUrl
      const shouldReplaceCoverImages = coverImageFiles.length > 0
      const uploadedCoverUrls = shouldReplaceCoverImages
        ? await Promise.all(coverImageFiles.map((file) => uploadFileAndGetPublicUrl(file, 'gigs/cover')))
        : []
      const coverImageUrl = shouldReplaceCoverImages ? uploadedCoverUrls[0] : existingCoverImageUrl

      if (!coverImageUrl) {
        throw new Error('La portada del gig es obligatoria.')
      }

      const galleryImageUrls = shouldReplaceCoverImages ? uploadedCoverUrls.slice(1) : []

      let proId = editingProId
      if (proId) {
        const { error: proUpdateError } = await client
          .from('marketplace_pros')
          .update({
            full_name: fullName.trim(),
            avatar_url: avatarUrl,
            is_top_talent: isTopTalent,
            is_verified: isVerified,
            location: location.trim() || null,
            languages: languages.trim() || null,
            bio: bio.trim() || null,
          })
          .eq('id', proId)

        if (proUpdateError) {
          throw new Error(proUpdateError.message)
        }
      } else {
        const { data: pro, error: proError } = await client
          .from('marketplace_pros')
          .insert([
            {
              full_name: fullName.trim(),
              avatar_url: avatarUrl,
              is_top_talent: isTopTalent,
              is_verified: isVerified,
              location: location.trim() || null,
              languages: languages.trim() || null,
              bio: bio.trim() || null,
            },
          ])
          .select('id')
          .single()

        if (proError || !pro) {
          throw new Error(proError?.message || 'No se pudo crear el profesional.')
        }

        proId = pro.id
      }

      let gigId = editingGigId
      if (gigId) {
        const gigUpdatePayload: Record<string, string | null> = {
          pro_id: proId,
          category_id: categoryId,
          title: title.trim(),
          description: description.trim(),
          slug: normalizedSlug,
        }

        if (shouldReplaceCoverImages) {
          gigUpdatePayload.cover_image = coverImageUrl
        }

        const { error: gigUpdateError } = await client
          .from('gigs')
          .update(gigUpdatePayload)
          .eq('id', gigId)

        if (gigUpdateError) {
          throw new Error(gigUpdateError.message)
        }
      } else {
        const { data: gig, error: gigError } = await client
          .from('gigs')
          .insert([
            {
              pro_id: proId,
              category_id: categoryId,
              title: title.trim(),
              description: description.trim(),
              cover_image: coverImageUrl,
              slug: uniqueSlug,
            },
          ])
          .select('id')
          .single()

        if (gigError || !gig) {
          throw new Error(gigError?.message || 'No se pudo crear el gig.')
        }

        gigId = gig.id
      }

      if (!gigId) {
        throw new Error('No se pudo resolver el identificador del servicio.')
      }

      if (shouldReplaceCoverImages) {
        const { error: deleteGalleryError } = await client.from('gig_gallery').delete().eq('gig_id', gigId)
        if (deleteGalleryError) {
          throw new Error(deleteGalleryError.message)
        }

        if (galleryImageUrls.length > 0) {
          const galleryRows = galleryImageUrls.map((imageUrl) => ({
            gig_id: gigId,
            image_url: imageUrl,
          }))

          const { error: galleryError } = await client.from('gig_gallery').insert(galleryRows)
          if (galleryError) {
            throw new Error(galleryError.message)
          }
        }
      }

      const validPortfolio = portfolioItems.filter((item) => item.title.trim() && (portfolioFiles[item.uiId] || item.existingImageUrl))
      const uploadedPortfolioRows = await Promise.all(
        validPortfolio.map(async (item) => {
          const selectedFile = portfolioFiles[item.uiId]
          const imageUrl = selectedFile
            ? await uploadFileAndGetPublicUrl(selectedFile, 'portfolio/items')
            : item.existingImageUrl

          if (!imageUrl) {
            throw new Error('Cada trabajo del portfolio necesita una imagen.')
          }

          return {
            gig_id: gigId,
            title: item.title.trim(),
            description: item.description.trim() || null,
            image_url: imageUrl,
            work_date: item.workDate || null,
            price_range: item.priceRange.trim() || null,
            duration: item.duration.trim() || null,
          }
        }),
      )

      const packageRows = validPackages.map((item) => ({
        gig_id: gigId,
        type: item.type.trim(),
        description: item.description.trim(),
        price: Number(item.price),
        currency: normalizeCurrency(item.currency),
        delivery_days: Number(item.deliveryDays),
        features: item.features.map((feature) => feature.trim()).filter(Boolean),
      }))

      const { error: deletePackageError } = await client.from('packages').delete().eq('gig_id', gigId)
      if (deletePackageError) {
        throw new Error(deletePackageError.message)
      }

      if (packageRows.length > 0) {
        const { error: packageError } = await client.from('packages').insert(packageRows)
        if (packageError) {
          throw new Error(packageError.message)
        }
      }

      const { error: deletePortfolioError } = await client.from('portfolio_items').delete().eq('gig_id', gigId)
      if (deletePortfolioError) {
        throw new Error(deletePortfolioError.message)
      }

      if (uploadedPortfolioRows.length > 0) {
        const { error: portfolioError } = await client.from('portfolio_items').insert(uploadedPortfolioRows)
        if (portfolioError) {
          throw new Error(portfolioError.message)
        }
      }

      await loadManagedGigs()
      setGigSuccess(editingGigId ? 'Servicio actualizado correctamente en Supabase.' : 'Servicio guardado correctamente en Supabase.')
      resetGigForm()
    } catch (submitError) {
      setGigError(submitError instanceof Error ? submitError.message : 'Error inesperado al guardar.')
    } finally {
      setSavingGig(false)
    }
  }

  const handleBannerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBannerError(null)
    setBannerSuccess(null)

    if (!heroImageFile || !heroTitle.trim()) {
      setBannerError('Para actualizar el banner, imagen y titulo son obligatorios.')
      return
    }

    setSavingBanner(true)

    try {
      const client = await getValidatedClient()
      const heroImageUrl = await uploadFileAndGetPublicUrl(heroImageFile, 'hero/banners')

      const { error: heroError } = await client.from('hero_banners').insert([
        {
          image_url: heroImageUrl,
          title: heroTitle.trim(),
          subtitle: heroSubtitle.trim() || null,
          cta_link: heroCtaLink.trim() || null,
          is_active: heroIsActive,
        },
      ])

      if (heroError) {
        throw new Error(heroError.message)
      }

      setBannerSuccess('Banner de inicio actualizado correctamente.')
      resetBannerForm()
    } catch (submitError) {
      setBannerError(submitError instanceof Error ? submitError.message : 'Error inesperado al actualizar banner.')
    } finally {
      setSavingBanner(false)
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200">
        Faltan variables de Supabase para usar el panel admin.
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('gig')}
            className={`h-10 rounded-lg text-sm font-semibold transition ${
              activeTab === 'gig'
                ? 'bg-lime-300 text-black'
                : 'border border-zinc-700 bg-black text-zinc-200 hover:border-lime-300/60'
            }`}
          >
            Crear Gig
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('banner')}
            className={`h-10 rounded-lg text-sm font-semibold transition ${
              activeTab === 'banner'
                ? 'bg-lime-300 text-black'
                : 'border border-zinc-700 bg-black text-zinc-200 hover:border-lime-300/60'
            }`}
          >
            Editar Banners
          </button>
        </div>
      </section>

      {activeTab === 'gig' && (
        <div className="space-y-5">
          <div ref={gigFormRef} className="space-y-5">
            <section className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <div>
                <h2 className="text-lg font-semibold text-white">{editingGigId ? 'Modo Edicion' : 'Crear Servicio'}</h2>
                <p className="text-xs text-zinc-400">
                  {editingGigId ? 'Estas actualizando un servicio existente.' : 'Crea un servicio completo con profesional, paquetes y portfolio.'}
                </p>
              </div>
              {editingGigId && (
                <button
                  type="button"
                  onClick={resetGigForm}
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-700 bg-black px-4 text-sm text-zinc-200 hover:border-lime-300/60"
                >
                  Cancelar edicion
                </button>
              )}
            </section>

            <form onSubmit={handleGigSubmit} className="space-y-5">
              <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <h2 className="text-lg font-semibold text-white">Profesional</h2>
                <InputField label="Nombre" value={fullName} onChange={setFullName} required />
                <InputField
                  label="Ubicacion"
                  value={location}
                  onChange={setLocation}
                  placeholder="Ej: Mexico"
                />
                <InputField
                  label="Idiomas"
                  value={languages}
                  onChange={setLanguages}
                  placeholder="Ej: Espanol, Ingles"
                />
                <div className="space-y-1.5">
                  <label className="text-sm text-zinc-300">Biografia</label>
                  <textarea
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                    rows={4}
                    placeholder="Describe la trayectoria y especialidad del profesional"
                    className="w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-sm text-zinc-200 outline-none focus:border-lime-300/70 focus:ring-2 focus:ring-lime-200/20"
                  />
                </div>
                <FileField
                  label="Avatar"
                  onChange={(event) => setAvatarFile(event.target.files?.[0] ?? null)}
                  fileName={avatarFile?.name || ''}
                />
                {existingAvatarUrl && !avatarFile && (
                  <p className="text-xs text-zinc-500">Avatar actual cargado.</p>
                )}
                <ToggleField label="Top Talent" checked={isTopTalent} onChange={setIsTopTalent} />
                <ToggleField label="Verificado" checked={isVerified} onChange={setIsVerified} />
              </section>

              <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <h2 className="text-lg font-semibold text-white">Gig</h2>
                <div className="space-y-1.5">
                  <label className="text-sm text-zinc-300">Categoria</label>
                  <select
                    value={categoryId}
                    onChange={(event) => setCategoryId(event.target.value)}
                    className="h-11 w-full rounded-lg border border-zinc-700 bg-black px-3 text-sm text-zinc-200 outline-none focus:border-lime-300/70 focus:ring-2 focus:ring-lime-200/20"
                    required
                  >
                    <option value="">Selecciona una categoria</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {loadingCategories && <p className="text-xs text-zinc-500">Cargando categorias...</p>}
                </div>

                <InputField
                  label="Titulo"
                  value={title}
                  onChange={setTitle}
                  required
                  placeholder="Diseno de logo profesional"
                />

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-zinc-300">Slug</label>
                    <button
                      type="button"
                      onClick={() => {
                        setSlug(slugify(title))
                        setSlugEdited(false)
                      }}
                      className="inline-flex items-center gap-1 text-xs text-lime-200 hover:text-lime-100"
                    >
                      <RefreshCcw size={12} />
                      Regenerar
                    </button>
                  </div>
                  <input
                    value={slug}
                    onChange={(event) => {
                      setSlug(event.target.value)
                      setSlugEdited(true)
                    }}
                    className="h-11 w-full rounded-lg border border-zinc-700 bg-black px-3 text-sm text-zinc-200 outline-none focus:border-lime-300/70 focus:ring-2 focus:ring-lime-200/20"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm text-zinc-300">Descripcion</label>
                  <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-sm text-zinc-200 outline-none focus:border-lime-300/70 focus:ring-2 focus:ring-lime-200/20"
                    placeholder="Describe el servicio sin datos de contacto directos"
                    required
                  />
                </div>

                <MultiFileField
                  label="Cover Image"
                  onChange={(event) => setCoverImageFiles(Array.from(event.target.files ?? []))}
                  fileCount={coverImageFiles.length}
                />
                <p className="text-xs text-zinc-500">
                  La primera imagen se guardara como portada y las siguientes iran a la galeria del gig.
                </p>
                {coverImagePreviews.length > 0 && (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {coverImagePreviews.map((preview, index) => (
                      <figure key={`${preview.name}-${index}`} className="overflow-hidden rounded-lg border border-zinc-800 bg-black">
                        <div className="relative aspect-video bg-zinc-900">
                          <img src={preview.url} alt={preview.name} className="h-full w-full object-cover" />
                          <span className="absolute left-2 top-2 rounded-full bg-black/80 px-2 py-1 text-[10px] font-bold uppercase text-white">
                            {index === 0 ? 'Portada' : 'Galeria'}
                          </span>
                        </div>
                        <figcaption className="truncate px-3 py-2 text-xs text-zinc-400">{preview.name}</figcaption>
                      </figure>
                    ))}
                  </div>
                )}
                {existingCoverImageUrl && coverImagePreviews.length === 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-zinc-500">Cover actual cargado.</p>
                    <div className="overflow-hidden rounded-lg border border-zinc-800 bg-black">
                      <div className="relative aspect-video bg-zinc-900">
                        <img src={existingCoverImageUrl} alt="Cover actual" className="h-full w-full object-cover" />
                        <span className="absolute left-2 top-2 rounded-full bg-black/80 px-2 py-1 text-[10px] font-bold uppercase text-white">
                          Portada actual
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-white">Paquetes (dinamicos)</h2>
                  <button
                    type="button"
                    onClick={addPackage}
                    className="inline-flex items-center gap-2 rounded-lg border border-lime-300/40 bg-lime-300/10 px-3 py-2 text-xs font-semibold text-lime-200 hover:bg-lime-300/20"
                  >
                    <Plus size={14} />
                    Anadir paquete
                  </button>
                </div>

                {packages.map((item) => (
                  <article key={item.uiId} className="space-y-3 rounded-lg border border-zinc-800 bg-black p-3">
                    <InputField
                      label="Nombre del paquete"
                      value={item.type}
                      onChange={(value) => updatePackage(item.uiId, 'type', value)}
                      placeholder="Plan premium"
                    />
                    <InputField
                      label="Descripcion"
                      value={item.description}
                      onChange={(value) => updatePackage(item.uiId, 'description', value)}
                    />
                    <InputField
                      label="Precio"
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(value) => updatePackage(item.uiId, 'price', value)}
                    />
                    <div className="space-y-1.5">
                      <label className="text-sm text-zinc-300">Divisa</label>
                      <select
                        value={item.currency}
                        onChange={(event) => updatePackage(item.uiId, 'currency', event.target.value)}
                        className="h-11 w-full rounded-lg border border-zinc-700 bg-black px-3 text-sm text-zinc-200 outline-none focus:border-lime-300/70 focus:ring-2 focus:ring-lime-200/20"
                      >
                        {SUPPORTED_CURRENCIES.map((currency) => (
                          <option key={currency} value={currency}>
                            {currency}
                          </option>
                        ))}
                      </select>
                    </div>
                    <InputField
                      label="Dias de entrega"
                      type="number"
                      min="1"
                      value={item.deliveryDays}
                      onChange={(value) => updatePackage(item.uiId, 'deliveryDays', value)}
                    />

                    <div className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <label className="text-sm text-zinc-300">Que incluye?</label>
                        <button
                          type="button"
                          onClick={() => addPackageFeature(item.uiId)}
                          className="inline-flex items-center gap-2 rounded-lg border border-lime-300/40 bg-lime-300/10 px-3 py-2 text-xs font-semibold text-lime-200 hover:bg-lime-300/20"
                        >
                          <Plus size={14} />
                          [+] Anadir inclusion
                        </button>
                      </div>

                      <div className="space-y-2">
                        {item.features.map((feature, featureIndex) => (
                          <div key={`${item.uiId}-${featureIndex}`} className="flex gap-2">
                            <input
                              value={feature}
                              onChange={(event) => updatePackageFeature(item.uiId, featureIndex, event.target.value)}
                              placeholder="Ej: 2 conceptos, revisiones ilimitadas..."
                              className="h-11 flex-1 rounded-lg border border-zinc-700 bg-black px-3 text-sm text-zinc-200 outline-none focus:border-lime-300/70 focus:ring-2 focus:ring-lime-200/20"
                            />
                            <button
                              type="button"
                              onClick={() => removePackageFeature(item.uiId, featureIndex)}
                              className="inline-flex h-11 items-center justify-center rounded-lg border border-red-500/40 bg-red-500/10 px-3 text-sm text-red-200 hover:bg-red-500/20"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removePackage(item.uiId)}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 text-sm text-red-200 hover:bg-red-500/20"
                    >
                      <Trash2 size={14} />
                      Eliminar paquete
                    </button>
                  </article>
                ))}
              </section>

              <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-white">Portfolio</h2>
                  <button
                    type="button"
                    onClick={addPortfolioItem}
                    className="inline-flex items-center gap-2 rounded-lg border border-lime-300/40 bg-lime-300/10 px-3 py-2 text-xs font-semibold text-lime-200 hover:bg-lime-300/20"
                  >
                    <Plus size={14} />
                    Anadir trabajo
                  </button>
                </div>

                {portfolioItems.map((item) => (
                  <article key={item.uiId} className="space-y-3 rounded-lg border border-zinc-800 bg-black p-3">
                    <InputField
                      label="Titulo"
                      value={item.title}
                      onChange={(value) => updatePortfolioField(item.uiId, 'title', value)}
                    />
                    <FileField
                      label="Imagen"
                      onChange={(event) => updatePortfolioFile(item.uiId, event)}
                      fileName={portfolioFiles[item.uiId]?.name || ''}
                    />
                    {item.existingImageUrl && !portfolioFiles[item.uiId] && (
                      <p className="text-xs text-zinc-500">Imagen actual cargada para este trabajo.</p>
                    )}
                    <InputField
                      label="Fecha"
                      type="date"
                      value={item.workDate}
                      onChange={(value) => updatePortfolioField(item.uiId, 'workDate', value)}
                    />
                    <InputField
                      label="Rango de precio"
                      value={item.priceRange}
                      onChange={(value) => updatePortfolioField(item.uiId, 'priceRange', value)}
                      placeholder="$50-$150"
                    />
                    <InputField
                      label="Duracion"
                      value={item.duration}
                      onChange={(value) => updatePortfolioField(item.uiId, 'duration', value)}
                      placeholder="3 dias"
                    />
                    <div className="space-y-1.5">
                      <label className="text-sm text-zinc-300">Descripcion</label>
                      <textarea
                        value={item.description}
                        onChange={(event) => updatePortfolioField(item.uiId, 'description', event.target.value)}
                        rows={3}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-lime-300/70 focus:ring-2 focus:ring-lime-200/20"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => removePortfolioItem(item.uiId)}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 text-sm text-red-200 hover:bg-red-500/20"
                    >
                      <Trash2 size={14} />
                      Eliminar trabajo
                    </button>
                  </article>
                ))}
              </section>

              {gigError && <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{gigError}</p>}
              {gigSuccess && <p className="rounded-lg border border-lime-300/40 bg-lime-300/10 px-4 py-3 text-sm text-lime-200">{gigSuccess}</p>}

              <button
                type="submit"
                disabled={!canSubmitGig || savingGig}
                className="h-11 w-full rounded-lg bg-lime-300 text-sm font-semibold text-black transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingGig ? 'Subiendo y guardando...' : editingGigId ? 'Actualizar Servicio' : 'Guardar Servicio Completo'}
              </button>
            </form>
          </div>

          <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Lista de Gestion de Gigs</h2>
              <button
                type="button"
                onClick={loadManagedGigs}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-700 bg-black px-4 text-sm text-zinc-200 hover:border-lime-300/60"
              >
                Refrescar
              </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-zinc-800">
              <table className="min-w-full divide-y divide-zinc-800 text-sm">
                <thead className="bg-zinc-900/70 text-zinc-300">
                  <tr>
                    <th className="px-3 py-3 text-left font-medium">Cover</th>
                    <th className="px-3 py-3 text-left font-medium">Gig</th>
                    <th className="px-3 py-3 text-left font-medium">Profesional</th>
                    <th className="px-3 py-3 text-right font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 bg-black/50">
                  {loadingManagedGigs ? (
                    <tr>
                      <td colSpan={4} className="px-3 py-6 text-center text-zinc-500">Cargando servicios...</td>
                    </tr>
                  ) : managedGigs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-3 py-6 text-center text-zinc-500">No hay servicios cargados aun.</td>
                    </tr>
                  ) : (
                    managedGigs.map((gig) => (
                      <tr key={gig.id} className="text-zinc-200">
                        <td className="px-3 py-3">
                          {gig.coverImage ? (
                            <img
                              src={gig.coverImage}
                              alt={gig.title}
                              className="h-12 w-16 rounded-md border border-zinc-800 object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-16 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-xs text-zinc-500">
                              Sin imagen
                            </div>
                          )}
                        </td>
                        <td className="px-3 py-3">
                          <p className="font-medium text-white">{gig.title}</p>
                          <p className="text-xs text-zinc-500">/{gig.slug}</p>
                        </td>
                        <td className="px-3 py-3">
                          <p>{gig.proFullName}</p>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditGig(gig)}
                              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-xs text-zinc-200 hover:border-lime-300/60 hover:text-lime-200"
                            >
                              <Pencil size={13} />
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteGig(gig.id)}
                              disabled={deletingGigId === gig.id}
                              className="inline-flex h-9 items-center justify-center rounded-lg border border-red-500/40 bg-red-500/10 px-3 text-xs text-red-200 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'banner' && (
        <form onSubmit={handleBannerSubmit} className="space-y-5">
          <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <h2 className="text-lg font-semibold text-white">Hero Banner</h2>
            <FileField
              label="Imagen hero"
              onChange={(event) => setHeroImageFile(event.target.files?.[0] ?? null)}
              fileName={heroImageFile?.name || ''}
            />
            <InputField label="Titulo" value={heroTitle} onChange={setHeroTitle} required />
            <InputField label="Subtitulo" value={heroSubtitle} onChange={setHeroSubtitle} />
            <InputField label="CTA link" value={heroCtaLink} onChange={setHeroCtaLink} placeholder="/servicios" />
            <ToggleField label="Banner activo" checked={heroIsActive} onChange={setHeroIsActive} />
          </section>

          {bannerError && <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{bannerError}</p>}
          {bannerSuccess && <p className="rounded-lg border border-lime-300/40 bg-lime-300/10 px-4 py-3 text-sm text-lime-200">{bannerSuccess}</p>}

          <button
            type="submit"
            disabled={!canSubmitBanner || savingBanner}
            className="h-11 w-full rounded-lg bg-lime-300 text-sm font-semibold text-black transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {savingBanner ? 'Subiendo y guardando...' : 'Actualizar Banner de Inicio'}
          </button>
        </form>
      )}
    </div>
  )
}

interface InputFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  min?: string
  step?: string
  required?: boolean
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  min,
  step,
  required,
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm text-zinc-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        min={min}
        step={step}
        required={required}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-zinc-700 bg-black px-3 text-sm text-zinc-200 outline-none focus:border-lime-300/70 focus:ring-2 focus:ring-lime-200/20"
      />
    </div>
  )
}

interface FileFieldProps {
  label: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  fileName?: string
}

function FileField({ label, onChange, fileName }: FileFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm text-zinc-300">{label}</label>
      <label className="flex h-11 cursor-pointer items-center gap-2 rounded-lg border border-dashed border-zinc-600 bg-black px-3 text-sm text-zinc-200 hover:border-lime-300/70">
        <Upload size={14} className="text-lime-300" />
        <span className="truncate">{fileName || 'Seleccionar archivo'}</span>
        <input type="file" onChange={onChange} className="hidden" accept="image/*" />
      </label>
    </div>
  )
}

interface MultiFileFieldProps {
  label: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  fileCount?: number
}

function MultiFileField({ label, onChange, fileCount }: MultiFileFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm text-zinc-300">{label}</label>
      <label className="flex h-11 cursor-pointer items-center gap-2 rounded-lg border border-dashed border-zinc-600 bg-black px-3 text-sm text-zinc-200 hover:border-lime-300/70">
        <Upload size={14} className="text-lime-300" />
        <span className="truncate">{fileCount ? `${fileCount} archivo(s) seleccionado(s)` : 'Seleccionar imagenes'}</span>
        <input type="file" onChange={onChange} className="hidden" accept="image/*" multiple />
      </label>
    </div>
  )
}

interface ToggleFieldProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function ToggleField({ label, checked, onChange }: ToggleFieldProps) {
  return (
    <label className="flex h-10 items-center gap-3 text-sm text-zinc-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-zinc-600 bg-black text-lime-300 focus:ring-lime-200/30"
      />
      {label}
    </label>
  )
}
