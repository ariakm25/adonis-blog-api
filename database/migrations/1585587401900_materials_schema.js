"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MaterialsSchema extends Schema {
  up() {
    this.create("materials", table => {
      table.increments();
      table.string("title");
      table
        .string("slug")
        .unique()
        .notNullable();
      table.text("content");
      table
        .integer("module_id")
        .unsigned()
        .references("id")
        .inTable("modules");
      table.boolean("status").default(0);
      table
        .string("image")
        .notNullable()
        .default("default-series.png");
      table.timestamps();
    });
  }

  down() {
    this.drop("materials");
  }
}

module.exports = MaterialsSchema;
