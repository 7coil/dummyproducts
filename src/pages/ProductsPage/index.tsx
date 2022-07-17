import React from "react";
import { Button } from "../../components/Button";
import { ButtonGroup } from "../../components/ButtonGroup";
import { Layout } from "../../components/Layout";
import { TableSection } from "../../components/TableSection";
import { TextSection } from "../../components/TextSection";
import { Product } from "../../models/Product";

const ProductsPage = () => {
  const { page, setPage, productData, lastPage } = Product.useProducts(0, "");

  return (
    <Layout>
      <TableSection>
        <table className="table-auto border-spacing-y-2">
          <thead>
            <tr>
              <th className="px-6">ID</th>
              <th className="px-6">Thumbnail</th>
              <th className="px-6">Product</th>
              <th className="px-6">Sale Price</th>
              <th className="px-6">Stock</th>
              <th className="px-6">Customer Rating</th>
              <th className="px-6">Brand</th>
              <th className="px-6">Category</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((product) => (
              <tr key={product.id}>
                <td className="px-6">{product.id}</td>
                <td className="px-6">
                  <img
                    className="h-24 w-24 object-cover"
                    src={product.thumbnail}
                  ></img>
                </td>
                <td className="px-6">
                  <p className="text-xl">{product.title}</p>
                  <p>
                    <i>{product.description}</i>
                  </p>
                </td>
                <td className="px-6">
                  <p className="whitespace-nowrap text-2xl">
                    £{product.getDiscountPrice()}
                  </p>
                  <p className="whitespace-nowrap text-sm">
                    {product.discountPercentage}% off, -£
                    {product.getDiscountAmount()}
                  </p>
                  <p className="whitespace-nowrap text-sm">
                    Was £{product.price}
                  </p>
                </td>
                <td className="px-6">{product.stock}</td>
                <td className="px-6">{product.rating}</td>
                <td className="px-6">{product.brand}</td>
                <td className="px-6">{product.category}</td>
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
          {lastPage !== page && (
            <Button onClick={() => setPage(page + 1)}>Forwards</Button>
          )}
        </ButtonGroup>
      </TextSection>
    </Layout>
  );
};

export { ProductsPage };
