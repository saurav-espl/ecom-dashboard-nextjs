import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBox,
    faRupeeSign,
    faBarcode,
    faEye,
    faEdit,
    faTrash,
    faCopy,
    faTag,
    faTimesCircle,
    faCheckCircle,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const AllProducDataTable = ({
    data,
    selectedProducts,
    onSelectProduct,
    onSelectAll,
    totalProducts,
    sortConfig,
    onSort,
    getSortIcon
}) => {
    const getStockStatus = (stock) => {
        if (stock === 0) return { class: "out-of-stock", text: "Out of stock" };
        if (stock <= 10) return { class: "low-stock", text: "Low stock" };
        return { class: "in-stock", text: "In stock" };
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const handleDelete = (productId, productName) => {
        if (confirm(`Are you sure you want to delete "${productName}"?`)) {
            console.log('Deleting product:', productId);
        }
    };

    const handleDuplicate = (productId) => {
        console.log('Duplicating product:', productId);
    };

    return (
        <table className="productsTable">
            <thead>
                <tr>
                    <th width="50">
                        <input
                            type="checkbox"
                            checked={selectedProducts.size === totalProducts && totalProducts > 0}
                            onChange={onSelectAll}
                            className="selectAllCheckbox"
                        />
                    </th>
                    <th>
                        <button
                            className="sortableHeader"
                            onClick={() => onSort('title')}
                        >
                            Product
                            <FontAwesomeIcon icon={getSortIcon('title')} />
                        </button>
                    </th>
                    <th>
                        <button
                            className="sortableHeader"
                            onClick={() => onSort('sku')}
                        >
                            SKU
                            <FontAwesomeIcon icon={getSortIcon('sku')} />
                        </button>
                    </th>
                    <th>
                        <button
                            className="sortableHeader"
                            onClick={() => onSort('price')}
                        >
                            Price
                            <FontAwesomeIcon icon={getSortIcon('price')} />
                        </button>
                    </th>
                    <th>
                        <button
                            className="sortableHeader"
                            onClick={() => onSort('stock')}
                        >
                            Stock
                            <FontAwesomeIcon icon={getSortIcon('stock')} />
                        </button>
                    </th>
                    <th>
                        <button
                            className="sortableHeader"
                            onClick={() => onSort('type')}
                        >
                            Type
                            <FontAwesomeIcon icon={getSortIcon('type')} />
                        </button>
                    </th>
                    <th>
                        <button
                            className="sortableHeader"
                            onClick={() => onSort('status')}
                        >
                            Status
                            <FontAwesomeIcon icon={getSortIcon('status')} />
                        </button>
                    </th>
                    <th width="240">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((product) => {
                        const stockStatus = getStockStatus(product.stock);
                        const isSelected = selectedProducts.has(product.id);

                        return (
                            <tr key={product.id} className={`product-row ${isSelected ? 'selected' : ''}`}>
                                <td>
                                    <div className="product-select">
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={(e) => onSelectProduct(product.id, e.target.checked)}
                                            className="product-checkbox"
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="product-info">
                                        <div className="product-image">
                                            {product.image ? (
                                                <img src={product.image} alt={product.title} />
                                            ) : (
                                                <div className="product-image-placeholder">
                                                    <FontAwesomeIcon icon={faBox} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="product-details">
                                            <div className="product-title">
                                                <span className="product-name">{product.title}</span>
                                                {product.featured && (
                                                    <span className="featured-badge">
                                                        <FontAwesomeIcon icon={faTag} /> Featured
                                                    </span>
                                                )}
                                            </div>
                                            <div className="product-meta">
                                                <span className="product-vendor">By {product.vendor}</span>
                                                <span className="product-categories">
                                                    {product.categories.join(', ')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="product-sku">
                                        <FontAwesomeIcon icon={faBarcode} />
                                        <span>{product.sku}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="product-price">
                                        <FontAwesomeIcon icon={faRupeeSign} />
                                        <span>{formatPrice(product.price)}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className={`stock-status ${stockStatus.class}`}>
                                        <span>{stockStatus.text}</span>
                                        <span className="stock-count">({product.stock})</span>
                                    </div>
                                </td>
                                <td>
                                    <span className={`type-badge ${product.type.toLowerCase()}`}>
                                        {product.type}
                                    </span>
                                </td>
                                <td>
                                    <span className={`status-badge ${product.status.toLowerCase()}`}>
                                        {product.status === 'Publish' ? (
                                            <FontAwesomeIcon icon={faCheckCircle} />
                                        ) : (
                                            <FontAwesomeIcon icon={faTimesCircle} />
                                        )}
                                        {product.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="product-actions">
                                        <Link href={`/dashboard/products/edit/${product.id}`} className="action-btn edit">
                                            <FontAwesomeIcon icon={faEdit} />
                                            <span>Edit</span>
                                        </Link>
                                        <button
                                            className="action-btn duplicate"
                                            onClick={() => handleDuplicate(product.id)}
                                        >
                                            <FontAwesomeIcon icon={faCopy} />
                                            <span>Duplicate</span>
                                        </button>
                                        <button
                                            className="action-btn delete"
                                            onClick={() => handleDelete(product.id, product.title)}
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
                        <td colSpan="8">
                            <div className="emptyState">
                                <FontAwesomeIcon icon={faBox} size="3x" />
                                <h3>No products found</h3>
                                <p>Try adjusting your search or filters</p>
                                <Link href="/dashboard/add-product" className="btnPrimary">
                                    <FontAwesomeIcon icon={faPlus} /> Add Your First Product
                                </Link>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default AllProducDataTable;