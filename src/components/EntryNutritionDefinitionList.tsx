import React from "react";
import { List, ListItem, Grid } from "@chakra-ui/react";

import { Entry } from "../utils/typeUtils";

export function EntryNutritionDefinitionList({
  values: { protein, carb, fat, calories },
}: {
  values: Pick<Entry, "protein" | "carb" | "fat" | "calories"> | Entry;
}) {
  return (
    <List
      as={"dl"}
      display={"grid"}
      gridTemplateColumns={"repeat(4, 1fr)"}
      gridGap={6}
      textAlign={{ base: "left", lg: "right" }}
    >
      <Grid>
        <ListItem as="dt" fontSize={"x-small"} color={"gray.600"}>
          PROTEIN
        </ListItem>
        <ListItem as="dd">{protein || "-"}</ListItem>
      </Grid>

      <Grid>
        <ListItem as="dt" fontSize={"x-small"} color={"gray.600"}>
          CARB
        </ListItem>
        <ListItem as="dd">{carb || "-"}</ListItem>
      </Grid>

      <Grid>
        <ListItem as="dt" fontSize={"x-small"} color={"gray.600"}>
          FAT
        </ListItem>
        <ListItem as="dd">{fat || "-"}</ListItem>
      </Grid>

      <Grid>
        <ListItem as="dt" fontSize={"x-small"} color={"gray.600"}>
          KCAL
        </ListItem>
        <ListItem as="dd">{calories || "-"}</ListItem>
      </Grid>
    </List>
  );
}
