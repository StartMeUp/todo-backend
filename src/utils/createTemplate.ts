// run this file instead of command line to create aws ses templates
// npm run createTemplate

import aws from "aws-sdk";

const ses = new aws.SES({ apiVersion: "2010-12-01" });

const mainFunction = async () => {
  // change email template path below
  const template = require("../emails/signupTemplate.json");
  return await ses.createTemplate(template).promise();
};

mainFunction().then(
  () => {
    console.log("template created successfully.");
  },
  (ex) => {
    console.log("Error in template creation.");
    console.dir(ex.message);
  }
);
