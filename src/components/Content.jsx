import "../components/Content.css"
import React from 'react'
import axios from "axios";
import { useState } from "react";
import { Spinner } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'

const Content = () => {
    const [keyword, setKeyword] = useState("")
    const [value, setValue] = useState("")
    const [chatGptAnswer, setChatGptAnswer] = useState("ChatGpt response will appear here");
    const [isLoading, setIsLoading] = useState(false);

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    // console.log("apiKey", apiKey);
    // console.log("process.env", process.env);


    const generateJoke = async (topic, type) => {
        let userPrompt = `Generate a ${type} about ${topic}`;
        // console.log(userPrompt);
        setIsLoading(true);
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: "gpt-3.5-turbo",
                    messages: [{
                        role: "user",
                        content: userPrompt
                    }]
                },
                {
                    headers: {
                        "Authorization": `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            // console.log(response.data)
            let data = response.data.choices[0].message.content;
            setChatGptAnswer(data);
            setIsLoading(false);
        }
        catch (err) {
            console.log(err)
            setIsLoading(false);
            setChatGptAnswer("Something went Wrong");
        }
        setKeyword("")
    };
    return (
        <div>
            <h1>ChatGPT Joke/Quote/Shayari Generator</h1>
            <div className="container">
                <input type="text" placeholder="Enter the keyword" onChange={(e) => setKeyword(e.target.value)} />
                <select onChange={(e) => setValue(e.target.value)}>
                    <option value="">Select Type</option>
                    <option value="joke">Joke</option>
                    <option value="poem">Poem</option>
                    <option value="quote">Quote</option>
                </select>
            </div>

            {/* <button >GENERATE</button>  */}
            <Button colorScheme='blue' onClick={() => generateJoke(keyword, value)}>GENERATE</Button> <br /> <br /> <br />

            {isLoading ? <Spinner
                color='red.500'
            />
                : <p className="response">{chatGptAnswer}</p>
            }

        </div>
    )
}

export default Content
