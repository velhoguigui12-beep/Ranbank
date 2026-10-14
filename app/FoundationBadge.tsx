/* eslint-disable @next/next/no-img-element -- Vinext serves the local RanBank brand image directly. */
import type { CSSProperties } from "react";
import type { Course } from "./foundation-courses";
import { AREA_COLOR, badgeNumber, roleOf } from "./team";

/* Peças da Fundação usadas no catálogo e na página /fundacao do site do banco. */

/** Só o "R" da logo do RanBank, recortado da imagem oficial (a logo não é redesenhada). */
export function Mark() {
  return <span className="fc-mark" aria-hidden="true"><img src="/ranbank-logo-transparent.png" alt="" /></span>;
}

/** Crachá de quem ensina, no mesmo estilo do organograma do site. Só usa elementos de texto, para caber dentro de um botão ou link. */
export function TeacherBadge({ name, course, part }: { name: string; course: Course; part?: string }) {
  const role = roleOf(name);
  return (
    <span className="fc-badge" style={{ "--badge": role ? AREA_COLOR[role.area] ?? "#3b82f6" : "#3b82f6" } as CSSProperties}>
      <span className="fc-badge-strap" aria-hidden="true" />
      <span className="fc-badge-top"><Mark /><span>{role ? role.area.split(",")[0] : "RanBank"}</span></span>
      <small>Quem ensina</small>
      <strong className="fc-badge-name">{name}</strong>
      <svg className="fc-badge-sign" viewBox="0 0 160 14" aria-hidden="true"><path d="M2 9c18-8 26 6 44 0s22-8 38-1 30 6 46-2 20-3 28 0" /></svg>
      <span className="fc-badge-role">{role?.title ?? "Turma do RanBank"}</span>
      <span className="fc-badge-course">Ensina <b>{part ? `${part}` : course.title}</b>{part && <> no curso {course.title}</>}</span>
      <span className="fc-badge-foot" aria-hidden="true"><i /><b>{role ? badgeNumber(role) : "RB"}</b></span>
    </span>
  );
}

/** Todas as pessoas que ensinam, uma entrada por parte de curso (cursos com módulos têm uma pessoa por módulo). */
export function teachingParts(courses: Course[]) {
  return courses.flatMap((course) => (course.modules ?? course.teachers.map((teacher) => ({ title: "", teacher })))
    .map((part) => ({ name: part.teacher, part: part.title || undefined, course })));
}
