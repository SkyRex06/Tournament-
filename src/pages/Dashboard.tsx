
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Clock, Trophy, User } from "lucide-react";

const upcomingTournaments = [
  {
    id: "1",
    title: "TDM Tournament",
    date: "June 15, 2023",
    time: "8:00 PM",
    type: "SQUAD",
    status: "registered"
  },
  {
    id: "2",
    title: "Classical Tournament",
    date: "June 18, 2023",
    time: "7:30 PM",
    type: "DUO",
    status: "registered"
  }
];

const pastTournaments = [
  {
    id: "3",
    title: "Erangel Battle",
    date: "June 5, 2023",
    time: "8:00 PM",
    type: "SQUAD",
    result: "Winner (#1)",
    prize: 1000
  },
  {
    id: "4",
    title: "Miramar Showdown",
    date: "May 28, 2023",
    time: "9:00 PM",
    type: "SQUAD",
    result: "3rd Place",
    prize: 300
  }
];

// Mock user data
const userData = {
  name: "John Doe",
  email: "john@example.com",
  bgmiUID: "51234567890",
  totalWinnings: 1300,
  tournamentsPlayed: 5,
  wins: 1
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Profile</CardTitle>
                <CardDescription>Your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{userData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{userData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">BGMI UID:</span>
                    <span className="font-medium">{userData.bgmiUID}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Statistics</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-muted p-2 rounded-md text-center">
                      <div className="text-lg font-bold">{userData.tournamentsPlayed}</div>
                      <div className="text-xs text-muted-foreground">Played</div>
                    </div>
                    <div className="bg-muted p-2 rounded-md text-center">
                      <div className="text-lg font-bold">{userData.wins}</div>
                      <div className="text-xs text-muted-foreground">Wins</div>
                    </div>
                    <div className="bg-muted p-2 rounded-md text-center">
                      <div className="text-lg font-bold">₹{userData.totalWinnings}</div>
                      <div className="text-xs text-muted-foreground">Earnings</div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="upcoming" className="flex-1">Upcoming Tournaments</TabsTrigger>
                <TabsTrigger value="past" className="flex-1">Past Tournaments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="space-y-4">
                {upcomingTournaments.length > 0 ? (
                  upcomingTournaments.map((tournament) => (
                    <Card key={tournament.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold">{tournament.title}</h3>
                          <div className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Registered
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            <span>{tournament.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{tournament.time}</span>
                          </div>
                          <div className="flex items-center gap-2 md:col-span-2">
                            <span className="text-muted-foreground">Type:</span>
                            <span>{tournament.type}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <Link to={`/tournament/${tournament.id}`}>
                            <Button variant="outline" size="sm">View Details</Button>
                          </Link>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Room ID & Password:</span>
                            <span className="font-medium text-sm">Available 15 min before match</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">You haven't registered for any upcoming tournaments.</p>
                    <Link to="/">
                      <Button>Browse Tournaments</Button>
                    </Link>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="past" className="space-y-4">
                {pastTournaments.length > 0 ? (
                  pastTournaments.map((tournament) => (
                    <Card key={tournament.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold">{tournament.title}</h3>
                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-amber-500" />
                            <span className="font-medium">{tournament.result}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            <span>{tournament.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{tournament.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Type:</span>
                            <span>{tournament.type}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Prize:</span>
                            <span className="font-medium">₹{tournament.prize}</span>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm">View Results</Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">You haven't participated in any tournaments yet.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
