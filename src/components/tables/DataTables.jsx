import DataTable from "react-data-table-component";
import { useGetAllProductsQuery } from "../../redux/services/ecommerce/ecommerceApi";


// A super simple expandable component.
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

const columns = [
     {
        name: 'Image', 
        selector: row => (
            <img src={row.images[0]} alt="" width={50} height={50}/>
        )
    },
    {
        name: 'Title',
        selector: row => row.title,
        sortable: true,
    },
    {
        name: 'Price',
        selector: row => row.price,
    },
    {
        name: 'Cate Name', 
        selector: row => row.category.name
    }

];


export default function DataTables() {
    // get all products from api
    const {data} = useGetAllProductsQuery([]); 

    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                selectableRows
                expandableRowsComponent={ExpandedComponent}
                pagination

            />
        </div>
    )
}
