import { Shield, Zap, BarChart3, PartyPopper } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Seguridad",
      description: "Sin plata perdida, sin colados. Todo está registrado y verificado."
    },
    {
      icon: Zap,
      title: "Rapidez",
      description: "Compra en 2 minutos desde tu celular, donde sea que estés."
    },
    {
      icon: BarChart3,
      title: "Transparencia",
      description: "Cada peso queda registrado. Informes completos para el colegio."
    },
    {
      icon: PartyPopper,
      title: "Comodidad",
      description: "Olvídate de filas y papel. Todo es digital y fácil de usar."
    }
  ];

  return (
    <section id="ventajas" className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            ¿Por qué elegir Tickr?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            La forma más moderna y segura de manejar la boletería escolar
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-lg bg-card border border-border hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-navy rounded-full flex items-center justify-center">
                <benefit.icon className="w-8 h-8 text-beige" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4">
                {benefit.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;