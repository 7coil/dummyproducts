import React, { useState } from "react";
import { Button } from "../../components/Button";
import { ButtonGroup } from "../../components/ButtonGroup";
import { Layout } from "../../components/Layout";
import { TableSection } from "../../components/TableSection";
import { TextSection } from "../../components/TextSection";
import { Product, sortable_columns } from "../../models/Product";
import StarRatings from "react-star-ratings";
import { Form, FormColumn, FormRow } from "../../components/Form";
import { Category } from "../../models/Category";

const ProductsPage = () => {
  const {
    page,
    setPage,
    productData,
    lastPage,
    searchQuery,
    searchFor,
    searchTime,
    pageSize,
  } = Product.useProducts(0, "");
  const categories = Category.useCategories();

  // Show Columns
  const [showIdColumn, setShowIdColumn] = useState(false);
  const [showThumbnailColumn, setShowThumbnailColumn] = useState(false);
  const [showProductColumn, setShowProductColumn] = useState(true);
  const [showPriceColumn, setShowPriceColumn] = useState(true);
  const [showStockColumn, setShowStockColumn] = useState(true);
  const [showRatingColumn, setShowRatingColumn] = useState(false);
  const [showBrandColumn, setShowBrandColumn] = useState(false);
  const [showCategoryColumn, setShowCategoryColumn] = useState(true);

  // Sort
  const [productSort, setProductSort] = useState<sortable_columns>("title");
  const [sortHighToLow, setSortHighToLow] = useState(false);

  // Filter
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Search Options
  // Prefixed with "unsent" to differentiate between the user-controlled fields, which aren't sent yet,
  // and the useCategories variant, which will have been sent to the API.
  const [unsentSearchQuery, setUnsentSearchQuery] = useState("");
  const [unsentPageSize, setUnsentPageSize] = useState(100);
  const disableSearchButton =
    unsentSearchQuery === searchQuery && unsentPageSize === pageSize;

  return (
    <Layout>
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
              ></input>
            </FormColumn>
            <ButtonGroup>
              <Button
                onClick={() => searchFor(unsentSearchQuery, unsentPageSize)}
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
            <h3>Show Columns</h3>
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
        <table className="table-auto border-spacing-y-2">
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
            </tr>
          </thead>
          <tbody>
            {productData
              .filter((product) => {
                // If the category is set to "all", display all files.
                if (categoryFilter === "all") return true;

                // Otherwise, filter the product by the current file.
                return product.category === categoryFilter;
              })
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
                <tr key={product.id}>
                  {showIdColumn && (
                    <td className="border px-4">{product.id}</td>
                  )}
                  {showThumbnailColumn && (
                    <td className="border px-4">
                      <img
                        className="h-24 w-24 object-cover"
                        src={product.thumbnail}
                      ></img>
                    </td>
                  )}
                  {showProductColumn && (
                    <td className="border px-4">
                      <p className="text-xl">{product.title}</p>
                      <p>
                        <i>{product.description}</i>
                      </p>
                    </td>
                  )}
                  {showPriceColumn && (
                    <td className="border px-4">
                      <p className="whitespace-nowrap text-2xl">
                        £{product.getDiscountPrice()}
                      </p>

                      {/* Render only if there is any discount. */}
                      {product.discountPercentage && (
                        <>
                          <p className="whitespace-nowrap text-sm">
                            {product.discountPercentage}% off, -£
                            {product.getDiscountAmount()}
                          </p>
                          <p className="whitespace-nowrap text-sm">
                            Was £{product.price}
                          </p>
                        </>
                      )}
                    </td>
                  )}
                  {showStockColumn && (
                    <td className="border px-4">{product.stock}</td>
                  )}
                  {showRatingColumn && (
                    <td className="w-[140px] border px-4 text-right">
                      <StarRatings
                        starDimension="15px"
                        starSpacing="1px"
                        starRatedColor="gold"
                        rating={product.rating}
                      />
                      {product.rating.toFixed(2)}
                    </td>
                  )}
                  {showBrandColumn && (
                    <td className="border px-4">{product.brand}</td>
                  )}
                  {showCategoryColumn && (
                    <td className="border px-4">{product.category}</td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </TableSection>
      <TextSection>
        <ButtonGroup centre>
          {/* Only show the Back button if on Page 0 or above */}
          {page > 0 && <Button onClick={() => setPage(page - 1)}>Back</Button>}

          {/*
            The current page number
            WARNING! Adding (+1) to the pageNumber for End-User readability.
            Page Numbers internally are still zero-indexed.
          */}
          <Button>{page + 1}</Button>

          {/* Hide the next button if we're on the last page. */}
          {page < lastPage - 1 && (
            <Button onClick={() => setPage(page + 1)}>Forward</Button>
          )}
        </ButtonGroup>
      </TextSection>
    </Layout>
  );
};

export { ProductsPage };
