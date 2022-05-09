import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/sanityQuery';
import { sanityConnection } from '../utils/sanityConnection';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { AiOutlineLogout } from 'react-icons/ai';
import { fetchUser } from '../utils/fetchUser';
import { useEffect, useState } from 'react';
import MasonryLayout from './MasonryLayout';
import Tippy from '@tippyjs/react';
import Spinner from './Spinner';
import 'tippy.js/dist/tippy.css';


const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology';
const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';


// this component call from 🟨 ../component/Pin.js 🟨 <Component />
// this component call from 🟨 ../container/Home.js 🟨 <Component />
// this component call from 🟨 ../component/Navbar.js 🟨 <Component />
// this component call from 🟨 ../component/Sidebar.js 🟨 <Component />
// this component call from 🟨 ../component/PinDetail.js 🟨 <Component />
// by the help of React <Router>
const UserProfile = () => {

  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState();
  const [pins, setPins] = useState();
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');


  // get user from LocalStorage...
  const User = fetchUser();


  useEffect(() => {
    // 1) 🟩 sanity query for get user by userID
    const query = userQuery(userId);
    // 2) 🟩 user info fetch from sanity | after then update useState local variable
    sanityConnection.fetch(query).then(data => setUser(data[0]));
  }, [userId]);


  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      sanityConnection.fetch(createdPinsQuery).then(data => setPins(data));
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);
      sanityConnection.fetch(savedPinsQuery).then(data => setPins(data));
    }
  }, [text, userId]);


  // user logout function...
  const logout = () => {
    localStorage.clear();
    navigate('/login');
    console.log("Logout...");
  };


  if (!user) return <Spinner message="Loading profile" />;

  return (
    <div className="relative pb-2 h-full">
      <div className="flex flex-col pb-5">

        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">

            {/* 🟨🟨🟨 UI for ==> Banner Image */}
            <img
              alt="user-pic"
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              src={randomImage}
            />

            {/* 🟨🟨🟨 UI for ==> User Image */}
            <img
              alt="user-pic"
              src={user.image}
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
            />
          </div>

          <h1 className="font-bold text-3xl text-center mt-3">
            {user.userName}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            {
              // 🟨🟨🟨 UI for ==> Google Logout Button
              userId === User.googleId && (

                <GoogleLogout
                  clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                  render={renderProps => (
                    <Tippy content="Logout">
                      <button
                        type="button"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md hover:bg-gray-300 duration-300 ease-linear"
                      >
                        <AiOutlineLogout color="red" fontSize={21} />
                      </button>
                    </Tippy>
                  )}
                  onLogoutSuccess={logout}
                  cookiePolicy="single_host_origin"
                />
              )
            }
          </div>
        </div>


        {/* 🟨🟨🟨 UI for ==> Created or Save Button */}
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setActiveBtn('created');
              setText(e.target.textContent);
            }}
            className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Created
          </button>

          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('saved');
            }}
            className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Saved
          </button>
        </div>


        {
          pins?.length
            ? (
              <div className="px-2">
                <MasonryLayout pins={pins} />
              </div>
            )
            : (
              <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
                No Pins Found!
              </div>
            )
        }
      </div>
    </div>
  );
};

export default UserProfile;