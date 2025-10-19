import { streamRespond } from "../src/ai/streamRespond";

(async () => {
  for await (const chunk of streamRespond("Write a 1-sentence tagline for a furniture store.")) {
    process.stdout.write(chunk);
  }
  process.stdout.write("\n");
})();
