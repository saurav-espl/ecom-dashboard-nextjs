import React, {useEffect} from "react";
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive-dt';

const AllProducDataTable = ({ data }) => {
    useEffect(() => {
        $("#allproduct").DataTable({
          language: {
            lengthMenu: "Show _MENU_ entries",
          },
        });
      }, []);

      const getOrderStatusClass = (orderStatus) => {
        return orderStatus === 'Publish' ? 'Publish' : 'Draft';
      };

    return (
        <table id="allproduct"  style={{ width: "100%" }} className="product-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>SKU</th>
                    <th>Price</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {data.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.title}</td>
                        <td>{product.type}</td>
                        <td>{product.sku}</td>
                        <td>Rs.{product.price}</td>
                        <td className={getOrderStatusClass(product.status)}>{product.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AllProducDataTable;
