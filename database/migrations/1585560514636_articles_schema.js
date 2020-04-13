"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ArticlesSchema extends Schema {
  up() {
    this.create("articles", table => {
      table.increments();
      table.string("title").notNullable();
      table
        .string("image")
        .nullable()
      table
        .string("slug")
        .unique()
        .notNullable();
      table.text("content").notNullable();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users");
      table.boolean("status").default(0);
      table.timestamps();
    });
  }

  down() {
    this.drop("articles");
  }
}

module.exports = ArticlesSchema;
