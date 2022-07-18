const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'shubhamkumarlhh@gmail.com',
    subject: 'Welcome to the Upsolve API',
    text: `Hello ${name}, thanks for creating an account with Upsolve API.`,
  });
};

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'shubhamkumarlhh@gmail.com',
    subject: 'Goodbye from Upsolve API',
    text: `Sorry to see you go ${name}, thanks for using Upsolve API.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail,
};
