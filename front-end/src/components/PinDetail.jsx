import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/sanityQuery';
import { sanityConnection, urlFor } from '../utils/sanityConnection';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MasonryLayout from './MasonryLayout';
import Tippy from '@tippyjs/react';
import Spinner from './Spinner';
import 'tippy.js/dist/tippy.css';


// this component is responsible for ==> 🟩 Display details info about Pin Post
// this component call from 🟨 ../component/Pin.js 🟨 <Component />
// by the help of React <Router>
const PinDetail = ({ user }) => {

  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [comment, setComment] = useState('');
  const [pinDetail, setPinDetail] = useState();
  const [addingComment, setAddingComment] = useState(false);


  // fetch data from sanity about 1️⃣ specific post...
  const fetchPinDetails = () => {

    // import sanity query function & use here...
    const query = pinDetailQuery(pinId);

    if (query) {

      // by sanity query, get data from sanity 
      sanityConnection.fetch(`${query}`)
        .then(data => {

          // get 1️⃣ specific pin post 
          setPinDetail(data[0]);

          if (data[0]) {
            // get all data about this 1️⃣ specific pin post 
            // so run sanity query again...
            const query1 = pinDetailMorePinQuery(data[0]);
            sanityConnection.fetch(query1)
              .then(res => setPins(res));
          }
        });
    }
  };


  // add comment into sanity for related 1️⃣ specific post...
  const addComment = () => {

    if (comment) {

      setAddingComment(true);

      // sanity data POST system...
      sanityConnection
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };


  useEffect(() => {
    fetchPinDetails();
  }, [pinId, fetchPinDetails]);


  if (!pinDetail) <Spinner message="Showing pin" />

  return (
    <>
      {
        pinDetail && (
          <div className="flex flex-col xl:flex-row m-auto bg-white"
            style={{ maxWidth: '1500px', borderRadius: '32px' }}>

            <div className="flex justify-center items-center md:items-start flex-initial">
              <img
                alt="user-post"
                className="rounded-t-3xl rounded-b-lg"
                src={(pinDetail?.image && urlFor(pinDetail?.image).url())}
              />
            </div>

            <div className="w-full p-5 flex-1 xl:min-w-620">
              <div className="flex items-center justify-between">

                <div className="flex gap-2 items-center">
                  <Tippy content="Download Image">
                    <a
                      download
                      href={`${pinDetail.image.asset.url}?dl=`}
                      className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100 "
                    >
                      <MdDownloadForOffline fontSize={28} />
                    </a>
                  </Tippy>
                </div>

                <a
                  rel="noreferrer"
                  target="_blank"
                  href={pinDetail.destination}
                >
                  {pinDetail.destination?.slice(8)}
                </a>

              </div>

              <div>
                <h1 className="text-4xl font-bold break-words mt-3">
                  {pinDetail.title}
                </h1>
                <p className="mt-3">{pinDetail.about}</p>
              </div>

              {/* 🟨🟨🟨 for going to ==> User Profile <Component/> */}
              <Link
                to={`/user-profile/${pinDetail?.postedBy._id}`}
                className="flex gap-2 mt-5 items-center bg-white rounded-lg ">

                <img
                  src={pinDetail?.postedBy.image}
                  className="w-10 h-10 rounded-full" alt="user-profile" />
                <p className="font-bold">{pinDetail?.postedBy.userName}</p>
              </Link>


              {/* 🟨🟨🟨 UI for ==> Just Display User Comments... */}
              <h2 className="mt-5 text-2xl">Comments</h2>
              <div className="max-h-370 overflow-y-auto">
                {
                  // 🟨🟨🟨 UI for ==> User Comment Display...
                  pinDetail?.comments?.map(item => (
                    <div
                      key={item.comment}
                      className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                    >
                      <img
                        alt="user-profile"
                        src={item.postedBy?.image}
                        className="w-10 h-10 rounded-full cursor-pointer"
                      />
                      <div className="flex flex-col">
                        <p className="font-bold">{item.postedBy?.userName}</p>
                        <p>{item.comment}</p>
                      </div>
                    </div>
                  ))
                }
              </div>


              {/* 🟨🟨🟨 UI for ==> User Comment Input... */}
              <div className="flex flex-wrap mt-6 gap-3">

                {/* 🟨🟨🟨 for going to ==> User Profile <Component/> */}
                <Link to={`/user-profile/${user._id}`}>
                  <img
                    src={user.image}
                    alt="user-profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                </Link>

                <input
                  type="text"
                  value={comment}
                  placeholder="Add a comment"
                  onChange={(e) => setComment(e.target.value)}
                  className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                />

                <button
                  type="button"
                  onClick={addComment}
                  className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none hover:bg-red-700 duration-300 ease-linear"
                >
                  {addingComment ? 'Posting the comment...' : 'Post'}
                </button>
              </div>

            </div>
          </div>
        )
      }


      {
        pins?.length > 0 && (
          <h2 className="text-center font-bold text-2xl mt-8 mb-4">
            More like this
          </h2>
        )
      }


      {
        pins ? (
          <MasonryLayout pins={pins} />
        ) : (
          <Spinner message="Loading more pins" />
        )
      }
    </>
  );
};

export default PinDetail;