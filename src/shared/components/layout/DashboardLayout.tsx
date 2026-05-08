import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router";
import { Hamburger } from "lucide-react";
import { AnimatedIcon } from "../ui/AnimatedIcon";
import { CustomToolTip } from "../ui/CustomToolTip";

const DashboardLayout = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} onClose={handleClose}/>
      <div className="flex-1">
        <div className="lg:hidden p-3">
          <CustomToolTip
            text="Menú"
            position="bottom"
          >
            <AnimatedIcon
              onClick={ () => setIsOpen(!isOpen)}

            >
              <Hamburger size={24}/>
            </AnimatedIcon>

          </CustomToolTip>
        </div>
        <main className="p-6">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout;