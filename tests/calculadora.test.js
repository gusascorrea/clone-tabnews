const calculadora = require("../models/calculadora.js");

test("somar 2 + 2 devria retornar 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});
