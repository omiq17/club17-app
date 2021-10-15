import {
  theme as baseTheme,
  withDefaultColorScheme,
  extendTheme
} from "@chakra-ui/react"

// Extend the chakra theme to include custom colors, fonts, etc
const club17Theme = {
  fonts: {
    heading: "Lato",
    body: "Lato",
  },
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
    },

    Text: {
      variants: {
        error: {
          color: "tomato",
          fontSize: "0.75rem"
        }
      }
    }
  },
};

const theme = extendTheme(
  club17Theme,
  withDefaultColorScheme({ colorScheme: "primary.colorScheme" })
);

export default theme;