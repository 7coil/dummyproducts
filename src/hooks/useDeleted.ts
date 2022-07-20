import { useState } from "react";
import { Product } from "../models/Product";

const useDeletedArray = () => {
  const addDeleted = (id: Product) => {
    setDeleted([id, ...deleted]);
  };

  const [deleted, setDeleted] = useState<Product[]>([]);

  return {
    deleted,
    addDeleted,
  };
};

export { useDeletedArray };
