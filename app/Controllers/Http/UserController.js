"use strict";

const User = use("App/Models/User");
const Persona = use("Persona");
const { validateAll } = use("Validator");

class UserController {
  async index({ request, auth }) {
    const page = request.input("page") || 1;
    const perPage = request.input("per_page") || 20;
    const orderby = request.input("orderby") || "id";
    const order = request.input("order") || "DESC";
    const name = request.input("name");
    const email = request.input("email");
    const username = request.input("username");
    const account_status = request.input("account_status");
    const roles = request.input("roles");

    const query = User.query();

    if (name) {
      query.where("name", "like", `%${name}%`);
    }
    if (email) {
      query.where("email", "like", `%${email}%`);
    }
    if (username) {
      query.where("username", "like", `%${username}%`);
    }
    if (account_status) {
      query.where("account_status", "=", `${account_status}`);
    }

    if (roles) {
      query.whereHas("roles", (q) => {
        q.whereIn("roles.id", roles);
      });
    }

    const currentUser = await auth.getUser();
    const users = await query
      .whereNotIn("id", [currentUser.id])
      .setHidden("password")
      .with("roles")
      .select("id", "name", "username", "email", "account_status", "avatar")
      .orderBy(orderby, order)
      .paginate(page, perPage);

    return {
      status: 200,
      message: "success",
      data: users,
    };
  }

  async create({ request, response }) {
    try {
      const payload = request.only([
        "name",
        "username",
        "email",
        "password",
        "account_status",
        "password_confirmation",
      ]);

      const rules = {
        name: "required",
        username: "required|unique:users,username",
        email: "required|email|unique:users,email",
        password: "required|min:6|confirmed",
        account_status: "required",
      };

      const errorMessages = {
        "name.required": "Nama Tidak Boleh Kosong!",
        "account_status.required": "Status Tidak Boleh Kosong!",
        "username.required": "Username Tidak Boleh Kosong!",
        "username.unique": "Username Sudah Terdaftar!",
        "email.required": "Alamat Email Tidak Boleh Kosong!",
        "email.unique": "Alamat Email Sudah Terdaftar!",
        "email.email": "Email Tidak Valid!",
        "password.required": "Password Tidak Boleh Kosong!",
        "password.min": "Password Minimal 6 Karakter!",
        "password.confirmed": "Konfirmasi Password Tidak Sesuai!",
      };

      const validation = await validateAll(payload, rules, errorMessages);

      if (validation.fails()) {
        return response.status(400).json({
          status: 400,
          message: "failed",
          data: validation.messages(),
        });
      }

      delete payload.password_confirmation;

      const user = await User.create(payload);

      if (request.input("roles")) {
        await user.roles().attach(request.input("roles"));
      }

      return {
        status: 201,
        message: "success",
        data: {
          id: user.id,
          username: user.username,
        },
      };
    } catch (error) {
      return response.status(400).json({
        status: 400,
        message: "failed",
        data: error.message,
      });
    }
  }

  async show({ params, auth, response }) {
    const currentUser = await auth.getUser();
    const user = await User.query()
      .where("id", params.id)
      .setHidden(["password"])
      .first();
    user.scope = await user.roles().ids();

    if (user.id == currentUser.id) {
      return response.status(403).json({
        status: 403,
        message: "failed",
        data: "Access forbidden. You are not allowed to this resource.",
      });
    }

    return {
      status: 200,
      message: "success",
      data: user,
    };
  }

  async update({ request, response, params }) {
    try {
      const user = await User.findOrFail(params.id);

      if (request.input("name")) {
        user.name = request.input("name");
      }

      if (request.input("email")) {
        user.email = request.input("email");
      }

      if (request.input("username")) {
        user.username = request.input("username");
      }

      if (request.input("account_status")) {
        user.account_status = request.input("account_status");
      }

      if (request.input("password")) {
        user.password = request.input("password");
      }

      await user.save();

      await user.roles().sync(request.input("roles"));

      return {
        status: 200,
        message: "success",
        data: {
          id: user.id,
          username: user.username,
        },
      };
    } catch (error) {
      return response.status(400).json({
        status: 400,
        message: "failed",
        data: error.message,
      });
    }
  }

  async profile({ auth }) {
    const user = await auth.getUser();
    const profile = await User.query()
      .where("id", user.id)
      .setHidden(["password"])
      .first();
    profile.scope = await user.getRoles();

    return {
      status: 200,
      message: "success",
      data: profile,
    };
  }

  async updateProfile({ request, auth }) {
    const currentUser = await auth.getUser();
    const user = await User.findOrFail(currentUser.id);

    if (request.input("name")) {
      user.name = request.input("name");
    }

    if (request.input("facebook")) {
      user.facebook = request.input("facebook");
    }

    if (request.input("github")) {
      user.github = request.input("github");
    }

    if (request.input("twitter")) {
      user.twitter = request.input("twitter");
    }

    if (request.input("bio")) {
      user.bio = request.input("bio");
    }

    if (request.input("website")) {
      user.website = request.input("website");
    }

    await user.save();

    return user;
  }

  async updatePassword({ request, auth }) {
    Persona.updatePasswordRules = function () {
      return {
        old_password: "required",
        password: "required|min:6|confirmed",
      };
    };
    const payload = request.only([
      "old_password",
      "password",
      "password_confirmation",
    ]);

    const user = auth.user;

    try {
      await Persona.updatePassword(user, payload);
    } catch (err) {
      return err.messages;
    }
  }

  async delete({ params, auth }) {
    const deleteUser = await User.findOrFail(params.id);
    const currentUser = await auth.getUser();

    if (deleteUser.id == currentUser.id) {
      return response.status(403).json({
        status: 403,
        message: "failed",
        data: "Access forbidden. You are not allowed to this resource.",
      });
    }

    await deleteUser.delete();

    return {
      status: 200,
      message: "success",
      data: deleteUser,
    };
  }
}

module.exports = UserController;
