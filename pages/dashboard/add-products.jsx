import React, { useState } from "react";
import Layout from "./layout";
import { requireAuth } from "../../lib/requireAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faImage,
    faTag,
    faDollarSign,
    faBox,
    faTruck,
    faSearch,
    faPlus,
    faTrash,
    faSave,
    faTimes,
    faEye,
    faChartLine,
    faBarcode,
    faWeight,
    faRuler,
    faInfoCircle,
    faImages,
    faLink
} from "@fortawesome/free-solid-svg-icons";

export const getServerSideProps = requireAuth;

const AddProductsPage = () => {
    // Main form state
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "",
        vendor: "",
        collections: [],
        tags: [],
        price: "",
        compareAtPrice: "",
        costPerItem: "",
        profit: "",
        margin: "",
        tax: "",
        sku: "",
        barcode: "",
        quantity: "",
        weight: "",
        weightUnit: "kg",
        length: "",
        width: "",
        height: "",
        dimensionsUnit: "cm",
        seoTitle: "",
        seoDescription: "",
        handle: "",
        status: "draft",
        publishedAt: "",
        featuredImage: "",
        galleryImages: [],
        trackQuantity: true,
        allowOutOfStock: false,
        hasVariants: false,
        variants: []
    });

    // Variants state
    const [variantOptions, setVariantOptions] = useState([
        { name: "Size", values: [] },
        { name: "Color", values: [] },
        { name: "Material", values: [] }
    ]);

    // Tab state
    const [activeTab, setActiveTab] = useState("basic");

    // Handle basic input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Auto-calculate profit and margin if cost and price are set
        if (name === 'price' || name === 'costPerItem') {
            const price = parseFloat(name === 'price' ? value : formData.price) || 0;
            const cost = parseFloat(name === 'costPerItem' ? value : formData.costPerItem) || 0;

            if (price > 0 && cost > 0) {
                const profit = price - cost;
                const margin = ((profit / price) * 100).toFixed(2);
                setFormData(prev => ({
                    ...prev,
                    profit: profit.toFixed(2),
                    margin: margin
                }));
            }
        }
    };

    // Handle variant option changes
    const handleVariantOptionChange = (index, field, value) => {
        const updatedOptions = [...variantOptions];
        if (field === 'name') {
            updatedOptions[index].name = value;
        } else if (field === 'values') {
            updatedOptions[index].values = value.split(',').map(v => v.trim()).filter(v => v);
        }
        setVariantOptions(updatedOptions);
    };

    // Add new variant option
    const addVariantOption = () => {
        setVariantOptions([...variantOptions, { name: "", values: [] }]);
    };

    // Remove variant option
    const removeVariantOption = (index) => {
        const updatedOptions = variantOptions.filter((_, i) => i !== index);
        setVariantOptions(updatedOptions);
    };

    // Handle image upload
    const handleImageUpload = (e, type = 'featured') => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'featured') {
                    setFormData(prev => ({ ...prev, featuredImage: reader.result }));
                } else {
                    setFormData(prev => ({
                        ...prev,
                        galleryImages: [...prev.galleryImages, reader.result]
                    }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Remove gallery image
    const removeGalleryImage = (index) => {
        const updatedImages = formData.galleryImages.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, galleryImages: updatedImages }));
    };

    // Handle tag input
    const handleTagInput = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const tag = e.target.value.trim();
            if (tag && !formData.tags.includes(tag)) {
                setFormData(prev => ({
                    ...prev,
                    tags: [...prev.tags, tag]
                }));
                e.target.value = '';
            }
        }
    };

    // Remove tag
    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data for submission
        const productData = {
            ...formData,
            variantOptions,
            price: parseFloat(formData.price),
            compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : null,
            costPerItem: formData.costPerItem ? parseFloat(formData.costPerItem) : null,
            quantity: parseInt(formData.quantity) || 0,
            weight: formData.weight ? parseFloat(formData.weight) : null,
            length: formData.length ? parseFloat(formData.length) : null,
            width: formData.width ? parseFloat(formData.width) : null,
            height: formData.height ? parseFloat(formData.height) : null
        };

        console.log('Product Data:', productData);

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                alert('Product created successfully!');
                // Reset form or redirect
            } else {
                throw new Error('Failed to create product');
            }
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create product. Please try again.');
        }
    };

    // Tab navigation
    const tabs = [
        { id: 'basic', label: 'Basic Info', icon: faTag },
        { id: 'pricing', label: 'Pricing', icon: faDollarSign },
        { id: 'inventory', label: 'Inventory', icon: faBox },
        { id: 'shipping', label: 'Shipping', icon: faTruck },
        { id: 'variants', label: 'Variants', icon: faChartLine },
        { id: 'seo', label: 'SEO', icon: faSearch },
        { id: 'media', label: 'Media', icon: faImages }
    ];

    return (
        <Layout>
            <div className="dashContent">
                <div className="pageHeader">
                    <h1 className="pageTitle">Add New Product</h1>
                    <div className="headerActions">
                        <button className="btnSecondary">
                            <FontAwesomeIcon icon={faEye} /> Preview
                        </button>
                        <button
                            type="submit"
                            form="productForm"
                            className="btnPrimary"
                        >
                            <FontAwesomeIcon icon={faSave} /> Save Product
                        </button>
                    </div>
                </div>

                <div className="productFormContainer">
                    <div className="formTabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`tabBtn ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <FontAwesomeIcon icon={tab.icon} />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    <form id="productForm" onSubmit={handleSubmit} className="productForm">

                        {/* Basic Information Tab */}
                        {activeTab === 'basic' && (
                            <div className="formSection">
                                <h2 className="sectionTitle">
                                    <FontAwesomeIcon icon={faTag} /> Basic Information
                                </h2>

                                <div className="formGrid">
                                    <div className="formGroup">
                                        <label htmlFor="title">Product Title *</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Enter product title"
                                            required
                                            className="formInput"
                                        />
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="type">Product Type</label>
                                        <input
                                            type="text"
                                            id="type"
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            placeholder="e.g., Clothing, Electronics"
                                            className="formInput"
                                        />
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="vendor">Vendor</label>
                                        <input
                                            type="text"
                                            id="vendor"
                                            name="vendor"
                                            value={formData.vendor}
                                            onChange={handleChange}
                                            placeholder="Brand or manufacturer"
                                            className="formInput"
                                        />
                                    </div>

                                    <div className="formGroup fullWidth">
                                        <label htmlFor="description">Description</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Enter detailed product description"
                                            rows="6"
                                            className="formTextarea"
                                        />
                                    </div>

                                    <div className="formGroup fullWidth">
                                        <label htmlFor="tags">Tags</label>
                                        <div className="tagsInput">
                                            {formData.tags.map((tag, index) => (
                                                <span key={index} className="tag">
                                                    {tag}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeTag(tag)}
                                                        className="tagRemove"
                                                    >
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </button>
                                                </span>
                                            ))}
                                            <input
                                                type="text"
                                                id="tags"
                                                placeholder="Add tags (press Enter or comma)"
                                                onKeyDown={handleTagInput}
                                                className="tagInput"
                                            />
                                        </div>
                                        <small className="helpText">Press Enter or comma to add tags</small>
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="status">Status</label>
                                        <select
                                            id="status"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className="formSelect"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="active">Active</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Pricing Tab */}
                        {activeTab === 'pricing' && (
                            <div className="formSection">
                                <h2 className="sectionTitle">
                                    <FontAwesomeIcon icon={faDollarSign} /> Pricing
                                </h2>

                                <div className="formGrid">
                                    <div className="formGroup">
                                        <label htmlFor="price">Price *</label>
                                        <div className="inputWithPrefix">
                                            <span className="inputPrefix">$</span>
                                            <input
                                                type="number"
                                                id="price"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                step="0.01"
                                                min="0"
                                                required
                                                className="formInput"
                                            />
                                        </div>
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="compareAtPrice">Compare at Price</label>
                                        <div className="inputWithPrefix">
                                            <span className="inputPrefix">$</span>
                                            <input
                                                type="number"
                                                id="compareAtPrice"
                                                name="compareAtPrice"
                                                value={formData.compareAtPrice}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                step="0.01"
                                                min="0"
                                                className="formInput"
                                            />
                                        </div>
                                        <small className="helpText">Shows the original price crossed out</small>
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="costPerItem">Cost per Item</label>
                                        <div className="inputWithPrefix">
                                            <span className="inputPrefix">$</span>
                                            <input
                                                type="number"
                                                id="costPerItem"
                                                name="costPerItem"
                                                value={formData.costPerItem}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                step="0.01"
                                                min="0"
                                                className="formInput"
                                            />
                                        </div>
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="profit">Profit</label>
                                        <div className="inputWithPrefix">
                                            <span className="inputPrefix">$</span>
                                            <input
                                                type="text"
                                                id="profit"
                                                name="profit"
                                                value={formData.profit}
                                                readOnly
                                                className="formInput"
                                            />
                                        </div>
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="margin">Margin</label>
                                        <div className="inputWithSuffix">
                                            <input
                                                type="text"
                                                id="margin"
                                                name="margin"
                                                value={formData.margin}
                                                readOnly
                                                className="formInput"
                                            />
                                            <span className="inputSuffix">%</span>
                                        </div>
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="tax">Tax</label>
                                        <div className="inputWithSuffix">
                                            <input
                                                type="number"
                                                id="tax"
                                                name="tax"
                                                value={formData.tax}
                                                onChange={handleChange}
                                                placeholder="0"
                                                step="0.01"
                                                min="0"
                                                className="formInput"
                                            />
                                            <span className="inputSuffix">%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Inventory Tab */}
                        {activeTab === 'inventory' && (
                            <div className="formSection">
                                <h2 className="sectionTitle">
                                    <FontAwesomeIcon icon={faBox} /> Inventory
                                </h2>

                                <div className="formGrid">
                                    <div className="formGroup">
                                        <label htmlFor="sku">SKU (Stock Keeping Unit)</label>
                                        <input
                                            type="text"
                                            id="sku"
                                            name="sku"
                                            value={formData.sku}
                                            onChange={handleChange}
                                            placeholder="e.g., SKU-12345"
                                            className="formInput"
                                        />
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="barcode">
                                            <FontAwesomeIcon icon={faBarcode} /> Barcode (ISBN, UPC, GTIN)
                                        </label>
                                        <input
                                            type="text"
                                            id="barcode"
                                            name="barcode"
                                            value={formData.barcode}
                                            onChange={handleChange}
                                            placeholder="e.g., 123456789012"
                                            className="formInput"
                                        />
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="quantity">Quantity *</label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            placeholder="0"
                                            min="0"
                                            required
                                            className="formInput"
                                        />
                                    </div>

                                    <div className="formGroup checkboxGroup">
                                        <label className="checkboxLabel">
                                            <input
                                                type="checkbox"
                                                name="trackQuantity"
                                                checked={formData.trackQuantity}
                                                onChange={handleChange}
                                                className="formCheckbox"
                                            />
                                            <span>Track quantity</span>
                                        </label>
                                    </div>

                                    <div className="formGroup checkboxGroup">
                                        <label className="checkboxLabel">
                                            <input
                                                type="checkbox"
                                                name="allowOutOfStock"
                                                checked={formData.allowOutOfStock}
                                                onChange={handleChange}
                                                className="formCheckbox"
                                            />
                                            <span>Allow customers to purchase when out of stock</span>
                                        </label>
                                    </div>

                                    <div className="formGroup checkboxGroup">
                                        <label className="checkboxLabel">
                                            <input
                                                type="checkbox"
                                                name="hasVariants"
                                                checked={formData.hasVariants}
                                                onChange={handleChange}
                                                className="formCheckbox"
                                            />
                                            <span>This product has multiple options (variants)</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Shipping Tab */}
                        {activeTab === 'shipping' && (
                            <div className="formSection">
                                <h2 className="sectionTitle">
                                    <FontAwesomeIcon icon={faTruck} /> Shipping
                                </h2>

                                <div className="formGrid">
                                    <div className="formGroup">
                                        <label htmlFor="weight">
                                            <FontAwesomeIcon icon={faWeight} /> Weight
                                        </label>
                                        <div className="inputWithSuffix">
                                            <input
                                                type="number"
                                                id="weight"
                                                name="weight"
                                                value={formData.weight}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                step="0.01"
                                                min="0"
                                                className="formInput"
                                            />
                                            <select
                                                name="weightUnit"
                                                value={formData.weightUnit}
                                                onChange={handleChange}
                                                className="inputSuffix select"
                                            >
                                                <option value="kg">kg</option>
                                                <option value="g">g</option>
                                                <option value="lb">lb</option>
                                                <option value="oz">oz</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="dimensionsGroup">
                                        <h3 className="subSectionTitle">
                                            <FontAwesomeIcon icon={faRuler} /> Dimensions
                                        </h3>
                                        <div className="dimensionsInputs">
                                            <div className="dimensionInput">
                                                <label htmlFor="length">Length</label>
                                                <div className="inputWithSuffix">
                                                    <input
                                                        type="number"
                                                        id="length"
                                                        name="length"
                                                        value={formData.length}
                                                        onChange={handleChange}
                                                        placeholder="0.00"
                                                        step="0.01"
                                                        min="0"
                                                        className="formInput"
                                                    />
                                                    <span className="inputSuffix">{formData.dimensionsUnit}</span>
                                                </div>
                                            </div>
                                            <div className="dimensionInput">
                                                <label htmlFor="width">Width</label>
                                                <div className="inputWithSuffix">
                                                    <input
                                                        type="number"
                                                        id="width"
                                                        name="width"
                                                        value={formData.width}
                                                        onChange={handleChange}
                                                        placeholder="0.00"
                                                        step="0.01"
                                                        min="0"
                                                        className="formInput"
                                                    />
                                                    <span className="inputSuffix">{formData.dimensionsUnit}</span>
                                                </div>
                                            </div>
                                            <div className="dimensionInput">
                                                <label htmlFor="height">Height</label>
                                                <div className="inputWithSuffix">
                                                    <input
                                                        type="number"
                                                        id="height"
                                                        name="height"
                                                        value={formData.height}
                                                        onChange={handleChange}
                                                        placeholder="0.00"
                                                        step="0.01"
                                                        min="0"
                                                        className="formInput"
                                                    />
                                                    <span className="inputSuffix">{formData.dimensionsUnit}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="unitSelector">
                                            <label>Unit:</label>
                                            <select
                                                name="dimensionsUnit"
                                                value={formData.dimensionsUnit}
                                                onChange={handleChange}
                                                className="formSelect"
                                            >
                                                <option value="cm">cm</option>
                                                <option value="m">m</option>
                                                <option value="in">in</option>
                                                <option value="ft">ft</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Variants Tab */}
                        {activeTab === 'variants' && (
                            <div className="formSection">
                                <h2 className="sectionTitle">
                                    <FontAwesomeIcon icon={faChartLine} /> Variants
                                </h2>

                                <div className="variantsSection">
                                    <div className="variantOptions">
                                        <h3 className="subSectionTitle">Options</h3>
                                        {variantOptions.map((option, index) => (
                                            <div key={index} className="variantOption">
                                                <div className="variantOptionHeader">
                                                    <input
                                                        type="text"
                                                        value={option.name}
                                                        onChange={(e) => handleVariantOptionChange(index, 'name', e.target.value)}
                                                        placeholder="Option name (e.g., Size)"
                                                        className="formInput"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeVariantOption(index)}
                                                        className="btnRemove"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </div>
                                                <div className="variantOptionValues">
                                                    <label>Values (comma separated):</label>
                                                    <input
                                                        type="text"
                                                        value={option.values.join(', ')}
                                                        onChange={(e) => handleVariantOptionChange(index, 'values', e.target.value)}
                                                        placeholder="e.g., Small, Medium, Large"
                                                        className="formInput"
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={addVariantOption}
                                            className="btnAddOption"
                                        >
                                            <FontAwesomeIcon icon={faPlus} /> Add another option
                                        </button>
                                    </div>

                                    {formData.hasVariants && (
                                        <div className="variantsPreview">
                                            <h3 className="subSectionTitle">Generated Variants</h3>
                                            <p className="helpText">
                                                Variants will be automatically generated based on your options
                                            </p>
                                            {/* Variants preview would go here */}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* SEO Tab */}
                        {activeTab === 'seo' && (
                            <div className="formSection">
                                <h2 className="sectionTitle">
                                    <FontAwesomeIcon icon={faSearch} /> Search Engine Optimization
                                </h2>

                                <div className="formGrid">
                                    <div className="formGroup">
                                        <label htmlFor="seoTitle">Page Title</label>
                                        <input
                                            type="text"
                                            id="seoTitle"
                                            name="seoTitle"
                                            value={formData.seoTitle}
                                            onChange={handleChange}
                                            placeholder="Product page title for search engines"
                                            className="formInput"
                                        />
                                        <small className="helpText">Recommended: 50-60 characters</small>
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="seoDescription">Meta Description</label>
                                        <textarea
                                            id="seoDescription"
                                            name="seoDescription"
                                            value={formData.seoDescription}
                                            onChange={handleChange}
                                            placeholder="Product description for search engines"
                                            rows="3"
                                            className="formTextarea"
                                        />
                                        <small className="helpText">Recommended: 150-160 characters</small>
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="handle">
                                            <FontAwesomeIcon icon={faLink} /> URL Handle
                                        </label>
                                        <div className="urlInput">
                                            <span className="urlPrefix">yourstore.com/products/</span>
                                            <input
                                                type="text"
                                                id="handle"
                                                name="handle"
                                                value={formData.handle}
                                                onChange={handleChange}
                                                placeholder="product-url-handle"
                                                className="formInput"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Media Tab */}
                        {activeTab === 'media' && (
                            <div className="formSection">
                                <h2 className="sectionTitle">
                                    <FontAwesomeIcon icon={faImages} /> Media
                                </h2>

                                <div className="mediaSection">
                                    <div className="featuredImageSection">
                                        <h3 className="subSectionTitle">Featured Image</h3>
                                        <div className="imageUploadArea">
                                            {formData.featuredImage ? (
                                                <div className="imagePreview">
                                                    <img src={formData.featuredImage} alt="Featured" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                                                        className="btnRemoveImage"
                                                    >
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <label className="imageUploadLabel">
                                                    <FontAwesomeIcon icon={faImage} size="3x" />
                                                    <span>Click to upload featured image</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleImageUpload(e, 'featured')}
                                                        className="hidden"
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    </div>

                                    <div className="gallerySection">
                                        <h3 className="subSectionTitle">Gallery Images</h3>
                                        <div className="galleryImages">
                                            {formData.galleryImages.map((image, index) => (
                                                <div key={index} className="galleryImage">
                                                    <img src={image} alt={`Gallery ${index + 1}`} />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeGalleryImage(index)}
                                                        className="btnRemoveImage"
                                                    >
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </button>
                                                </div>
                                            ))}
                                            <label className="addImageButton">
                                                <FontAwesomeIcon icon={faPlus} />
                                                <span>Add Image</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload(e, 'gallery')}
                                                    className="hidden"
                                                    multiple
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Form Actions */}
                        <div className="formActions">
                            <button type="button" className="btnSecondary">
                                <FontAwesomeIcon icon={faTimes} /> Cancel
                            </button>
                            <button type="submit" className="btnPrimary">
                                <FontAwesomeIcon icon={faSave} /> Save Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx>{`
        .headerActions {
          display: flex;
          gap: 15px;
        }

        .productFormContainer {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .formTabs {
          display: flex;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          overflow-x: auto;
        }

        .tabBtn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 20px 25px;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          color: #718096;
          font-weight: 500;
          font-size: 15px;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s;
          font-family: inherit;
        }

        .tabBtn:hover {
          background: #edf2f7;
          color: #4a5568;
        }

        .tabBtn.active {
          color: #000000;
          border-bottom-color: #000000;
          background: white;
        }

        .productForm {
          padding: 30px;
        }

        .formSection {
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
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

        .formGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .fullWidth {
          grid-column: 1 / -1;
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
          border-color: #000000;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .formTextarea {
          resize: vertical;
          min-height: 120px;
          font-family: inherit;
        }

        .inputWithPrefix, .inputWithSuffix {
          position: relative;
          display: flex;
          align-items: center;
        }

        .inputPrefix, .inputSuffix {
          position: absolute;
          color: #718096;
          font-size: 15px;
          font-weight: 500;
        }

        .inputPrefix {
          left: 15px;
        }

        .inputWithPrefix .formInput {
          padding-left: 35px;
        }

        .inputSuffix {
          right: 15px;
        }

        .inputSuffix.select {
          background: none;
          border: none;
          padding: 0;
          margin: 0;
        }

        .inputWithSuffix .formInput {
          padding-right: 50px;
        }

        .helpText {
          color: #a0aec0;
          font-size: 13px;
          margin-top: 4px;
        }

        .checkboxGroup {
          margin-top: 15px;
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

        /* Tags Input */
        .tagsInput {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          min-height: 46px;
        }

        .tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #e2e8f0;
          color: #4a5568;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 14px;
        }

        .tagRemove {
          background: none;
          border: none;
          color: #a0aec0;
          cursor: pointer;
          padding: 0;
          font-size: 12px;
        }

        .tagRemove:hover {
          color: #e53e3e;
        }

        .tagInput {
          flex: 1;
          min-width: 120px;
          border: none;
          outline: none;
          padding: 8px;
          font-size: 15px;
          background: transparent;
        }

        /* Dimensions */
        .dimensionsInputs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin: 15px 0;
        }

        .dimensionInput {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .unitSelector {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 15px;
        }

        /* Variants */
        .variantOptions {
          margin-bottom: 30px;
        }

        .variantOption {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 15px;
        }

        .variantOptionHeader {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
        }

        .variantOptionHeader .formInput {
          flex: 1;
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

        .btnRemove:hover {
          background: #feb2b2;
        }

        .variantOptionValues {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .btnAddOption {
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: 2px dashed #cbd5e0;
          color: #718096;
          padding: 15px 20px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          width: 100%;
          justify-content: center;
          transition: all 0.3s;
        }

        .btnAddOption:hover {
          border-color: #000000;
          color: #000000;
          background: rgba(102, 126, 234, 0.05);
        }

        /* Media Upload */
        .imageUploadArea {
          border: 2px dashed #cbd5e0;
          border-radius: 8px;
          padding: 40px;
          text-align: center;
          background: #f8fafc;
          cursor: pointer;
          transition: all 0.3s;
        }

        .imageUploadArea:hover {
          border-color: #000000;
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

        .imagePreview, .galleryImage {
          position: relative;
          width: 200px;
          height: 200px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }

        .imagePreview img, .galleryImage img {
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

        .galleryImages {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-top: 15px;
        }

        .addImageButton {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 200px;
          height: 200px;
          border: 2px dashed #cbd5e0;
          border-radius: 8px;
          background: #f8fafc;
          color: #718096;
          cursor: pointer;
          transition: all 0.3s;
        }

        .addImageButton:hover {
          border-color: #000000;
          color: #000000;
          background: rgba(102, 126, 234, 0.05);
        }

        .hidden {
          display: none;
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
        }

        .urlInput .formInput {
          border: none;
          border-radius: 0;
        }


        .formActions {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 40px;
          padding-top: 25px;
          border-top: 1px solid #e2e8f0;
        }

        @media (max-width: 768px) {
          .headerActions {
            width: 100%;
            justify-content: flex-end;
          }

          .formTabs {
            overflow-x: auto;
          }

          .tabBtn {
            padding: 15px 20px;
            font-size: 14px;
          }

          .productForm {
            padding: 20px;
          }

          .formGrid {
            grid-template-columns: 1fr;
          }

          .dimensionsInputs {
            grid-template-columns: 1fr;
          }

          .galleryImages {
            justify-content: center;
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

export default AddProductsPage;