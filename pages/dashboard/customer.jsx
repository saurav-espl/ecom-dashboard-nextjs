import React, { useState, useEffect } from "react";
import Layout from "./layout";
import CustomersTable from "./component/customertable";
import { requireAuth } from "../../lib/requireAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUserPlus,
  faSearch,
  faFilter,
  faDownload,
  faUpload,
  faSync,
  faUserCheck,
  faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export const getServerSideProps = requireAuth;

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedCustomers, setSelectedCustomers] = useState(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [bulkAction, setBulkAction] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch customers from API
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Transform user data to customer format
      const formattedCustomers = data.map((user, index) => ({
        id: user._id || user.id || index + 1,
        name: user.name || "Unknown Customer",
        role: user.role || "user",
        email: user.email || "No email",
        phone: user.phone || "+91 9876543210",
        address: user.address || "Address not provided",
        // Map user role to customer type - assuming admin = Verified, user = Unverified
        customer_type: user.role === "admin" ? "Verified" : "Unverified",
        // For status, we can use active/inactive based on some logic
        // Since your User model doesn't have a status field, we'll use "active" as default
        status: "active", // Default status since User model doesn't have status field
        createdAt: user.createdAt || new Date().toISOString(),
        // Calculate total orders and spent from user's order data (if available)
        // You'll need to fetch this separately or add to your User model
        totalOrders: user.totalOrders || 0,
        totalSpent: user.totalSpent || 0,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'Customer')}&background=667eea&color=fff`,
      }));

      setCustomers(formattedCustomers);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError("Failed to load customers. Please try again.");

      // Fallback to mock data using User schema structure
      const mockCustomers = [
        {
          id: 1,
          name: "Amit Sharma",
          email: "amit@example.com",
          phone: "+91 9876543210",
          address: "Mumbai, Maharashtra",
          customer_type: "Verified",
          status: "active",
          createdAt: "2024-01-10T00:00:00.000Z",
          totalOrders: 5,
          totalSpent: 12500,
          avatar: "https://ui-avatars.com/api/?name=Amit+Sharma&background=667eea&color=fff"
        },
        {
          id: 2,
          name: "Kishan Patel",
          email: "kishan@example.com",
          phone: "+91 9876543211",
          address: "Ahmedabad, Gujarat",
          customer_type: "Verified",
          status: "active",
          createdAt: "2024-01-05T00:00:00.000Z",
          totalOrders: 3,
          totalSpent: 8900,
          avatar: "https://ui-avatars.com/api/?name=Kishan+Patel&background=667eea&color=fff"
        },
        {
          id: 3,
          name: "Ravi Kumar",
          email: "ravi@example.com",
          phone: "+91 9876543212",
          address: "Delhi, Delhi",
          customer_type: "Unverified",
          status: "active",
          createdAt: "2024-01-08T00:00:00.000Z",
          totalOrders: 0,
          totalSpent: 0,
          avatar: "https://ui-avatars.com/api/?name=Ravi+Kumar&background=667eea&color=fff"
        },
      ];
      setCustomers(mockCustomers);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort customers
  const sortCustomers = (customersList) => {
    return [...customersList].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'totalOrders' || sortConfig.key === 'totalSpent') {
        aValue = a[sortConfig.key] || 0;
        bValue = b[sortConfig.key] || 0;
      } else if (sortConfig.key === 'createdAt') {
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
      } else if (sortConfig.key === 'name' || sortConfig.key === 'email') {
        aValue = (a[sortConfig.key] || '').toLowerCase();
        bValue = (b[sortConfig.key] || '').toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  // Get customer statistics
  const getCustomerStats = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return {
      total: customers.length,
      active: customers.filter(c => c.status === 'active').length,
      verified: customers.filter(c => c.customer_type === 'Verified').length,
      unverified: customers.filter(c => c.customer_type === 'Unverified').length,
      totalOrders: customers.reduce((sum, c) => sum + (c.totalOrders || 0), 0),
      totalRevenue: customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0),
      avgOrders: customers.length > 0 ?
        (customers.reduce((sum, c) => sum + (c.totalOrders || 0), 0) / customers.length).toFixed(1) : 0,
      newThisMonth: customers.filter(c => {
        if (!c.createdAt) return false;
        const created = new Date(c.createdAt);
        return created.getMonth() === currentMonth && created.getFullYear() === currentYear;
      }).length
    };
  };

  const stats = getCustomerStats();

  const handleBulkAction = () => {
    if (!bulkAction || selectedCustomers.size === 0) return;

    const selectedIds = Array.from(selectedCustomers);
    const selectedCustomersData = customers.filter(c => selectedIds.includes(c.id));

    switch (bulkAction) {
      case 'export':
        console.log('Exporting customers:', selectedIds);
        // You would implement export functionality here
        break;
      case 'delete':
        if (confirm(`Are you sure you want to delete ${selectedIds.length} customers?`)) {
          // Call API to delete users
          selectedIds.forEach(async (id) => {
            try {
              await fetch(`/api/users/${id}`, {
                method: 'DELETE',
              });
              // Refresh the customers list
              fetchCustomers();
            } catch (error) {
              console.error('Error deleting customer:', error);
            }
          });
        }
        break;
      case 'verify':
        // Update users to verified status
        selectedIds.forEach(async (id) => {
          try {
            await fetch(`/api/users/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ role: 'admin' }), // Assuming admin = Verified
            });
            fetchCustomers();
          } catch (error) {
            console.error('Error verifying customer:', error);
          }
        });
        break;
      case 'unverify':
        selectedIds.forEach(async (id) => {
          try {
            await fetch(`/api/users/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ role: 'user' }), // Assuming user = Unverified
            });
            fetchCustomers();
          } catch (error) {
            console.error('Error unverifying customer:', error);
          }
        });
        break;
      case 'activate':
        // Since User model doesn't have status, you might need to add it
        // or handle activation differently
        console.log('Activating customers:', selectedIds);
        break;
      case 'deactivate':
        console.log('Deactivating customers:', selectedIds);
        break;
    }

    setBulkAction("");
    setSelectedCustomers(new Set());
    setShowBulkActions(false);
  };

  const handleSelectAll = () => {
    const visibleIds = filteredCustomers.map(c => c.id);
    if (selectedCustomers.size === visibleIds.length) {
      setSelectedCustomers(new Set());
    } else {
      setSelectedCustomers(new Set(visibleIds));
    }
  };

  const handleCustomerSelection = (customerId, isChecked) => {
    const newSelected = new Set(selectedCustomers);
    if (isChecked) {
      newSelected.add(customerId);
    } else {
      newSelected.delete(customerId);
    }
    setSelectedCustomers(newSelected);
  };

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch =
      (customer.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.phone || '').includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    const matchesType = typeFilter === 'all' || customer.customer_type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Sort filtered customers
  const sortedCustomers = sortCustomers(filteredCustomers);

  // Pagination
  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCustomers = sortedCustomers.slice(startIndex, endIndex);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Add missing icon import
  const faUserPlus = require('@fortawesome/free-solid-svg-icons').faUserPlus;

  return (
    <Layout>
      <div className="dashContent">
        {/* Page Header */}
        <div className="pageHeader">
          <div className="headerLeft">
            <h1 className="pageTitle">
              <FontAwesomeIcon icon={faUsers} /> Customers
            </h1>
            <p className="pageSubtitle">
              Manage and analyze your customer base
            </p>
          </div>
          <div className="headerRight">
            <Link href="/dashboard/customers/add" className="btnPrimary">
              <FontAwesomeIcon icon={faUserPlus} /> Add Customer
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="summaryCards">
          <div className="summaryCard total">
            <div className="cardIcon">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <div className="cardContent">
              <h3>Total Customers</h3>
              <div className="cardValue">
                {stats.total}
              </div>
              <div className="cardSubtext">
                <span className="active">
                  {stats.active} active
                </span>
                <span className="new">
                  {stats.newThisMonth} new this month
                </span>
              </div>
            </div>
          </div>

          <div className="summaryCard active">
            <div className="cardIcon">
              <FontAwesomeIcon icon={faUserCheck} />
            </div>
            <div className="cardContent">
              <h3>Active</h3>
              <div className="cardValue">
                {stats.active}
              </div>
              <div className="cardSubtext">
                Currently active
              </div>
            </div>
          </div>

          <div className="summaryCard verified">
            <div className="cardIcon">
              <FontAwesomeIcon icon={faUserCheck} />
            </div>
            <div className="cardContent">
              <h3>Verified</h3>
              <div className="cardValue">
                {stats.verified}
              </div>
              <div className="cardSubtext">
                Email verified customers
              </div>
            </div>
          </div>

          <div className="summaryCard revenue">
            <div className="cardIcon">
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
            <div className="cardContent">
              <h3>Total Revenue</h3>
              <div className="cardValue">
                {formatCurrency(stats.totalRevenue)}
              </div>
              <div className="cardSubtext">
                From all customers
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="customersMain">
          {/* Controls Bar */}
          <div className="controlsBar">
            <div className="controlsLeft">
              <div className="searchBox">
                <FontAwesomeIcon icon={faSearch} />
                <input
                  type="text"
                  placeholder="Search customers by name, email, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="searchInput"
                />
              </div>

              <div className="filterGroup">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="filterSelect"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="filterSelect"
                >
                  <option value="all">All Types</option>
                  <option value="Verified">Verified</option>
                  <option value="Unverified">Unverified</option>
                </select>
              </div>
            </div>

            <div className="controlsRight">
              <div className="viewControls">
                <button
                  className="viewBtn"
                  title="Refresh"
                  onClick={fetchCustomers}
                >
                  <FontAwesomeIcon icon={faSync} /> Refresh
                </button>
              </div>

              <div className="exportControls">
                <button className="exportBtn" title="Export">
                  <FontAwesomeIcon icon={faDownload} /> Export
                </button>
                <button className="importBtn" title="Import">
                  <FontAwesomeIcon icon={faUpload} /> Import
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Actions Bar */}
          {showBulkActions && (
            <div className="bulkActionsBar">
              <div className="bulkInfo">
                <FontAwesomeIcon icon={faUsers} />
                <span>{selectedCustomers.size} customers selected</span>
              </div>

              <div className="bulkControls">
                <select
                  value={bulkAction}
                  onChange={(e) => setBulkAction(e.target.value)}
                  className="bulkSelect"
                >
                  <option value="">Bulk Actions</option>
                  <option value="export">Export Selected</option>
                  <option value="verify">Mark as Verified</option>
                  <option value="unverify">Mark as Unverified</option>
                  <option value="activate">Activate</option>
                  <option value="deactivate">Deactivate</option>
                  <option value="delete">Delete</option>
                </select>

                <button
                  className="bulkApplyBtn"
                  onClick={handleBulkAction}
                  disabled={!bulkAction}
                >
                  Apply
                </button>

                <button
                  className="bulkCancelBtn"
                  onClick={() => {
                    setShowBulkActions(false);
                    setSelectedCustomers(new Set());
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="loadingState">
              <div className="loadingSpinner"></div>
              <p>Loading customers...</p>
            </div>
          ) : error ? (
            <div className="errorState">
              <FontAwesomeIcon icon={faUsers} size="3x" />
              <h3>Error Loading Customers</h3>
              <p>{error}</p>
              <button onClick={fetchCustomers} className="btnPrimary">
                <FontAwesomeIcon icon={faSync} /> Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Customers Table */}
              <div className="tableWrapper">
                <CustomersTable
                  data={paginatedCustomers}
                  selectedCustomers={selectedCustomers}
                  onSelectCustomer={handleCustomerSelection}
                  onSelectAll={handleSelectAll}
                  totalCustomers={filteredCustomers.length}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  formatCurrency={formatCurrency}
                />
              </div>

              {/* Footer Controls */}
              <div className="tableFooter">
                <div className="footerLeft">
                  <span className="itemCount">
                    Showing {Math.min(endIndex, sortedCustomers.length)} of {sortedCustomers.length} customers
                  </span>

                  {selectedCustomers.size > 0 && !showBulkActions && (
                    <button
                      className="bulkSelectBtn"
                      onClick={() => setShowBulkActions(true)}
                    >
                      <FontAwesomeIcon icon={faUsers} /> {selectedCustomers.size} selected
                    </button>
                  )}
                </div>

                <div className="footerRight">
                  <div className="pagination">
                    <button
                      className="paginationBtn"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>

                    <div className="pageNumbers">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            className={`pageBtn ${currentPage === pageNum ? 'active' : ''}`}
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      className="paginationBtn"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>

                  <div className="perPageSelector">
                    <span>Show:</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setCurrentPage(1);
                        // Note: itemsPerPage is fixed in this example
                        // You would need to make it stateful to change it
                      }}
                      className="perPageSelect"
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Customer;