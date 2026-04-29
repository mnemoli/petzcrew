import { parse } from 'csv-parse/sync'
import globSync from "fast-glob";
import { HtmlBasePlugin } from "@11ty/eleventy";

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.addPassthroughCopy("img")
  eleventyConfig.addPassthroughCopy("categories", {
    filter: ["{catz,dogz,hexes,crew}/pix/*.png"],
    rename: function(filePath) {
      return filePath.split('-', 1)[0]+".png";
    }
});
  eleventyConfig.addPassthroughCopy("categories/stamps/**/*.{png,gif,jpg,jpeg}");
  eleventyConfig.addDataExtension("csv", (contents, filePath) => {
    const records = parse(contents, { columns: true, skip_empty_lines: true });
    return {
      "petz": records
    }
  });
  eleventyConfig.addCollection("stamps", function (collectionApi) {
    return globSync(["categories/stamps/*.{png,gif,jpg,jpeg}"]);
  })
  eleventyConfig.addCollection("bigstamps", function (collectionApi) {
    return globSync(["categories/stamps/bigstamps/*.{png,gif,jpg,jpeg}"]);
  })
  eleventyConfig.addGlobalData("layout", "citrus.liquid");


  eleventyConfig.addGlobalData("personalityEmojis", {
    Liveliness: ["💃", " 🦥"],
    Playfulness: ["🎲", "📖"],
    Independence: ["🧊", "🫂"],
    Confidence: ["😎", "🫣"],
    Naughtiness: ["😈", ""],
    Acrobaticness: ["🦘", "🤕"],
    Patience: ["⌛", "⏱️"],
    Kindness: ["😊", "😡"],
    Nurturing: ["👶", "🙅"],
    Finickiness: ["🐩", ""],
    Intelligence: ["🤓", "🪿"],
    Messiness: ["🫟", ""],
    Quirkiness: ["❓", ""],
    Insanity: ["🤪", ""],
    Constitution: ["💪", "🥀"]
  });
  eleventyConfig.addGlobalData("favEmojis", {
    chicken: "🍗",
    beef: "🥩",
    fish: "🐟",
    turkey: "🦃",
    milk: "🥛",
    sweet: "🍬",
    catnip: "🌿",
    cheese: "🧀",
    plastic: "🥏",
    rubber: "⚽",
    soft: "🧸",
    bone: "🦴",
    wood: "🪵",
    metal: "🔧",
    water: "🌊",
    rock: "🪨",
    hairballfleaspray: "🤢",
    chemicals: "🧪",
    garbage: "🗑️",
    fleabottle: "🪲",
    plants: "🥬",
    healthy: "🍎"
  });
  eleventyConfig.addGlobalData('personalityKeys', [
    "Liveliness",
    "Playfulness",
    "Independence",
    "Confidence",
    "Naughtiness",
    "Acrobaticness",
    "Patience",
    "Kindness",
    "Nurturing",
    "Finickiness",
    "Intelligence",
    "Messiness",
    "Quirkiness",
    "Insanity",
    "Constitution"
    ]);
};