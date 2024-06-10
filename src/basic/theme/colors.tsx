import { Colors } from "@chakra-ui/react";

export const colors = {
  system: {
    20: "#E8F0FF",
    40: "#83B2FF",
    45: "#83B3FF",
    80: "#065BFF",
    90: "#004AC0",
    100: "#01379F",
  },
  divider: {
    primary: "#83B2FF",
    secondary: "#E0E3F0",
  },
};

export type colors = typeof colors & Colors;
