"use strict";

const Persona = use("Persona");

class AuthController {
  async register({ request, response }) {
    try {
      Persona.registerationRules = function () {
        return {
          name: "required",
          username: "required|unique:users,username",
          email: "required|email|unique:users,email",
          password: "required|min:6|confirmed",
        };
      };

      const payload = request.only([
        "name",
        "username",
        "email",
        "password",
        "password_confirmation",
      ]);

      const user = await Persona.register(payload);

      return {
        status: 201,
        message: "success",
        data: {
          id: user.id,
          username: user.username,
        },
      };
    } catch (error) {
      return response.status(400).json({
        status: 400,
        message: "failed",
        data: error.messages,
      });
    }
  }

  async verify({ request }) {
    const user = await Persona.verifyEmail(request.input("token"));

    return {
      status: 200,
      message: "success",
      data: user,
    };
  }

  async forgot({ request, response }) {
    try {
      await Persona.forgotPassword(request.input("email"));
      return {
        status: 200,
        message: "success",
        data: null,
      };
    } catch (error) {
      return response.status(400).json({
        status: 400,
        message: "failed",
        data: error.messages,
      });
    }
  }

  async updatePasswordByToken({ request, response }) {
    try {
      Persona.updatePasswordRules = function () {
        return {
          password: "required|min:6|confirmed",
        };
      };
      const token = request.input("token");
      const payload = request.only(["password", "password_confirmation"]);
      const user = await Persona.updatePasswordByToken(token, payload);
      return {
        status: 200,
        message: "success",
        data: user,
      };
    } catch (error) {
      return response.status(400).json({
        status: 400,
        message: "failed",
        data: error.messages || error.message,
      });
    }
  }

  async login({ request, auth, response }) {
    try {
      const { username, password, remember } = request.all();

      let login;
      if (remember == true) {
        login = await auth.withRefreshToken().attempt(username, password);
      } else {
        login = await auth.attempt(username, password);
      }
      return {
        status: 200,
        message: "success",
        data: login,
      };
    } catch (error) {
      return response.status(401).json({
        status: 401,
        message: "failed",
        data: "Username/password salah.",
      });
    }
  }

  async refreshToken({ request, auth }) {
    const refreshToken = request.input("refreshToken");
    const refresh = await auth
      .newRefreshToken()
      .generateForRefreshToken(refreshToken);
    return {
      status: 200,
      message: "success",
      data: refresh,
    };
  }

  async logout({ auth }) {
    const token = auth.getAuthHeader();
    await auth.authenticator("jwt").revokeTokens([token], true);
    return {
      status: 200,
      message: "success",
      data: "Logout succesfully.",
    };
  }
}

module.exports = AuthController;
