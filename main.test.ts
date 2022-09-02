import { assertEquals, assertInstanceOf } from "https://deno.land/std@0.152.0/testing/asserts.ts";
import { JSF } from './main.ts';

Deno.test('JSF numbers', () => {
  const jsf = new JSF();
  [0, 5, 23, -4, -12].forEach((val) => {
    assertEquals(eval(jsf.number(val)), val);
  });
});

Deno.test('JSF words', () => {
  const jsf = new JSF();
  assertEquals(eval(jsf.word('find')), 'find');
  assertEquals(eval(jsf.word('entries')), 'entries');
  assertEquals(eval(jsf.word('constructor')), 'constructor');
});

Deno.test('JSF extras', () => {
  const jsf = new JSF();
  assertEquals(eval(jsf.extras('Array.prototype.find')), Array.prototype.find);
  assertEquals(eval(jsf.extras('Array.prototype.entries')), Array.prototype.entries);
  assertEquals(eval(jsf.extras('String')), String);
  assertEquals(eval(jsf.extras('Number')), Number);
  assertEquals(eval(jsf.extras('Function')), Function);
  assertInstanceOf(eval(jsf.extras('RangeError')), RangeError);
});

Deno.test('JSF letters', () => {
  const jsf = new JSF();
  '0123456789.(){}[] abcdefghijklmnoprstuvqwxyzSC'.split('').forEach((val) => {
    assertEquals(eval(jsf.letter(val)), val);
  });
});

Deno.test('JSF letter - extra', () => {
  const jsf = new JSF();
  'ą$#^#ć'.split('').forEach((val) => {
    assertEquals(eval(jsf.letter(val)), val);
  });
});

Deno.test('JSF eval', () => {
  const jsf = new JSF();
  assertEquals(eval(jsf.eval('1 + 1')), 2);
});

