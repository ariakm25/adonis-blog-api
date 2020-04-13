"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ModulesSchema extends Schema {
  up() {
    this.create("modules", table => {
      table.increments();
      table.string("title");
      table
        .integer("series_id")
        .unsigned()
        .references("id")
        .inTable("series");
      table.timestamps();
    });
  }

  down() {
    this.drop("modules");
  }
}

module.exports = ModulesSchema;
