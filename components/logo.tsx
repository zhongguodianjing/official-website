import React from 'react';
import logoSrc from './logo/logoIcon.svg';

interface LogoProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

const Logo: React.FC<LogoProps> = ({ 
  className = '',
  width = '100%',
  height = '100%'
}) => {
  return (
    <img 
      src={logoSrc} 
      alt="Logo" 
      className={className}
      style={{ width, height }}
    />
  );
};

export default Logo;