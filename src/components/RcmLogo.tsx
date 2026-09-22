import React from 'react';

interface RcmLogoProps {
  className?: string;
  variant?: 'full' | 'symbol' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const RcmLogo: React.FC<RcmLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-14',
    md: 'h-20',
    lg: 'h-24',
    xl: 'h-28'
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`} id="rcm-brand-logo">
      <img
        src="/assets/Logomarca RCM.png"
        onError={(e) => {
          // Fallback to rcm_logo.png if needed
          const target = e.currentTarget;
          if (target.src !== '/assets/rcm_logo.png') {
            target.src = '/assets/rcm_logo.png';
          }
        }}
        alt="Rede de Postos RCM - Logomarca Oficial"
        className={`${sizeClasses[size]} w-auto max-w-none object-contain object-center transition-transform hover:scale-105`}
        loading="eager"
      />
    </div>
  );
};
