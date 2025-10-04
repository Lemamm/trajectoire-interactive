import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowLeft,
  ArrowRight,
  Sun,
  Heart,
  Compass,
  Feather,
  Droplets,
  Coffee,
  Eye,
  Moon,
  Sparkles,
  Shuffle,
  Waves,
  MessageCircle
} from "lucide-react";

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

/* ---------- COMPONENT ---------- */
export default function TrajectoireInteractive() {
  // core states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  // emotionalPath stores visited poems (index + emotion + intensity)
  const [emotionalPath, setEmotionalPath] = useState([]);
  const [showPath, setShowPath] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showKeywords, setShowKeywords] = useState(false);
  const [readingMode, setReadingMode] = useState("linear"); // linear|semantic|poetic|visual|emotionalMap
  const [audioInitialized, setAudioInitialized] = useState(false);
  
  // NOUVEAU: état pour la pause en mode poétique
  const [poeticPaused, setPoeticPaused] = useState(false);

  // NOUVEAU: états pour les commentaires
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // selection used only by the emotional map bubble (keeps currentIndex for global)
  const [mapSelectedIndex, setMapSelectedIndex] = useState(null);

  // audio refs
  const synthRef = useRef(null);
  const reverbRef = useRef(null);
  const filterRef = useRef(null);
  const loopRef = useRef(null);

  const currentPoem = poems[currentIndex];
  const Icon = currentPoem.icon;

  /* ---------- AUDIO SETUP ---------- */
  const initAudio = async () => {
    if (!audioInitialized) {
      await Tone.start();
      reverbRef.current = new Tone.Reverb({
        decay: 4,
        wet: 0.5
      }).toDestination();

      filterRef.current = new Tone.Filter({
        type: 'lowpass',
        frequency: 2000,
        rolloff: -24
      }).connect(reverbRef.current);

      synthRef.current = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sine' },
        envelope: { attack: 1, decay: 0.5, sustain: 0.3, release: 2 },
        volume: -10
      }).connect(filterRef.current);

      setAudioInitialized(true);
    }
  };

  const stopSound = () => {
    if (loopRef.current) {
      loopRef.current.stop();
      loopRef.current.dispose();
      loopRef.current = null;
    }
    if (Tone.Transport.state === 'started') {
      Tone.Transport.stop();
    }
  };

  const playGenerativeSound = (soundscape) => {
    if (!synthRef.current || !soundEnabled) return;

    // stop previous
    if (loopRef.current) {
      loopRef.current.stop();
      loopRef.current.dispose();
    }

    // adjust reverb and filter
    if (reverbRef.current) {
      reverbRef.current.decay = (soundscape.reverb || 0.5) * 5;
      reverbRef.current.wet.value = soundscape.reverb ?? 0.5;
    }
    if (filterRef.current) {
      filterRef.current.frequency.rampTo(soundscape.filter ?? 2000, 0.5);
    }

    const pattern = soundscape.notes || ['C4', 'E4', 'G4'];
    let i = 0;
    loopRef.current = new Tone.Loop((time) => {
      synthRef.current.triggerAttackRelease(pattern[i % pattern.length], soundscape.rhythm || '4n', time);
      i++;
    }, soundscape.rhythm || '4n').start(0);

    // tempo adjustments depending on readingMode
    if (readingMode === "visual") {
      Tone.Transport.bpm.value = 40;
      if (reverbRef.current) reverbRef.current.wet.value = 0.9;
    } else if (readingMode === "poetic") {
      Tone.Transport.bpm.value = 60;
    } else if (readingMode === "emotionalMap") {
      Tone.Transport.bpm.value = 50;
    } else {
      Tone.Transport.bpm.value = 90;
    }

    Tone.Transport.start();
  };

  const toggleSound = async () => {
    if (!soundEnabled) {
      await initAudio();
      setSoundEnabled(true);
    } else {
      stopSound();
      setSoundEnabled(false);
    }
  };

  useEffect(() => {
    if (soundEnabled && audioInitialized) {
      playGenerativeSound(currentPoem.soundscape);
    }
    return () => {
      // keep sound when toggled off only
      // stopSound();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, soundEnabled, audioInitialized, readingMode]);

  /* ---------- EMOTIONAL PATH ---------- */
  useEffect(() => {
    if (isReading) {
      setEmotionalPath(prev => {
        // avoid duplicate consecutive indices
        if (prev.length > 0 && prev[prev.length - 1].index === currentIndex) return prev;
        return [...prev, {
          index: currentIndex,
          emotion: currentPoem.emotion,
          intensity: currentPoem.intensity
        }];
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isReading]);

  /* ---------- SEMANTIC NAV ---------- */
  const findSemanticNext = () => {
    const currentKeywords = new Set(currentPoem.keywords);
    const candidates = poems
      .map((poem, idx) => ({
        idx,
        similarity: poem.keywords.filter(k => currentKeywords.has(k)).length
      }))
      .filter(c => c.idx !== currentIndex && !emotionalPath.some(p => p.index === c.idx))
      .sort((a, b) => b.similarity - a.similarity);

    if (candidates.length > 0 && candidates[0].similarity > 0) {
      return candidates[0].idx;
    }

    const unread = poems.findIndex((_, idx) =>
      idx !== currentIndex && !emotionalPath.some(p => p.index === idx)
    );
    return unread !== -1 ? unread : null;
  };

  /* ---------- NAVIGATION ---------- */
  const nextPoem = () => {
    if (readingMode === 'semantic') {
      const nextIdx = findSemanticNext();
      if (nextIdx !== null) {
        setCurrentIndex(nextIdx);
        if (!isReading) setIsReading(true);
      }
    } else {
      setCurrentIndex((prev) => (prev + 1) % poems.length);
      setIsReading(true);
    }
  };

  const prevPoem = () => {
    if (readingMode === 'semantic' && emotionalPath.length > 1) {
      const prevIdx = emotionalPath[emotionalPath.length - 2].index;
      setEmotionalPath(prev => prev.slice(0, -1));
      setCurrentIndex(prevIdx);
    } else {
      setCurrentIndex((prev) => (prev - 1 + poems.length) % poems.length);
      setIsReading(true);
    }
  };

  const goToPoem = (index) => {
    setCurrentIndex(index);
    setIsReading(true);
  };

  const getSemanticConnections = () => {
    const currentKeywords = new Set(currentPoem.keywords);
    return poems.map((poem, idx) => ({
      idx,
      shared: poem.keywords.filter(k => currentKeywords.has(k))
    })).filter(c => c.shared.length > 0 && c.idx !== currentIndex);
  };

  /* ---------- POETIC AUTO-ADVANCE AVEC PAUSE DE 7 SECONDES ---------- */
  useEffect(() => {
    if (readingMode === "poetic" && !poeticPaused) {
      // Pause de 7 secondes après chaque poème avant de passer au suivant
      const timer = setTimeout(() => {
        setPoeticPaused(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % poems.length);
          setIsReading(true);
          setPoeticPaused(false);
        }, 7000); // 7 secondes de pause
      }, 12000); // Durée de lecture du poème
      
      return () => clearTimeout(timer);
    }
  }, [readingMode, currentIndex, poeticPaused]);

  /* ---------- COMMENTAIRES ---------- */
  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments(prev => [...prev, {
        id: Date.now(),
        poemIndex: currentIndex,
        poemTitle: currentPoem.title,
        text: newComment,
        timestamp: new Date().toLocaleString('fr-FR')
      }]);
      setNewComment("");
    }
  };

  const deleteComment = (id) => {
    setComments(prev => prev.filter(c => c.id !== id));
  };

  const currentPoemComments = comments.filter(c => c.poemIndex === currentIndex);

  /* ---------- RENDER ---------- */
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 md:p-8 space-y-4 md:space-y-8">
      {/* Adaptive background color (behind everything) */}
      <motion.div
        className={`fixed inset-0 -z-10 bg-gradient-to-br ${currentPoem.color}`}
        animate={{ opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-4xl md:text-7xl font-serif mb-2 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent animate-pulse">
            TRAJECTOIRE
          </h1>
          <p className="text-gray-400 text-xs md:text-sm mb-1">Maxime Estrade</p>
          <p className="text-purple-300 text-[10px] md:text-xs italic px-2">Recueil interactif • Musique générative • Navigation sémantique</p><div className="mt-4 md:mt-6 flex flex-wrap justify-center gap-2 md:gap-3">
            <button
              onClick={() => setShowPath(!showPath)}
              className="px-3 md:px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition-all text-xs md:text-sm flex items-center gap-2 backdrop-blur"
            >
              <Sparkles size={14} className="md:w-4 md:h-4" />
              <span className="hidden sm:inline">{showPath ? 'Cacher' : 'Voir'} la trajectoire</span>
              <span className="sm:hidden">{showPath ? 'Cacher' : 'Trajectoire'}</span>
            </button>

            <button
              onClick={toggleSound}
              className={`px-3 md:px-4 py-2 rounded-lg transition-all text-xs md:text-sm flex items-center gap-2 backdrop-blur ${
                soundEnabled
                  ? 'bg-green-600/30 hover:bg-green-600/50 shadow-lg shadow-green-500/20'
                  : 'bg-gray-600/30 hover:bg-gray-600/50'
              }`}
            >
              {soundEnabled ? <Volume2 size={14} className="md:w-4 md:h-4 animate-pulse" /> : <VolumeX size={14} className="md:w-4 md:h-4" />}
              <span className="hidden sm:inline">Musique {soundEnabled && '🎵'}</span>
              <span className="sm:hidden">{soundEnabled ? '🎵' : '🔇'}</span>
            </button>

            <button
              onClick={() => setReadingMode(readingMode === 'linear' ? 'semantic' : 'linear')}
              className={`px-3 md:px-4 py-2 rounded-lg transition-all text-xs md:text-sm flex items-center gap-2 backdrop-blur ${
                readingMode === 'semantic'
                  ? 'bg-blue-600/30 hover:bg-blue-600/50 shadow-lg shadow-blue-500/20'
                  : 'bg-gray-600/30 hover:bg-gray-600/50'
              }`}
            >
              <Shuffle size={14} className="md:w-4 md:h-4" />
              <span className="hidden sm:inline">{readingMode === 'linear' ? 'Linéaire' : 'Sémantique'}</span>
              <span className="sm:hidden">{readingMode === 'linear' ? '📖' : '🔀'}</span>
            </button>

            <button
              onClick={() => setShowKeywords(!showKeywords)}
              className="px-3 md:px-4 py-2 bg-indigo-600/30 hover:bg-indigo-600/50 rounded-lg transition-all text-xs md:text-sm backdrop-blur"
            >
              <span className="hidden sm:inline">{showKeywords ? 'Cacher' : 'Voir'} mots-clés</span>
              <span className="sm:hidden">{showKeywords ? '🏷️' : '🔖'}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="px-3 md:px-4 py-2 bg-pink-600/30 hover:bg-pink-600/50 rounded-lg transition-all text-xs md:text-sm backdrop-blur flex items-center gap-2"
            >
              <MessageCircle size={14} className="md:w-4 md:h-4" />
              <span className="hidden sm:inline">Commentaires</span>
              {currentPoemComments.length > 0 && (
                <span className="bg-pink-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {currentPoemComments.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Emotional Path Visualization */}
        {showPath && emotionalPath.length > 0 && (
          <div className="mb-4 md:mb-8 p-4 md:p-6 bg-black/40 rounded-xl backdrop-blur border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base md:text-xl text-purple-300 flex items-center gap-2">
                <Waves size={16} className="md:w-5 md:h-5" />
                <span className="hidden sm:inline">Votre parcours émotionnel</span>
                <span className="sm:inline md:hidden">Parcours</span>
              </h3>
              <div className="text-xs md:text-sm text-gray-400">
                {emotionalPath.length} poème{emotionalPath.length > 1 ? 's' : ''}
              </div>
            </div>
            <div className="flex items-end gap-1 md:gap-2 h-24 md:h-32 bg-black/20 rounded-lg p-2">
              {emotionalPath.map((point, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-gradient-to-t from-purple-500 via-pink-500 to-blue-400 rounded-t cursor-pointer hover:opacity-80 transition-all relative group"
                  style={{ height: `${point.intensity}%` }}
                  onClick={() => goToPoem(point.index)}
                >
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/90 px-2 md:px-3 py-1 md:py-2 rounded-lg text-[10px] md:text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl border border-purple-500/30">
                    <div className="font-semibold">{poems[point.index].title}</div>
                    <div className="text-purple-300">{point.emotion}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 md:mt-3 text-[10px] md:text-xs text-gray-400 text-center">
              {readingMode === 'semantic'
                ? '🔀 Navigation par associations thématiques'
                : '📖 Cliquez sur une barre pour revisiter'
              }
            </div>
          </div>
        )}

        {/* Semantic Connections */}
        {readingMode === 'semantic' && getSemanticConnections().length > 0 && (
          <div className="mb-4 md:mb-6 p-3 md:p-5 bg-blue-900/20 rounded-xl backdrop-blur border border-blue-500/20">
            <h4 className="text-xs md:text-sm text-blue-300 mb-2 md:mb-3 flex items-center gap-2">
              <Shuffle size={14} className="md:w-4 md:h-4" />
              <span className="hidden sm:inline">Connexions sémantiques depuis "{currentPoem.title}"</span>
              <span className="sm:inline md:hidden">Connexions</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {getSemanticConnections().map(conn => (
                <button
                  key={conn.idx}
                  onClick={() => goToPoem(conn.idx)}
                  className="px-2 md:px-3 py-1 md:py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg text-[10px] md:text-xs transition-all hover:scale-105 border border-blue-400/20"
                >
                  <div className="font-medium">{poems[conn.idx].title}</div>
                  <div className="text-blue-200 text-[9px] md:text-[10px] mt-0.5">
                    via: {conn.shared.join(', ')}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {/* Navigation Sidebar - Hidden on mobile in portrait */}
          <div className="hidden md:block md:col-span-1 space-y-2 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            {poems.map((poem, idx) => {
              const PoemIcon = poem.icon;
              const isRead = emotionalPath.some(p => p.index === idx);
              return (
                <button
                  key={idx}
                  onClick={() => goToPoem(idx)}
                  className={`w-full text-left p-3 rounded-lg transition-all relative overflow-hidden ${
                    currentIndex === idx
                      ? `bg-gradient-to-r ${poem.color} text-white shadow-2xl scale-105 border-2 border-white/30`
                      : isRead
                        ? 'bg-white/10 hover:bg-white/15 text-gray-200 border border-purple-500/20'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <PoemIcon size={20} className={currentIndex === idx ? 'animate-pulse' : ''} />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{poem.title}</div>
                      <div className="text-xs opacity-70">{poem.emotion}</div>
                    </div>
                    {isRead && (
                      <div className="w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-500/50"></div>
                    )}
                  </div>
                  {currentIndex === idx && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Poem Display */}
          <div className="col-span-full md:col-span-2">
            <div className={`bg-gradient-to-br ${currentPoem.color} p-4 md:p-8 rounded-2xl shadow-2xl min-h-[60vh] md:min-h-[70vh] flex flex-col justify-between relative overflow-hidden transition-all duration-500`}>
              {/* Animated Background Icon */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 animate-pulse">
                  <Icon size={200} className="md:w-[300px] md:h-[300px]" />
                </div>
              </div>

              {/* Sound Wave Visual */}
              {soundEnabled && (
                <div className="absolute top-2 right-2 md:top-4 md:right-4 flex gap-1 items-end h-6 md:h-8">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-0.5 md:w-1 bg-white/60 rounded-full animate-wave"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        height: `${40 + (i % 4) * 10}%`
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Indicateur de pause en mode poétique */}
              {readingMode === "poetic" && poeticPaused && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/20 z-30">
                  <p className="text-white text-sm md:text-base text-center">
                    ✨ Respiration poétique...
                  </p>
                  <div className="mt-2 flex justify-center gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="relative z-10">
                {/* AnimatePresence + global fade/title animate */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.9 }}
                  >
                    <motion.h2
                      key={currentPoem.title}
                      className="text-2xl md:text-4xl font-serif"
                      animate={{ scale: [0.98, 1.02, 0.98] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      {currentPoem.title}
                    </motion.h2>
                    <p className="text-xs md:text-sm opacity-90 italic mt-1">{currentPoem.emotion}</p>

                    {/* Keywords toggle */}
                    {showKeywords && (
                      <div className="mb-4 md:mb-6 flex flex-wrap gap-1.5 md:gap-2 mt-3">
                        {currentPoem.keywords.map((keyword, kidx) => (
                          <button
                            key={kidx}
                            onClick={() => {
                              const next = poems.findIndex(p => p.keywords.includes(keyword));
                              if (next !== -1) goToPoem(next);
                            }}
                            className="px-2 md:px-3 py-1 md:py-1.5 bg-black/30 backdrop-blur rounded-full text-[10px] md:text-xs font-medium border border-white/20 hover:bg-black/40 transition-all"
                          >
                            #{keyword}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Reading mode content */}
                    <div className="prose prose-invert prose-sm md:prose-lg max-w-none mt-4">
                      <div className="text-sm md:text-xl leading-relaxed whitespace-pre-line font-serif backdrop-blur-sm bg-black/10 p-4 md:p-6 rounded-lg">
                        {/* readingMode specific render */}
                        {readingMode === "linear" && (
                          <div>{currentPoem.text}</div>
                        )}

                        {readingMode === "semantic" && (
                          <div className="flex flex-wrap justify-center gap-2">
                            {currentPoem.keywords.map((word, i) => (
                              <motion.span
                                key={i}
                                onClick={() => {
                                  const next = poems.findIndex(p => p.keywords.includes(word));
                                  if (next !== -1) {
                                    setCurrentIndex(next);
                                    setIsReading(true);
                                  }
                                }}
                                className="px-2 md:px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white cursor-pointer hover:scale-110 transition-transform text-xs md:text-sm"
                                whileHover={{ scale: 1.1 }}
                              >
                                {word}
                              </motion.span>
                            ))}
                          </div>
                        )}

                        {readingMode === "poetic" && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                            {currentPoem.text.split("\n").map((line, i) => (
                              <motion.p key={i} animate={{ opacity: [0, 1], y: [10, 0] }} transition={{ delay: i * 1.1, duration: 0.9 }}>
                                {line}
                              </motion.p>
                            ))}
                          </motion.div>
                        )}

                        {readingMode === "visual" && (
                          <motion.div className="relative w-full flex flex-col items-center" animate={{ rotate: [0, 360] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
                            <Icon size={60} className="md:w-20 md:h-20 mb-4 md:mb-6 text-white opacity-90" />
                            <div className={`w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br ${currentPoem.color} blur-3xl opacity-70`} />
                          </motion.div>
                        )}

                        {readingMode === "emotionalMap" && (
                          <div className="text-center text-xs md:text-sm text-gray-200">
                            🌌 Ouvre la carte émotionnelle en bas pour explorer la constellation.
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              <div className="flex flex-col md:flex-row justify-between items-center mt-4 md:mt-8 relative z-10 gap-3 md:gap-0">
                <button
                  onClick={prevPoem}
                  disabled={readingMode === 'semantic' ? (emotionalPath.length <= 1) : false}
                  className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 bg-black/40 hover:bg-black/60 rounded-lg disabled:opacity-20 disabled:cursor-not-allowed transition-all backdrop-blur font-medium border border-white/10 text-xs md:text-base"
                >
                  ← {readingMode === 'semantic' ? 'Retour' : 'Précédent'}
                </button>

                <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-center">
                  <div className="text-center">
                    <div className="text-xs md:text-sm opacity-90 font-medium">
                      {readingMode === 'semantic'
                        ? `${emotionalPath.length} / ${poems.length} explorés`
                        : `${currentIndex + 1} / ${poems.length}`
                      }
                    </div>
                    {readingMode === 'semantic' && emotionalPath.length === poems.length && (
                      <div className="text-[10px] md:text-xs text-yellow-300 mt-1">✨ Recueil terminé !</div>
                    )}
                  </div>

                  {/* Mode selector quick */}
                  <div className="flex gap-1 md:gap-2">
                    {[
                      { id: "linear", label: "📖" },
                      { id: "semantic", label: "🔀" },
                      { id: "poetic", label: "🎙️" },
                      { id: "visual", label: "🖼️" },
                      { id: "emotionalMap", label: "🌌" },
                    ].map(m => (
                      <button
                        key={m.id}
                        onClick={() => setReadingMode(m.id)}
                        className={`px-2 md:px-3 py-1.5 md:py-2 rounded-lg transition-all text-sm md:text-base ${readingMode === m.id ? 'bg-white/20' : 'bg-black/20'}`}
                        title={m.id}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={nextPoem}
                  disabled={
                    (readingMode === 'linear' && currentIndex === poems.length - 1) ||
                    (readingMode === 'semantic' && emotionalPath.length === poems.length)
                  }
                  className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 bg-black/40 hover:bg-black/60 rounded-lg disabled:opacity-20 disabled:cursor-not-allowed transition-all backdrop-blur font-medium border border-white/10 text-xs md:text-base"
                >
                  {readingMode === 'semantic' ? 'Explorer' : 'Suivant'} →
                </button>
              </div>

              {/* Intensity meter */}
              <div className="mt-3 md:mt-4 relative z-10">
                <div className="flex justify-between items-center mb-1 md:mb-2">
                  <div className="text-[10px] md:text-xs opacity-70 font-medium">Intensité émotionnelle</div>
                  <div className="text-[10px] md:text-xs opacity-70 font-mono">{currentPoem.intensity}%</div>
                </div>
                <div className="w-full h-2 md:h-3 bg-black/40 rounded-full overflow-hidden backdrop-blur border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-white/60 to-white/90 transition-all duration-700 rounded-full shadow-lg"
                    style={{ width: `${currentPoem.intensity}%` }}
                  />
                </div>
              </div>
            </div>

            {/* NOUVEAU: Section Commentaires */}
            {showComments && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 md:mt-6 p-4 md:p-6 bg-black/40 rounded-xl backdrop-blur border border-pink-500/20"
              >
                <h3 className="text-base md:text-lg text-pink-300 mb-3 md:mb-4 flex items-center gap-2">
                  <MessageCircle size={18} className="md:w-5 md:h-5" />
                  Commentaires sur "{currentPoem.title}"
                </h3>

                {/* Liste des commentaires */}
                <div className="space-y-2 md:space-y-3 mb-4 max-h-48 md:max-h-64 overflow-y-auto custom-scrollbar">
                  {currentPoemComments.length === 0 ? (
                    <p className="text-xs md:text-sm text-gray-400 italic">Aucun commentaire pour ce poème. Soyez le premier à partager votre ressenti !</p>
                  ) : (
                    currentPoemComments.map(comment => (
                      <div key={comment.id} className="bg-black/30 p-3 md:p-4 rounded-lg border border-pink-500/10">
                        <p className="text-xs md:text-sm text-gray-200">{comment.text}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-[10px] md:text-xs text-gray-500">{comment.timestamp}</span>
                          <button
                            onClick={() => deleteComment(comment.id)}
                            className="text-[10px] md:text-xs text-red-400 hover:text-red-300 transition-colors"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Formulaire nouveau commentaire */}
                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                    placeholder="Partagez votre ressenti sur ce poème..."
                    className="flex-1 px-3 md:px-4 py-2 bg-black/50 border border-pink-500/30 rounded-lg text-white placeholder-gray-500 text-xs md:text-sm focus:outline-none focus:border-pink-500/60 transition-colors"
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="px-4 md:px-6 py-2 bg-pink-600/30 hover:bg-pink-600/50 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-all text-xs md:text-sm font-medium border border-pink-500/20"
                  >
                    Publier
                  </button>
                </div>
              </motion.div>
            )}
          
            {/* If emotionalMap mode is active, render the map below the card */}
            {readingMode === "emotionalMap" && (
              <div className="mt-4 md:mt-6 flex justify-center">
                <motion.div
                  className="relative w-full max-w-2xl h-[400px] md:h-[520px] bg-gradient-to-b from-black to-gray-900 rounded-3xl overflow-hidden border border-gray-700 shadow-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9 }}
                >
                  {/* optional slow rotation layer */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
                    style={{ opacity: 0.02 }}
                  />

                  {/* lines connecting similar intensity */}
                  <svg className="absolute inset-0 w-full h-full">
                    {poems.map((poemA, i) =>
                      poems.map((poemB, j) => {
                        if (i >= j) return null;
                        const intensityDiff = Math.abs(poemA.intensity - poemB.intensity);
                        if (intensityDiff < 25) {
                          const angleA = (i / poems.length) * 2 * Math.PI;
                          const angleB = (j / poems.length) * 2 * Math.PI;
                          const radius = window.innerWidth < 768 ? 120 : 180;
                          const centerX = window.innerWidth < 768 ? 200 : 360 / 2 + 40;
                          const centerY = window.innerWidth < 768 ? 200 : 520 / 2;
                          const x1 = centerX + radius * Math.cos(angleA);
                          const y1 = centerY + radius * Math.sin(angleA);
                          const x2 = centerX + radius * Math.cos(angleB);
                          const y2 = centerY + radius * Math.sin(angleB);
                          return (
                            <line
                              key={`${i}-${j}`}
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke="rgba(255,255,255,0.12)"
                              strokeWidth="1"
                            />
                          );
                        }
                        return null;
                      })
                    )}
                  </svg>

                  {/* points */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {poems.map((poem, i) => {
                      const angle = (i / poems.length) * 2 * Math.PI;
                      const radius = window.innerWidth < 768 ? 120 : 180;
                      const centerX = window.innerWidth < 768 ? 200 : 360 / 2 + 40;
                      const centerY = window.innerWidth < 768 ? 200 : 520 / 2;
                      const x = centerX + radius * Math.cos(angle);
                      const y = centerY + radius * Math.sin(angle);

                      return (
                        <motion.div
                          key={i}
                          onClick={() => {
                            setMapSelectedIndex(i);
                            setCurrentIndex(i);
                            setIsReading(true);
                          }}
                          className="absolute cursor-pointer flex flex-col items-center"
                          style={{
                            left: x,
                            top: y,
                            transform: "translate(-50%, -50%)",
                          }}
                          whileHover={{ scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <div
                            className={`w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br ${poem.color} shadow-lg ${mapSelectedIndex === i ? "ring-2 md:ring-4 ring-white/80" : ""}`}
                            title={`${poem.title} (${poem.emotion})`}
                          />
                          {mapSelectedIndex === i && (
                            <motion.div
                              className="absolute -top-8 md:-top-10 bg-gray-800 text-[10px] md:text-xs text-white px-2 md:px-3 py-1 rounded-full whitespace-nowrap"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4 }}
                            >
                              {poem.title}
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* bubble for selected */}
                  {mapSelectedIndex !== null && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="bg-black/85 backdrop-blur-xl border border-gray-700 p-4 md:p-6 rounded-3xl max-w-sm md:max-w-lg text-center text-white shadow-2xl">
                        <h3 className="text-base md:text-lg font-semibold mb-2">
                        {poems[mapSelectedIndex].title}</h3>
                        <p className="text-xs md:text-sm opacity-80 mb-3">{poems[mapSelectedIndex].emotion}</p>
                        <div className="text-gray-300 leading-relaxed text-xs md:text-sm whitespace-pre-line max-h-32 md:max-h-48 overflow-auto p-2 custom-scrollbar">
                          {poems[mapSelectedIndex].text}
                        </div>
                        <div className="flex justify-center gap-2 md:gap-3 mt-4">
                          <button
                            onClick={() => {
                              setMapSelectedIndex(null);
                            }}
                            className="px-3 md:px-4 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-xs text-gray-200"
                          >
                            Fermer
                          </button>
                          <button
                            onClick={() => {
                              setMapSelectedIndex(null);
                              setReadingMode('poetic');
                            }}
                            className="px-3 md:px-4 py-1 bg-purple-600 hover:bg-purple-500 rounded-full text-xs text-white"
                          >
                            Lire en poétique
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="absolute bottom-2 md:bottom-3 left-1/2 transform -translate-x-1/2 text-gray-400 text-[10px] md:text-sm">
                    Cliquer sur un point pour lire le poème
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Bar - Visible only on mobile */}
        <div className="md:hidden mt-4 bg-black/40 backdrop-blur rounded-xl p-3 border border-purple-500/20">
          <div className="text-xs text-purple-300 mb-2 text-center">Navigation rapide</div>
          <div className="grid grid-cols-5 gap-2 max-h-32 overflow-y-auto custom-scrollbar">
            {poems.map((poem, idx) => {
              const PoemIcon = poem.icon;
              const isRead = emotionalPath.some(p => p.index === idx);
              return (
                <button
                  key={idx}
                  onClick={() => goToPoem(idx)}
                  className={`p-2 rounded-lg transition-all relative ${
                    currentIndex === idx
                      ? `bg-gradient-to-r ${poem.color} shadow-lg`
                      : isRead
                        ? 'bg-white/10'
                        : 'bg-white/5'
                  }`}
                  title={poem.title}
                >
                  <PoemIcon size={16} className={currentIndex === idx ? 'animate-pulse' : ''} />
                  {isRead && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 md:mt-10 p-4 md:p-6 text-center text-gray-400 text-xs md:text-sm space-y-2 md:space-y-3 bg-black/20 rounded-xl backdrop-blur border border-purple-500/10">
          <p className="text-sm md:text-base text-purple-200">
            Un recueil qui trace une trajectoire émotionnelle de l'émerveillement à la lucidité
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-[10px] md:text-xs">
            {soundEnabled && (
              <p className="text-green-300 flex items-center gap-1 md:gap-2">
                🎵 Musique générative active
              </p>
            )}
            {readingMode === 'semantic' && (
              <p className="text-blue-300 flex items-center gap-1 md:gap-2">
                🔀 Navigation sémantique
              </p>
            )}
            {readingMode === 'poetic' && (
              <p className="text-purple-300 flex items-center gap-1 md:gap-2">
                🎙️ Mode poétique • Pause de 7s entre les poèmes
              </p>
            )}
          </div>
          <div className="pt-2 md:pt-3 border-t border-gray-700/50">
            <p className="text-[10px] md:text-xs text-gray-500">
              Recueil interactif • Technologies: React, Tone.js, Framer Motion
            </p>
          </div>
        </div>
      </div>

      {/* styles for small animations */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.8);
        }

        @media (min-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
        }

        @keyframes wave {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-wave {
          animation: wave 1s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}