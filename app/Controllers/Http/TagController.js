"use strict";

const Tag = use("App/Models/Tag");
const { validateAll } = use("Validator");

class TagController {
  async index({ request }) {
    const page = request.input("page") || 1;
    const perPage = request.input("per_page") || 20;
    const orderby = request.input("orderby") || "id";
    const order = request.input("order") || "DESC";
    const name = request.input("name");

    const query = Tag.query();

    if (name) {
      query.where("name", "like", `%${name}%`);
    }

    let tags;

    if (request.input("all") == "true") {
      tags = await query.orderBy("name", "ASC").fetch();
    } else {
      tags = await query.orderBy(orderby, order).paginate(page, perPage);
    }
    return {
      status: 200,
      message: "success",
      data: tags,
    };
  }

  async show({ params }) {
    const tags = await Tag.findOrFail(params.id);
    await tags.loadMany(["articles", "series"]);

    return {
      status: 200,
      message: "success",
      data: tags,
    };
  }

  async create({ request, response }) {
    const rules = {
      name: "required|unique:tags,name",
    };

    const messages = {
      "name.required": "Nama tag tidak boleh kosong!",
      "name.unique": "Nama tag sudah ada!",
    };

    const validation = await validateAll(request.all(), rules, messages);

    if (validation.fails()) {
      return response.status(400).json({
        status: 400,
        message: "failed",
        data: validation.messages(),
      });
    }

    const newTag = await Tag.create(request.all());

    return {
      status: 200,
      message: "success",
      data: newTag,
    };
  }

  async update({ request, params }) {
    const updateTag = await Tag.findOrFail(params.id);
    updateTag.name = request.input("name");
    await updateTag.save();

    return {
      status: 200,
      message: "success",
      data: updateTag,
    };
  }

  async delete({ params }) {
    const deleteTag = await Tag.findOrFail(params.id);
    await deleteTag.delete();

    return {
      status: 200,
      message: "success",
      data: deleteTag,
    };
  }
}

module.exports = TagController;
