require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

module.exports = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || 'postgres',
  operatorAliases: false,
  logging: console.log,
  maxConcurrentQueries: 100,
  ssl: 'Amazon RDS',
  pool: { maxConnections: 5, maxIdleTime: 30 },
  define: {
    timestamps: false,
    freezeTableName: true,
  },
};
