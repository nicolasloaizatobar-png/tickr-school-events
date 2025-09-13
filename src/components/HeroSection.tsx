import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";
const HeroSection = () => {
  const navigate = useNavigate();
  
  const goToEvents = () => {
    navigate('/eventos');
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroImage})`
    }}>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Compra tus boletas escolares de manera{" "}
            <span className="text-beige">fácil</span>,{" "}
            <span className="text-[#cfcba6]">segura</span> y{" "}
            <span className="text-beige">rápida</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Olvídate de filas y pérdidas de dinero. Todo digital, todo seguro.
          </p>
          
          <Button onClick={goToEvents} className="bg-navy hover:bg-navy-light text-foreground text-lg px-8 py-6 h-auto shadow-[var(--shadow-button)] transition-all duration-300 hover:shadow-lg hover:scale-105">
            Ver eventos disponibles
          </Button>
        </div>
      </div>
    </section>;
};
export default HeroSection;