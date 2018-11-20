// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'yerevan_dev',
      user: 'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations_dev',
      directory: __dirname + '/knex/migrations'
    },
    seeds: {
      tableName: 'knex_seeds_dev',
      directory: __dirname + '/knex/seeds/development'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'yerevan_staging',
      user: 'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations_staging'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'yerevan',
      user: 'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
