import React, { useEffect, useRef } from "react";
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive-dt';

const RecentOrdersDataTable = ({ data }) => {
    const tableRef = useRef(null);

    useEffect(() => {
        // Initialize DataTable
        const table = $('#recentOrdersTable').DataTable({
            responsive: true,
            language: {
                lengthMenu: "Show _MENU_ entries",
                search: "Search:",
                info: "Showing _START_ to _END_ of _TOTAL_ entries",
                paginate: {
                    first: "<<",
                    last: "<",
                    next: ">",
                    previous: ">>"
                }
            },
            pageLength: 5,
            lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
            order: [[0, 'desc']],
            columns: [
                { data: 'orderId' },
                { data: 'customer' },
                { data: 'date' },
                {
                    data: 'items',
                    render: function (data, type, row) {
                        if (Array.isArray(data)) {
                            return `<span class="items-count">${data.length} items</span>
                                    <div class="items-preview">${data.slice(0, 2).map(item =>
                                `<span class="item-tag">${item.name} (x${item.quantity})</span>`
                            ).join('')}${data.length > 2 ?
                                `<span class="more-items">+${data.length - 2} more</span>` : ''}
                                    </div>`;
                        }
                        return `<span class="items-count">${data} items</span>`;
                    }
                },
                {
                    data: 'status',
                    render: function (data, type, row) {
                        const statusClass = data === 'completed' ? 'completed' :
                            data === 'pending' ? 'pending' :
                                data === 'processing' ? 'processing' : 'cancelled';
                        const statusText = data.charAt(0).toUpperCase() + data.slice(1);
                        return `<span class="badge ${statusClass}">${statusText}</span>`;
                    }
                },
                {
                    data: null,
                    render: function (data, type, row) {
                        return `
                            <div class="actionButtons">
                                <button class="actionBtn view" data-id="${row.id}" title="View Details">
                                    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z"/></svg>
                                </button>
                                <button class="actionBtn edit" data-id="${row.id}" title="Edit Order">
                                    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M416.9 85.2L372 130.1L509.9 268L554.8 223.1C568.4 209.6 576 191.2 576 172C576 152.8 568.4 134.4 554.8 120.9L519.1 85.2C505.6 71.6 487.2 64 468 64C448.8 64 430.4 71.6 416.9 85.2zM338.1 164L122.9 379.1C112.2 389.8 104.4 403.2 100.3 417.8L64.9 545.6C62.6 553.9 64.9 562.9 71.1 569C77.3 575.1 86.2 577.5 94.5 575.2L222.3 539.7C236.9 535.6 250.2 527.9 261 517.1L476 301.9L338.1 164z"/></svg>
                                </button>
                                <button class="actionBtn delete" data-id="${row.id}" title="Delete Order">
                                    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg>
                                </button>
                            </div>
                        `;
                    },
                    orderable: false
                }
            ],
            data: data,
            columnDefs: [
                {
                    targets: [3], // Items column index (now index 3 since we removed 2 columns)
                    className: 'dt-center'
                }
            ]
        });

        // Store table instance in ref
        tableRef.current = table;

        // Date range filter function
        $.fn.dataTable.ext.search.push(
            function (settings, data, dataIndex) {
                const fromDate = $('#fromDate').val();
                const toDate = $('#toDate').val();

                if (!fromDate && !toDate) {
                    return true;
                }

                const orderDate = new Date(data[2]); // Date column is still index 2
                const from = new Date(fromDate);
                const to = new Date(toDate);

                if (fromDate && !toDate) {
                    return orderDate >= from;
                }
                if (!fromDate && toDate) {
                    return orderDate <= to;
                }
                return orderDate >= from && orderDate <= to;
            }
        );

        // Apply filter button click
        $('#applyFilter').on('click', function () {
            table.draw();
        });

        // Reset filter button click
        $('#resetFilter').on('click', function () {
            $('#fromDate').val('');
            $('#toDate').val('');
            table.draw();
        });

        // Handle action button clicks
        $('#recentOrdersTable').on('click', '.actionBtn', function () {
            const id = $(this).data('id');
            const action = $(this).hasClass('view') ? 'view' :
                $(this).hasClass('edit') ? 'edit' : 'delete';

            console.log(`${action} clicked for order ${id}`);

            // Implement your action logic here
            if (action === 'view') {
                // View order details
                alert(`View order ${id}`);
            } else if (action === 'edit') {
                // Edit order
                alert(`Edit order ${id}`);
            } else if (action === 'delete') {
                // Delete order
                if (confirm(`Are you sure you want to delete order ${id}?`)) {
                    console.log(`Deleting order ${id}`);
                    // Add your delete logic here
                }
            }
        });

        // Cleanup on unmount
        return () => {
            if (tableRef.current) {
                tableRef.current.destroy();
            }
            // Remove custom filter
            $.fn.dataTable.ext.search.pop();
        };
    }, []);

    return (
        <div className="dataTableContainer">
            <table
                id="recentOrdersTable"
                style={{ width: "100%" }}
                className="display responsive nowrap"
            >
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Data will be populated by DataTables */}
                </tbody>
            </table>

            <style jsx>{`
                .dataTableContainer {
                    overflow-x: auto;
                    margin-top: 20px;
                }

                :global(#recentOrdersTable) {
                    border-collapse: collapse;
                    width: 100%;
                    margin: 0;
                }

                :global(#recentOrdersTable thead th) {
                    background-color: #f8fafc;
                    padding: 8px 6px;
                    border-bottom: 1px solid #000000;
                    color: #000000;
                    text-align: left;
                    font-weight: 600;
                    white-space: nowrap;
                }

                :global(#recentOrdersTable tbody td) {
                    padding: 8px 6px;
                    border-bottom: 1px solid #000000;
                    color: #000000;
                    vertical-align: top;
                    font-size: 14px;
                }

                :global(#recentOrdersTable tbody tr:hover) {
                    background-color: #f8fafc;
                }

                /* Action Buttons */
                :global(.actionButtons) {
                    display: flex;
                    gap: 8px;
                    justify-content: center;
                }

                :global(.actionBtn) {
                    width: 32px;
                    height: 32px;
                    border-radius: 6px;
                    border: 1px solid #e2e8f0;
                    background: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s;
                    color: #718096;
                }

                :global(.actionBtn:hover) {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                :global(.actionBtn.view:hover) {
                    background: #4299e1;
                    color: white;
                    border-color: #4299e1;
                }

                :global(.actionBtn.edit:hover) {
                    background: #48bb78;
                    color: white;
                    border-color: #48bb78;
                }

                :global(.actionBtn.delete:hover) {
                    background: #f56565;
                    color: white;
                    border-color: #f56565;
                }

                :global(.actionBtn svg) {
                    width: 16px;
                    height: 16px;
                }

                /* Status badges */
                :global(.badge) {
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    display: inline-block;
                    text-align: center;
                    min-width: 80px;
                }

                :global(.badge.completed) {
                    background: #d1fae5;
                    color: #065f46;
                    border: 1px solid #a7f3d0;
                }

                :global(.badge.pending) {
                    background: #fef3c7;
                    color: #92400e;
                    border: 1px solid #fde68a;
                }

                :global(.badge.processing) {
                    background: #dbeafe;
                    color: #1e40af;
                    border: 1px solid #bfdbfe;
                }

                :global(.badge.cancelled) {
                    background: #fecaca;
                    color: #991b1b;
                    border: 1px solid #fca5a5;
                }

                /* Items column styling */
                :global(.items-count) {
                    display: block;
                    font-weight: 600;
                    color: #4a5568;
                    margin-bottom: 4px;
                    font-size: 13px;
                }

                :global(.items-preview) {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4px;
                }

                :global(.item-tag) {
                    background: #e2e8f0;
                    color: #4a5568;
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 11px;
                    white-space: nowrap;
                }

                :global(.more-items) {
                    background: #667eea;
                    color: white;
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 11px;
                    font-weight: 600;
                }

                /* DataTables custom styles */
                :global(.dataTables_wrapper .dataTables_length),
                :global(.dataTables_wrapper .dataTables_filter),
                :global(.dataTables_wrapper .dataTables_info),
                :global(.dataTables_wrapper .dataTables_paginate) {
                    padding: 10px 0;
                    color: #718096;
                }

                :global(.dataTables_wrapper .dataTables_filter input) {
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                    padding: 6px 12px;
                    margin-left: 10px;
                }

                :global(.dataTables_wrapper .dataTables_length select) {
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                    padding: 6px 12px;
                    margin: 0 5px;
                }

                :global(.dataTables_wrapper .dataTables_paginate .paginate_button) {
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                    padding: 6px 12px;
                    margin: 0 2px;
                    color: #667eea;
                }

                :global(.dataTables_wrapper .dataTables_paginate .paginate_button:hover) {
                    background: #667eea;
                    color: white !important;
                    border-color: #667eea;
                }

                :global(.dataTables_wrapper .dataTables_paginate .paginate_button.current) {
                    background: #667eea;
                    color: white !important;
                    border-color: #667eea;
                }

                @media (max-width: 768px) {
                    :global(#recentOrdersTable) {
                        font-size: 14px;
                    }
                }
            `}</style>
        </div>
    );
};

export default RecentOrdersDataTable;