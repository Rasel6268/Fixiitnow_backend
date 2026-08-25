import cookieParser from "cookie-parser";
import express,{ Application, Request, Response } from "express";
import cors from "cors"
import config from "./config";

import registration  from './routers/users.route'

const app : Application = express()


app.use(cors({
  origin: config.app_url,
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'FixItNow API Server is running successfully',
    project: 'FixItNow',
    author: 'Md Rasel',
    assignmentHost: 'Programming Hero',
    version: '1.0.0',
    status: 'Running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

//Routers
//User 

app.use("/api/auth",registration)


export default app