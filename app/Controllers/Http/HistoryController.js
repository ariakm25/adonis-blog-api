'use strict'

const History = use("App/Models/History");
const { validateAll } = use("Validator")

class HistoryController {
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
    const newHistory = await History.create({
      user_id: user.id,
      model: request.input("model"),
      model_id: request.input("model_id"),
    });

    return {
      status: 200,
      message: "success",
      data: newHistory,
    };
  }

  async delete({ params }) {
    const deleteHistory = await History.findOrFail(params.id);
    await deleteHistory.delete();

    return {
      status: 200,
      message: "success",
      data: deleteHistory,
    };
  }
}

module.exports = HistoryController
