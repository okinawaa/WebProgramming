import Layout from "../components/Layout";
import "../../../../../Downloads/nextjs-fundamentals-master/nextjs-fundamentals-master/styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
