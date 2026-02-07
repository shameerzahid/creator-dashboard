/**
 * Role Badge Component
 * Matches wireframe role badge styles
 */
export default function RoleBadge({ 
  children, 
  role = 'support',
  className = '',
  ...props 
}) {
  const roleClasses = {
    owner: 'role-owner',
    admin: 'role-admin',
    support: 'role-support',
  };

  const classes = `role-badge ${roleClasses[role]} ${className}`.trim();

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}


