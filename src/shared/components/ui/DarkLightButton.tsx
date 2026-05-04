import { AnimatePresence, motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { CustomButton } from "./CustomButton"
import { useUIStore } from "../../../store/ui.store";

export const DarkLightButton = () => {
  const isDark = useUIStore((state) => state.isDark);
  const toggleTheme = useUIStore((state) => state.toggleTheme);

  return (
    <div className="relative w-10 h-10">
      <AnimatePresence mode='wait'>
        {isDark
          ? <motion.div
              key="sun"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CustomButton variant='icon' size='small' onClick={toggleTheme} className="hover:scale-110 transition-transform duration-200">
                <Sun size={24} className="text-warning"/>
              </CustomButton>
            </motion.div>

          : <motion.div
              key="moon"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CustomButton variant='icon' size='small' onClick={toggleTheme} className="hover:scale-110 transition-transform duration-200">
                <Moon size={24} className="text-text-primary"/>
              </CustomButton>
            </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}
