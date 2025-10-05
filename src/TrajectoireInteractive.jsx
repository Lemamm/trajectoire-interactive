import React, { useEffect, useMemo, useRef, useState } from "react";
import * as Tone from "tone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2, VolumeX, Settings, Compass, Moon, Palette, Scissors, Map, Sparkles, Wand2, Gamepad2, Clock, Lock, Unlock, Sun, Heart, Coffee, Feather, Droplets, Eye 
} from "lucide-react";

/* ---------- POEMS ---------- */

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

const ghostPoem = {
    title: "Poème fantôme",
    text:`Que la lune t'apaise
Là-bas, la brume qui appelle,
Il y a un fossé entre nous, je le traverse.
Tu es l'encre de mon stylo,
Le sang dans mes veines,
Tu es ma bouteille quand je n'ai plus d'eau,
Celle dans laquelle je me baigne.
Quand tu es là il fait si beau,
Tu fais de l'été une saison éternelle.
Sur mon clavier je me casse les os,
Pour en chœur, t'écrire des poèmes.
J'arpente les mers comme un matelot,
Vingt berges qu'elle est belle ma bohème.
Un an que tes yeux me tiennent idiot,
Je t'aimerai au milieu des problèmes
Ou allongé sur un drap de roses,
Que l'amour nous soutienne,
Qu'il nous porte là où l'air est nouveau.
Que le soleil nous imprègne,
Nous réchauffe par la peau.
À l'abri dans des plaines
Pour échapper à la vie, ces fardeaux.
Je ramasserai chaque verbe à l'épuisette,
Pour toi, comme le plus doux des cadeaux,
Qu'ils te fassent vivre des rêves,
Tous plus moelleux et chauds,
J'en réciterai de mes lèvres
Le moindre de ces tableaux.`,
    emotion: "révélation",
    icon: Sparkles,
    intensity: 100
  }
/* ------------------- UTILITAIRES LOCALSTORAGE ------------------- */
const storage = {
  get: (k, fallback) => {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};
const LS_KEYS = {
  READ_MEMORY: "traj_read_memory_v1",
  DAILY_ASSIGN: "traj_daily_poem_v1",
  PALETTE: "traj_palette_v1",
  HAPTICS_ENABLED: "traj_haptics_enabled_v1",
  REMIXES: "traj_remixes_v1",
  ENTROPY_STATE: "traj_entropy_state_v1",
  PINNED_LINES: "traj_pinned_lines_v1",
  WEAR_LEVEL: "traj_wear_level_v1",
  ECHOS: "traj_echos_v1",
  GHOST_UNLOCK: "traj_ghost_unlock_v1"
};

/* ------------- BREATHING TEMPO --------------- */
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

/* ------------------ SHUFFLE POUR L'ENTROPIE -------------------- */
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

/* ------------- FONCTIONS POUR LES ECHOS ------------- */
const pickFallingWords = (text, limit = 8) => {
  if (!text) return [];
  const words = text
    .split(/\s+/)
    .map(w => w.replace(/[.,;:!?—–()"'«»]/g, ""))
    .filter(w => w.length > 2)
    .slice(0, 120);
  const unique = Array.from(new Set(words));
  const res = [];
  const n = Math.min(limit, unique.length);
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * unique.length);
    res.push(unique.splice(idx, 1)[0]);
  }
  return res;
};

/* ------------------ Boussole 3D --------------------- */
const Compass3D = ({ poems, onPick, palette, currentIndex }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const size = 320; 
  const radius = size * 0.39;
  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: size }}>
      <div
        className="relative"
        style={{
          width: size, height: size,
          background: "radial-gradient(ellipse 70% 45% at 50% 50%,rgba(255,255,255,0.18),rgba(168,85,247,0.11) 77%, transparent 100%)",
        }}
      >
        {poems.map((p, i) => {
          const angle = (i / poems.length) * 2 * Math.PI;
          const x = radius * Math.cos(angle) + size/2;
          const y = radius * Math.sin(angle) + size/2;
          const isActive = i === currentIndex;
          const isHovered = i === hoveredIndex;
          return (
            <button
              key={i}
              onClick={() => { onPick(i); setHoveredIndex(null); }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`absolute px-4 py-2 text-xs md:text-base font-medium rounded-xl shadow-lg 
                ${isActive ? "scale-110 z-10 ring-2 ring-purple-400" : ""} ${isHovered ? "scale-105 z-10" : ""}
                transition-transform duration-200`}
              style={{
                left: x,
                top: y,
                transform: "translate(-50%, -50%)",
                background: isActive
                  ? `linear-gradient(90deg, ${palette[1]}, ${palette[3]})`
                  : `linear-gradient(90deg, ${palette[0]}88, ${palette[2]}99)`,
                color: "#fff",
                border: isActive
                  ? `2px solid ${palette[4]}`
                  : "1px solid rgba(255,255,255,0.18)",
                boxShadow: isActive ? "0 4px 35px #6200ea33" : "0 2px 12px 0px #0002",
                cursor: "pointer",
                userSelect: "none",
                whiteSpace: "nowrap"
              }}
              title={p.title}
              aria-label={p.title}
            >
              {p.title.length > 18 ? p.title.slice(0, 17) + "…" : p.title}
            </button>
          );
        })}
        <div style={{
          position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
          width: 22, height: 22, borderRadius: 16, background: "#9f79ff", boxShadow: "0 0 16px #fff8",
          border: "2px solid #fff"
        }}></div>
      </div>
    </div>
  );
};

