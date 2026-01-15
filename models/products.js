import mongoose from "mongoose";

/* ---------- Variant Schema ---------- */
const VariantSchema = new mongoose.Schema(
  {
    options: {
      type: Map,
      of: String, // { Size: "M", Color: "Red" }
    },

    price: {
      type: Number,
      required: true,
    },

    compareAtPrice: Number,
    costPerItem: Number,

    sku: String,
    barcode: String,

    quantity: {
      type: Number,
      default: 0,
    },

    weight: Number,

    weightUnit: {
      type: String,
      enum: ["kg", "g", "lb", "oz"],
      default: "kg",
    },

    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: {
        type: String,
        enum: ["cm", "m", "in", "ft"],
        default: "cm",
      },
    },

    image: String,
  },
  { _id: true }
);

/* ---------- Product Schema ---------- */
const ProductSchema = new mongoose.Schema(
  {
    /* ===== BASIC INFO ===== */
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: String,

    type: {
      type: String,
      trim: true,
    },

    vendor: {
      type: String,
      trim: true,
    },

    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    status: {
      type: String,
      enum: ["draft", "active", "archived"],
      default: "draft",
    },

    publishedAt: Date,

    /* ===== PRICING ===== */
    price: {
      type: Number,
      required: true,
    },

    compareAtPrice: Number,

    costPerItem: Number,

    profit: Number,
    margin: Number,

    tax: {
      type: Number,
      default: 0,
    },

    /* ===== INVENTORY ===== */
    sku: String,
    barcode: String,

    quantity: {
      type: Number,
      default: 0,
    },

    trackQuantity: {
      type: Boolean,
      default: true,
    },

    allowOutOfStock: {
      type: Boolean,
      default: false,
    },

    hasVariants: {
      type: Boolean,
      default: false,
    },

    /* ===== SHIPPING ===== */
    weight: Number,

    weightUnit: {
      type: String,
      enum: ["kg", "g", "lb", "oz"],
      default: "kg",
    },

    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: {
        type: String,
        enum: ["cm", "m", "in", "ft"],
        default: "cm",
      },
    },

    /* ===== VARIANTS ===== */
    variantOptions: [
      {
        name: String,          // Size, Color, Material
        values: [String],      // ["S", "M", "L"]
      },
    ],

    variants: [VariantSchema],

    /* ===== SEO ===== */
    seo: {
      title: String,
      description: String,
      handle: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
      },
    },

    /* ===== MEDIA ===== */
    featuredImage: String,

    galleryImages: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
