interface CustomSwitchProps{
  label?: string
  checked: boolean
  onChange: () => void  
}

export const CustomSwitch = ({label, checked = false, onChange}: CustomSwitchProps) => {
  return(
    <div onClick={onChange}>
      {label && <p className="text-sm font-medium">{label}</p>}

      {/* Pista */}
      <div
        className={`w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 
                        ${checked ? 'bg-accent' : 'bg-border'}`}
      >
        {/* Círculo */}
        <div
          className={`w-4 h-4 rounded-full bg-text-primary shadow transition-transform duration-200
                        ${checked ? 'translate-x-4' : 'translate-x-0'}`}
        >
        </div>
      </div>
    </div>
  );
}