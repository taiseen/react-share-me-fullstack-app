import { feedQuery, searchQuery } from '../utils/sanityQuery';
import { sanityConnection } from '../utils/sanityConnection';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';


// this component call from 🟨 ../container/Pin.js 🟨 <Component />
// by the help of React <Router>
const Feed = () => {

  const { categoryId } = useParams();
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // if at URL ==> categoryId, exist run this code snippet
    if (categoryId) {
      setLoading(true);
      // GROQ || sanity query 
      const query = searchQuery(categoryId);
      
      sanityConnection.fetch(query).then(data => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      sanityConnection.fetch(feedQuery).then(data => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);


  const ideaName = categoryId || 'new';

  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }


  return (
    <div>
      {
        pins && <MasonryLayout pins={pins} />
      }
    </div>
  );
};

export default Feed;
