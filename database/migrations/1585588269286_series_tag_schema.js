"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SeriesTagSchema extends Schema {
  up() {
    this.create("series_tags", table => {
      table.increments();
      table
        .integer("series_id")
        .unsigned()
        .references("id")
        .inTable("series")
        .onDelete("cascade");
      table
        .integer("tag_id")
        .unsigned()
        .references("id")
        .inTable("tags")
        .onDelete("cascade");
    });
  }

  down() {
    this.drop("series_tags");
  }
}

module.exports = SeriesTagSchema;
