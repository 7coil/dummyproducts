import React from "react";
import { useState } from "react";
import StarRatings from "react-star-ratings";
import { Button } from "../../components/Button";
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
  addDeleted,
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
  addDeleted: (id: number) => void;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

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
        <Button
          onClick={() => {
            setIsDeleting(true);
            product.delete().then(() => {
              addDeleted(product.id);
            });
          }}
          disabled={isDeleting}
          activeColour="bg-red-300"
          hoverColour="hover:bg-red-200"
          disabledColour="bg-gray-100"
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export { ProductRow };
