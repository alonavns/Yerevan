const pg = (connectionString: string) => {
  return require('knex')({
    client: 'pg',
    connection: {
      database: 'yerevan_dev',
      user: 'postgres',
      password: 'postgres'
    },
  })
};

export default pg;