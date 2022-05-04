const sgMail = require("@sendgrid/mail");

module.exports = async (to, templateId, templateData, attachments) => {
  sgMail.setApiKey(process.env.SENDGRID_KEY);
  const msg = {
    to,
    from: {
      name: process.env.SENDGRID_FROM_NAME,
      email: process.env.SENDGRID_FROM,
    },
    templateId,
    attachments,
    dynamic_template_data: templateData,
  };

  try {
    const res = await sgMail.send(msg);
    // eslint-disable-next-line no-console
    console.log("Response === ", res);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.message);
  }
};
