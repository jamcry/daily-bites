import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import React from "react";

function DayLogListEmptyStateAlert() {
  return (
    <Alert
      status="info"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
      borderRadius={6}
    >
      <AlertIcon boxSize="40px" mr={0} />

      <AlertTitle mt={4} mb={1} fontSize="lg">
        No Items Yet
      </AlertTitle>

      <AlertDescription maxWidth="sm">
        There are no items in today's log. You can search and add an item above.
      </AlertDescription>
    </Alert>
  );
}

export default DayLogListEmptyStateAlert;
