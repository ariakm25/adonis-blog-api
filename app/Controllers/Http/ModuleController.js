"use strict";

const Module = use("App/Models/Module");
const { validateAll } = use("Validator");

class ModuleController {
  async show({ params }) {
    const module = await Module.findOrFail(params.id);
    await module.load("series")

    return {
      status: 200,
      message: "success",
      data: module,
    };
  }

  async create({ request, response }) {
    const rules = {
      title: "required",
      series_id: "required",
    };

    const messages = {
      "title.required": "Judul Module tidak boleh kosong!",
      "series_id.required": "ID Series Module tidak boleh kosong!",
    };

    const validation = await validateAll(request.all(), rules, messages);

    if (validation.fails()) {
      return response.status(400).json({
        status: 400,
        message: "failed",
        data: validation.messages(),
      });
    }

    const newModule = await Module.create(request.all());

    return {
      status: 200,
      message: "success",
      data: newModule,
    };
  }

  async update({ request, params }) {
    const updateModule = await Module.findOrFail(params.id);
    updateModule.title = request.input("title");
    if (request.input("series_id")) {
      updateModule.series_id = request.input("series_id");
    }
    await updateModule.save();

    return {
      status: 200,
      message: "success",
      data: updateModule,
    };
  }

  async delete({ params }) {
    const deleteModule = await Module.findOrFail(params.id);
    await deleteModule.delete();

    return {
      status: 200,
      message: "success",
      data: deleteModule,
    };
  }
}

module.exports = ModuleController;
