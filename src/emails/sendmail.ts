import aws from "aws-sdk";

const data = { name: "Kris" };
//const escapedData = JSON.stringify(data).replace(/"/g, '\\"');
// does not work according to documentation requiring escaped json

const params = {
  Source: "contact@start-me-up.fr",
  Template: "signupTemplate",
  Destination: { ToAddresses: ["chrislep62@gmail.com"] },
  TemplateData: JSON.stringify(data),
};

// Create the promise and SES service object
const sendPromise = new aws.SES({ apiVersion: "2010-12-01" })
  .sendTemplatedEmail(params)
  .promise();

// Handle promise's fulfilled/rejected states
sendPromise
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.error(err, err.stack);
  });
