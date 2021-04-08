import React from "react";
import {
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  IconButtonProps,
  ButtonProps,
} from "@chakra-ui/react";

type CommonCustomButtonProps = {
  onConfirm: VoidFunction;
  alertDialogProps: {
    title: string;
    description: string;
    confirmButtonText?: string;
  };
};

type ButtonWithConfirmationProps =
  | (ButtonProps &
      CommonCustomButtonProps & {
        buttonText?: string;
      })
  | (IconButtonProps & CommonCustomButtonProps);

function ButtonWithConfirmation({
  onConfirm,
  alertDialogProps,
  // @ts-ignore
  buttonText,
  ...rest
}: ButtonWithConfirmationProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef<HTMLButtonElement>();

  return (
    <>
      {buttonText ? (
        <Button
          {...rest}
          onClick={() => setIsOpen(true)}
          aria-label={alertDialogProps.title}
        >
          {buttonText}
        </Button>
      ) : (
        <IconButton
          {...rest}
          onClick={() => setIsOpen(true)}
          aria-label={alertDialogProps.title}
        />
      )}

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
              <Button colorScheme="red" onClick={onConfirm} ml={3}>
                {alertDialogProps.confirmButtonText || "Confirm"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default ButtonWithConfirmation;
