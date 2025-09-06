import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Gracias a esta plataforma nuestro evento fue un éxito, sin colados ni pérdidas de dinero.",
      author: "María González",
      role: "Coordinadora de Eventos",
      school: "Colegio San Carlos"
    },
    {
      quote: "Los padres están felices. Ya no tienen que hacer filas ni preocuparse por perder las boletas.",
      author: "Carlos Ramírez",
      role: "Rector",
      school: "Instituto María Auxiliadora"
    },
    {
      quote: "La transparencia en los reportes nos ayudó mucho con la contabilidad del evento.",
      author: "Ana Patricia Muñoz",
      role: "Administradora",
      school: "Liceo Moderno"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Lo que dicen nuestros colegios
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Testimonios reales de instituciones que ya confían en nosotros
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border relative overflow-hidden group hover:shadow-[var(--shadow-card)] transition-all duration-300">
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-beige mb-6" />
                
                <blockquote className="text-lg text-foreground mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-beige text-sm">
                    {testimonial.role}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {testimonial.school}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;