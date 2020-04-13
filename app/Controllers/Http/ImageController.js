"use strict";

const Helpers = use("Helpers");
const Env = use("Env");

class ImageController {
  async upload({ request }) {
    const date = new Date();
    const images = request.file("images", {
      types: ["image"],
      size: "5mb",
      extnames: ["png", "gif", "jpg", "jpeg"],
    });
    const path = Helpers.publicPath("uploads");
    const fileName =
      "/" +
      date.getFullYear() +
      "/" +
      date.getMonth() +
      "/" +
      Math.random().toString(36).substring(2) +
      "." +
      images.extname;
    await images.move(path, {
      name: fileName,
    });

    if (!images.moved()) {
      return images.errors();
    }

    return {
      status: 200,
      message: "success",
      data: Env.get("APP_URL") + "/uploads" + fileName,
    };
  }
}

module.exports = ImageController;
