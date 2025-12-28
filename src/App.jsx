import { Suspense } from 'react'
import './App.css'
import ProductCardList from './components/ProductComponent';
import LoadingComponent from './components/LoadingComponent';
import NavbarComponent from './components/navigations/NavbarComponent';
import { useGetAllProductsQuery } from './redux/services/ecommerce/ecommerceApi';

function App() {

  //const [state, setState] = useState(0); // initializevalue = 0
  // const [products, setProducts] = useState([]);//products=[]

  // getter, setter 

  // handleOnFetching Data from API 
  // useEffect(() => {

  //   async function FetchingData() {
  //     const res = await fetch('https://api.escuelajs.co/api/v1/products');
  //     const data = await res.json();
  //     console.log("the whole data: ", data)
  //     // const titleFromAPI = data.map(data => data.title);
  //     setProducts(data);
  //     return data;
  //   }

  //   FetchingData();

  // }, [])

  // use RTK Query to query data or all products
  const {data, isLoading, error}= useGetAllProductsQuery([]);
  let products = data;
  console.log(isLoading); 
  console.log(error);
  
  console.log("the products data: ",products);
  
  return (
    <>

       {/* render product cards */}
      <div className='grid grid-cols-4 gap-8 p-4 '>
        {/* <LoadingComponent/> */}
        {/* added suspense  */}
        <Suspense fallback={<LoadingComponent />}>
          {
            products?.map((pro) => (
              <ProductCardList
                key={pro?.id} //using for remark as difference unique components
                id={pro?.id}
                title={pro.title}
                description={pro.description}
                price={pro.price}
                image={pro?.images[0]}
              />
            ))
          }
        </Suspense>
      </div>
    </>

  )
}
export default App
