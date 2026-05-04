import { Binoculars } from "lucide-react";
import { CustomInput } from "./CustomInput";

interface CustomSearchBarProps{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const CustomSearchBar = ({value, onChange, placeholder}:CustomSearchBarProps) => {
  return(
    <div className="relative">
      <Binoculars size={24} className="text-accent-hover absolute left-3 top-1/2 -translate-y-1/2"/>
      <CustomInput 
        className="pl-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}