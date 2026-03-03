import React from 'react'
import { cn } from '../../lib/utils'

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'selected' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  selected?: boolean
}

export const Chip: React.FC<ChipProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className,
  onClick,
  selected = false,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 cursor-pointer select-none'
  
  const variants = {
    default: 'bg-white border border-tazzky-border text-tazzky-text hover:bg-tazzky-bg-alt hover:border-primary',
    selected: 'bg-primary text-white border-primary hover:bg-primary-hover',
    outlined: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs h-8',
    md: 'px-4 py-2 text-sm h-10',
    lg: 'px-6 py-3 text-base h-12'
  }

  const finalVariant = selected ? 'selected' : variant

  return (
    <div
      className={cn(
        baseClasses,
        variants[finalVariant],
        sizes[size],
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      } : undefined}
      {...props}
    >
      {children}
    </div>
  )
}
