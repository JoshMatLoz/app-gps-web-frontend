import { motion } from 'framer-motion'

interface CustomModalProps{
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const CustomModal  = ( { onClose, children, title, className }: CustomModalProps ) => {
  const baseStyles = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
  const modalStyles = 'bg-bg-secondary text-text-primary p-6 rounded-lg w-full max-w-md'

  const classes = `${modalStyles} ${className ?? ''}`;

  return(
    <motion.div 
      className={baseStyles}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // PARA CERRAR EL MODAL EN CUALQUIER PARTE DE LA PANTALLA NEGRA
      onClick={onClose}
    >
      <motion.div
      // stopPropagation le dice al evento:
      //   "No subas al elemento padre"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={classes}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold font-display text-center mb-5">{ title }</h2>
        </div>
        {children}
      </motion.div>
    </motion.div>
  )
}; 