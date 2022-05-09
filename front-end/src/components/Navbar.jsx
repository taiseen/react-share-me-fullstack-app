import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


// this component call from 🟨 ../container/Pin.js 🟨 <Component />
// by the help of React <Router>
const Navbar = ({ user, searchTerm, setSearchTerm }) => {

  const navigate = useNavigate();

  if (user) {

    return (

      <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">

        {/* 🟨🟨🟨 Input ==> for 🔎 searching 🔎 pin
        & by typing, its going to load ==> 🟨 Search <Component/> */}
        <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">

          <IoMdSearch fontSize={21} className="ml-1" />

          <input
            type="text"
            value={searchTerm}
            placeholder="Search"
            onFocus={() => navigate('/search')}
            className="p-2 w-full bg-white outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>


        <div className="flex gap-3 ">

          {/* 🟨🟨🟨 for going to ==> User Profile <Component/> */}
          <Tippy content="User Info">
            <Link
              to={`user-profile/${user?._id}`}
              className="hidden md:block">

              <img
                src={user.image}
                alt="user-pic"
                className="w-14 h-12 rounded-lg " />
            </Link>
          </Tippy>

          {/* 🟨🟨🟨 for going to ==> CreatePin <Component/> */}
          <Tippy content="Create new pin">
            <Link
              to="/create-pin"
              className="bg-gray-700 hover:bg-gray-800 duration-300 ease text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
              <IoMdAdd fontSize={24} />
            </Link>
          </Tippy>
        </div>
      </div>
    );
  }

  return null;
};

export default Navbar;
