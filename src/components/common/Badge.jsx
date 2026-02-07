/**
 * Badge Component
 * Matches wireframe badge styles
 */
export default function Badge({ 
  children, 
  variant = 'draft',
  className = '',
  ...props 
}) {
  const variantClasses = {
    draft: 'badge-draft',
    published: 'badge-published',
    verified: 'badge-verified',
    pending: 'badge-pending',
    unverified: 'badge-unverified',
  };

  const classes = `badge ${variantClasses[variant]} ${className}`.trim();

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}


