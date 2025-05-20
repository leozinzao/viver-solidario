
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
  const baseClasses = "flutter-card w-full mb-3 transition-all" + 
    (onClick ? " cursor-pointer hover:shadow-md" : "") + 
    (highlight ? " border-l-4 border-l-viver-yellow" : "");
  
  return (
    <div 
      className={baseClasses} 
      onClick={onClick}
      role={onClick ? "button" : "presentation"}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className={`p-2.5 rounded-full ${danger ? 'bg-red-500/10 text-red-500' : 'bg-viver-yellow/10 text-viver-yellow'}`}>
            {icon}
          </div>
          <div className="text-left">
            <h3 className={`font-medium text-base ${danger ? 'text-red-500' : ''}`}>{title}</h3>
            <p className={`text-xs mt-0.5 ${danger ? 'text-red-400/70' : 'text-muted-foreground'}`}>{description}</p>
          </div>
        </div>
        {rightElement && (
          <div className="ml-4">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileOption;
