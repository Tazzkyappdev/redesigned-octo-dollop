export const ADMIN_FALLBACK_EMAIL = 'joral1004@gmail.com'

export function getAdminEmail(): string {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAIL || ADMIN_FALLBACK_EMAIL).toLowerCase()
}

export function isAllowedAdminEmail(email?: string | null): boolean {
  if (!email) return false
  return email.toLowerCase() === getAdminEmail()
}
