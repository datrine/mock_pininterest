import React, { useEffect } from "react";
//import GoogleLogin from 'react-google-login';
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

import { client } from "../client";
import { useAuth0 } from "@auth0/auth0-react";
import {nanoid} from "nanoid"
const Login = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, loginWithPopup, user } = useAuth0();
  console.log({ user });
  useEffect(() => {
    if (!user) {
      return;
    }
    const doc = {
      _id: nanoid(),
      _type: "user",
      userName: user.nickname,
      //image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    }).catch(console.log);
  }, [user]);
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">
            <button
              type="button"
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none text-white"
              onClick={() => loginWithRedirect()}
            > <FcGoogle className="mr-4" /> Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
