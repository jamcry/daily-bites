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
} from "@chakra-ui/react";

import { AppState } from "../../utils/localStorageUtils";
import { isObjectValidAppState } from "../../utils/appStateUtils";

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

        <form onSubmit={handleFormSubmit}>
          <ModalBody>
            <FormControl id="name" flex={2}>
              <FormLabel>JSON</FormLabel>
              <Input
                type="file"
                name={"log"}
                placeholder="Select json"
                accept={".json"}
                onChange={handleFileInputChange}
                isRequired
              />
            </FormControl>

            {selectedBackupDate && (
              <Text>{`${selectedBackupDate.myEntries.length} entries and ${
                Object.entries(selectedBackupDate.myLogs || {}).length || "No"
              } day logs were found`}</Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>

            <Button
              colorScheme="blue"
              type="submit"
              leftIcon={<DownloadIcon transform="rotate(180deg)" />}
              textTransform={"uppercase"}
              letterSpacing={"0.02em"}
              disabled={!isSubmitAllowed}
            >
              {/* 
              // TODO: Show confirm dialog if app state !== defaultInitialState 
              */}
              {"LOAD BACKUP"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );

  function handleFormSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    if (selectedBackupDate) {
      onLoad(selectedBackupDate);
    }
  }

  function handleFileInputChange(e: React.SyntheticEvent<HTMLInputElement>) {
    const file = e.currentTarget.files?.[0];
    setSelectedBackupDate(undefined);

    if (file) {
      var reader = new FileReader();

      reader.onload = function (event: FileReaderEventMap["load"]) {
        // @ts-ignore
        var loadedObj = JSON.parse(event.target.result);

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
        console.log({ jsonObj: loadedObj });
      };

      reader.readAsText(file);

      // console.log({ file, name: file.name, parsed: JSON.parse(file) });
    }
  }
}

export default ImportLogModal;
