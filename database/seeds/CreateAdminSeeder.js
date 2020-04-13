"use strict";

/*
|--------------------------------------------------------------------------
| CreateAdministratorSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use("Factory");
const Role = use("Adonis/Acl/Role");

class CreateAdministratorSeeder {
  async run() {
    const admin = await Role.findOrCreate({
      name: "Admin",
      slug: "admin",
      description: "Admin",
    });

    const user = await Role.findOrCreate({
      name: "User",
      slug: "user",
      description: "User",
    });

    // const userAdmin = await Factory.model("App/Models/User").create({
    //   name: "Aria",
    //   username: "ariakm25",
    //   email: "ariakm25@gmail.com",
    //   password: "admin",
    // });

    // await userAdmin.roles().attach([admin.id]);

    for (let i = 0; i < 25; i++) {
      const userFake = await Factory.model("App/Models/User").create();
      await userFake.roles().attach([user.id]);
    }
    await Factory.model("App/Models/Article").createMany(25);
  }
}

module.exports = CreateAdministratorSeeder;
