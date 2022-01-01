/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
// eslint-disable-next-line import/extensions
// import topPlayersJson from "../data/2021/players.json";
import { formatFloat, getMinutes } from "../util/timeParser";

export default function IndexPage() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    router.push(`/[user]`, `/${searchText}`);
  };

  const globalStats = { deaths: 8523, balance: 0 };

  /* const totalMinutes = topPlayersJson.data.reduce((acc: number, cur: any) => {
    return acc + getMinutes(cur.activePlaytime.d);
  }, 0);

  const totalBalance = topPlayersJson.data.reduce((acc: number, cur: any) => {
    if (cur.balance.v === "-") return acc;
    return acc + parseFloat(cur.balance.v);
  }, 0); */

  const totalMinutes = 612061.063856;
  const totalBalance = 8792384.257454097;

  return (
    <>
      <Head>
        <title>CloudCraft - My Year 2021</title>
      </Head>
      <main className="main">
        <div className="row">
          <div className="col-md-12">
            <h1 className="title">
              <span className="primary">CloudCraft</span> Recap 2021
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <p className="description intro-text">
              Get your CloudCraft 2021 Recap below!
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <form className="form-inline" onSubmit={handleSearch}>
              <input
                type="text"
                className="form-control"
                id="search"
                placeholder="Enter your username"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h2 className="subtitle">Server Statistics</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <h2>Unique Players:</h2>
              <h3 className="primary">627 players</h3>
              <p>97 % of our players are also in our Discord server!</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <h2>Total Playtime:</h2>
              <h3 className="primary">
                {formatFloat(totalMinutes, 0)} minutes
              </h3>
              <p>
                That&apos;s {formatFloat(totalMinutes / 60, 0)} hours
                {totalMinutes / 60 / 24 > 1
                  ? ` - or 
                ${formatFloat(totalMinutes / 60 / 24, 1)} days`
                  : ""}
                !
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <h2>Total Deaths:</h2>
              <h3 className="primary">{formatFloat(globalStats.deaths, 0)}</h3>
              <p>The average amount of deaths per player is 14!</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <h2>Total Money:</h2>
              <h3 className="primary">{formatFloat(totalBalance, 0)} euros</h3>
              <p>
                You could buy {formatFloat(totalBalance / 23.59, 0)} copies of
                Minecraft with that amount!
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
