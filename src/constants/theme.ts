import {
  theme as baseTheme,
  withDefaultColorScheme,
  extendTheme
} from "@chakra-ui/react"

// Extend the chakra theme to include custom colors, fonts, etc
const club17Theme = {
  colors: {
    primary: {
      colorScheme: baseTheme.colors.teal,
      main: baseTheme.colors.teal[500].toString(),
      light: baseTheme.colors.teal[200].toString(),
      dark: baseTheme.colors.teal[800].toString(),
    },
  },

  components: {
    Button: {
      defaultProps: {
        variant: "outline",
      },
    }
  },
};

const theme = extendTheme(
  club17Theme,
  withDefaultColorScheme({ colorScheme: "primary.colorScheme" })
);

export default theme;