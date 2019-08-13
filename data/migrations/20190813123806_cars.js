exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();
    tbl
      .string("VIN", 17)
      .unique()
      .notNullable();
    tbl.string("make", 128).notNullable();
    tbl.string("model", 128).notNullable();
    tbl.decimal("mileage", 6).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
