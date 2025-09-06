import { Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contacto" className="bg-surface-darker py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="text-3xl font-bold text-foreground mb-4">Tickr</div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              La plataforma líder en boletería escolar digital para colegios en Bogotá. 
              Seguridad, rapidez y transparencia en cada evento.
            </p>
          </div>
          
          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center text-muted-foreground">
                <Mail className="w-4 h-4 mr-3" />
                <a href="mailto:info@tickr.co" className="hover:text-beige transition-colors">
                  info@tickr.co
                </a>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Phone className="w-4 h-4 mr-3" />
                <a href="https://wa.me/573001234567" className="hover:text-beige transition-colors">
                  +57 300 123 4567
                </a>
              </div>
            </div>
          </div>
          
          {/* Redes sociales */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-navy rounded-full flex items-center justify-center hover:bg-navy-light transition-colors">
                <Instagram className="w-5 h-5 text-foreground" />
              </a>
              <a href="#" className="w-10 h-10 bg-navy rounded-full flex items-center justify-center hover:bg-navy-light transition-colors">
                <Facebook className="w-5 h-5 text-foreground" />
              </a>
              <a href="#" className="w-10 h-10 bg-navy rounded-full flex items-center justify-center hover:bg-navy-light transition-colors">
                <Twitter className="w-5 h-5 text-foreground" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <div className="mb-4 md:mb-0">
              © 2024 Tickr. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-beige transition-colors">Política de privacidad</a>
              <a href="#" className="hover:text-beige transition-colors">Términos de servicio</a>
              <a href="#" className="hover:text-beige transition-colors">Aviso legal</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;