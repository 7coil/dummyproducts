import { useState } from "react";

const useDeletedArray = () => {
  const addDeleted = (id: number) => {
    setDeleted([id, ...deleted]);
  };

  const [deleted, setDeleted] = useState<number[]>([]);

  return {
    deleted,
    addDeleted,
  };
};

export { useDeletedArray };
