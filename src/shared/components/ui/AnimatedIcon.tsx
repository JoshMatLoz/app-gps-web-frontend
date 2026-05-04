import { CustomButton } from "./CustomButton";
import { motion } from 'framer-motion';

interface IconProps{
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const AnimatedIcon = ({ children, onClick = () => {}, disabled }: IconProps) => {
  return(
    <CustomButton variant='icon' size='small' onClick={onClick} disabled={disabled}>
      <motion.div
        whileHover={{ y: -3, scale: 1.1 }}
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 400 }}     
      >
        { children }
      </motion.div>
    </CustomButton>
  )
}