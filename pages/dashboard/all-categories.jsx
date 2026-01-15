import React, { useState, useEffect } from "react";
import Layout from "./layout";
import { requireAuth } from "../../lib/requireAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFolder,
    faFolderOpen,
    faChevronDown,
    faChevronRight,
    faEdit,
    faTrash,
    faSearch,
    faFilter,
    faEye,
    faCopy,
    faExternalLinkAlt,
    faBox,
    faCalendar,
    faSort,
    faSortUp,
    faSortDown,
    faCheck,
    faTimes,
    faEllipsisV,
    faPlus,
    faLayerGroup,
    faSitemap,
    faStore,
    faRefresh,
    faDownload,
    faUpload,
    faTag,
    faArrowRight,
    faChartBar,
    faLink
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export const getServerSideProps = requireAuth;

const AllCategoriesPage = () => {
    // State for categories with hierarchy
    const [categories, setCategories] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState(new Set());
    const [selectedCategories, setSelectedCategories] = useState(new Set());

    // Filter and search states
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [levelFilter, setLevelFilter] = useState("all");

    // Sorting state
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

    // Bulk actions
    const [showBulkActions, setShowBulkActions] = useState(false);
    const [bulkAction, setBulkAction] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Load mock categories data
    useEffect(() => {
        const loadCategories = async () => {
            const mockCategories = [
                {
                    id: 1,
                    name: "Electronics",
                    handle: "electronics",
                    products: 156,
                    description: "All electronic devices and accessories",
                    status: "active",
                    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop",
                    parentId: null,
                    level: 0,
                    order: 1,
                    type: "manual",
                    createdAt: "2024-01-10",
                    updatedAt: "2024-01-15",
                    featured: true,
                    seoTitle: "Electronics Store - Best Deals on Gadgets",
                    seoDescription: "Shop the latest electronics including smartphones, laptops, and accessories at best prices",
                    children: [
                        {
                            id: 11,
                            name: "Smartphones",
                            handle: "smartphones",
                            products: 45,
                            description: "Latest smartphones and accessories",
                            status: "active",
                            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w-400&h=400&fit=crop",
                            parentId: 1,
                            level: 1,
                            order: 1,
                            type: "manual",
                            createdAt: "2024-01-11",
                            updatedAt: "2024-01-16",
                            featured: false,
                            children: [
                                {
                                    id: 111,
                                    name: "Android Phones",
                                    handle: "android-phones",
                                    products: 25,
                                    description: "Android smartphones from Samsung, Google, OnePlus",
                                    status: "active",
                                    image: "",
                                    parentId: 11,
                                    level: 2,
                                    order: 1,
                                    type: "manual",
                                    createdAt: "2024-01-12",
                                    updatedAt: "2024-01-17",
                                    featured: false,
                                    children: []
                                },
                                {
                                    id: 112,
                                    name: "iPhones",
                                    handle: "iphones",
                                    products: 20,
                                    description: "Apple iPhones and accessories",
                                    status: "active",
                                    image: "",
                                    parentId: 11,
                                    level: 2,
                                    order: 2,
                                    type: "manual",
                                    createdAt: "2024-01-12",
                                    updatedAt: "2024-01-17",
                                    featured: false,
                                    children: []
                                }
                            ]
                        },
                        {
                            id: 12,
                            name: "Laptops & Computers",
                            handle: "laptops-computers",
                            products: 32,
                            description: "Laptops, desktops and accessories",
                            status: "active",
                            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w-400&h=400&fit=crop",
                            parentId: 1,
                            level: 1,
                            order: 2,
                            type: "automated",
                            createdAt: "2024-01-11",
                            updatedAt: "2024-01-16",
                            featured: true,
                            children: []
                        },
                        {
                            id: 13,
                            name: "Audio & Headphones",
                            handle: "audio-headphones",
                            products: 28,
                            description: "Headphones, speakers and audio equipment",
                            status: "active",
                            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w-400&h=400&fit=crop",
                            parentId: 1,
                            level: 1,
                            order: 3,
                            type: "manual",
                            createdAt: "2024-01-11",
                            updatedAt: "2024-01-16",
                            featured: false,
                            children: []
                        }
                    ]
                },
                {
                    id: 2,
                    name: "Fashion & Clothing",
                    handle: "fashion-clothing",
                    products: 234,
                    description: "Men, women and kids clothing",
                    status: "active",
                    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop",
                    parentId: null,
                    level: 0,
                    order: 2,
                    type: "automated",
                    createdAt: "2024-01-05",
                    updatedAt: "2024-01-12",
                    featured: true,
                    seoTitle: "Fashion Clothing Store - Latest Trends",
                    seoDescription: "Discover latest fashion trends for men, women and kids",
                    children: [
                        {
                            id: 21,
                            name: "Men's Fashion",
                            handle: "mens-fashion",
                            products: 120,
                            description: "Clothing for men",
                            status: "active",
                            image: "",
                            parentId: 2,
                            level: 1,
                            order: 1,
                            type: "manual",
                            createdAt: "2024-01-06",
                            updatedAt: "2024-01-13",
                            featured: true,
                            children: []
                        },
                        {
                            id: 22,
                            name: "Women's Fashion",
                            handle: "womens-fashion",
                            products: 114,
                            description: "Clothing for women",
                            status: "active",
                            image: "",
                            parentId: 2,
                            level: 1,
                            order: 2,
                            type: "manual",
                            createdAt: "2024-01-06",
                            updatedAt: "2024-01-13",
                            featured: false,
                            children: []
                        }
                    ]
                },
                {
                    id: 3,
                    name: "Home & Garden",
                    handle: "home-garden",
                    products: 89,
                    description: "Furniture, decor and garden supplies",
                    status: "draft",
                    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
                    parentId: null,
                    level: 0,
                    order: 3,
                    type: "manual",
                    createdAt: "2024-01-08",
                    updatedAt: "2024-01-14",
                    featured: false,
                    children: []
                },
                {
                    id: 4,
                    name: "Books & Media",
                    handle: "books-media",
                    products: 312,
                    description: "All types of books and publications",
                    status: "active",
                    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
                    parentId: null,
                    level: 0,
                    order: 4,
                    type: "automated",
                    createdAt: "2024-01-03",
                    updatedAt: "2024-01-11",
                    featured: false,
                    children: []
                },
                {
                    id: 5,
                    name: "Sports & Outdoors",
                    handle: "sports-outdoors",
                    products: 67,
                    description: "Sports equipment and outdoor gear",
                    status: "active",
                    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
                    parentId: null,
                    level: 0,
                    order: 5,
                    type: "manual",
                    createdAt: "2024-01-12",
                    updatedAt: "2024-01-15",
                    featured: false,
                    children: []
                },
                {
                    id: 6,
                    name: "Beauty & Health",
                    handle: "beauty-health",
                    products: 178,
                    description: "Cosmetics, skincare and health products",
                    status: "draft",
                    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=400&fit=crop",
                    parentId: null,
                    level: 0,
                    order: 6,
                    type: "manual",
                    createdAt: "2024-01-09",
                    updatedAt: "2024-01-13",
                    featured: false,
                    children: []
                }
            ];
            setCategories(mockCategories);
        };

        loadCategories();
    }, []);

    // Toggle category expansion
    const toggleCategory = (categoryId) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(categoryId)) {
            newExpanded.delete(categoryId);
        } else {
            newExpanded.add(categoryId);
        }
        setExpandedCategories(newExpanded);
    };

    // Toggle category selection
    const toggleCategorySelection = (categoryId, isChecked) => {
        const newSelected = new Set(selectedCategories);
        if (isChecked) {
            newSelected.add(categoryId);
        } else {
            newSelected.delete(categoryId);
        }
        setSelectedCategories(newSelected);
    };

    // Select all visible categories
    const selectAllCategories = () => {
        const visibleIds = getFlattenedCategories(categories).map(cat => cat.id);
        if (selectedCategories.size === visibleIds.length) {
            setSelectedCategories(new Set());
        } else {
            setSelectedCategories(new Set(visibleIds));
        }
    };

    // Flatten categories for display and filtering
    const getFlattenedCategories = (catList, level = 0, parentPath = []) => {
        let result = [];
        catList.forEach(cat => {
            const path = [...parentPath, cat.name];
            result.push({
                ...cat,
                level,
                path: path.join(' > '),
                fullPath: path
            });
            if (expandedCategories.has(cat.id) && cat.children && cat.children.length > 0) {
                result = [...result, ...getFlattenedCategories(cat.children, level + 1, path)];
            }
        });
        return result;
    };

    // Get sorting icon
    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return faSort;
        return sortConfig.direction === 'asc' ? faSortUp : faSortDown;
    };

    // Handle sorting
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Sort categories
    const sortCategories = (categories) => {
        return [...categories].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            // Handle nested properties
            if (sortConfig.key === 'products') {
                aValue = a.products || 0;
                bValue = b.products || 0;
            } else if (sortConfig.key === 'createdAt') {
                aValue = new Date(a.createdAt);
                bValue = new Date(b.createdAt);
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

    // Filter categories
    const filteredCategories = getFlattenedCategories(categories).filter(category => {
        const matchesSearch =
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.handle.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || category.status === statusFilter;
        const matchesType = typeFilter === 'all' || category.type === typeFilter;
        const matchesLevel = levelFilter === 'all' || category.level === parseInt(levelFilter);

        return matchesSearch && matchesStatus && matchesType && matchesLevel;
    });

    // Apply sorting
    const sortedCategories = sortCategories(filteredCategories);

    // Pagination
    const totalPages = Math.ceil(sortedCategories.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCategories = sortedCategories.slice(startIndex, endIndex);

    // Handle bulk actions
    const handleBulkAction = () => {
        if (!bulkAction || selectedCategories.size === 0) return;

        const selectedIds = Array.from(selectedCategories);

        switch (bulkAction) {
            case 'delete':
                if (confirm(`Are you sure you want to delete ${selectedIds.length} categories?`)) {
                    // Delete logic here
                    console.log('Deleting categories:', selectedIds);
                }
                break;
            case 'activate':
                // Activate logic here
                console.log('Activating categories:', selectedIds);
                break;
            case 'deactivate':
                // Deactivate logic here
                console.log('Deactivating categories:', selectedIds);
                break;
            case 'export':
                // Export logic here
                console.log('Exporting categories:', selectedIds);
                break;
        }

        setBulkAction("");
        setSelectedCategories(new Set());
        setShowBulkActions(false);
    };

    // Delete a single category
    const handleDelete = (categoryId, categoryName) => {
        if (confirm(`Are you sure you want to delete "${categoryName}"? This will also delete all subcategories.`)) {
            // Delete logic here
            console.log('Deleting category:', categoryId);
        }
    };

    // Expand all categories
    const expandAll = () => {
        const allIds = getFlattenedCategories(categories).map(cat => cat.id);
        setExpandedCategories(new Set(allIds));
    };

    // Collapse all categories
    const collapseAll = () => {
        setExpandedCategories(new Set());
    };

    // Duplicate a category
    const handleDuplicate = (categoryId) => {
        console.log('Duplicating category:', categoryId);
        // Implementation for duplicating category
    };

    // View category details
    const handleViewDetails = (categoryId) => {
        console.log('Viewing category details:', categoryId);
        // Implementation for viewing details
    };

    // Render category row
    const renderCategoryRow = (category) => {
        const hasChildren = category.children && category.children.length > 0;
        const isExpanded = expandedCategories.has(category.id);
        const isSelected = selectedCategories.has(category.id);

        return (
            <tr key={category.id} className={`category-row level-${category.level} ${isSelected ? 'selected' : ''}`}>
                <td>
                    <div className="category-select">
                        <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => toggleCategorySelection(category.id, e.target.checked)}
                            className="category-checkbox"
                        />
                    </div>
                </td>
                <td>
                    <div className="category-name-cell">
                        <div className="category-name-content">
                            {hasChildren && (
                                <button
                                    type="button"
                                    onClick={() => toggleCategory(category.id)}
                                    className="expand-btn"
                                >
                                    <FontAwesomeIcon
                                        icon={isExpanded ? faChevronDown : faChevronRight}
                                    />
                                </button>
                            )}
                            {!hasChildren && (
                                <span className="expand-placeholder"></span>
                            )}
                            <div className="categoryImage">
                                {category.image ? (
                                    <img src={category.image} alt={category.name} />
                                ) : (
                                    <div className="categoryImage-placeholder">
                                        <FontAwesomeIcon icon={faFolder} />
                                    </div>
                                )}
                            </div>
                            <div className="category-info">
                                <div className="category-title">
                                    <span className="category-name">{category.name}</span>
                                    {category.featured && (
                                        <span className="featured-badge">
                                            <FontAwesomeIcon icon={faTag} /> Featured
                                        </span>
                                    )}
                                    {category.type === 'automated' && (
                                        <span className="automated-badge">
                                            Auto
                                        </span>
                                    )}
                                    {category.level > 0 && (
                                        <span className="subcategory-label">Subcategory</span>
                                    )}
                                </div>
                                <div className="category-meta">
                                    <span className="category-handle">
                                        <FontAwesomeIcon icon={faLink} /> /{category.handle}
                                    </span>
                                    {category.description && (
                                        <span className="category-description">{category.description}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <div className="category-products">
                        <div className="products-count">
                            <FontAwesomeIcon icon={faBox} />
                            <span>{category.products.toLocaleString()}</span>
                        </div>
                        <div className="products-progress">
                            <div
                                className="progress-bar"
                                style={{ width: `${Math.min(category.products / 5, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                </td>
                <td>
                    <span className={`type-badge ${category.type}`}>
                        {category.type === 'automated' ? 'Automated' : 'Manual'}
                    </span>
                </td>
                <td>
                    <span className={`status-badge ${category.status}`}>
                        <FontAwesomeIcon icon={category.status === 'active' ? faCheck : faTimes} />
                        {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                    </span>
                </td>
                <td>
                    <div className="category-date">
                        <FontAwesomeIcon icon={faCalendar} />
                        <span>{new Date(category.createdAt).toLocaleDateString()}</span>
                    </div>
                </td>
                <td>
                    <div className="category-actions">
                        <Link href={`/dashboard/categories/edit/${category.id}`} className="action-btn edit">
                            <FontAwesomeIcon icon={faEdit} />
                            <span>Edit</span>
                        </Link>
                        <button
                            className="action-btn duplicate"
                            onClick={() => handleDuplicate(category.id)}
                        >
                            <FontAwesomeIcon icon={faCopy} />
                            <span>Duplicate</span>
                        </button>
                        <button
                            className="action-btn delete"
                            onClick={() => handleDelete(category.id, category.name)}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                            <span>Delete</span>
                        </button>
                    </div>
                </td>
            </tr>
        );
    };

    // Get category statistics
    const getCategoryStats = () => {
        const flattened = getFlattenedCategories(categories);
        return {
            total: flattened.length,
            active: flattened.filter(c => c.status === 'active').length,
            draft: flattened.filter(c => c.status === 'draft').length,
            archived: flattened.filter(c => c.status === 'archived').length,
            automated: flattened.filter(c => c.type === 'automated').length,
            manual: flattened.filter(c => c.type === 'manual').length,
            subcategories: flattened.filter(c => c.level > 0).length,
            mainCategories: flattened.filter(c => c.level === 0).length,
            totalProducts: flattened.reduce((sum, c) => sum + c.products, 0),
            deepestLevel: Math.max(...flattened.map(c => c.level)),
            averageDepth: (flattened.reduce((sum, c) => sum + c.level, 0) / flattened.length).toFixed(1),
            mostProducts: Math.max(...flattened.map(c => c.products))
        };
    };

    const stats = getCategoryStats();

    return (
        <Layout>
            <div className="dashContent">
                {/* Page Header */}
                <div className="pageHeader">
                    <div className="headerLeft">
                        <h1 className="pageTitle">
                            <FontAwesomeIcon icon={faLayerGroup} /> Categories Manager
                        </h1>
                        <p className="pageSubtitle">
                            Organize and manage all your product categories
                        </p>
                    </div>
                    <div className="headerRight">
                        <Link href="/dashboard/add-categories" className="btnPrimary">
                            <FontAwesomeIcon icon={faPlus} /> Create Categories
                        </Link>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="summaryCards">
                    <div className="summaryCard total">
                        <div className="cardIcon">
                            <FontAwesomeIcon icon={faFolder} />
                        </div>
                        <div className="cardContent">
                            <h3>Total Categories</h3>
                            <div className="cardValue">
                                {stats.total}
                            </div>
                            <div className="cardSubtext">
                                <span className="main-cats">
                                    {stats.mainCategories} main categories
                                </span>
                                <span className="sub-cats">
                                    {stats.subcategories} subcategories
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="summaryCard active">
                        <div className="cardIcon">
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                        <div className="cardContent">
                            <h3>Active</h3>
                            <div className="cardValue">
                                {stats.active}
                            </div>
                            <div className="cardSubtext">
                                Published on store
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

                    <div className="summaryCard automated">
                        <div className="cardIcon">
                            <FontAwesomeIcon icon={faRefresh} />
                        </div>
                        <div className="cardContent">
                            <h3>Automated</h3>
                            <div className="cardValue">
                                {stats.automated}
                            </div>
                            <div className="cardSubtext">
                                Smart categories
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="categoriesMain">
                    {/* Controls Bar */}
                    <div className="controlsBar">
                        <div className="controlsLeft">
                            <div className="searchBox">
                                <FontAwesomeIcon icon={faSearch} />
                                <input
                                    type="text"
                                    placeholder="Search categories..."
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
                                    <option value="draft">Draft</option>
                                    <option value="archived">Archived</option>
                                </select>

                                <select
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    className="filterSelect"
                                >
                                    <option value="all">All Types</option>
                                    <option value="manual">Manual</option>
                                    <option value="automated">Automated</option>
                                </select>

                                <select
                                    value={levelFilter}
                                    onChange={(e) => setLevelFilter(e.target.value)}
                                    className="filterSelect"
                                >
                                    <option value="all">All Levels</option>
                                    <option value="0">Main Categories</option>
                                    <option value="1">Level 1 Subcategories</option>
                                    <option value="2">Level 2 Subcategories</option>
                                </select>
                            </div>
                        </div>

                        <div className="controlsRight">
                            <div className="viewControls">
                                <button
                                    className="viewBtn"
                                    onClick={expandAll}
                                    title="Expand All"
                                >
                                    <FontAwesomeIcon icon={faChevronDown} /> Expand All
                                </button>
                                <button
                                    className="viewBtn"
                                    onClick={collapseAll}
                                    title="Collapse All"
                                >
                                    <FontAwesomeIcon icon={faChevronRight} /> Collapse All
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
                                <FontAwesomeIcon icon={faSitemap} />
                                <span>{selectedCategories.size} categories selected</span>
                            </div>

                            <div className="bulkControls">
                                <select
                                    value={bulkAction}
                                    onChange={(e) => setBulkAction(e.target.value)}
                                    className="bulkSelect"
                                >
                                    <option value="">Bulk Actions</option>
                                    <option value="activate">Activate</option>
                                    <option value="deactivate">Deactivate</option>
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
                                        setSelectedCategories(new Set());
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Categories Table */}
                    <div className="categoriesTableWrapper">
                        <table className="categoriesTable">
                            <thead>
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.size === getFlattenedCategories(categories).length && getFlattenedCategories(categories).length > 0}
                                            onChange={selectAllCategories}
                                            className="selectAllCheckbox"
                                        />
                                    </th>
                                    <th>
                                        <button
                                            className="sortableHeader"
                                            onClick={() => handleSort('name')}
                                        >
                                            Collection Name
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            className="sortableHeader"
                                            onClick={() => handleSort('products')}
                                        >
                                            Products
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            className="sortableHeader"
                                            onClick={() => handleSort('type')}
                                        >
                                            Type
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            className="sortableHeader"
                                            onClick={() => handleSort('status')}
                                        >
                                            Status
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            className="sortableHeader"
                                            onClick={() => handleSort('createdAt')}
                                        >
                                            Created
                                        </button>
                                    </th>
                                    <th width="240">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedCategories.length > 0 ? (
                                    paginatedCategories.map(category => renderCategoryRow(category))
                                ) : (
                                    <tr>
                                        <td colSpan="7">
                                            <div className="emptyState">
                                                <FontAwesomeIcon icon={faFolder} size="3x" />
                                                <h3>No categories found</h3>
                                                <p>Try adjusting your search or filters</p>
                                                <Link href="/dashboard/add-categories" className="btnPrimary">
                                                    <FontAwesomeIcon icon={faPlus} /> Create Your First Collection
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Controls */}
                    <div className="tableFooter">
                        <div className="footerLeft">
                            <span className="itemCount">
                                Showing {Math.min(endIndex, sortedCategories.length)} of {sortedCategories.length} categories
                            </span>

                            {selectedCategories.size > 0 && !showBulkActions && (
                                <button
                                    className="bulkSelectBtn"
                                    onClick={() => setShowBulkActions(true)}
                                >
                                    <FontAwesomeIcon icon={faSitemap} /> {selectedCategories.size} selected
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
                            <FontAwesomeIcon icon={faChartBar} /> Collection Analytics
                        </h3>
                        <div className="hierarchyStats">
                            <div className="hierarchyItem">
                                <span className="statLabel">Total Products:</span>
                                <span className="statValue">
                                    {stats.totalProducts.toLocaleString()}
                                </span>
                            </div>
                            <div className="hierarchyItem">
                                <span className="statLabel">Average Products:</span>
                                <span className="statValue">
                                    {Math.round(stats.totalProducts / stats.total).toLocaleString()}
                                </span>
                            </div>
                            <div className="hierarchyItem">
                                <span className="statLabel">Most Products:</span>
                                <span className="statValue">
                                    {stats.mostProducts.toLocaleString()}
                                </span>
                            </div>
                            <div className="hierarchyItem">
                                <span className="statLabel">Featured Categories:</span>
                                <span className="statValue">
                                    {getFlattenedCategories(categories).filter(c => c.featured).length}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="statsCard">
                        <h3>
                            <FontAwesomeIcon icon={faSitemap} /> Hierarchy Stats
                        </h3>
                        <div className="activityList">
                            <div className="activityItem">
                                <FontAwesomeIcon icon={faLayerGroup} />
                                <span>Deepest Level: {stats.deepestLevel}</span>
                            </div>
                            <div className="activityItem">
                                <FontAwesomeIcon icon={faChartBar} />
                                <span>Average Depth: {stats.averageDepth}</span>
                            </div>
                            <div className="activityItem">
                                <FontAwesomeIcon icon={faFolder} />
                                <span>Subcollection Ratio: {(stats.subcategories / stats.total * 100).toFixed(1)}%</span>
                            </div>
                            <div className="activityItem">
                                <FontAwesomeIcon icon={faRefresh} />
                                <span>Automated Ratio: {(stats.automated / stats.total * 100).toFixed(1)}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="statsCard">
                        <h3>
                            <FontAwesomeIcon icon={faArrowRight} /> Quick Actions
                        </h3>
                        <div className="quickActionsList">
                            <Link href="/dashboard/add-categories" className="quickAction">
                                <FontAwesomeIcon icon={faPlus} />
                                <span>Add Collection</span>
                            </Link>
                            <Link href="/dashboard/categories/import" className="quickAction">
                                <FontAwesomeIcon icon={faUpload} />
                                <span>Import CSV</span>
                            </Link>
                            <button className="quickAction" onClick={expandAll}>
                                <FontAwesomeIcon icon={faChevronDown} />
                                <span>Expand All</span>
                            </button>
                            <button className="quickAction" onClick={collapseAll}>
                                <FontAwesomeIcon icon={faChevronRight} />
                                <span>Collapse All</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AllCategoriesPage;