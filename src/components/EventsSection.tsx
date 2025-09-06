import EventCard from "./EventCard";
import graduationImage from "@/assets/event-graduation.jpg";
import culturalImage from "@/assets/event-cultural.jpg";
import sportsImage from "@/assets/event-sports.jpg";

const EventsSection = () => {
  const events = [
    {
      image: graduationImage,
      school: "Colegio San Carlos",
      eventName: "Ceremonia de Graduación 2024",
      date: "15 Diciembre",
      time: "10:00 AM",
      location: "Auditorio Principal",
      price: "$25.000",
      availableTickets: 150
    },
    {
      image: culturalImage,
      school: "Instituto María Auxiliadora",
      eventName: "Festival Cultural Internacional",
      date: "22 Diciembre",
      time: "7:00 PM",
      location: "Teatro del colegio",
      price: "$15.000",
      availableTickets: 200
    },
    {
      image: sportsImage,
      school: "Liceo Moderno",
      eventName: "Juegos Intercolegiados",
      date: "18 Diciembre",
      time: "2:00 PM",
      location: "Coliseo deportivo",
      price: "$10.000",
      availableTickets: 300
    }
  ];

  return (
    <section id="eventos" className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Eventos Disponibles
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre los próximos eventos escolares en Bogotá y asegura tu boleta
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;