const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
        let info = await transporter.sendMail({
            from:`vidhan`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        });
        console.log("info is ",info);
        return info;
    }catch(err){
        console.log(err);
        console.log("error is occur when the email is try to send")
        res.json({
            msg:"error is occur when the email is try to send"

        })
    }
}
module.exports = mailSender;