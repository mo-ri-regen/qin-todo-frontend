import '../styles/globals.css'

import type { AppProps } from "next/app";

const MyApp = (props: AppProps) => {
  return <props.Component {...props.pageProps} />;
};
export default MyApp
