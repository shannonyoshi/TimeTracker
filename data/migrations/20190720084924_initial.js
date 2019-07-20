exports.up = function(knex) {
  return knex.schema

    .createTable("time-units", tbl => {
      tbl.increments();
      tbl
        .string("unit_name")
        .notNullable()
        .unique();
    })
    .createTable("users", tbl => {
      tbl.increments();
      tbl
        .string("username", 128)
        .notNullable()
        .unique();
      tbl.string("password", 128).notNullable();
      tbl.float("time_amount").notNullable();
      tbl
        .integer("time_unit_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("time-units")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("categories", tbl => {
      tbl.increments();
      tbl.string("category_name", 128).notNullable();
      tbl.string("description");
      tbl.float("time_amount").notNullable();
      tbl
        .integer("time_unit_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("time-units")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("tasks", tbl => {
      tbl.increments();
      tbl.string("task_name", 128);
      tbl.string("description");
      tbl.timestamp("started_at");
      tbl.timestamp("completed_at");
      tbl
        .integer("category_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("categories")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("tasks").
    dropTableIfExists("categories")
    .dropTableIfExists("users")
    .dropTableIfExists("time-units")
};
