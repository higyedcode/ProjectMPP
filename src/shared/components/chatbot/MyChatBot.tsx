import {GoogleGenerativeAI} from '@google/generative-ai'
import axios from 'axios'
import ChatBot from 'react-chatbotify'

export function MyChatBot() {
    const options = {
        header: {
            title: (
                <h3
                    style={{cursor: 'pointer', margin: 0}}
                    onClick={() => window.open('https://github.com/tjtanjin/')}
                >
                    Eventi
                </h3>
            ),
            showAvatar: true,
        },

        userBubble: {
            animate: true,
            showAvatar: false,
            simStream: false,
            streamSpeed: 30,
            dangerouslySetInnerHtml: false,
        },
        botBubble: {
            animate: true,
            showAvatar: false,
            simStream: true,
            streamSpeed: 30,
            dangerouslySetInnerHtml: false,
        },
        theme: {
            primaryColor: '#6cc2ea',
            secondaryColor: '#2196f3',
        },
        tooltip: {
            mode: 'CLOSE',
            text: 'Ask anything about the events! 😊',
        },
        chatHistory: {storageKey: 'example_real_time_stream'},
    }
    let apiKey = import.meta.env.VITE_APP_API_KEY as string
    const modelType = 'gemini-pro'
    let hasError = false

    // example gemini stream
    // you can replace with other LLMs or even have a simulated stream
    const gemini_stream = async (params) => {
        try {
            const genAI = new GoogleGenerativeAI(apiKey)
            const model = genAI.getGenerativeModel({model: modelType})
            const result = await model.generateContentStream(params.userInput)

            console.log(result)
            let text = ''
            let offset = 0
            for await (const chunk of result.stream) {
                const chunkText = chunk.text()
                text += chunkText
                // inner for-loop used to visually stream messages character-by-character
                // feel free to remove this loop if you are alright with visually chunky streams
                for (let i = offset; i < chunkText.length; i++) {
                    // while this example shows params.streamMessage taking in text input,
                    // you may also feed it custom JSX.Element if you wish
                    await params.streamMessage(text.slice(0, i + 1))
                    await new Promise((resolve) => setTimeout(resolve, 30))
                }
                offset += chunkText.length
            }

            // in case any remaining chunks are missed (e.g. timeout)
            // you may do your own nicer logic handling for large chunks
            for (let i = offset; i < text.length; i++) {
                await params.streamMessage(text.slice(0, i + 1))
                await new Promise((resolve) => setTimeout(resolve, 30))
            }
            await params.streamMessage(text)
        } catch (error) {
            await params.injectMessage(
                'Unable to load model, is your API Key valid?',
            )
            hasError = true
        }
    }

    const askBackendAI = async (params) => {
        let response = (await axios.post(
            'https://mppeventsmanagerbackend.onrender.com/api/events/askAI',
            params.userInput,
        )) as any
        console.log(response)
        let responseText: string =
            response.data.candidates[0].content.parts[0].text
        await params.streamMessage(responseText.replace(/\*/g, ''))
    }
    const flow = {
        start: {
            message: 'Ask anything about the events',
            path: 'loop',
            // isSensitive: true,
        },
        // api_key: {
        //     message: (params) => {
        //         apiKey = params.userInput.trim()
        //         console.log(apiKey)
        //         return 'Ask me anything!'
        //     },
        //     path: 'loop',
        // },
        loop: {
            message: async (params) => {
                // await gemini_stream(params)
                await askBackendAI(params)
            },
            path: () => {
                if (hasError) {
                    return 'start'
                }
                return 'loop'
            },
        },
    }
    return <ChatBot options={options} flow={flow} />
}
