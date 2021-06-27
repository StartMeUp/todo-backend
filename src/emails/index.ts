import aws from "aws-sdk";

const params = {
  Destination: {
    /* required */
    CcAddresses: [],
    ToAddresses: ["chrislep62@gmail.com"],
  },
  Message: {
    /* required */
    Body: {
      /* required */
      Html: {
        Charset: "UTF-8",
        Data: "<h1>Heading 1</h1>",
      },
      Text: {
        Charset: "UTF-8",
        Data: "TEXT_FORMAT_BODY",
      },
    },
    Subject: {
      Charset: "UTF-8",
      Data: "Test email",
    },
  },
  Source: "contact@start-me-up.fr" /* required */,
  ReplyToAddresses: [
    "contact@start-me-up.fr",
    /* more items */
  ],
};

// Create the promise and SES service object
const sendPromise = new aws.SES({ apiVersion: "2010-12-01" })
  .sendEmail(params)
  .promise();

// Handle promise's fulfilled/rejected states
sendPromise
  .then(function (data) {
    console.log(data.MessageId);
  })
  .catch(function (err) {
    console.error(err, err.stack);
  });
