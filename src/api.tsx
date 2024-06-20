import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://localhost:8080/api', // Set your base URL
    baseURL: import.meta.env.VITE_APP_API_URL,

    timeout: 5000, // Set timeout
    headers: {
        'Content-Type': 'application/json',
        // Add other headers as needed
    },
})

export default api
