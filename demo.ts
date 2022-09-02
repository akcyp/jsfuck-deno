import * as path from 'https://deno.land/std@0.154.0/path/mod.ts';
import { JSF } from './main.ts';

const [filename] = Deno.args;
const fileExtension = path.extname(filename);
const code = await Deno.readTextFile(filename);

const jsfFileName = filename.replace(new RegExp(`${fileExtension}$`), `.jsfuck${fileExtension}`);
const jsfCode = JSF.parse(code);

await Deno.writeTextFile(jsfFileName, jsfCode);
console.log(eval(jsfCode));
