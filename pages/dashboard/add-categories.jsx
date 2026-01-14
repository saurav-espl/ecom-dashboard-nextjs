import React from "react";
import Layout from "./layout";
import { requireAuth } from "../../lib/requireAuth";
export const getServerSideProps = requireAuth;

const AddCategoriesPage = () => {
    return (
        <Layout>
            <div className="dashContent">
                <h1 className="pageTitle">Add Categories</h1>
            </div>
        </Layout>
    );
};

export default AddCategoriesPage;
