import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-pro-sidebar/dist/css/styles.css";
import Head from "next/head";
import SSRProvider from "react-bootstrap/SSRProvider";
import wrapper from "../store/configureStore";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Seolyu</title>
        <meta charSet="utf-8" />
        <meta name="google-site-verification" content="W6zJFkxNv0WaYmUx8nZ4Pjv_HActp5-ROUGkSfokpLI" />
      </Head>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </>
  );
}

export default wrapper.withRedux(App);
