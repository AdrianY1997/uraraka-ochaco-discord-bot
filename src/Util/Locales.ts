import { readFileSync } from 'fs';
import { join } from 'path';

export const loc = {
    async __(phrase: string, lang: string, replace: any = {}) {
        const filePath: string = join(__dirname, "..", "Locales", `${lang}.lang.json`);
        const data: string = readFileSync(filePath, { encoding: "utf-8" })
        const formatedData = JSON.parse(data)

        const [cat, sub, phr] = phrase.split(".");

        let final: string = formatedData[cat][sub][phr];

        if (typeof final === "object") final = (final as Array<string>).join("\n")

        for (const key in replace) {
            final = final.replaceAll("{" + key + "}", replace[key]);
        }

        return final;
    }
}