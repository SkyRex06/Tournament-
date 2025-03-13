
import { Link, useParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  teamName: z.string().min(3, {
    message: "Team name must be at least 3 characters long",
  }),
  player1UID: z.string().min(8, {
    message: "BGMI UID must be at least 8 characters long",
  }),
  player2UID: z.string().min(8, {
    message: "BGMI UID must be at least 8 characters long",
  }),
  player3UID: z.string().min(8, {
    message: "BGMI UID must be at least 8 characters long",
  }),
  player4UID: z.string().min(8, {
    message: "BGMI UID must be at least 8 characters long",
  }),
});

const TeamRegistration = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      player1UID: "",
      player2UID: "",
      player3UID: "",
      player4UID: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormData(values);
    setShowPayment(true);
  }
  
  function handlePayment() {
    console.log("Processing payment for team:", formData);
    
    toast({
      title: "Payment Initiated",
      description: "Processing your payment...",
    });
    
    setTimeout(() => {
      navigate(`/tournament/${id}/payment-success`);
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto py-8">
        <Link to={`/tournament/${id}`} className="flex items-center gap-1 text-muted-foreground mb-6">
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Tournament</span>
        </Link>
        
        <div className="max-w-3xl mx-auto">
          {!showPayment ? (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Register Your Team</CardTitle>
                <CardDescription>
                  Enter your team details to participate in the tournament.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="teamName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your team name" {...field} />
                          </FormControl>
                          <FormDescription>
                            This will be displayed in tournament listings.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Player Details</h3>
                      
                      <FormField
                        control={form.control}
                        name="player1UID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Player 1 BGMI UID (Captain)</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter BGMI UID" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="player2UID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Player 2 BGMI UID</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter BGMI UID" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="player3UID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Player 3 BGMI UID</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter BGMI UID" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="player4UID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Player 4 BGMI UID</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter BGMI UID" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Registration Charge</h4>
                      <div className="flex justify-between mb-2">
                        <span>Entry Fee:</span>
                        <span>₹200</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>₹200</span>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Continue to Payment
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-center text-sm text-muted-foreground">
                By registering, you agree to the tournament rules and regulations.
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Payment</CardTitle>
                <CardDescription>
                  Complete payment to confirm your registration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-muted p-4 rounded-md mb-6">
                    <h4 className="font-medium mb-2">Order Summary</h4>
                    <div className="flex justify-between mb-2">
                      <span>Team Name:</span>
                      <span>{formData?.teamName}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Tournament:</span>
                      <span>TDM Tournament</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Entry Fee:</span>
                      <span>₹200</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                      <span>Total:</span>
                      <span>₹200</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Method</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-md p-3 flex items-center gap-2 cursor-pointer bg-muted/50">
                        <div className="h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                        </div>
                        <span>UPI</span>
                      </div>
                      <div className="border rounded-md p-3 flex items-center gap-2 cursor-pointer">
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground"></div>
                        <span>Card</span>
                      </div>
                    </div>
                    <div className="pt-4">
                      <Input placeholder="Enter UPI ID" className="mb-4" />
                    </div>
                  </div>
                  
                  <Button onClick={handlePayment} className="w-full">
                    Pay ₹200
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center text-sm text-muted-foreground">
                Your payment information is secure and encrypted.
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamRegistration;
