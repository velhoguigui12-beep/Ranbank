"use client";
/* eslint-disable @next/next/no-img-element -- Vinext serves the local RanBank brand image directly. */
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";
import { Icon } from "./SiteIcons";
import RaniAssistant, { openRani } from "./RaniAssistant";
import { ControlDemo, MonthDemo, NoticesDemo, ScamHelpDemo } from "./CalmBank";
import { CATEGORIES, COURSES, FOUNDATION_SITE_URL, categoryOf, courseImage, teachersLabel } from "./foundation-courses";
import type { CategoryId, Course } from "./foundation-courses";
import { TeacherBadge, teachingParts } from "./FoundationBadge";
import { CategoryGlyph, PlayGlyph } from "./FoundationIcons";
import type { IconName } from "./SiteIcons";

// Vídeo de fundo da abertura. Usa só os primeiros segundos: depois entra a arte antiga do cartão, com outra bandeira.
const HERO_CLIP_END = 3.5;

function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const resume = () => { if (!document.hidden) void ref.current?.play().catch(() => undefined); };
    document.addEventListener("visibilitychange", resume);
    return () => document.removeEventListener("visibilitychange", resume);
  }, []);
  return (
    <video
      ref={ref}
      className="rs-hero-video"
      autoPlay muted playsInline preload="auto" aria-hidden="true"
      onTimeUpdate={(event) => {
        const video = event.currentTarget;
        if (video.currentTime > HERO_CLIP_END) { video.currentTime = 0; void video.play().catch(() => undefined); }
      }}
    >
      <source src="/videos/ranbank-historia-2026.mp4#t=0,4" type="video/mp4" />
    </video>
  );
}

function Link({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a href={href} {...props}>{children}</a>;
}

/* ------------------------------------------------------------------ */
/* Conteúdo                                                            */
/* ------------------------------------------------------------------ */

const researchFacts = [
  {
    value: "148 milhões",
    text: "de pessoas usaram o Pix em 2025.",
    source: "Banco Central, Relatório de Gestão do Pix (2026)",
    href: "https://www.gov.br/fazenda/pt-br/composicao/orgaos/orgaos-colegiados/crsfn/acesso-a-informacao/noticias/2026/pix-consolida-lideranca-nos-pagamentos-digitais-e-projeta-novas-evolucoes-ate-2030",
  },
  {
    value: "39%",
    text: "dos brasileiros dizem já ter sofrido golpe ou tentativa de golpe na conta do banco.",
    source: "Observatório Febraban, julho de 2025",
    href: "https://febrabantech.febraban.org.br/temas/seguranca/quase-4-em-cada-10-brasileiros-ja-sofreram-golpe-aponta-pesquisa-da-febraban",
  },
  {
    value: "55%",
    text: "dizem entender pouco ou nada de educação financeira.",
    source: "Observatório Febraban, julho de 2025",
    href: "https://portal.febraban.org.br/noticia/4324/pt-br/",
  },
];

const institutionalValues = [
  { title: "Simplicidade", text: "Falar claro. Se precisa de manual, está complicado demais." },
  { title: "Segurança", text: "Proteger cada acesso e cada centavo como se fossem nossos." },
  { title: "Inclusão", text: "Funcionar bem para quem tem pouca experiência com banco." },
  { title: "Impacto positivo", text: "Medir o sucesso também pelo bem que o banco faz fora dele." },
];

const productFeatures: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: "list", title: "Extrato fácil de ler", text: "Nome, data e valor de cada movimentação, da mais nova para a mais antiga." },
  { icon: "vault", title: "Cofrinho", text: "Separe dinheiro para um objetivo sem misturar com o saldo do dia a dia." },
  { icon: "calendar", title: "Agendamentos", text: "Programe pagamentos e não perca vencimentos." },
  { icon: "key", title: "Chaves Pix", text: "Cadastre ou apague CPF, e-mail, celular ou chave aleatória." },
];

const frequentlyAskedQuestions = [
  { question: "O que é o RanBank?", answer: "É um projeto educacional que simula um banco digital. As contas, os cartões e os valores são fictícios e nenhuma operação movimenta dinheiro real." },
  { question: "O que dá para testar?", answer: "Entrar na conta de teste, fazer Pix entre contas de demonstração, ver o extrato, bloquear o cartão, guardar dinheiro no cofrinho e conversar com a Rani." },
  { question: "Preciso informar dados verdadeiros?", answer: "Não. Use só os dados de demonstração. Nunca digite senhas, cartões ou dados de uma conta bancária real." },
  { question: "O que a Rani pode fazer?", answer: "A Rani explica as funções da conta, orienta sobre Pix, cartão e golpes e apresenta os projetos do RanBank em palavras simples." },
  { question: "Os projetos sociais já existem?", answer: "Ainda não. São propostas em estudo. O site separa o que já funciona (o banco) do que ainda é ideia (os projetos). Não existem parcerias oficiais." },
];

