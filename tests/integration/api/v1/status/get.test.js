test("GET to api/v1/status should return 200 and database info", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  // Atualização deve existir e ser válida
  expect(responseBody.updated_at).toBeDefined();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  // Estrutura de dependências
  expect(responseBody.dependencies).toBeDefined();
  expect(responseBody.dependencies.database).toBeDefined();

  const db = responseBody.dependencies.database;

  // Valida tipo de dados retornados
  expect(typeof db.version).toBe("string");
  expect(typeof db.max_connections).toBe("number");
  expect(typeof db.used_connections).toBe("number");

  // Valores razoáveis
  expect(db.max_connections).toBeGreaterThan(0);
  expect(db.used_connections).toBeGreaterThanOrEqual(0);
  expect(db.used_connections).toBeLessThanOrEqual(db.max_connections);
  console.log(db);
});
