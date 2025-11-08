import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-peach-light/30 to-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-accent opacity-5 animate-glow" />
      
      <Card className="w-full max-w-md relative overflow-hidden border-border/50 bg-card/95 backdrop-blur shadow-glow">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary" />
        
        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Creator Studio Co-Pilot
            </h1>
            
            <p className="text-muted-foreground">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-border/50 bg-background/50 focus-visible:ring-primary-vibrant"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Password {!isLogin && <span className="text-muted-foreground text-xs">(min. 8 characters)</span>}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-border/50 bg-background/50 focus-visible:ring-primary-vibrant"
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="text-sm text-primary-vibrant hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {isLogin ? "Sign in" : "Create account"}
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isLogin ? (
                <>
                  Not a member?{" "}
                  <span className="text-primary-vibrant font-medium">Create account</span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span className="text-primary-vibrant font-medium">Sign in</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
