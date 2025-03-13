
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Trophy, Users, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock tournament data (in a real app, this would be fetched from an API)
const mockTournament = {
  id: "1",
  title: "TDM Tournament",
  description: "Join our Team Deathmatch tournament and compete against the best BGMI players.",
  type: "SQUAD",
  slots: "1/8",
  entryFee: 200,
  prizePool: 2000,
  date: "June 15, 2023",
  time: "8:00 PM",
  status: "upcoming",
  rules: [
    "All players must be in the lobby 15 minutes before the match.",
    "Teams must consist of 4 players.",
    "Any form of cheating or teaming will lead to disqualification.",
    "Tournament format: TDM - 3 matches.",
    "Points: Kills (1 point), Victory (5 points)."
  ],
  prizes: [
    { position: "1st", amount: 1000 },
    { position: "2nd", amount: 600 },
    { position: "3rd", amount: 400 }
  ]
};

const TournamentDetails = () => {
  const { id } = useParams();
  // In a real app, you would fetch the tournament details using the ID

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              &larr; Back to Tournaments
            </Button>
          </Link>
          <div className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
            {mockTournament.status.charAt(0).toUpperCase() + mockTournament.status.slice(1)}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{mockTournament.title}</h1>
            <p className="text-muted-foreground mb-6">{mockTournament.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" />
                  <span>Date</span>
                </div>
                <div className="font-medium">{mockTournament.date}</div>
              </div>
              
              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Clock className="h-4 w-4" />
                  <span>Time</span>
                </div>
                <div className="font-medium">{mockTournament.time}</div>
              </div>
              
              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Users className="h-4 w-4" />
                  <span>Team Type</span>
                </div>
                <div className="font-medium">{mockTournament.type}</div>
              </div>
              
              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Trophy className="h-4 w-4" />
                  <span>Prize Pool</span>
                </div>
                <div className="font-medium">₹{mockTournament.prizePool}</div>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">Tournament Rules</h2>
            <ul className="space-y-2 mb-8">
              {mockTournament.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                    {index + 1}
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
            
            <h2 className="text-xl font-semibold mb-4">Prize Distribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {mockTournament.prizes.map((prize, index) => (
                <div key={index} className="bg-card p-4 rounded-lg border text-center">
                  <div className="text-lg font-semibold">{prize.position}</div>
                  <div className="text-xl font-bold text-primary">₹{prize.amount}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg border sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Tournament Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Slots:</span>
                  <span className="font-medium">{mockTournament.slots}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Entry Fee:</span>
                  <span className="font-medium">₹{mockTournament.entryFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prize Pool:</span>
                  <span className="font-medium">₹{mockTournament.prizePool}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format:</span>
                  <span className="font-medium">{mockTournament.type}</span>
                </div>
              </div>
              
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Registration closes 1 hour before the tournament starts.
                </AlertDescription>
              </Alert>
              
              <Link to={`/tournament/${id}/register-team`}>
                <Button className="w-full">Register Your Team</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;
