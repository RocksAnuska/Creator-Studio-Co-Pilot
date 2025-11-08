import { Header } from "@/components/Header";
import { PromptInput } from "@/components/PromptInput";
import { ContentCard } from "@/components/ContentCard";
import { Image, FileText, Hash, Video, Music, Palette } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 space-y-8 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            What do you want to create today?
          </h1>
          <p className="text-muted-foreground">
            Convert your ideas into content within Thomas Atrop
          </p>
        </div>

        <PromptInput />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Content Creation Tools</h2>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ContentCard
              title="Image Creator"
              icon={Image}
              description="Generate stunning visuals and thumbnails for your content with AI"
              gradient="from-primary to-primary-vibrant"
              link="/image-creator"
            />
            
            <ContentCard
              title="Script Writer"
              icon={FileText}
              description="Create engaging scripts and content outlines instantly"
              gradient="from-secondary to-accent"
              link="/script-writer"
            />
            
            <ContentCard
              title="Hashtag Generator"
              icon={Hash}
              description="Get trending and relevant hashtags to boost your reach"
              gradient="from-accent to-pink-coral"
            />
            
            <ContentCard
              title="Video Editor"
              icon={Video}
              description="Edit and enhance your videos with AI-powered tools"
              gradient="from-primary-deep to-secondary"
              link="/video-editor"
            />
            
            <ContentCard
              title="Music & Audio"
              icon={Music}
              description="Add perfect background music and audio effects"
              gradient="from-purple-bright to-accent"
            />
            
            <ContentCard
              title="Color Palette"
              icon={Palette}
              description="Generate beautiful color schemes for your brand"
              gradient="from-peach to-accent"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
