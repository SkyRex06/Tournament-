
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, BarChart, Users, Settings } from "lucide-react";

const AdminNav = () => {
  return (
    <nav className="w-full py-4 bg-background border-b border-border">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/admin/dashboard" className="text-2xl font-bold">
          BGMI Admin
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/admin/dashboard">
            <Button variant="ghost" size="sm">
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          
          <Link to="/admin/tournaments">
            <Button variant="ghost" size="sm">
              <BarChart className="h-4 w-4 mr-2" />
              Tournaments
            </Button>
          </Link>
          
          <Link to="/admin/teams">
            <Button variant="ghost" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Teams
            </Button>
          </Link>
          
          <Link to="/admin/settings">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
