#### ETAW timetable for Amazon Alexa

Install [Node.js] 4.3 with [NVM] to match AWS Lambda runtime. Install [Serverless]:

    npm install -g serverless

Install [Alexia] under `node_modules/` and deploy:

    npm install
    serverless deploy

See under `speechAssets/` for intents and utterances to configure [Alexa skill].

[Node.js]: https://nodejs.org
[NVM]: https://github.com/creationix/nvm
[Serverless]: https://serverless.com
[Alexia]: https://github.com/Accenture/alexia
[Alexa skill]: https://developer.amazon.com/alexa