const securityControls: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: "lock", title: "Senha guardada embaralhada", text: "A senha é salva de um jeito que nem a equipe consegue ler (criptografia bcrypt)." },
  { icon: "key", title: "Senha só para movimentar", text: "Pix e pagamentos pedem uma senha de 4 dígitos diferente da senha de entrar." },
  { icon: "eye", title: "Nome de quem recebe", text: "Antes de confirmar o Pix, o app mostra para quem o dinheiro vai." },
  { icon: "shield", title: "Sessão com prazo", text: "O acesso vence depois de 30 minutos sem uso. Ao sair, ele é encerrado também no servidor." },
  { icon: "card", title: "Cartão bloqueado em um toque", text: "Perdeu o cartão ou desconfiou de algo? Bloqueie e desbloqueie pelo app." },
  { icon: "check", title: "Sem Pix repetido nem acima do saldo", text: "Um clique duplo não envia o Pix duas vezes, e o sistema recusa valores maiores que o saldo." },
];

const commonScams = [
  { title: "Troca ou clonagem de cartão", tip: "Não entregue o cartão a ninguém e cubra o teclado ao digitar a senha." },
  { title: "Golpe do WhatsApp", tip: "Pedido de dinheiro com número novo? Ligue para a pessoa antes de pagar." },
  { title: "Falsa central do banco", tip: "O banco não liga pedindo senha, código ou transferência. Desligue e ligue você." },
  { title: "Pix ou comprovante falso", tip: "Confira no extrato se o dinheiro entrou antes de entregar um produto." },
];

/* ------------------------------------------------------------------ */
/* Peças compartilhadas                                                */
/* ------------------------------------------------------------------ */

function BrandLogo() {
  return (
    <span className="rs-logo">
      <img src="/ranbank-logo-transparent.png" alt="RanBank" />
    </span>
  );
}

function CalmPoints({ items }: { items: string[] }) {
  return <ul className="rs-calm-points">{items.map((item) => <li key={item}><Icon name="check" size={18} />{item}</li>)}</ul>;
}

function SectionHead({ label, title, text, center = false }: { label: string; title: ReactNode; text?: ReactNode; center?: boolean }) {
  return (
    <header className={`rs-head ${center ? "is-center" : ""}`}>
      <span className="rs-label">{label}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </header>
  );
}

const navigation = [
  { href: "/#produto", label: "O banco" },
  { href: "/seguranca", label: "Segurança" },
  { href: "/projetos", label: "Projetos e impacto" },
  { href: "/organograma", label: "Quem somos" },
  { href: "/fundacao", label: "Fundação" },
  { href: "/#duvidas", label: "Ajuda" },
];

// `dark` é aceito por compatibilidade com páginas antigas; o novo cabeçalho tem um só visual.
export function PublicHeader(props: { dark?: boolean }) {
  void props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className={`rs-header ${open ? "is-open" : ""}`}>
        <div className="rs-header-inner">
          <Link className="rs-brand" href="/" aria-label="Página inicial do RanBank">
            <BrandLogo />
          </Link>
          <nav className="rs-nav" aria-label="Navegação principal">
            {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
          </nav>
          <div className="rs-header-actions">
            <Link className="rs-btn rs-btn-quiet" href="/banco">Entrar</Link>
            <Link className="rs-btn rs-btn-primary" href="/banco?modo=criar-conta">Abrir conta</Link>
            <button className="rs-menu-toggle" type="button" aria-expanded={open} aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export function PublicFooter() {
  return (
    <footer className="rs-footer">
      <div className="rs-footer-inner">
        <div className="rs-footer-brand">
          <BrandLogo />
          <p>Banco digital demonstrativo criado em Brasília - DF para ensinar, proteger e pensar no futuro.</p>
        </div>
        <div className="rs-footer-col">
          <strong>RanBank</strong>
          <Link href="/banco">Acessar conta</Link>
          <Link href="/#visao-valores">Missão, visão e valores</Link>
          <Link href="/projetos">Projetos e impacto</Link>
          <Link href="/instituto">Instituto RanBank</Link>
          <Link href="/organograma">Nossa equipe</Link>
          <Link href="/fundacao">Fundação RanBank</Link>
        </div>
        <div className="rs-footer-col">
          <strong>Proteção</strong>
          <Link href="/seguranca">Central de Segurança</Link>
          <Link href="/privacidade">Privacidade e cookies</Link>
          <Link href="/#duvidas">Dúvidas frequentes</Link>
        </div>
        <div className="rs-footer-col">
          <strong>Redes sociais</strong>
          <a href="https://www.instagram.com/ranbank.df" target="_blank" rel="noreferrer">Instagram @ranbank.df</a>
          <a href="https://www.tiktok.com/@ranbank.df" target="_blank" rel="noreferrer">TikTok @ranbank.df</a>
        </div>
      </div>
      <p className="rs-footer-legal">
        © 2026 RanBank. Projeto educacional e demonstrativo. Não é uma instituição financeira e não tem autorização do Banco Central para operar.
      </p>
    </footer>
  );
}

function CookieCenter() {
  const [visible, setVisible] = useState(false);
  const [configuring, setConfiguring] = useState(false);
  const [preferences, setPreferences] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(!window.localStorage.getItem("ranbank-cookie-consent")), 0);
    return () => window.clearTimeout(timer);
  }, []);
  function save(level: "essential" | "custom" | "all") {
    const consent =
      level === "all"
        ? { preferences: true, analytics: true }
        : level === "essential"
          ? { preferences: false, analytics: false }
          : { preferences, analytics };
    window.localStorage.setItem("ranbank-cookie-consent", JSON.stringify({ ...consent, savedAt: new Date().toISOString() }));
    setVisible(false);
    setConfiguring(false);
  }
  if (!visible) return null;
  return (
    <div className="rs-cookie" role="region" aria-label="Preferências de privacidade">
      {configuring ? (
        <section role="dialog" aria-modal="true" aria-labelledby="cookie-title">
          <h2 id="cookie-title">Suas preferências</h2>
          <p>Nenhum cookie de publicidade é usado neste projeto.</p>
          <label className="rs-cookie-option">
            <span><strong>Essenciais</strong><small>Mantêm você conectado e guardam esta escolha.</small></span>
            <input aria-label="Cookies essenciais" type="checkbox" checked disabled />
          </label>
          <label className="rs-cookie-option">
            <span><strong>Preferências</strong><small>Lembram ajustes neste aparelho.</small></span>
            <input aria-label="Cookies de preferências" type="checkbox" checked={preferences} onChange={(event) => setPreferences(event.target.checked)} />
          </label>
          <label className="rs-cookie-option">
            <span><strong>Medição</strong><small>Números anônimos de uso, se um dia forem ativados.</small></span>
            <input aria-label="Cookies de medição" type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} />
          </label>
          <div className="rs-cookie-actions">
            <button className="rs-btn rs-btn-outline" onClick={() => save("essential")}>Usar só essenciais</button>
            <button className="rs-btn rs-btn-primary" onClick={() => save("custom")}>Salvar</button>
          </div>
        </section>
      ) : (
        <section>
          <p><strong>Cookies:</strong> usamos só o necessário para o site funcionar. O resto depende de você. <Link href="/privacidade">Saiba mais</Link></p>
          <div className="rs-cookie-actions">
            <button className="rs-btn rs-btn-outline" onClick={() => save("essential")}>Somente essenciais</button>
            <button className="rs-btn rs-btn-outline" onClick={() => setConfiguring(true)}>Configurar</button>
            <button className="rs-btn rs-btn-primary" onClick={() => save("all")}>Aceitar todos</button>
          </div>
        </section>
      )}
    </div>
  );
}

function PublicShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rs ${className}`}>
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
      <CookieCenter />
      <RaniAssistant context="site" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Maquetes do aplicativo                                              */
/* ------------------------------------------------------------------ */

function PhoneMockup() {
  const actions: Array<[IconName, string]> = [["pix", "Pix"], ["bill", "Pagar"], ["calendar", "Agendar"], ["vault", "Guardar"]];
  const moves = [
    ["Pix recebido", "Bruno Lima", "+ R$ 150,00", "in"],
    ["Mercado Bom Preço", "Cartão Ecocard", "- R$ 86,40", "out"],
    ["Cofrinho", "Meta: viagem", "- R$ 200,00", "out"],
  ];
  return (
    <div className="rs-phone" aria-label="Exemplo da tela inicial do aplicativo RanBank, com valores fictícios" role="img">
      <div className="rs-phone-screen">
        <div className="rs-app-top">
          <span className="rs-app-avatar">A</span>
          <div><small>Olá,</small><strong>Ana</strong></div>
          <Icon name="eye" size={20} />
        </div>
        <div className="rs-app-balance">
          <small>Saldo disponível</small>
          <strong>R$ 4.280,50</strong>
        </div>
        <div className="rs-app-actions">
          {actions.map(([icon, label]) => (
            <span key={label}><i><Icon name={icon} size={20} /></i>{label}</span>
          ))}
        </div>
        <div className="rs-app-card">
          <img src="/images/ranbank-ecocard-nativa-frente.webp" alt="" />
          <div><strong>Ecocard</strong><small>Fatura atual R$ 312,40</small></div>
        </div>
        <div className="rs-app-moves">
          <small>Últimas movimentações</small>
          {moves.map(([title, detail, value, kind]) => (
            <div key={title}>
              <span><strong>{title}</strong><small>{detail}</small></span>
              <b className={kind === "in" ? "is-in" : ""}>{value}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PixConfirmMockup() {
  return (
    <div className="rs-pix-mock" aria-hidden="true">
      <small>Você vai enviar</small>
      <strong>R$ 50,00</strong>
      <div className="rs-pix-to">
        <span className="rs-app-avatar is-small">B</span>
        <span><b>Bruno Lima</b><small>Chave: bruno@email.com</small></span>
      </div>
      <div className="rs-pix-pin">
        <small>Senha de 4 dígitos</small>
        <span><i /><i /><i /><i /></span>
      </div>
      <span className="rs-pix-button">Confirmar Pix</span>
    </div>
  );
}

function RanChatMockup() {
  return (
    <div className="rs-chat" role="img" aria-label="Exemplo de conversa com a assistente Rani">
      <div className="rs-chat-head">
        <img src="/images/ran-assistente-humana.png" alt="" />
        <span><strong>Rani</strong><small>Assistente RanBank</small></span>
      </div>
      <p className="rs-bubble is-user">Recebi um SMS pedindo o código do banco. O que eu faço?</p>
      <p className="rs-bubble">Não envie o código. O RanBank nunca pede senha ou código por mensagem. Apague o SMS e, se clicou no link, bloqueie o cartão no app.</p>
      <p className="rs-bubble is-user">Como eu bloqueio?</p>
      <p className="rs-bubble">Vá em <b>Cartão</b> e toque em <b>Bloquear temporariamente</b>. Para liberar, é só tocar de novo.</p>
      <small className="rs-chat-note">Exemplo de conversa</small>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Página inicial                                                      */
/* ------------------------------------------------------------------ */

export default function PublicSiteGate() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <PublicHome />;
}

export function PublicHome() {
  return (
    <PublicShell className="rs-home">
      {/* 1. Abertura */}
      <section className="rs-hero">
        <HeroVideo />
        <div className="rs-hero-shade" aria-hidden="true" />
        <div className="rs-wrap rs-hero-grid">
          <div className="rs-hero-copy">
            <span className="rs-chip">Banco digital educacional</span>
            <h1>O banco que protege, explica e devolve.</h1>
            <p>
              Conta, Pix e cartão em um só lugar. Proteção contra golpes em cada passo, uma assistente que explica tudo sem complicar
              e um modelo pensado para investir em educação e comunidades.
            </p>
            <div className="rs-actions">
              <Link className="rs-btn rs-btn-primary rs-btn-lg" href="/banco">Ver o banco funcionando <Icon name="arrow" size={20} /></Link>
              <Link className="rs-btn rs-btn-outline rs-btn-lg" href="#jeito-ranbank">Ver o app por dentro</Link>
            </div>
            <p className="rs-hero-proof"><Icon name="check" size={18} /> Protótipo no ar: dá para entrar e fazer um Pix de teste agora.</p>
          </div>
          <div className="rs-hero-visual">
            <PhoneMockup />
            <img className="rs-hero-card" src="/images/ranbank-ecocard-nativa-frente.webp" alt="Cartão Ecocard RanBank" />
          </div>
        </div>
      </section>

      {/* 2. O problema */}
      <section className="rs-section rs-light" id="por-que">
        <div className="rs-wrap">
          <SectionHead
            label="Por que o RanBank existe"
            title={<>O Pix chegou a quase todo mundo.<br />A proteção e a informação, ainda não.</>}
          />
          <div className="rs-facts">
            {researchFacts.map((fact) => (
              <article key={fact.value}>
                <strong>{fact.value}</strong>
                <p>{fact.text}</p>
                <a href={fact.href} target="_blank" rel="noreferrer">Fonte: {fact.source} ↗</a>
              </article>
            ))}
          </div>
          <p className="rs-statement">Usar o banco ficou fácil. Usar com <em>segurança</em> e <em>consciência</em> continua difícil. É esse espaço que o RanBank quer ocupar.</p>
        </div>
      </section>

      {/* 3. Identidade */}
      <section className="rs-section" id="visao-valores">
        <div className="rs-wrap">
          <SectionHead label="Quem somos" title="Missão, visão e valores" />
          <div className="rs-purpose">
            <article>
              <span>Missão</span>
              <p>Facilitar a vida financeira das pessoas com serviços simples, seguros e acessíveis.</p>
            </article>
            <article>
              <span>Visão</span>
              <p>Ser um banco digital reconhecido por unir tecnologia, educação financeira e responsabilidade social.</p>
            </article>
          </div>
          <div className="rs-values">
            {institutionalValues.map((value, index) => (
              <article key={value.title}>
                <b>0{index + 1}</b>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
          <p className="rs-motto">Tecnologia para simplificar. Segurança para proteger. Responsabilidade para transformar.</p>
        </div>
      </section>

      {/* 4. Produto */}
      <section className="rs-section rs-light" id="produto">
        <div className="rs-wrap">
          <SectionHead label="O banco" title="Tudo o que uma conta precisa. Nada que confunda." />
          <div className="rs-bento">
            <article className="rs-tile rs-tile-pix">
              <div>
                <i className="rs-tile-icon"><Icon name="pix" /></i>
                <h3>Pix com confirmação</h3>
                <p>Antes de enviar, você vê o nome de quem vai receber e confirma com uma senha de 4 dígitos, diferente da senha de entrar.</p>
              </div>
              <PixConfirmMockup />
            </article>
            <article className="rs-tile rs-tile-card" id="ecocard">
              <img src="/images/ranbank-ecocard-nativa-frente.webp" alt="Cartão Ecocard RanBank" />
              <div>
                <h3>Ecocard</h3>
                <p>Cartão feito de material de origem sustentável. Bloqueie e desbloqueie pelo app em um toque.</p>
              </div>
            </article>
            {productFeatures.map((feature) => (
              <article className="rs-tile" key={feature.title}>
                <i className="rs-tile-icon"><Icon name={feature.icon} /></i>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4b. Banner com vídeo */}
      <section className="rs-banner" aria-labelledby="banner-title">
        <video className="rs-banner-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src="/videos/ranbank-demonstracao-04.mp4" type="video/mp4" />
        </video>
        <div className="rs-banner-shade" aria-hidden="true" />
        <div className="rs-wrap rs-banner-copy">
          <span className="rs-chip">Agência do futuro · conceito</span>
          <h2 id="banner-title">Tecnologia que orienta. Pessoas que acolhem.</h2>
          <p>Uma ideia de atendimento em que a tecnologia ajuda no caminho e sempre existe uma pessoa por perto para resolver.</p>
          <Link className="rs-btn rs-btn-light rs-btn-lg" href="/projetos">Conhecer as propostas <Icon name="arrow" size={20} /></Link>
        </div>
        <small className="rs-banner-note">Vídeo ilustrativo</small>
      </section>

      {/* 5. Rani */}
      <section className="rs-section rs-ran" id="ran">
        <div className="rs-wrap rs-split">
          <div>
            <SectionHead
              label="Assistente Rani"
              title="Dúvida de banco? Pergunte para a Rani."
              text="A Rani responde em palavras simples sobre Pix, cartão, extrato e golpes. Ela foi feita para explicar, não para vender."
            />
            <button type="button" className="rs-btn rs-btn-primary rs-btn-lg" onClick={openRani}>Falar com a Rani <Icon name="arrow" size={20} /></button>
          </div>
          <RanChatMockup />
        </div>
      </section>

      {/* 7-10. O app por dentro: quatro telas para mexer */}
      <section className="rs-section rs-calm" id="jeito-ranbank">
        <div className="rs-wrap rs-split">
          <div>
            <SectionHead label="Se der problema" title="Caí num golpe. E agora?" text="Na hora do susto, ninguém quer ler um texto enorme. O app faz três perguntas, uma por vez, e monta um plano para o caso da pessoa: o que o banco já resolveu e o que ainda falta fazer." />
            <CalmPoints items={["Uma pergunta por vez, mesmo na pressa.", "O banco resolve sozinho o que pode.", "Nenhuma culpa, só os próximos passos."]} />
          </div>
          <ScamHelpDemo />
        </div>
      </section>

      <section className="rs-section rs-light rs-calm">
        <div className="rs-wrap rs-split is-flip">
          <div>
            <SectionHead label="Planejar o mês" title="O mês sem sustos." text="Antes de as contas chegarem, o app já mostra quanto deve sobrar. Tire ou ponha um gasto e veja a previsão mudar." />
            <CalmPoints items={["O mês inteiro numa tela só.", "Aviso com antecedência, nunca no dia da conta.", "Mensagens sem bronca e sem culpa."]} />
          </div>
          <MonthDemo />
        </div>
      </section>

      <section className="rs-section rs-calm">
        <div className="rs-wrap">
          <ControlDemo intro={<SectionHead label="Do seu jeito" title="Quem manda é você." text="Cada pessoa ajusta o app do seu jeito, e a tela muda na hora. Tudo pode ser mudado de novo, a qualquer momento." />} />
        </div>
      </section>

      <section className="rs-section rs-light rs-calm">
        <div className="rs-wrap rs-split is-flip">
          <div>
            <SectionHead label="Avisos" title="Avisos que acalmam." text="Cada aviso diz o que aconteceu e o que fazer, em poucas palavras. Toque nos avisos para ver como o RanBank fala com você." />
            <CalmPoints items={["Primeiro o que aconteceu, depois o que fazer.", "Uma ação clara em cada aviso.", "Conquistas também viram aviso."]} />
          </div>
          <NoticesDemo />
        </div>
      </section>

      {/* 11. Dúvidas */}
      <section className="rs-section" id="duvidas" aria-labelledby="faq-title">
        <div className="rs-wrap rs-faq-grid">
          <header className="rs-head">
            <span className="rs-label">Ajuda</span>
            <h2 id="faq-title">Dúvidas frequentes</h2>
            <div className="rs-ran-help">
              <img src="/images/ran-assistente-humana.png" alt="" />
              <p>Não achou a resposta? <button type="button" className="rs-inline-link" onClick={openRani}>Pergunte para a Rani</button>.</p>
            </div>
          </header>
          <div className="rs-faq">
            {frequentlyAskedQuestions.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>{item.question}<span aria-hidden="true">+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Chamada final */}
      <section className="rs-final">
        <div className="rs-wrap">
          <h2>Veja o RanBank funcionando.</h2>
          <p>Entre na conta de demonstração e faça um Pix de teste em menos de um minuto.</p>
          <div className="rs-actions is-center">
            <Link className="rs-btn rs-btn-light rs-btn-lg" href="/banco">Acessar o banco <Icon name="arrow" size={20} /></Link>
            <Link className="rs-btn rs-btn-outline rs-btn-lg" href="/banco?modo=criar-conta">Criar conta de teste</Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}

/* ------------------------------------------------------------------ */
/* Páginas internas                                                    */
/* ------------------------------------------------------------------ */

function PageHero({ label, title, text, children, video }: { label: string; title: ReactNode; text: ReactNode; children?: ReactNode; video?: string }) {
  return (
    <section className={`rs-page-hero ${video ? "has-video" : ""}`}>
      {video && <>
        <video className="rs-banner-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"><source src={video} type="video/mp4" /></video>
        <div className="rs-banner-shade" aria-hidden="true" />
      </>}
      <div className="rs-wrap">
        <span className="rs-chip">{label}</span>
        <h1>{title}</h1>
        <p>{text}</p>
        {children}
      </div>
    </section>
  );
}

export function SecurityPublicPage() {
  return (
    <PublicShell className="rs-page">
      <PageHero
        label="Central de Segurança RanBank"
        video="/videos/ranbank-demonstracao-01.mp4"
        title="O RanBank nunca pede sua senha por mensagem."
        text="Nem por SMS, WhatsApp, e-mail ou ligação. Se alguém pedir, é golpe. Veja abaixo o que o banco faz para proteger a conta e o que você pode fazer."
      />
      <section className="rs-section rs-light">
        <div className="rs-wrap">
          <SectionHead label="Funciona no protótipo" title="O que protege a sua conta." text="Tudo desta lista está programado no RanBank de verdade, não é só desenho de tela." />
          <div className="rs-controls">
            {securityControls.map((control) => (
              <article key={control.title}>
                <i className="rs-tile-icon"><Icon name={control.icon} /></i>
                <h3>{control.title}</h3>
                <p>{control.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="rs-section">
        <div className="rs-wrap">
          <SectionHead label="Golpes mais comuns" title="Os golpes que os brasileiros mais relatam." text="Segundo o Observatório Febraban de julho de 2025. Ao lado de cada um, como se proteger." />
          <div className="rs-scams">
            {commonScams.map((scam, index) => (
              <article key={scam.title}>
                <b>0{index + 1}</b>
                <div>
                  <h3>{scam.title}</h3>
                  <p>{scam.tip}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="rs-section rs-light">
        <div className="rs-wrap rs-split">
          <div>
            <SectionHead label="Na dúvida" title="Desligue e ligue você para o banco." text="Golpista conta com a sua pressa. Quem liga é você, pelo número que está no cartão ou no app." />
          </div>
          <div className="rs-ran-tip">
            <img src="/images/ran-assistente-humana.png" alt="" />
            <div>
              <small>Dica da Rani</small>
              <p>Digite o endereço do banco você mesmo, desconfie de pressa e nunca compartilhe códigos. Em aparelho de outra pessoa, sempre saia da conta.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="rs-final">
        <div className="rs-wrap">
          <h2>Entre pelo caminho seguro.</h2>
          <p>Use CPF, conta ou e-mail e a sua senha de acesso.</p>
          <div className="rs-actions is-center">
            <Link className="rs-btn rs-btn-light rs-btn-lg" href="/banco">Acessar o RanBank <Icon name="arrow" size={20} /></Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}

export function PrivacyPublicPage() {
  const data = [
    { title: "Identificação", text: "Nome, CPF, e-mail, telefone e número da conta.", use: "Para você entrar e para falarmos com você." },
    { title: "Movimentações", text: "Valores, destinatários e horários.", use: "Para fazer e comprovar cada operação." },
    { title: "Segurança", text: "Sessões e aparelhos conectados.", use: "Para perceber acessos estranhos." },
    { title: "Preferências", text: "Sua escolha sobre cookies, guardada no aparelho.", use: "Para respeitar a sua decisão." },
  ];
  const cookies = [
    ["Sessão", "Necessário", "Mantém você conectado. É protegido e não pode ser lido por outros programas da página."],
    ["Consentimento", "Necessário", "Lembra o que você escolheu sobre cookies."],
    ["Preferências", "Opcional", "Guarda ajustes de uso neste aparelho."],
    ["Publicidade", "Não usamos", "O RanBank não usa cookies de propaganda."],
  ];
  return (
    <PublicShell className="rs-page">
      <PageHero
        label="Privacidade e cookies"
        title="Seus dados, só para o necessário."
        text="O que o RanBank guarda, por que guarda e o que você pode controlar."
      />
      <section className="rs-section rs-light">
        <div className="rs-wrap">
          <SectionHead label="O que guardamos" title="Coletar menos. Proteger melhor." />
          <div className="rs-controls">
            {data.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <small className="rs-purpose-tag">{item.use}</small>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="rs-section">
        <div className="rs-wrap">
          <SectionHead label="Cookies" title="Essencial quer dizer essencial." />
          <div className="rs-cookie-table">
            {cookies.map(([name, kind, text]) => (
              <div key={name}>
                <strong>{name}</strong>
                <span className={`rs-status ${kind === "Necessário" ? "" : "is-muted"}`}>{kind}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="rs-section rs-light">
        <div className="rs-wrap">
          <SectionHead
            label="Seus direitos"
            title="Ver, corrigir e apagar."
            text={<>Na conta de demonstração você pode trocar chaves Pix, recuperar a senha e pedir a desativação da conta. Dúvidas: <a href="mailto:privacidade@ranbank.demo">privacidade@ranbank.demo</a> (endereço fictício).</>}
          />
        </div>
      </section>
    </PublicShell>
  );
}

/* Fundação RanBank: vitrine no site do banco que leva ao site da Fundação (catálogo de cursos). */
const FOUNDATION_WISHES: Array<{ category: CategoryId; wish: string }> = [
  { category: "vida", wish: "Cuidar do meu dinheiro e do meu tempo" },
  { category: "tecnologia", wish: "Entender o computador e criar coisas" },
  { category: "jogos", wish: "Pensar melhor jogando" },
  { category: "esporte", wish: "Me mexer e jogar em equipe" },
  { category: "expressao", wish: "Me conhecer e me expressar" },
];
const FOUNDATION_STEPS = [
  { title: "Escolha", text: "Passe o mouse num curso para ver a prévia. Abra para ver tudo o que você vai aprender até o final." },
  { title: "Assista no seu ritmo", text: "Parou no meio? O curso fica em Continue assistindo, do ponto em que você parou." },
  { title: "Entre com a sua conta RanBank", text: "O mesmo CPF e a mesma senha do banco. Seus cursos concluídos e a sua lista ficam no seu perfil." },
];
const courseLink = (course: Course) => `${FOUNDATION_SITE_URL}?curso=${course.id}`;
const TEACHING = teachingParts(COURSES);
const TEACHER_COUNT = new Set(TEACHING.map((person) => person.name)).size;

/** Parede de cursos que desliza devagar atrás do título, como a abertura de um app de filmes. */
function FoundationWall() {
  const rows = [0, 5, 2, 9, 7].map((shift) => [...COURSES.slice(shift), ...COURSES.slice(0, shift)]);
  return (
    <div className="fdn-wall" aria-hidden="true">
      <div className="fdn-wall-tilt">
        {rows.map((row, index) => (
          <div key={index} className={`fdn-wall-row ${index % 2 ? "is-reverse" : ""}`} style={{ "--speed": `${150 + index * 22}s` } as CSSProperties}>
            {[...row, ...row].map((course, position) => (
              <span key={`${course.id}-${position}`} className="fdn-wall-tile" style={{ "--accent": categoryOf(course.category).accent } as CSSProperties}>
                <img src={courseImage(course)} alt="" decoding="async" />
                <b>{course.title}</b>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** "O que você quer aprender agora?": a pessoa escolhe uma vontade e já vê o curso para começar. */
function FoundationMatch() {
  const [pick, setPick] = useState<CategoryId>("vida");
  const category = categoryOf(pick);
  const [main, ...others] = COURSES.filter((course) => course.category === pick);
  return (
    <div className="fdn-match" style={{ "--pick": category.accent, "--pick-bg": category.bg } as CSSProperties}>
      <div className="fdn-match-ask" role="group" aria-label="O que você quer aprender agora?">
        {FOUNDATION_WISHES.map(({ category: id, wish }) => {
          const option = categoryOf(id);
          return (
            <button type="button" key={id} aria-pressed={pick === id} onClick={() => setPick(id)} style={{ "--chip": option.accent, "--chip-bg": option.bg } as CSSProperties}>
              <span className="fdn-match-icon"><CategoryGlyph icon={option.icon} size={22} /></span>
              <span className="fdn-match-wish">{wish}</span>
              <span className="fdn-match-short">{option.name}</span>
              <small>{COURSES.filter((course) => course.category === id).length} cursos</small>
            </button>
          );
        })}
      </div>
      <div className="fdn-match-result" key={pick} aria-live="polite">
        <a className="fdn-match-main" href={courseLink(main)} target="_blank" rel="noopener noreferrer">
          <span className="fdn-match-photo">
            <img src={courseImage(main)} alt="" />
            <span className="fdn-match-tag"><CategoryGlyph icon={category.icon} size={14} />{category.name}</span>
          </span>
          <span className="fdn-match-copy">
            <small>Seu primeiro curso pode ser</small>
            <strong>{main.title}</strong>
            <em>{main.hook}</em>
            <span className="fdn-match-learn">
              {main.learn.slice(0, 3).map((topic) => <span key={topic}>{topic}</span>)}
            </span>
            <span className="fdn-match-foot">
              <span>Com {teachersLabel(main)}</span>
              <span className="fdn-match-cta"><PlayGlyph size={14} /> Ver este curso</span>
            </span>
          </span>
        </a>
        {others.length > 0 && (
          <div className="fdn-match-more">
            <span>Também nesta categoria</span>
            {others.map((course) => (
              <a key={course.id} href={courseLink(course)} target="_blank" rel="noopener noreferrer">
                <img src={courseImage(course)} alt="" loading="lazy" />
                <span><strong>{course.title}</strong><small>Com {teachersLabel(course)}</small></span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Varal de crachás: cada pessoa da turma que ensina, passando devagar. Parar o mouse segura o varal. */
function FoundationTeachers() {
  return (
    <div className="fdn-rail">
      <div className="fdn-rail-track">
        {[...TEACHING, ...TEACHING].map((person, index) => {
          const copy = index >= TEACHING.length;
          return (
            <a
              key={`${person.name}-${person.course.id}-${index}`}
              className="fdn-rail-item"
              href={courseLink(person.course)}
              target="_blank"
              rel="noopener noreferrer"
              aria-hidden={copy || undefined}
              tabIndex={copy ? -1 : undefined}
              aria-label={copy ? undefined : `${person.name} ensina ${person.part ?? person.course.title}. Ver o curso`}
            >
              <TeacherBadge name={person.name} course={person.course} part={person.part} />
            </a>
          );
        })}
      </div>
    </div>
  );
}

export function FoundationPublicPage() {
  return (
    <PublicShell className="rs-page fdn-page">
      <section className="fdn-hero">
        <FoundationWall />
        <div className="rs-wrap fdn-hero-copy">
          <span className="fdn-kicker"><span className="fdn-mark" aria-hidden="true"><img src="/ranbank-logo-transparent.png" alt="" /></span> Fundação RanBank</span>
          <h1>Aprenda com <span>quem fez.</span></h1>
          <p>{COURSES.length} cursos curtos ensinados pela própria turma do RanBank. De dinheiro a xadrez, de impressora 3D a futebol de areia.</p>
          <div className="fdn-actions">
            <Link className="rs-btn rs-btn-light rs-btn-lg fdn-btn-play" href={FOUNDATION_SITE_URL} target="_blank" rel="noopener"><PlayGlyph size={18} /> Entrar na Fundação</Link>
            <Link className="rs-btn rs-btn-outline rs-btn-lg" href="#descobrir">Descobrir meu curso</Link>
          </div>
          <ul className="fdn-facts">
            <li><b>{COURSES.length}</b> cursos</li>
            <li><b>{TEACHER_COUNT}</b> pessoas ensinando</li>
            <li><b>{CATEGORIES.length}</b> categorias</li>
          </ul>
        </div>
      </section>

      <section className="fdn-section" id="descobrir">
        <div className="rs-wrap">
          <header className="fdn-head">
            <span className="fdn-kicker">Descubra o seu curso</span>
            <h2>O que você quer aprender agora?</h2>
            <p>Escolha uma vontade. A gente mostra por onde começar.</p>
          </header>
          <FoundationMatch />
        </div>
      </section>

      <section className="fdn-section fdn-section-teachers">
        <div className="rs-wrap">
          <header className="fdn-head">
            <span className="fdn-kicker">Quem ensina</span>
            <h2>Seus professores são a turma do RanBank.</h2>
            <p>Cada pessoa ensina o que sabe e o que gosta de fazer. Clique num crachá para ver o curso.</p>
          </header>
        </div>
        <FoundationTeachers />
      </section>

      <section className="fdn-section">
        <div className="rs-wrap">
          <header className="fdn-head">
            <span className="fdn-kicker">Como funciona</span>
            <h2>Três passos e você já está assistindo.</h2>
          </header>
          <ol className="fdn-steps">
            {FOUNDATION_STEPS.map((step, index) => (
              <li key={step.title}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="fdn-honest">As aulas estão sendo gravadas pela turma. O catálogo já mostra tudo o que vem por aí.</p>
        </div>
      </section>

      <section className="fdn-final">
        <div className="rs-wrap">
          <img className="fdn-final-logo" src="/ranbank-logo-transparent.png" alt="" />
          <h2>A próxima parte da história.</h2>
          <p>O RanBank continua. Agora, o que a turma sabe vira curso para mais gente.</p>
          <div className="fdn-actions">
            <Link className="rs-btn rs-btn-light rs-btn-lg fdn-btn-play" href={FOUNDATION_SITE_URL} target="_blank" rel="noopener"><PlayGlyph size={18} /> Entrar na Fundação</Link>
            <Link className="rs-btn fdn-btn-ghost rs-btn-lg" href="/organograma">Conhecer quem faz</Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}

export function InstitutePublicPage() {
  const fronts: Array<{ icon: IconName; title: string; text: string }> = [
    { icon: "book", title: "Educação financeira", text: "Orçamento, crédito, Pix e prevenção a golpes explicados com exemplos do dia a dia." },
    { icon: "access", title: "Inclusão", text: "Telas legíveis, linguagem simples e atenção a quem tem pouca experiência com banco." },
    { icon: "users", title: "Comunidades", text: "Propostas para comunidades indígenas e locais, construídas com escuta e respeito à cultura." },
    { icon: "leaf", title: "Impacto positivo", text: "Crédito e cartão ligados a escolhas que fazem bem às pessoas e ao meio ambiente." },
  ];
  return (
    <PublicShell className="rs-page">
      <PageHero
        label="Instituto RanBank · proposta"
        title="O lado social do RanBank."
        text="Uma proposta de instituto para transformar parte do resultado do banco em educação, inclusão e apoio a comunidades."
      >
        <div className="rs-actions">
          <Link className="rs-btn rs-btn-primary rs-btn-lg" href="/projetos">Ver os projetos</Link>
          <Link className="rs-btn rs-btn-outline rs-btn-lg" href="/banco">Abrir o banco</Link>
        </div>
      </PageHero>
      <section className="rs-section rs-light">
        <div className="rs-wrap">
          <SectionHead label="Quatro frentes" title="Ideias simples para problemas reais." />
          <div className="rs-controls is-four">
            {fronts.map((front) => (
              <article key={front.title}>
                <i className="rs-tile-icon"><Icon name={front.icon} /></i>
                <h3>{front.title}</h3>
                <p>{front.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="rs-section">
        <div className="rs-wrap rs-split">
          <SectionHead label="Como trabalhar" title="Primeiro ouvir. Depois construir." text="Uma boa iniciativa começa pela realidade das pessoas, respeita cada comunidade e explica seus objetivos com clareza." />
          <ul className="rs-checklist">
            {["Ouvir quem será atendido", "Falar em linguagem simples", "Decidir junto com a comunidade", "Mostrar resultados com transparência"].map((item) => (
              <li key={item}><Icon name="check" size={20} />{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="rs-section rs-light">
        <div className="rs-wrap">
          <p className="rs-honest"><Icon name="alert" size={20} /> O Instituto RanBank é uma proposta. Ele ainda não existe e não tem parcerias oficiais.</p>
        </div>
      </section>
    </PublicShell>
  );
}
