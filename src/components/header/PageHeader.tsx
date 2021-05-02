import React, { useState } from "react";
import {
  HamburgerIcon,
  AddIcon,
  DownloadIcon,
  SunIcon,
} from "@chakra-ui/icons";
import {
  Grid,
  Heading,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";

import ImportLogModal from "../import-log-modal/ImportLogModal";
import CreateUpdateEntryModal from "../entry/create-modal/CreateUpdateEntryModal";
import { downloadObjectAsJSON } from "../../utils/utils";
import {
  AppState,
  loadDataFromLS,
  saveDataToLS,
} from "../../utils/localStorageUtils";

interface PageHeaderProps {
  onCreateEntry: (entry: Entry) => void;
}

function PageHeader({ onCreateEntry }: PageHeaderProps) {
  const { toggleColorMode } = useColorMode();
  const {
    isOpen: isCreateModalOpen,
    onOpen: openCreateModal,
    onClose: closeCreateModal,
  } = useDisclosure();
  const [isImportLogModalOpen, setIsImportLogModalOpen] = useState(false);

  return (
    <Grid
      gridTemplateColumns={"1fr 40px 40px"}
      gridGap={4}
      as={"header"}
      id={"page-header"}
      borderColor={"gray.200"}
      pb={1}
      mb={1}
    >
      <Heading>🍕 DailyBites</Heading>

      <IconButton
        aria-label={"Toggle dark mode"}
        icon={<SunIcon />}
        onClick={toggleColorMode}
        variant={"outline"}
      />

      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          size="md"
          variant="outline"
        />
        <MenuList zIndex={4}>
          <MenuItem icon={<AddIcon />} onClick={openCreateModal}>
            Create Entry
          </MenuItem>

          <MenuItem
            icon={<DownloadIcon />}
            onClick={handleExportBackupButtonClick}
          >
            Export data (JSON)
          </MenuItem>

          <MenuItem
            icon={<DownloadIcon transform="rotate(180deg)" />}
            onClick={() => setIsImportLogModalOpen(true)}
          >
            Import data (JSON)
          </MenuItem>
        </MenuList>
      </Menu>

      <CreateUpdateEntryModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onSubmit={onCreateEntry}
      />

      <ImportLogModal
        isOpen={isImportLogModalOpen}
        onClose={() => setIsImportLogModalOpen(false)}
        onLoad={handleBackupLoad}
      />
    </Grid>
  );

  function handleExportBackupButtonClick() {
    downloadObjectAsJSON(
      loadDataFromLS(),
      `dailybites_data_${new Date().getTime()}`
    );
  }

  function handleBackupLoad(appState: AppState) {
    saveDataToLS(appState);

    // This is a lazy way to sync app state to local storage
    window.location.reload();
  }
}

export default PageHeader;
