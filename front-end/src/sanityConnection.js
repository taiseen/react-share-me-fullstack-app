import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';


// 🟩 Client for retrieving, creating & patching data from Sanity.io
export const sanityConnection = sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2022-05-07',
    useCdn: true,
    token: process.env.REACT_APP_SANITY_TOKEN,
});


// 🟩 Tools to generate image urls, from Sanity content 
const builder = imageUrlBuilder(sanityConnection);


// 🟩 at FrontEnd component we just call this function & pass arguments...
export const urlFor = (source) => builder.image(source);
