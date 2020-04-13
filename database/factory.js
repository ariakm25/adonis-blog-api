"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

Factory.blueprint("App/Models/User", (faker, index, data) => {
  const defaultValue = {
    avatar: faker.avatar(),
    name: faker.name(),
    username: faker.username(),
    email: faker.email(),
    password: "secret",
    account_status: "active"
  };

  return Object.assign(defaultValue, data);
});

Factory.blueprint('App/Models/Article', (faker) => {
  return {
    title: faker.sentence(),
    content: faker.paragraph(),
    status: 1,
    user_id: 1
  }
})
