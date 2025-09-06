import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-foreground">Tickr</div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('eventos')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Eventos
          </button>
          <button 
            onClick={() => scrollToSection('como-funciona')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Cómo funciona
          </button>
          <button 
            onClick={() => scrollToSection('ventajas')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Ventajas
          </button>
          <button 
            onClick={() => scrollToSection('contacto')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Contacto
          </button>
        </nav>

        <Button variant="secondary" className="bg-beige text-surface-darker hover:bg-beige-dark">
          Comprar boletas
        </Button>
      </div>
    </header>
  );
};

export default Header;