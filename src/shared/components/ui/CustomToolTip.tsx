import { AnimatePresence, motion } from 'framer-motion';
import { useState } from "react";

interface CustomToolTipProps{
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}

export const CustomToolTip = ({ text, children, position }: CustomToolTipProps) => {
  const [visible, setVisible] = useState(false);

  return(
    <div 
      className="relative"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <AnimatePresence>
        {
          visible && (
            <motion.div
              className={`${position === 'bottom' ? 'top-full mt-1' : 'bottom-full mb-1'} absolute bottom-full left-0 mb-1 px-2 py-1 text-xs text-text-primary bg-bg-secondary rounded whitespace-nowrap`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
            >
              {text}
            </motion.div>
          )
        }
      </AnimatePresence>
    </div>
  );
}