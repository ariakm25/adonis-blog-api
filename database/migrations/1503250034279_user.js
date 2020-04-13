"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", table => {
      table.increments();
      table
        .string("username", 80)
        .notNullable()
        .unique();
      table
        .string("email", 254)
        .notNullable()
        .unique();
      table.string("password", 80).notNullable();
      table.string("name", 150).nullable();
      table.string("avatar", 254).nullable();
      table.string("facebook", 254).nullable();
      table.string("github", 254).nullable();
      table.string("twitter", 254).nullable();
      table.string("website", 254).nullable();
      table.text("bio").nullable();
      table.string("account_status", 20).nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
