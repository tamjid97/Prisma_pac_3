import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendRespons";
import jwt  from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registered successfully",
      data: {
        user,
      },
    });
  },
);

const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const payload = req.body;
    const {accessToken} = req.cookies;
    console.log(accessToken);



    const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret)


    if(typeof verifiedToken === "string"){
      throw new Error(verifiedToken)
    }

const profile = await userService.getMeIntoDB(verifiedToken.id);

sendResponse(res, {
  success : true,
  statusCode : httpStatus.OK,
  message : "user profile fach successfullt",
  data : {profile}
})

    
  })

export const userController = {
  createUser,
  getMyProfile
};
