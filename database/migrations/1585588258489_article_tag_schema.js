"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ArticleTagSchema extends Schema {
  up() {
    this.create("article_tags", table => {
      table.increments();
      table
        .integer("article_id")
        .unsigned()
        .references("id")
        .inTable("articles")
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
    this.drop("article_tags");
  }
}

module.exports = ArticleTagSchema;
