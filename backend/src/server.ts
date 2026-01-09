import dotenv from 'dotenv'
import app from './app'

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 3000;

// Start the HTTP server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

