import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export class Email {
  constructor(
    public host: string = "smtp.gmail.com",
    public port: number = 587,
    public authEmail: string = process.env.EMAIL!,
    public authEmailPassword: string = process.env.EMAIL_PASS!
  ) {}

  createTransport(): nodemailer.Transporter<SMTPTransport.SentMessageInfo> {
    return nodemailer.createTransport({
      host: this.host,
      port: this.port, // 587 for TLS, 465 for SSL
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.authEmail,
        pass: this.authEmailPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  sendEmail(
    targetEmail: string,
    subject: string,
    text: string
  ): string | Error {
    let message: string | Error = "";
    const transporter = this.createTransport();
    const mailOptions = {
      from: this.authEmail,
      to: targetEmail,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        message = error;
      }
      message = info.response;
    });

    return message;
  }
}
