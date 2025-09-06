import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";

interface EventCardProps {
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
  image, 
  school, 
  eventName, 
  date, 
  time, 
  location, 
  price,
  availableTickets 
}: EventCardProps) => {
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
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-foreground">{price}</div>
          <Button className="bg-navy hover:bg-navy-light text-foreground">
            Comprar boleta
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;