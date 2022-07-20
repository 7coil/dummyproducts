import { ButtonGroup } from "../../components/ButtonGroup";
import { Button, RedButton } from "../../components/Button";
import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { Product } from "../../models/Product";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface DeleteModalProps {
  product: Product | null;
  setProductToDelete: (product: Product | null) => void;
  addDeleted: (product: Product) => void;
}

const DeleteModal = ({
  product,
  setProductToDelete,
  addDeleted,
}: DeleteModalProps) => {
  // If the product prop changes, always re-enable the buttons.
  useEffect(() => {
    setDeleting(false);
  }, [product]);

  // Check if we should disable the delete/exit buttons
  const [deleting, setDeleting] = useState(false);

  return (
    // Show the modal if the Product exists
    <Modal style={customStyles} isOpen={product !== null}>
      <div>
        <h2 className="text-2xl">
          Are you sure you want to delete "{product?.title}"?
        </h2>
        <p>This action is un-recoverable.</p>
        <ButtonGroup>
          <Button
            disabled={deleting}
            onClick={() => {
              // When a user cancels, remove the product-to-delete modal,
              setProductToDelete(null);
            }}
          >
            Keep Product
          </Button>
          <RedButton
            disabled={deleting}
            onClick={async () => {
              // Disable the buttons immediately
              setDeleting(true);

              // If a product is passed into the modal
              if (product) {
                // Delete the product (and hide it from our client)
                await product.delete();
                addDeleted(product);
              }

              // Remove the modal.
              setProductToDelete(null);
            }}
          >
            Delete
          </RedButton>
        </ButtonGroup>
      </div>
    </Modal>
  );
};

export { DeleteModal };
