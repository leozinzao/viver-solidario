
import React, { ReactNode } from 'react';

interface ProfileOptionProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  rightElement?: ReactNode;
  highlight?: boolean;
  danger?: boolean;
}

const ProfileOption: React.FC<ProfileOptionProps> = ({ 
  icon, 
  title, 
  description, 
  onClick, 
  rightElement,
  highlight,
  danger
}) => {
  const baseClasses = "bg-card border rounded-xl p-4 mb-3 transition-all duration-300 hover:shadow-md hover:border-border/80" + 
    (onClick ? " cursor-pointer hover:scale-[1.02]" : "") + 
    (highlight ? " border-l-4 border-l-viver-yellow bg-viver-yellow/5" : "") +
    (danger ? " border-l-4 border-l-red-500 bg-red-50/50" : "");
  
  return (
    <div 
      className={baseClasses} 
      onClick={onClick}
      role={onClick ? "button" : "presentation"}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl transition-colors ${
            danger 
              ? 'bg-red-500/10 text-red-500' 
              : highlight 
                ? 'bg-viver-yellow/20 text-viver-yellow' 
                : 'bg-primary/10 text-primary'
          }`}>
            {icon}
          </div>
          <div className="text-left">
            <h3 className={`font-semibold text-base transition-colors ${
              danger ? 'text-red-600' : 'text-foreground'
            }`}>
              {title}
            </h3>
            <p className={`text-sm mt-0.5 transition-colors ${
              danger ? 'text-red-500/70' : 'text-muted-foreground'
            }`}>
              {description}
            </p>
          </div>
        </div>
        {rightElement && (
          <div className="ml-4 flex-shrink-0">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileOption;
