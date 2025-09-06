import { CreditCard, Download, Search } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      title: "Elige tu evento",
      description: "Busca y selecciona el evento escolar al que quieres asistir"
    },
    {
      icon: CreditCard,
      title: "Compra online",
      description: "Paga de forma segura con tarjeta de crédito o PSE"
    },
    {
      icon: Download,
      title: "Recibe tu boleta digital",
      description: "Obtén tu boleta con código QR único en tu email"
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un proceso simple y seguro en solo 3 pasos
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-navy rounded-full flex items-center justify-center group-hover:bg-navy-light transition-colors duration-300">
                  <step.icon className="w-10 h-10 text-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-beige rounded-full flex items-center justify-center text-surface-darker font-bold">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {step.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;