import type { Metadata } from "next";
import { FoundationPublicPage } from "../PublicSiteGate";

export const metadata: Metadata = {
  title: "Fundação | RanBank",
  description: "A Fundação RanBank tem um site só dela: cursos curtos feitos pela própria turma do RanBank, para quem está começando.",
};

export default function FundacaoPage() {
  return <FoundationPublicPage />;
}
