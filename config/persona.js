'use strict'

/*
|--------------------------------------------------------------------------
| Persona
|--------------------------------------------------------------------------
|
| The persona is a simple and opinionated service to register, login and
| manage user account
|
*/

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Uids
  |--------------------------------------------------------------------------
  |
  | An array of fields, that can be used to indetify a user uniquely. During
  | login and reset password, these fields be checked against the user
  | input
  |
  */
  uids: ['username', 'email'],

  /*
  |--------------------------------------------------------------------------
  | Email field
  |--------------------------------------------------------------------------
  |
  | The name of the email field inside the database and the user payload.
  |
  */
  email: 'email',

  /*
  |--------------------------------------------------------------------------
  | Password
  |--------------------------------------------------------------------------
  |
  | The password field to be used for verifying and storing user password
  |
  */
  password: 'password',

  /*
  |--------------------------------------------------------------------------
  | New account state
  |--------------------------------------------------------------------------
  |
  | State of user when a new account is created
  |
  */
  newAccountState: 'pending',

  /*
  |--------------------------------------------------------------------------
  | Verified account state
  |--------------------------------------------------------------------------
  |
  | State of user after they verify their email address
  |
  */
  verifiedAccountState: 'active',

  /*
  |--------------------------------------------------------------------------
  | Model
  |--------------------------------------------------------------------------
  |
  | The model to be used for verifying and creating users
  |
  */
  model: 'App/Models/User',

  /*
  |--------------------------------------------------------------------------
  | Date Format
  |--------------------------------------------------------------------------
  |
  | The date format for the tokens table. It is required to calculate the
  | expiry of a token.
  |
  */
  dateFormat: 'YYYY-MM-DD HH:mm:ss',

  /*
  |--------------------------------------------------------------------------
  | Validation messages
  |--------------------------------------------------------------------------
  |
  | An object of validation messages to be used when validation fails.
  |
  */
  validationMessages: () => {
    return {
      "name.required": "Nama Tidak Boleh Kosong!",
      "account_status.required": "Status Tidak Boleh Kosong!",
      "username.required": "Username Tidak Boleh Kosong!",
      "username.unique": "Username Sudah Terdaftar!",
      "email.required": "Alamat Email Tidak Boleh Kosong!",
      "email.unique": "Alamat Email Sudah Terdaftar!",
      "email.email": "Email Tidak Valid!",
      "password.required": "Password Tidak Boleh Kosong!",
      "password.min": "Password Minimal 6 Karakter!",
      "password.confirmed": "Konfirmasi Password Tidak Sesuai!",
      "old_password.mis_match": "Password Lama Tidak Sesuai!",
      "uid.exists": "Email Tidak Terdaftar!",
    }
  }
}
