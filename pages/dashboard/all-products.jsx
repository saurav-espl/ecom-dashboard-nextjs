import React from "react";
import Layout from "./layout";
import AllProducDataTable from "./component/allproductstable";
import { requireAuth } from "../../lib/requireAuth";
export const getServerSideProps = requireAuth;

const dummyProducts = [
    { id: 1, name: "Product 1", type: "Variant", sku: "Test001", price: 100, status: "Publish" },
    { id: 2, name: "Product 2", type: "Simple", sku: "Test002", price: 150, status: "Draft" },
    { id: 3, name: "Product 3", type: "Variant", sku: "Test003", price: 200, status: "Publish" },
    { id: 4, name: "Product 4", type: "Simple", sku: "Test004", price: 120, status: "Draft" },
    { id: 5, name: "Product 5", type: "Variant", sku: "Test005", price: 180, status: "Publish" },
];

const AllProductsPage = () => {

    const [products, setProducts] = React.useState(dummyProducts);

    React.useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <Layout>
            <div className="dashContent">
                <h1 className="pageTitle">All Products</h1>
                <AllProducDataTable data={products} />
            </div>
        </Layout>
    );
};

export default AllProductsPage;
