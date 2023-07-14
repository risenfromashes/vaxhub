const { Pool } = require('pg');

const pool = new Pool({
    user: 'linpostgres',
    host: 'lin-24870-9164-pgsql-primary.servers.linodedb.net',
    database: 'testdb',
    password: 'DPZz7.NNK1tbGeBG',
    port: 5432, // Default PostgreSQL port is 5432
    ssl: { rejectUnauthorized: false },
});

module.exports = pool;