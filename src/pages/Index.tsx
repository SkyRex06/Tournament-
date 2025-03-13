
import Navbar from "@/components/Navbar";
import TournamentCard from "@/components/TournamentCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Trophy, Users, Zap } from "lucide-react";

// Mock tournament data
const mockTournaments = [
  {
    id: "1",
    title: "TDM Tournament",
    type: "SQUAD",
    slots: "1/8",
    entryFee: 200,
    prizePool: 2000,
    date: "June 15, 2023",
    status: "upcoming" as const
  },
  {
    id: "2",
    title: "Classical Tournament",
    type: "DUO",
    slots: "5/16",
    entryFee: 150,
    prizePool: 1500,
    date: "June 18, 2023",
    status: "upcoming" as const
  },
  {
    id: "3",
    title: "Classical Tournament",
    type: "SQUAD",
    slots: "8/25",
    entryFee: 300,
    prizePool: 3000,
    date: "June 20, 2023",
    status: "upcoming" as const
  },
  {
    id: "4",
    title: "Erangel Battle",
    type: "SQUAD",
    slots: "16/16",
    entryFee: 250,
    prizePool: 2500,
    date: "June 12, 2023",
    status: "live" as const
  },
  {
    id: "5",
    title: "Miramar Showdown",
    type: "SQUAD",
    slots: "24/24",
    entryFee: 200,
    prizePool: 2200,
    date: "June 10, 2023",
    status: "past" as const
  }
];

const Index = () => {
  const [filter, setFilter] = useState<"all" | "upcoming" | "live" | "past">("all");

  const filteredTournaments = filter === "all" 
    ? mockTournaments 
    : mockTournaments.filter(t => t.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-bgmi-black to-bgmi-black/95">
      <Navbar />
      
      <div className="container mx-auto py-12">
        <div className="glass-panel p-8 mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 font-bebas text-white">
            BGMI <span className="neon-text">TOURNAMENTS</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg mb-8">
            Join the most competitive BGMI tournaments and win exciting prizes. 
            Showcase your skills and climb the leaderboards!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-panel p-6 flex flex-col items-center justify-center">
              <Trophy className="h-10 w-10 text-bgmi-gold mb-3" />
              <h3 className="text-xl font-semibold text-white mb-1">₹10,000+</h3>
              <p className="text-muted-foreground text-sm">Prize Pool</p>
            </div>
            <div className="glass-panel p-6 flex flex-col items-center justify-center">
              <Users className="h-10 w-10 text-bgmi-blue mb-3" />
              <h3 className="text-xl font-semibold text-white mb-1">500+</h3>
              <p className="text-muted-foreground text-sm">Active Players</p>
            </div>
            <div className="glass-panel p-6 flex flex-col items-center justify-center">
              <Zap className="h-10 w-10 text-bgmi-orange mb-3" />
              <h3 className="text-xl font-semibold text-white mb-1">24/7</h3>
              <p className="text-muted-foreground text-sm">Tournament Support</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-8">
          <Button 
            variant={filter === "all" ? "default" : "outline"} 
            onClick={() => setFilter("all")}
            className={filter === "all" ? "bgmi-button" : "border-bgmi-gold/50 text-bgmi-gold"}
          >
            All Tournaments
          </Button>
          <Button 
            variant={filter === "upcoming" ? "default" : "outline"} 
            onClick={() => setFilter("upcoming")}
            className={filter === "upcoming" ? "bgmi-button" : "border-bgmi-gold/50 text-bgmi-gold"}
          >
            Upcoming
          </Button>
          <Button 
            variant={filter === "live" ? "default" : "outline"} 
            onClick={() => setFilter("live")}
            className={filter === "live" ? "bgmi-button" : "border-bgmi-gold/50 text-bgmi-gold"}
          >
            Live Now
          </Button>
          <Button 
            variant={filter === "past" ? "default" : "outline"} 
            onClick={() => setFilter("past")}
            className={filter === "past" ? "bgmi-button" : "border-bgmi-gold/50 text-bgmi-gold"}
          >
            Completed
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament) => (
            <TournamentCard key={tournament.id} {...tournament} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
