"use strict";

const Series = use("App/Models/Series");
const { validateAll } = use("Validator");

class SeriesController {
  async index({ request }) {
    const page = request.input("page") || 1;
    const perPage = request.input("per_page") || 9;
    const key = request.input("keyword");
    const query = Series.query();
    if (key) {
      query.where("title", "like", `%${key}%`);
    }

    const series = await query
      .with("user")
      .with("tags")
      .where("status", 1)
      .orderBy("id", "DESC")
      .paginate(page, perPage);
    return {
      status: 200,
      message: "success",
      data: series,
    };
  }

  async indexDraft({ request }) {
    const page = request.input("page") || 1;
    const perPage = request.input("per_page") || 20;
    const key = request.input("keyword");
    const query = Series.query();
    if (key) {
      query.where("title", "like", `%${key}%`);
    }

    const series = await query
      .with("user")
      .with("tags")
      .where("status", 0)
      .orderBy("id", "DESC")
      .paginate(page, perPage);
    return {
      status: 200,
      message: "success",
      data: series,
    };
  }

  async show({ params }) {
    const series = await Series.findByOrFail("slug", params.slug);
    await series.loadMany(["tags", "user", "modules.materials"]);

    return {
      status: 200,
      message: "success",
      data: series,
    };
  }

  async showById({ params }) {
    const series = await Series.findByOrFail("id", params.id);
    await series.loadMany(["tags", "user", "modules.materials"]);

    return {
      status: 200,
      message: "success",
      data: series,
    };
  }

  async create({ request, response, auth }) {
    const rules = {
      title: "required",
    };

    const messages = {
      "title.required": "Judul Series tidak boleh kosong!",
    };

    const validation = await validateAll(request.all(), rules, messages);

    if (validation.fails()) {
      return response.status(400).json({
        status: 400,
        message: "failed",
        data: validation.messages(),
      });
    }
    const user = await auth.getUser();
    const newSeries = new Series();
    newSeries.title = request.input("title");
    newSeries.content = request.input("content");
    newSeries.status = request.input("status") || 0;
    newSeries.user_id = user.id;
    if (request.input("image")) {
      newSeries.image = request.input("image");
    }
    await newSeries.save();

    if (request.input("tags")) {
      await newSeries.tags().attach(request.input("tags"));
    }

    return {
      status: 200,
      message: "success",
      data: newSeries,
    };
  }

  async update({ request, params }) {
    const updateSeries = await Series.findOrFail(params.id);

    if (request.input("title")) {
      updateSeries.title = request.input("title");
    }

    if (request.input("content")) {
      updateSeries.content = request.input("content");
    }

    if (request.input("status")) {
      updateSeries.status = request.input("status");
    }

    if (request.input("image")) {
      updateSeries.image = request.input("image");
    }

    await updateSeries.save();

    if (request.input("tags")) {
      await updateSeries.tags().sync(request.input("tags"));
    }

    return {
      status: 200,
      message: "success",
      data: updateSeries,
    };
  }

  async delete({ params }) {
    const deleteSeries = await Series.findOrFail(params.id);
    await deleteSeries.delete();

    return {
      status: 200,
      message: "success",
      data: deleteSeries,
    };
  }
}

module.exports = SeriesController;
