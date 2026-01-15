import connectDB from "../../../lib/mongodb";
import Product from "../../../models/Products";

export default async function handler(req, res) {
  await connectDB();
  if (req.method !== "POST") {
        try {
            // const users = await User.find().select("-password");
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
  }

  try {
    const {
      title,
      description,
      type,
      vendor,
      collections,
      tags,
      status,
      publishedAt,

      price,
      compareAtPrice,
      costPerItem,
      tax,

      sku,
      barcode,
      quantity,
      trackQuantity,
      allowOutOfStock,
      hasVariants,

      weight,
      weightUnit,
      length,
      width,
      height,
      dimensionsUnit,

      variantOptions,
      variants,

      seoTitle,
      seoDescription,

      featuredImage,
      galleryImages,
    } = req.body;


    const handle = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

    /* --------- SAFETY CHECKS --------- */
    if (!title || price == null) {
      return res.status(400).json({
        message: "Title and price are required",
      });
    }

    /* --------- DERIVED VALUES --------- */
    let profit = null;
    let margin = null;

    if (price && costPerItem) {
      profit = price - costPerItem;
      margin = Number(((profit / price) * 100).toFixed(2));
    }

    /* --------- CREATE PRODUCT --------- */
    const product = await Product.create({
      title,
      description,
      type,
      vendor,
      collections,
      tags,
      status,
      publishedAt: status === "active" ? new Date() : null,

      price,
      compareAtPrice,
      costPerItem,
      profit,
      margin,
      tax,

      sku,
      barcode,
      quantity,
      trackQuantity,
      allowOutOfStock,
      hasVariants,

      weight,
      weightUnit,

      dimensions: {
        length,
        width,
        height,
        unit: dimensionsUnit,
      },

      variantOptions,
      variants: hasVariants ? variants : [],

      seo: {
        title: seoTitle,
        description: seoDescription,
        handle,
      },

      featuredImage,
      galleryImages,
    });

    return res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Product handle already exists",
      });
    }

    return res.status(500).json({
      message: "Failed to create product",
    });
  }
}
