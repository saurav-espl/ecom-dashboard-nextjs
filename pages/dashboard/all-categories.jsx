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
    faTag
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
                    image: "",
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
                            image: "",
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
                                    description: "Android smartphones",
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
                                    description: "Apple iPhones",
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
                            image: "",
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
                            image: "",
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
                    image: "",
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
                    image: "",
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
                    image: "",
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
                    image: "",
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
                    image: "",
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
                    <div className="category-name-cell" style={{ paddingLeft: `${category.level * 30}px` }}>
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
                            <div className="category-icon">
                                {hasChildren ? (
                                    <FontAwesomeIcon icon={isExpanded ? faFolderOpen : faFolder} />
                                ) : (
                                    <FontAwesomeIcon icon={faFolder} />
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
                                    <span className="category-handle">/{category.handle}</span>
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
                        <FontAwesomeIcon icon={faBox} />
                        <span>{category.products.toLocaleString()}</span>
                    </div>
                </td>
                <td>
                    <span className={`type-badge ${category.type}`}>
                        {category.type === 'automated' ? 'Automated' : 'Manual'}
                    </span>
                </td>
                <td>
                    <span className={`status-badge ${category.status}`}>
                        {category.status}
                    </span>
                </td>
                <td>
                    <div className="category-date">
                        <FontAwesomeIcon icon={faCalendar} />
                        {new Date(category.createdAt).toLocaleDateString()}
                    </div>
                </td>
                <td>
                    <div className="category-actions">
                        <Link href={`/dashboard/categories/edit/${category.id}`} className="action-btn edit">
                            <FontAwesomeIcon icon={faEdit} />
                            <span>Edit</span>
                        </Link>
                        <button
                            className="action-btn delete"
                            onClick={() => handleDelete(category.id, category.name)}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                            <span>Delete</span>
                        </button>
                        <button className="action-btn more">
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </button>
                    </div>
                </td>
            </tr>
        );
    };

    return (
        <Layout>
            <div className="dashContent">
                {/* Page Header */}
                <div className="pageHeader">
                    <div className="headerLeft">
                        <h1 className="pageTitle">
                            <FontAwesomeIcon icon={faLayerGroup} /> All Collections
                        </h1>
                        <p className="pageSubtitle">
                            Manage your product collections and categories
                        </p>
                    </div>
                    <div className="headerRight">
                        <Link href="/dashboard/add-categories" className="btnPrimary">
                            <FontAwesomeIcon icon={faPlus} /> Create Collection
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
                            <h3>Total Collections</h3>
                            <div className="cardValue">
                                {getFlattenedCategories(categories).length}
                            </div>
                            <div className="cardSubtext">
                                <span className="main-cats">
                                    {categories.length} main categories
                                </span>
                                <span className="sub-cats">
                                    {getFlattenedCategories(categories).filter(c => c.level > 0).length} subcategories
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
                                {getFlattenedCategories(categories).filter(c => c.status === 'active').length}
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
                                {getFlattenedCategories(categories).filter(c => c.status === 'draft').length}
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
                                {getFlattenedCategories(categories).filter(c => c.type === 'automated').length}
                            </div>
                            <div className="cardSubtext">
                                Smart collections
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
                                    placeholder="Search collections..."
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
                                <span>{selectedCategories.size} collections selected</span>
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
                                    <th width="50">
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
                                            <FontAwesomeIcon icon={getSortIcon('name')} />
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            className="sortableHeader"
                                            onClick={() => handleSort('products')}
                                        >
                                            Products
                                            <FontAwesomeIcon icon={getSortIcon('products')} />
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            className="sortableHeader"
                                            onClick={() => handleSort('type')}
                                        >
                                            Type
                                            <FontAwesomeIcon icon={getSortIcon('type')} />
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            className="sortableHeader"
                                            onClick={() => handleSort('status')}
                                        >
                                            Status
                                            <FontAwesomeIcon icon={getSortIcon('status')} />
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            className="sortableHeader"
                                            onClick={() => handleSort('createdAt')}
                                        >
                                            Created
                                            <FontAwesomeIcon icon={getSortIcon('createdAt')} />
                                        </button>
                                    </th>
                                    <th width="200">Actions</th>
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
                                                <h3>No collections found</h3>
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
                                Showing {Math.min(endIndex, sortedCategories.length)} of {sortedCategories.length} collections
                            </span>

                            {selectedCategories.size > 0 && !showBulkActions && (
                                <button
                                    className="bulkSelectBtn"
                                    onClick={() => setShowBulkActions(true)}
                                >
                                    {selectedCategories.size} selected
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
                        <h3>Collection Hierarchy</h3>
                        <div className="hierarchyStats">
                            <div className="hierarchyItem">
                                <span className="statLabel">Deepest Level:</span>
                                <span className="statValue">
                                    {Math.max(...getFlattenedCategories(categories).map(c => c.level))}
                                </span>
                            </div>
                            <div className="hierarchyItem">
                                <span className="statLabel">Average Depth:</span>
                                <span className="statValue">
                                    {(getFlattenedCategories(categories).reduce((sum, c) => sum + c.level, 0) /
                                        getFlattenedCategories(categories).length).toFixed(1)}
                                </span>
                            </div>
                            <div className="hierarchyItem">
                                <span className="statLabel">Most Products:</span>
                                <span className="statValue">
                                    {Math.max(...getFlattenedCategories(categories).map(c => c.products)).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="statsCard">
                        <h3>Recent Activity</h3>
                        <div className="activityList">
                            <div className="activityItem">
                                <FontAwesomeIcon icon={faEdit} />
                                <span>Electronics updated 2 hours ago</span>
                            </div>
                            <div className="activityItem">
                                <FontAwesomeIcon icon={faPlus} />
                                <span>New subcategory added to Smartphones</span>
                            </div>
                            <div className="activityItem">
                                <FontAwesomeIcon icon={faCheck} />
                                <span>Fashion collection activated</span>
                            </div>
                        </div>
                    </div>

                    <div className="statsCard">
                        <h3>Quick Actions</h3>
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

            <style jsx>{`
        /* Page Header */
        .pageHeader {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e2e8f0;
        }

        .headerLeft {
          flex: 1;
        }

        .pageTitle {
          font-size: 28px;
          margin: 0 0 8px 0;
          color: #2d3748;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pageSubtitle {
          color: #718096;
          margin: 0;
          font-size: 16px;
        }

        .btnPrimary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          border-radius: 8px;
          background: #667eea;
          color: white;
          font-weight: 500;
          font-size: 15px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btnPrimary:hover {
          background: #5a6fd8;
        }

        /* Summary Cards */
        .summaryCards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .summaryCard {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          gap: 20px;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .summaryCard:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        }

        .cardIcon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
        }

        .summaryCard.total .cardIcon {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .summaryCard.active .cardIcon {
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        }

        .summaryCard.draft .cardIcon {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .summaryCard.automated .cardIcon {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .cardContent {
          flex: 1;
        }

        .cardContent h3 {
          margin: 0 0 8px 0;
          font-size: 16px;
          color: #718096;
          font-weight: 500;
        }

        .cardValue {
          font-size: 32px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .cardSubtext {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 13px;
          color: #a0aec0;
        }

        .main-cats, .sub-cats {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* Main Content */
        .categoriesMain {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 30px;
          overflow: hidden;
        }

        /* Controls Bar */
        .controlsBar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          flex-wrap: wrap;
          gap: 20px;
        }

        .controlsLeft {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          flex: 1;
        }

        .searchBox {
          display: flex;
          align-items: center;
          gap: 10px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 10px 15px;
          min-width: 300px;
          flex: 1;
          max-width: 400px;
        }

        .searchInput {
          border: none;
          outline: none;
          font-size: 15px;
          color: #2d3748;
          width: 100%;
          background: transparent;
        }

        .filterGroup {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .filterSelect {
          padding: 10px 15px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          color: #4a5568;
          background: white;
          min-width: 150px;
          cursor: pointer;
        }

        .controlsRight {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .viewControls, .exportControls {
          display: flex;
          gap: 10px;
        }

        .viewBtn, .exportBtn, .importBtn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 15px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          color: #4a5568;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .viewBtn:hover, .exportBtn:hover, .importBtn:hover {
          background: #f8fafc;
          border-color: #cbd5e0;
        }

        /* Bulk Actions */
        .bulkActionsBar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background: #e6f3ff;
          border-bottom: 1px solid #b3d9ff;
        }

        .bulkInfo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
          color: #0066cc;
        }

        .bulkControls {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .bulkSelect {
          padding: 10px 15px;
          border: 1px solid #b3d9ff;
          border-radius: 6px;
          background: white;
          min-width: 200px;
        }

        .bulkApplyBtn, .bulkCancelBtn {
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          border: none;
        }

        .bulkApplyBtn {
          background: #0066cc;
          color: white;
        }

        .bulkApplyBtn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .bulkCancelBtn {
          background: #e2e8f0;
          color: #4a5568;
        }

        /* Categories Table */
        .categoriesTableWrapper {
          overflow-x: auto;
        }

        .categoriesTable {
          width: 100%;
          border-collapse: collapse;
          min-width: 1000px;
        }

        .categoriesTable thead th {
          background: #f8fafc;
          padding: 5px 8px;
          text-align: left;
          font-weight: 600;
          color: #4a5568;
          border-bottom: 1px solid #000000;
          white-space: nowrap;
        }

        .sortableHeader {
          background: none;
          border: none;
          font: inherit;
          color: inherit;
          font-weight: inherit;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 0;
        }

        .selectAllCheckbox {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        /* Category Row Styles */
        .category-row {
          transition: background 0.3s;
        }

        .category-row:hover {
          background: #f8fafc;
        }

        .category-row.selected {
          background: #f0f9ff;
        }

        .category-select {
          padding: 0 15px;
        }

        .category-checkbox {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .category-name-cell {
          padding: 15px;
        }

        .category-name-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .expand-btn {
          background: none;
          border: none;
          color: #cbd5e0;
          cursor: pointer;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .expand-btn:hover {
          color: #667eea;
        }

        .expand-placeholder {
          width: 24px;
          flex-shrink: 0;
        }

        .category-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #667eea;
          flex-shrink: 0;
        }

        .category-info {
          flex: 1;
          min-width: 0;
        }

        .category-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 4px;
        }

        .category-name {
          font-weight: 600;
          color: #2d3748;
          font-size: 16px;
        }

        .featured-badge, .automated-badge, .subcategory-label {
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }

        .featured-badge {
          background: #fff7ed;
          color: #9c4221;
          border: 1px solid #fed7aa;
        }

        .automated-badge {
          background: #f0f9ff;
          color: #0369a1;
          border: 1px solid #bae6fd;
        }

        .subcategory-label {
          background: #f5f3ff;
          color: #5b21b6;
          border: 1px solid #ddd6fe;
        }

        .category-meta {
          display: flex;
          gap: 15px;
          font-size: 13px;
          color: #718096;
          flex-wrap: wrap;
        }

        .category-handle {
          color: #667eea;
          font-weight: 500;
        }

        .category-description {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 300px;
        }

        .category-products {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: #4a5568;
          padding: 15px;
        }

        /* Badges */
        .type-badge, .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
          text-align: center;
          min-width: 80px;
        }

        .type-badge.manual {
          background: #f0f9ff;
          color: #0369a1;
          border: 1px solid #bae6fd;
        }

        .type-badge.automated {
          background: #f0fdf4;
          color: #166534;
          border: 1px solid #bbf7d0;
        }

        .status-badge.active {
          background: #f0fdf4;
          color: #166534;
          border: 1px solid #bbf7d0;
        }

        .status-badge.draft {
          background: #fefce8;
          color: #854d0e;
          border: 1px solid #fef08a;
        }

        .status-badge.archived {
          background: #f5f5f5;
          color: #525252;
          border: 1px solid #e5e5e5;
        }

        .category-date {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #718096;
          padding: 15px;
        }

        /* Actions */
        .category-actions {
          display: flex;
          gap: 8px;
          padding: 15px;
        }

        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s;
          border: none;
          cursor: pointer;
        }

        .action-btn.edit {
          background: #e0e7ff;
          color: #3730a3;
        }

        .action-btn.edit:hover {
          background: #c7d2fe;
        }

        .action-btn.delete {
          background: #fee2e2;
          color: #991b1b;
        }

        .action-btn.delete:hover {
          background: #fecaca;
        }

        .action-btn.more {
          background: #f3f4f6;
          color: #6b7280;
          padding: 8px;
        }

        /* Empty State */
        .emptyState {
          text-align: center;
          padding: 60px 20px;
          color: #a0aec0;
        }

        .emptyState h3 {
          margin: 20px 0 10px;
          color: #4a5568;
        }

        .emptyState p {
          margin-bottom: 20px;
        }

        /* Table Footer */
        .tableFooter {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-top: 1px solid #e2e8f0;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footerLeft {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .itemCount {
          color: #718096;
          font-size: 14px;
        }

        .bulkSelectBtn {
          padding: 6px 12px;
          background: #e0e7ff;
          color: #3730a3;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
        }

        .footerRight {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .pagination {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .paginationBtn {
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          background: white;
          border-radius: 6px;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.3s;
        }

        .paginationBtn:hover:not(:disabled) {
          background: #f8fafc;
        }

        .paginationBtn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pageNumbers {
          display: flex;
          gap: 5px;
        }

        .pageBtn {
          width: 36px;
          height: 36px;
          border: 1px solid #e2e8f0;
          background: white;
          border-radius: 6px;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.3s;
        }

        .pageBtn.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .perPageSelector {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #718096;
          font-size: 14px;
        }

        .perPageSelect {
          padding: 6px 10px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          background: white;
        }

        /* Quick Stats */
        .quickStats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }

        .statsCard {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .statsCard h3 {
          margin: 0 0 20px 0;
          color: #2d3748;
          font-size: 18px;
        }

        .hierarchyStats {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .hierarchyItem {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .statLabel {
          color: #718096;
          font-size: 14px;
        }

        .statValue {
          font-weight: 600;
          color: #2d3748;
          font-size: 16px;
        }

        .activityList {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .activityItem {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #4a5568;
        }

        .activityItem svg {
          color: #667eea;
        }

        .quickActionsList {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .quickAction {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: #f8fafc;
          color: #4a5568;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.3s;
          cursor: pointer;
          border: none;
        }

        .quickAction:hover {
          background: #edf2f7;
          border-color: #cbd5e0;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .controlsBar {
            flex-direction: column;
            align-items: stretch;
          }
          
          .controlsLeft, .controlsRight {
            width: 100%;
          }
          
          .searchBox {
            max-width: none;
          }
          
          .tableFooter {
            flex-direction: column;
            align-items: stretch;
          }
          
          .footerRight {
            width: 100%;
            justify-content: space-between;
          }
        }

        @media (max-width: 768px) {
          .pageHeader {
            flex-direction: column;
            gap: 20px;
          }
          
          .summaryCards {
            grid-template-columns: 1fr;
          }
          
          .filterGroup {
            flex-direction: column;
            width: 100%;
          }
          
          .filterSelect {
            width: 100%;
          }
          
          .controlsRight {
            flex-direction: column;
            width: 100%;
          }
          
          .viewControls, .exportControls {
            width: 100%;
            justify-content: space-between;
          }
          
          .category-meta {
            flex-direction: column;
            gap: 5px;
          }
          
          .quickStats {
            grid-template-columns: 1fr;
          }
          
          .quickActionsList {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </Layout>
    );
};

export default AllCategoriesPage;