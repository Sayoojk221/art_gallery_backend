const config = require("config");
const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
class Mailer {
  constructor(wagner) {
    this.wagner = wagner;
    this.basePath = path.resolve("./resources/templates/");
    this.baseUrl = config.get("baseUrl");
    this.fromEmail = config.get("mail.auth.user");
    this.transporter = nodemailer.createTransport({
      service: config.get("mail.service"),
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.get("mail.auth.user"),
        pass: config.get("mail.auth.password"),
      },
    });
  }

  sendMail(options) {
    const template = {
      viewEngine: {
        partialsDir: this.basePath,
        defaultLayout: false,
      },
      viewPath: this.basePath,
    };

    this.transporter.use("compile", hbs(template));

    var mailOptions = {
      from: this.fromEmail,
      to: options.toEmail,
      subject: options.subject,
      template: options.templateName,
      context: {
        ...options.context,
        baseUrl: this.baseUrl,
      },
    };

    // trigger the sending of the E-mail
    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(`Mail error: ${error}`);
      }
      console.log("Message sent: " + info.response);
    });
  }
}

module.exports = (wagner) => wagner.factory("Mailer", () => new Mailer(wagner));
