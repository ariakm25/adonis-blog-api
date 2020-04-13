"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class HistorySchema extends Schema {
  up() {
    this.create("histories", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("cascade");
      table
        .integer("material_id")
        .unsigned()
        .references("id")
        .inTable("materials")
        .onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("histories");
  }
}

module.exports = HistorySchema;
