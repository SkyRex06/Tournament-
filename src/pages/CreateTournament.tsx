
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AdminNav from "@/components/AdminNav";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Tournament title must be at least 5 characters long",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters long",
  }),
  gameType: z.enum(["Solo", "Duo", "Squad"]),
  entryFee: z.coerce.number().min(0),
  prizePool: z.coerce.number().min(1, {
    message: "Prize pool must be at least ₹1",
  }),
  maxSlots: z.coerce.number().min(10).max(100),
  date: z.string().min(1, {
    message: "Tournament date is required",
  }),
  time: z.string().min(1, {
    message: "Tournament time is required",
  }),
  rules: z.string().optional(),
});

const CreateTournament = () => {
  const navigate = useNavigate();
  
  // Check if admin is logged in
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
    }
  }, [navigate]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      gameType: "Squad",
      entryFee: 100,
      prizePool: 5000,
      maxSlots: 100,
      date: "",
      time: "",
      rules: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    toast({
      title: "Tournament Created",
      description: "The tournament has been successfully created.",
    });
    
    navigate("/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Create Tournament</h1>
          <p className="text-muted-foreground">Set up a new BGMI tournament</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Tournament Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tournament Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter tournament title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gameType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Game Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select game type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Solo">Solo</SelectItem>
                            <SelectItem value="Duo">Duo</SelectItem>
                            <SelectItem value="Squad">Squad</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="entryFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entry Fee (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="prizePool"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prize Pool (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="maxSlots"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Slots</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Number of teams that can participate
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter tournament description" 
                          className="min-h-32" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="rules"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rules (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter tournament rules" 
                          className="min-h-32" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Specify any special rules or guidelines for the tournament
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/admin/dashboard")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Tournament</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateTournament;
