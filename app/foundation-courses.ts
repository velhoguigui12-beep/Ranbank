// Fundação RanBank: categorias, cursos e trilha.
// A página /fundacao (no site do banco) e o catálogo /fundacao/cursos usam esta mesma lista.
// Para mudar um curso, um nome ou uma descrição, edite só este arquivo.

/** Endereço do site da Fundação. Se ele ganhar um domínio próprio, troque aqui. */
export const FOUNDATION_SITE_URL = "/fundacao/cursos";

export type CategoryId = "vida" | "tecnologia" | "jogos" | "esporte" | "expressao";
export type CategoryIcon = "wallet" | "chip" | "chess" | "ball" | "spark";

export type Category = {
  id: CategoryId;
  name: string;
  summary: string;
  /** Fundo escuro do card. */
  bg: string;
  /** Cor do rótulo e do ícone. O título do card é sempre branco. */
  accent: string;
  icon: CategoryIcon;
};

export const CATEGORIES: Category[] = [
  { id: "vida", name: "Vida prática", summary: "Dinheiro, tempo e cuidado no dia a dia.", bg: "#0e3523", accent: "#3ddc84", icon: "wallet" },
  { id: "tecnologia", name: "Tecnologia e criação", summary: "Computador por dentro e impressão 3D.", bg: "#12224f", accent: "#8fb1ff", icon: "chip" },
  { id: "jogos", name: "Jogos e estratégia", summary: "Xadrez, dominó e jogos para pensar.", bg: "#0c3340", accent: "#22c3ee", icon: "chess" },
  { id: "esporte", name: "Esporte", summary: "Futebol de campo e de areia.", bg: "#3d2a10", accent: "#f5b83d", icon: "ball" },
  { id: "expressao", name: "Você e expressão", summary: "Autoconhecimento, leitura e maquiagem.", bg: "#3a1f3d", accent: "#f2a7d8", icon: "spark" },
];

export type Course = {
  id: string;
  title: string;
  category: CategoryId;
  description: string;
  /** Partes do curso, quando já estão definidas. */
  modules?: Array<{ title: string }>;
  /** Assuntos do curso. Cursos com assuntos em comum aparecem como "parecidos". */
  tags: string[];
  /** Frase curta que aparece ao passar o mouse, para dar vontade de assistir. */
  hook: string;
  /** "O que você vai aprender até o final do curso", em tópicos. */
  learn: string[];
};

