import { useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import apiClient from "@/lib/api";

export const PromptInput = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter your idea first!");
      return;
    }

    setIsLoading(true);
    toast.info("Creating your content...", {
      description: "Your AI co-pilot is working on it!",
    });

    try {
      const res = await apiClient.processPrompt(prompt);
      if (!res.success) {
        toast.error(res.error || 'Failed to process prompt');
        return;
      }

      toast.success("Content processed", {
        description: res.data?.suggestions?.analysis || 'Suggestions generated',
      });

      // Log the suggestions; extend to automatically navigate/open tools based on suggested_tools
      // eslint-disable-next-line no-console
      console.log('Process prompt result:', res.data);

      setPrompt("");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Prompt submit error:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to create content');
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading}
          >
            <Send className="h-4 w-4" />
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </div>
    </div>
  );
};
