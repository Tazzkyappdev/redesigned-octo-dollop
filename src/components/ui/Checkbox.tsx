import React, { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { Check } from 'lucide-react'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  error,
  helperText,
  variant = 'default',
  size = 'md',
  className,
  id,
  ...props
}, ref) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`
  
  const baseClasses = 'w-4 h-4 border rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    default: 'border-gray-300 focus:ring-green-500 text-green-500',
    error: 'border-red-500 focus:ring-red-500 text-red-500',
    success: 'border-green-500 focus:ring-green-500 text-green-500'
  }
  
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex items-start space-x-3">
        <div className="relative flex-shrink-0">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={cn(
              baseClasses,
              variants[variant],
              sizes[size],
              'appearance-none checked:bg-green-500 checked:border-green-500',
              className
            )}
            {...props}
          />
          <Check 
            className={cn(
              'absolute inset-0 m-auto text-white pointer-events-none opacity-0 checked:opacity-100 transition-opacity duration-200',
              sizes[size] === 'sm' ? 'w-2 h-2' : sizes[size] === 'md' ? 'w-3 h-3' : 'w-4 h-4'
            )}
          />
        </div>
        
        {label && (
          <label 
            htmlFor={checkboxId}
            className="text-sm font-medium text-gray-700 cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 ml-7">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500 ml-7">
          {helperText}
        </p>
      )}
    </div>
  )
})

Checkbox.displayName = 'Checkbox'
