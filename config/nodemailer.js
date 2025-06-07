const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEventCreatedEmail(toEmail, event) {
  const html = pug.renderFile(path.join(__dirname, '..', 'emails', 'eventCreated.pug'), {
    title: event.title,
    location: event.location,
    date: event.date.toDateString()
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Event Created Successfully',
    html
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendEventCreatedEmail;
