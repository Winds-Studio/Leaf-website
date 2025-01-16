import * as fs from "fs";
import * as yaml from "yaml";
import { createMarkdownRenderer } from "vitepress";
import config from "../../.vitepress/config.mts";

// noinspection JSUnusedGlobalSymbols
export default {
  async load() {
    const raw = yaml.parse(
      fs.readFileSync("./docs/config-spec/leaf/en.yml", "utf-8")
    );
    const md = await createMarkdownRenderer(config.srcDir, config.markdown);

    function render(x: any): any {
      for (const key in x) {
        if (typeof x[key] == "object") {
          x[key] = render(x[key]);
        } else {
          if (key == "content" || key == "description") {
            x[key] = md.render(x[key]);
          }
        }
      }
      return x;
    }

    return render(raw);
  },
};
