import { Volume2, VolumeX, Settings, Compass, Moon, Palette, Scissors, Map, Sparkles, Wand2, Gamepad2, Clock, Lock, Unlock, Sun, Heart, Coffee, Feather, Droplets, Eye } from "lucide-react"
/* ---------- POEMS ---------- */

export const poems = [
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

export const ghostPoem = {
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