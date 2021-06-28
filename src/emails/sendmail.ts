import aws from "aws-sdk";

export const emailTemplates = {
  signup: "signupTemplate",
};

let success: boolean;

export const sendEmail = async (
  data: { email: string; [key: string]: any },
  template: string
) => {
  //const escapedData = JSON.stringify(data).replace(/"/g, '\\"');
  // does not work according to documentation requiring escaped json

  const { email, ...rest } = data;

  const params = {
    Source: `${process.env.AWS_SOURCE}`,
    Template: template,
    Destination: { ToAddresses: [email] },
    TemplateData: JSON.stringify(rest),
  };

  // Create the promise and SES service object
  const sendPromise = new aws.SES({ apiVersion: "2010-12-01" })
    .sendTemplatedEmail(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  await sendPromise
    .then(function (data) {
      success = true;
    })
    .catch(function (err) {
      success = false;
      console.error(err, err.stack);
    });

  return success;
};
