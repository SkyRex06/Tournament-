
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const userFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

const adminFormSchema = z.object({
  adminId: z.string().min(1, {
    message: "Admin ID is required",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("user");
  
  const userForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const adminForm = useForm<z.infer<typeof adminFormSchema>>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      adminId: "",
      password: "",
    },
  });

  function onUserSubmit(values: z.infer<typeof userFormSchema>) {
    // In a real application, you would handle authentication here
    console.log(values);
    
    // Mock successful login - store token in localStorage
    localStorage.setItem("userToken", "mock-jwt-token");
    
    toast({
      title: "Login Successful",
      description: "Welcome back to BGMI Tournaments!",
    });
    
    // Redirect to home page after login
    navigate("/");
  }

  function onAdminSubmit(values: z.infer<typeof adminFormSchema>) {
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
      adminForm.setError("root", { 
        message: "Invalid admin credentials. Please try again." 
      });
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto py-8 flex justify-center items-center">
        <div className="w-full max-w-md">
          <Tabs defaultValue="user" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="user">User Login</TabsTrigger>
              <TabsTrigger value="admin">Admin Login</TabsTrigger>
            </TabsList>
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">
                  {activeTab === "user" ? "User Login" : "Admin Login"}
                </CardTitle>
                <CardDescription className="text-center">
                  {activeTab === "user" 
                    ? "Enter your credentials to access your account" 
                    : "Enter your admin credentials to access the admin panel"}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <TabsContent value="user" className="mt-0">
                  <Form {...userForm}>
                    <form onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-4">
                      <FormField
                        control={userForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={userForm.control}
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
                </TabsContent>
                
                <TabsContent value="admin" className="mt-0">
                  <Form {...adminForm}>
                    <form onSubmit={adminForm.handleSubmit(onAdminSubmit)} className="space-y-4">
                      {adminForm.formState.errors.root && (
                        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                          {adminForm.formState.errors.root.message}
                        </div>
                      )}
                      
                      <FormField
                        control={adminForm.control}
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
                        control={adminForm.control}
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
                        Login as Admin
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </CardContent>
              
              <CardFooter className="flex flex-col gap-2">
                {activeTab === "user" && (
                  <>
                    <div className="text-sm text-muted-foreground text-center">
                      Don't have an account?{" "}
                      <Link to="/register" className="text-primary underline-offset-4 hover:underline">
                        Register
                      </Link>
                    </div>
                    <Link to="/" className="text-sm text-muted-foreground text-center hover:underline">
                      Forgot password?
                    </Link>
                  </>
                )}
                {activeTab === "admin" && (
                  <Link to="/" className="text-sm text-muted-foreground text-center hover:underline">
                    Return to Home
                  </Link>
                )}
              </CardFooter>
            </Card>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;
