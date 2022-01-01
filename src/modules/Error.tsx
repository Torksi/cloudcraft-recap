import Head from "next/head";
import Link from "next/link";

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
        <div className="row">
          <div className="col-md-12">
            <p className="description intro-text">
              Unfortunately we didn&apos;t find any data for the requested
              player.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p className="back-to-search">
              <Link href="/">
                <a>Go back to search</a>
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
