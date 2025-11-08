import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Upload, Scissors, Wand2, Music, Type, Download } from "lucide-react";
import { useState } from "react";

const VideoEditor = () => {
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [saturation, setSaturation] = useState([100]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Hero Section */}
        <div className="relative mb-12 rounded-3xl bg-gradient-accent p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
          <div className="relative">
            <Video className="mx-auto mb-4 h-12 w-12 text-white animate-pulse" />
            <h1 className="text-4xl font-bold text-white mb-3">AI Video Editor</h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Edit and enhance your videos with powerful AI tools
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Tools */}
          <div className="space-y-6">
            <Card className="p-6 border-border/50">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Video
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Scissors className="h-4 w-4" />
                  Trim & Cut
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Music className="h-4 w-4" />
                  Add Music
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Type className="h-4 w-4" />
                  Add Text
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Wand2 className="h-4 w-4" />
                  AI Effects
                </Button>
              </div>
            </Card>

            <Card className="p-6 border-border/50 bg-gradient-primary/10">
              <h3 className="font-semibold mb-3">Timeline</h3>
              <div className="space-y-2">
                <div className="h-12 rounded bg-primary/20 border border-primary/40 flex items-center px-3">
                  <Video className="h-4 w-4 mr-2" />
                  <span className="text-sm">video_1.mp4</span>
                </div>
                <div className="h-12 rounded bg-secondary/20 border border-secondary/40 flex items-center px-3">
                  <Music className="h-4 w-4 mr-2" />
                  <span className="text-sm">background_music.mp3</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Center - Preview */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Preview</h2>
                <Button className="bg-gradient-accent gap-2">
                  <Download className="h-4 w-4" />
                  Export Video
                </Button>
              </div>

              <div className="aspect-video rounded-xl bg-black flex items-center justify-center border-2 border-border mb-6">
                <div className="text-center text-white/70">
                  <Video className="h-20 w-20 mx-auto mb-4 opacity-50" />
                  <p>Upload or drag a video to start editing</p>
                </div>
              </div>

              {/* Controls */}
              <Tabs defaultValue="adjustments" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="adjustments">Adjustments</TabsTrigger>
                  <TabsTrigger value="effects">Effects</TabsTrigger>
                  <TabsTrigger value="filters">Filters</TabsTrigger>
                </TabsList>
                
                <TabsContent value="adjustments" className="space-y-6 mt-6">
                  <div>
                    <Label className="mb-3 flex items-center justify-between">
                      Brightness
                      <span className="text-muted-foreground">{brightness[0]}%</span>
                    </Label>
                    <Slider
                      min={0}
                      max={200}
                      value={brightness}
                      onValueChange={setBrightness}
                    />
                  </div>
                  <div>
                    <Label className="mb-3 flex items-center justify-between">
                      Contrast
                      <span className="text-muted-foreground">{contrast[0]}%</span>
                    </Label>
                    <Slider
                      min={0}
                      max={200}
                      value={contrast}
                      onValueChange={setContrast}
                    />
                  </div>
                  <div>
                    <Label className="mb-3 flex items-center justify-between">
                      Saturation
                      <span className="text-muted-foreground">{saturation[0]}%</span>
                    </Label>
                    <Slider
                      min={0}
                      max={200}
                      value={saturation}
                      onValueChange={setSaturation}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="effects" className="mt-6">
                  <div className="grid grid-cols-3 gap-4">
                    {["Blur", "Sharpen", "Vignette", "Glow", "Noise", "Grain"].map((effect) => (
                      <button
                        key={effect}
                        className="aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors flex items-center justify-center text-sm font-medium"
                      >
                        {effect}
                      </button>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="filters" className="mt-6">
                  <div className="grid grid-cols-3 gap-4">
                    {["Cinematic", "Vintage", "Warm", "Cool", "B&W", "Sepia"].map((filter) => (
                      <button
                        key={filter}
                        className="aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors flex items-center justify-center text-sm font-medium"
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoEditor;
