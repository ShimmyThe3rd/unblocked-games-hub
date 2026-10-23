import {
  Search,
  Gamepad2,
  Shield,
  Monitor,
  Fullscreen,
  Home,
  Sparkles,
  Trophy,
  Flame,
  Zap,
  SlidersHorizontal,
  ChevronRight,
  Star,
  Play
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { gameCatalog } from './data/games';

const categories = ['All', 'Action', 'Puzzle', 'Arcade', 'Sports', 'Retro'];

const STEALTH_TITLES = {
  on: 'Google Docs',
  off: 'Unblocked Games Hub'
};

const STEALTH_ICONS = {
  on: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"%3E%3Crect width="64" height="64" rx="16" fill="%23dbeafe"/%3E%3Cpath d="M18 22h28v20H27l-9 9V22z" fill="%233b82f6"/%3E%3C/svg%3E',
  off: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect width="64" height="64" rx="16" fill="%230b1220"/%3E%3Cpath d="M16 22h32v20H44l-8 8-8-8H16z" fill="%235eead4"/%3E%3C/svg%3E'
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [stealthMode, setStealthMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    document.title = stealthMode ? STEALTH_TITLES.on : STEALTH_TITLES.off;
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = stealthMode ? STEALTH_ICONS.on : STEALTH_ICONS.off;
    }
  }, [stealthMode]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const filteredGames = useMemo(() => {
    return gameCatalog.filter((game) => {
      const matchesCategory =
        selectedCategory === 'All' || game.category === selectedCategory;
      const lowercaseQuery = searchQuery.toLowerCase();
      const matchesSearch =
        game.title.toLowerCase().includes(lowercaseQuery) ||
        game.description.toLowerCase().includes(lowercaseQuery) ||
        game.category.toLowerCase().includes(lowercaseQuery);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleFullscreen = async () => {
    const frame = iframeRef.current;
    if (!frame) return;

    try {
      if (!document.fullscreenElement) {
        await frame.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.warn('Fullscreen unavailable for this game frame.', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-6 lg:px-6">
        <aside className="glass hidden w-[260px] shrink-0 rounded-3xl border border-slate-800/80 p-5 shadow-glow lg:flex lg:flex-col">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 shadow-[0_0_30px_rgba(45,212,191,0.45)]">
              <Gamepad2 className="h-6 w-6 text-slate-950" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-300/80">Play Hub</p>
              <h1 className="mt-1 text-xl font-black">Unblocked</h1>
            </div>
          </div>

          <nav className="space-y-2">
            <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
              <SlidersHorizontal className="h-4 w-4" />
              Browse
            </div>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all ${
                  selectedCategory === category
                    ? 'border-cyan-400/60 bg-cyan-500/10 text-cyan-100 shadow-[0_0_25px_rgba(34,211,238,0.18)]'
                    : 'border-transparent bg-slate-900/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <span>{category}</span>
                <ChevronRight className="h-4 w-4 opacity-60" />
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-4">
            <div className="mb-3 flex items-center gap-2 text-amber-300">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-semibold">Stealth Mode</span>
            </div>
            <button
              onClick={() => setStealthMode((prev) => !prev)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                stealthMode
                  ? 'bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/40'
                  : 'bg-slate-800 text-slate-100 hover:bg-slate-700'
              }`}
            >
              <span>{stealthMode ? 'Enabled' : 'Disabled'}</span>
              <Sparkles className="h-4 w-4" />
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-4 shadow-glow md:p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 text-cyan-300 ring-1 ring-slate-700">
                  <Monitor className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Game portal</p>
                  <h2 className="text-2xl font-black tracking-tight text-white">Unblocked Games Hub</h2>
                </div>
              </div>

              <div className="flex items-center gap-3 self-start md:self-auto">
                <div className="hidden rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-300 md:flex md:items-center md:gap-2">
                  <Trophy className="h-4 w-4 text-amber-300" />
                  <span>Top picks</span>
                </div>
                <button
                  onClick={() => setStealthMode((prev) => !prev)}
                  className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-500/60 hover:text-cyan-100"
                >
                  <Shield className="h-4 w-4" />
                  {stealthMode ? 'Stealth On' : 'Stealth Off'}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <label className="relative block flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search games, genres, or vibes..."
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 py-3.5 pl-12 pr-4 text-base text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-500/70"
                />
              </label>

              <div className="flex gap-2 overflow-x-auto pb-1 md:overflow-visible">
                {categories.slice(1).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap rounded-full border px-3 py-2 text-sm transition ${
                      selectedCategory === category
                        ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-200'
                        : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <section className="mb-7 grid gap-4 md:grid-cols-3">
            {[
              { label: 'Trending', value: '12+' , icon: Flame },
              { label: 'Fast Play', value: '2 min', icon: Zap },
              { label: 'Featured', value: '5 games', icon: Star }
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-glow">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-slate-400">{label}</span>
                  <Icon className="h-4 w-4 text-cyan-300" />
                </div>
                <p className="text-2xl font-black tracking-tight text-white">{value}</p>
              </div>
            ))}
          </section>

          <section className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Library</p>
              <h3 className="text-2xl font-bold text-white">Popular picks</h3>
            </div>
            <div className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-sm text-slate-300">
              {filteredGames.length} titles
            </div>
          </section>

          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredGames.map((game) => (
              <article
                key={game.id}
                className="game-card group relative overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/70 shadow-glow transition duration-200 hover:-translate-y-1 hover:border-cyan-500/50"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
                    <span
                      className="rounded-full border border-white/15 bg-slate-950/60 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
                      style={{ boxShadow: `0 0 18px ${game.color}66` }}
                    >
                      {game.category}
                    </span>
                    {game.featured && (
                      <span className="rounded-full bg-amber-400/90 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-950">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="relative z-10 space-y-4 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-xl font-bold text-white">{game.title}</h4>
                      <p className="mt-1 text-sm text-slate-400">{game.description}</p>
                    </div>
                    <button
                      onClick={() => setSelectedGame(game)}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-200 ring-1 ring-cyan-400/30 transition hover:bg-cyan-500/20"
                      aria-label={`Play ${game.title}`}
                    >
                      <Play className="ml-0.5 h-4 w-4 fill-current" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
                      4.8/5
                    </span>
                    <button
                      onClick={() => setSelectedGame(game)}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1.5 font-medium text-white transition hover:bg-slate-700"
                    >
                      Launch
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </main>
      </div>

      {selectedGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-3 backdrop-blur-md md:p-6">
          <div className="flex h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-[32px] border border-slate-700 bg-slate-950 shadow-[0_30px_80px_rgba(15,23,42,0.9)]">
            <div className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/80 px-4 py-3 md:px-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-2.5 text-slate-950">
                  <Gamepad2 className="h-full w-full" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
                    Now playing
                  </p>
                  <h3 className="text-lg font-bold text-white">{selectedGame.title}</h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-500/50 hover:text-cyan-100"
                >
                  <Fullscreen className="h-4 w-4" />
                  {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                </button>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-rose-500/40 hover:text-rose-100"
                >
                  <Home className="h-4 w-4" />
                  Back to Hub
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-950 p-2 md:p-4">
              <div className="h-full overflow-hidden rounded-[24px] border border-slate-800 bg-slate-900">
                <iframe
                  ref={iframeRef}
                  title={selectedGame.title}
                  src={selectedGame.url}
                  className="h-full w-full bg-white"
                  loading="lazy"
                  allow="fullscreen; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
