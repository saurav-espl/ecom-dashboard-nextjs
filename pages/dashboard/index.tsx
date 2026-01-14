import { verifyToken } from "../../lib/auth";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faDollarSign,
  faUsers,
  faBoxOpen,
  faChartLine,
  faClock,
  faCheckCircle,
  faTimesCircle,
  faExclamationCircle,
  faArrowUp,
  faArrowDown,
  faEye,
  faShoppingBag,
  faStar,
  faCalendarAlt,
  faFilter,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import type { Metadata } from "next";
import Layout from "./layout";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import jQuery and DataTables to avoid SSR issues
const RecentOrdersDataTable = dynamic(
  () => import("./RecentOrdersDataTable.jsx"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "E-Commerce Dashboard",
  description: "Manage your e-commerce store",
};

export async function getServerSideProps({ req }) {
  const user = verifyToken(req);

  if (!user) {
    return {
      redirect: {
        destination: "/dashboard/login",
        permanent: false,
      },
    };
  }

  // Mock data for dashboard - Replace with actual API calls in production
  // In your Dashboard component, update the mock data:
  const dashboardData = {
    overview: {
      totalSales: 45231.89,
      totalOrders: 1245,
      totalCustomers: 845,
      totalProducts: 156,
      salesChange: 12.5,
      ordersChange: 8.3,
      customersChange: 15.2,
      productsChange: 5.7,
    },
    recentOrders: [
      {
        id: 1,
        orderId: "#ORD-001",
        customer: "John Smith",
        date: "2024-01-15",
        items: [
          { name: "Wireless Headphones", quantity: 1, price: 199.99 },
          { name: "USB-C Cable", quantity: 2, price: 23.00 }
        ],
        status: "completed"
      },
      {
        id: 2,
        orderId: "#ORD-002",
        customer: "Emma Johnson",
        date: "2024-01-14",
        items: [
          { name: "Smart Watch Pro", quantity: 1, price: 189.50 }
        ],
        status: "pending"
      },
      {
        id: 3,
        orderId: "#ORD-003",
        customer: "Michael Brown",
        date: "2024-01-14",
        items: [
          { name: "Laptop Backpack", quantity: 1, price: 89.99 },
          { name: "Wireless Mouse", quantity: 1, price: 49.99 },
          { name: "Keyboard", quantity: 1, price: 79.99 },
          { name: "USB Hub", quantity: 1, price: 29.99 },
          { name: "Screen Protector", quantity: 2, price: 15.99 }
        ],
        status: "completed"
      },
      {
        id: 4,
        orderId: "#ORD-004",
        customer: "Sarah Davis",
        date: "2024-01-13",
        items: [
          { name: "T-shirt", quantity: 3, price: 33.33 }
        ],
        status: "processing"
      },
      {
        id: 5,
        orderId: "#ORD-005",
        customer: "Robert Wilson",
        date: "2024-01-13",
        items: [
          { name: "Camera Lens", quantity: 1, price: 324.25 }
        ],
        status: "completed"
      },
      {
        id: 6,
        orderId: "#ORD-006",
        customer: "Saurav Prajapati",
        date: "2024-01-12",
        items: [
          { name: "Smartphone", quantity: 1, price: 450.00 }
        ],
        status: "cancelled"
      },
      {
        id: 7,
        orderId: "#ORD-007",
        customer: "Lisa Anderson",
        date: "2024-01-11",
        items: [
          { name: "Tablet Case", quantity: 1, price: 39.99 },
          { name: "Stylus Pen", quantity: 1, price: 29.99 },
          { name: "Screen Cleaner", quantity: 2, price: 12.50 }
        ],
        status: "completed"
      },
      {
        id: 8,
        orderId: "#ORD-008",
        customer: "David Miller",
        date: "2024-01-10",
        items: [
          { name: "Gaming Headset", quantity: 1, price: 125.50 },
          { name: "Mouse Pad", quantity: 1, price: 25.00 },
          { name: "Webcam", quantity: 1, price: 125.00 }
        ],
        status: "pending"
      },
      {
        id: 9,
        orderId: "#ORD-009",
        customer: "Maria Garcia",
        date: "2024-01-09",
        items: [
          { name: "Monitor", quantity: 1, price: 450.00 },
          { name: "Monitor Stand", quantity: 1, price: 80.00 },
          { name: "HDMI Cable", quantity: 2, price: 45.00 }
        ],
        status: "completed"
      },
      {
        id: 10,
        orderId: "#ORD-010",
        customer: "James Wilson",
        date: "2024-01-08",
        items: [
          { name: "Power Bank", quantity: 2, price: 75.38 }
        ],
        status: "processing"
      },
      {
        id: 11,
        orderId: "#ORD-011",
        customer: "Sophia Taylor",
        date: "2024-01-07",
        items: [
          { name: "Smart Speaker", quantity: 1, price: 99.99 },
          { name: "Smart Bulbs", quantity: 4, price: 81.32 }
        ],
        status: "completed"
      },
      {
        id: 12,
        orderId: "#ORD-012",
        customer: "William Clark",
        date: "2024-01-06",
        items: [
          { name: "External SSD", quantity: 1, price: 210.00 },
          { name: "USB-C Hub", quantity: 1, price: 100.00 }
        ],
        status: "completed"
      },
    ],
    topProducts: [
      { name: "Wireless Headphones", sales: 156, revenue: 12480, rating: 4.8 },
      { name: "Smart Watch Pro", sales: 98, revenue: 19600, rating: 4.9 },
      { name: "Laptop Backpack", sales: 210, revenue: 10500, rating: 4.7 },
      { name: "USB-C Charger", sales: 312, revenue: 6240, rating: 4.5 },
      { name: "Wireless Mouse", sales: 178, revenue: 7120, rating: 4.6 },
    ],
  };

  return {
    props: {
      user,
      dashboardData
    },
  };
}

export default function Dashboard({ user, dashboardData }) {

  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.user?.name) {
          setName(data.user.name);
          console.log(data.user.name);
        }
      });
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <>
      <Layout>
        <section className="dashContent">
          {/* Welcome Header */}
          <div className="welcomeHeader">
            <div>
              <h1 className="pageTitle">Welcome back, {name || 'Admin'}! 👋</h1>
              <p className="welcomeSubtitle">Here's what's happening with your store today.</p>
            </div>
            <div className="dateDisplay">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="statsGrid">
            <div className="statCard">
              <div className="statIcon sales">
                <FontAwesomeIcon icon={faDollarSign} />
              </div>
              <div className="statInfo">
                <h3 className="statValue">{formatCurrency(dashboardData.overview.totalSales)}</h3>
                <p className="statLabel">Total Sales</p>
              </div>
              <div className={`statChange ${dashboardData.overview.salesChange > 0 ? 'positive' : 'negative'}`}>
                <FontAwesomeIcon icon={dashboardData.overview.salesChange > 0 ? faArrowUp : faArrowDown} />
                {Math.abs(dashboardData.overview.salesChange)}%
              </div>
            </div>

            <div className="statCard">
              <div className="statIcon orders">
                <FontAwesomeIcon icon={faShoppingCart} />
              </div>
              <div className="statInfo">
                <h3 className="statValue">{dashboardData.overview.totalOrders.toLocaleString()}</h3>
                <p className="statLabel">Total Orders</p>
              </div>
              <div className={`statChange ${dashboardData.overview.ordersChange > 0 ? 'positive' : 'negative'}`}>
                <FontAwesomeIcon icon={dashboardData.overview.ordersChange > 0 ? faArrowUp : faArrowDown} />
                {Math.abs(dashboardData.overview.ordersChange)}%
              </div>
            </div>

            <div className="statCard">
              <div className="statIcon customers">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div className="statInfo">
                <h3 className="statValue">{dashboardData.overview.totalCustomers.toLocaleString()}</h3>
                <p className="statLabel">Total Customers</p>
              </div>
              <div className={`statChange ${dashboardData.overview.customersChange > 0 ? 'positive' : 'negative'}`}>
                <FontAwesomeIcon icon={dashboardData.overview.customersChange > 0 ? faArrowUp : faArrowDown} />
                {Math.abs(dashboardData.overview.customersChange)}%
              </div>
            </div>

            <div className="statCard">
              <div className="statIcon products">
                <FontAwesomeIcon icon={faBoxOpen} />
              </div>
              <div className="statInfo">
                <h3 className="statValue">{dashboardData.overview.totalProducts.toLocaleString()}</h3>
                <p className="statLabel">Total Products</p>
              </div>
              <div className={`statChange ${dashboardData.overview.productsChange > 0 ? 'positive' : 'negative'}`}>
                <FontAwesomeIcon icon={dashboardData.overview.productsChange > 0 ? faArrowUp : faArrowDown} />
                {Math.abs(dashboardData.overview.productsChange)}%
              </div>
            </div>
          </div>

          {/* Charts and Recent Data Grid */}
          <div className="dataGrid">
            {/* Recent Orders with DataTables */}
            <div className="dataCard">
              <div className="cardHeader">
                <h3 className="cardTitle">
                  <FontAwesomeIcon icon={faShoppingBag} /> Recent Orders
                </h3>
                <Link href="/dashboard/order" className="viewAll">
                  View All <FontAwesomeIcon icon={faArrowUp} rotation={90} />
                </Link>
              </div>

              {/* Date Range Filter */}
              <div className="dateFilterContainer">
                <div className="filterHeader">
                  <FontAwesomeIcon icon={faFilter} />
                  <span>Filter by Date Range</span>
                </div>
                <div className="dateRangeInputs">
                  <div className="dateInputGroup">
                    <label htmlFor="fromDate">
                      <FontAwesomeIcon icon={faCalendar} /> From
                    </label>
                    <input
                      type="date"
                      id="fromDate"
                      className="dateInput"
                      defaultValue="2024-01-01"
                    />
                  </div>
                  <div className="dateInputGroup">
                    <label htmlFor="toDate">
                      <FontAwesomeIcon icon={faCalendar} /> To
                    </label>
                    <input
                      type="date"
                      id="toDate"
                      className="dateInput"
                      defaultValue="2024-01-15"
                    />
                  </div>
                  <button className="filterBtn" id="applyFilter">
                    Apply Filter
                  </button>
                  <button className="resetBtn" id="resetFilter">
                    Reset
                  </button>
                </div>
              </div>

              {/* DataTable Component */}
              <RecentOrdersDataTable data={dashboardData.recentOrders} />
            </div>

            {/* Top Products */}
            <div className="dataCard">
              <div className="cardHeader">
                <h3 className="cardTitle">
                  <FontAwesomeIcon icon={faChartLine} /> Top Products
                </h3>
                <Link href="/dashboard/all-products" className="viewAll">
                  View All <FontAwesomeIcon icon={faArrowUp} rotation={90} />
                </Link>
              </div>
              <div className="productsList">
                {dashboardData.topProducts.map((product, index) => (
                  <div key={index} className="productItem">
                    <div className="productInfo">
                      <div className="productName">{product.name}</div>
                      <div className="productMeta">
                        <span className="salesCount">{product.sales} sold</span>
                        <span className="productRating">
                          <FontAwesomeIcon icon={faStar} /> {product.rating}
                        </span>
                      </div>
                    </div>
                    <div className="productRevenue">
                      <div className="revenueAmount">{formatCurrency(product.revenue)}</div>
                      <div className="revenueLabel">Revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quickActions">
            <h3 className="sectionTitle">Quick Actions</h3>
            <div className="actionsGrid">
              <Link href="/dashboard/add-products" className="actionCard">
                <div className="actionIcon">
                  <FontAwesomeIcon icon={faBoxOpen} />
                </div>
                <h4>Add New Product</h4>
                <p>Add a new product to your store</p>
              </Link>

              <Link href="/dashboard/order" className="actionCard">
                <div className="actionIcon">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </div>
                <h4>Manage Orders</h4>
                <p>View and process customer orders</p>
              </Link>

              <Link href="/dashboard/customer" className="actionCard">
                <div className="actionIcon">
                  <FontAwesomeIcon icon={faUsers} />
                </div>
                <h4>Customer Management</h4>
                <p>View and manage customer data</p>
              </Link>

              <Link href="/dashboard/analytics" className="actionCard">
                <div className="actionIcon">
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
                <h4>Sales Analytics</h4>
                <p>View detailed sales reports</p>
              </Link>
            </div>
          </div>
        </section>
      </Layout>

      <style jsx>{`
        .welcomeHeader {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 30px;
          padding: 20px;
          background: linear-gradient(135deg, #070707 0%, #090909 100%);
          border-radius: 15px;
          color: white;
        }

        .pageTitle {
          font-size: 28px;
          margin: 0;
          color: white;
        }

        .welcomeSubtitle {
          margin: 10px 0 0;
          opacity: 0.9;
          font-size: 16px;
        }

        .dateDisplay {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.2);
          padding: 10px 20px;
          border-radius: 50px;
          font-weight: 500;
        }

        .statsGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .statCard {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          gap: 20px;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .statCard:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .statIcon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
        }

        .statIcon.sales {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .statIcon.orders {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .statIcon.customers {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .statIcon.products {
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        }

        .statInfo {
          flex: 1;
        }

        .statValue {
          font-size: 24px;
          font-weight: 700;
          margin: 0;
          color: #2d3748;
        }

        .statLabel {
          margin: 5px 0 0;
          color: #718096;
          font-size: 14px;
        }

        .statChange {
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .statChange.positive {
          color: #10b981;
        }

        .statChange.negative {
          color: #ef4444;
        }

        .dataGrid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 30px;
          margin-bottom: 30px;
          position: relative;
        }

        @media (max-width: 1024px) {
          .dataGrid {
            grid-template-columns: 1fr;
          }
        }

        .dataCard {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 0px;
          height: fit-content;
        }

        .cardHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .cardTitle {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #2d3748;
        }

        .viewAll {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: color 0.3s;
        }

        .viewAll:hover {
          color: #764ba2;
        }

        /* Date Range Filter Styles */
        .dateFilterContainer {
          background: #f8fafc;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 20px;
          border: 1px solid #e2e8f0;
        }

        .filterHeader {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
          color: #4a5568;
          font-weight: 600;
        }

        .dateRangeInputs {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          align-items: flex-end;
        }

        .dateInputGroup {
          flex: 1;
          min-width: 150px;
          font-family: inherit;
        }

        .dateInputGroup label {
          display: block;
          margin-bottom: 8px;
          color: #4a5568;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: inherit;
        }

        .dateInput {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          color: #2d3748;
          background: white;
          transition: border 0.3s;
          font-family: inherit;
        }

        .dateInput:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .filterBtn, .resetBtn {
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          height: fit-content;
          font-family: inherit;
        }

        .filterBtn {
          background: #667eea;
          color: white;
          font-family: inherit;
        }

        .filterBtn:hover {
          background: #5a6fd8;
        }

        .resetBtn {
          background: #e2e8f0;
          color: #4a5568;
          font-family: inherit;
        }

        .resetBtn:hover {
          background: #cbd5e0;
        }

        /* DataTables Custom Styles */
        :global(.dataTables_wrapper) {
          margin-top: 20px;
        }

        :global(.dataTables_length) {
          margin-bottom: 15px;
        }

        :global(.dataTables_length select) {
          padding: 5px 10px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
        }

        :global(.dataTables_filter input) {
          padding: 5px 10px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          margin-left: 10px;
        }

        :global(.dataTables_info) {
          color: #718096;
          padding-top: 15px;
        }

        :global(.dataTables_paginate) {
          margin-top: 15px;
        }

        :global(.paginate_button) {
          padding: 5px 10px;
          margin: 0 2px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          color: #667eea;
          cursor: pointer;
        }

        :global(.paginate_button:hover) {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        :global(.paginate_button.current) {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        /* Status Badges */
        :global(.badge) {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        :global(.badge.completed) {
          background: #d1fae5;
          color: #065f46;
        }

        :global(.badge.pending) {
          background: #fef3c7;
          color: #92400e;
        }

        :global(.badge.processing) {
          background: #dbeafe;
          color: #1e40af;
        }

        .productsList {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .productItem {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border-radius: 10px;
          background: #f8fafc;
          transition: background 0.3s;
        }

        .productItem:hover {
          background: #e2e8f0;
        }

        .productName {
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 5px;
        }

        .productMeta {
          display: flex;
          gap: 15px;
          font-size: 13px;
          color: #718096;
        }

        .productRating {
          color: #f59e0b;
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .productRevenue {
          text-align: right;
        }

        .revenueAmount {
          font-weight: 700;
          color: #2d3748;
          font-size: 16px;
        }

        .revenueLabel {
          font-size: 12px;
          color: #718096;
          margin-top: 2px;
        }

        .quickActions {
          margin-top: 30px;
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .sectionTitle {
          font-size: 20px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 20px;
        }

        .actionsGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .actionCard {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          text-decoration: none;
          color: inherit;
          transition: all 0.3s;
          border: 2px solid transparent;
        }

        .actionCard:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          border-color: #667eea;
        }

        .actionIcon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
          margin-bottom: 15px;
        }

        .actionCard h4 {
          margin: 0 0 10px;
          color: #2d3748;
          font-size: 16px;
        }

        .actionCard p {
          margin: 0;
          color: #718096;
          font-size: 14px;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .dashContent {
            padding: 15px;
          }

          .welcomeHeader {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .statsGrid {
            grid-template-columns: 1fr;
          }

          .dateRangeInputs {
            flex-direction: column;
          }

          .dateInputGroup {
            width: 100%;
          }

          .filterBtn, .resetBtn {
            width: 100%;
          }

          .actionsGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}