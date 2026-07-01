import { useState, useEffect, useRef } from "react";
import {
  Target, TrendingUp, Video, ShoppingCart, Radio, MessageCircle,
  ArrowLeft, PlayCircle, Sparkles, ChevronRight, CheckCircle2,
  AlertTriangle, Lightbulb, Clock, Camera, Scissors, Send, Users,
  Settings2, Layers, Rocket, XCircle, Store, Smartphone, Gift,
  Eye, Wallet, Zap, User, Menu, X
} from "lucide-react";

/* ============================================================
   NEW ERA iGAMING — Plataforma de treinamento
   Design tokens
   bg #090909 · surface #111111 · border rgba(255,255,255,.06)
   text #FFFFFF · secondary #A8A8A8 · accent #3E7BFA / #63A6FF
   ============================================================ */

const ROUTES = [
  "home",
  "influenciadores",
  "anuncios",
  "conteudos",
  "marketplace",
  "tiktok-live",
  "whatsapp",
  "videoaulas",
];

function useHashRoute() {
  const parse = () => {
    const raw = window.location.hash.replace("#/", "").replace("#", "");
    return ROUTES.includes(raw) ? raw : "home";
  };
  const [route, setRoute] = useState(parse());

  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const navigate = (r) => {
    window.location.hash = r === "home" ? "/" : `/${r}`;
    setRoute(r);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return [route, navigate];
}

/* ---------------------------- Global style ---------------------------- */

function GlobalStyle() {
  return (
    <style>{`
      .ne-root{
        --bg:#090909;
        --surface:#111111;
        --surface-2:#0d1117;
        --border:rgba(255,255,255,0.06);
        --border-strong:rgba(255,255,255,0.12);
        --text:#FFFFFF;
        --text-secondary:#A8A8A8;
        --accent:#3E7BFA;
        --accent-2:#63A6FF;
        --accent-deep:#13224f;
        font-family:'Inter',ui-sans-serif,system-ui,-apple-system,sans-serif;
        background:var(--bg);
        color:var(--text);
        min-height:100vh;
        position:relative;
      }
      @keyframes ne-fadeUp{
        from{opacity:0; transform:translateY(18px);}
        to{opacity:1; transform:translateY(0);}
      }
      @keyframes ne-fadeIn{
        from{opacity:0;}
        to{opacity:1;}
      }
      @keyframes ne-rotate{
        from{transform:rotate(0deg);}
        to{transform:rotate(360deg);}
      }
      @keyframes ne-pulseGlow{
        0%,100%{opacity:.55; transform:scale(1);}
        50%{opacity:.9; transform:scale(1.04);}
      }
      @keyframes ne-shimmer{
        0%{background-position:-200% 0;}
        100%{background-position:200% 0;}
      }
      .ne-animate{
        animation:ne-fadeUp .7s cubic-bezier(.22,1,.36,1) both;
      }
      .ne-fade{
        animation:ne-fadeIn .9s ease both;
      }
      .ne-ring{
        animation:ne-rotate 22s linear infinite;
      }
      .ne-ring-rev{
        animation:ne-rotate 30s linear infinite reverse;
      }
      .ne-glow{
        animation:ne-pulseGlow 5s ease-in-out infinite;
      }
      .ne-noise{
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
        pointer-events:none;
      }
      .ne-card{
        background:linear-gradient(180deg, var(--surface) 0%, #0c0c0e 100%);
        border:1px solid var(--border);
        backdrop-filter:blur(18px);
        -webkit-backdrop-filter:blur(18px);
        transition:border-color .35s ease, transform .35s ease, box-shadow .35s ease, background .35s ease;
      }
      .ne-card:hover{
        border-color:rgba(62,123,250,0.35);
        box-shadow:0 0 0 1px rgba(62,123,250,0.08), 0 20px 60px -20px rgba(62,123,250,0.25);
      }
      .ne-glass{
        background:rgba(17,17,17,0.55);
        border:1px solid var(--border);
        backdrop-filter:blur(22px);
        -webkit-backdrop-filter:blur(22px);
      }
      .ne-btn{
        position:relative;
        overflow:hidden;
        background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
        border:1px solid var(--border);
        transition:transform .4s cubic-bezier(.22,1,.36,1), border-color .4s ease, box-shadow .4s ease, background .4s ease;
      }
      .ne-btn:hover{
        transform:translateY(-4px) scale(1.015);
        border-color:rgba(99,166,255,0.45);
        box-shadow:0 0 0 1px rgba(62,123,250,0.15), 0 24px 60px -18px rgba(62,123,250,0.45);
        background:linear-gradient(180deg, rgba(62,123,250,0.10), rgba(255,255,255,0.01));
      }
      .ne-btn:active{
        transform:translateY(-1px) scale(0.99);
      }
      .ne-btn .ne-btn-sheen{
        position:absolute; inset:0;
        background:linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.06) 40%, transparent 60%);
        background-size:200% 100%;
        opacity:0;
        transition:opacity .4s ease;
      }
      .ne-btn:hover .ne-btn-sheen{
        opacity:1;
        animation:ne-shimmer 1.6s ease infinite;
      }
      .ne-back{
        border:1px solid var(--border);
        background:rgba(255,255,255,0.02);
        transition:all .3s ease;
      }
      .ne-back:hover{
        border-color:rgba(99,166,255,0.4);
        background:rgba(62,123,250,0.08);
        transform:translateX(-3px);
      }
      .ne-eyebrow{
        letter-spacing:.28em;
      }
      .ne-scrollbar::-webkit-scrollbar{ width:8px; }
      .ne-scrollbar::-webkit-scrollbar-thumb{ background:rgba(62,123,250,0.25); border-radius:8px; }
      .ne-num{
        background:linear-gradient(160deg, rgba(62,123,250,0.18), rgba(62,123,250,0.02));
        border:1px solid rgba(99,166,255,0.25);
      }
      video-frame, .ne-video-wrap{ aspect-ratio:16/9; }
    `}</style>
  );
}

/* ---------------------------- Shared bits ---------------------------- */

function Eyebrow({ children }) {
  return (
    <span className="ne-eyebrow text-[11px] font-semibold uppercase text-[var(--accent-2)]">
      {children}
    </span>
  );
}

function SectionTitle({ eyebrow, title, subtitle, align = "left" }) {
  return (
    <div className={`mb-10 ${align === "center" ? "text-center" : ""} ne-animate`}>
      {eyebrow && (
        <div className="mb-3">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Card({ children, className = "", delay = 0 }) {
  return (
    <div
      className={`ne-card ne-animate rounded-2xl p-6 sm:p-7 ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function StepCard({ number, title, text, icon: Icon, delay = 0 }) {
  return (
    <Card delay={delay} className="relative">
      <div className="flex items-start gap-4">
        <div className="ne-num flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
          {Icon ? (
            <Icon size={19} className="text-[var(--accent-2)]" strokeWidth={1.8} />
          ) : (
            <span className="text-sm font-bold text-[var(--accent-2)]">{number}</span>
          )}
        </div>
        <div>
          <div className="mb-1 flex items-center gap-2">
            {Icon && (
              <span className="ne-eyebrow text-[10px] font-bold text-[var(--accent-2)]">
                PASSO {number}
              </span>
            )}
            <h3 className="text-base sm:text-lg font-bold">{title}</h3>
          </div>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{text}</p>
        </div>
      </div>
    </Card>
  );
}

function InfoCard({ icon: Icon, title, text, tone = "accent", delay = 0 }) {
  const toneColor =
    tone === "warn" ? "#F5A524" : tone === "danger" ? "#F45B69" : "var(--accent-2)";
  return (
    <Card delay={delay}>
      <div
        className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}
      >
        <Icon size={18} style={{ color: toneColor }} strokeWidth={1.8} />
      </div>
      <h3 className="mb-2 text-base font-bold">{title}</h3>
      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{text}</p>
    </Card>
  );
}

function Chip({ children }) {
  return (
    <span className="ne-eyebrow inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.02] px-4 py-1.5 text-[10px] font-bold text-[var(--text-secondary)]">
      {children}
    </span>
  );
}

/* ---------------------------- Navbar / Footer ---------------------------- */

function Navbar({ navigate, route }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[#090909]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-2.5 group"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-deep)] shadow-[0_0_18px_rgba(62,123,250,0.5)]">
            <Sparkles size={15} className="text-white" strokeWidth={2} />
          </div>
          <span className="text-sm font-extrabold tracking-widest text-white">
            NEW ERA <span className="text-[var(--accent-2)] font-light">iGAMING</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          <button
            onClick={() => navigate("videoaulas")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              route === "videoaulas"
                ? "bg-[var(--accent)]/15 text-[var(--accent-2)]"
                : "text-[var(--text-secondary)] hover:text-white"
            }`}
          >
            <PlayCircle size={14} /> Vídeo Aulas
          </button>
          {route !== "home" && (
            <button
              onClick={() => navigate("home")}
              className="ml-2 rounded-full border border-[var(--border-strong)] px-4 py-2 text-xs font-semibold text-white hover:border-[var(--accent-2)]/50 hover:bg-[var(--accent)]/10 transition-all"
            >
              Início
            </button>
          )}
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--border)] px-5 py-3 md:hidden">
          <button
            onClick={() => { navigate("videoaulas"); setOpen(false); }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-[var(--text-secondary)] hover:bg-white/5"
          >
            <PlayCircle size={16} /> Vídeo Aulas
          </button>
          <button
            onClick={() => { navigate("home"); setOpen(false); }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-[var(--text-secondary)] hover:bg-white/5"
          >
            <ArrowLeft size={16} /> Início
          </button>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[var(--accent)] to-[var(--accent-deep)]">
              <Sparkles size={13} className="text-white" />
            </div>
            <span className="text-xs font-bold tracking-widest text-[var(--text-secondary)]">
              NEW ERA iGAMING
            </span>
          </div>
          <p className="text-center text-xs text-[var(--text-secondary)]">
            Conteúdo exclusivo de treinamento. Uso interno &amp; educacional, Qualquer tipo de reprodução, cópia ou distribuição é proibida sem autorização.
          </p>
          <div className="flex gap-3">
            {[Target, TrendingUp, Video, ShoppingCart, Radio, MessageCircle].map((Ic, i) => (
              <div
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)]"
              >
                <Ic size={13} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------- Page shell ---------------------------- */

function PageShell({ navigate, eyebrow, title, subtitle, icon: Icon, children }) {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
      <button onClick={() => navigate("home")} className="ne-back ne-animate mb-10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white">
        <ArrowLeft size={14} /> Voltar
      </button>

      <div className="ne-animate mb-14 flex flex-col items-start gap-5" style={{ animationDelay: "80ms" }}>
        {Icon && (
          <div className="ne-glow flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)]/25 to-transparent border border-[var(--accent)]/30">
            <Icon size={24} className="text-[var(--accent-2)]" strokeWidth={1.7} />
          </div>
        )}
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-sm text-[var(--text-secondary)] sm:text-base">{subtitle}</p>
        </div>
      </div>

      {children}
    </div>
  );
}

function Block({ label, children }) {
  return (
    <section className="mb-16">
      {label && (
        <div className="mb-6 flex items-center gap-3 ne-animate">
          <span className="h-px w-8 bg-gradient-to-r from-[var(--accent)] to-transparent" />
          <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">{label}</h3>
        </div>
      )}
      {children}
    </section>
  );
}

/* ============================================================
   HOME
   ============================================================ */

function Home({ navigate }) {
  const buttons = [
    { id: "influenciadores", label: "Como Conseguir Influenciadores", icon: Target },
    { id: "anuncios", label: "Como Rodar Anúncios", icon: TrendingUp },
    { id: "conteudos", label: "Como Produzir Conteúdos", icon: Video },
    { id: "marketplace", label: "Estratégia de Marketplace", sub: "Facebook & OLX", icon: ShoppingCart },
    { id: "tiktok-live", label: "Estratégia de Live no TikTok", icon: Radio },
    { id: "whatsapp", label: "Estratégia de WhatsApp", icon: MessageCircle },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[var(--accent)]/10 blur-[140px]" />
      <div className="ne-noise pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-5xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
        <div className="ne-fade mb-14 flex flex-col items-center text-center">
          <Chip>
            <Sparkles size={11} className="text-[var(--accent-2)]" /> ACESSO EXCLUSIVO
          </Chip>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
            NEW ERA <span className="text-[var(--accent-2)]">iGAMING</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-[var(--text-secondary)] sm:text-base">
            Central de treinamentos com as estratégias que movem os melhores
            resultados do mercado. Escolha um módulo abaixo e comece agora.
          </p>
        </div>

        {/* central image card with signature glow ring */}
        <div className="ne-animate mb-16 flex justify-center" style={{ animationDelay: "150ms" }}>
          <div className="relative flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
            <div className="ne-ring absolute inset-0 rounded-[2.5rem] opacity-70" style={{
              background: "conic-gradient(from 0deg, transparent 0%, rgba(99,166,255,0.55) 18%, transparent 36%, transparent 64%, rgba(62,123,250,0.4) 82%, transparent 100%)",
              filter: "blur(2px)",
            }} />
            <div className="ne-ring-rev absolute inset-3 rounded-[2.2rem] opacity-40" style={{
              background: "conic-gradient(from 90deg, transparent 10%, rgba(99,166,255,0.35) 30%, transparent 55%)",
            }} />
            <div className="ne-glass relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2rem] shadow-[0_0_60px_-10px_rgba(62,123,250,0.35)]">
                <div className="ne-glass relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2rem] shadow-[0_0_60px_-10px_rgba(62,123,250,0.35)]">
                  <img
                    src="/boneco.jpg"
                    alt="Personagem"
                    className="h-full w-full object-cover"
                  />
                </div>
            </div>
          </div>
        </div>

        {/* six big buttons */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {buttons.map((b, i) => (
            <button
              key={b.id}
              onClick={() => navigate(b.id)}
              className="ne-btn ne-animate group relative flex items-center gap-4 rounded-2xl px-6 py-5 text-left"
              style={{ animationDelay: `${220 + i * 70}ms` }}
            >
              <span className="ne-btn-sheen" />
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)]/25 to-transparent border border-[var(--accent)]/25 transition-transform duration-300 group-hover:scale-110">
                <b.icon size={21} className="text-[var(--accent-2)]" strokeWidth={1.7} />
              </div>
              <div className="relative flex-1">
                <p className="text-sm font-bold leading-snug text-white sm:text-base">{b.label}</p>
                {b.sub && <p className="text-xs text-[var(--text-secondary)]">{b.sub}</p>}
              </div>
              <ChevronRight size={18} className="relative text-[var(--text-secondary)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent-2)]" />
            </button>
          ))}
        </div>

        {/* video aulas cta */}
        <button
          onClick={() => navigate("videoaulas")}
          className="ne-btn ne-animate group relative mt-4 flex w-full items-center gap-4 rounded-2xl px-6 py-5 text-left"
          style={{ animationDelay: "660ms" }}
        >
          <span className="ne-btn-sheen" />
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)]/25 to-transparent border border-[var(--accent)]/25 transition-transform duration-300 group-hover:scale-110">
            <PlayCircle size={21} className="text-[var(--accent-2)]" strokeWidth={1.7} />
          </div>
          <div className="relative flex-1">
            <p className="text-sm font-bold leading-snug text-white sm:text-base">Vídeo Aulas</p>
          </div>
          <ChevronRight size={18} className="relative text-[var(--text-secondary)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent-2)]" />
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   PÁGINA: INFLUENCIADORES
   ============================================================ */
function Influenciadores({ navigate }) {
  return (
    <PageShell
      navigate={navigate}
      icon={Target}
      eyebrow="Módulo 01 · Aquisição"
      title="Estratégia de Captação de Influenciadores"
      subtitle="Processo estruturado para abordagem, negociação e fechamento de parcerias com influenciadores."
    >
      <Block label="Introdução">
        <Card>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            Estratégia focada em micro e mid influenciadores (20 mil a 200 mil seguidores),
            priorizando engajamento real, público qualificado e consistência de postagem.
          </p>
        </Card>
      </Block>

      <Block label="Análise antes do contato">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StepCard
            number={1}
            title="Visualização dos stories"
            text="Verifique se o influenciador realmente entrega alcance consistente nos stories."
            delay={0}
          />
          <StepCard
            number={2}
            title="Engajamento real"
            text="Analise comentários genuínos, curtidas e interação do público."
            delay={80}
          />
          <StepCard
            number={3}
            title="Compatibilidade de público"
            text="Confirme se a audiência combina com o seu produto ou oferta."
            delay={160}
          />
          <StepCard
            number={4}
            title="Frequência de postagem"
            text="Prefira criadores ativos e consistentes."
            delay={240}
          />
        </div>
      </Block>

      <Block label="Abordagem e negociação">
        <Card>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            Inicie a conversa de forma natural, sem proposta direta imediata.
            Construa relacionamento primeiro e só depois apresente a parceria.
          </p>
          <div className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <p>• “Oi, tudo bem?”</p>
            <p>• Criar conexão antes da proposta</p>
            <p>• Evitar mensagens genéricas</p>
          </div>
        </Card>
      </Block>

      <Block label="Modelo de parceria">
        <Card>
          <div className="space-y-3 text-sm text-[var(--text-secondary)]">
            <p>
              <strong>Comissão (preferencial):</strong> até 50% por depósito gerado via link do influenciador.
            </p>
            <p>
              • Acompanhamento em painel em tempo real (depósitos, saldo e comissão)
            </p>
            <p>
              • Pagamento realizado pela equipe responsável
            </p>
          </div>
        </Card>
      </Block>

      <Block label="Opção de cachê fixo">
        <Card>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>• Negociar valor com base em alcance e engajamento</p>
            <p>• Ajustar conforme performance do influenciador</p>
            <p>• Buscar equilíbrio entre custo e fechamento</p>
          </div>
        </Card>
      </Block>

      <Block label="Contrato e execução">
        <Card>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>• Quantidade de stories definidos</p>
            <p>• Valor fixo (se aplicável)</p>
            <p>• Comissão acordada</p>
            <p>• Datas de divulgação</p>
            <p>• Forma e prazo de pagamento</p>
            <p>• Obrigações de ambas as partes</p>
            <p>• Assinatura formal</p>
          </div>
        </Card>
      </Block>

      <Block label="Pós-divulgação">
        <Card>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>• Efetuar pagamento conforme contrato</p>
            <p>• Enviar link de afiliado</p>
            <p>• Monitorar resultados em tempo real</p>
          </div>
        </Card>
      </Block>

      <Block label="Observações importantes">
        <Card>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>• Priorize métricas reais, não apenas seguidores</p>
            <p>• Nunca prometa resultados garantidos</p>
            <p>• Diversifique influenciadores para reduzir risco</p>
            <p>• Se houver cachê, o pagamento deve ser cumprido independentemente do resultado</p>
          </div>
        </Card>
      </Block>
    </PageShell>
  );
}

/* ============================================================
   PÁGINA: ANÚNCIOS
   ============================================================ */

function Anuncios({ navigate }) {
  return (
    <PageShell
      navigate={navigate}
      icon={TrendingUp}
      eyebrow="Módulo 02 · Tráfego pago"
      title="Como Rodar Anúncios"
      subtitle="Estrutura completa para criar, testar e escalar campanhas em Facebook, Instagram e TikTok."
    >
      <Block label="Introdução">
        <Card>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            O sucesso em anúncios pagos não vem de “hack”, e sim de processo:
            criativos testados, campanhas bem separadas, público correto e escala
            controlada com base em dados reais.
          </p>
        </Card>
      </Block>

      <Block label="Criativos (teste constante)">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StepCard
            number={1}
            title="Vídeos curtos"
            text="Use vídeos de 15–30 segundos com foco em retenção nos primeiros 3 segundos."
            delay={0}
          />
          <StepCard
            number={2}
            title="Prova social"
            text="Use prints de resultados, depósitos ou retiradas para gerar credibilidade."
            delay={70}
          />
          <StepCard
            number={3}
            title="Demonstração"
            text="Mostre a plataforma em uso real para aumentar confiança."
            delay={140}
          />
          <StepCard
            number={4}
            title="Volume de testes"
            text="Crie de 5 a 10 variações de anúncios para identificar os melhores performers."
            delay={210}
          />
        </div>
      </Block>

      <Block label="Estrutura de campanhas">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StepCard
            number={1}
            title="Reconhecimento"
            text="Campanhas para gerar visibilidade e aquecer o público."
            delay={0}
          />
          <StepCard
            number={2}
            title="Tráfego"
            text="Direciona usuários para a página de cadastro ou landing page."
            delay={70}
          />
          <StepCard
            number={3}
            title="Conversão"
            text="Foco total em cadastro e ação final do usuário."
            delay={140}
          />
          <StepCard
            number={4}
            title="Remarketing"
            text="Impacta usuários que visitaram e não concluíram cadastro."
            delay={210}
          />
        </div>
      </Block>

      <Block label="Público">
        <Card>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>• Comece com públicos amplos para o algoritmo aprender</p>
            <p>• Use interesses relacionados ao nicho de apostas</p>
            <p>• Crie lookalike quando houver base de dados suficiente</p>
            <p>• Faça remarketing para visitantes e engajados</p>
          </div>
        </Card>
      </Block>

      <Block label="Orçamento e otimização">
        <Card>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>• Inicie com orçamento suficiente para gerar dados reais</p>
            <p>• Evite mudanças diárias nas campanhas</p>
            <p>• Deixe rodar alguns dias antes de otimizar</p>
            <p>• Direcione verba para anúncios com menor CPA</p>
          </div>
        </Card>
      </Block>

      <Block label="Métricas principais">
        <Card>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>• CPC (custo por clique)</p>
            <p>• CTR (taxa de cliques)</p>
            <p>• CPA (custo por aquisição/cadastro)</p>
            <p>• Taxa de conversão da página</p>
            <p>• ROI (retorno sobre investimento)</p>
          </div>
        </Card>
      </Block>

      <Block label="Escala">
        <Card>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>• Aumente orçamento gradualmente</p>
            <p>• Crie variações dos anúncios vencedores</p>
            <p>• Expanda para audiências semelhantes</p>
            <p>• Mantenha consistência no que já performa bem</p>
          </div>
        </Card>
      </Block>
    </PageShell>
  );
}

/* ============================================================
   PÁGINA: CONTEÚDOS
   ============================================================ */
function Conteudos({ navigate }) {
  const items = [
    {
      icon: Camera,
      title: "Prova social",
      text: "Mostre ganhos, saques, depósitos e resultados reais para gerar confiança e curiosidade."
    },
    {
      icon: Layers,
      title: "Conteúdo educativo",
      text: "Ensine como criar conta, depositar, sacar e usar a plataforma de forma simples e rápida."
    },
    {
      icon: Scissors,
      title: "Conteúdo comparativo",
      text: "Destaque vantagens como rapidez, suporte e facilidade sem atacar concorrentes."
    },
    {
      icon: Send,
      title: "Perguntas frequentes",
      text: "Transforme dúvidas comuns em vídeos curtos e diretos."
    },
    {
      icon: Users,
      title: "Influenciadores",
      text: "Reaproveite vídeos de influenciadores e distribua em múltiplas plataformas."
    },
    {
      icon: Clock,
      title: "Frequência",
      text: "Consistência diária é essencial para crescimento e reconhecimento de marca."
    }
  ];

  return (
    <PageShell
      navigate={navigate}
      icon={Video}
      eyebrow="Módulo 03 · Produção"
      title="Estratégia de Conteúdo"
      subtitle="Sistema completo para produção diária de conteúdo focado em tráfego, engajamento e conversão."
    >
      <Block label="Objetivo">
        <Card>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            Produzir conteúdo diariamente para gerar curiosidade, construir confiança
            e direcionar usuários para cadastro na plataforma.
          </p>
        </Card>
      </Block>

      <Block label="Tipos de conteúdo">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((it, i) => (
            <InfoCard
              key={it.title}
              icon={it.icon}
              title={it.title}
              text={it.text}
              delay={i * 60}
            />
          ))}
        </div>
      </Block>

      <Block label="Conteúdo para tráfego pago">
        <Card>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>• Gancho forte nos primeiros 3 segundos</p>
            <p>• Demonstração rápida da plataforma</p>
            <p>• Explicação simples do benefício</p>
            <p>• Chamada para ação clara (cadastro)</p>
          </div>
        </Card>
      </Block>

      <Block label="Frequência de publicação">
        <Card>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>• 3 a 5 vídeos no TikTok</p>
            <p>• 3 a 5 Reels no Instagram</p>
            <p>• 2 a 4 Shorts no YouTube</p>
            <p>• 5 a 10 Stories diários</p>
            <p>• 15 a 30 Status no WhatsApp</p>
          </div>
        </Card>
      </Block>

      <Block label="Reaproveitamento de conteúdo">
        <Card>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>• Um vídeo pode ser usado em todas as plataformas</p>
            <p>• TikTok, Reels, Shorts e Kwai</p>
            <p>• Stories e Status do WhatsApp</p>
            <p>• Maximiza alcance com o mesmo esforço de produção</p>
          </div>
        </Card>
      </Block>

      <Block label="Objetivo final">
        <Card>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            Toda publicação deve levar o usuário a uma única ação: acessar o link
            ou entrar em contato para cadastro. Consistência gera volume, e volume
            gera conversão.
          </p>
        </Card>
      </Block>
    </PageShell>
  );
}

/* ============================================================
   PÁGINA: MARKETPLACE (especial)
   ============================================================ */
function Marketplace({ navigate }) {
  return (
    <PageShell
      navigate={navigate}
      icon={ShoppingCart}
      eyebrow="Módulo 04 · forte em manipulação"
      title="Estratégia de Marketplace"
      subtitle="Uso de Facebook Marketplace e OLX como canais orgânicos de aquisição de contatos."
    >
      <Block label="Introdução">
        <Card>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            Marketplaces são canais com alto volume de tráfego orgânico e grande intenção de compra.
            Quando bem estruturados, funcionam como fonte constante de leads qualificados.
          </p>
        </Card>
      </Block>

      <Block label="Publicação dos anúncios">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StepCard
            number={1}
            title="Publicação dos anúncios"
            text="Anuncie produtos muito desejados pelo público. Utilize preços chamativos."
            delay={0}
          />
          <StepCard
            number={2}
            title="Direcione para o WhatsApp"
            text="Em todos os anúncios, peça para a pessoa entrar em contato pelo WhatsApp."
            delay={70}
          />
          <StepCard
            number={3}
            title="Trabalhe os Status do WhatsApp"
            text="Após a pessoa salvar seu contato, publique diariamente uma sequência de Status"
            delay={140}
          />
        </div>
      </Block>

      <Block label="Atendimento no WhatsApp">
        <Card>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>• Quando entrar em contanto contigo para comprar o produto de um desculpa como</p>
            <p>• "(Nome) O Produto ja foi reservado por outra pessoa, e ela vai buscar amanhã, vai receber um dinheiro, mais caso ele não vai ficar deixe meu contato salvo que te aviso, e sempre tenho "IPHONES" mais barato para vender compro e revendo, Fala que sempre posta no status do wpp"</p>
            <p>• O objetivo é fazer com que ela salve seu número, aumentando as chances de acompanhar seus Status.</p>
          </div>
        </Card>
      </Block>

      <Block label="Estratégia de Status">
        <Card>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>• Trabalhe os Status do WhatsApp Após a pessoa salvar seu contato, publique diariamente uma sequência de Status:</p>
            <p>• Mostre bastidores reais (produtos, rotina, entregas)</p>
            <p>• Compartilhe feedbacks e resultados reais de clientes</p>
            <p>• Finalize com convite para contato direto</p>
          </div>
        </Card>
      </Block>

      <Block label="Exemplo de sequência de Status">
        <Card>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>1. 🎮 Vídeo jogando.</p>
            <p>2. 💸 Vídeo realizando um saque.</p>
            <p>3. 💰 Dinheiro aparecendo na conta.</p>
            <p>No último Status, coloque uma chamada para ação, por exemplo:</p>
            <p>• "Quer aprender como funciona? Me chama no WhatsApp que eu te ensino.""</p>
          </div>
        </Card>
      </Block>

      <Block label="Conversão Quando a pessoa chamar">
        <Card>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>• Explique como funciona a plataforma.</p>
            <p>• Envie seu link de afiliado..</p>
            <p>• Oriente a pessoa a fazer o cadastro.</p>
            <p>• Incentive o primeiro depósito e acompanhe até a conclusão."</p>
          </div>
        </Card>
      </Block>
    </PageShell>
  );
}

/* ============================================================
   PÁGINA: TIKTOK LIVE
   ============================================================ */

function TiktokLive({ navigate }) {
  return (
    <PageShell
      navigate={navigate}
      icon={Radio}
      eyebrow="Módulo 05 · Live"
      title="Estratégia de Lives"
      subtitle="Como organizar transmissões ao vivo para aumentar os depositos de forma orgânica."
    >
      <Block label="Objetivo">
        <Card>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            Criar lives jogando e mostrando a plataforma para eles.
          </p>
        </Card>
      </Block>

      <Block label="Estrutura da Live">
        <Card>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
          - Pergunte de onde a pessoa está assistindo.   
          <p>
          - Incentive o chat a se cadastrar na plataforma.
          </p>
          <p>
          - Responda perguntas do público.
          </p>
          </p>
        </Card>
      </Block>
      <Block label="Conteúdo">
        <Card>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
          - Comente novidades do mercado.
          <p>
          - Explique como funcionam casas de apostas (melhorando a imagem da que esta divulgando).
          </p>
          <p>
          - Compartilhe curiosidades.
          </p>
          </p>
        </Card>
      </Block>
    </PageShell>
  );
}

/* ============================================================
   PÁGINA: WHATSAPP
   ============================================================ */

function WhatsApp({ navigate }) {
  return (
    <PageShell
      navigate={navigate}
      icon={MessageCircle}
      eyebrow="Módulo 06 · Captação de novos jogadores"
      title="Estratégia de WhatsApp"
      subtitle="Transforme contatos em conversas ativas com um funil de jogadores do jeito certo."
    >
      <Block label="Introdução">
        <Card>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
• Entre em grupos movimentados
<p></p>
• Sendo de aposta
<p></p>
• Comunidade 
<p></p>
• Qualquer sequimento pois apostadores tem em todo lugar!
          </p>
        </Card>
      </Block>

      <Block label="1. Captação">
        <Card>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
• Use um texto par mandar em todos os grupos para captar os jogadores
  <p></p>
• Interage, chame no privado explique sobre a plataforma
          </p>
        </Card>
      </Block>


<Block label="2. Disparo (maior risco de ban)">
  <div className="flex flex-col gap-4">
    <Card>
      <div className="space-y-2 text-sm text-[var(--text-secondary)]">
        <p>• Use uma ferramenta específica para disparo</p>
        <p>• Alvo: grupos de apostas</p>
        <p>Envie na DM de todos os membros</p>
        <p>Modelo de mensagem:</p>
      </div>
    </Card>

    <Card>
      <div className="space-y-2 text-sm text-[var(--text-secondary)]">
        <p>"Oii, vi que você está no grupo (nome do grupo), gostaria de te apresentar um jogo que está dando um retorno e ganhando muito. Teria interesse?"</p>
        <p> <strong>  Após a resposta, envie seu link de afiliado, force o cadastro e o depósito. Acompanhe todo o processo do começo ao fim. </strong></p>
      </div>
    </Card>
  </div>
</Block>

      <Block label="sequencia de status">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
<InfoCard
  icon={Gift}
  title=""
  text={
    <>
      <p>1. 🎮 Vídeo jogando.</p>
      <p>2. 💸 Vídeo realizando um saque.</p>
      <p>3. 💰 Dinheiro aparecendo na conta.</p>
      <p>• No último Status, coloque uma chamada para ação, por exemplo:</p>
      <p>• "<strong>Quer aprender como funciona? Me chama no WhatsApp que eu te ensino. </strong>"</p>
    </>
  }
/>
      </div>
      </Block>

      <Block label="Dicas">
        <Card>
          <div className="flex items-start gap-3">
            <Lightbulb size={18} className="mt-0.5 shrink-0 text-[var(--accent-2)]" />
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              • Disparo em massa aumenta muito o risco de banimento do número. Trabalhe com chips separados, aqueça os números antes e nunca use seu WhatsApp pessoal principal para disparo.
            </p>
          </div>
        </Card>
      </Block>
    </PageShell>
  );
}

/* ============================================================
   PÁGINA: VÍDEO AULAS
   ============================================================ */

function VideoAulas({ navigate }) {
  const videos = [
    { id: "6cVpcBd4b7s", title: "Aula 01" },
    { id: "WVy0nshvGEg", title: "Aula 02" },
    { id: "-76RMGeEI2E", title: "Aula 03" },
  ];

  return (
    <PageShell
      navigate={navigate}
      icon={PlayCircle}
      eyebrow="Biblioteca"
      title="Vídeo Aulas"
      subtitle=""
    >
      <Block>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {videos.map((v, i) => (
            <Card key={v.id} delay={i * 90} className="overflow-hidden !p-0">
              <div className="ne-video-wrap w-full overflow-hidden rounded-t-2xl bg-black">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center gap-3 p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent)]/15 border border-[var(--accent)]/25">
                  <PlayCircle size={16} className="text-[var(--accent-2)]" />
                </div>
                <p className="text-sm font-bold">{v.title}</p>
              </div>
            </Card>
          ))}
        </div>
      </Block>
    </PageShell>
  );
}

/* ============================================================
   APP ROOT
   ============================================================ */

export default function App() {
  const [route, navigate] = useHashRoute();

  const pages = {
    home: Home,
    influenciadores: Influenciadores,
    anuncios: Anuncios,
    conteudos: Conteudos,
    marketplace: Marketplace,
    "tiktok-live": TiktokLive,
    whatsapp: WhatsApp,
    videoaulas: VideoAulas,
  };

  const Page = pages[route] || Home;

  return (
    <div className="ne-root">
      <GlobalStyle />
      <Navbar navigate={navigate} route={route} />
      <Page navigate={navigate} />
      <Footer />
    </div>
  );
}