export const COURSES: Course[] = [
  { id: "educacao-financeira", title: "Educação financeira pessoal", category: "vida", tags: ["Dinheiro", "Planejamento", "Dia a dia"],
    hook: "Descubra para onde vai o seu dinheiro e faça ele durar até o fim do mês.",
    learn: ["Montar um orçamento simples com o que entra e o que sai", "Separar gastos fixos, variáveis e o que é desejo", "Criar uma reserva para emergências, mesmo guardando pouco", "Usar Pix, cartão e crédito sem cair em dívida", "Reconhecer golpes e promessas de dinheiro fácil"],
    description: "Como organizar o dinheiro do mês, separar o que é gasto do que é sonho e começar a guardar, mesmo ganhando pouco." },
  { id: "gestao-tempo", title: "Gestão de tempo", category: "vida", tags: ["Planejamento", "Rotina", "Estudos"],
    hook: "Dê conta de estudo, trabalho e ainda sobre tempo para você.",
    learn: ["Planejar a semana em poucos minutos", "Separar o que é urgente do que é importante", "Dividir tarefas grandes em passos pequenos", "Diminuir distrações do celular na hora de focar", "Montar uma rotina que inclui descanso"],
    description: "Jeitos simples de planejar a semana, dar conta de estudo e trabalho e sobrar tempo para descansar." },
  { id: "primeiros-socorros", title: "Primeiros socorros", category: "vida", tags: ["Saúde", "Cuidado", "Dia a dia"],
    hook: "Os primeiros minutos fazem diferença. Saiba como agir.",
    learn: ["Avaliar a cena e se proteger antes de ajudar", "Chamar o socorro certo e passar as informações", "Agir em engasgo, desmaio e sangramento", "Cuidar de queimaduras e torções até a ajuda chegar", "Saber o que não fazer para não piorar a situação"],
    description: "O que fazer, e o que não fazer, nos primeiros minutos de uma emergência até a ajuda chegar." },
  {
    id: "hardware-so", title: "Hardware e sistema operacional", category: "tecnologia", tags: ["Computador", "Tecnologia", "Mão na massa", "Raciocínio"],
    hook: "Abra o computador por dentro e entenda como tudo funciona.",
    learn: ["Reconhecer as principais peças de um computador", "Entender o que cada peça faz e como elas conversam", "Instalar e configurar um sistema operacional", "Organizar arquivos, programas e atualizações", "Resolver problemas comuns e manter o computador saudável"],
   
    description: "Das peças do computador ao sistema que faz tudo funcionar: entender, cuidar e resolver problemas comuns.",
    modules: [{ title: "Hardware básico" }, { title: "Sistema operacional" }],
  },
  { id: "impressora-3d", title: "Impressora 3D", category: "tecnologia", tags: ["Tecnologia", "Criação", "Mão na massa"],
    hook: "Tire uma ideia da cabeça e segure ela na mão.",
    learn: ["Entender como uma impressora 3D funciona", "Desenhar uma peça simples no computador", "Preparar o arquivo para imprimir", "Escolher o material e ajustar a impressão", "Corrigir falhas comuns e dar acabamento à peça"],
    description: "Como uma ideia vira objeto: do desenho no computador à peça impressa." },
  { id: "xadrez", title: "Xadrez", category: "jogos", tags: ["Estratégia", "Raciocínio", "Concentração"],
    hook: "Aprenda a pensar alguns lances à frente.",
    learn: ["Mover cada peça e entender as regras especiais", "Abrir a partida com um bom plano", "Reconhecer táticas como garfo e cravada", "Dar xeque-mate nos finais mais comuns", "Analisar suas partidas para melhorar"],
    description: "Das regras e movimentos às primeiras estratégias para pensar alguns lances à frente." },
  { id: "domino", title: "Dominó", category: "jogos", tags: ["Estratégia", "Raciocínio", "Diversão"],
    hook: "Na mesa, quem conta as pedras sai na frente.",
    learn: ["Regras do dominó e das variações mais jogadas", "Contar pedras e prever o jogo do adversário", "Jogar em dupla com estratégia", "Saber a hora de fechar ou segurar o jogo"],
    description: "Regras, contagem de pedras e as jogadas que fazem diferença na mesa." },
  { id: "jogos", title: "Jogos", category: "jogos", tags: ["Estratégia", "Diversão", "Criação", "Equipe"],
    hook: "Jogar também é treinar a cabeça.",
    learn: ["Entender o que torna um jogo divertido", "Pensar em estratégia antes de cada jogada", "Aprender com a derrota e ajustar o plano", "Jogar em equipe e respeitar as regras"],
    description: "O que torna um jogo divertido e como pensar em estratégia jogando." },
  {
    id: "futebol", title: "Futebol", category: "esporte", tags: ["Esporte", "Equipe", "Saúde", "Estratégia"],
    hook: "Do campo à areia: jogue melhor e em equipe.",
    learn: ["Fundamentos: passe, domínio, condução e chute", "Posicionamento e leitura de jogo", "Diferenças entre o futebol de campo e o de areia", "Jogar em equipe e se comunicar em campo", "Aquecer e se cuidar para evitar lesões"],
   
    description: "Fundamentos, posicionamento e jogo em equipe, no campo e na areia.",
    modules: [{ title: "Futebol de campo" }, { title: "Futebol de areia" }],
  },
  { id: "autodesenvolvimento", title: "Autodesenvolvimento", category: "expressao", tags: ["Autoconhecimento", "Planejamento", "Rotina"],
    hook: "Conheça seus pontos fortes e faça um plano para crescer.",
    learn: ["Identificar seus pontos fortes e o que quer melhorar", "Definir metas possíveis, com prazo", "Criar hábitos pequenos que se mantêm", "Lidar com erros sem desistir", "Montar um plano para os próximos meses"],
    description: "Conhecer seus pontos fortes, definir metas possíveis e criar hábitos que ajudam a chegar lá." },
  { id: "literatura", title: "Literatura", category: "expressao", tags: ["Leitura", "Escrita", "Criação"],
    hook: "Leia com gosto e comece a escrever as suas histórias.",
    learn: ["Escolher livros que combinam com você", "Entender melhor o que lê e conversar sobre isso", "Reconhecer estilos e gêneros literários", "Escrever um conto curto do início ao fim"],
    description: "Ler com gosto, entender melhor o que se lê e começar a escrever as próprias histórias." },
  { id: "maquiagem", title: "Maquiagem", category: "expressao", tags: ["Autocuidado", "Criação", "Expressão"],
    hook: "Do básico do dia a dia à produção para uma festa.",
    learn: ["Preparar e cuidar da pele antes da maquiagem", "Escolher base e corretivo para o seu tom", "Fazer uma maquiagem rápida para o dia a dia", "Montar uma produção para ocasiões especiais", "Limpar e guardar os pincéis e produtos"],
    description: "Do básico do dia a dia à produção para ocasiões especiais, com cuidado com a pele." },
];