/* ---------- NOUVEAU : Composant PoemCard ---------- */
const PoemCard = ({ poem, index, isActive, onClick, palette, reads = 0, wear = 0 }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative w-full text-left p-4 rounded-xl overflow-hidden transition-all duration-300 ${
        isActive ? "ring-2 ring-offset-2" : ""
      }`}
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${palette[0]}88, ${palette[1]}66)`
          : `linear-gradient(135deg, ${palette[0]}33, ${palette[2]}22)`,
        ringColor: palette[4],
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <motion.div
        className="absolute top-2 right-2 px-2 py-1 rounded-full text-[10px] font-medium"
        style={{
          background: `${palette[3]}44`,
          color: palette[4],
          backdropFilter: "blur(8px)",
        }}
        whileHover={{ scale: 1.1 }}
      >
        {poem.emotion}
      </motion.div>

      <div className="flex items-center gap-3 mb-2">
        {poem.icon && (
          <motion.div
            className="p-2 rounded-lg"
            style={{ background: `${palette[1]}22` }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            {React.createElement(poem.icon, { size: 20, strokeWidth: 2 })}
          </motion.div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-base">{poem.title}</h3>
          <p className="text-xs opacity-70">
            {poem.text.split("\n")[0].slice(0, 50)}...
          </p>
        </div>
      </div>

      <div className="mt-3 h-1.5 rounded-full bg-white/20 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: palette[1] }}
          initial={{ width: 0 }}
          animate={{ width: `${poem.intensity}%` }}
          transition={{ duration: 0.8, delay: index * 0.05 }}
        />
      </div>

      <div className="mt-2 flex items-center gap-3 text-[10px] opacity-60">
        <span>📖 {reads} lectures</span>
        <span>🎵 {poem.soundscape?.notes?.length || 0} notes</span>
        {wear > 50 && <span>⏳ usé à {wear}%</span>}
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 40%, ${palette[4]}11 50%, transparent 60%)`,
          backgroundSize: "200% 200%",
        }}
        initial={{ backgroundPosition: "0% 0%" }}
        whileHover={{ backgroundPosition: "100% 100%" }}
        transition={{ duration: 0.8 }}
      />
    </motion.button>
  );
};

/* ---------- NOUVEAU : Grille de cartes ---------- */
const PoemCardGrid = ({ poems, currentIndex, onSelect, palette, readMemory, wearLevel }) => {
  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {poems.map((poem, i) => (
        <PoemCard
          key={i}
          poem={poem}
          index={i}
          isActive={i === currentIndex}
          onClick={() => onSelect(i)}
          palette={palette}
          reads={readMemory[i]?.length || 0}
          wear={wearLevel[i] || 0}
        />
      ))}
    </div>
  );
};

/* ---------------------- Composant principal --------------------- */
export default function TrajectoireInteractivePhase1() {
const [ghostUnlocked, setGhostUnlocked] = useState(storage.get(LS_KEYS.GHOST_UNLOCK, false));
const [currentIndex, setCurrentIndex] = useState(0);
const listWithGhost = useMemo(() => ghostUnlocked ? [...poems, ghostPoem] : poems, [ghostUnlocked]);
const current = listWithGhost[currentIndex];
  const [soundOn, setSoundOn] = useState(false);
  const synthRef = useRef(null);
  const reverbRef = useRef(null);
  const filterRef = useRef(null);
  const loopRef = useRef(null);
  const [audioReady, setAudioReady] = useState(false);
  const [modesOpen, setModesOpen] = useState(false);
  const [showCompass, setShowCompass] = useState(false);
  const [entropyMode, setEntropyMode] = useState(false);
  const [showRemix, setShowRemix] = useState(false);
  const [hapticsEnabled, setHapticsEnabled] = useState(storage.get(LS_KEYS.HAPTICS_ENABLED, true));
  const [palette, setPalette] = useState(storage.get(LS_KEYS.PALETTE, ["#8B5CF6", "#EC4899", "#22D3EE", "#F59E0B", "#10B981"]));
  const [echoesEnabled, setEchoesEnabled] = useState(true);
  const [agingEnabled, setAgingEnabled] = useState(true);
  const [nocturneAuto, setNocturneAuto] = useState(true);
  const [readMemory, setReadMemory] = useState(storage.get(LS_KEYS.READ_MEMORY, {}));
  const [wearLevel, setWearLevel] = useState(storage.get(LS_KEYS.WEAR_LEVEL, poems.map(() => 0)));
  const [entropyState, setEntropyState] = useState(storage.get(LS_KEYS.ENTROPY_STATE, poems.map(() => 0)));
  const [pinnedLines, setPinnedLines] = useState(storage.get(LS_KEYS.PINNED_LINES, {}));
  const [remixes, setRemixes] = useState(storage.get(LS_KEYS.REMIXES, []));
  const [echoDraft, setEchoDraft] = useState("");
  const [echoStore, setEchoStore] = useState(storage.get(LS_KEYS.ECHOS, {}));
  const [dailyIndex, setDailyIndex] = useState(null);
  const [echoesActive, setEchoesActive] = useState(false);
  const [echoTrigger, setEchoTrigger] = useState(0);
  const [showTitles, setShowTitles] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // NOUVEAU
  const bpm = useBreathingTempo({ enabled: soundOn, baseBpm: 80 });

  const triggerEchoes = () => {
    setEchoesActive(true);
    setEchoTrigger(prev => prev + 1);
    setTimeout(() => setEchoesActive(false), 12000);
  };

  /* ---------- PERSISTANCE ---------- */
  useEffect(() => { storage.set(LS_KEYS.HAPTICS_ENABLED, hapticsEnabled); }, [hapticsEnabled]);
  useEffect(() => { storage.set(LS_KEYS.PALETTE, palette); }, [palette]);
  useEffect(() => { storage.set(LS_KEYS.READ_MEMORY, readMemory); }, [readMemory]);
  useEffect(() => { storage.set(LS_KEYS.WEAR_LEVEL, wearLevel); }, [wearLevel]);
  useEffect(() => { storage.set(LS_KEYS.ENTROPY_STATE, entropyState); }, [entropyState]);
  useEffect(() => { storage.set(LS_KEYS.PINNED_LINES, pinnedLines); }, [pinnedLines]);
  useEffect(() => { storage.set(LS_KEYS.REMIXES, remixes); }, [remixes]);
  useEffect(() => { storage.set(LS_KEYS.ECHOS, echoStore); }, [echoStore]);
  useEffect(() => { storage.set(LS_KEYS.GHOST_UNLOCK, ghostUnlocked); }, [ghostUnlocked]);

  /* ---------- AUDIO ---------- */
  useEffect(() => {
    if (!soundOn || !audioReady) return;
    if (loopRef.current) { loopRef.current.stop(); loopRef.current.dispose(); loopRef.current = null; }
    if (reverbRef.current) { reverbRef.current.decay = (current.soundscape?.reverb || 0.5) * 5; reverbRef.current.wet.value = current.soundscape?.reverb ?? 0.5; }
    if (filterRef.current) { filterRef.current.frequency.rampTo(current.soundscape?.filter ?? 2000, 0.5); }
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

  /* ---------- MEMOIRE & VIEILLISSEMENT ---------- */
  useEffect(() => {
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
    setWearLevel(prev => {
      const clone = [...prev];
      clone[currentIndex] = Math.min(100, (clone[currentIndex] || 0) + 2);
      return clone;
    });
  }, [currentIndex]);

  /* ---------- POEME DU JOUR ---------- */
  useEffect(() => {
    const assign = storage.get(LS_KEYS.DAILY_ASSIGN, {});
    const key = new Date().toISOString().slice(0,10);
    if (assign[key] == null) {
      const d = new Date();
      const doy = Math.floor((d - new Date(d.getFullYear(),0,0)) / 86400000);
      const seed = (doy * 37 + d.getFullYear()) % poems.length;
      assign[key] = seed;
      storage.set(LS_KEYS.DAILY_ASSIGN, assign);
    }
    setDailyIndex(assign[key]);
  }, []);

  /* ---------- NOCTURNE ---------- */
  const isNight = useMemo(() => {
    if (!nocturneAuto) return false;
    const h = new Date().getHours();
    return h >= 22 || h < 6;
  }, [nocturneAuto]);

  /* ---------- ECHOS ---------- */
  const fallingWords = useMemo(
    () => (current?.text ? pickFallingWords(current.text, 8) : []),
    [current, currentIndex, echoTrigger]
  );

  const addEcho = (word, text) => {
    const micro = text.trim();
    if (micro.length < 3 || micro.length > 60) return;
    setEchoStore(prev => {
      const next = { ...prev };
      next[word] = [...(next[word] || []), micro].slice(-6);
      return next;
    });
    setEchoDraft("");
  };

  /* ---------- ENTROPIE ---------- */
  const pinLine = (poemIdx, lineIdx) => {
    setPinnedLines(prev => {
      const set = new Set(prev[poemIdx] || []);
      if (set.has(lineIdx)) set.delete(lineIdx); else set.add(lineIdx);
      return { ...prev, [poemIdx]: Array.from(set) };
    });
  };

  const displayText = useMemo(() => {
    if (!entropyMode) return current?.text;
    const lines = current?.text.split("\n");
    const pinned = new Set(pinnedLines[currentIndex] || []);
    const free = lines.map((line, idx) => (pinned.has(idx) ? line : line));
    const intensity = Math.min(0.35, (entropyState[currentIndex] || 0) / 100);
    const mixed = shuffleWords(free.join("\n"), intensity);
    return mixed;
  }, [entropyMode, currentIndex, current?.text, pinnedLines, entropyState]);

  const tickEntropy = (delta = 4) => {
    setEntropyState(prev => {
      const arr = [...prev];
      arr[currentIndex] = Math.min(100, (arr[currentIndex] || 0) + delta);
      return arr;
    });
  };

  /* ---------- REMIX ---------- */
  const addRemix = (srcIndex, dstIndex, line) => {
    if (!line || srcIndex == null || dstIndex == null) return;
    const entry = { id: Date.now(), srcIndex, dstIndex, line, date: new Date().toISOString() };
    setRemixes(prev => [...prev, entry]);
  };

  /* ---------- POEME FANTOME ---------- */
  useEffect(() => {
    const distinctRead = Object.keys(readMemory).length >= 5;
    const entropyAny = entropyState.some(v => v >= 20);
    const night = isNight;
    if (distinctRead && entropyAny && night) setGhostUnlocked(true);
  }, [readMemory, entropyState, isNight]);

  /* ---------- UI ---------- */
  return (
    <div className={`min-h-screen w-full ${isNight ? "bg-gradient-to-br from-slate-900 to-indigo-950" : "bg-gradient-to-br from-slate-700 via-slate-100 to-cyan-200"} text-gray-900`}>

      <div className="max-w-3xl mx-auto px-2 py-5 md:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-serif tracking-wide">TRAJECTOIRE</h1>
            <p className="text-xs md:text-sm text-gray-500">Recueil interactif — lecture mobile + ordinateur</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleSound} className={`px-3 py-2 rounded-lg border border-gray-300 ${soundOn ? "bg-green-600/20" : "bg-white/5"}`}>{soundOn ? <Volume2 size={18}/> : <VolumeX size={18}/>}</button>
            <button onClick={() => setModesOpen(v => !v)} className="px-3 py-2 rounded-lg border border-gray-300 bg-white/5"><Settings size={18}/></button>
          </div>
        </div>

        {/* Bannière contextuelle */}
        <div className="mt-1 flex flex-wrap gap-2 text-[11px] md:text-xs text-gray-700">
          {dailyIndex !== null &&
            <div className="px-2 py-1 rounded bg-white/25 border border-gray-300"><Clock className="inline mr-1" size={12}/> Poème du jour: {poems[dailyIndex].title}</div>}
          {isNight && (
            <div className="px-2 py-1 rounded bg-white/25 border border-gray-300"><Moon className="inline mr-1" size={12}/> Mode nocturne</div>
          )}
          {ghostUnlocked &&
            <div className="px-2 py-1 rounded bg-white/25 border border-gray-300"><Sparkles className="inline mr-1" size={12}/> Poème fantôme débloqué</div>}
        </div>

        {/* TITRES sur téléphone */}
        <div className="block md:hidden my-4">
          <button onClick={() => setShowTitles(prev => !prev)} className="w-full p-3 rounded-lg bg-white/20 border border-gray-300 text-left">
            <div className="flex items-center justify-between">
              <span>📖 {current ? current.title : "Aucun poème"}</span>
              <span className="text-xs">{showTitles ? "▲" : "▼"}</span>
            </div>
          </button>
          {showTitles && (
            <div className="mt-2 space-y-1 max-h-64 overflow-auto">
              {listWithGhost.map((p, i) => {
                const isActive = i === currentIndex;
                const reads = readMemory[i]?.length || 0;
                return (
                  <button
                    key={i}
                    onClick={() => { setCurrentIndex(i); setShowTitles(false); }}
                    className={`w-full text-left p-2 rounded ${isActive ? "bg-white/40" : "bg-white/20"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm">{p.title}</div>
                      <div className="text-xs text-gray-500">{reads}×</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* MODES PANEL */}
        <AnimatePresence>
          {modesOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-4 p-4 rounded-xl border border-gray-300 bg-white/70 shadow-lg text-gray-900">
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <div className="font-medium mb-2">Navigation</div>
                  - {showCompass &&
-   <Compass3D poems={poems} onPick={setCurrentIndex} palette={palette} currentIndex={currentIndex}/>}
+ {showCompass &&
+   <Compass3D poems={listWithGhost} onPick={setCurrentIndex} palette={palette} currentIndex={currentIndex}/>}

                  {/* NOUVEAU BOUTON */}
                  <button
                    onClick={() => setViewMode(v => v === "list" ? "cards" : "list")}
                    className="px-3 py-1 rounded bg-white border border-gray-300 flex items-center gap-2"
                  >
                    <Map size={16} />
                    {viewMode === "list" ? "Vue cartes" : "Vue liste"}
                  </button>
                </div>
                <div>
                  <div className="font-medium mb-2">Personnalisation</div>
                  <div className="flex gap-2 mt-1">
                    {palette.map((c, i) => (
                      <input key={i} type="color" value={c}
                        onChange={e => setPalette(p => { const a = [...p]; a[i] = e.target.value; return a; })}
                        className="w-8 h-8 border border-gray-300 rounded"
                      />
                    ))}
                  </div>
                  <div className="flex items-center mt-2 gap-3">
                    <span className="text-sm">Palette :</span>
                    {palette.map((c, i) => (
                      <span
                        key={i}
                        className="inline-block w-4 h-4 rounded-full"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTENU PRINCIPAL : GRILLE */}
        <div className="mt-5 grid md:grid-cols-3 gap-6">
          {/* SIDEBAR titres desktop - MODIFIÉ POUR INCLURE LES CARTES */}
          <div className="hidden md:block">
            {viewMode === "cards" ? (
              <div className="max-h-[70vh] overflow-auto pr-2">
                <PoemCardGrid
                  poems={listWithGhost}
                  currentIndex={currentIndex}
                  onSelect={setCurrentIndex}
                  palette={palette}
                  readMemory={readMemory}
                  wearLevel={wearLevel}
                />
              </div>
            ) : (
              <div className="space-y-2 max-h-[70vh] overflow-auto pr-2">
                {listWithGhost.map((p, i) => {
                  const isActive = i === currentIndex;
                  const reads = readMemory[i]?.length || 0;
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-full text-left p-3 rounded-lg ${isActive ? "bg-white/40" : "bg-white/20"}`}>
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{p.title}</div>
                        <div className="text-xs text-gray-500">{reads}×</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* CONTENU POEME PRINCIPAL */}
          <div className="md:col-span-2">
            <div
              className="relative rounded-2xl border border-gray-300 p-6 md:p-10 min-h-[60vh] overflow-hidden shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${palette[0]}44, ${palette[1]}66, ${palette[2]}44)`,
                transition: "filter 0.5s ease, opacity 0.5s ease"
              }}
            >
              <div className="relative z-10">
                {current ? (
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 flex items-center gap-2">
                    {current.icon && React.createElement(current.icon, { size: 22 })}
                    {current.title === "Poème fantôme" ? "l'encre de mes veines" : current.title}

                  </h2>
                ) : (
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-400 italic">
                    Aucun poème sélectionné
                  </h2>
                )}

                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="whitespace-pre-line font-serif text-base md:text-lg leading-relaxed"
                >
                  {displayText}
                </motion.div>

                {/* Actions sous le poème */}
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-700">
                  <button
                    onClick={() => tickEntropy(5)}
                    className="px-3 py-1 border border-gray-400 rounded-lg bg-white/20 hover:bg-white/40"
                  >
                    ✨ Entropie +
                  </button>
                  <button
                    onClick={() => pinLine(currentIndex, 0)}
                    className="px-3 py-1 border border-gray-400 rounded-lg bg-white/20 hover:bg-white/40"
                  >
                    📌 Épingler
                  </button>
                  <button
                    onClick={triggerEchoes}
                    className="px-3 py-1 border border-gray-400 rounded-lg bg-white/20 hover:bg-white/40"
                  >
                    💭 Échos
                  </button>
                </div>
              </div>

              {/* Effet visuel d'échos */}
              <AnimatePresence>
                {echoesActive && (
                  <motion.div
                    key={echoTrigger}
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                  >
                    {fallingWords.map((w, i) => (
                      <motion.span
                        key={i}
                        initial={{
                          opacity: 0,
                          y: -20,
                          x: Math.random() * window.innerWidth * 0.5,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          y: ["0%", "100%"],
                          x: Math.random() * window.innerWidth * 0.3,
                        }}
                        transition={{
                          duration: 6 + Math.random() * 4,
                          delay: Math.random() * 1.5,
                        }}
                        className="absolute text-white text-sm font-medium drop-shadow-lg"
                      >
                        {w}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-600">
          Version 1.0 — Trajectoire interactive © 2025  
        </div>
      </div>
    </div>
  );
}