"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class History extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  material() {
    return this.belongsTo("App/Models/Material");
  }
}

module.exports = History;