/** Trilha "Comece por aqui", em ordem. */
export const STARTER_PATH = ["educacao-financeira", "gestao-tempo", "autodesenvolvimento"];

/**
 * Fotos dos cursos: Unsplash (licença gratuita, permite uso sem pagar).
 * Ficam em public/images/fundacao/<id do curso>.webp, em 960 × 540.
 */
export const PHOTO_CREDITS: Record<string, { by: string; url: string }> = {
  "educacao-financeira": { by: "Towfiqu barbhuiya", url: "https://unsplash.com/photos/joqWSI9u_XM" },
  "gestao-tempo": { by: "Estée Janssens", url: "https://unsplash.com/photos/aQfhbxailCs" },
  "primeiros-socorros": { by: "Kristine Wook", url: "https://unsplash.com/photos/ZyxNWi3JCto" },
  "hardware-so": { by: "Alexandre Debiève", url: "https://unsplash.com/photos/FO7JIlwjOtU" },
  "impressora-3d": { by: "Osman Talha Dikyar", url: "https://unsplash.com/photos/NMCABEhN0RE" },
  "xadrez": { by: "Randy Fath", url: "https://unsplash.com/photos/G1yhU1Ej-9A" },
  "domino": { by: "Ryan Quintal", url: "https://unsplash.com/photos/Ecp0vf3f_aw" },
  "jogos": { by: "Nik Korba", url: "https://unsplash.com/photos/3WceTBlUoMs" },
  "futebol": { by: "Wesley Tingey", url: "https://unsplash.com/photos/dKCKiC0BQtU" },
  "autodesenvolvimento": { by: "Cathryn Lavery", url: "https://unsplash.com/photos/fMD_Cru6OTk" },
  "literatura": { by: "Kimberly Farmer", url: "https://unsplash.com/photos/lUaaKCUANVI" },
  "maquiagem": { by: "Rosa Rafael", url: "https://unsplash.com/photos/pxax5WuM7eY" },
};
export const courseImage = (course: Course) => `/images/fundacao/${course.id}.webp`;

/** Título com palavra muito comprida (ex.: "Autodesenvolvimento"): o card usa uma letra menor, sem hífen. */
export const hasLongWord = (title: string, limit = 15) => title.split(" ").some((word) => word.length >= limit);

export const categoryOf = (id: CategoryId) => CATEGORIES.find((category) => category.id === id) ?? CATEGORIES[0];
export const courseById = (id: string) => COURSES.find((course) => course.id === id);

/** Partes do curso: as definidas, ou uma parte única com o nome do curso. */
export const partsOf = (course: Course) => course.modules ?? [{ title: "Aula de apresentação" }];

/** Assuntos em comum entre dois cursos. */
export const sharedTags = (a: Course, b: Course) => a.tags.filter((tag) => b.tags.includes(tag));

/**
 * Cursos parecidos com um curso: cada assunto em comum vale 2 pontos e a mesma categoria vale 1.
 * `skip` tira da lista cursos que a pessoa já fez ou está fazendo.
 */
export function similarCourses(course: Course, skip: string[] = [], limit = 6) {
  return COURSES
    .filter((other) => other.id !== course.id && !skip.includes(other.id))
    .map((other) => ({ other, score: sharedTags(course, other).length * 2 + (other.category === course.category ? 1 : 0) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.other.title.localeCompare(b.other.title, "pt-BR"))
    .slice(0, limit)
    .map((item) => item.other);
}
