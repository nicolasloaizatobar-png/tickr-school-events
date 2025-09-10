import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EventCardProps {
  id?: string;
  image: string;
  school: string;
  eventName: string;
  date: string;
  time: string;
  location: string;
  price: string;
  availableTickets: number;
}

const EventCard = ({ 
  id,
  image, 
  school, 
  eventName, 
  date, 
  time, 
  location, 
  price,
  availableTickets 
}: EventCardProps) => {
  const navigate = useNavigate();
  return (
    <Card className="bg-card border-border hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:scale-105 overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={`${school} - ${eventName}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-foreground mb-1">{school}</h3>
          <p className="text-lg text-beige font-semibold">{eventName}</p>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{date} - {time}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="w-4 h-4 mr-2" />
            <span>{availableTickets} boletas disponibles</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-2xl font-bold text-foreground">{price}</div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline"
            onClick={() => navigate(`/verdetalles/${id || '1'}`)}
            className="flex-1 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver detalles
          </Button>
          <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
            Comprar boleta
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;