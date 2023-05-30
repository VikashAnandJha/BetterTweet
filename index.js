const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const app = express();
const port = 3000; // Choose the desired port number

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads

const configuration = new Configuration({
    apiKey: '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',
});

async function main(tweet) {
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "hi suppose you are a professional tweet writter i will give u a tweet & u will write it in better way. Tweet: " + tweet,
        temperature: 0.3,
        max_tokens: 500,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    let output = completion.data.choices[0].text;
    console.log(output);
    return output;
}

let tweet = "Twitter needs to seriously think about moderating violent videos. Video of a Recent stabbing of a Delhi girl is being circulated 'as-it-is'";
//

// Define a route for POST requests
app.post('/tweet', async (req, res) => {


    // Handle the POST request here
    let tweet = req.body.tweet

    let output = await main(tweet);
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.send(output.trim());
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
