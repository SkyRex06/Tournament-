
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, User, Shield, Menu } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in based on localStorage
    const userToken = localStorage.getItem("userToken");
    setIsLoggedIn(!!userToken);
    
    // Check if user is admin
    const adminToken = localStorage.getItem("adminToken");
    setIsAdmin(!!adminToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <nav className="w-full py-4 bg-bgmi-black/80 backdrop-blur-md border-b border-bgmi-gold/20 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold font-bebas text-white">
          <span className="text-bgmi-gold">BGMI</span> TOURNAMENTS
        </Link>
        
        <div className="hidden md:flex items-center relative w-1/3">
          <input 
            type="text" 
            placeholder="Search tournaments..." 
            className="w-full px-4 py-2 pr-10 bg-white/5 border border-bgmi-gold/20 rounded-md focus:outline-none focus:ring-2 focus:ring-bgmi-gold/50 text-white"
          />
          <Search className="absolute right-3 text-bgmi-gold" size={18} />
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline" className="border-bgmi-gold/50 text-bgmi-gold hover:bg-bgmi-gold/10">Dashboard</Button>
              </Link>
              <Button size="icon" variant="ghost" onClick={handleLogout} className="text-white hover:bg-white/5">
                <User className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="border-bgmi-gold/50 text-bgmi-gold hover:bg-bgmi-gold/10">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bgmi-button">Register</Button>
              </Link>
            </>
          )}
          
          {isAdmin ? (
            <Link to="/admin/dashboard">
              <Button variant="outline" size="icon" className="border-bgmi-gold/50 text-bgmi-gold hover:bg-bgmi-gold/10">
                <Shield className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/login?tab=admin">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/5">
                <Shield className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
        
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-white hover:bg-white/5"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-bgmi-black/95 border-t border-bgmi-gold/10 animate-fade-in">
          <div className="container mx-auto py-4 space-y-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search tournaments..." 
                className="w-full px-4 py-2 pr-10 bg-white/5 border border-bgmi-gold/20 rounded-md focus:outline-none focus:ring-2 focus:ring-bgmi-gold/50 text-white"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bgmi-gold" size={18} />
            </div>
            
            <div className="flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="w-full">
                    <Button variant="outline" className="w-full border-bgmi-gold/50 text-bgmi-gold hover:bg-bgmi-gold/10">Dashboard</Button>
                  </Link>
                  <Button onClick={handleLogout} className="w-full bg-transparent border border-red-500/50 text-red-500 hover:bg-red-500/10">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="w-full">
                    <Button variant="outline" className="w-full border-bgmi-gold/50 text-bgmi-gold hover:bg-bgmi-gold/10">Login</Button>
                  </Link>
                  <Link to="/register" className="w-full">
                    <Button className="w-full bgmi-button">Register</Button>
                  </Link>
                </>
              )}
              
              {isAdmin ? (
                <Link to="/admin/dashboard" className="w-full">
                  <Button variant="outline" className="w-full border-bgmi-gold/50 text-bgmi-gold hover:bg-bgmi-gold/10">
                    Admin Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/login?tab=admin" className="w-full">
                  <Button variant="ghost" className="w-full text-white hover:bg-white/5">
                    Admin Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
