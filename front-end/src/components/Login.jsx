import { sanityConnection } from '../utils/sanityConnection';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import GoogleLogin from 'react-google-login';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logo_white.png';


const Login = () => {

  const navigate = useNavigate();

  const responseGoogle = (response) => {

    console.log("Login...")
    
    // after user login, store 💾 user info at localStorage
    // for future usage of in this application
    localStorage.setItem('user', JSON.stringify(response?.profileObj));

    // get only needful data fields by Object Destructuring...
    const { name, googleId, imageUrl } = response?.profileObj;

    // Q: what we should do by these data fields ❓❔❓
    // A: creating a new sanity document for user & save into DB... ✅

    // this pattern is match by ==> sanity user schema...
    // back-end/schemas/user.js/~ ~ ~ ~
    const userDocument = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };

    // ❓ what should happen after creating a user in sanity❓
    // 1. ✅ create this user document in sanity +
    // 2. ✅ redirect user into index page...
    sanityConnection.createIfNotExists(userDocument)
      .then(() => navigate('/', { replace: true }));

  };


  return (
    <div className="flex justify-start items-center flex-col h-screen">

      <div className=" relative w-full h-full">

        <video
          loop
          muted
          autoPlay
          type="video/mp4"
          controls={false}
          src={shareVideo}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center bg-blackOverlay">

          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>


          {/* Google Login Button */}
          <div className="shadow-2xl">

            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
              render={renderProps => (
                <button
                  type="button"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                >
                  <FcGoogle className="mr-4" /> Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
