import nodemailer from "nodemailer";

import type SMTPTransport from "nodemailer/lib/smtp-transport";

import { getEnvs } from "@/server/configs/env.config";

export class Email {
  private readonly transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor(
    private readonly host = "smtp.gmail.com",
    private readonly port = 587
  ) {
    const { EMAIL, EMAIL_PASS } = getEnvs();
    this.transporter = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      secure: false,
      auth: { user: EMAIL, pass: EMAIL_PASS },
      tls: { rejectUnauthorized: false },
    });
  }

  async sendEmail(targetEmail: string, subject: string, text: string): Promise<string> {
    const { EMAIL } = getEnvs();
    const info = await this.transporter.sendMail({
      from: EMAIL,
      to: targetEmail,
      subject,
      text,
    });
    return info.response;
  }
}
