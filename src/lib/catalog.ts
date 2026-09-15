import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import lifestyleGlow from "@/assets/lifestyle-glow.jpg";
import ritualBundle from "@/assets/ritual-bundle.jpg";

export type CatalogProduct = {
  slug: string;
  name: string;
  type: string;
  category: string;
  line: string;
  description: string;
  story: string[];
  benefits: string[];
  usage: string;
  ingredients: string;
  tags: string[];
  price: number;
  was?: number;
  badge?: string;
  image: string;
};

export const catalog: CatalogProduct[] = [
  {
    slug: "golden-turmeric",
    name: "Golden Turmeric",
    type: "Powder",
    category: "Powders",
    line: "Energise Your Day",
    description: "Stone-ground Lakadong turmeric with naturally rich curcumin and an earthy lift.",
    story: [
      "Grown on a single heritage farm in Meghalaya's Jaintia Hills, our Lakadong turmeric is dug by hand after a full nine-month cure in iron-rich soil. The rhizomes are boiled in spring water, sun-dried for fifteen days, then stone-ground at under 40°C so the volatile oils and curcumin stay intact.",
      "Every batch is assayed for a minimum of 7% curcumin — nearly triple the commodity grade — and packed in amber glass within 48 hours of milling.",
    ],
    benefits: ["Supports a healthy inflammatory response", "Naturally rich in curcumin (7%+ assayed)", "Aids digestion and liver function", "Earthy, smooth — never bitter"],
    usage: "Stir ½ tsp into warm milk, ghee or water each morning. A pinch of black pepper improves absorption.",
    ingredients: "100% single-origin Lakadong turmeric (Curcuma longa), stone-ground.",
    tags: ["Grounding", "Smooth", "Immunity"],
    price: 1240,
    was: 1640,
    badge: "−24%",
    image: p1,
  },
  {
    slug: "ashwagandha-vitality-oil",
    name: "Ashwagandha Vitality Oil",
    type: "Oil",
    category: "Tonics",
    line: "Deep Restoration",
    description: "A cold-pressed root infusion for quiet strength and restorative evenings.",
    story: [
      "Our ashwagandha roots come from rain-fed fields in Rajasthan, harvested only after the first winter frost when withanolide concentration peaks. The roots are slow-infused into cold-pressed sesame oil over a gentle wood fire for six hours, following the classical taila paka method.",
      "The result is a deep amber oil, standardised to 2.5% withanolides, that settles the nervous system and restores tired tissue.",
    ],
    benefits: ["Calms the nervous system", "Supports deep, restorative sleep", "Standardised withanolide content", "Classical taila paka preparation"],
    usage: "Warm a teaspoon between palms and massage into soles, shoulders or scalp before bed.",
    ingredients: "Cold-pressed sesame oil infused with Withania somnifera root. Nothing else.",
    tags: ["Calming", "Adaptogen", "Restorative"],
    price: 1890,
    was: 2490,
    badge: "−24%",
    image: p2,
  },
  {
    slug: "triphala-morning-premix",
    name: "Triphala Morning Premix",
    type: "Premix",
    category: "Premixes",
    line: "Pure · Balanced · Timeless",
    description: "A gentle three-fruit blend milled for daily digestive intelligence.",
    story: [
      "Amalaki, bibhitaki and haritaki — gathered wild from the lower Himalayas and the Western Ghats, dried in shade, and milled in the classical 1:1:1 ratio. We sieve three times for a silken texture that dissolves without grit.",
      "Taken at dawn, triphala tones the digestive tract gently rather than forcing it — a habit measured in decades, not days.",
    ],
    benefits: ["Gentle daily digestive tone", "Classical 1:1:1 fruit ratio", "Wild-harvested, shade-dried", "Triple-sieved, grit-free"],
    usage: "Whisk 1 tsp into warm water on an empty stomach, 20 minutes before breakfast.",
    ingredients: "Emblica officinalis, Terminalia bellirica, Terminalia chebula — equal parts, wild-harvested.",
    tags: ["Balanced", "Digestive", "Mindful"],
    price: 1460,
    was: 1990,
    badge: "−27%",
    image: p3,
  },
  {
    slug: "dawn-golden-latte",
    name: "Dawn Golden Latte",
    type: "Latte",
    category: "Premixes",
    line: "Gentle Energy",
    description: "Turmeric, ashwagandha and cinnamon whisked into a warm plant ritual.",
    story: [
      "A complete morning cup, pre-balanced: Lakadong turmeric, KSM-grade ashwagandha, Ceylon cinnamon, black pepper and a whisper of green cardamom. No sweeteners, no fillers, no milk solids — add your own plant milk and it froths like a café pour.",
      "We built this blend for people who want the ritual without the measuring spoons.",
    ],
    benefits: ["Gentle, caffeine-free morning energy", "Pre-balanced — just add milk", "Froths like a café latte", "No sweeteners or fillers"],
    usage: "Whisk 2 tsp into 200ml hot plant milk. Froth for 20 seconds. Best before 10am.",
    ingredients: "Turmeric, ashwagandha, Ceylon cinnamon, black pepper, green cardamom.",
    tags: ["Uplifting", "Energising", "Daily"],
    price: 980,
    badge: "New",
    image: ritualBundle,
  },
  {
    slug: "tulsi-amber-tonic",
    name: "Tulsi Amber Tonic",
    type: "Tonic",
    category: "Tonics",
    line: "Soft Comfort",
    description: "Holy basil steeped slowly for warmth, comfort and quiet moments.",
    story: [
      "Three tulsi varieties — rama, krishna and vana — grown in temple gardens outside Varanasi, picked at dawn while the aromatic oils peak. The leaves are steeped slowly in copper vessels and preserved in raw forest honey.",
      "An evening pour that softens the day: warming, faintly clove-like, and quietly clarifying.",
    ],
    benefits: ["Three tulsi varieties in one pour", "Traditionally used for respiratory ease", "Preserved in raw forest honey", "A calming evening ritual"],
    usage: "Two tablespoons in warm water after dinner, or sipped neat from a small cup.",
    ingredients: "Rama, krishna and vana tulsi, raw forest honey, spring water.",
    tags: ["Aromatic", "Warming", "Comforting"],
    price: 2210,
    was: 2890,
    badge: "−23%",
    image: p4,
  },
  {
    slug: "luminous-glow-blend",
    name: "Luminous Glow Blend",
    type: "Blend",
    category: "Powders",
    line: "Pure · Radiant · Timeless",
    description: "A thoughtful blend of amla, rose and moringa for a luminous daily ritual.",
    story: [
      "Amla from Pratapgarh orchards, damask rose petals from Pushkar, and moringa from our own Nilgiri plots — blended for skin that glows from the inside out. Naturally rich in vitamin C and plant antioxidants.",
      "The petals are stone-milled separately and folded in last, so the blend keeps its blush colour and floral top note.",
    ],
    benefits: ["Supports skin radiance and collagen", "Natural vitamin C from amla", "Antioxidant-rich rose and moringa", "Delicate floral finish"],
    usage: "Blend 1 tsp into smoothies, curd or warm water each morning.",
    ingredients: "Amla, damask rose petals, moringa leaf.",
    tags: ["Refined", "Radiant", "Mindful"],
    price: 1650,
    was: 2190,
    badge: "Best Seller",
    image: lifestyleGlow,
  },
  {
    slug: "moringa-greens-powder",
    name: "Moringa Greens Powder",
    type: "Powder",
    category: "Powders",
    line: "Daily Green Strength",
    description: "Shade-dried moringa leaf, milled within hours of harvest for a vivid green daily boost.",
    story: [
      "Moringa from red-soil plots in the Nilgiri foothills, cut young and shade-dried to protect its chlorophyll and iron. Most moringa is sun-bleached brown — ours stays vivid green because it never sees direct light after harvest.",
      "One spoon carries the mineral weight of a plate of greens.",
    ],
    benefits: ["Naturally rich in iron and calcium", "Vivid green — shade-dried, never bleached", "Milled within hours of harvest", "Clean, grassy taste"],
    usage: "Stir 1 tsp into water, juice or dal. Avoid boiling to preserve nutrients.",
    ingredients: "100% shade-dried moringa oleifera leaf.",
    tags: ["Mineral-rich", "Green", "Daily"],
    price: 1180,
    was: 1490,
    badge: "Best Seller",
    image: p1,
  },
  {
    slug: "brahmi-focus-gummies",
    name: "Brahmi Focus Gummies",
    type: "Gummies",
    category: "Gummies",
    line: "Clear, Quiet Focus",
    description: "Brahmi and gotu kola in a soft jaggery gummy — clarity without caffeine.",
    story: [
      "Brahmi (bacopa) is standardised to 20% bacosides, then blended with gotu kola and set in soft gummies sweetened only with jaggery and a touch of amla. No gelatine, no refined sugar, no synthetic colour.",
      "Two gummies mid-afternoon, when the mind starts to scatter.",
    ],
    benefits: ["Standardised 20% bacosides", "Supports memory and calm focus", "Jaggery-sweetened, gelatine-free", "No caffeine, no crash"],
    usage: "Chew 2 gummies in the early afternoon. Consistent daily use works best.",
    ingredients: "Brahmi extract (20% bacosides), gotu kola, jaggery, amla, pectin.",
    tags: ["Focus", "Clarity", "Caffeine-free"],
    price: 1690,
    was: 2190,
    badge: "New",
    image: p3,
  },
  {
    slug: "forest-honey-paste",
    name: "Forest Honey Paste",
    type: "Paste",
    category: "Pastes",
    line: "Wild Sweetness, Bottled",
    description: "Raw forest honey folded with crushed spices and nuts — a spoonable ritual paste.",
    story: [
      "Multiflora honey collected by tribal gatherers in the Western Ghats, never heated above hive temperature. We fold in stone-crushed almonds, saffron threads and a pinch of long pepper for warmth.",
      "Spread it, stir it, or eat it straight from the spoon — it replaces both jam and sugar.",
    ],
    benefits: ["Raw, never heated above 42°C", "Sustainably wild-collected", "Saffron and long-pepper warmth", "Replaces refined sugar"],
    usage: "One spoon on toast, in warm (not hot) milk, or straight from the jar.",
    ingredients: "Raw multiflora forest honey, almonds, saffron, long pepper.",
    tags: ["Raw", "Wild", "Warming"],
    price: 1340,
    was: 1690,
    badge: "−20%",
    image: p2,
  },
  {
    slug: "shatavari-bliss-tablets",
    name: "Shatavari Bliss Tablets",
    type: "Tablets",
    category: "Tablets",
    line: "Rooted Feminine Balance",
    description: "Cold-pressed shatavari root tablets for hormonal balance and deep nourishment.",
    story: [
      "Shatavari roots grown on a women-led cooperative farm in Gujarat, harvested at three years of age when shatavarin content peaks. The roots are cold-pressed into tablets with no binders, fillers or coating.",
      "A quiet daily support for hormonal rhythm, traditionally called the queen of herbs.",
    ],
    benefits: ["Supports hormonal balance", "Three-year roots, peak potency", "No binders or fillers", "Women-led cooperative sourcing"],
    usage: "Two tablets with warm water or milk after dinner.",
    ingredients: "100% cold-pressed shatavari (Asparagus racemosus) root.",
    tags: ["Balance", "Nourishing", "Daily"],
    price: 1990,
    was: 2590,
    badge: "−23%",
    image: p4,
  },
];

export function getProduct(slug: string) {
  return catalog.find((p) => p.slug === slug);
}
