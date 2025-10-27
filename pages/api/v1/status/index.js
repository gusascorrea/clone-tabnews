import database from "../../../../infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const versionResult = await database.query("SHOW server_version;");
  const version = versionResult.rows[0].server_version;

  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const maxConnections = parseInt(
    maxConnectionsResult.rows[0].max_connections,
    10,
  );

  const usedConnectionsResult = await database.query(`
    SELECT COUNT(*)::int AS used_connections
    FROM pg_stat_activity;
  `);
  const usedConnections = usedConnectionsResult.rows[0].used_connections;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version,
        max_connections: maxConnections,
        used_connections: usedConnections,
      },
    },
  });
}

export default status;
