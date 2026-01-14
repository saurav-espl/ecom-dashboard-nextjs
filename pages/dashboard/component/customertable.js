import React, {useEffect} from "react";
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive-dt';

const CustomersTable = ({ data }) => {
    useEffect(() => {
        $("#customers").DataTable({
          language: {
            lengthMenu: "Show _MENU_ entries",
          },
        });
      }, []);

    return (
        <table id="customers"  style={{ width: "100%" }} className="product-table">
            <thead>
                <tr>
                    <th>Customer ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Customer Type</th>
                </tr>
            </thead>
            <tbody>
                {data.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.email}</td>
                        <td>{customer.address}</td>
                        <td>{customer.customer_type}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CustomersTable;
