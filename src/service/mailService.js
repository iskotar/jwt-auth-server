import nodemailer from 'nodemailer'


export const sendActivationMail = async (to, link) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  })

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: 'Account activation for ' + process.env.API_URL,
    text: '',
    html:
      `
      <div>
        <h1>Use the link for account activation</h1>
        <a href="${link}">${link}</a>
      </div>
      `
  })
}
