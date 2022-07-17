import { useEffect, useState } from "react";
import apis from "../config.json";
import { Environment } from "../types/env";

type sortable_columns =
  | "category"
  | "title"
  | "description"
  | "price"
  | "stock";

interface ProductInterface {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

class Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];

  constructor({
    id,
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  }: ProductInterface) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.discountPercentage = discountPercentage;
    this.rating = rating;
    this.stock = stock;
    this.brand = brand;
    this.category = category;
    this.thumbnail = thumbnail;
    this.images = images;
  }

  /**
   * Get the new discounted price
   * @returns The new price that a user will be paying
   */
  getDiscountPrice(): string {
    return (this.price * ((100 - this.discountPercentage) / 100)).toFixed(2);
  }

  /**
   * Obtain the discount amount
   * @returns The amount from the original price that has been deducted
   */
  getDiscountAmount(): string {
    return (this.price * (this.discountPercentage / 100)).toFixed(2);
  }

  static getAllProductsEndpoint(page: number = 0, pageSize: number = 30) {
    const env: Environment = process.env.NODE_ENV as Environment;
    let url = apis[env].products;
    const params = new URLSearchParams();

    // Skip the number of pages based on the page size (limit!)
    params.set("skip", (page * pageSize).toString(10));

    // Set the page size
    params.set("limit", pageSize.toString(10));

    // Merge the API Endpoint with the Params
    return `${url}?${params}`;
  }

  /**
   * A ReactJS hook for loading products from the Products API.
   * @param initialPageNumber The initial page number for the useProducts hook to fetch.
   * @param initialSearchQuery The user's search query within the search box.
   */
  static useProducts(
    initialPageNumber: number = 0,
    initialSearchQuery: string = ""
  ) {
    // The page number we wish to fetch.
    const [page, setPage] = useState(initialPageNumber);
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

    // TODO: Un-hardcode page size to 30.
    const [pageSize, setPageSize] = useState(30);
    const [total, setTotal] = useState(0);
    const [lastPage, setLastPage] = useState(0);
    const [productData, setProductData] = useState<Product[]>([]);

    // When the page number changes, fetch the page, then update
    useEffect(() => {
      fetch(Product.getAllProductsEndpoint(page, pageSize))
        .then((res) => res.json())
        .then((data) => {
          // Set new value for total, based on latest response.
          let newTotal = Number.parseInt(data.total, 10);
          setTotal(newTotal);

          // Calculate the number of pages required to store all pages
          setLastPage(Math.ceil(newTotal / pageSize));

          // Convert the product data into our model.
          setProductData(
            data.products.map(
              (product: ProductInterface) => new Product(product)
            )
          );
        });
    }, [page]);

    return {
      page,
      setPage,
      searchQuery,
      pageSize,
      total,
      productData,
      lastPage,
    };
  }
}

export { Product, ProductInterface, sortable_columns };
