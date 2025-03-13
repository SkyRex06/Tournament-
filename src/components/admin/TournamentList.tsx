
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2, Eye, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type TournamentListProps = {
  status: "upcoming" | "live" | "past";
};

// Mock tournament data
const mockTournaments = [
  {
    id: "t1",
    title: "BGMI Pro League Season 5",
    type: "Squad",
    slots: "25/100",
    entryFee: 200,
    prizePool: 10000,
    date: "2023-08-15",
    status: "upcoming",
    registeredTeams: 25,
    matchRoomId: "",
    matchRoomPassword: ""
  },
  {
    id: "t2",
    title: "Weekend Warriors Cup",
    type: "Duo",
    slots: "50/50",
    entryFee: 150,
    prizePool: 5000,
    date: "2023-08-10",
    status: "live",
    registeredTeams: 50,
    matchRoomId: "BGM12345",
    matchRoomPassword: "warrior123"
  },
  {
    id: "t3",
    title: "BGMI Summer Championship",
    type: "Solo",
    slots: "100/100",
    entryFee: 100,
    prizePool: 7500,
    date: "2023-07-30",
    status: "past",
    registeredTeams: 100,
    matchRoomId: "BGM54321",
    matchRoomPassword: "summer123"
  }
];

const TournamentList = ({ status }: TournamentListProps) => {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState(mockTournaments.filter(t => t.status === status));

  const handleDelete = (id: string) => {
    // In a real app, this would make an API call to delete the tournament
    setTournaments(tournaments.filter(t => t.id !== id));
    toast({
      title: "Tournament Deleted",
      description: "The tournament has been successfully deleted."
    });
  };

  const updateRoomDetails = (id: string) => {
    // In a real app, this would navigate to a form to update room details
    navigate(`/admin/tournament/${id}/update-room`);
  };

  return (
    <div className="space-y-4">
      {tournaments.length === 0 ? (
        <div className="text-center py-8 border rounded-md bg-muted/20">
          <p className="text-muted-foreground">No tournaments found.</p>
        </div>
      ) : (
        tournaments.map((tournament) => (
          <Card key={tournament.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4">
                <div className="space-y-1 mb-2 md:mb-0">
                  <h3 className="font-medium">{tournament.title}</h3>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <span>{tournament.type}</span>
                    <span>•</span>
                    <span>Entry: ₹{tournament.entryFee}</span>
                    <span>•</span>
                    <span>Prize: ₹{tournament.prizePool}</span>
                    <span>•</span>
                    <span>Date: {tournament.date}</span>
                  </div>
                  {status === "live" && (
                    <div className="mt-2 p-2 bg-muted rounded text-sm">
                      <p><strong>Room ID:</strong> {tournament.matchRoomId || "Not set"}</p>
                      <p><strong>Password:</strong> {tournament.matchRoomPassword || "Not set"}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/admin/tournament/${tournament.id}/teams`)}
                  >
                    <Users className="h-4 w-4 mr-1" />
                    Teams ({tournament.registeredTeams})
                  </Button>
                  
                  {status === "upcoming" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateRoomDetails(tournament.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                  
                  {status === "live" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateRoomDetails(tournament.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Room ID
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/tournament/${tournament.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(tournament.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default TournamentList;
