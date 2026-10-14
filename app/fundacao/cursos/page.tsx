import type { Metadata } from "next";
import FoundationCatalog from "../../FoundationCatalog";

export const metadata: Metadata = {
  title: "Cursos | Fundação RanBank",
  description: "Catálogo de cursos da Fundação RanBank: aulas curtas feitas pela própria turma, de educação financeira a xadrez e futebol.",
};

export default function FundacaoCursosPage() {
  return <FoundationCatalog />;
}
