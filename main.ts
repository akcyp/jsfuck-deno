export class JSF {
  static parse(code: string) {
    const jsf = new JSF();
    return jsf.eval(jsf.word(code), {
      shallReturn: false,
    });
  }
  static Symbols = {
    NaN: '+[![]]',
    undefined: '[][![]]',
    true: '!![]',
    false: '![]',
    Infinity: '+(+!+[]+(!+[]+[])[!+[]+!+[]+!+[]]+[+!+[]]+[+[]]+[+[]]+[+[]])',
  };
  stringify(val: string): string {
    return `${val}+[]`;
  }
  brackets(val: string): string {
    return `[${val}][${this.number(0)}]`;
  }
  number(n: number): string {
    if (n < 0) return `-${this.brackets(this.number(-n))}`;
    if (n === 0) return '+[]';
    if (n < 10) return `+${this.brackets(Array.from({ length: n }, () => '!+[]').join('+'))}`;
    const strNum = this.brackets(
      [...n.toString()].map((char) => {
        return this.brackets(this.stringify(this.number(+char)));
      }).join('+'),
    );
    return `+${strNum}`;
  }
  index(arr: string, index: number): string {
    return `${this.brackets(arr)}[${this.number(index)}]`;
  }
  word(str: string): string {
    return this.brackets(str.split('').map(l => this.letter(l)).join('+'));
  } 
  letter(n: string): string {
    if ([...'0123456789'].includes(n)) {
      return this.brackets(this.stringify(this.number(+n)));
    }
    switch (n) {
      case '.': return this.index(this.stringify(`+${this.word('11e100')}`), 1);
      case '(': return this.index(this.stringify(this.extras('Array.prototype.find')), 13);
      case ')': return this.index(this.stringify(this.extras('Array.prototype.find')), 14);
      case '{': return this.index(this.stringify(this.extras('Array.prototype.find')), 16);
      case '}': return this.index(this.stringify(this.extras('Array.prototype.find')), 32);
      case '[': return this.index(this.stringify(this.extras('Array.prototype.find')), 18);
      case ']': return this.index(this.stringify(this.extras('Array.prototype.find')), 30);
      case ' ': return this.index(this.stringify(this.extras('Array.prototype.find')), 8);
      case 'a': return this.index(this.stringify(JSF.Symbols.NaN), 1);
      case 'b': return this.index(this.stringify(this.extras('Array.prototype.entries') + '()'), 2);
      case 'c': return this.index(this.stringify(this.extras('Array.prototype.find')), 3);
      case 'd': return this.index(this.stringify(JSF.Symbols.undefined), 2);
      case 'e': return this.index(this.stringify(JSF.Symbols.undefined), 3);
      case 'f': return this.index(this.stringify(JSF.Symbols.undefined), 4);
      case 'g': return this.index(this.stringify(this.extras('String')), 14);
      case 'h': return `${this.brackets(this.number(17))}[${this.word('toString')}](${this.number(36)})`;
      case 'i': return this.index(this.stringify(JSF.Symbols.undefined), 5);
      case 'j': return this.index(this.stringify(this.extras('Array.prototype.entries') + '()'), 3);
      case 'k': return `${this.brackets(this.number(20))}[${this.word('toString')}](${this.number(36)})`;
      case 'l': return this.index(this.stringify(JSF.Symbols.false), 2);
      case 'm': return this.index(this.stringify(this.extras('Number')), 11);
      case 'n': return this.index(this.stringify(JSF.Symbols.undefined), 1);
      case 'o': return this.index(this.stringify(this.extras('Array.prototype.find')), 27);
      case 'p': return `${this.brackets(this.number(25))}[${this.word('toString')}](${this.number(36)})`;
      case 'q': return `${this.brackets(this.number(26))}[${this.word('toString')}](${this.number(36)})`;
      case 'r': return this.index(this.stringify(JSF.Symbols.true), 1);
      case 's': return this.index(this.stringify(JSF.Symbols.false), 3);
      case 't': return this.index(this.stringify(JSF.Symbols.true), 0);
      case 'u': return this.index(this.stringify(JSF.Symbols.undefined), 0);
      case 'v': return this.index(this.stringify(this.extras('Array.prototype.find')), 23);
      case 'w': return `${this.brackets(this.number(32))}[${this.word('toString')}](${this.number(36)})`;
      case 'x': return `${this.brackets(this.number(33))}[${this.word('toString')}](${this.number(36)})`;
      case 'y': return this.index(this.stringify(this.brackets(JSF.Symbols.Infinity)), 7);
      case 'z': return `${this.brackets(this.number(35))}[${this.word('toString')}](${this.number(36)})`;
      case 'S': return this.index(this.stringify(this.extras('String')), 9);
      case 'C': return this.index(this.stringify(this.extras('RangeError')), 54);
    }
    return `${this.extras('String')}[${this.word('fromCharCode')}](${n.charCodeAt(0)})`;
  }
  extras(n: 'Array.prototype.find' | 'Array.prototype.entries' | 'String' | 'Number' | 'Function' | 'RangeError'): string {
    switch (n) {
      case 'Array.prototype.find': return `[][${this.word('find')}]`;
      case 'Array.prototype.entries': return `[][${this.word('entries')}]`;
      case 'String': return `${this.brackets('[]+[]')}[${this.word('constructor')}]`;
      case 'Number': return `${this.brackets(this.number(0))}[${this.word('constructor')}]`;
      case 'Function': return `${this.extras('Array.prototype.find')}[${this.word('constructor')}]`;
      case 'RangeError': return this.eval(this.word('try{String().normalize(false)}catch(f){return f}'), { shallReturn: false });
    }
  }
  eval(body: string, options: { shallReturn?: boolean, pureFn?: boolean } = {}) {
    const { shallReturn = true, pureFn = false } = options;
    return `${this.extras('Function')}(${shallReturn ? `${this.brackets(this.word('return '))}+` : ''}${this.brackets(body)})${pureFn ? '' : '()'}`;
  }
}
