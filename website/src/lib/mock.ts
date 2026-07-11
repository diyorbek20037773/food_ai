export type Restaurant = {
  id: string;
  name: string;
  dish: string;
  emoji: string;
  km: number;
  rating: number;
  priceFrom: number; // in thousands UZS
  waitMin: number;
  ready: boolean;
};

// Sample restaurants for the hero preview + /demo. Illustrative only.
export const RESTAURANTS: Restaurant[] = [
  {
    id: "r1",
    name: "Besh Qozon",
    dish: "Osh · Shashlik",
    emoji: "🍚",
    km: 1.2,
    rating: 4.8,
    priceFrom: 45,
    waitMin: 15,
    ready: true,
  },
  {
    id: "r2",
    name: "Choyxona №1",
    dish: "Milliy taomlar",
    emoji: "🍢",
    km: 0.8,
    rating: 4.7,
    priceFrom: 60,
    waitMin: 10,
    ready: true,
  },
  {
    id: "r3",
    name: "Afsona Grill",
    dish: "Kabob · Steyk",
    emoji: "🥩",
    km: 2.1,
    rating: 4.9,
    priceFrom: 90,
    waitMin: 20,
    ready: true,
  },
  {
    id: "r4",
    name: "Semurg Lounge",
    dish: "Romantik · Fyujn",
    emoji: "🕯️",
    km: 3.0,
    rating: 4.9,
    priceFrom: 120,
    waitMin: 25,
    ready: true,
  },
  {
    id: "r5",
    name: "Chorsu Osh Markazi",
    dish: "Tandir osh",
    emoji: "🍲",
    km: 1.6,
    rating: 4.6,
    priceFrom: 38,
    waitMin: 8,
    ready: true,
  },
];

/** Simple keyword → restaurant subset router for the demo chat. */
export function matchRestaurants(query: string): Restaurant[] {
  const q = query.toLowerCase();
  const romantic = /romantik|romantic|романт|свидан/.test(q);
  const cheap = /arzon|дешёв|дешев|cheap|budjet|бюджет|budget|200|tushlik|lunch|обед/.test(q);
  const plov = /osh|plov|плов|палов/.test(q);

  if (romantic) {
    return [RESTAURANTS[3], RESTAURANTS[2], RESTAURANTS[1]];
  }
  if (cheap) {
    return [RESTAURANTS[4], RESTAURANTS[0], RESTAURANTS[1]];
  }
  if (plov) {
    return [RESTAURANTS[0], RESTAURANTS[4], RESTAURANTS[1]];
  }
  return [RESTAURANTS[1], RESTAURANTS[0], RESTAURANTS[2]];
}
