// this function call from 🟨 ../container/Home.js 🟨 <Component />
// this function call from 🟨 ../component/Pin.js 🟨 <Component />
// this function call from 🟨 ../component/UserProfile.js 🟨 <Component />

export const fetchUser = () => {

    const user = localStorage.getItem('user') !== 'undefined'
        ? JSON.parse(localStorage.getItem('user'))
        : localStorage.clear();

    return user;
}