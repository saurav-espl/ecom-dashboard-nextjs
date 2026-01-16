import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faEnvelope,
    faPhone,
    faMapMarkerAlt,
    faCheckCircle,
    faTimesCircle,
    faEdit,
    faTrash,
    faEye,
    faShoppingCart,
    faRupeeSign,
    faCalendar,
    faSort,
    faSortUp,
    faSortDown,
    faUserShield,
    faUser as faRegularUser
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const CustomersTable = ({
    data,
    selectedCustomers,
    onSelectCustomer,
    onSelectAll,
    totalCustomers,
    sortConfig,
    onSort,
    formatCurrency
}) => {
    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return faSort;
        return sortConfig.direction === 'asc' ? faSortUp : faSortDown;
    };

    const handleDelete = (customerId, customerName) => {
        if (confirm(`Are you sure you want to delete "${customerName}"?`)) {
            console.log('Deleting customer:', customerId);
            // Here you would make an API call to delete the user
            fetch(`/api/users/${customerId}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        console.log('User deleted successfully');
                        // You might want to refresh the data here
                    }
                })
                .catch(error => console.error('Error deleting user:', error));
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <table className="dashboardTable">
            <thead>
                <tr>
                    <th width="50">
                        <input
                            type="checkbox"
                            checked={selectedCustomers.size === totalCustomers && totalCustomers > 0}
                            onChange={onSelectAll}
                            className="selectAllCheckbox"
                        />
                    </th>
                    <th>
                        <button
                            className="sortableHeader"
                            onClick={() => onSort('name')}
                        >
                            Customer
                        </button>
                    </th>
                    <th>
                        <button
                            className="sortableHeader"
                            onClick={() => onSort('email')}
                        >
                            Email
                        </button>
                    </th>
                    <th>
                        <button
                            className="sortableHeader"
                            onClick={() => onSort('phone')}
                        >
                            Phone
                        </button>
                    </th>
                    <th>
                        <button
                            className="sortableHeader"
                            onClick={() => onSort('address')}
                        >
                            Address
                        </button>
                    </th>
                    <th>
                        <button
                            className="sortableHeader"
                            onClick={() => onSort('role')}
                        >
                            Role
                        </button>
                    </th>
                    <th>
                        <button
                            className="sortableHeader"
                            onClick={() => onSort('createdAt')}
                        >
                            Joined Date
                        </button>
                    </th>
                    <th width="200">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                console.log(data),
                    data.map((customer) => {
                        const isSelected = selectedCustomers.has(customer.id);

                        return (
                            <tr key={customer.id} className={`dashboard-table-row ${isSelected ? 'selected' : ''}`}>
                                <td>
                                    <div className="dashboard-table-select">
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={(e) => onSelectCustomer(customer.id, e.target.checked)}
                                            className="dashboard-table-checkbox"
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="dashboard-table-info">
                                        <div className="customer-avatar">
                                            <img
                                                src={customer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name || 'User')}&background=667eea&color=fff`}
                                                alt={customer.name}
                                                onError={(e) => {
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name || 'User')}&background=667eea&color=fff`;
                                                }}
                                            />
                                        </div>
                                        <div className="dashboard-table-details">
                                            <div className="customer-name">{customer.name}</div>
                                            {/* <div className="dashboard-table-meta">
                                                <FontAwesomeIcon icon={faCalendar} />
                                                <span>ID: {customer.id.slice(0, 500)}...</span>
                                            </div> */}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="dashboard-table-email">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                        <a href={`mailto:${customer.email}`}>{customer.email}</a>
                                    </div>
                                </td>
                                <td>
                                    <div className="dashboard-table-phone">
                                        <FontAwesomeIcon icon={faPhone} />
                                        <a href={`tel:${customer.phone}`}>{customer.phone || 'Not provided'}</a>
                                    </div>
                                </td>
                                <td>
                                    <div className="dashboard-table-address">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        <span>{customer.address || 'Not provided'}</span>
                                    </div>
                                </td>
                                <td>
                                    <span className={`role-badge ${customer?.role}`}>
                                        {customer.role === 'admin' ? (
                                            <>
                                                <FontAwesomeIcon icon={faUserShield} />
                                                <span>Admin</span>
                                            </>
                                        ) : (
                                            <>
                                                <FontAwesomeIcon icon={faRegularUser} />
                                                <span>User</span>
                                            </>
                                        )}
                                    </span>
                                </td>
                                <td>
                                    <div className="dashboard-table-date">
                                        <FontAwesomeIcon icon={faCalendar} />
                                        <span>{formatDate(customer.createdAt)}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="dashboard-table-actions">
                                        <Link href={`/dashboard/customers/${customer.id}`} className="action-btn view">
                                            <FontAwesomeIcon icon={faEye} />
                                            <span>View</span>
                                        </Link>
                                        <Link href={`/dashboard/customers/edit/${customer.id}`} className="action-btn edit">
                                            <FontAwesomeIcon icon={faEdit} />
                                            <span>Edit</span>
                                        </Link>
                                        <button
                                            className="action-btn delete"
                                            onClick={() => handleDelete(customer.id, customer.name)}
                                            disabled={customer.role === 'admin'} // Prevent deleting admin users
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan="8"> {/* Updated colSpan to match new column count */}
                            <div className="emptyState">
                                <FontAwesomeIcon icon={faUser} size="3x" />
                                <h3>No customers found</h3>
                                <p>Try adjusting your search or filters</p>
                                <Link href="/dashboard/customers/add" className="btnPrimary">
                                    <FontAwesomeIcon icon={require('@fortawesome/free-solid-svg-icons').faUserPlus} /> Add Your First Customer
                                </Link>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>

            <style jsx>{`
                .customer-avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 2px solid #e2e8f0;
                    flex-shrink: 0;
                    background: #f8fafc;
                }

                .customer-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .dashboard-table-info {
                    min-width: 230px;
                }

                .customer-name {
                    font-weight: 600;
                    color: #2d3748;
                    font-size: 16px;
                    margin-bottom: 4px;
                }

                .dashboard-table-address {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #000000;
                    font-size: 14px;
                }

                .dashboard-table-date {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #000000;
                    font-size: 14px;
                }

                .role-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 13px;
                    font-weight: 500;
                }

                .role-badge.admin {
                    background-color: #e6f7ff;
                    color: #1890ff;
                    border: 1px solid #91d5ff;
                }

                .role-badge.user {
                    background-color: #f6ffed;
                    color: #52c41a;
                    border: 1px solid #b7eb8f;
                }

                .action-btn.delete:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .dashboard-table-actions {
                        flex-direction: column;
                    }
                    
                    // .customer-avatar {
                    //     align-self: center;
                    // }
                    
                    .dashboardTable {
                        font-size: 14px;
                    }
                    
                    .dashboard-table-actions .action-btn span {
                        display: none;
                    }
                }
            `}</style>
        </table>
    );
};

export default CustomersTable;