import { pipeline } from "@xenova/transformers";

class MyTranslationPipeline {
  static task = "translation";
  static model = "Xenova/nllb-200-distilled-600M";
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      try {
        this.instance = await pipeline(this.task, this.model, {
          progress_callback,
        });
      } catch (err) {
        // Send error message back to the main thread if model loading fails
        self.postMessage({
          status: "error",
          error: "Failed to load translation model. Please try again.",
        });
        throw new Error(err); // Stop execution if error occurs
      }
    }

    return this.instance;
  }
}

self.addEventListener("message", async (event) => {
  try {
    let translator = await MyTranslationPipeline.getInstance((x) => {
      self.postMessage(x);
    });

    console.log(event.data);
    let output = await translator(event.data.text, {
      tgt_lang: event.data.tgt_lang,
      src_lang: event.data.src_lang,

      callback_function: (x) => {
        self.postMessage({
          status: "update",
          output: translator.tokenizer.decode(x[0].output_token_ids, {
            skip_special_tokens: true,
          }),
        });
      },
    });

    self.postMessage({
      status: "complete",
      output,
    });
  } catch (err) {
    // Catch any error during processing
    console.error("Error in translation:", err);
    self.postMessage({
      status: "error",
      error: "An error occurred during translation. Please try again.",
    });
  }
});
