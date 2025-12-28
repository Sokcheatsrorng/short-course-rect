// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import NotFoundPage from './pages/NotFound'
import DetailProduct from './components/ProductDetail'
import ErrorPage from './components/navigations/ErrorPage'
import DetailPage from './pages/Detail'
import MainLayout from './layout'
import TestForm from './components/forms/TestForms'
import UploadForm from './components/forms/UploadFileForm'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import CounterComponent from './components/counters/CounterComponent'
import CreateProductForm from './components/forms/CreateProductForm'
import DataTables from './components/tables/DataTables'

const router = createBrowserRouter([
  // add layout
  {

    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/about',
        element: <AboutPage />
      },
      {
        path: '/contact',
        element: <ContactPage />
      },

      {
        path:'/form', 
        element: <CreateProductForm/>
      },
      {
        path:'test-redux', 
        element: <CounterComponent/>
      },
      {
        path:"table-data", 
        element: <DataTables/>
      },
      // dynamic segment
      {
        path: '/product/:proId',
        element: <DetailPage />,
        // errorElement: <ErrorPage />,
        // loader: async ({ params }) => {
        //   const res = await fetch(`https://api.escuelajs.co/api/v1/products/${params.id}`);
        //   if (!res.ok) {
        //     throw new Error("Product not found");
        //   }
        //   if(res.ok){
        //        const data = await res.json();
        //        <DetailProduct
        //           title={data.title}
        //           desc={data?.description}
        //           image={data?.images[0] || ''}
        //           price={data?.price}
        //        />
        //   }
        //   return res.json();
        // }
      },
      {
        path: '*',
        element: <NotFoundPage />
      }

    ]
  }

])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  
)
