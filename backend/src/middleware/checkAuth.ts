import {Request, Response, NextFunction} from 'express'
import sendResponse from '../utils/sendResponse'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export default function (req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization
        if(!token) {
            sendResponse(res, false, "Not authorised")
            return
        }
        const jwtToken = token.split(" ")[1]

        const data = jwt.verify(jwtToken, process.env.JWT_SECRET as jwt.Secret).toString()

        req.userid = data

        next()
    
    } catch(err: any) {
        console.log(err)
        sendResponse(res, false, err.message)
    }
}