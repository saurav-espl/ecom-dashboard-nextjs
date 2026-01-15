import React, { useState, useEffect } from "react";
import Layout from "./layout";
import { requireAuth } from "../../lib/requireAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFolder,
    faPlus,
    faEdit,
    faTrash,
    faSearch,
    faFilter,
    faEye,
    faClone,
    faArrowUp,
    faSort,
    faImage,
    faLink,
    faCalendar,
    faBox,
    faSave,
    faTimes,
    faChevronDown,
    faChevronRight,
    faFolderTree
} from "@fortawesome/free-solid-svg-icons";

export const getServerSideProps = requireAuth;

const AddCategoriesPage = () => {
    const [newCategory, setNewCategory] = useState({
        name: "",
        description: "",
        handle: "",
        image: "",
        parentCategory: "",
        status: "active",
        seoTitle: "",
        seoDescription: "",
        sortOrder: "manual",
        displayType: "grid",
        conditions: [],
        type: "manual",
        isSubcategory: false
    });

    const [conditions, setConditions] = useState([
        { field: "product_type", operator: "equals", value: "" },
    ]);

    // Categories data with hierarchy
    const [categories, setCategories] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");

    // Load categories on client side to avoid hydration issues
    useEffect(() => {
        // Simulate API call - replace with actual API call
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
                    children: [
                        {
                            id: 11,
                            name: "Smartphones",
                            handle: "electronics-smartphones",
                            products: 45,
                            description: "Mobile phones and accessories",
                            status: "active",
                            image: "",
                            parentId: 1,
                            level: 1,
                            order: 1,
                            type: "manual",
                            createdAt: "2024-01-11",
                            updatedAt: "2024-01-16",
                            children: []
                        },
                        {
                            id: 12,
                            name: "Laptops",
                            handle: "electronics-laptops",
                            products: 32,
                            description: "Laptops and notebooks",
                            status: "active",
                            image: "",
                            parentId: 1,
                            level: 1,
                            order: 2,
                            type: "manual",
                            createdAt: "2024-01-11",
                            updatedAt: "2024-01-16",
                            children: []
                        }
                    ]
                },
                {
                    id: 2,
                    name: "Clothing",
                    handle: "clothing",
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
                    children: [
                        {
                            id: 21,
                            name: "Men's Clothing",
                            handle: "clothing-mens",
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
                            children: []
                        },
                        {
                            id: 22,
                            name: "Women's Clothing",
                            handle: "clothing-womens",
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
                    children: []
                }
            ];
            setCategories(mockCategories);
        };

        loadCategories();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setNewCategory(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Auto-generate handle from name
        if (name === 'name' && !newCategory.handle && !newCategory.isSubcategory) {
            const handle = value.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setNewCategory(prev => ({ ...prev, handle }));
        }
    };

    // Handle condition changes
    const handleConditionChange = (index, field, value) => {
        const updatedConditions = [...conditions];
        updatedConditions[index] = {
            ...updatedConditions[index],
            [field]: value
        };
        setConditions(updatedConditions);
    };

    // Add new condition
    const addCondition = () => {
        setConditions([
            ...conditions,
            { field: "product_type", operator: "equals", value: "" }
        ]);
    };

    // Remove condition
    const removeCondition = (index) => {
        if (conditions.length > 1) {
            const updatedConditions = conditions.filter((_, i) => i !== index);
            setConditions(updatedConditions);
        }
    };

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

    // Get parent categories for dropdown (only top-level categories)
    const getParentCategories = () => {
        const flatCategories = flattenCategories(categories);
        return flatCategories.filter(cat => cat.parentId === null);
    };

    // Flatten categories for easy access
    const flattenCategories = (catList, level = 0) => {
        let result = [];
        catList.forEach(cat => {
            result.push({ ...cat, level });
            if (cat.children && cat.children.length > 0) {
                result = [...result, ...flattenCategories(cat.children, level + 1)];
            }
        });
        return result;
    };

    // Generate handle for subcategory
    const generateSubcategoryHandle = (parentHandle, subcategoryName) => {
        const parentPart = parentHandle || '';
        const childPart = subcategoryName.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        return parentPart ? `${parentPart}-${childPart}` : childPart;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const parentCategory = newCategory.parentCategory
            ? categories.find(cat => cat.id === parseInt(newCategory.parentCategory))
            : null;

        const categoryData = {
            ...newCategory,
            handle: newCategory.isSubcategory && parentCategory
                ? generateSubcategoryHandle(parentCategory.handle, newCategory.name)
                : newCategory.handle,
            conditions: newCategory.type === "automated" ? conditions : [],
            parentId: newCategory.parentCategory ? parseInt(newCategory.parentCategory) : null,
            level: newCategory.parentCategory ?
                (parentCategory?.level || 0) + 1 : 0,
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0],
            children: []
        };

        console.log('Category Data:', categoryData);

        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });

            if (response.ok) {
                const newCat = await response.json();

                // Update categories state
                if (newCat.parentId) {
                    // Add as subcategory
                    const addSubcategory = (catList) => {
                        return catList.map(cat => {
                            if (cat.id === newCat.parentId) {
                                return {
                                    ...cat,
                                    children: [...cat.children, { ...newCat, id: Date.now() }]
                                };
                            }
                            if (cat.children && cat.children.length > 0) {
                                return {
                                    ...cat,
                                    children: addSubcategory(cat.children)
                                };
                            }
                            return cat;
                        });
                    };
                    setCategories(addSubcategory(categories));
                } else {
                    // Add as top-level category
                    setCategories(prev => [...prev, { ...newCat, id: Date.now(), children: [] }]);
                }

                alert('Category created successfully!');

                // Reset form
                setNewCategory({
                    name: "",
                    description: "",
                    handle: "",
                    image: "",
                    parentCategory: "",
                    status: "active",
                    seoTitle: "",
                    seoDescription: "",
                    sortOrder: "manual",
                    displayType: "grid",
                    conditions: [],
                    type: "manual",
                    isSubcategory: false
                });
                setConditions([{ field: "product_type", operator: "equals", value: "" }]);
            } else {
                throw new Error('Failed to create category');
            }
        } catch (error) {
            console.error('Error creating category:', error);
            alert('Failed to create category. Please try again.');
        }
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewCategory(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Delete category
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this category and all its subcategories?')) {
            try {
                const response = await fetch(`/api/categories/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Remove category from state
                    const removeCategory = (catList) => {
                        return catList.filter(cat => cat.id !== id)
                            .map(cat => ({
                                ...cat,
                                children: cat.children ? removeCategory(cat.children) : []
                            }));
                    };
                    setCategories(removeCategory(categories));
                    alert('Category deleted successfully!');
                } else {
                    throw new Error('Failed to delete category');
                }
            } catch (error) {
                console.error('Error deleting category:', error);
                alert('Failed to delete category.');
            }
        }
    };

    // Render categories tree
    const renderCategoryTree = (catList, level = 0) => {
        return catList.map(category => {
            const hasChildren = category.children && category.children.length > 0;
            const isExpanded = expandedCategories.has(category.id);

            return (
                <React.Fragment key={category.id}>
                    <tr>
                        <td>
                            <div
                                className="categoryInfo"
                                style={{ paddingLeft: `${level * 30 + 15}px` }}
                            >
                                <div className="categoryTreeControls">
                                    {hasChildren && (
                                        <button
                                            type="button"
                                            onClick={() => toggleCategory(category.id)}
                                            className="expandBtn"
                                        >
                                            <FontAwesomeIcon
                                                icon={isExpanded ? faChevronDown : faChevronRight}
                                            />
                                        </button>
                                    )}
                                    <div className="categoryImage">
                                        {category.image ? (
                                            <img src={category.image} alt={category.name} />
                                        ) : (
                                            <div className="categoryImagePlaceholder">
                                                <FontAwesomeIcon icon={faFolder} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="categoryDetails">
                                        <div className="categoryName">
                                            {category.name}
                                            {category.parentId && (
                                                <span className="subcategoryBadge">Subcategory</span>
                                            )}
                                        </div>
                                        <div className="categoryDescription">
                                            {category.description}
                                        </div>
                                        <div className="categoryHandle">
                                            <FontAwesomeIcon icon={faLink} />
                                            /collections/{category.handle}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <span className="productCount">
                                <FontAwesomeIcon icon={faBox} /> {category.products}
                            </span>
                        </td>
                        <td>
                            <span className={`typeBadge ${category.type}`}>
                                {category.type === 'automated' ? 'Automated' : 'Manual'}
                            </span>
                        </td>
                        <td>
                            <span className={`statusBadge ${category.status}`}>
                                {category.status}
                            </span>
                        </td>
                        <td>
                            <div className="dateInfo">
                                <FontAwesomeIcon icon={faCalendar} />
                                {new Date(category.createdAt).toLocaleDateString()}
                            </div>
                        </td>
                        <td>
                            <div className="dateInfo">
                                <FontAwesomeIcon icon={faCalendar} />
                                {new Date(category.updatedAt).toLocaleDateString()}
                            </div>
                        </td>
                        <td>
                            <div className="actionButtons">
                                <button className="actionBtn edit" title="Edit">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button className="actionBtn clone" title="Duplicate">
                                    <FontAwesomeIcon icon={faClone} />
                                </button>
                                <button
                                    className="actionBtn delete"
                                    title="Delete"
                                    onClick={() => handleDelete(category.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </td>
                    </tr>

                    {/* Render children if expanded */}
                    {hasChildren && isExpanded && renderCategoryTree(category.children, level + 1)}
                </React.Fragment>
            );
        });
    };

    // Filter categories based on search and filters
    const filteredCategories = flattenCategories(categories).filter(category => {
        const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || category.status === statusFilter;
        const matchesType = typeFilter === 'all' || category.type === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
    });

    return (
        <Layout>
            <div className="dashContent">
                <div className="pageHeader">
                    <h1 className="pageTitle">
                        <FontAwesomeIcon icon={faFolderTree} /> Categories & Subcategories
                    </h1>
                    <div className="headerActions">
                        <button
                            className="btnSecondary"
                            onClick={() => window && window.print()}
                        >
                            <FontAwesomeIcon icon={faEye} /> Preview
                        </button>
                    </div>
                </div>

                <div className="categoriesContainer">
                    {/* Create New Category Form */}
                    <div className="createCategorySection">
                        <h2 className="sectionTitle">
                            <FontAwesomeIcon icon={faPlus} /> Create New Category
                        </h2>

                        <form onSubmit={handleSubmit} className="categoryForm">
                            <div className="formGrid">
                                {/* Left Column - Basic Info */}
                                <div className="formColumn">
                                    <div className="formGroup">
                                        <label className="checkboxLabel">
                                            <input
                                                type="checkbox"
                                                name="isSubcategory"
                                                checked={newCategory.isSubcategory}
                                                onChange={(e) => {
                                                    setNewCategory(prev => ({
                                                        ...prev,
                                                        isSubcategory: e.target.checked,
                                                        parentCategory: e.target.checked ? newCategory.parentCategory : ""
                                                    }));
                                                }}
                                                className="formCheckbox"
                                            />
                                            <span>Create as Subcategory</span>
                                        </label>
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="name">Category Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={newCategory.name}
                                            onChange={handleChange}
                                            placeholder="e.g., Summer Collection or Smartphones"
                                            required
                                            className="formInput"
                                        />
                                    </div>

                                    {newCategory.isSubcategory && (
                                        <div className="formGroup">
                                            <label htmlFor="parentCategory">Parent Category *</label>
                                            <select
                                                id="parentCategory"
                                                name="parentCategory"
                                                value={newCategory.parentCategory}
                                                onChange={handleChange}
                                                className="formSelect"
                                                required={newCategory.isSubcategory}
                                            >
                                                <option value="">Select Parent Category</option>
                                                {getParentCategories().map(category => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <small className="helpText">
                                                This category will be created as a subcategory under the selected parent
                                            </small>
                                        </div>
                                    )}

                                    <div className="formGroup">
                                        <label htmlFor="description">Description</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={newCategory.description}
                                            onChange={handleChange}
                                            placeholder="Describe this category"
                                            rows="4"
                                            className="formTextarea"
                                        />
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="handle">
                                            <FontAwesomeIcon icon={faLink} /> URL Handle
                                        </label>
                                        <div className="urlInput">
                                            <span className="urlPrefix">yourstore.com/collections/</span>
                                            <input
                                                type="text"
                                                id="handle"
                                                name="handle"
                                                value={newCategory.handle}
                                                onChange={handleChange}
                                                placeholder={
                                                    newCategory.isSubcategory
                                                        ? "Auto-generated based on parent"
                                                        : "category-url-handle"
                                                }
                                                className="formInput"
                                                readOnly={newCategory.isSubcategory}
                                            />
                                        </div>
                                        <small className="helpText">
                                            {newCategory.isSubcategory
                                                ? "Handle will be auto-generated as: parent-handle-child-handle"
                                                : "Customize the URL for this category"}
                                        </small>
                                    </div>
                                </div>

                                {/* Right Column - Settings & Image */}
                                <div className="formColumn">
                                    <div className="formGroup">
                                        <label htmlFor="type">Collection Type</label>
                                        <select
                                            id="type"
                                            name="type"
                                            value={newCategory.type}
                                            onChange={handleChange}
                                            className="formSelect"
                                        >
                                            <option value="manual">Manual Collection</option>
                                            <option value="automated">Automated Collection</option>
                                        </select>
                                        <small className="helpText">
                                            {newCategory.type === 'manual'
                                                ? 'Manually add products to this collection'
                                                : 'Automatically include products based on conditions'}
                                        </small>
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="status">Status</label>
                                        <select
                                            id="status"
                                            name="status"
                                            value={newCategory.status}
                                            onChange={handleChange}
                                            className="formSelect"
                                        >
                                            <option value="active">Active</option>
                                            <option value="draft">Draft</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="sortOrder">Sort Order</label>
                                        <select
                                            id="sortOrder"
                                            name="sortOrder"
                                            value={newCategory.sortOrder}
                                            onChange={handleChange}
                                            className="formSelect"
                                        >
                                            <option value="manual">Manual</option>
                                            <option value="best-selling">Best Selling</option>
                                            <option value="title-ascending">Title: A-Z</option>
                                            <option value="title-descending">Title: Z-A</option>
                                            <option value="price-ascending">Price: Low to High</option>
                                            <option value="price-descending">Price: High to Low</option>
                                            <option value="created-descending">Date: Newest</option>
                                            <option value="created-ascending">Date: Oldest</option>
                                        </select>
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="displayType">Display Type</label>
                                        <select
                                            id="displayType"
                                            name="displayType"
                                            value={newCategory.displayType}
                                            onChange={handleChange}
                                            className="formSelect"
                                        >
                                            <option value="grid">Grid</option>
                                            <option value="list">List</option>
                                            <option value="carousel">Carousel</option>
                                        </select>
                                    </div>

                                    {/* Image Upload */}
                                    <div className="formGroup">
                                        <label>
                                            <FontAwesomeIcon icon={faImage} /> Category Image
                                        </label>
                                        <div className="imageUploadArea">
                                            {newCategory.image ? (
                                                <div className="imagePreview">
                                                    <img src={newCategory.image} alt="Category" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setNewCategory(prev => ({ ...prev, image: "" }))}
                                                        className="btnRemoveImage"
                                                    >
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <label className="imageUploadLabel">
                                                    <FontAwesomeIcon icon={faImage} size="2x" />
                                                    <span>Click to upload image</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        className="hidden"
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Automated Conditions */}
                            {newCategory.type === "automated" && (
                                <div className="conditionsSection">
                                    <h3 className="subSectionTitle">Collection Conditions</h3>
                                    <p className="helpText">
                                        Products will be automatically added to this collection based on the following conditions
                                    </p>

                                    {conditions.map((condition, index) => (
                                        <div key={index} className="conditionRow">
                                            <select
                                                value={condition.field}
                                                onChange={(e) => handleConditionChange(index, 'field', e.target.value)}
                                                className="formSelect"
                                            >
                                                <option value="product_type">Product Type</option>
                                                <option value="vendor">Vendor</option>
                                                <option value="tag">Tag</option>
                                                <option value="price">Price</option>
                                                <option value="compare_at_price">Compare at Price</option>
                                                <option value="weight">Weight</option>
                                                <option value="inventory_stock">Inventory Stock</option>
                                                <option value="title">Title</option>
                                            </select>

                                            <select
                                                value={condition.operator}
                                                onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
                                                className="formSelect"
                                            >
                                                <option value="equals">Equals</option>
                                                <option value="not_equals">Does not equal</option>
                                                <option value="greater_than">Greater than</option>
                                                <option value="less_than">Less than</option>
                                                <option value="starts_with">Starts with</option>
                                                <option value="ends_with">Ends with</option>
                                                <option value="contains">Contains</option>
                                                <option value="not_contains">Does not contain</option>
                                            </select>

                                            <input
                                                type="text"
                                                value={condition.value}
                                                onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
                                                placeholder="Enter value"
                                                className="formInput"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => removeCondition(index)}
                                                className="btnRemove"
                                                disabled={conditions.length === 1}
                                            >
                                                <FontAwesomeIcon icon={faTimes} />
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={addCondition}
                                        className="btnAddCondition"
                                    >
                                        <FontAwesomeIcon icon={faPlus} /> Add another condition
                                    </button>
                                </div>
                            )}

                            {/* SEO Section */}
                            <div className="seoSection">
                                <h3 className="subSectionTitle">Search Engine Listing</h3>
                                <div className="formGrid">
                                    <div className="formGroup">
                                        <label htmlFor="seoTitle">Page Title</label>
                                        <input
                                            type="text"
                                            id="seoTitle"
                                            name="seoTitle"
                                            value={newCategory.seoTitle}
                                            onChange={handleChange}
                                            placeholder="Category page title for search engines"
                                            className="formInput"
                                        />
                                        <small className="helpText">
                                            {newCategory.seoTitle.length}/60 characters
                                        </small>
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="seoDescription">Meta Description</label>
                                        <textarea
                                            id="seoDescription"
                                            name="seoDescription"
                                            value={newCategory.seoDescription}
                                            onChange={handleChange}
                                            placeholder="Category description for search engines"
                                            rows="3"
                                            className="formTextarea"
                                        />
                                        <small className="helpText">
                                            {newCategory.seoDescription.length}/160 characters
                                        </small>
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="formActions">
                                <button type="button" className="btnSecondary">
                                    <FontAwesomeIcon icon={faTimes} /> Cancel
                                </button>
                                <button type="submit" className="btnPrimary">
                                    <FontAwesomeIcon icon={faSave} /> Create Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <style jsx>{`

        .categoriesContainer {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .createCategorySection {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .sectionTitle {
          font-size: 20px;
          color: #2d3748;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .subSectionTitle {
          font-size: 16px;
          color: #4a5568;
          margin: 25px 0 15px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .categoryForm {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .formGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }

        @media (max-width: 1024px) {
          .formGrid {
            grid-template-columns: 1fr;
          }
        }

        .formColumn {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .formGroup {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .formGroup label {
          font-weight: 500;
          color: #4a5568;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .formInput, .formSelect, .formTextarea {
          padding: 12px 15px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 15px;
          color: #2d3748;
          background: white;
          transition: all 0.3s;
          width: 100%;
        }

        .formInput:focus, .formSelect:focus, .formTextarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .formTextarea {
          resize: vertical;
          min-height: 100px;
          font-family: inherit;
        }

        .helpText {
          color: #a0aec0;
          font-size: 13px;
          margin-top: 4px;
        }

        .checkboxLabel {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .formCheckbox {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          border: 2px solid #cbd5e0;
          cursor: pointer;
        }

        .subcategoryBadge {
          background: #e0e7ff;
          color: #3730a3;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          margin-left: 10px;
        }

        /* URL Input */
        .urlInput {
          display: flex;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }

        .urlPrefix {
          padding: 12px 15px;
          background: #f8fafc;
          color: #718096;
          border-right: 1px solid #e2e8f0;
          font-size: 15px;
          white-space: nowrap;
        }

        .urlInput .formInput {
          border: none;
          border-radius: 0;
          flex: 1;
          background: #f8fafc;
        }

        /* Image Upload */
        .imageUploadArea {
          border: 2px dashed #cbd5e0;
          border-radius: 8px;
          padding: 30px;
          text-align: center;
          background: #f8fafc;
          cursor: pointer;
          transition: all 0.3s;
          min-height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .imageUploadArea:hover {
          border-color: #667eea;
          background: rgba(102, 126, 234, 0.05);
        }

        .imageUploadLabel {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          color: #718096;
          cursor: pointer;
        }

        .imagePreview {
          position: relative;
          width: 150px;
          height: 150px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }

        .imagePreview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .btnRemoveImage {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btnRemoveImage:hover {
          background: rgba(0, 0, 0, 0.9);
        }

        .hidden {
          display: none;
        }

        /* Categories Tree */
        .categoryTreeControls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .expandBtn {
          background: none;
          border: none;
          color: #cbd5e0;
          cursor: pointer;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .expandBtn:hover {
          color: #667eea;
        }

        .categoryImage {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          flex-shrink: 0;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .categoryImagePlaceholder {
          color: #cbd5e0;
          font-size: 18px;
        }

        .categoryImage img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .categoryDetails {
          flex: 1;
        }

        .categoryName {
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
        }

        .categoryDescription {
          color: #718096;
          font-size: 13px;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .categoryHandle {
          color: #667eea;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* Rest of the CSS remains the same as previous version */
        /* Conditions, SEO, Form Actions, Categories List, etc. */

        /* Conditions Section */
        .conditionsSection {
          background: #f8fafc;
          border-radius: 8px;
          padding: 25px;
          border: 1px solid #e2e8f0;
        }

        .conditionRow {
          display: grid;
          grid-template-columns: 1fr 1fr 2fr auto;
          gap: 15px;
          align-items: center;
          margin-bottom: 15px;
        }

        .btnRemove {
          background: #fed7d7;
          color: #c53030;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btnRemove:hover:not(:disabled) {
          background: #feb2b2;
        }

        .btnRemove:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btnAddCondition {
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: 2px dashed #cbd5e0;
          color: #718096;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          width: 100%;
          justify-content: center;
          transition: all 0.3s;
          margin-top: 15px;
        }

        .btnAddCondition:hover {
          border-color: #667eea;
          color: #667eea;
          background: rgba(102, 126, 234, 0.05);
        }

        /* SEO Section */
        .seoSection {
          background: #f8fafc;
          border-radius: 8px;
          padding: 25px;
          border: 1px solid #e2e8f0;
        }

        /* Form Actions */
        .formActions {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 20px;
          padding-top: 25px;
          border-top: 1px solid #e2e8f0;
        }

        

        /* Buttons */
        .btnPrimary, .btnSecondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
        }

        .btnPrimary {
          background: #000000;
          color: white;
        }

        .btnPrimary:hover {
          background: #1A1A1A;
        }

        .btnSecondary {
          background: #e2e8f0;
          color: #4a5568;
        }

        .btnSecondary:hover {
          background: #cbd5e0;
        }

        @media (max-width: 768px) {
          .createCategorySection{
            padding: 20px;
          }

          .conditionRow {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .listControls {
            flex-direction: column;
            align-items: stretch;
          }

          .searchBox {
            max-width: none;
          }

          .filters {
            flex-direction: column;
          }

          .filterSelect {
            min-width: auto;
          }

          .categorySummary {
            flex-direction: column;
            gap: 15px;
          }

          .formActions {
            flex-direction: column;
          }

          .btnPrimary, .btnSecondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
        </Layout>
    );
};

export default AddCategoriesPage;