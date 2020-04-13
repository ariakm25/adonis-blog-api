"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Article extends Model {
  static boot() {
    super.boot();

    this.addTrait("@provider:Lucid/Slugify", {
      fields: {
        slug: "title"
      },
      strategy: "dbIncrement",
      disableUpdates: true
    });
  }

  user() {
    return this.belongsTo("App/Models/User");
  }

  tags() {
    return this.belongsToMany("App/Models/Tag").pivotTable("article_tags");
  }
}

module.exports = Article;
