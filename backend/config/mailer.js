const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    },
});
transporter.use('compile', hbs({
    viewEngine: {
        extName: ".hbs",
        partialsDir: path.resolve(__dirname, "../views/emails"),
        defaultLayout: false
    },
    viewPath: path.resolve(__dirname, "../views/emails"),
    extName: ".hbs"
}));

const Mailer = {
    sent: async (to, subject, context, template) => {
        const info = await transporter.sendMail({
            from: process.env.MAIL_FROM_ADDRESS,
            to: to,
            subject: subject,
            context: context,
            template: template
        });
        return info;
    }
}
module.exports = Mailer;