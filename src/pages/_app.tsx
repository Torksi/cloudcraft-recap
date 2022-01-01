import "../styles/app.scss";
import "../styles/bootstrap/bootstrap-grid.min.css";
import type { AppProps } from "next/app";
import axios from "axios";
import { SWRConfig } from "swr";
import Footer from "../modules/Footer";

const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err: any) {
    throw err.response.data;
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
        dedupingInterval: 500000,
        revalidateOnReconnect: true,
      }}
    >
      <div className="container">
        <Component {...pageProps} />
        <Footer />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
