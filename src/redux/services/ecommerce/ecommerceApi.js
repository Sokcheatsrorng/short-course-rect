import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";


// console.log("The baseUrl: ", import.meta.VITE_FAKESTORE_BASE_URL)
const BASE_URL = "https://api.escuelajs.co/api/v1"
export const ecommerceApi = createApi({
    reducerPath: 'ecommerceApi', 
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: ()=> `/products`
        }), 
        // get product by id
        getProductById: builder.query({
            query: (id)=> `/products/${id}`
        }), 
        // create product 
        createProduct: builder.mutation({
            query: (createProduct)=> ({
                url:`/products`, 
                method: 'POST', 
                headers: {
                    'Content-Type':'application/json'
                }, 
                body: createProduct
            })
        }), 
        // product update
         updateProduct: builder.mutation({
            query: ({id, updatedProduct})=> ({
                url:`/products/${id}`, 
                method: 'PUT', 
                headers: {
                    'Content-Type':'application/json'
                }, 
                body: updatedProduct
            })
        }), 
        // delete product 
        deleteProductById: builder.mutation({
            query: (id)=> ({
                url: `/products/${id}`,
                method: "DELETE"
            })
        })
    })
})

export const {
    useGetAllProductsQuery, 
    useGetProductByIdQuery, 
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductByIdMutation
} = ecommerceApi;