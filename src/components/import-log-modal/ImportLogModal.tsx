import React, { useState } from "react";
import { DownloadIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Text,
  Input,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import { AppState } from "../../utils/localStorageUtils";
import { isObjectValidAppState } from "../../utils/appStateUtils";
import ButtonWithConfirmation from "../button-with-confirmation/ButtonWithConfirmation";

interface ImportLogModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
  onLoad: (loadedStateObj: AppState) => void;
}

function ImportLogModal({ isOpen, onClose, onLoad }: ImportLogModalProps) {
  const toast = useToast();
  const [isSubmitAllowed, setIsSubmitAllowed] = useState(false);
  const [selectedBackupDate, setSelectedBackupDate] = useState<AppState>();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>{"Import Log Backup"}</ModalHeader>

        <ModalCloseButton />

        <form>
          <ModalBody>
            <Text mb={5}>
              Select a backup file to upload and restore.{" "}
              <b>
                Be aware that importing a backup will OVERRIDE existing data!
              </b>
            </Text>

            <FormControl id="name" flex={2}>
              <FormLabel>Backup file (.json)</FormLabel>

              <Input
                type="file"
                name={"log"}
                padding={3}
                height={"auto"}
                bg={"gray.100"}
                placeholder="Select json"
                accept={".json"}
                onChange={handleFileInputChange}
                isRequired
              />
            </FormControl>

            {selectedBackupDate && (
              <Alert
                status="success"
                mt={4}
                borderRadius={4}
                variant={"left-accent"}
              >
                <AlertIcon />
                {`${selectedBackupDate.myEntries.length} entries and ${
                  Object.entries(selectedBackupDate.myLogs || {}).length || "No"
                } day logs were found`}
              </Alert>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleClose}>
              Close
            </Button>

            <ButtonWithConfirmation
              onConfirm={handleFormSubmit}
              alertDialogProps={{
                title: `Are you sure?`,
                description: `Importing a backup will OVERRIDE ANY EXISTING DATA!`,
              }}
              buttonText={"LOAD BACKUP"}
              colorScheme="blue"
              leftIcon={<DownloadIcon transform="rotate(180deg)" />}
              textTransform={"uppercase"}
              letterSpacing={"0.02em"}
              disabled={!isSubmitAllowed}
            />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );

  function handleFormSubmit() {
    if (selectedBackupDate) {
      onLoad(selectedBackupDate);
    }
  }

  function handleFileInputChange(e: React.SyntheticEvent<HTMLInputElement>) {
    const file = e.currentTarget.files?.[0];
    setSelectedBackupDate(undefined);

    if (file) {
      const reader = new FileReader();

      reader.onload = function (event: FileReaderEventMap["load"]) {
        // @ts-ignore
        const loadedObj = JSON.parse(event.target.result);

        if (!isObjectValidAppState(loadedObj)) {
          toast({
            title: "Error",
            description: "The file you selected is not a valid backup.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          setIsSubmitAllowed(false);
        } else {
          setSelectedBackupDate(loadedObj as AppState);
          setIsSubmitAllowed(true);
        }
      };

      reader.readAsText(file);
    }
  }

  function handleClose() {
    setSelectedBackupDate(undefined);
    onClose();
  }
}

export default ImportLogModal;
