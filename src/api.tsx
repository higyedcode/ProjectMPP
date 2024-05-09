import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Set your base URL
    // baseURL: 'https://mppeventmanagerngrok.onrender.com/api', // Set your base URL

    timeout: 5000, // Set timeout
    headers: {
        'Content-Type': 'application/json',
        // Add other headers as needed
    },
})

export default api
