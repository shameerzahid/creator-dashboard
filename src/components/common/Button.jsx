/**
 * Button Component
 * Matches wireframe button styles
 */
export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props 
}) {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'btn-danger',
    outline: 'btn-outline',
    leave: 'btn-outline btn-leave',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${loading ? 'loading' : ''} ${className}`.trim();

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}




