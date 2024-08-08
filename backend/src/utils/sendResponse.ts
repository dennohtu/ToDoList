import {Response} from 'express'

export default function sendResponse(res: Response, success: Boolean, data: any | String) {
    
    res.status(success ? 200 : 400).send({success, data: success ? data : {errMsg: data}})
}