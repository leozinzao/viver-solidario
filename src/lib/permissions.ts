
// Define user roles
export type UserRole = 'admin' | 'internal' | 'editor' | 'volunteer' | 'donor' | 'visitor';

// Define permissions for different features
export enum Permission {
  // Content management
  CREATE_EVENT = 'create:event',
  EDIT_EVENT = 'edit:event',
  DELETE_EVENT = 'delete:event',
  
  CREATE_TESTIMONIAL = 'create:testimonial',
  EDIT_TESTIMONIAL = 'edit:testimonial',
  DELETE_TESTIMONIAL = 'delete:testimonial',
  APPROVE_TESTIMONIAL = 'approve:testimonial',
  
  // User management
  VIEW_USERS = 'view:users',
  EDIT_USER = 'edit:user',
  DELETE_USER = 'delete:user',
  
  // Admin features
  ACCESS_ADMIN_PANEL = 'access:admin-panel',
  VIEW_ANALYTICS = 'view:analytics',
  EDIT_SYSTEM_SETTINGS = 'edit:system-settings',
  
  // General user permissions
  DONATE = 'donate',
  VOLUNTEER = 'volunteer',
}

// Define permission mappings by role
const rolePermissions: Record<UserRole, Permission[]> = {
  admin: Object.values(Permission),
  internal: [
    Permission.CREATE_EVENT, Permission.EDIT_EVENT, Permission.DELETE_EVENT,
    Permission.CREATE_TESTIMONIAL, Permission.EDIT_TESTIMONIAL, Permission.DELETE_TESTIMONIAL, Permission.APPROVE_TESTIMONIAL,
    Permission.VIEW_USERS,
    Permission.ACCESS_ADMIN_PANEL, Permission.VIEW_ANALYTICS,
    Permission.DONATE, Permission.VOLUNTEER,
  ],
  editor: [
    Permission.CREATE_EVENT, Permission.EDIT_EVENT,
    Permission.CREATE_TESTIMONIAL, Permission.EDIT_TESTIMONIAL, Permission.APPROVE_TESTIMONIAL,
    Permission.VIEW_ANALYTICS,
    Permission.DONATE, Permission.VOLUNTEER,
  ],
  volunteer: [
    Permission.CREATE_TESTIMONIAL,
    Permission.DONATE, Permission.VOLUNTEER,
  ],
  donor: [
    Permission.DONATE, Permission.VOLUNTEER,
  ],
  visitor: []
};

/**
 * Check if a user role has a specific permission
 */
export function hasPermission(role: UserRole | undefined, permission: Permission): boolean {
  if (!role) return false;
  return rolePermissions[role]?.includes(permission) || false;
}

/**
 * Check if a user role has any of the specified permissions
 */
export function hasAnyPermission(role: UserRole | undefined, permissions: Permission[]): boolean {
  if (!role) return false;
  return permissions.some(permission => rolePermissions[role]?.includes(permission));
}

/**
 * Get all permissions for a specific role
 */
export function getPermissionsForRole(role: UserRole): Permission[] {
  return [...(rolePermissions[role] || [])];
}
