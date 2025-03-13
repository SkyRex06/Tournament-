
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  adminId: z.string().min(1, {
    message: "Admin ID is required",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adminId: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real application, you would validate admin credentials against a database
    // For demo purposes, we'll use hardcoded credentials
    if (values.adminId === "admin123" && values.password === "password123") {
      localStorage.setItem("adminToken", "admin-jwt-token");
      
      toast({
        title: "Admin Login Successful",
        description: "Welcome to the admin dashboard",
      });
      
      navigate("/admin/dashboard");
    } else {
      form.setError("root", { 
        message: "Invalid admin credentials. Please try again." 
      });
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto py-8 flex justify-center items-center">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access the admin panel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {form.formState.errors.root && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        {form.formState.errors.root.message}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <FormField
                    control={form.control}
                    name="adminId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admin ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your admin ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link to="/" className="text-sm text-muted-foreground hover:underline">
                Return to Home
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
