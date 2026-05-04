import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router";
import { CustomButton } from "../ui/CustomButton";
import { Hamburger } from "lucide-react";

const DashboardLayout = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} onClose={handleClose}/>
      <div className="flex-1">
        <div>
          <CustomButton
            variant="icon"
            size="small"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Hamburger size={24}/>
          </CustomButton>
        </div>
        <main>
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout;