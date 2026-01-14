import React from "react";
import Layout from "./layout";
import { requireAuth } from "../../lib/requireAuth";
export const getServerSideProps = requireAuth;

const EditProductsPage = () => {
    return (
        <Layout>
            <div className="dashContent">
                <h1 className="pageTitle">Edit Products</h1>
            </div>
        </Layout>
    );
};

export default EditProductsPage;
