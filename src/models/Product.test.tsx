import { Product, ProductInterface } from "./Product";

describe("Product class", () => {
  // Test to check if page number results in correct API & query params to be generated.
  test("Can generate a Product API URL depending on page", () => {
    expect(Product.getProductsEndpoint(0, 30)).toBe(
      "https://dummyjson.com/products?skip=0&limit=30"
    );
    expect(Product.getProductsEndpoint(1, 30)).toBe(
      "https://dummyjson.com/products?skip=30&limit=30"
    );
    expect(Product.getProductsEndpoint(2, 30)).toBe(
      "https://dummyjson.com/products?skip=60&limit=30"
    );
  });

  test("Can generate a Product API URL with correct search query", () => {
    expect(Product.getProductsEndpoint(0, 100, "iPhone 7")).toBe(
      "https://dummyjson.com/products/search?q=iPhone+7&skip=0&limit=100"
    );
  });

  // Test to see if clientside Product model constructor accepts typical API returned product.
  // Just a sanity check to make sure nobody's blown something up.
  test("Can import a product from the API as a Product class", () => {
    const iphone = {
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
      images: [
        "https://dummyjson.com/image/i/products/1/1.jpg",
        "https://dummyjson.com/image/i/products/1/2.jpg",
        "https://dummyjson.com/image/i/products/1/3.jpg",
        "https://dummyjson.com/image/i/products/1/4.jpg",
        "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
      ],
    };

    const product = new Product(iphone);

    expect(product).toMatchObject<ProductInterface>(iphone);
  });

  test("Can calculate correct discount amounts", () => {
    const product = new Product({
      id: 2,
      title: "iPhone X",
      description:
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      price: 899,
      discountPercentage: 17.94,
      rating: 4.44,
      stock: 34,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://dummyjson.com/image/i/products/2/thumbnail.jpg",
      images: [
        "https://dummyjson.com/image/i/products/2/1.jpg",
        "https://dummyjson.com/image/i/products/2/2.jpg",
        "https://dummyjson.com/image/i/products/2/3.jpg",
        "https://dummyjson.com/image/i/products/2/thumbnail.jpg",
      ],
    });

    // £899 * 0.1794 = 161.2806 (around 161.28)
    // £899 - 161.28 = 737.72
    expect(product.getDiscountAmount()).toBe("161.28");
    expect(product.getDiscountPrice()).toBe("737.72");

    // See if a discount of 0% changes the expected values.
    product.discountPercentage = 0;
    expect(product.getDiscountAmount()).toBe("0.00");
    expect(product.getDiscountPrice()).toBe("899.00");
  });
});
