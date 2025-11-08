import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Grid3x3, List, Star, Download, Share2, Trash2 } from "lucide-react";

const Gallery = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Content Gallery</h1>
          <p className="text-muted-foreground">
            All your generated content in one place
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your content..."
              className="pl-10 bg-card/50"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="scripts">Scripts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <Card key={i} className="group overflow-hidden border-border/50 hover:shadow-glow transition-all">
                  <div className="aspect-square bg-gradient-primary opacity-20" />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium mb-1 line-clamp-1">
                          Content {i + 1}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Created 2 days ago
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Share2 className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-1 text-destructive hover:text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="images" className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square rounded-lg bg-gradient-secondary/20 border border-border hover:border-primary transition-colors" />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-video rounded-lg bg-gradient-accent/20 border border-border hover:border-primary transition-colors" />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="scripts" className="mt-8">
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="p-6 border-border/50 hover:shadow-soft transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold mb-2">Script Title {i + 1}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Created on Dec {15 - i}, 2024 • 5 min read
                      </p>
                      <p className="text-sm line-clamp-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Gallery;
