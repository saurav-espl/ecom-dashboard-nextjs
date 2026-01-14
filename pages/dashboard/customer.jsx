import React from "react";
import Layout from "./layout";
import DataTableComponent from "./component/customertable";
import { requireAuth } from "../../lib/requireAuth";
export const getServerSideProps = requireAuth;

const customer = [
  { id: 1, name: "Amit", email: "amit@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type: "Signup" },
  { id: 2, name: "Kishan", email: "kishan@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type: "Order" },
  { id: 3, name: "Ravi", email: "ravi@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type: "Signup" },
  { id: 4, name: "Sarthak", email: "sarthak@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type: "Order" },
  { id: 5, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
  { id: 6, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
  { id: 7, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
  { id: 8, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
  { id: 9, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
  { id: 10, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
  { id: 11, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
  { id: 12, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
  { id: 13, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
  { id: 14, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
  { id: 15, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
  { id: 16, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
  { id: 17, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
  { id: 18, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
  { id: 19, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
  { id: 20, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
  { id: 21, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
  { id: 22, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
  { id: 23, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
  { id: 24, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
  { id: 25, name: "Akhilesh", email: "akhilesh@example.com", address: "Abhi Nahi hai", phone: "+91 9878581202", customer_type:"Signup" },
];


const Customer = () => {
  return (
    <>
      <Layout>
        <section className="dashContent">
          <h1 className="pageTitle">Customer</h1>
          <DataTableComponent data={customer} />
        </section>
      </Layout>
    </>
  );
};

export default Customer;
