import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const { user, userProfile, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navigationLinks = [
    { to: "/eventos", label: "Eventos" },
    { to: "/ventajas", label: "Ventajas" },
    { to: "/contacto", label: "Contacto" }
  ];

  const getLinkClass = (path: string) => 
    `transition-colors ${
      location.pathname === path 
        ? 'text-primary' 
        : 'text-muted-foreground hover:text-foreground'
    }`;

  const MobileMenuContent = () => (
    <div className="flex flex-col space-y-6 p-6">
      {/* Navigation Links */}
      <div className="flex flex-col space-y-4">
        {navigationLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-lg ${getLinkClass(link.to)}`}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* User Actions */}
      <div className="flex flex-col space-y-3 pt-4 border-t border-border">
        {user ? (
          <>
            <Link 
              to={userProfile?.role === 'organizador' ? '/organizador/dashboard' : '/comprador/eventos'}
              className="text-muted-foreground hover:text-foreground transition-colors text-lg"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Button 
              variant="outline" 
              onClick={() => {
                signOut();
                setIsOpen(false);
              }}
              className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground button-premium w-full"
            >
              Cerrar sesión
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="outline" 
              onClick={() => {
                window.location.href = '/login';
                setIsOpen(false);
              }}
              className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground button-premium w-full"
            >
              Iniciar sesión
            </Button>
            <Button 
              onClick={() => {
                window.location.href = '/register';
                setIsOpen(false);
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 button-premium w-full"
            >
              Registrarse
            </Button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/home" className="flex items-center space-x-2 group">
          <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer">Tickr</div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={getLinkClass(link.to)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link 
                to={userProfile?.role === 'organizador' ? '/organizador/dashboard' : '/comprador/eventos'}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <Button 
                variant="outline" 
                onClick={signOut}
                className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground button-premium"
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/login'}
                className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground button-premium"
              >
                Iniciar sesión
              </Button>
              <Button 
                onClick={() => window.location.href = '/register'}
                className="bg-primary text-primary-foreground hover:bg-primary/90 button-premium"
              >
                Registrarse
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground hover:text-primary transition-colors"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-[300px] bg-background border-l border-border"
          >
            <MobileMenuContent />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;