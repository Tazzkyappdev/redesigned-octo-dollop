export const SUPPORTED_CURRENCIES = ['MXN', 'USD', 'COP', 'ARS', 'CLP', 'PEN'] as const

export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number]

const CURRENCY_SYMBOLS: Record<SupportedCurrency, string> = {
  MXN: '$',
  USD: '$',
  COP: '$',
  ARS: '$',
  CLP: '$',
  PEN: 'S/',
}

export function normalizeCurrency(currency?: string | null): SupportedCurrency {
  const uppercased = String(currency ?? 'MXN').trim().toUpperCase()
  return (SUPPORTED_CURRENCIES.includes(uppercased as SupportedCurrency) ? uppercased : 'MXN') as SupportedCurrency
}

export function getCurrencySymbol(currency?: string | null): string {
  return CURRENCY_SYMBOLS[normalizeCurrency(currency)]
}

export function formatCurrencyAmount(amount: number, currency?: string | null, includeCode = false): string {
  const normalizedCurrency = normalizeCurrency(currency)
  const symbol = getCurrencySymbol(normalizedCurrency)
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount)

  return includeCode ? `${symbol}${formattedAmount} ${normalizedCurrency}` : `${symbol}${formattedAmount}`
}
