require('dotenv').config();
const OpenAI = require('openai');
const axios = require("axios");
const client = new OpenAI();

const callGpt = async (input) => {
    const res =  await client.responses.create({
        model: "gpt-4.1",
        input: input,
    });
    return res.output_text;

}

const getNames = async () => {
    try {
        let names = ''
        const res = await axios.get(process.env.ROOT + '/names');
       
        res.data.forEach(row => {names += `id: ${row.id}, name: ${row.name}\n`});
       
        return names
    } catch (err) {
        console.log(err);
        return '';
    }
}

// dynamic prompt
const getSuggestion = async (question, answer) => {
    const names = await getNames();
    const prompt = 
    `Here's a list of (Thai) restaurant names and their ids. A client has answered a random question.
    From the question and the client's answer, make a creative, funny and unexpected inference about which restaurant the client should choose.
    Speak to client directly.

    Restaurants names and their ids:
    ${names}

    Question: ${question}
    Client's answer: ${answer}

    Respond strictly in this JSON format:
    {
        "id": "<restaurant_id>",
        "explanation": "<why this restaurant was chosen>"
    }`;
    try {
        const response = await callGpt(prompt);
        const suggestion = JSON.parse(response);
        return suggestion
    } catch (err) {
        console.log(err);
    }
}

// getSuggestion('Do you like Pop music?', 'Nope').then(ans => console.log(ans))


module.exports = getSuggestion;