"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SeriesSchema extends Schema {
  up() {
    this.create("series", table => {
      table.increments();
      table.string("title");
      table
        .string("slug")
        .unique()
        .notNullable();
      table.text("content");
      table
        .string("image")
        .nullable()
      table.boolean("status").default(0);
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users");
      table.timestamps();
    });
  }

  down() {
    this.drop("series");
  }
}

module.exports = SeriesSchema;
