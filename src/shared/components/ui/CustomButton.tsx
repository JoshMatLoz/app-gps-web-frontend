import type React from "react";

interface CustomButtonProps {
  variant: 'primary' | 'secondary' | 'danger' | 'edit' | 'outline' | 'icon';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}
// children es especial en React, es lo que pones "entre" las etiquetas del componente.

export const CustomButton = ({variant, size, onClick, children, disabled=false, type='button', className}: CustomButtonProps) => {
  const variantStyles = {
    'primary': 'bg-accent text-text-primary hover:bg-accent-hover rounded-md',
    'secondary': 'bg-success text-text-primary hover:bg-success/80 hover:text-text-primary rounded-md',
    'danger': 'bg-danger text-text-primary hover:opacity-80 rounded-md',
    'edit': 'bg-warning text-text-primary hover:opacity-80 rounded-md',
    'outline': 'bg-transparent border border-accent text-accent hover:bg-accent hover:text-text-primary rounded-md',
    'icon': 'bg-transparent rounded-full aspect-square flex items-center justify-center'
  };

  const sizeStyles = {
  'small': 'px-3 py-1 text-sm',
  'medium': 'px-5 py-2 text-base',
  'large': 'px-8 py-3 text-lg',
  };

  const baseStyles = `cursor-pointer  transition-all duration-200 whitespace-nowrap font-medium disabled:opacity-50 disabled:cursor-not-allowed`

  const classes = `${variantStyles[variant]} ${sizeStyles[size ?? 'medium']} ${baseStyles} ${className ?? ''} `;

  return(
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
