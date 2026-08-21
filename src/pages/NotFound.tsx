import { Link } from "react-router-dom";
import { CLINIC } from "@/content/site";

const NotFound = () => (
  <main className="grid min-h-screen place-items-center px-6">
    <div className="text-center">
      <p className="font-display text-5xl text-brand-gray">404</p>
      <h1 className="mt-3 font-display text-2xl">Página não encontrada</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        O endereço acessado não existe ou foi movido.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Voltar para {CLINIC.shortName}
      </Link>
    </div>
  </main>
);

export default NotFound;
