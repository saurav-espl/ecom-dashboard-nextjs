import React, { useState, useEffect } from "react";
import Layout from "./layout";
import AllProducDataTable from "./component/allproductstable";
import { requireAuth } from "../../lib/requireAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBox,
    faBoxOpen,
    faCheck,
    faTimes,
    faPlus,
    faFilter,
    faSearch,
    faDownload,
    faUpload,
    faChartBar,
    faTag,
    faArrowRight,
    faShoppingBag,
    faLayerGroup,
    faRupeeSign,
    faBarcode,
    faEye,
    faEdit,
    faTrash,
    faCopy,
    faSync,
    faStore,
    faSort,
    faSortUp,
    faSortDown
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export const getServerSideProps = requireAuth;

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [priceFilter, setPriceFilter] = useState("all");
    const [selectedProducts, setSelectedProducts] = useState(new Set());
    const [showBulkActions, setShowBulkActions] = useState(false);
    const [bulkAction, setBulkAction] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });
    const itemsPerPage = 10;

    // Mock data
    const mockProducts = [
        {
            id: 1,
            title: "Premium Wireless Headphones",
            type: "Variant",
            sku: "PHONE-001",
            price: 8999,
            status: "Publish",
            stock: 45,
            categories: ["Electronics", "Audio"],
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
            vendor: "SoundMaster",
            createdAt: "2024-01-10",
            updatedAt: "2024-01-15",
            featured: true
        },
        {
            id: 2,
            title: "Organic Cotton T-Shirt",
            type: "Simple",
            sku: "TSHIRT-001",
            price: 1499,
            status: "Draft",
            stock: 120,
            categories: ["Clothing", "Men"],
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
            vendor: "EcoWear",
            createdAt: "2024-01-05",
            updatedAt: "2024-01-12",
            featured: false
        },
        {
            id: 3,
            title: "Smart Watch Series 5",
            type: "Variant",
            sku: "WATCH-001",
            price: 15999,
            status: "Publish",
            stock: 28,
            categories: ["Electronics", "Wearables"],
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
            vendor: "TechGadgets",
            createdAt: "2024-01-08",
            updatedAt: "2024-01-14",
            featured: true
        },
        {
            id: 4,
            title: "Natural Bamboo Toothbrush",
            type: "Simple",
            sku: "BRUSH-001",
            price: 299,
            status: "Publish",
            stock: 0,
            categories: ["Beauty", "Eco"],
            image: "https://images.unsplash.com/photo-1765516976457-550bd5f6f708?w=400&h=400&fit=crop",
            vendor: "GreenLife",
            createdAt: "2024-01-12",
            updatedAt: "2024-01-15",
            featured: false
        },
        {
            id: 5,
            title: "Professional Camera Kit",
            type: "Variant",
            sku: "CAM-001",
            price: 45999,
            status: "Publish",
            stock: 12,
            categories: ["Electronics", "Photography"],
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
            vendor: "PhotoPro",
            createdAt: "2024-01-03",
            updatedAt: "2024-01-11",
            featured: true
        },
        {
            id: 6,
            title: "Yoga Mat Premium",
            type: "Simple",
            sku: "YOGA-001",
            price: 2499,
            status: "Draft",
            stock: 67,
            categories: ["Sports", "Fitness"],
            image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=400&fit=crop",
            vendor: "FitLife",
            createdAt: "2024-01-09",
            updatedAt: "2024-01-13",
            featured: false
        },
        {
            id: 7,
            title: "Wireless Gaming Mouse",
            type: "Variant",
            sku: "MOUSE-001",
            price: 3499,
            status: "Publish",
            stock: 89,
            categories: ["Electronics", "Gaming"],
            image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
            vendor: "GameTech",
            createdAt: "2024-01-14",
            updatedAt: "2024-01-16",
            featured: false
        },
        {
            id: 8,
            title: "Leather Wallet Classic",
            type: "Simple",
            sku: "WALLET-001",
            price: 1899,
            status: "Publish",
            stock: 34,
            categories: ["Fashion", "Accessories"],
            image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop",
            vendor: "LeatherCraft",
            createdAt: "2024-01-06",
            updatedAt: "2024-01-13",
            featured: false
        },
        {
            id: 9,
            title: "Bluetooth Speaker Portable",
            type: "Variant",
            sku: "SPEAKER-001",
            price: 5499,
            status: "Publish",
            stock: 56,
            categories: ["Electronics", "Audio"],
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
            vendor: "SoundMaster",
            createdAt: "2024-01-11",
            updatedAt: "2024-01-16",
            featured: true
        },
        {
            id: 10,
            title: "Organic Coffee Beans",
            type: "Simple",
            sku: "COFFEE-001",
            price: 899,
            status: "Draft",
            stock: 200,
            categories: ["Food", "Beverages"],
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
            vendor: "BeanCo",
            createdAt: "2024-01-07",
            updatedAt: "2024-01-14",
            featured: false
        },
        {
            id: 11,
            title: "Premium Laptop Backpack",
            type: "Variant",
            sku: "BAG-001",
            price: 3999,
            status: "Publish",
            stock: 42,
            categories: ["Travel", "Accessories"],
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
            vendor: "TravelGear",
            createdAt: "2024-01-04",
            updatedAt: "2024-01-10",
            featured: false
        },
        {
            id: 12,
            title: "Wireless Earbuds Pro",
            type: "Variant",
            sku: "EARBUDS-001",
            price: 7499,
            status: "Publish",
            stock: 78,
            categories: ["Electronics", "Audio"],
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
            vendor: "SoundMaster",
            createdAt: "2024-01-13",
            updatedAt: "2024-01-16",
            featured: true
        }
    ];

    useEffect(() => {
        setProducts(mockProducts);
    }, []);

    // Handle sorting
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Get sorting icon
    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return faSort;
        return sortConfig.direction === 'asc' ? faSortUp : faSortDown;
    };

    // Sort products
    const sortProducts = (productsList) => {
        return [...productsList].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            // Handle different data types
            if (sortConfig.key === 'price' || sortConfig.key === 'stock') {
                aValue = a[sortConfig.key] || 0;
                bValue = b[sortConfig.key] || 0;
            } else if (sortConfig.key === 'createdAt') {
                aValue = new Date(a.createdAt);
                bValue = new Date(b.createdAt);
            } else if (sortConfig.key === 'title') {
                aValue = a.title.toLowerCase();
                bValue = b.title.toLowerCase();
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

    // Get product statistics
    const getProductStats = () => {
        return {
            total: products.length,
            published: products.filter(p => p.status === 'Publish').length,
            draft: products.filter(p => p.status === 'Draft').length,
            variant: products.filter(p => p.type === 'Variant').length,
            simple: products.filter(p => p.type === 'Simple').length,
            outOfStock: products.filter(p => p.stock === 0).length,
            featured: products.filter(p => p.featured).length,
            totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
            averagePrice: Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length)
        };
    };

    const stats = getProductStats();

    const handleBulkAction = () => {
        if (!bulkAction || selectedProducts.size === 0) return;

        const selectedIds = Array.from(selectedProducts);

        switch (bulkAction) {
            case 'publish':
                console.log('Publishing products:', selectedIds);
                break;
            case 'draft':
                console.log('Moving to draft:', selectedIds);
                break;
            case 'delete':
                if (confirm(`Are you sure you want to delete ${selectedIds.length} products?`)) {
                    console.log('Deleting products:', selectedIds);
                }
                break;
            case 'export':
                console.log('Exporting products:', selectedIds);
                break;
        }

        setBulkAction("");
        setSelectedProducts(new Set());
        setShowBulkActions(false);
    };

    const handleSelectAll = () => {
        const visibleIds = filteredProducts.map(p => p.id);
        if (selectedProducts.size === visibleIds.length) {
            setSelectedProducts(new Set());
        } else {
            setSelectedProducts(new Set(visibleIds));
        }
    };

    const handleProductSelection = (productId, isChecked) => {
        const newSelected = new Set(selectedProducts);
        if (isChecked) {
            newSelected.add(productId);
        } else {
            newSelected.delete(productId);
        }
        setSelectedProducts(newSelected);
    };

    // Filter products
    const filteredProducts = products.filter(product => {
        const matchesSearch =
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.vendor.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
        const matchesType = typeFilter === 'all' || product.type === typeFilter;

        let matchesPrice = true;
        if (priceFilter === 'under1000') {
            matchesPrice = product.price < 1000;
        } else if (priceFilter === '1000-5000') {
            matchesPrice = product.price >= 1000 && product.price <= 5000;
        } else if (priceFilter === 'over5000') {
            matchesPrice = product.price > 5000;
        }

        return matchesSearch && matchesStatus && matchesType && matchesPrice;
    });

    // Sort filtered products
    const sortedProducts = sortProducts(filteredProducts);

    // Pagination
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

    return (
        <Layout>
            <div className="dashContent">
                {/* Page Header */}
                <div className="pageHeader">
                    <div className="headerLeft">
                        <h1 className="pageTitle">
                            <FontAwesomeIcon icon={faBoxOpen} /> Product Catalog
                        </h1>
                        <p className="pageSubtitle">
                            Manage your entire product inventory and listings
                        </p>
                    </div>
                    <div className="headerRight">
                        <Link href="/dashboard/add-product" className="btnPrimary">
                            <FontAwesomeIcon icon={faPlus} /> Add Product
                        </Link>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="summaryCards">
                    <div className="summaryCard total">
                        <div className="cardIcon">
                            <FontAwesomeIcon icon={faShoppingBag} />
                        </div>
                        <div className="cardContent">
                            <h3>Total Products</h3>
                            <div className="cardValue">
                                {stats.total}
                            </div>
                            <div className="cardSubtext">
                                <span className="published">
                                    {stats.published} published
                                </span>
                                <span className="draft">
                                    {stats.draft} draft
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="summaryCard published">
                        <div className="cardIcon">
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                        <div className="cardContent">
                            <h3>Published</h3>
                            <div className="cardValue">
                                {stats.published}
                            </div>
                            <div className="cardSubtext">
                                Live on store
                            </div>
                        </div>
                    </div>

                    <div className="summaryCard draft">
                        <div className="cardIcon">
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                        <div className="cardContent">
                            <h3>Draft</h3>
                            <div className="cardValue">
                                {stats.draft}
                            </div>
                            <div className="cardSubtext">
                                Not published
                            </div>
                        </div>
                    </div>

                    <div className="summaryCard featured">
                        <div className="cardIcon">
                            <FontAwesomeIcon icon={faTag} />
                        </div>
                        <div className="cardContent">
                            <h3>Featured</h3>
                            <div className="cardValue">
                                {stats.featured}
                            </div>
                            <div className="cardSubtext">
                                Promoted products
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="productsMain">
                    {/* Controls Bar */}
                    <div className="controlsBar">
                        <div className="controlsLeft">
                            <div className="searchBox">
                                <FontAwesomeIcon icon={faSearch} />
                                <input
                                    type="text"
                                    placeholder="Search products by name, SKU, vendor..."
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
                                    <option value="Publish">Published</option>
                                    <option value="Draft">Draft</option>
                                </select>

                                <select
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    className="filterSelect"
                                >
                                    <option value="all">All Types</option>
                                    <option value="Simple">Simple</option>
                                    <option value="Variant">Variant</option>
                                </select>

                                <select
                                    value={priceFilter}
                                    onChange={(e) => setPriceFilter(e.target.value)}
                                    className="filterSelect"
                                >
                                    <option value="all">All Prices</option>
                                    <option value="under1000">Under ₹1000</option>
                                    <option value="1000-5000">₹1000 - ₹5000</option>
                                    <option value="over5000">Over ₹5000</option>
                                </select>
                            </div>
                        </div>

                        <div className="controlsRight">
                            <div className="viewControls">
                                <button
                                    className="viewBtn"
                                    title="Refresh"
                                    onClick={() => window.location.reload()}
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
                                <FontAwesomeIcon icon={faBox} />
                                <span>{selectedProducts.size} products selected</span>
                            </div>

                            <div className="bulkControls">
                                <select
                                    value={bulkAction}
                                    onChange={(e) => setBulkAction(e.target.value)}
                                    className="bulkSelect"
                                >
                                    <option value="">Bulk Actions</option>
                                    <option value="publish">Publish</option>
                                    <option value="draft">Move to Draft</option>
                                    <option value="featured">Mark as Featured</option>
                                    <option value="unfeatured">Remove Featured</option>
                                    <option value="delete">Delete</option>
                                    <option value="export">Export Selected</option>
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
                                        setSelectedProducts(new Set());
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Products Table */}
                    <div className="tableWrapper">
                        <AllProducDataTable
                            data={paginatedProducts}
                            selectedProducts={selectedProducts}
                            onSelectProduct={handleProductSelection}
                            onSelectAll={handleSelectAll}
                            totalProducts={filteredProducts.length}
                            sortConfig={sortConfig}
                            onSort={handleSort}
                            getSortIcon={getSortIcon}
                        />
                    </div>

                    {/* Footer Controls */}
                    <div className="tableFooter">
                        <div className="footerLeft">
                            <span className="itemCount">
                                Showing {Math.min(endIndex, sortedProducts.length)} of {sortedProducts.length} products
                            </span>

                            {selectedProducts.size > 0 && !showBulkActions && (
                                <button
                                    className="bulkSelectBtn"
                                    onClick={() => setShowBulkActions(true)}
                                >
                                    <FontAwesomeIcon icon={faBox} /> {selectedProducts.size} selected
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
                                        // In real app, this would update state
                                        console.log('Items per page:', e.target.value);
                                        setCurrentPage(1); // Reset to first page when changing items per page
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
                </div>

                {/* Quick Stats */}
                <div className="quickStats">
                    <div className="statsCard">
                        <h3>
                            <FontAwesomeIcon icon={faChartBar} /> Inventory Stats
                        </h3>
                        <div className="hierarchyStats">
                            <div className="hierarchyItem">
                                <span className="statLabel">Total Stock Value:</span>
                                <span className="statValue">
                                    ₹{stats.totalValue.toLocaleString()}
                                </span>
                            </div>
                            <div className="hierarchyItem">
                                <span className="statLabel">Average Price:</span>
                                <span className="statValue">
                                    ₹{stats.averagePrice.toLocaleString()}
                                </span>
                            </div>
                            <div className="hierarchyItem">
                                <span className="statLabel">Out of Stock:</span>
                                <span className="statValue">
                                    {stats.outOfStock} products
                                </span>
                            </div>
                            <div className="hierarchyItem">
                                <span className="statLabel">Product Types:</span>
                                <span className="statValue">
                                    {stats.simple} Simple, {stats.variant} Variant
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="statsCard">
                        <h3>
                            <FontAwesomeIcon icon={faStore} /> Store Performance
                        </h3>
                        <div className="activityList">
                            <div className="activityItem">
                                <FontAwesomeIcon icon={faCheck} style={{ color: '#166534' }} />
                                <span>45 products sold today</span>
                            </div>
                            <div className="activityItem">
                                <FontAwesomeIcon icon={faRupeeSign} style={{ color: '#0369a1' }} />
                                <span>₹1,24,500 revenue this week</span>
                            </div>
                            <div className="activityItem">
                                <FontAwesomeIcon icon={faBox} style={{ color: '#7c3aed' }} />
                                <span>Low stock alert on 3 products</span>
                            </div>
                            <div className="activityItem">
                                <FontAwesomeIcon icon={faTag} style={{ color: '#9c4221' }} />
                                <span>Featured products performing well</span>
                            </div>
                        </div>
                    </div>

                    <div className="statsCard">
                        <h3>
                            <FontAwesomeIcon icon={faArrowRight} /> Quick Actions
                        </h3>
                        <div className="quickActionsList">
                            <Link href="/dashboard/add-product" className="quickAction">
                                <FontAwesomeIcon icon={faPlus} />
                                <span>Add Product</span>
                            </Link>
                            <Link href="/dashboard/categories" className="quickAction">
                                <FontAwesomeIcon icon={faLayerGroup} />
                                <span>Manage Collections</span>
                            </Link>
                            <button className="quickAction">
                                <FontAwesomeIcon icon={faDownload} />
                                <span>Export All</span>
                            </button>
                            <button className="quickAction">
                                <FontAwesomeIcon icon={faFilter} />
                                <span>View Low Stock</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AllProductsPage;