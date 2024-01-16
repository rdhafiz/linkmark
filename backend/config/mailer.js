const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
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