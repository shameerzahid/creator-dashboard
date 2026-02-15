/**
 * Loading Spinner Component
 * Matches wireframe loading styles
 */
export default function LoadingSpinner({ 
  size = 'md',
  className = '',
  ...props 
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const classes = `${sizeClasses[size]} border-2 border-white border-t-transparent rounded-full animate-spin ${className}`.trim();

  return (
    <div className={classes} {...props}></div>
  );
}




