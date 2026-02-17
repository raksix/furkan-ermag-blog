import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto">
      <Separator />
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Furkan Ermag. Tum haklari saklidir.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/furkanermag"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/furkanermag"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:furkan@ermag.dev"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
