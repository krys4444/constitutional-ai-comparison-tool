import { respond } from "../src/ai/respond";
import { SummarySchema } from "../src/ai/schemas";

(async () => {
  const json = await respond([
    { role: "user", content: "Give a title and 3 bullets about migrating to GPT-5." }
  ], { jsonSchema: SummarySchema });
  console.log(JSON.parse(json));
})();
