import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Haz que tu evento sea un{" "}
            <span className="text-beige">éxito</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Vende tus boletas con nosotros y olvídate de los problemas tradicionales
          </p>
          
          <Button 
            className="bg-navy hover:bg-navy-light text-foreground text-lg px-12 py-6 h-auto shadow-[var(--shadow-button)] transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Contactar ahora
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;