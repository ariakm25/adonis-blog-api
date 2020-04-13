"use strict";

const Article = use("App/Models/Article");
const { validateAll } = use("Validator");

class ArticleController {
  async index({ request }) {
    const page = request.input("page") || 1;
    const perPage = request.input("per_page") || 9;
    const title = request.input("title");
    const query = Article.query();

    if (title) {
      query.where("title", "like", `%${title}%`);
    }

    const articles = await query
      .select(
        "id",
        "title",
        "slug",
        "image",
        "created_at",
        "updated_at",
        "user_id"
      )
      .with("user", (q) => {
        q.select("id", "name", "username", "avatar");
      })
      .with("tags")
      .where("status", 1)
      .orderBy("id", "DESC")
      .paginate(page, perPage);

    return {
      status: 200,
      message: "success",
      data: articles,
    };
  }

  async indexDraft({ request }) {
    const page = request.input("page") || 1;
    const perPage = request.input("per_page") || 9;
    const title = request.input("title");
    const query = Article.query();

    if (title) {
      query.where("title", "like", `%${title}%`);
    }

    const articles = await query
      .select(
        "id",
        "title",
        "slug",
        "image",
        "created_at",
        "updated_at",
        "user_id"
      )
      .with("user", (q) => {
        q.select("id", "name", "username", "avatar");
      })
      .with("tags")
      .where("status", 0)
      .orderBy("id", "DESC")
      .paginate(page, perPage);

    return {
      status: 200,
      message: "success",
      data: articles,
    };
  }

  async showById({ params }) {
    const articles = await Article.findByOrFail("id", params.id);
    await articles.loadMany(["tags", "user"]);

    return {
      status: 200,
      message: "success",
      data: articles,
    };
  }

  async show({ params }) {
    const articles = await Article.findByOrFail("slug", params.slug);
    await articles.loadMany(["tags", "user"]);

    return {
      status: 200,
      message: "success",
      data: articles,
    };
  }

  async create({ request, response, auth }) {
    const rules = {
      title: "required",
    };

    const messages = {
      "title.required": "Judul Article tidak boleh kosong!",
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
    const newArticle = new Article();
    newArticle.title = request.input("title");
    newArticle.content = request.input("content");
    newArticle.status = request.input("status") || 0;
    newArticle.user_id = user.id;
    if (request.input("image")) {
      newArticle.image = request.input("image");
    }
    await newArticle.save();

    if (request.input("tags")) {
      await newArticle.tags().attach(request.input("tags"));
    }

    return {
      status: 200,
      message: "success",
      data: newArticle,
    };
  }

  async update({ request, params }) {
    const updateArticle = await Article.findOrFail(params.id);

    if (request.input("title")) {
      updateArticle.title = request.input("title");
    }

    if (request.input("content")) {
      updateArticle.content = request.input("content");
    }

    if (request.input("status")) {
      updateArticle.status = request.input("status");
    }

    if (request.input("image")) {
      updateArticle.image = request.input("image");
    }

    await updateArticle.save();

    if (request.input("tags")) {
      await updateArticle.tags().sync(request.input("tags"));
    }

    return {
      status: 200,
      message: "success",
      data: updateArticle,
    };
  }

  async delete({ params }) {
    const deleteArticle = await Article.findOrFail(params.id);
    await deleteArticle.delete();

    return {
      status: 200,
      message: "success",
      data: deleteArticle,
    };
  }
}

module.exports = ArticleController;
