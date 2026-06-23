import express from 'express'
import { createStore, login } from '../Controller/storeController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
export const storeRouter = express.Router()


storeRouter.post("/create",createStore)
storeRouter.post("/login",login)
storeRouter.get("/getProfile",authMiddleware)

