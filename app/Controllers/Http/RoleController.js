"use strict";

const Role = use("Adonis/Acl/Role");
const { validateAll } = use("Validator");

class RoleController {
  async index({ request }) {
    const page = request.input("page") || 1;
    const perPage = request.input("per_page") || 20;
    const orderby = request.input("orderby") || "id";
    const order = request.input("order") || "DESC";
    const name = request.input("name");

    const query = Role.query();

    if (name) {
      query.where("name", "like", `%${name}%`);
    }

    let roles;

    if (request.input("all") == "true") {
      roles = await query.fetch();
    } else {
      roles = await query.orderBy(orderby, order).paginate(page, perPage);
    }

    return {
      status: 200,
      message: "success",
      data: roles,
    };
  }

  async create({ request, response }) {
    const rules = {
      name: "required|unique:roles,name",
      slug: "required|unique:roles,slug",
    };

    const messages = {
      "name.required": "Nama role tidak boleh kosong!",
      "name.unique": "Nama role sudah ada!",
      "slug.required": "Slug role tidak boleh kosong!",
      "slug.unique": "Slug role sudah ada!",
    };

    const validation = await validateAll(request.all(), rules, messages);

    if (validation.fails()) {
      return response.status(400).json({
        status: 400,
        message: "failed",
        data: validation.messages(),
      });
    }

    const newRole = await Role.create(request.all());

    return {
      status: 200,
      message: "success",
      data: newRole,
    };
  }

  async update({ request, params }) {
    const updateRole = await Role.findOrFail(params.id);
    updateRole.name = request.input("name");
    if (request.input("slug")) {
      updateRole.slug = request.input("slug");
    }
    if (request.input("description")) {
      updateRole.description = request.input("description");
    }
    await updateRole.save();

    return {
      status: 200,
      message: "success",
      data: updateRole,
    };
  }

  async delete({ params }) {
    const deleteRole = await Role.findOrFail(params.id);
    await deleteRole.delete();

    return {
      status: 200,
      message: "success",
      data: deleteRole,
    };
  }
}

module.exports = RoleController;
