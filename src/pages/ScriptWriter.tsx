import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Wand2, Copy, Download, BookOpen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ScriptWriter = () => {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional");
  const [duration, setDuration] = useState("5");

  const handleGenerate = () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }
    toast.success("Generating your script...");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Hero Section */}
        <div className="relative mb-12 rounded-3xl bg-gradient-secondary p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
          <div className="relative">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-white animate-pulse" />
            <h1 className="text-4xl font-bold text-white mb-3">AI Script Writer</h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Create engaging video scripts in seconds with AI-powered content generation
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Input */}
          <div className="space-y-6">
            <Card className="p-6 border-border/50 bg-card/80 backdrop-blur">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-secondary" />
                Script Parameters
              </h2>

              <div className="space-y-5">
                <div>
                  <Label htmlFor="topic" className="text-base mb-2">
                    Video Topic
                  </Label>
                  <Input
                    id="topic"
                    placeholder="The future of sustainable energy..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="bg-background/50"
                  />
                </div>

                <div>
                  <Label htmlFor="tone" className="text-base mb-2">
                    Tone & Style
                  </Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual & Friendly</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                      <SelectItem value="entertaining">Entertaining</SelectItem>
                      <SelectItem value="motivational">Motivational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration" className="text-base mb-2">
                    Target Duration
                  </Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 minute</SelectItem>
                      <SelectItem value="3">3 minutes</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15+ minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="keywords" className="text-base mb-2">
                    Key Points (Optional)
                  </Label>
                  <Textarea
                    id="keywords"
                    placeholder="- Innovation in solar panels&#10;- Cost benefits&#10;- Environmental impact"
                    className="min-h-[100px] bg-background/50"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  className="w-full bg-gradient-secondary hover:opacity-90 h-12 text-lg gap-2"
                >
                  <Wand2 className="h-5 w-5" />
                  Generate Script
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Panel - Output */}
          <div className="space-y-6">
            <Card className="p-6 border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Generated Script</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="min-h-[400px] rounded-xl bg-muted/50 p-6 border border-border font-mono text-sm">
                <div className="text-muted-foreground text-center py-12">
                  <FileText className="h-16 w-16 mx-auto mb-3 opacity-50" />
                  <p>Your generated script will appear here</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border/50 bg-gradient-vibrant/10">
              <h3 className="font-semibold mb-3">Script Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Start with a hook to grab attention</li>
                <li>• Break content into clear sections</li>
                <li>• Include call-to-action at the end</li>
                <li>• Keep language simple and engaging</li>
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScriptWriter;
