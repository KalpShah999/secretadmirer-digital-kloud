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
    prompt: "Question 1: What is the capital of France?",
    answer: "i like you",
    images: ["img_1.png", "img_9.png", "img_12.png", "img_22.png"],
  },
  {
    prompt: "Under the night sky,<br>no constellations in view,<br>but we sat for hours.",
    answer: "i live you",
    images: ["img_3.png", "img_6.png", "img_13.png", "img_24.png"],
  },
  {
    prompt: "You are my sunshine,<br>that shines on me every day,<br>and makes me smile.",
    answer: "light",
    images: ["img_5.png", "img_23.png", "img_11.png", "img_19.png"],
  },
  {
    prompt: "Question 4: What language is primarily used for styling web pages?",
    answer: "will you be mine?",
    images: ["img_2.png", "img_14.png", "img_18.png", "img_20.png"],
  },
  {
    prompt: "Question 5: What year did the first man land on the moon?",
    answer: "1969",
    images: ["img_4.png", "img_21.png", "img_7.png", "img_16.png"],
  },
  {
    prompt: "Question 6: Which element has the chemical symbol 'O'?",
    answer: "oxygen",
    images: ["img_10.png", "img_15.png", "img_17.png", "img_8.png"],
  },
];

export const finalPrompt =
  "The time capsule locked,<br>the day she became my girl,<br>and mine forever.";
