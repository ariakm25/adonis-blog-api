"use strict";

const BaseExceptionHandler = use("BaseExceptionHandler");

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { response }) {
    if (error.code === "E_INVALID_JWT_TOKEN") {
      return response.status(401).json({
        status: 401,
        message: "failed",
        data: "Not authorized."
      });
    }

    if (error.code === "E_JWT_TOKEN_EXPIRED") {
      return response.status(401).json({
        status: 401,
        message: "failed",
        data: "Session expired."
      });
    }

    if (error.name === "InvalidRefreshToken") {
      return response.status(401).json({
        status: 401,
        message: "failed",
        data: "Invalid refresh token."
      });
    }

    if (error.name === "InvalidTokenException") {
      return response.status(400).json({
        status: 400,
        message: "failed",
        data: "Token invalid/expired."
      });
    }

    if (error.name === "ForbiddenException") {
      return response.status(403).json({
        status: 403,
        message: "failed",
        data: "Access forbidden. You are not allowed to this resource."
      });
    }

    if (error.name === "ModelNotFoundException") {
      return response.status(404).json({
        status: 404,
        message: "failed",
        data: "Data tidak ditemukan."
      });
    }

    if (error.code === "ER_DUP_ENTRY") {
      return response.status(400).json({
        status: 400,
        message: "failed",
        data: "Data sudah ada."
      });
    }

    if (error.code === "E_ROUTE_NOT_FOUND") {
      return response.status(404).json({
        status: 404,
        message: "failed",
        data: "Route tidak ditemukan."
      });
    }

    return super.handle(...arguments);
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {}
}

module.exports = ExceptionHandler;
