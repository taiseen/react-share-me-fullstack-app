import { sanityConnection } from '../utils/sanityConnection';
import { Link, Route, Routes } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Sidebar, UserProfile } from '../components';
import { AiFillCloseCircle } from 'react-icons/ai';
import { userQuery } from '../utils/sanityQuery';
import { HiMenu } from 'react-icons/hi';
import logo from '../assets/logo.png';
import Pins from './Pins';


const Home = () => {

  const scrollRef = useRef(null);
  const [user, setUser] = useState();
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const userInfo = localStorage.getItem('user') !== 'undefined'
    ? JSON.parse(localStorage.getItem('user'))
    : localStorage.clear();


  // for getting user info...
  useEffect(() => {
    // GROQ || sanity query 
    const query = userQuery(userInfo?.googleId);

    // get user from sanity | then set into local variable...
    sanityConnection.fetch(query).then(data => setUser(data[0]));
  }, []);


  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });



  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 transition-height duration-75 ease-out">

      {/* bug screen side bar */}
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>

      <div className="flex md:hidden flex-row">

        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)} />

          {/* 🟨🟨🟨 go to home page  */}
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>

          {/* 🟨🟨🟨 go to <UserProfile /> component for user profile info */}
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="user-pic" className="w-9 h-9 rounded-full " />
          </Link>

        </div>

        {
          toggleSidebar && (
            <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">

              <div className="absolute w-full flex justify-end items-center p-2">
                {/* sidebar close button icon */}
                <AiFillCloseCircle
                  fontSize={30}
                  className="cursor-pointer"
                  onClick={() => setToggleSidebar(false)} />
              </div>

              <Sidebar closeToggle={setToggleSidebar} user={user && user} />
            </div>
          )
        }
      </div>

      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>

    </div>
  );
};

export default Home;
