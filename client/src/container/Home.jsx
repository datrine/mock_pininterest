import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

import { Sidebar, UserProfile } from "../components";
import { userQuery } from "../utils/data";
import { client } from "../client";
import Pins from "./Pins";
import logo from "../assets/logo.png";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const navigate = useNavigate();
  const { user: auth0UserObj, isLoading } = useAuth0();
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  console.log({ user: auth0UserObj, isLoading });
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (auth0UserObj) {
      return;
    }
    if (!auth0UserObj) {
      if (window.location.pathname === "/login") {
        return;
      }
      navigate("/login");
    }
  }, [isLoading, auth0UserObj]);
  useEffect(() => {
    if (!auth0UserObj) {
      return;
    }
    const query = userQuery(auth0UserObj.sub);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [auth0UserObj]);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={auth0UserObj && auth0UserObj} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img
              src={auth0UserObj?.image}
              alt="user-pic"
              className="w-9 h-9 rounded-full "
            />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} user={auth0UserObj && auth0UserObj} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={auth0UserObj && auth0UserObj} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
