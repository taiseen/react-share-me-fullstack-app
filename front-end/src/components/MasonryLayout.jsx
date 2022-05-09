import Masonry from 'react-masonry-css';
import Pin from './Pin';


const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};


// this component call from 🟨 ../component/Feed.js 🟨 <Component />
// this component call from 🟨 ../component/PinDetail.js 🟨 <Component />
const MasonryLayout = ({ pins }) => (

  <Masonry
    className="flex animate-slide-fwd"
    breakpointCols={breakpointColumnsObj}
  >
    {
      pins?.map(pin =>
        <Pin key={pin._id} pin={pin} className="w-max" />
      )
    }
  </Masonry>
);

export default MasonryLayout;