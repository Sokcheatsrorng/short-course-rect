import { useState } from "react";
import { useForm } from "react-hook-form"
import { toast, ToastContainer } from "react-toastify";

export default function TestForm() {

    // create state and using with useEffect to handlesubmit to api 
    const [data, setData] = useState({});
    // create hookform by using useform

     const notify = () => toast("Register...");
    const {
        register, //connect with input form
        handleSubmit //perform when form valid
    } = useForm();

    const baseUrl = "https://pteahbay-api.cheatdev.online";


    // create handle submit
    const submitdata = async(data) => {
        // console.log("Data when input: ",data )

        // logical which we need to submit to backend 
        // {
        //     "username": "Cheat007",
        //         "email": "cheat007@gmail.com",
        //             "password": "Cheat007",
        //                 "full_name": "Sokcheat007"
        // }

        try{

            const res = await fetch(`${baseUrl}/auth/register`,{
                method: 'POST', 
                headers:{
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(data)
            });

            const userData = await res.json(); 
            setData(userData); 
            return userData;
        }catch(error){
            console.log(error)
        }

    }
    return (

        <div>
            {
                data? (
                    <div>
                        <p>FullName: {data?.full_name}</p>
                    </div>
                ):(
                    <div>No data</div>
                )
            }

        <div className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
            <form onSubmit={handleSubmit(submitdata)}>
              
    
                <div className="flex items-start flex-col justify-start">
                    <label
                        htmlFor="username"
                        className="text-sm text-gray-700 dark:text-gray-200 mr-2"
                    >
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        {...register("username")}
                        className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-start flex-col justify-start">
                    <label
                        htmlFor="email"
                        className="text-sm text-gray-700 dark:text-gray-200 mr-2"
                    >
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        {...register("email")}
                        className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-start flex-col justify-start">
                    <label
                        htmlFor="password"
                        className="text-sm text-gray-700 dark:text-gray-200 mr-2"
                    >
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        {...register("password")}
                        className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-start flex-col justify-start">
                    <label
                        htmlFor="FullName"
                        className="text-sm text-gray-700 dark:text-gray-200 mr-2"
                    >
                        Full Name:
                    </label>
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        {...register("full_name")}
                        className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    onClick={notify}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
                >
                    Register
                </button>

                {/* add toast container */}
                <ToastContainer />
            </form>
            <div className="mt-4 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-300">
                    Already have an account?{" "}
                </span>
                <a href="#" className="text-blue-500 hover:text-blue-600">
                    Login
                </a>
            </div>
        </div>
        </div>

     
    )
}