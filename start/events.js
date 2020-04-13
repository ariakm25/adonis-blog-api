const Event = use("Event");
const Env = use("Env");
const Mail = use("Mail");
const mailTemplate = require("../Mail/index");

Event.on("user::created", async (payload) => {
  await Mail.raw(
    mailTemplate(
      "Selamat Datang!",
      "Silahkan konfirmasi email kamu dengan klik tombol konfirmasi dibawah ini.",
      "Konfirmasi Email",
      Env.get("CLIENT_URL") + '/verify?token=' + encodeURIComponent(payload.token)
    ),
    (message) => {
      message.from("noreply@kodekita.net");
      message.to(payload.user.email);
      message.subject("Selamat Datang di Kodekita.net!");
    }
  );
});

Event.on("forgot::password", async (payload) => {
  await Mail.raw(
    mailTemplate(
      "Reset Password",
      "Silahkan klik tombol reset password dibawah ini untuk menambahkan password baru.",
      "Reset Password",
      Env.get("CLIENT_URL") + '/new-password?token=' + encodeURIComponent(payload.token)
    ),
    (message) => {
      message.from("noreply@kodekita.net");
      message.to(payload.user.email);
      message.subject("Reset Password");
    }
  );
});
