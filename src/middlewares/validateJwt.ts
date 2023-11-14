import jwt,{JwtPayload} from 'jsonwebtoken';
import {
  Response,
  Request, 
  NextFunction 
} from "express";



export const tokenValidation = (req: Request, res: Response, next: NextFunction):Response | void  =>{
  const token = req.header('auth-token');
  if(!token) return res.status(401).json('Access denied');
  if (!process.env.SECRET_KEY_JWT) {
    return res.status(500).json("Server error");
  }
  const payload = jwt.verify(token, process.env.SECRET_KEY_JWT) as JwtPayload;
  req.userId = Number(payload.Uid);
  next();
}