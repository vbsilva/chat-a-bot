// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes } = require('botbuilder');

const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;
let credentials = new CognitiveServicesCredentials('466073ea8d5e414f986a624b7f3770ad');

console.log(credentials);

const NewsSearchAPIClient = require('azure-cognitiveservices-newssearch');
let client = new NewsSearchAPIClient(credentials);

console.log(client);


class MyBot {
    /**
     *
     * @param {TurnContext} on turn context object.
     */
    async onTurn(turnContext) {
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        let search_terms = turnContext.activity.text;

        client.newOperations.search(search_terms).then((result)=>{
            console.log(result);
        });
        if (turnContext.activity.type === ActivityTypes.Message) {
            await turnContext.sendActivity(`You said '${ turnContext.activity.text }'`);
        } else {
            await turnContext.sendActivity(`[${ turnContext.activity.type } event detected]`);
        }
    }
}

module.exports.MyBot = MyBot;
