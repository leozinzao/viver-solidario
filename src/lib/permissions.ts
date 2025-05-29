
export enum UserRole {
  donor = 'donor',
  volunteer = 'volunteer', 
  internal = 'internal',
  admin = 'admin'
}

export enum Permission {
  // Doações
  VIEW_OWN_DONATIONS = 'view_own_donations',
  CREATE_DONATION = 'create_donation',
  
  // Admin - Doações
  VIEW_ALL_DONATIONS = 'view_all_donations',
  MANAGE_DONATIONS = 'manage_donations',
  UPDATE_DONATION_STATUS = 'update_donation_status',
  
  // Admin - Sistema
  ACCESS_ADMIN_PANEL = 'access_admin_panel',
  MANAGE_USERS = 'manage_users',
  MANAGE_CATEGORIES = 'manage_categories',
  VIEW_ADMIN_LOGS = 'view_admin_logs',
  
  // Voluntários
  ACCESS_VOLUNTEER_FEATURES = 'access_volunteer_features',
  MANAGE_EVENTS = 'manage_events',
}

const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.donor]: [
    Permission.VIEW_OWN_DONATIONS,
    Permission.CREATE_DONATION,
  ],
  [UserRole.volunteer]: [
    Permission.VIEW_OWN_DONATIONS,
    Permission.CREATE_DONATION,
    Permission.ACCESS_VOLUNTEER_FEATURES,
    Permission.VIEW_ALL_DONATIONS,
    Permission.UPDATE_DONATION_STATUS,
  ],
  [UserRole.internal]: [
    Permission.VIEW_OWN_DONATIONS,
    Permission.CREATE_DONATION,
    Permission.ACCESS_VOLUNTEER_FEATURES,
    Permission.VIEW_ALL_DONATIONS,
    Permission.MANAGE_DONATIONS,
    Permission.UPDATE_DONATION_STATUS,
    Permission.ACCESS_ADMIN_PANEL,
    Permission.MANAGE_CATEGORIES,
    Permission.VIEW_ADMIN_LOGS,
  ],
  [UserRole.admin]: [
    Permission.VIEW_OWN_DONATIONS,
    Permission.CREATE_DONATION,
    Permission.ACCESS_VOLUNTEER_FEATURES,
    Permission.VIEW_ALL_DONATIONS,
    Permission.MANAGE_DONATIONS,
    Permission.UPDATE_DONATION_STATUS,
    Permission.ACCESS_ADMIN_PANEL,
    Permission.MANAGE_USERS,
    Permission.MANAGE_CATEGORIES,
    Permission.MANAGE_EVENTS,
    Permission.VIEW_ADMIN_LOGS,
  ],
};

export const hasPermission = (userRole: UserRole, permission: Permission): boolean => {
  return rolePermissions[userRole]?.includes(permission) || false;
};

export const canAccessAdminPanel = (userRole: UserRole): boolean => {
  return hasPermission(userRole, Permission.ACCESS_ADMIN_PANEL);
};

export const canManageDonations = (userRole: UserRole): boolean => {
  return hasPermission(userRole, Permission.MANAGE_DONATIONS) || 
         hasPermission(userRole, Permission.UPDATE_DONATION_STATUS);
};
