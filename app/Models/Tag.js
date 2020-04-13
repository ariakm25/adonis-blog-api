"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Tag extends Model {
  static boot() {
    super.boot();

    this.addTrait("@provider:Lucid/Slugify", {
      fields: {
        slug: "name"
      },
      strategy: "dbIncrement",
      disableUpdates: true
    });
  }

  articles() {
    return this.belongsToMany("App/Models/Article").pivotTable("article_tags");
  }

  series() {
    return this.belongsToMany("App/Models/Series").pivotTable("series_tags");
  }
}

module.exports = Tag;
