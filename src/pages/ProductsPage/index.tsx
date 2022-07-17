import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { Button } from "../../components/Button";
import { ButtonGroup } from "../../components/ButtonGroup";
import { Form, FormColumn, FormRow } from "../../components/Form";
import { Layout } from "../../components/Layout";
import { SEO } from "../../components/SEO";
import { TableSection } from "../../components/TableSection";
import { TextSection } from "../../components/TextSection";
import { useDeletedArray } from "../../hooks/useDeleted";
import { Category } from "../../models/Category";
import { Product, sortable_columns } from "../../models/Product";
import { ProductRow } from "./ProductRow";

const ProductsPage = () => {
  /**
   * Preload State from Query Parameters
   */
  const [searchParams, setSearchParams] = useSearchParams();

  // Grab search parameters, and initialise them if they are not defined.
  const initialSearchQuery = searchParams.get("q") || "";
  const initialPageSize =
    parseInt(searchParams.get("limit") || "", 10) || Product.DEFAULT_PAGE_SIZE;
  const initialPage = parseInt(searchParams.get("page") || "", 10) || 0;

  useEffect(() => {
    // Set the query/limit in the fetcher and the forms.
    setUnsentSearchQuery(initialSearchQuery);

    // Clamp the page size between 5 and 200.
    setUnsentPageSize(Math.min(200, Math.max(5, initialPageSize)));
  }, []);

  // Fetch all products that match the given page, page size and search query.
  const {
    page,
    setPage,
    setPageSize,
    productData,
    lastPage,
    searchQuery,
    setSearchQuery,
    searchTime,
    pageSize,
    total,
  } = Product.useProducts(initialPage, initialPageSize, initialSearchQuery);

  // Fetch all product categories
  const categories = Category.useCategories();

  // Keep a set of "deleted" products that should no longer be displayed.
  const { deleted, addDeleted } = useDeletedArray();

  /**
   * Page State
   * Keeps track of the buttons and forms present on this page.
   */
  // Show Columns
  const [showIdColumn, setShowIdColumn] = useState(false);
  const [showThumbnailColumn, setShowThumbnailColumn] = useState(false);
  const [showProductColumn, setShowProductColumn] = useState(true);
  const [showPriceColumn, setShowPriceColumn] = useState(true);
  const [showStockColumn, setShowStockColumn] = useState(true);
  const [showRatingColumn, setShowRatingColumn] = useState(false);
  const [showBrandColumn, setShowBrandColumn] = useState(false);
  const [showCategoryColumn, setShowCategoryColumn] = useState(true);
  const numberOfEnabledColumns = [
    showIdColumn,
    showThumbnailColumn,
    showProductColumn,
    showPriceColumn,
    showStockColumn,
    showRatingColumn,
    showBrandColumn,
    showCategoryColumn,
  ].filter((col) => col).length;

  // Sort
  const [productSort, setProductSort] = useState<sortable_columns>("title");
  const [sortHighToLow, setSortHighToLow] = useState(false);

  // Filter
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Search Options
  // Prefixed with "unsent" to differentiate between the user-controlled fields, which aren't sent yet,
  // and the useCategories variant, which will have been sent to the API.
  const [unsentSearchQuery, setUnsentSearchQuery] = useState("");
  const [unsentPageSize, setUnsentPageSize] = useState(pageSize);
  const disableSearchButton =
    unsentSearchQuery === searchQuery && unsentPageSize === pageSize;

  const displayedProducts = productData.filter((product) => {
    // If the product is in the deleted list, hide it.
    if (deleted.includes(product.id)) return false;

    // If the category is set to "all", display all files.
    if (categoryFilter === "all") return true;

    // Otherwise, filter the product by the current file.
    return product.category === categoryFilter;
  });

  return (
    <Layout>
      <SEO title={searchQuery ? `Search for "${searchQuery}"` : ""} />

      <TextSection>
        <h1>Products</h1>

        <h2>Search Options</h2>
        <Form>
          <FormColumn>
            <h3>Search Parameters</h3>
            <FormColumn>
              <label htmlFor="search">Search Query</label>
              <input
                type="text"
                id="search"
                placeholder="Enter your search query..."
                value={unsentSearchQuery}
                maxLength={64}
                onChange={(e) => setUnsentSearchQuery(e.target.value)}
              ></input>
            </FormColumn>
            <FormColumn>
              <label htmlFor="limit">Products per Page</label>
              <input
                type="number"
                value={unsentPageSize}
                onChange={(e) =>
                  setUnsentPageSize(parseInt(e.target.value, 10))
                }
                min={5}
                max={200}
                step={5}
              ></input>
            </FormColumn>
            <ButtonGroup>
              <Button
                type="submit"
                onClick={(e) => {
                  // Cancel the form, to prevent page refresh
                  e.preventDefault();

                  // Set-up the query for the fetcher
                  setSearchQuery(unsentSearchQuery);
                  setPageSize(unsentPageSize);
                  setPage(0);

                  // Copy our query to the URL Search Parameters
                  setSearchParams({
                    q: unsentSearchQuery,
                    limit: unsentPageSize.toString(10),
                    page: "0",
                  });
                }}
                // Disabled when current unsent params are the same as the previous query.
                disabled={disableSearchButton}
                title={
                  disableSearchButton
                    ? "Please change search parameters before performing a query."
                    : ""
                }
              >
                Update Query
              </Button>
            </ButtonGroup>
          </FormColumn>
          <FormColumn>
            <h3>Filter</h3>

            <FormColumn>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </FormColumn>
          </FormColumn>
          <FormColumn>
            <h3>Sort</h3>

            <FormColumn>
              <label htmlFor="sortkey">Sort by</label>
              <select
                onChange={(e) =>
                  setProductSort(e.target.value as sortable_columns)
                }
                id="sortkey"
              >
                <option value="title">Title</option>
                <option value="description">Description</option>
                <option value="category">Category</option>
                <option value="price">Price</option>
                <option value="stock">Stock</option>
              </select>
            </FormColumn>
            <FormColumn>
              <label htmlFor="sortdirection">Sort direction</label>
              <select
                onChange={(e) => setSortHighToLow(e.target.value === "true")}
                value={`${sortHighToLow}`}
                id="sortdirection"
              >
                <option value="false">Lowest to Highest (A to Z)</option>
                <option value="true">Highest to Lowest (Z to A)</option>
              </select>
            </FormColumn>
          </FormColumn>
          <FormColumn>
            <h3>Show Columns ({numberOfEnabledColumns})</h3>
            <FormRow>
              <input
                checked={showIdColumn}
                onChange={(e) => setShowIdColumn(!showIdColumn)}
                type="checkbox"
                id="id"
              ></input>
              <label htmlFor="id">ID</label>
            </FormRow>
            <FormRow>
              <input
                checked={showThumbnailColumn}
                onChange={(e) => setShowThumbnailColumn(!showThumbnailColumn)}
                type="checkbox"
                id="thumbnail"
              ></input>
              <label htmlFor="thumbnail">Thumbnail</label>
            </FormRow>
            <FormRow>
              <input
                checked={showProductColumn}
                onChange={(e) => setShowProductColumn(!showProductColumn)}
                type="checkbox"
                id="product"
              ></input>
              <label htmlFor="product">Product</label>
            </FormRow>
            <FormRow>
              <input
                checked={showPriceColumn}
                onChange={(e) => setShowPriceColumn(!showPriceColumn)}
                type="checkbox"
                id="price"
              ></input>
              <label htmlFor="price">Sale Price</label>
            </FormRow>
            <FormRow>
              <input
                checked={showStockColumn}
                onChange={(e) => setShowStockColumn(!showStockColumn)}
                type="checkbox"
                id="stock"
              ></input>
              <label htmlFor="stock">Stock</label>
            </FormRow>
            <FormRow>
              <input
                checked={showRatingColumn}
                onChange={(e) => setShowRatingColumn(!showRatingColumn)}
                type="checkbox"
                id="rating"
              ></input>
              <label htmlFor="rating">Customer Rating</label>
            </FormRow>
            <FormRow>
              <input
                checked={showBrandColumn}
                onChange={(e) => setShowBrandColumn(!showBrandColumn)}
                type="checkbox"
                id="brand"
              ></input>
              <label htmlFor="brand">Brand</label>
            </FormRow>
            <FormRow>
              <input
                checked={showCategoryColumn}
                onChange={(e) => setShowCategoryColumn(!showCategoryColumn)}
                type="checkbox"
                id="category"
              ></input>
              <label htmlFor="Category">Category</label>
            </FormRow>
          </FormColumn>
        </Form>
      </TextSection>
      <TextSection>
        <h2>{searchQuery ? `Search for ${searchQuery}` : "All products"}</h2>

        <p>
          Report Generated at:{" "}
          {searchTime.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </p>
      </TextSection>
      <TableSection>
        <table className="w-full table-auto border-spacing-y-2">
          <thead>
            <tr>
              {showIdColumn && <th className="p-4">ID</th>}
              {showThumbnailColumn && <th className="p-4">Thumbnail</th>}
              {showProductColumn && <th className="p-4">Product</th>}
              {showPriceColumn && <th className="p-4">Sale Price</th>}
              {showStockColumn && <th className="p-4">Stock</th>}
              {showRatingColumn && <th className="p-4">Customer Rating</th>}
              {showBrandColumn && <th className="p-4">Brand</th>}
              {showCategoryColumn && <th className="p-4">Category</th>}
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.length === 0 && (
              <tr>
                {/* Extra colSpan is for the Actions column */}
                <td
                  className="text-center"
                  colSpan={numberOfEnabledColumns + 1}
                >
                  There are no products to display on this page.
                </td>
              </tr>
            )}
            {displayedProducts
              .sort((a, b) => {
                let indexA = a[productSort];
                let indexB = b[productSort];

                // Reverse A and B if we're sorting the other direction.
                if (sortHighToLow) {
                  [indexA, indexB] = [indexB, indexA];
                }

                // If the index we're going to sort by is a String, use localeCompare to sort.
                if (typeof indexA === "string" && typeof indexB === "string") {
                  return indexA.localeCompare(indexB);
                }

                // Otherwise, use the traditional comparison method, such as for numbers.
                if (indexA < indexB) return -1;
                if (indexA > indexB) return 1;
                return 0;
              })
              .map((product) => (
                <ProductRow
                  product={product}
                  showIdColumn={showIdColumn}
                  showThumbnailColumn={showThumbnailColumn}
                  showProductColumn={showProductColumn}
                  showPriceColumn={showPriceColumn}
                  showStockColumn={showStockColumn}
                  showRatingColumn={showRatingColumn}
                  showBrandColumn={showBrandColumn}
                  showCategoryColumn={showCategoryColumn}
                  addDeleted={addDeleted}
                  key={product.id}
                />
              ))}
          </tbody>
        </table>
      </TableSection>
      <TextSection>
        <ButtonGroup centre>
          {/* Only show the Back button if on Page 0 or above */}
          {page > 0 && (
            <Button
              onClick={() => {
                setPage(page - 1);
                setSearchParams({
                  q: searchQuery,
                  limit: pageSize.toString(10),
                  page: `${page - 1}`,
                });
              }}
            >
              Back
            </Button>
          )}

          {/*
            The current page number
            WARNING! Adding (+1) to the pageNumber for End-User readability.
            Page Numbers internally are still zero-indexed.
          */}
          <Button disabled title={`Page ${page + 1}`}>
            {page + 1}
          </Button>

          {/* Hide the next button if we're on the last page. */}
          {!lastPage && (
            <Button
              onClick={() => {
                setPage(page + 1);
                setSearchParams({
                  q: searchQuery,
                  limit: pageSize.toString(10),
                  page: `${page + 1}`,
                });
              }}
            >
              Forward
            </Button>
          )}
        </ButtonGroup>
      </TextSection>
    </Layout>
  );
};

export { ProductsPage };
