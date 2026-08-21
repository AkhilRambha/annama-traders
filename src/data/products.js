import pattu1 from "@/assets/sarees/pt1.jfif";
import pattu2 from "@/assets/sarees/pt2.jfif";
import pattu3 from "@/assets/sarees/pt3.jfif";
import pattu4 from "@/assets/sarees/pt4.jfif";
import pattu5 from "@/assets/sarees/pt5.jfif";
import pattu6 from "@/assets/sarees/pt6.jfif";

import silk1 from "@/assets/sarees/silk.jfif";
import silk2 from "@/assets/sarees/silk2.jfif";
import silk3 from "@/assets/sarees/silk4.jfif";
import silk4 from "@/assets/sarees/silk5.jfif";
import silk5 from "@/assets/sarees/silk6.jfif";

import kalam1 from "@/assets/sarees/kalam1.jfif";
import kalam2 from "@/assets/sarees/kalam2.jfif";
import kalam3 from "@/assets/sarees/kalm3.jfif";

export const CATEGORIES = [
  "Kanchi Pattu",
  "Banarasi Silk",
  "Kalamkari",
  "Soft Silk",
  "Designer Drapes",
  "Chanderi",
  "Mysore Silk",
  "Organza",
];

export const PRODUCTS = [
  {
    id: "saree-1",
    name: "Royal Crimson Kanchi Pattu",
    price: 15500,
    category: "Kanchi Pattu",
    image: pattu5,
    isNew: true,
    description: "An authentic, handwoven Kanchipuram silk saree featuring traditional gold zari work on a deep crimson base. Perfect for bridal wear and grand occasions.",
  },
  {
    id: "saree-2",
    name: "Midnight Blue Soft Silk",
    price: 6200,
    category: "Soft Silk",
    image: silk1,
    description: "Featherweight soft silk saree in a mesmerizing midnight blue with subtle silver motifs. Ideal for evening gatherings and graceful everyday wear.",
  },
  {
    id: "saree-3",
    name: "Hand-Painted Kalamkari Drape",
    price: 8500,
    category: "Kalamkari",
    image: kalam3,
    isFeatured: true,
    description: "A breathtaking piece of art you can wear. This saree features intricate, hand-painted mythological motifs using natural dyes on premium cotton silk.",
  },
  {
    id: "saree-4",
    name: "Emerald Green Traditional Pattu",
    price: 12800,
    category: "Kanchi Pattu",
    image: pattu3,
    description: "A classic emerald green Kanchi pattu adorned with a contrasting magenta border. A timeless addition to your heirloom collection.",
  },
  {
    id: "saree-5",
    name: "Golden Banarasi Tissue",
    price: 22000,
    category: "Banarasi Silk",
    image: silk2,
    isNew: true,
    description: "Exude sheer royalty in this golden Banarasi tissue saree, woven with fine metallic threads for a scintillating metallic sheen.",
  },
  {
    id: "saree-6",
    name: "Vintage Mustard Mysore Silk",
    price: 9400,
    category: "Mysore Silk",
    image: silk4,
    description: "Known for its minimalist elegance, this mustard yellow Mysore silk saree offers an unparalleled drape and a understated solid zari border.",
  },
  {
    id: "saree-7",
    name: "Contemporary Floral Organza",
    price: 7500,
    category: "Organza",
    image: pattu2,
    description: "Light, sheer, and romantic. This organza saree features delicate oversized floral prints, making it a stellar choice for daytime festivities.",
  },
  {
    id: "saree-8",
    name: "Peacock Blue Kalamkari Silk",
    price: 11000,
    category: "Kalamkari",
    image: kalam1,
    isFeatured: true,
    description: "Rich peacock blue silk acts as the canvas for this exquisite Kalamkari piece, blending vibrant tradition with luxurious texture.",
  },
  {
    id: "saree-9",
    name: "Ruby Red Bridal Silk",
    price: 18900,
    category: "Kanchi Pattu",
    image: pattu1,
    description: "The quintessential bridal saree. Heavy pure silk in ruby red, heavily embellished with golden pure zari brocade work.",
  },
  {
    id: "saree-10",
    name: "Ivory & Gold Chanderi",
    price: 5800,
    category: "Chanderi",
    image: silk3,
    description: "A delicate weave originating from Madhya Pradesh, this ivory Chanderi saree with gold coin motifs offers a breathable and sophisticated look.",
  },
  {
    id: "saree-11",
    name: "Pastel Pink Designer Drape",
    price: 14500,
    category: "Designer Drapes",
    image: kalam2,
    isNew: true,
    description: "A modern interpretation of the traditional drape, featuring scalloped edges, minimal embroidery, and a pre-stitched aesthetic.",
  },
  {
    id: "saree-12",
    name: "Magenta Grandeur Pattu",
    price: 16200,
    category: "Kanchi Pattu",
    image: pattu4,
    description: "A stunning magenta Kanchi pattu saree featuring a broad temple border and intricate rudraksha motifs across the body.",
  },
  {
    id: "saree-13",
    name: "Copper Zari Soft Silk",
    price: 6800,
    category: "Soft Silk",
    image: silk5,
    description: "A beautiful contemporary twist on soft silk, utilizing copper zari instead of traditional gold for a warm, muted elegance.",
  },
  {
    id: "saree-14",
    name: "Lavender Silver Banarasi",
    price: 15500,
    category: "Banarasi Silk",
    image: pattu6,
    isFeatured: true,
    description: "A pastel lavender Banarasi silk heavily woven with silver zari jal work. A favorite among modern brides for its ethereal charm.",
  }
];

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};
