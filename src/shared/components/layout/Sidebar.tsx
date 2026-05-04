import { Car, Cpu, FileText, Link, LogOut, Truck, Wifi } from "lucide-react"
import { useAuthStore } from "../../../store/auth.store"
import { useSignOut } from "../../../features/auth/hooks/auth.queries";
import { NavLink, useNavigate } from "react-router";
import { DarkLightButton } from "../ui/DarkLightButton";
import { toast } from "sonner";
import { AnimatedIcon } from "../ui/AnimatedIcon";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number, className?: string }>
  end?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'Catálogos',
    items: [
      {label: "Módulos GPS", path: '/gps/trackers', icon: Wifi },
      {label: "Modelos GPS", path: '/gps/models', icon: Cpu },
      {label: "Unidades", path: '/vehicles', icon: Truck, end: true},
      {label: "Modelos unidades", path: '/vehicles/models', icon: Car },
    ]
  },
  {
    title: 'Asignaciones',
    items: [
      {label: "Detalles GPS", path: '/gps-details', icon: Link },
    ]
  },
  {
    title: 'Reportes',
    items: [
      {label: "Reportes", path: '/reports', icon: FileText },
    ]
  }
]

export const Sidebar = ({ isOpen, onClose }: SideBarProps) => {

  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const {isPending, mutate: signOut} = useSignOut();

  const handleLogout = () => {
    signOut(undefined, {
      onSuccess: () => {
        toast.success("Sesión cerrada correctamente, Adiosin!!!");
        navigate('/login');
        useAuthStore.getState().clearUser();
      }
    })
  }

  return (
    <div className="flex flex-col w-64 min-h-screen bg-bg-secondary justify-between p-4">
      <div className="flex flex-col gap-1 items-center">
        <h2 className="text-lg font-bold text-text-primary">Hola!!!</h2>
        <p className="text-sm font-medium text-text-primary">{user?.name}</p>
        <p className="text-xs text-text-muted">{user?.email}</p>
      </div>
      <nav>
        {
          navSections.map((section, index) => (
            <div key={index} className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider px-2 mt-5">
                {section.title}
              </p>
              {(section.items).map((item) => (
                <NavLink
                  end={item.end}
                  key={item.label} 
                  to={item.path}
                  className={({isActive}) => `flex items-center gap-2 px-2 py-2 rounder-md text-sm transition-colors duration-200
                    ${isActive
                      ? 'bg-accent text-text-primary font-medium'
                      : 'text-text-muted hover:bg-bg-card hover:text-text-primary'
                    }
                  `}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
              
          ))
        }
      </nav>
      <div className="flex items-center gap-2">
        <DarkLightButton/>
        <AnimatedIcon onClick={handleLogout} disabled={isPending}>
          <LogOut size={24}/>
        </AnimatedIcon>
      </div>
    </div>
  )
}
