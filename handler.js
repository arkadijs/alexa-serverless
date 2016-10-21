'use strict';

const alexia = require('alexia');
const app = alexia.createApp();

app.intent('HelloIntent', 'Hello', (slots, attr) => {
    return 'Hello from Madrid';
});

module.exports.hello = (event, context, callback) => {
  app.handle(event, data => {
        callback(null, data);
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
