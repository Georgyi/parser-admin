import { ChakraTheme, extendTheme } from "@chakra-ui/react";

import { colors } from "./colors";
import { styles } from "./styles";
import { textStyles } from "./text-styles";

export const themeExtensions = {
  colors,
  styles,
  textStyles,
};

const customTheme: Partial<ChakraTheme> = extendTheme(themeExtensions);

export const theme = extendTheme(customTheme) as ChakraTheme;
