// run this file instead of command line to create aws ses templates
// change line 9 ./email-template.json

import aws from "aws-sdk";

const ses = new aws.SES({ apiVersion: "2010-12-01" });

const mainFunction = async () => {
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
