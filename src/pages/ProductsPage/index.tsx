import React, { useState } from "react";
import { Button } from "../../components/Button";
import { ButtonGroup } from "../../components/ButtonGroup";
import { Layout } from "../../components/Layout";
import { TableSection } from "../../components/TableSection";
import { TextSection } from "../../components/TextSection";
import { Product, sortable_columns } from "../../models/Product";
import StarRatings from "react-star-ratings";
import { Form, FormColumn, FormRow } from "../../components/Form";

const ProductsPage = () => {
  const { page, setPage, productData, lastPage } = Product.useProducts(0, "");

  const [showIdColumn, setShowIdColumn] = useState(false);
  const [showThumbnailColumn, setShowThumbnailColumn] = useState(false);
  const [showProductColumn, setShowProductColumn] = useState(true);
  const [showPriceColumn, setShowPriceColumn] = useState(true);
  const [showStockColumn, setShowStockColumn] = useState(true);
  const [showRatingColumn, setShowRatingColumn] = useState(false);
  const [showBrandColumn, setShowBrandColumn] = useState(false);
  const [showCategoryColumn, setShowCategoryColumn] = useState(true);

  const [productSort, setProductSort] = useState<sortable_columns>("title");
  const [sortHighToLow, setSortHighToLow] = useState(false);

  return (
    <Layout>
      <TextSection>
        <h1>Products</h1>
        <h2>Search Options</h2>

        <Form>
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
      <TableSection>
        <table className="table-auto border-spacing-y-2">
          <thead>
            <tr>
              {showIdColumn && <th className="px-6">ID</th>}
              {showThumbnailColumn && <th className="px-6">Thumbnail</th>}
              {showProductColumn && <th className="px-6">Product</th>}
              {showPriceColumn && <th className="px-6">Sale Price</th>}
              {showStockColumn && <th className="px-6">Stock</th>}
              {showRatingColumn && <th className="px-6">Customer Rating</th>}
              {showBrandColumn && <th className="px-6">Brand</th>}
              {showCategoryColumn && <th className="px-6">Category</th>}
            </tr>
          </thead>
          <tbody>
            {productData
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
                  {showIdColumn && <td className="px-6">{product.id}</td>}
                  {showThumbnailColumn && (
                    <td className="px-6">
                      <img
                        className="h-24 w-24 object-cover"
                        src={product.thumbnail}
                      ></img>
                    </td>
                  )}
                  {showProductColumn && (
                    <td className="px-6">
                      <p className="text-xl">{product.title}</p>
                      <p>
                        <i>{product.description}</i>
                      </p>
                    </td>
                  )}
                  {showPriceColumn && (
                    <td className="px-6">
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
                  {showStockColumn && <td className="px-6">{product.stock}</td>}
                  {showRatingColumn && (
                    <td className="w-[140px] px-6 text-right">
                      <StarRatings
                        starDimension="15px"
                        starSpacing="1px"
                        starRatedColor="gold"
                        rating={product.rating}
                      />
                      {product.rating.toFixed(2)}
                    </td>
                  )}
                  {showBrandColumn && <td className="px-6">{product.brand}</td>}
                  {showCategoryColumn && (
                    <td className="px-6">{product.category}</td>
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
