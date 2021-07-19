import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { ThemeProvider } from "next-themes";

const MyApp = (props: AppProps) => {
  return (
    <ThemeProvider attribute='class'>
      <props.Component {...props.pageProps} />
    </ThemeProvider>
  );
};
export default MyApp
