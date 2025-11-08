import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Wand2, Download, Sparkles, ImagePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ImageCreator = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [size, setSize] = useState([1024]);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    toast.success("Generating your image...", {
      description: "This will take a few moments",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Hero Section */}
        <div className="relative mb-12 rounded-3xl bg-gradient-primary p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
          <div className="relative">
            <Sparkles className="mx-auto mb-4 h-12 w-12 text-white animate-pulse" />
            <h1 className="text-4xl font-bold text-white mb-3">AI Image Creator</h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Transform your imagination into stunning visuals with advanced AI
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            <Card className="p-6 border-border/50 bg-card/80 backdrop-blur">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ImagePlus className="h-5 w-5 text-primary" />
                Generation Settings
              </h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="prompt" className="text-base mb-2">
                    Describe your image
                  </Label>
                  <Textarea
                    id="prompt"
                    placeholder="A majestic lion in a sunset savanna..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[120px] bg-background/50"
                  />
                </div>

                <div>
                  <Label htmlFor="style" className="text-base mb-2">
                    Art Style
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {["realistic", "artistic", "anime"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setStyle(s)}
                        className={`p-3 rounded-lg border-2 transition-all capitalize ${
                          style === s
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="size" className="text-base mb-2">
                    Image Size: {size[0]}px
                  </Label>
                  <Slider
                    id="size"
                    min={512}
                    max={2048}
                    step={512}
                    value={size}
                    onValueChange={setSize}
                    className="mt-2"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  className="w-full bg-gradient-primary hover:opacity-90 h-12 text-lg gap-2"
                >
                  <Wand2 className="h-5 w-5" />
                  Generate Image
                </Button>
              </div>
            </Card>

            <Card className="p-6 border-border/50 bg-gradient-accent/10">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Be specific with colors, lighting, and mood</li>
                <li>• Include art style keywords like "cinematic" or "watercolor"</li>
                <li>• Mention camera angles for better composition</li>
              </ul>
            </Card>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <Card className="p-6 border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Preview</h2>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>

              <div className="aspect-square rounded-xl bg-muted flex items-center justify-center border-2 border-dashed border-border">
                <div className="text-center text-muted-foreground">
                  <ImagePlus className="h-16 w-16 mx-auto mb-3 opacity-50" />
                  <p>Your generated image will appear here</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border/50 bg-gradient-secondary/10">
              <h3 className="font-semibold mb-3">Recent Generations</h3>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg bg-muted border border-border hover:border-primary transition-colors cursor-pointer"
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ImageCreator;
