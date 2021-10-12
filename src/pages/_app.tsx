import { ChakraProvider } from '@chakra-ui/react'

import theme from '../constants/theme'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../redux/store';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
};

export default MyApp;
