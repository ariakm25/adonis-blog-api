"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Series extends Model {
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

  modules() {
    return this.hasMany("App/Models/Module");
  }

  tags() {
    return this.belongsToMany("App/Models/Tag").pivotTable("series_tags");
  }
}

module.exports = Series;
