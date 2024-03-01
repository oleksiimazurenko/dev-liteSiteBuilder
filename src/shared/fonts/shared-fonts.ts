import { JetBrains_Mono, Poppins } from "next/font/google";
import localFont from "next/font/local";

export const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const bykyvedeLight = localFont({
  src: "./BukyvedeLight.ttf",
  display: "swap",
});
