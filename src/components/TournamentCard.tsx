
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Trophy, Users } from "lucide-react";

type TournamentCardProps = {
  id: string;
  title: string;
  type: string;
  slots: string;
  entryFee: number;
  prizePool: number;
  date: string;
  status: "upcoming" | "live" | "past";
};

const TournamentCard = ({
  id,
  title,
  type,
  slots,
  entryFee,
  prizePool,
  date,
  status
}: TournamentCardProps) => {
  return (
    <Card className="bgmi-card overflow-hidden transition-all duration-200 hover:translate-y-[-5px]">
      <CardHeader className="pb-2 border-b border-bgmi-gold/10">
        <div className="flex justify-between items-start">
          <CardTitle className="text-white font-orbitron">{title}</CardTitle>
          <div className={`px-2 py-1 text-xs rounded-full font-medium ${
            status === "live" ? "bg-bgmi-green/20 text-bgmi-green animate-pulse" :
            status === "upcoming" ? "bg-bgmi-blue/20 text-bgmi-blue" :
            "bg-gray-700/50 text-gray-300"
          }`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>
        <CardDescription className="flex items-center gap-1 text-gray-400">
          <CalendarIcon className="h-3 w-3" /> {date}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div className="flex items-center gap-1 text-white">
            <Users className="h-4 w-4 text-bgmi-blue" />
            <span>{type}</span>
          </div>
          <div className="flex items-center gap-1 text-white">
            <span className="font-medium text-gray-400">Slots:</span> {slots}
          </div>
          <div className="flex items-center gap-1 text-white">
            <span className="font-medium text-gray-400">Entry:</span> 
            <span className="text-bgmi-gold">₹{entryFee}</span>
          </div>
          <div className="flex items-center gap-1 text-white">
            <Trophy className="h-4 w-4 text-bgmi-gold" />
            <span className="text-bgmi-gold">₹{prizePool}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-bgmi-black/60 pt-2 border-t border-bgmi-gold/10">
        <Link to={`/tournament/${id}`} className="w-full">
          <Button className={`w-full font-orbitron ${status === "upcoming" ? "bgmi-button" : "bg-transparent border border-bgmi-gold/50 text-bgmi-gold hover:bg-bgmi-gold/10"}`}>
            {status === "upcoming" ? "Register Now" : "View Details"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TournamentCard;
