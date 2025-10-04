import React, { useEffect, useMemo, useRef, useState } from "react";
import * as Tone from "tone";
import { motion, AnimatePresence } from "framer-motion";
import {Play, Pause, Volume2, VolumeX, Sparkles, Shuffle, Waves, Compass, Sun, Moon, Heart, Feather, Droplets, Eye, Coffee, Settings, Wand2, Wand, Map, Scissors, Palette, Gamepad2, Clock, Lock, Unlock
} from "lucide-react";

/* ---------- Helpers localStorage ---------- */
const storage = {
  get: (k, fallback) => {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};

/* ---------- Poèmes (reprend votre contenu) ---------- */
  // … Conserver votre tableau "poems" existant tel quel (titres, textes, icônes, color, emotion, intensity, soundscape, keywords) …
  // Copiez votre tableau "poems" ici. Le reste du composant s'appuie dessus.
  /* ---------- POEMS (ton contenu existant) ---------- */
const poems = [
  {
    title: "Miroir du soir",
    text: `L'univers dans tes yeux,
Ahurie, je contemplais.
Radieuses pupilles bleues,
À l'heure où le soleil se couchait.`,
    icon: Sun,
    color: "from-orange-400 to-pink-500",
    emotion: "émerveillement",
    intensity: 95,
    soundscape: {
      notes: ['C5', 'E5', 'G5'],
      rhythm: '4n',
      reverb: 0.8,
      filter: 2000,
      texture: 'ethereal'
    },
    keywords: ["univers", "yeux", "radieuses", "soleil"]
  },
  {
    title: "Éternité",
    text: `Je ne te connais pas tant,
Mais je t'aimerai
Par tous les temps,
Pour ce que tu es,
Peu importe ce que tu penses,
Je t'aimerai
Que le soleil rayonne pour toi,
Qu'il t'entraîne, de ses rayons
Sur le plus calme des rivages,
À travers les plus chauds sillons,
Je t'aimerai
Comme une palombe,
Que jamais cette joie ne tombe,
J'écrirai à en devenir nanar,
À en décrire l'amour véritable,
Je t'aimerai
À présent pour le futur le plus lointain,
Ensemble, on découvrira,
De ce monde les moindres recoins,
Jusqu'à ce que tu me croies
Je t'aimerai.`,
    icon: Heart,
    color: "from-red-400 to-rose-500",
    emotion: "engagement",
    intensity: 100,
    soundscape: {
      notes: ['C4', 'E4', 'G4', 'C5'],
      rhythm: '2n',
      reverb: 0.6,
      filter: 1500,
      texture: 'warm'
    },
    keywords: ["aimerai", "temps", "ensemble", "éternité", "palombe"]
  },
  {
    title: "Coloriage d'encens",
    text: `En coloriage tu apparais
Et ma tristesse disparaît
Boussole et loriot le jour
Phare et luciole la nuit
Je me retrouve
Entre nos quatre pupilles
La joie de vivre court
Un parfum subtil.`,
    icon: Compass,
    color: "from-yellow-400 to-amber-500",
    emotion: "joie",
    intensity: 90,
    soundscape: {
      notes: ['D5', 'F#5', 'A5', 'D6'],
      rhythm: '8n',
      reverb: 0.4,
      filter: 3000,
      texture: 'bright'
    },
    keywords: ["coloriage", "boussole", "luciole", "pupilles", "parfum"]
  },
  {
    title: "La vapeur des cœurs",
    text: `D'une profondeur et d'une pureté intense,
Consolant et gorgé de douceur,
Aussi stimulant que réconfortant,
Sur un fond laiteux, savoureux et sans crème,
Envoûtant, réchauffant par sa vapeur les bohèmes.
Éveillant les ignorants, en les enveloppant jusqu'aux oreilles, sincèrement, et avec soin, mais sans sucre, s'il vous plaît.
De ces reflets charmants, tant charmeurs, que charmées.
La surface aussi attentive que palpitante,
Le fond autant apaisant qu'il fait parler,
Pareillement vicieux que batifolant,
Un sourire se lisant dedans, et qui résonne un amer à soigner.
Cette après-midi,
J'ai cru apercevoir un regard à l'encens de café.`,
    icon: Coffee,
    color: "from-amber-600 to-brown-500",
    emotion: "sensualité",
    intensity: 85,
    soundscape: {
      notes: ['F#4', 'A4', 'C#5', 'E5'],
      rhythm: '4n',
      reverb: 0.7,
      filter: 1200,
      texture: 'rich'
    },
    keywords: ["vapeur", "café", "encens", "profondeur", "envoûtant"]
  },
  {
    title: "Tableau d'un après midi",
    text: `L'herbe est plus verte ici,
Depuis que tu y es passée.
Tu es les beaux jours, la pluie,
Je doute que ce soit assez —
Mes larmes noires jonchent le carrelage,
Pour te décrire : finesse, exigence,
Tournesol du désir écarlate,
Chaque page reflète mes croyances,
Entour mes faiblesses à la cire mate,
Brise les entraves existantes.`,
    icon: Feather,
    color: "from-green-400 to-emerald-600",
    emotion: "mélancolie douce",
    intensity: 70,
    soundscape: {
      notes: ['E4', 'G4', 'B4'],
      rhythm: '2n',
      reverb: 0.9,
      filter: 800,
      texture: 'soft'
    },
    keywords: ["herbe", "larmes", "tournesol", "écarlate", "entraves"]
  },
  {
    title: "Marée écarlate",
    text: `Mes pensées pour elle sont telles
Un ouragan, par lequel, ô jamais ciel,
Je ne pensais me faire emporter.
Elles demeurent déchaînées et paralysantes
Sans pour autant ôter à mon esprit sa lucidité,
Plutôt, une pérennité assourdissante.
Ce sentiment envoûtant,
N'a de cesse de me ramener sur un enveloppant rivage
Auquel je m'agrippe lorsque je prends le large,
Affrontant l'orage des vagues en pages,
Le crayon gris griffonnant sur le visage sans ride que j'ai perdu. Je nage.
Pendant que j'attends le temps qui glisse
Dans l'espoir que les sages guérissent
Les opprimés et sourient aux vaincus ;
Je serai l'étoile écarlate qui scintille pour toi,
Allongé dans la nuit pour faire reculer les abysses.
Jusqu'au petit matin, que le chagrin t'épargne,
Et garde vifs nos souvenirs intimes,
S'infusant où tu poses ton regard,
Les parfumant d'amertume.`,
    icon: Droplets,
    color: "from-red-600 to-purple-700",
    emotion: "tourment passionné",
    intensity: 95,
    soundscape: {
      notes: ['D4', 'F4', 'A4', 'D5'],
      rhythm: '8n',
      reverb: 0.5,
      filter: 1800,
      texture: 'intense'
    },
    keywords: ["ouragan", "marée", "vagues", "nage", "abysses", "écarlate"]
  },
  {
    title: "Le serment des pupilles",
    text: `Je ne veux pas que notre lien se désagrège en lettre,
Ni qu'il devienne une fable au goût aigre.
Oui, je veux te boire — lentement —
Une vie entière durant, dévorer ton silence.
Dans le noir béant ou l'obscurité partielle du soir, savoir lire en toi comme dans un grimoire.
Dans le bruit ambiant, et les rêves d'enfants
Revivre ces scènes dans les champs,
Se perdre dans nos pupilles, ne jamais oublier tous ces moments ensemble —
Graver dans des pages secrètes aux enluminures parfaites, nos souvenirs afin qu'ils y demeurent.
Et pour rien au monde
Je ne les remplacerai.
Tes yeux châtaigne me hèlent et pour eux je pourrais —
Dévoué comme un destrier
Faire de mon âme ton épée,
Trancher le ciel muet,
T'en forger un bouclier.
Afin que tu atteignes ton amour ; mon aimée,
Mes poèmes qui te sont destinés.
Je réciterai,
En vers ou en prose, mes fièvres d'été, mes doutes d'octobre.
Je t'attendrai sous les cerisiers
Puis les grands froids de février. Qu'importe.
Tu as le pouvoir de narguer les rayons du soleil qui te parviennent,
Avec seulement un grand sourire,
Faire disparaître des ombres épaisses.
Alors, même si ce n'est que pour m'en abreuver,
Laisse-moi rester,
Laisse-toi devenir celle,
Auprès de laquelle je me tiendrai,
Et à qui je murmurerai : je t'aime.`,
    icon: Eye,
    color: "from-amber-500 to-orange-700",
    emotion: "dévotion",
    intensity: 98,
    soundscape: {
      notes: ['G4', 'B4', 'D5', 'G5'],
      rhythm: '4n',
      reverb: 0.7,
      filter: 1600,
      texture: 'devotional'
    },
    keywords: ["pupilles", "grimoire", "épée", "serment", "destrier"]
  },
  {
    title: "Paradoxe",
    text: `Je t'aime de plus en plus mais je rêve d'une autre ;
Elle hante mes nuits, avec toi mes jours s'évaporent —
Je n'ai dans le cœur qu'un sablier pour boussole.
Tu m'échappes, je m'isole,
Cours après le temps qui s'effrite,
L'envie de son plumage désinvolte —
Quand bien même les souvenirs s'envolent,
Sur nos peaux s'exprime une mosaïque.
Que les oiseaux nous tissent une pirogue,
Avec la plus belle des peintures sur sa quille.
S'évader pour rester en osmose,
Ou rester et risquer de nous perdre dans l'esquisse ?`,
    icon: Compass,
    color: "from-slate-500 to-zinc-700",
    emotion: "confusion",
    intensity: 75,
    soundscape: {
      notes: ['Eb4', 'Gb4', 'Bb4'],
      rhythm: '4n',
      reverb: 0.6,
      filter: 1000,
      texture: 'dissonant'
    },
    keywords: ["paradoxe", "sablier", "échappes", "mosaïque", "esquisse"]
  },
  {
    title: "Bracelet d'absence",
    text: `Encore dans tous mes songes
Je m'y attarde pourtant,
Dans mon âme pour toi,
Je pose un bracelet de perles sur la hantise de te perdre.
Et quand la nuit m'appelle,
Tu es la seule présente,
Au creux de mon oreille,
Tu chuchotes chaque raison,
De mille mots et merveilles,
Balançant tes paupières,
L'amour de quatre saisons.`,
    icon: Moon,
    color: "from-indigo-400 to-purple-600",
    emotion: "nostalgie",
    intensity: 80,
    soundscape: {
      notes: ['C#4', 'E4', 'G#4'],
      rhythm: '2n',
      reverb: 0.9,
      filter: 900,
      texture: 'nostalgic'
    },
    keywords: ["bracelet", "perles", "songes", "hantise", "nuit"]
  },
  {
    title: "Éclosion",
    text: `L'exercice n'est plus si drôle, j'ai la sensation
Que ses os se dispersent dans les eaux de mon torse
Mon thorax se serre, c'est la blessure qui éclot
Le cœur si fragile, une fine pluie s'abat dessus.`,
    icon: Droplets,
    color: "from-blue-400 to-cyan-600",
    emotion: "douleur",
    intensity: 65,
    soundscape: {
      notes: ['B3', 'D4', 'F#4'],
      rhythm: '4n',
      reverb: 0.8,
      filter: 700,
      texture: 'fragile'
    },
    keywords: ["éclosion", "blessure", "thorax", "pluie", "fragile"]
  },
  {
    title: "Prière du veuf fou",
    text: `Puisse les chiens des enfers manger mes doutes.
Puisse les anges qui t'accompagnent guérir tes troubles.
Je ne suis plus qu'un corps nu, vide de tout.
Je t'attends comme un veuf devenu fou, te souhaitant le plus doux.`,
    icon: Moon,
    color: "from-gray-700 to-black",
    emotion: "désespoir",
    intensity: 50,
    soundscape: {
      notes: ['A3', 'C4', 'E4'],
      rhythm: '1n',
      reverb: 1.0,
      filter: 500,
      texture: 'hollow'
    },
    keywords: ["prière", "veuf", "enfers", "vide", "fou"]
  },
  {
    title: "Lumière éphémère",
    text: `Je ne reverrai son sourire solaire que dans mes souvenirs austères ou sur insta.
Comment me défaire de cette image instable de ses traits de visage ; insurmontable.
Jusqu'où irai-je fouiller pour trouver ses iris aux éclats dorés et d'érable ?`,
    icon: Sun,
    color: "from-yellow-600 to-orange-400",
    emotion: "perte",
    intensity: 60,
    soundscape: {
      notes: ['B4', 'D5', 'F#5'],
      rhythm: '4n',
      reverb: 0.7,
      filter: 2500,
      texture: 'ephemeral'
    },
    keywords: ["lumière", "éphémère", "souvenirs", "iris", "érable"]
  },
  {
    title: "Au fond de la valise",
    text: `Qu'est-ce que la peur,
Si ce n'est un processus de protection vis-à-vis d'une situation présente ou anticipée.
Une représentation construite de différentes perceptions et réponses cognitives cherchant, consciemment ou non, à éviter l'échec.
Moi j'ai peur.
Ça, ce n'est rien de l'écrire,
Peur, de ne pas être moi dans le reflet de ses iris ou dans le ventre de ses bras,
Cherchant toujours plus ce que je pourrais bien chercher autant,
Gambergeant sur ma gamberge elle-même,
Comme ce chien aboyant son écho retentissant.
Me posant finalement la question : Mon histoire ne serait-elle pas de l'écrire ?
Mais cette peur me paralyse, tout seul dans le noir de ma chambre, je me catalyse, me demande à qui je pense, personne.
Je suis le seul dans ma tête. Il n'y a rien dans ma valise, quelques mises en abyme. Rien d'autre.`,
    icon: Feather,
    color: "from-gray-600 to-slate-800",
    emotion: "introspection",
    intensity: 55,
    soundscape: {
      notes: ['C4', 'Eb4', 'G4'],
      rhythm: '2n',
      reverb: 0.8,
      filter: 1100,
      texture: 'introspective'
    },
    keywords: ["peur", "valise", "abyme", "écrire", "catalyse"]
  },
  {
    title: "L'hirondelle et l'écho",
    text: `Je te réalise comme tu es, tu n'es plus aussi belle.
Tes yeux m'envoûtent toujours autant, mais je te vois réellement désormais,
Plus accablé par tant de sentiments, tu as été, et est toujours cette flamme qui a tout changé, celle qui pousse à la création par sa destruction personnelle.
Celle qui bouleverse les écosystèmes de sa présence charnelle.
Comment mieux te décrire que ce que je n'ai déjà fait la veille.
Auparavant tu étais si belle, si personnelle à mon cœur, aujourd'hui c'est différent j'ai grandi, j'ai migré, comme une hirondelle j'ai changé mainte fois de perspective pour mieux capter l'essence de ta présence au creux de mon être, j'ai buté sur des mots, je ne me suis jamais arrêté d'écrire, parfois ta silhouette résonne encore, as-tu tout fait pour me maudire ?
Moi, j'ai essayé de t'oublier, mais en vain, rien n'y fait, je m'en suis mangé les doigts et j'ai épuisé mes stylos.
Tu es la seule à qui j'espère que parviennent ces mots.
Non en fait, je vais les garder secrets, et quand le sommeil ne viendra pas, je relirai ces proses que j'ai écrites pour toi et que je n'ai jamais pu te lire de vive voix.`,
    icon: Feather,
    color: "from-teal-500 to-blue-700",
    emotion: "lucidité",
    intensity: 70,
    soundscape: {
      notes: ['F4', 'A4', 'C5', 'F5'],
      rhythm: '4n',
      reverb: 0.6,
      filter: 1400,
      texture: 'clear'
    },
    keywords: ["hirondelle", "écho", "lucidité", "migré", "réalise"]
  },
  {
    title: "Masque de joie",
    text: `J'écris pour moi,
Je lis pour toi,
Fends le ciel, le disperse en éclats.
J'en dispose le substrat,
Sur tes joues écarlates, d'un geste délicat
Pour t'en faire un masque de joie.
Tu étais, resteras cette mystérieuse aura,
Qui dans la nuit appelle, quand il est tard ;
Ce fardeau je le porte de mes bras,
Pendant que tu guides chaque voyage
Encens subtil, supprime entraves,
Oblige à te voir, comme faille frontale.`,
    icon: Heart,
    color: "from-pink-400 to-red-500",
    emotion: "résignation tendre",
    intensity: 65,
    soundscape: {
      notes: ['Ab4', 'C5', 'Eb5'],
      rhythm: '2n',
      reverb: 0.7,
      filter: 1300,
      texture: 'tender'
    },
    keywords: ["masque", "joie", "écris", "aura", "voyage"]
  }
];

/* ---------- Constantes clés localStorage ---------- */
const LS_KEYS = {
  READ_MEMORY: "traj_read_memory_v1",           // #4 timestamps par poème
  DAILY_ASSIGN: "traj_daily_poem_v1",           // #5 mapping jour -> index
  PALETTE: "traj_palette_v1",                   // #12 palette 5 couleurs
  HAPTICS_ENABLED: "traj_haptics_enabled_v1",   // #13 toggle haptics
  REMIXES: "traj_remixes_v1",                   // #9 remixes sauvegardés
  ENTROPY_STATE: "traj_entropy_state_v1",       // #20 état des mélanges
  PINNED_LINES: "traj_pinned_lines_v1",         // #20 lignes figées
  WEAR_LEVEL: "traj_wear_level_v1",             // #6 patine (proxy local)
  ECHOS: "traj_echos_v1",                       // (2) micro-réflexions locales
  GHOST_UNLOCK: "traj_ghost_unlock_v1"          // #19 conditions locales
};

/* ---------- Utilitaires musique / BPM respiratoire (#3) ---------- */
const useBreathingTempo = ({ enabled, baseBpm = 80 }) => {
  const lastActionRef = useRef(Date.now());
  const [bpm, setBpm] = useState(baseBpm);

  useEffect(() => {
    if (!enabled) return;
    const onAction = () => { lastActionRef.current = Date.now(); };
    const onScroll = () => { lastActionRef.current = Date.now(); };
    window.addEventListener("click", onAction);
    window.addEventListener("keydown", onAction);
    window.addEventListener("scroll", onScroll, { passive: true });

    const id = setInterval(() => {
      const delta = Date.now() - lastActionRef.current;
      // <1s = très actif, 1–4s = actif, >4s = pause longue
      const target = delta < 1000 ? baseBpm + 30 : delta < 4000 ? baseBpm + 10 : baseBpm - 20;
      setBpm((prev) => prev + (target - prev) * 0.15);
    }, 300);

    return () => {
      window.removeEventListener("click", onAction);
      window.removeEventListener("keydown", onAction);
      window.removeEventListener("scroll", onScroll);
      clearInterval(id);
    };
  }, [enabled, baseBpm]);

  return Math.max(40, Math.min(160, Math.round(bpm)));
};

/* ---------- Génération “Échos de lecture” (2) tombée de mots ---------- */
const pickFallingWords = (text, limit = 8) => {
  const words = text
    .split(/\s+/)
    .map(w => w.replace(/[.,;:!?—–()"'«»]/g, ""))
    .filter(w => w.length > 2)
    .slice(0, 120);
  const unique = Array.from(new Set(words));
  // échantillonner aléatoirement
  const res = [];
  const n = Math.min(limit, unique.length);
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * unique.length);
    res.push(unique.splice(idx, 1)[0]);
  }
  return res;
};

/* ---------- Entropie / mélange de texte (#20) ---------- */
const shuffleWords = (text, intensity = 0.15) => {
  const lines = text.split("\n");
  return lines.map(line => {
    const w = line.split(" ");
    const moves = Math.ceil(w.length * intensity);
    for (let i = 0; i < moves; i++) {
      const a = Math.floor(Math.random() * w.length);
      const b = Math.floor(Math.random() * w.length);
      [w[a], w[b]] = [w[b], w[a]];
    }
    return w.join(" ");
  }).join("\n");
};

/* ---------- Boussole émotionnelle 3D (#7) simplifiée (CSS transform) ---------- */
const Compass3D = ({ poems, onPick, palette }) => {
  return (
    <div className="relative w-full h-72 md:h-96 perspective-1000 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
      <div className="absolute inset-0 -rotate-12 md:-rotate-6 scale-110"
           style={{ transformStyle: "preserve-3d" }}>
        {poems.map((p, i) => {
          const angle = (i / poems.length) * Math.PI * 2;
          const x = 40 + 40 * Math.cos(angle);
          const y = 40 + 40 * Math.sin(angle);
          return (
            <button
              key={i}
              onClick={() => onPick(i)}
              className="absolute px-2 py-1 text-xs md:text-sm rounded-lg shadow"
              style={{
                left: `${x}%`, top: `${y}%`,
                background: `linear-gradient(135deg, ${palette[0]}55, ${palette[2]}66)`,
                color: "#fff", transform: "translate(-50%, -50%) translateZ(20px)"
              }}
              title={`${p.title} — ${p.emotion}`}
            >
              {p.title}
            </button>
          );
        })}
      </div>
      <div className="absolute bottom-2 w-full text-center text-[10px] md:text-xs text-gray-400">
        Boussole émotionnelle — cliquez pour naviguer
      </div>
    </div>
  );
};

/* ---------- Composant principal Phase 1 ---------- */
export default function TrajectoireInteractivePhase1() {
  // Index courant / lecture
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = poems[currentIndex];

  // Audio
  const [soundOn, setSoundOn] = useState(false);
  const synthRef = useRef(null);
  const reverbRef = useRef(null);
  const filterRef = useRef(null);
  const loopRef = useRef(null);
  const [audioReady, setAudioReady] = useState(false);

  // Modes UI
  const [modesOpen, setModesOpen] = useState(false);
  const [showCompass, setShowCompass] = useState(false);            // #7
  const [entropyMode, setEntropyMode] = useState(false);            // #20
  const [showRemix, setShowRemix] = useState(false);                // #9
  const [hapticsEnabled, setHapticsEnabled] = useState(storage.get(LS_KEYS.HAPTICS_ENABLED, true));  // #13
  const [palette, setPalette] = useState(storage.get(LS_KEYS.PALETTE, ["#8B5CF6", "#EC4899", "#22D3EE", "#F59E0B", "#10B981"])); // #12
  const [echoesEnabled, setEchoesEnabled] = useState(true);         // (2)
  const [agingEnabled, setAgingEnabled] = useState(true);           // #6
  const [nocturneAuto, setNocturneAuto] = useState(true);           // #14
  const [ghostUnlocked, setGhostUnlocked] = useState(storage.get(LS_KEYS.GHOST_UNLOCK, false)); // #19

  // Mémoire des lectures (#4)
  const [readMemory, setReadMemory] = useState(storage.get(LS_KEYS.READ_MEMORY, {}));
  // Wear level local (#6)
  const [wearLevel, setWearLevel] = useState(storage.get(LS_KEYS.WEAR_LEVEL, poems.map(() => 0)));

  // Entropie (#20)
  const [entropyState, setEntropyState] = useState(storage.get(LS_KEYS.ENTROPY_STATE, poems.map(() => 0)));
  const [pinnedLines, setPinnedLines] = useState(storage.get(LS_KEYS.PINNED_LINES, {})); // {poemIndex: Set(lineIndex)}

  // Remixes (#9)
  const [remixes, setRemixes] = useState(storage.get(LS_KEYS.REMIXES, [])); // {id, srcIndex, dstIndex, line, date}

  // Échos de lecture (2)
  const [echoDraft, setEchoDraft] = useState(""); // 5–10 mots
  const [echoStore, setEchoStore] = useState(storage.get(LS_KEYS.ECHOS, {})); // {word: [microText,...]}

  // Poème du jour (#5)
  const [dailyIndex, setDailyIndex] = useState(null);

  // Tempo respiratoire (#3)
  const bpm = useBreathingTempo({ enabled: soundOn, baseBpm: 80 });

  /* ---------- Persistence ---------- */
  useEffect(() => { storage.set(LS_KEYS.HAPTICS_ENABLED, hapticsEnabled); }, [hapticsEnabled]);
  useEffect(() => { storage.set(LS_KEYS.PALETTE, palette); }, [palette]);
  useEffect(() => { storage.set(LS_KEYS.READ_MEMORY, readMemory); }, [readMemory]);
  useEffect(() => { storage.set(LS_KEYS.WEAR_LEVEL, wearLevel); }, [wearLevel]);
  useEffect(() => { storage.set(LS_KEYS.ENTROPY_STATE, entropyState); }, [entropyState]);
  useEffect(() => { storage.set(LS_KEYS.PINNED_LINES, pinnedLines); }, [pinnedLines]);
  useEffect(() => { storage.set(LS_KEYS.REMIXES, remixes); }, [remixes]);
  useEffect(() => { storage.set(LS_KEYS.ECHOS, echoStore); }, [echoStore]);
  useEffect(() => { storage.set(LS_KEYS.GHOST_UNLOCK, ghostUnlocked); }, [ghostUnlocked]);

  /* ---------- Audio init + lecture ---------- */
  useEffect(() => {
    if (!soundOn || !audioReady) return;
    // Stop précédent
    if (loopRef.current) { loopRef.current.stop(); loopRef.current.dispose(); loopRef.current = null; }

    if (reverbRef.current) {
      reverbRef.current.decay = (current.soundscape?.reverb || 0.5) * 5;
      reverbRef.current.wet.value = current.soundscape?.reverb ?? 0.5;
    }
    if (filterRef.current) {
      filterRef.current.frequency.rampTo(current.soundscape?.filter ?? 2000, 0.5);
    }

    const notes = current.soundscape?.notes || ["C4", "E4", "G4"];
    const rhythm = current.soundscape?.rhythm || "4n";
    let i = 0;
    loopRef.current = new Tone.Loop((time) => {
      synthRef.current.triggerAttackRelease(notes[i % notes.length], rhythm, time);
      i++;
    }, rhythm).start(0);

    Tone.Transport.bpm.rampTo(bpm, 0.4);
    if (Tone.Transport.state !== "started") Tone.Transport.start();
  }, [currentIndex, soundOn, audioReady, bpm]);

  const initAudio = async () => {
    if (audioReady) return;
    await Tone.start();
    reverbRef.current = new Tone.Reverb({ decay: 4, wet: 0.5 }).toDestination();
    filterRef.current = new Tone.Filter({ type: "lowpass", frequency: 2000, rolloff: -24 }).connect(reverbRef.current);
    synthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 0.8, decay: 0.5, sustain: 0.3, release: 2 },
      volume: -10
    }).connect(filterRef.current);
    setAudioReady(true);
  };

  const toggleSound = async () => {
    if (!soundOn) {
      await initAudio();
      setSoundOn(true);
    } else {
      if (loopRef.current) { loopRef.current.stop(); loopRef.current.dispose(); loopRef.current = null; }
      if (Tone.Transport.state === "started") Tone.Transport.stop();
      setSoundOn(false);
    }
  };

  useEffect(() => {
    if (soundOn && audioReady) Tone.Transport.bpm.rampTo(bpm, 0.3);
  }, [bpm, soundOn, audioReady]);

  /* ---------- Mémoire des lectures (#4) + Vieillissement (#6) ---------- */
  useEffect(() => {
    // Enregistrer lecture
    const now = new Date();
    const meta = {
      date: now.toISOString(),
      hour: now.getHours(),
      season: ["hiver", "printemps", "été", "automne"][Math.floor(((now.getMonth()+1)%12)/3)]
    };
    setReadMemory(prev => {
      const list = prev[currentIndex] || [];
      return { ...prev, [currentIndex]: [...list, meta] };
    });
    // Augmenter la patine locale sur ce poème
    setWearLevel(prev => {
      const clone = [...prev];
      clone[currentIndex] = Math.min(100, (clone[currentIndex] || 0) + 2);
      return clone;
    });
  }, [currentIndex]);

  /* ---------- Poème du jour (#5) ---------- */
  useEffect(() => {
    const assign = storage.get(LS_KEYS.DAILY_ASSIGN, {});
    const key = new Date().toISOString().slice(0,10);
    if (assign[key] == null) {
      // Algorithme simple (placeholder local): phases lunaires approx. par jour julien mod 29.53
      // + solstices/équinoxes signalés par un offset dans l’index
      const d = new Date();
      const doy = Math.floor((d - new Date(d.getFullYear(),0,0)) / 86400000);
      const seed = (doy * 37 + d.getFullYear()) % poems.length;
      assign[key] = seed;
      storage.set(LS_KEYS.DAILY_ASSIGN, assign);
    }
    setDailyIndex(assign[key]);
  }, []);

  /* ---------- Mode nocturne adaptatif (#14) ---------- */
  const isNight = useMemo(() => {
    if (!nocturneAuto) return false;
    const h = new Date().getHours();
    return h >= 22 || h < 6;
  }, [nocturneAuto]);

  /* ---------- Haptique (#13) ---------- */
  const vibrate = (pattern = [30, 60, 30]) => {
    if (!hapticsEnabled) return;
    if (navigator?.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  /* ---------- Échos de lecture (2) ---------- */
  const fallingWords = useMemo(() => pickFallingWords(current.text, 8), [currentIndex]);
  const addEcho = (word, text) => {
    const micro = text.trim();
    if (micro.length < 3 || micro.length > 60) return;
    setEchoStore(prev => {
      const next = { ...prev };
      next[word] = [...(next[word] || []), micro].slice(-6); // garder court
      return next;
    });
    setEchoDraft("");
  };

  /* ---------- Entropie (#20): affichage et pinning ---------- */
  const pinLine = (poemIdx, lineIdx) => {
    setPinnedLines(prev => {
      const set = new Set(prev[poemIdx] || []);
      if (set.has(lineIdx)) set.delete(lineIdx); else set.add(lineIdx);
      return { ...prev, [poemIdx]: Array.from(set) };
    });
  };

  const displayText = useMemo(() => {
    if (!entropyMode) return current.text;
    const lines = current.text.split("\n");
    const pinned = new Set(pinnedLines[currentIndex] || []);
    const free = lines.map((line, idx) => (pinned.has(idx) ? line : line));
    // appliquer un shuffle doux sur les lignes non épinglées
    const intensity = Math.min(0.35, (entropyState[currentIndex] || 0) / 100);
    const mixed = shuffleWords(free.join("\n"), intensity);
    return mixed;
  }, [entropyMode, currentIndex, current.text, pinnedLines, entropyState]);

  const tickEntropy = (delta = 4) => {
    setEntropyState(prev => {
      const arr = [...prev];
      arr[currentIndex] = Math.min(100, (arr[currentIndex] || 0) + delta);
      return arr;
    });
  };

  /* ---------- Remixer les vers (#9) ---------- */
  const addRemix = (srcIndex, dstIndex, line) => {
    if (!line || srcIndex == null || dstIndex == null) return;
    const entry = { id: Date.now(), srcIndex, dstIndex, line, date: new Date().toISOString() };
    setRemixes(prev => [...prev, entry]);
  };

  /* ---------- Poème fantôme (#19) ---------- */
  useEffect(() => {
    // Exemple de conditions locales: avoir lu 5 poèmes différents, activer entropie ≥ 20% sur au moins 1, mode nocturne actif
    const distinctRead = Object.keys(readMemory).length >= 5;
    const entropyAny = entropyState.some(v => v >= 20);
    const night = isNight;
    if (distinctRead && entropyAny && night) setGhostUnlocked(true);
  }, [readMemory, entropyState, isNight]);

  const ghostPoem = useMemo(() => ({
    title: "Poème fantôme",
    text:
`Je ne parais qu’aux veilleurs
Quand l’encre pâlit sans peur,
Aux heures où les pas se taisent
Et que le temps dénoue sa braise.

Attrape un fil de brume,
Épingle un vers qui fume,
Mélange mes mots qui tombent,
Et garde ce qui succombe.`,
    emotion: "révélation",
    intensity: 88,
    color: "from-gray-500 to-indigo-700",
    soundscape: { notes: ["D4","G4","A#4","D5"], rhythm: "4n", reverb: 0.8, filter: 1400 }
  }), []);

  /* ---------- Lecture sobre: plein écran, patine visuelle (#6) ---------- */
  const wearOpacity = agingEnabled ? Math.max(0.35, 1 - (wearLevel[currentIndex] || 0)/140) : 1;
  const wearBlur = agingEnabled ? Math.min(2, (wearLevel[currentIndex] || 0)/70) : 0;

  /* ---------- Navigation ---------- */
  const next = () => {
    const total = poems.length + (ghostUnlocked ? 1 : 0);
    setCurrentIndex((i) => (i + 1) % total);
    vibrate([20]); // micro feedback
  };
  const prev = () => {
    const total = poems.length + (ghostUnlocked ? 1 : 0);
    setCurrentIndex((i) => (i - 1 + total) % total);
    vibrate([10,30]);
  };

  const listWithGhost = useMemo(() => ghostUnlocked ? [...poems, ghostPoem] : poems, [ghostUnlocked, ghostPoem]);

  /* ---------- UI ---------- */
  return (
    <div className={`min-h-screen w-full ${isNight ? "bg-[#06080b]" : "bg-black"} text-white`}>
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-5xl font-serif tracking-wide">TRAJECTOIRE</h1>
            <p className="text-xs md:text-sm text-gray-400">Recueil interactif — Lecture sobre par défaut</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              className={`px-3 py-2 rounded-lg border border-white/10 ${soundOn ? "bg-green-600/20" : "bg-white/5"}`}
              title="Musique générative"
            >
              {soundOn ? <Volume2 size={18}/> : <VolumeX size={18}/>}
            </button>
            <button
              onClick={() => setModesOpen(v => !v)}
              className="px-3 py-2 rounded-lg border border-white/10 bg-white/5"
              title="Modes"
            >
              <Settings size={18}/>
            </button>
          </div>
        </div>

        {/* Bandeaux contextuels */}
        <div className="mt-3 flex flex-wrap gap-2 text-[10px] md:text-xs text-gray-300">
          {dailyIndex !== null && (
            <div className="px-2 py-1 rounded bg-white/5 border border-white/10" title="Poème du jour">
              <Clock className="inline mr-1" size={12}/> Poème du jour: {poems[dailyIndex].title}
            </div>
          )}
          {isNight && (
            <div className="px-2 py-1 rounded bg-white/5 border border-white/10" title="Mode nocturne adaptatif">
              <Moon className="inline mr-1" size={12}/> Mode nocturne
            </div>
          )}
          {ghostUnlocked && (
            <div className="px-2 py-1 rounded bg-white/5 border border-white/10" title="Poème fantôme débloqué">
              <Sparkles className="inline mr-1" size={12}/> Poème fantôme disponible
            </div>
          )}
        </div>

        {/* Panneau Modes */}
        <AnimatePresence>
          {modesOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 p-4 rounded-xl border border-white/10 bg-black/40"
            >
              <div className="grid md:grid-cols-3 gap-3">
                {/* #7 Boussole */}
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm"><Compass size={16} className="inline mr-2"/>Boussole émotionnelle</div>
                    <button onClick={() => setShowCompass(v => !v)} className="px-2 py-1 text-xs rounded bg-white/10 border border-white/10">
                      {showCompass ? "Masquer" : "Afficher"}
                    </button>
                  </div>
                  {showCompass && (
                    <div className="mt-2">
                      <Compass3D poems={poems} onPick={setCurrentIndex} palette={palette}/>
                    </div>
                  )}
                </div>

                {/* #20 Entropie */}
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm"><Wand2 size={16} className="inline mr-2"/>Mode entropie</div>
                    <button onClick={() => setEntropyMode(v => !v)} className="px-2 py-1 text-xs rounded bg-white/10 border border-white/10">
                      {entropyMode ? "Désactiver" : "Activer"}
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-gray-300">
                    Les mots se mélangent lentement. Épingle des vers pour les figer. Intensité: {entropyState[currentIndex] || 0}%
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button onClick={() => tickEntropy(+8)} className="px-2 py-1 text-xs rounded bg-white/10 border border-white/10">+ entropie</button>
                    <button onClick={() => setEntropyState(s => { const a=[...s]; a[currentIndex]=Math.max(0,(a[currentIndex]||0)-8); return a; })}
                            className="px-2 py-1 text-xs rounded bg-white/10 border border-white/10">- entropie</button>
                  </div>
                </div>

                {/* #9 Remixer */}
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm"><Scissors size={16} className="inline mr-2"/>Remixer les vers</div>
                    <button onClick={() => setShowRemix(v => !v)} className="px-2 py-1 text-xs rounded bg-white/10 border border-white/10">
                      {showRemix ? "Masquer" : "Afficher"}
                    </button>
                  </div>
                  {showRemix && (
                    <div className="mt-2 text-xs">
                      <RemixPanel poems={poems} onAdd={addRemix} remixes={remixes}/>
                    </div>
                  )}
                </div>

                {/* (2) Échos */}
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm"><MessageIcon/> Échos de lecture</div>
                    <button onClick={() => setEchoesEnabled(v => !v)} className="px-2 py-1 text-xs rounded bg-white/10 border border-white/10">
                      {echoesEnabled ? "Désactiver" : "Activer"}
                    </button>
                  </div>
                  <div className="mt-2 text-[11px] text-gray-300">Clique un mot qui tombe et ajoute une micro-réflexion (5–10 mots).</div>
                </div>

                {/* #12 Palette perso */}
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="font-medium text-sm"><Palette size={16} className="inline mr-2"/>Palette personnelle</div>
                  <div className="mt-2 grid grid-cols-5 gap-2">
                    {palette.map((c, i) => (
                      <input key={i} type="color" value={c}
                             onChange={(e) => setPalette(p => { const a=[...p]; a[i]=e.target.value; return a; })}
                             className="w-full h-8 rounded"/>
                    ))}
                  </div>
                </div>

                {/* #13 Haptique */}
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm"><Gamepad2 size={16} className="inline mr-2"/>Vibrations haptiques</div>
                    <button onClick={() => setHapticsEnabled(v => !v)} className="px-2 py-1 text-xs rounded bg-white/10 border border-white/10">
                      {hapticsEnabled ? "On" : "Off"}
                    </button>
                  </div>
                  <div className="mt-2 text-[11px] text-gray-300">Vibre lors des interactions avec les poèmes.</div>
                </div>

                {/* #14 Nocturne adaptatif */}
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm"><Moon size={16} className="inline mr-2"/>Mode nocturne adaptatif</div>
                    <button onClick={() => setNocturneAuto(v => !v)} className="px-2 py-1 text-xs rounded bg-white/10 border border-white/10">
                      {nocturneAuto ? "Auto" : "Off"}
                    </button>
                  </div>
                  <div className="mt-2 text-[11px] text-gray-300">22h–6h: phosphorescent, animations ralenties, musique en sous-tonique.</div>
                </div>

                {/* #4 Mémoire des lectures */}
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="font-medium text-sm"><Map size={16} className="inline mr-2"/>Mémoire des lectures</div>
                  <div className="mt-2 text-[11px] text-gray-300 max-h-32 overflow-auto">
                    {Object.keys(readMemory).length === 0 ? (
                      <div className="text-gray-500">Aucune lecture enregistrée.</div>
                    ) : (
                      Object.entries(readMemory).map(([idx, arr]) => (
                        <div key={idx} className="mb-2">
                          <div className="text-white/90">{poems[idx].title} — {arr.length} lecture(s)</div>
                          <div className="text-gray-400">
                            {arr.slice(-3).map((m,i) => (
                              <div key={i}>• {new Date(m.date).toLocaleString("fr-FR")} — {m.season} — {m.hour}h</div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* #19 Poème fantôme — état */}
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="font-medium text-sm"><Sparkles size={16} className="inline mr-2"/>Poème fantôme</div>
                  <div className="mt-1 text-xs">
                    {ghostUnlocked ? (
                      <span className="text-emerald-300"><Unlock size={12} className="inline mr-1"/>Débloqué</span>
                    ) : (
                      <span className="text-yellow-300"><Lock size={12} className="inline mr-1"/>Conditions non atteintes</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contenu principal: Lecture sobre plein écran */}
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {/* Sidebar titres */}
          <div className="hidden md:block">
            <div className="space-y-2 max-h-[70vh] overflow-auto pr-2">
              {listWithGhost.map((p, i) => {
                const isActive = i === currentIndex;
                const reads = readMemory[i]?.length || 0;
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-full text-left p-3 rounded-lg border transition ${isActive ? "border-white/40 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{p.title}</div>
                      <div className="text-[10px] text-gray-400">{reads}×</div>
                    </div>
                    <div className="text-xs text-gray-300">{p.emotion}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Poème */}
          <div className="md:col-span-2">
            <div
              className="relative rounded-2xl border border-white/10 p-6 md:p-10 min-h-[60vh] overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${palette[0]}22, ${palette[1]}22, ${palette[2]}22)`,
                filter: `blur(${wearBlur}px)`,
                opacity: wearOpacity
              }}
              onClick={() => vibrate([15])}
            >
              {/* titre + badge */}
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl md:text-4xl font-serif">{current.title}</h2>
                  {dailyIndex === currentIndex && (
                    <div className="px-2 py-1 rounded bg-white/10 border border-white/10 text-[10px]">Poème du jour</div>
                  )}
                </div>
                <div className="text-xs md:text-sm text-gray-300 italic">{current.emotion} • Intensité {current.intensity}%</div>
              </div>

              {/* texte */}
              <div className="relative z-10 mt-6 text-base md:text-xl leading-relaxed whitespace-pre-line font-serif">
                {/* entropie avec pin des lignes */}
                {displayText.split("\n").map((line, idx) => {
                  const pinned = (pinnedLines[currentIndex] || []).includes(idx);
                  return (
                    <div key={idx} className="group flex items-start gap-2">
                      {entropyMode && (
                        <button
                          onClick={() => pinLine(currentIndex, idx)}
                          className={`mt-1 shrink-0 w-4 h-4 rounded border ${pinned ? "bg-emerald-400/60 border-emerald-300" : "bg-white/5 border-white/20"} opacity-60 group-hover:opacity-100`}
                          title={pinned ? "Désépingler" : "Épingler"}
                        />
                      )}
                      <p className="flex-1">{line}</p>
                    </div>
                  );
                })}
              </div>

              {/* Échos de lecture (mots tombants) */}
              {echoesEnabled && (
                <div className="pointer-events-none absolute inset-0">
                  {fallingWords.map((w, i) => {
                    const left = `${Math.random() * 90 + 5}%`;
                    const duration = 8 + Math.random() * 8;
                    const delay = Math.random() * 6;
                    return (
                      <motion.button
                        key={`${w}-${i}`}
                        className="pointer-events-auto absolute text-xs md:text-sm px-2 py-1 rounded-full bg-black/50 border border-white/10"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: "110%", opacity: [0,1,1,0] }}
                        transition={{ duration, delay, ease: "linear" }}
                        style={{ left }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const msg = prompt("Micro-réflexion (5–10 mots max):\n“ce mot m’a fait penser à…”");
                          if (msg) addEcho(w, msg);
                        }}
                        title="Ajouter un écho"
                      >
                        {w}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* Liseré bas: échos existants sur mot ciblé */}
              {echoesEnabled && (
                <div className="relative z-10 mt-6 p-3 rounded bg-black/30 border border-white/10">
                  <div className="text-[11px] text-gray-300">Échos récents</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {Object.entries(echoStore).slice(-8).map(([word, arr]) => (
                      <div key={word} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">
                        <span className="text-white/90">{word}:</span> <span className="text-gray-300">{arr[arr.length-1]}</span>
                      </div>
                    ))}
                    {Object.keys(echoStore).length === 0 && (
                      <div className="text-xs text-gray-500">Aucun écho pour l’instant.</div>
                    )}
                  </div>
                </div>
              )}

              {/* Contrôles bas */}
              <div className="relative z-10 mt-6 flex items-center justify-between">
                <button onClick={prev} className="px-4 py-2 rounded bg-white/10 border border-white/10">← Précédent</button>
                <div className="flex items-center gap-3">
                  <button onClick={() => setModesOpen(v => !v)} className="px-3 py-2 rounded bg-white/10 border border-white/10">Modes</button>
                  <button onClick={() => setCurrentIndex(dailyIndex ?? 0)} className="px-3 py-2 rounded bg-white/10 border border-white/10">Aller au poème du jour</button>
                </div>
                <button onClick={next} className="px-4 py-2 rounded bg-white/10 border border-white/10">Suivant →</button>
              </div>
            </div>

            {/* Remixes list */}
            {showRemix && remixes.length > 0 && (
              <div className="mt-4 p-3 rounded-xl border border-white/10 bg-black/40">
                <div className="text-sm font-medium mb-2">Remixes récents</div>
                <div className="space-y-2 text-xs">
                  {remixes.slice(-8).reverse().map(r => (
                    <div key={r.id} className="p-2 rounded bg-white/5 border border-white/10">
                      <div className="text-white/90">“{r.line}”</div>
                      <div className="text-gray-400">de {poems[r.srcIndex]?.title} → {poems[r.dstIndex]?.title} • {new Date(r.date).toLocaleString("fr-FR")}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer minimal */}
        <div className="mt-8 text-center text-xs text-gray-400">
          React • Tone.js • Framer Motion • localStorage — Phase 1 Standalone
        </div>
      </div>
    </div>
  );
}

/* ---------- Composants auxiliaires ---------- */
function RemixPanel({ poems, remixes, onAdd }) {
  const [src, setSrc] = useState(0);
  const [dst, setDst] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);

  const srcLines = poems[src].text.split("\n").filter(Boolean);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <div className="text-gray-300 mb-1">Source</div>
          <select value={src} onChange={(e)=>setSrc(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded p-1">
            {poems.map((p,i)=> <option key={i} value={i}>{p.title}</option>)}
          </select>
        </div>
        <div>
          <div className="text-gray-300 mb-1">Destination</div>
          <select value={dst} onChange={(e)=>setDst(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded p-1">
            {poems.map((p,i)=> <option key={i} value={i}>{p.title}</option>)}
          </select>
        </div>
        <div>
          <div className="text-gray-300 mb-1">Ligne</div>
          <select value={lineIdx} onChange={(e)=>setLineIdx(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded p-1">
            {srcLines.map((l, i)=> <option key={i} value={i}>{trimLine(l)}</option>)}
          </select>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={()=> onAdd(src, dst, srcLines[lineIdx])}
          className="px-3 py-1 rounded bg-white/10 border border-white/10 text-xs"
        >
          Prélever → Glisser
        </button>
      </div>
      {remixes.length > 0 && (
        <div className="text-[10px] text-gray-400">
          {remixes.length} remix{remixes.length>1?"s":""} enregistré{remixes.length>1?"s":""} en local
        </div>
      )}
    </div>
  );
}

function MessageIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" className="inline mr-2"><path fill="currentColor" d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2"/></svg>;
}

function trimLine(s, n=36) {
  const t = s.trim();
  return t.length <= n ? t : t.slice(0,n-1)+"…";
}