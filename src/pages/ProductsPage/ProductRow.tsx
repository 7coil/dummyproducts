import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { RedButton } from "../../components/Button";
import { Product } from "../../models/Product";

const ProductRow = ({
  product,
  showIdColumn,
  showThumbnailColumn,
  showProductColumn,
  showPriceColumn,
  showStockColumn,
  showRatingColumn,
  showBrandColumn,
  showCategoryColumn,
  setProductToDelete,
}: {
  product: Product;
  showIdColumn: boolean;
  showThumbnailColumn: boolean;
  showProductColumn: boolean;
  showPriceColumn: boolean;
  showStockColumn: boolean;
  showRatingColumn: boolean;
  showBrandColumn: boolean;
  showCategoryColumn: boolean;
  setProductToDelete: (product: Product) => void;
}) => {
  return (
    <tr>
      {showIdColumn && <td className="border px-4">{product.id}</td>}
      {showThumbnailColumn && (
        <td className="border px-4">
          <img className="h-24 w-24 object-cover" src={product.thumbnail}></img>
        </td>
      )}
      {showProductColumn && (
        <td className="border px-4">
          <p className="font-bold">{product.title}</p>
          <p>{product.description}</p>
        </td>
      )}
      {showPriceColumn && (
        <td className="border px-4">
          <p className="whitespace-nowrap">
            <span className="whitespace-nowrap font-bold">
              £{product.getDiscountPrice()}
            </span>{" "}
            {product.discountPercentage && (
              <span>({product.discountPercentage}% off)</span>
            )}
          </p>

          {/* Render only if there is any discount. */}
          {product.discountPercentage && (
            <p className="whitespace-nowrap">was £{product.price}</p>
          )}
        </td>
      )}
      {showStockColumn && <td className="border px-4">{product.stock}</td>}
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
      {showBrandColumn && <td className="border px-4">{product.brand}</td>}
      {showCategoryColumn && (
        <td className="border px-4">{product.category}</td>
      )}
      <td className="border px-4">
        <RedButton
          onClick={() => {
            setProductToDelete(product);
          }}
        >
          Delete
        </RedButton>
      </td>
    </tr>
  );
};

export { ProductRow };
