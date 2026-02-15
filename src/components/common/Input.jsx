/**
 * Input Component
 * Enhanced with icon support using Tailwind CSS
 */
export default function Input({
  label,
  error,
  errorMessage,
  icon: Icon,
  className = '',
  ...props
}) {
  const inputClasses = `w-full px-3 py-2.5 ${Icon ? 'pl-10' : ''} border rounded-sm text-sm text-dark placeholder:text-dark-lightest transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 ${
    error 
      ? 'border-danger focus:border-danger focus:ring-danger/20' 
      : 'border-dark-lighter focus:border-primary focus:ring-primary/20'
  } ${className}`.trim();

  return (
    <div className="mb-5">
      {label && (
        <label className="block mb-2 font-medium text-dark text-sm">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-lighter pointer-events-none transition-colors ${
            error ? 'text-danger' : ''
          }`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input className={inputClasses} {...props} />
      </div>
      {error && errorMessage && (
        <div className="text-danger text-xs mt-1.5">{errorMessage}</div>
      )}
    </div>
  );
}




