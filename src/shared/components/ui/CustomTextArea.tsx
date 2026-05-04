// Para que tu Input sea compatible con React Hook Form necesita aceptar estas props. Esto se hace con un tipo especial llamado ComponentPropsWithoutRef:
interface CustomInputProps extends React.ComponentPropsWithoutRef<'textarea'>{
  label?: string,
  error?: string;
}

export const CustomTextArea = ({ label, error, className, ...allProps }: CustomInputProps) =>{
  // Estilos base del input
  const baseStyles = 'w-full px-4 py-2 rounded-md border transition-all duration-200 bg-bg-card text-text-primary placeholder:text-text-muted resize-none h-32';
  // Estilos condicionales según si hay error
  const borderStyles = error
    ? 'border-danger focus:outline-none'
    : 'border-border focus:outline-none focus:border-accent';

  return(
  <div className={`flex flex-col gap-1 ${className ?? ''}`}>
    {/* Label - solo aparece si existe */}
    { label && <label className="text-sm font-medium">{ label }</label> }
    {/* Input - el ...rest pasa todas las props nativas */}
    <textarea className={`${ baseStyles } ${ borderStyles }`} { ...allProps } />
    {/* Error - solo aparece si existe */}
    { error && <p className="text-sm text-danger">{ error }</p> }
  </div>    
  );
};