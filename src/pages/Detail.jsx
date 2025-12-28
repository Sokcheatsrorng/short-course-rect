import { useParams } from "react-router-dom";
import DetailProduct from "../components/ProductDetail";
import { useGetProductByIdQuery } from "../redux/services/ecommerce/ecommerceApi";

export default function DetailPage() {

    const { proId } = useParams();
    console.log("The product id: ", proId)

    const {data} = useGetProductByIdQuery(proId);
    const productById=data;

    // const [productById, setProductById]= useState({});
    // useEffect(() => {
    //     async function FetchSingleProduct() {
    //         const res = await fetch(`https://api.escuelajs.co/api/v1/products/${proId}`);
    //         if (!res.ok) {
    //             throw new Error("Product not found");
    //         }
            
    //         const data= await res.json();
    //         setProductById(data);
    //         return res.json();
    //     }
    //     FetchSingleProduct();
    // },[proId])

    return (
        <>
          
            <DetailProduct
               title={productById?.title}
               image={productById?.images}
               desc={productById?.desc}
               price={productById?.price}
            />
        </>
    )
}


