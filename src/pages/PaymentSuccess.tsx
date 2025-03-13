
import { Link, useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentSuccess = () => {
  const { id } = useParams();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto py-8 flex justify-center items-center">
        <div className="w-full max-w-md">
          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-20 w-20 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Registration Successful!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <p className="text-muted-foreground">
                Your team has been successfully registered for the tournament.
              </p>
              
              <div className="bg-muted p-4 rounded-md text-left">
                <h4 className="font-medium mb-2">Tournament Details</h4>
                <div className="grid grid-cols-2 gap-y-2">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span>TXN{Math.floor(Math.random() * 1000000)}</span>
                  
                  <span className="text-muted-foreground">Amount Paid:</span>
                  <span>₹200</span>
                  
                  <span className="text-muted-foreground">Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
                <p className="text-blue-800 text-sm">
                  Room ID and Password will be shared 15 minutes before the match starts.
                  Please check your dashboard for updates.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Link to="/dashboard" className="w-full">
                <Button className="w-full">Go to Dashboard</Button>
              </Link>
              <Link to={`/tournament/${id}`} className="w-full">
                <Button variant="outline" className="w-full">View Tournament</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
