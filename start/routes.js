"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// * Home Index
Route.get("/", () => {
  return {
    status: 200,
    message: "Welcome.",
    data: null
  };
});

// * Auth
Route.post("/register", "AuthController.register");
Route.post("/verify", "AuthController.verify");
Route.post("/forgot", "AuthController.forgot");
Route.post("/new-password", "AuthController.updatePasswordByToken");
Route.post("/login", "AuthController.login");
Route.post("/refresh_token", "AuthController.refreshToken");
Route.post("/logout", "AuthController.logout");

// * Clients
// Tags
Route.get("/tags", "TagController.index");
Route.get("/tags/:id", "TagController.show");

// Articles
Route.get("/articles", "ArticleController.index");
Route.get("/random_articles", "ArticleController.random");
Route.get("/articles/:slug", "ArticleController.show");

// Series
Route.get("/series", "SeriesController.index");
Route.get("/series/:slug", "SeriesController.show");

// Materials
Route.get("/materials/:slug", "MaterialController.show");

// * Required Auth
Route.group(() => {
  // * Profile
  Route.get("/profile", "UserController.profile");
  Route.post("/profile/update", "UserController.updateProfile");
  Route.post("/profile/password/update", "UserController.updatePassword");

  // * Bookmark
  Route.get("/bookmarks/create", "BookmarkController.create");
  Route.get("/bookmarks/delete/:id", "BookmarkController.delete");

  // * History
  Route.post("/histories/create", "HistoryController.create");
  Route.delete("/histories/delete/:id", "BookmarkController.delete");

  // * Comments
  Route.post("/comments/create", "CommentController.create");
  Route.put("/comments/update/:id", "CommentController.update");
  Route.delete("/comments/delete/:id", "CommentController.delete");
  Route.post("/comments/reply/create", "CommentController.createReply");
  Route.put("/comments/reply/update/:id", "CommentController.updateReply");
  Route.delete("/comments/reply/delete/:id", "CommentController.deleteReply");
}).middleware(["auth"]);

// * Required Admin
Route.group(() => {
  // * Users
  Route.get("/users", "UserController.index");
  Route.get("/users/:id", "UserController.show");
  Route.post("/users/create", "UserController.create");
  Route.put("/users/update/:id", "UserController.update");
  Route.delete("/users/delete/:id", "UserController.delete");

  // * Tags
  Route.post("/tags/create", "TagController.create");
  Route.put("/tags/update/:id", "TagController.update");
  Route.delete("/tags/delete/:id", "TagController.delete");

  // * Articles
  Route.get("/articles/get/draft/", "ArticleController.indexDraft");
  Route.get("/articles/id/:id", "ArticleController.showById");
  Route.post("/articles/create", "ArticleController.create");
  Route.put("/articles/update/:id", "ArticleController.update");
  Route.delete("/articles/delete/:id", "ArticleController.delete");

  // * Series
  Route.get("/series/get/draft/", "SeriesController.indexDraft");
  Route.get("/series/id/:id", "SeriesController.showById");
  Route.post("/series/create", "SeriesController.create");
  Route.put("/series/update/:id", "SeriesController.update");
  Route.delete("/series/delete/:id", "SeriesController.delete");

  // * Module
  Route.post("/modules/create", "ModuleController.create");
  Route.get("/modules/:id", "ModuleController.show");
  Route.put("/modules/update/:id", "ModuleController.update");
  Route.delete("/modules/delete/:id", "ModuleController.delete");

  // * Materials
  Route.post("/materials/create", "MaterialController.create");
  Route.get("/materials/id/:id", "MaterialController.showById");
  Route.put("/materials/update/:id", "MaterialController.update");
  Route.delete("/materials/delete/:id", "MaterialController.delete");

  // * Roles
  Route.get("/roles", "RoleController.index");
  Route.post("/roles/create", "RoleController.create");
  Route.put("/roles/update/:id", "RoleController.update");
  Route.delete("/roles/delete/:id", "RoleController.delete");

  // * Images
  Route.post("/images/upload", "ImageController.upload");
}).middleware(["auth", "is:admin"]);
