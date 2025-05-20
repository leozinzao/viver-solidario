
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
  const baseClasses = "flutter-card" + 
    (onClick ? " cursor-pointer" : "") + 
    (highlight ? " border-l-4 border-l-viver-yellow" : "");
  
  return (
    <div className={baseClasses} onClick={onClick}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`mr-3 p-2 ${danger ? 'bg-red-500/10' : 'bg-viver-yellow/10'} rounded-full`}>
            {icon}
          </div>
          <div>
            <h3 className={`font-medium ${danger ? 'text-red-500' : ''}`}>{title}</h3>
            <p className={`text-xs ${danger ? 'opacity-70' : 'text-muted-foreground'}`}>{description}</p>
          </div>
        </div>
        {rightElement}
      </div>
    </div>
  );
};

export default ProfileOption;
