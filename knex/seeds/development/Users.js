exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, email: 'admin@yerevan.com', first_name: 'Admin', last_name: 'Admin', date: new Date() },
        { id: 2, email: 'guest@yerevan.com', first_name: 'Guest', last_name: 'Guest', date: new Date() },
      ]);
    });
};
