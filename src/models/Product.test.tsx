import { Product, ProductInterface } from "./Product";

describe("Product class", () => {
  // Test to check if page number results in correct API & query params to be generated.
  test("Can generate a Product API URL depending on page", () => {
    expect(Product.getAllProductsEndpoint(0, 30)).toBe(
      "https://dummyjson.com/products?skip=0&limit=30"
    );
    expect(Product.getAllProductsEndpoint(1, 30)).toBe(
      "https://dummyjson.com/products?skip=30&limit=30"
    );
    expect(Product.getAllProductsEndpoint(2, 30)).toBe(
      "https://dummyjson.com/products?skip=60&limit=30"
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
});
