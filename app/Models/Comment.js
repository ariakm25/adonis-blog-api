"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Comment extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  replies() {
    return this.hasMany("App/Models/CommentReply");
  }
}

module.exports = Comment;
