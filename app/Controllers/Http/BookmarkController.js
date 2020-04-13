"use strict";

const Bookmark = use("App/Models/Bookmark");
const { validateAll } = use("Validator");

class BookmarkController {
  async create({ request, response, auth }) {
    const rules = {
      model: "required",
      model_id: "required",
    };

    const messages = {
      "model.required": "model tidak boleh kosong!",
      "model_id.required": "model_id tidak boleh kosong!",
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
    const newBookmark = await Bookmark.create({
      user_id: user.id,
      model: request.input("model"),
      model_id: request.input("model_id"),
    });

    return {
      status: 200,
      message: "success",
      data: newBookmark,
    };
  }

  async delete({ params }) {
    const deleteBookmark = await Bookmark.findOrFail(params.id);
    await deleteBookmark.delete();

    return {
      status: 200,
      message: "success",
      data: deleteBookmark,
    };
  }
}

module.exports = BookmarkController;
