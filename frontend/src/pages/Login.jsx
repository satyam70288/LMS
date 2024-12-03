import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { toast } from "sonner";
import { useEffect, useState } from "react"
import {  useNavigate } from "react-router-dom"

const Login = () => {
    const navigate=useNavigate()
    const [loginInput, setLoginInput] = useState({ email: "", password: "" })
    const [signUpInput, setSignUpInput] = useState({ name: "", email: "", password: "" })
    const [
        registerUser,
        {
          data: registerData,
          error: registerError,
          isLoading: registerIsLoading,
          isSuccess: registerIsSuccess,
        },
      ] = useRegisterUserMutation();  
    const [
        loginUser,
        {
          data: loginData,
          error: loginError,
          isLoading: loginIsLoading,
          isSuccess: loginIsSuccess,
        },
      ] = useLoginUserMutation();    const ChangeHandlar = (event, type) => {
        const { name, value } = event.target
        if (type === "signup") {
            setSignUpInput({ ...signUpInput, [name]: value })
        } else {
            setLoginInput({ ...loginInput, [name]: value })
        }
    }

    const handalRegistration = async (type) => {
        const inputData = type === "signup" ? signUpInput : loginInput;
        console.log("Input Data:", inputData);
    
        const action = type === "signup" ? registerUser : loginUser;
        console.log("Action being called:", action);
    
        try {
            const result = await action(inputData).unwrap(); // Use unwrap() to catch errors
            console.log("API Response:", result);
        } catch (error) {
            console.error("API Error:", error);
        }
    };
    useEffect(() => {
        if(registerIsSuccess && registerData){
          toast.success(registerData || "Signup successful.")
        }
        if(registerError){
          toast.error(registerError || "Signup Failed");
        }
        if(loginIsSuccess && loginData){
          toast.success(loginData.message || "Login successful.");
          navigate("/");
        }
        if(loginError){ 
          toast.error(loginError.data.message || "login Failed");
        }
      }, [
        loginIsLoading,
        registerIsLoading,
        loginData,
        registerData,
        loginError,
        registerError,
      ]);
    
    
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Tabs defaultValue="SignUp" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="SignUp">SignUp</TabsTrigger>
                    <TabsTrigger value="Login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="SignUp">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign Up</CardTitle>
                            <CardDescription>
                                Create an account by filling in the details below.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input type="text"
                                    id="name"
                                    name="name"
                                    value={signUpInput.name}
                                    onChange={(event) => ChangeHandlar(event, "signup")}
                                    placeholder="Enter your full name" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email"
                                    required={true}
                                    name="email"
                                    value={signUpInput.email}
                                    type="email"
                                    onChange={(event) => ChangeHandlar(event, "signup")}
                                    placeholder="Enter your email" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password"
                                    name="password"
                                    value={signUpInput.password}
                                    type="password"
                                    onChange={(event) => ChangeHandlar(event, "signup")}
                                    placeholder="Create a password" />
                            </div>

                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => handalRegistration("signup")}>Sign Up</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="Login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Enter your credentials to log into your account.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email"
                                    type="email"
                                    name="email"
                                    value={loginInput.email}
                                    onChange={(event) => ChangeHandlar(event, "login")}
                                    placeholder="Enter your email" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password"
                                    type="password"
                                    name="password"
                                    value={loginInput.password}
                                    onChange={(event) => ChangeHandlar(event, "login")}
                                    placeholder="Enter your password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => handalRegistration("login")}>Login</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    )
}

export default Login