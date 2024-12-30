import "./config/instrument.js"
import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js"
import * as Sentry from "@sentry/node"
import { ClerkWebhooks } from "./controllers/webhooks.js"

// Initialize Express
const app = express()

// Function to start the server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB()

    // Middlewares
    app.use(cors())
    app.use(express.json())

    // Routes
    app.get("/", (req, res) => res.send("API WORKING"))
    app.get("/debug-sentry", function mainHandler(req, res) {
      throw new Error("My first Sentry error!")
    })
    app.post("/webhooks", ClerkWebhooks )

    // Port
    const PORT = process.env.PORT || 5000
    Sentry.setupExpressErrorHandler(app)
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error.message)
    process.exit(1) // Exit with failure
  }
}

// Start the server
startServer()
