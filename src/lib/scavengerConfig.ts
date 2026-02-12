export interface ScavengerStep {
  /** The question prompt shown to the user */
  prompt: string;
  /** The answer that will be checked (case-insensitive, trimmed) */
  answer: string;
  /** Image filenames (located in `/public`) that become visible when this step is answered correctly */
  images: string[];
}

/**
 * Configure your scavenger hunt here. Update the prompt, answer and associated
 * images. Images should live in the `/public` folder. You can add more than one
 * image per step – they will join the collage once the corresponding question
 * is solved.
 */
export const scavengerSteps: ScavengerStep[] = [
  {
    prompt: "Here's some new breaking news...<br>I MISS YOU 💛<br>It's been too long since I've seen you.<br>When was the last time I saw you again?",
    answer: "2025-12-02",
    images: ["img_1.png", "img_9.png", "img_12.png", "img_22.png"],
  },
  {
    prompt: "Too long ago 😭<br>I'm so glad I get to see you so soon!<br>Can't wait for you to run into my arms on...?",
    answer: "2026-02-26",
    images: ["img_3.png", "img_6.png", "img_13.png", "img_24.png"],
  },
  {
    prompt: "I really wish we could celebreate everything together.<br>It really that our first ___ is going to spent apart from each other.",
    answer: "2026-02-14",
    images: ["img_5.png", "img_23.png", "img_11.png", "img_19.png"],
  },
  {
    prompt: "I'm asking you for too many dates?<br>Can I ask for one more? 🙃💛",
    answer: "",
    images: ["img_2.png", "img_14.png", "img_18.png", "img_20.png"],
  },
];

export const finalPrompt =
  "Will you be my valentine?";

/** Default placeholder date for all date inputs. Format: YYYY-MM-DD */
export const defaultPlaceholderDate = "2026-02-14";

/**
 * Correct answer for the home page date question ("When did you meet him?").
 * Format: YYYY-MM-DD (e.g. "2024-03-15")
 */
export const homeDateAnswer = "2024-11-09";

/**
 * Correct answer for the joke question ("Nothing's different tonight? What song is that?").
 * Case-insensitive. Edit this to match the song title or key lyric.
 */
export const jokeQuestionAnswer = "breaking news";
