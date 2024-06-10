import { Styles } from "@chakra-ui/theme-tools";

export const styles: Styles = {
  global: {
    "html, body": {
      height: "100%",
      overflow: "hidden",
    },
    "#__next, #__supress-nextjs-warnings": {
      height: "100%",
    },
    body: {
      fontFamily: "body",
      color: "typography.primary",
      bg: "background.primary",
      textStyle: "body_M",
    },
    _focusVisible: {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: "system.40",
      outlineOffset: "0",
    },
  },
};
