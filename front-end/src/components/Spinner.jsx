import { Circles } from 'react-loader-spinner';


// this component call from 🟨 ../component/Feed.js 🟨 <Component />
// this component call from 🟨 ../component/PinDetail.js 🟨 <Component />
// this component call from 🟨 ../component/CreatePin.js 🟨 <Component />
function Spinner({ message }) {

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <Circles
                width={70}
                height={70}
                color="#00BFFF"
                className="m-5"
            />

            <p className="text-lg text-center px-2 mt-4">
                {
                    message
                }
            </p>
        </div>
    );
}

export default Spinner;
