import Head from "next/head";

export default function Error() {
  return (
    <>
      <Head>
        <title>CloudCraft - My Year 2021</title>
      </Head>
      <main className="main">
        <h1 className="title">
          <span>Not Found</span>
        </h1>
        <h2>
          Unfortunately we didn&apos;t find any data for the requested player.
        </h2>
      </main>
    </>
  );
}
