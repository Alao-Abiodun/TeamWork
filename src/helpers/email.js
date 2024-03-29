const nodemailer = require('nodemailer');

exports.sendMail = async config => {
  // let account = await nodemailer.createTestAccount();
  // console.log(account)
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'abiodundev@gmail.com',
        pass: 'abiodun1996',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: 'teamwork@gmail.com',
      ...config,
    });

    return `Preview URL: %s', ${nodemailer.getTestMessageUrl(info)}`;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
