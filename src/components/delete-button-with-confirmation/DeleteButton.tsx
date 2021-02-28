import React from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

interface PlaygroundProps {
  onDelete: VoidFunction;
  alertDialogProps: {
    title: string;
    description: string;
  };
}

function DeleteButtonWithConfirmation({
  onDelete,
  alertDialogProps,
}: PlaygroundProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef<HTMLButtonElement>();

  return (
    <>
      <IconButton
        icon={<DeleteIcon />}
        aria-label={alertDialogProps.title}
        onClick={() => setIsOpen(true)}
      />

      <AlertDialog
        isOpen={isOpen}
        // @ts-ignore
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {alertDialogProps.title}
            </AlertDialogHeader>

            <AlertDialogBody>{alertDialogProps.description}</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                // @ts-ignore
                ref={cancelRef}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DeleteButtonWithConfirmation;
