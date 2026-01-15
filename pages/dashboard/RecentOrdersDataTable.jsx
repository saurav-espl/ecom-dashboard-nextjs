import React, { useEffect, useRef } from "react";
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive-dt';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye
} from "@fortawesome/free-solid-svg-icons";

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
                                    <i class="fa-solid fa-eye"></i>
                                </button>
                                <button class="actionBtn edit" data-id="${row.id}" title="Edit Order">
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                                <button class="actionBtn delete" data-id="${row.id}" title="Delete Order">
                                    <i class="fa-solid fa-trash"></i>
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
                    color: #000000;
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
                    background: #000000;
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
                    color: #000000;
                }

                :global(.dataTables_wrapper .dataTables_paginate .paginate_button:hover) {
                    background: #000000;
                    color: white !important;
                    border-color: #000000;
                }

                :global(.dataTables_wrapper .dataTables_paginate .paginate_button.current) {
                    background: #000000;
                    color: white !important;
                    border-color: #000000;
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