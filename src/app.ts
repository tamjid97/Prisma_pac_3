import cookieParser from "cookie-parser";
import express,{ Application, Request, Response } from "express";

import config from "./config";
import cors from "cors"
import httpStatus  from "http-status";
import { userRoutes } from "./modules/user/user.route";
import { authRouter } from "./modules/auth/auth.route";


const app : Application = express();




// midelyer 
app.use(cors({
  origin: config.app_url,
  credentials : true,
}))


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());





app.get("/", (req : Request, res : Response)=>{
  res.send("hello mama")
})



app.get("/api/user", async (req : Request ,res : Response)=>{

  const payload = req.body;
  console.log(payload);

  res.status(httpStatus.CREATED).json({
    massage : "user register successfully"
  })
})

app.use("/api/user", userRoutes);
app.use("/api/user", authRouter);

export default app;