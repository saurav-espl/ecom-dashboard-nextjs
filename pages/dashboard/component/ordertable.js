import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive-dt';

const DataTableComponent = () => {
  useEffect(() => {
    const table = $("#ordertable").DataTable({
      language: {
        lengthMenu: "Show _MENU_ entries",
      },
      initComplete: function () {
        this.api()
          .columns()
          .every(function () {
            const column = this;
            const header = $(column.header());
            if (header.hasClass('no-filter')) {
              return;
            }
            // const filterIcon = $('<span class="filter-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/></svg></span>');
            // header.append(filterIcon);
            // filterIcon.on('click', function () {
            //   column.search('').draw();
            // });
          });
      },
    });
  }, []);

  const data = [
    {
      id: 1,
      date: "05 May 2024",
      customer: "Kishan Rajput",
      payment: "Pending",
      total: "120",
      items: "1",
      fulfilment: "Unfulfilled",
    },
    {
      id: 2,
      date: "06 May 2024",
      customer: "Amit Kumar",
      payment: "Success",
      total: "120",
      items: "1",
      fulfilment: "Fulfilled",
    },
    {
      id: 3,
      date: "12 June 2024",
      customer: "Jeetu Prajapati",
      payment: "Pending",
      total: "520",
      items: "6",
      fulfilment: "Fulfilled",
    },
  ];

  const getPaymentClass = (paymentStatus) => {
    return paymentStatus === 'Success' ? 'success-payment' : 'pending-payment';
  };

  const getfulfilmentClass = (fulfilmentStauts) => {
    return fulfilmentStauts === 'Fulfilled' ? 'fulfilled' : 'unfulfilled';
  };

  return (
    <table id="ordertable" className="display" style={{ width: "100%" }}>
      <thead>
        <tr>
          <th className="no-filter">Order ID</th>
          <th>Date</th>
          <th>Customer</th>
          <th>Payment</th>
          <th>Total</th>
          <th>Items</th>
          <th>Fulfilment</th>
          <th className="no-filter">View</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td className="no-reorder">#{row.id}</td>
            <td>{row.date}</td>
            <td>{row.customer}</td>
            <td className={getPaymentClass(row.payment)}>{row.payment}</td>
            <td>{row.total}</td>
            <td>{row.items}</td>
            <td className={getfulfilmentClass(row.fulfilment)}>{row.fulfilment}</td>
            <td>View</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTableComponent;
