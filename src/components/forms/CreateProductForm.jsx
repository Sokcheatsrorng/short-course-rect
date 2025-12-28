
import { useForm } from "react-hook-form"
import { toast, ToastContainer } from "react-toastify";
import { useCreateProductMutation } from "../../redux/services/ecommerce/ecommerceApi";
import { useSingleFileUploadMutation } from "../../redux/services/upload/upload";


export default function CreateProductForm() {

    // create Product Using RTK
    const [createProduct, data] = useCreateProductMutation();
    const [uploadfile, result] = useSingleFileUploadMutation();

    const notify = () => toast("Create SuccessFully...");
    const {
        register, //connect with input form
        handleSubmit //perform when form valid
    } = useForm();


    // create handle submit
    const submitdata = async(data) => {


        {/* {
             "title": "New Product",
            "price": 10,
            "description": "A description",
            "categoryId": 1,
            "images": ["https://placehold.co/600x400"]
            } */}

        try {


            // const formData = new FormData();
            // formData.append("name", data.name);
            // formData.append("email", data.email);
            // formData.append("file", data.file[0]);
            // console.log("the value of formData: ", formData);

            // upload file 

            const rsUploadFile = await uploadfile(data?.file[0]).unwrap();
            console.log("The data of file: ",rsUploadFile?.location )

            {
                result ? (

                    createProduct({
                        title: data?.title,
                        price: data?.price,
                        description: data?.description,
                        categoryId: data?.category,
                        images: [rsUploadFile?.location]
                    }).unwrap()

                ) : (
                    <p>Failed to upload file</p>
                )
            }

        } catch (error) {
            console.log(error)
        }

    }
    return (

        <div>
            {
                data ? (
                    <div>
                        <p>Title: {data?.title}</p>
                    </div>
                ) : (
                    <div>No data</div>
                )
            }




            <div className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
                <form onSubmit={handleSubmit(submitdata)}>


                    <div className="flex items-start flex-col justify-start">
                        <label
                            htmlFor="title"
                            className="text-sm text-gray-700 dark:text-gray-200 mr-2"
                        >
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            {...register("title")}
                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-start flex-col justify-start">
                        <label
                            htmlFor="description"
                            className="text-sm text-gray-700 dark:text-gray-200 mr-2"
                        >
                            description:
                        </label>
                        <input
                            type="description"
                            id="description"
                            name="description"
                            {...register("description")}
                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-start flex-col justify-start">
                        <label
                            htmlFor="price"
                            className="text-sm text-gray-700 dark:text-gray-200 mr-2"
                        >
                            Price:
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            {...register("price")}
                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-start flex-col justify-start">
                        <label
                            htmlFor="category"
                            className="text-sm text-gray-700 dark:text-gray-200 mr-2"
                        >
                            Category:
                        </label>
                        <input
                            type="number"
                            id="category"
                            name="category"
                            {...register("category")}
                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* upload file */}
                    <div className="flex items-start flex-col justify-start">
                        <label
                            htmlFor="image"
                            className="text-sm text-gray-700 dark:text-gray-200 mr-2"
                        >
                            Product Image:
                        </label>
                        <input
                            type="file"
                            id="file"
                            name="fileImage"
                            {...register("file")}
                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={notify}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
                    >
                        Create Product
                    </button>

                    {/* add toast container */}
                    <ToastContainer />
                </form>

            </div>
        </div>


    )
}