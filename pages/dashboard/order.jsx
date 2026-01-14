import React from "react";
import Layout from "./layout";
import OrderTableComponent from "./component/ordertable";
import { requireAuth } from "../../lib/requireAuth";
export const getServerSideProps = requireAuth;

const New = () => {
  return (
    <>
      <Layout>
        <section className="dashContent">
          <h1 className="pageTitle">Order</h1>
          <OrderTableComponent />
        </section>
      </Layout>
    </>
  );
};

export default New;
