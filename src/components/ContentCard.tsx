import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ContentCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
  gradient?: string;
  link?: string;
}

export const ContentCard = ({ title, icon: Icon, description, gradient = "from-primary to-primary-vibrant", link }: ContentCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <Card 
      onClick={handleClick}
      className="group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur transition-all duration-300 hover:shadow-glow hover:scale-[1.02] cursor-pointer"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      <div className="relative p-6">
        <div className="flex items-start gap-4">
          <div className={`rounded-xl bg-gradient-to-br ${gradient} p-3 shadow-soft`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
