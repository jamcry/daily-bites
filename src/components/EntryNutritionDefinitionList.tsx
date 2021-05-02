import React from "react";
import { List, ListItem, Grid, useColorModeValue } from "@chakra-ui/react";

import { Entry } from "../utils/typeUtils";

export function EntryNutritionDefinitionList({
  values: { protein, carb, fat, calories },
}: {
  values: Pick<Entry, "protein" | "carb" | "fat" | "calories"> | Entry;
}) {
  const dtColor = useColorModeValue("gray.600", "gray.300");
  return (
    <List
      as={"dl"}
      display={"grid"}
      gridTemplateColumns={"repeat(4, 1fr)"}
      gridGap={{ lg: 6, base: 3 }}
      textAlign={{ base: "left", lg: "right" }}
    >
      <Grid>
        <ListItem as="dt" fontSize={"x-small"} color={dtColor}>
          PROTEIN
        </ListItem>
        <ListItem as="dd">{protein?.toFixed(1) || "-"}</ListItem>
      </Grid>

      <Grid>
        <ListItem as="dt" fontSize={"x-small"} color={dtColor}>
          CARB
        </ListItem>
        <ListItem as="dd">{carb?.toFixed(1) || "-"}</ListItem>
      </Grid>

      <Grid>
        <ListItem as="dt" fontSize={"x-small"} color={dtColor}>
          FAT
        </ListItem>
        <ListItem as="dd">{fat?.toFixed(1) || "-"}</ListItem>
      </Grid>

      <Grid>
        <ListItem as="dt" fontSize={"x-small"} color={dtColor}>
          KCAL
        </ListItem>
        <ListItem as="dd">{calories?.toFixed(1) || "-"}</ListItem>
      </Grid>
    </List>
  );
}
