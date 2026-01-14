import React from "react";
import Layout from "./layout";
import { requireAuth } from "../../lib/requireAuth";
export const getServerSideProps = requireAuth;

const Billing = () => {
  return (
    <>
      <Layout>
        <section className="dashContent">
          <h1 className="pageTitle">Billing</h1>
        </section>
      </Layout>
    </>
  );
};

export default Billing;
