"use client";
/* eslint-disable @next/next/no-img-element -- Vinext serves the local logo directly. */

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { PublicFooter, PublicHeader } from "./PublicSiteGate";
import RaniAssistant from "./RaniAssistant";
import { AREA_COLOR, allRoles, departments, leadership } from "./team";
import type { OrganizationRole } from "./team";

/** Crachá que aparece ao passar o mouse (ou tocar) em um cargo. */
function RoleBadge({ role, serial }: { role: OrganizationRole; serial: number }) {
  return (
    <div className="org-badge" id={`cracha-${role.id}`} role="tooltip">
      <span className="org-badge-strap" aria-hidden="true" />
      <div className="org-badge-top">
        <img src="/ranbank-logo-transparent.png" alt="" />
        <span>{role.area}</span>
      </div>
      <small>Quem ocupa o cargo</small>
      <strong className="org-badge-name">{role.person}</strong>
      <svg className="org-badge-sign" viewBox="0 0 160 14" aria-hidden="true"><path d="M2 9c18-8 26 6 44 0s22-8 38-1 30 6 46-2 20-3 28 0" /></svg>
      <span className="org-badge-role">{role.title}</span>
      <p>{role.description}</p>
      <ul>{role.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
      <div className="org-badge-foot" aria-hidden="true"><i /><b>RB-{String(serial).padStart(3, "0")}</b></div>
    </div>
  );
}

export default function OrganizationPublicPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  // Fecha o crachá ao tocar fora dele ou apertar Esc.
  useEffect(() => {
    if (!openId) return;
    const close = (event: Event) => {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !(event.target as Element).closest?.(".org-slot")) setOpenId(null);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", close); };
  }, [openId]);

  const slot = (role: OrganizationRole, button: { className?: string; label?: string; title: string }, slotClass = "") => {
    const serial = allRoles.findIndex((item) => item.id === role.id) + 1;
    const open = openId === role.id;
    return (
      <div className={`org-slot ${slotClass} ${open ? "is-open" : ""}`} key={role.id} style={{ "--badge": AREA_COLOR[role.area] ?? "#3b82f6" } as CSSProperties}>
        <button className={`org-node ${button.className ?? ""}`} type="button" aria-expanded={open} aria-describedby={`cracha-${role.id}`} onClick={() => setOpenId(open ? null : role.id)}>
          {button.label && <small>{button.label}</small>}
          <strong>{button.title}</strong>
          <span>Ver quem é →</span>
        </button>
        <RoleBadge role={role} serial={serial} />
      </div>
    );
  };
  const [president, ombudsman, vice] = leadership;

  return (
    <div className="rs rb-public-shell rb-org-page">
      <PublicHeader />
      <main>
        <section className="org-hero" aria-labelledby="org-title">
          <span>ESTRUTURA ORGANIZACIONAL</span>
          <h1 id="org-title">Quem faz o RanBank.</h1>
          <p>Presidência, ouvidoria e quatro áreas de trabalho. Passe o mouse (ou toque) em um cargo para ver o crachá de quem está à frente.</p>
          <div><b>16</b><span>pessoas</span><i/><b>4</b><span>áreas</span></div>
        </section>
        <section className="org-chart-section" aria-label="Organograma do RanBank">
          <div className="org-chart-instruction"><span>ORGANOGRAMA INTERATIVO</span><p>Passe o mouse ou toque em um cargo para ver o crachá.</p></div>
          <div className="org-leadership">
            {slot(president, { className: "org-president", label: "PRESIDÊNCIA", title: "Presidente / CEO" }, "is-president")}
            {slot(ombudsman, { className: "org-ombudsman", label: "OUVIDORIA-GERAL", title: "Ouvidora-Geral" }, "is-ombudsman")}
            {slot(vice, { className: "org-vice", label: "LIDERANÇA EXECUTIVA", title: "Vice-Presidente" }, "is-vice")}
          </div>
          <div className="org-branches" aria-hidden="true" />
          <div className="org-departments">
            {departments.map((department) => (
              <article className="org-department" key={department.id}>
                <header><span>{department.accent}</span><h2>{department.title}</h2></header>
                <div>{department.roles.map((role) => slot(role, { title: role.chartTitle }))}</div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <PublicFooter />
      <RaniAssistant context="site" />
    </div>
  );
}
