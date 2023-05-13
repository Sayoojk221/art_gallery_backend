const config = require("config");
const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
class Mailer {
  constructor(wagner) {
    this.wagner = wagner;
    this.basePath = path.resolve("./resources/templates/");
    this.transporter = nodemailer.createTransport({
      service: config.get("mail.service"),
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
      from: options.fromEmail,
      to: options.toEmail,
      subject: options.subject,
      template: options.templateName,
      context: {
        ...options.context,
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