# JSFuck Compiler / Deno

# Demo

```sh
git clone git@github.com:akcyp/jsfuck-deno.git
deno task demo
```

## Usage

```ts
import { JSF } from 'https://github.com/akcyp/jsfuck-deno/raw/main/main.ts';
const code = JSF.parse('console.log("Hello world!")');
console.log(code); // "[][[[[][![]]+[]][+[]][+[!+[]+!+[]+!+[]+!+[]][+[]]]+[[][![]]+[]][+[]][+[!+[]+!+[]+!+[]+!+[]+! (...)"
eval(code); // Hello world!
```
