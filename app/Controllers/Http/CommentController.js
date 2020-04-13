"use strict";

const Comment = use("App/Models/Comment");
const CommentReply = use("App/Models/CommentReply");
const { validateAll } = use("Validator");

class CommentController {
  async create({ request, response, auth }) {
    const rules = {
      content: "required",
      model: "required",
      model_id: "required",
    };

    const messages = {
      "content.required": "content tidak boleh kosong!",
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
    const newComment = await Comment.create({
      user_id: user.id,
      model: request.input("model"),
      model_id: request.input("model_id"),
      content: request.input("content"),
    });

    return {
      status: 200,
      message: "success",
      data: newComment,
    };
  }

  async update({ request, params }) {
    const updateComment = await Comment.findOrFail(params.id);
    updateComment.content = request.input("content");
    await updateComment.save();

    return {
      status: 200,
      message: "success",
      data: updateComment,
    };
  }

  async delete({ params }) {
    const deleteComment = await Comment.findOrFail(params.id);
    await deleteComment.delete();

    return {
      status: 200,
      message: "success",
      data: deleteComment,
    };
  }

  async createReply({ request, response, auth }) {
    const rules = {
      content: "required",
      comment_id: "required",
    };

    const messages = {
      "content.required": "content tidak boleh kosong!",
      "comment_id.required": "comment_id tidak boleh kosong!",
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
    const newComment = await CommentReply.create({
      user_id: user.id,
      comment_id: request.input("comment_id"),
      content: request.input("content"),
    });

    return {
      status: 200,
      message: "success",
      data: newComment,
    };
  }

  async updateReply({ request, params }) {
    const updateComment = await CommentReply.findOrFail(params.id);
    updateComment.content = request.input("content");
    await updateComment.save();

    return {
      status: 200,
      message: "success",
      data: updateComment,
    };
  }

  async deleteReply({ params }) {
    const deleteComment = await CommentReply.findOrFail(params.id);
    await deleteComment.delete();

    return {
      status: 200,
      message: "success",
      data: deleteComment,
    };
  }
}

module.exports = CommentController;
