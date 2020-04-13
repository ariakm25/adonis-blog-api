"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Material extends Model {
  static boot() {
    super.boot();

    this.addTrait("@provider:Lucid/Slugify", {
      fields: {
        slug: "title"
      },
      strategy: async (field, value, modelInstance) => {
        return `${modelInstance.module_id}-${value}`;
      },
      disableUpdates: true
    });
  }

  module() {
    return this.belongsTo("App/Models/Module");
  }

  histories() {
    return this.hasMany("App/Models/History");
  }
}

module.exports = Material;
