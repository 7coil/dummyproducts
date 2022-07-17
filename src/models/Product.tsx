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

  /**
   * The default size of pages.
   */
  static DEFAULT_PAGE_SIZE = 100;

  /**
   * Obtain the URL to perform an API GET request upon, with given paremeters & optional search query.
   * @param page The page number
   * @param pageSize The number of products to show on a page
   * @param query An optional search query to filter by
   * @returns The URL to perform a GET request within the given parameters
   */
  static getProductsEndpoint(
    page: number = 0,
    pageSize: number = 30,
    query: string = ""
  ) {
    const env: Environment = process.env.NODE_ENV as Environment;
    let url = apis[env].products;
    const params = new URLSearchParams();

    // If a search query is provided, switch to the search endpoint.
    if (query.length > 0) {
      url = apis[env].search;

      // Add the search query parameter.
      params.set("q", query);
    }

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
    initialPageSize: number = 0,
    initialSearchQuery: string = ""
  ) {
    // The page number we wish to fetch.
    const [page, setPage] = useState(initialPageNumber);
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    const [searchTime, setSearchTime] = useState(new Date());

    const [pageSize, setPageSize] = useState(initialPageSize);
    const [total, setTotal] = useState(0);
    const [lastPage, setLastPage] = useState(false);
    const [productData, setProductData] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      // Display a loading screen...
      setIsLoading(true);

      fetch(Product.getProductsEndpoint(page, pageSize, searchQuery))
        .then((res) => res.json())
        .then((data) => {
          // Set new value for total, based on latest response.
          let newTotal = Number.parseInt(data.total, 10);
          setTotal(newTotal);

          // Calculate if this is the last page.
          let skipAmount = Number.parseInt(data.skip, 10);
          setLastPage(skipAmount + pageSize >= newTotal);

          // Convert the product data into our model.
          setProductData(
            data.products.map(
              (product: ProductInterface) => new Product(product)
            )
          );

          // No longer waiting for the data to be fetched.
          setIsLoading(false);

          // Set the time at which the fetch was completed.
          setSearchTime(new Date());
        });
    }, [page, pageSize, searchQuery]);

    return {
      page,
      setPage,
      searchQuery,
      setSearchQuery,
      pageSize,
      setPageSize,
      total,
      productData,
      lastPage,
      searchTime,
      setSearchTime,
      isLoading,
    };
  }
}

export { Product, ProductInterface, sortable_columns };
