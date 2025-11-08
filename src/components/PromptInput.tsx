import { useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const PromptInput = () => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (!prompt.trim()) {
      toast.error("Please enter your idea first!");
      return;
    }
    toast.success("Creating your content...", {
      description: "Your AI co-pilot is working on it!",
    });
    setPrompt("");
  };

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-accent rounded-2xl opacity-20 blur-xl" />
      
      <div className="relative rounded-2xl border border-border/50 bg-card/90 backdrop-blur p-6 shadow-soft">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary-vibrant" />
          <h2 className="text-lg font-semibold">Let's convert your idea into content...</h2>
        </div>
        
        <div className="flex gap-3">
          <Textarea
            placeholder="I want to create educational motivational video..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px] resize-none border-border/50 bg-background/50 focus-visible:ring-primary-vibrant"
          />
        </div>
        
        <div className="flex justify-end mt-4">
          <Button 
            onClick={handleSubmit}
            className="bg-gradient-primary hover:opacity-90 transition-opacity gap-2"
          >
            <Send className="h-4 w-4" />
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
};
