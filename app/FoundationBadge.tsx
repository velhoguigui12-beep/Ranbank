/* eslint-disable @next/next/no-img-element -- Vinext serves the local RanBank brand image directly. */

/* Peças da Fundação usadas no catálogo e na página /fundacao do site do banco. */

/** Só o "R" da logo do RanBank, recortado da imagem oficial (a logo não é redesenhada). */
export function Mark() {
  return <span className="fc-mark" aria-hidden="true"><img src="/ranbank-logo-transparent.png" alt="" /></span>;
}
