
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, LogOut, Trophy, Users, Settings } from "lucide-react";
import AdminNav from "@/components/AdminNav";
import TournamentList from "@/components/admin/TournamentList";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if admin is logged in
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin panel",
    });
    navigate("/admin/login");
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <CardTitle className="text-lg">Active Tournaments</CardTitle>
              <Trophy className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-3xl font-bold">12</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <CardTitle className="text-lg">Registered Teams</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-3xl font-bold">48</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <CardTitle className="text-lg">Total Revenue</CardTitle>
              <Settings className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-3xl font-bold">₹24,000</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Tournament Management</h2>
          <Button onClick={() => navigate("/admin/create-tournament")}>
            <Plus className="h-4 w-4 mr-2" />
            Create Tournament
          </Button>
        </div>
        
        <Tabs defaultValue="active">
          <TabsList className="mb-4">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <TournamentList status="live" />
          </TabsContent>
          
          <TabsContent value="upcoming">
            <TournamentList status="upcoming" />
          </TabsContent>
          
          <TabsContent value="completed">
            <TournamentList status="past" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
