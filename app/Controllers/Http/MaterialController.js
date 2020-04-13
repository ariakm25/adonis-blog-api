"use strict";

const Material = use("App/Models/Material");
const { validateAll } = use("Validator");

class MaterialController {

  async show({ params }) {
    const materials = await Material.findByOrFail("slug", params.slug);
    await materials.loadMany(["module.series"]);

    return {
      status: 200,
      message: "success",
      data: materials
    };
  }

  async create({ request, response }) {
    const rules = {
      title: "required"
    };

    const messages = {
      "title.required": "Judul Material tidak boleh kosong!"
    };

    const validation = await validateAll(request.all(), rules, messages);

    if (validation.fails()) {
      return response.status(400).json({
        status: 400,
        message: "failed",
        data: validation.messages()
      });
    }

    const newMaterial = new Material();
    newMaterial.title = request.input("title");
    newMaterial.content = request.input("content");
    newMaterial.module_id = request.input("module_id");
    newMaterial.status = request.input("status") || 0;
    if (request.input("image")) {
      newMaterial.image = request.input("image");
    }

    await newMaterial.save();

    return {
      status: 200,
      message: "success",
      data: newMaterial
    };
  }

  async update({ request, params }) {
    const updateMaterial = await Material.findOrFail(params.id);

    if (request.input("title")) {
      updateMaterial.title = request.input("title");
    }

    if (request.input("content")) {
      updateMaterial.content = request.input("content");
    }

    if (request.input("module_id")) {
      updateMaterial.module_id = request.input("module_id");
    }

    if (request.input("status")) {
      updateMaterial.status = request.input("status");
    }

    if (request.input("image")) {
      updateMaterial.image = request.input("image");
    }

    await updateMaterial.save();

    return {
      status: 200,
      message: "success",
      data: updateMaterial
    };
  }

  async delete({ params }) {
    const deleteMaterial = await Material.findOrFail(params.id);
    await deleteMaterial.delete();

    return {
      status: 200,
      message: "success",
      data: deleteMaterial
    };
  }
}

module.exports = MaterialController;
