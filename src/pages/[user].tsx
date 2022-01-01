/* eslint-disable import/extensions */
/* eslint-disable no-nested-ternary */
import axios from "axios";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import _ from "lodash";
import Link from "next/link";
import Error from "../modules/Error";
import Loading from "../modules/Loading";
import { numberSuffix } from "../util/numberSuffix";
import { getMinutes, formatFloat } from "../util/timeParser";
import topPlayersJson from "../data/2021/players.json";

export default function UserPage({ mojang }: { mojang: any }) {
  const { user } = useRouter().query;
  const { data: topPlayers } = topPlayersJson;

  const averageStats = {
    death_count: 13.680577849117174,
    player_kill_count: 1.9534510433386838,
    mob_kill_count: 1077.2600321027287,
  };

  const { data, error } = useSWR(`/data/2021/${user}.json`);

  const leaderboardData = topPlayers.find((p: any) => p.name.includes(user));

  if (error || !leaderboardData) {
    return <Error />;
  }

  if (!data) {
    return <Loading />;
  }

  const totalPlayTime = data.sessions.reduce((acc: number, cur: any) => {
    const amount = dayjs(new Date(cur.end * 1000)).diff(
      new Date(cur.start * 1000),
      "minutes"
    );

    if (Number.isNaN(amount)) {
      return acc + getMinutes(cur.length);
    }

    return acc + amount;
  }, 0);

  const totalAfk = data.sessions.reduce((acc: number, cur: any) => {
    return acc + getMinutes(cur.afk_time);
  }, 0);

  const totalAwakeTime = totalPlayTime - totalAfk;

  const topBalancePlayers = _.sortBy(topPlayers, (player: any) =>
    player.balance.v === "-" ? 0 : parseFloat(player.balance.v)
  ).reverse();

  const topAwakePlayers = _.sortBy(topPlayers, (player: any) =>
    getMinutes(player.activePlaytime.d)
  ).reverse();

  const deathComparison = () => {
    const deaths = data.info.death_count;
    if (deaths < averageStats.death_count) {
      return `${formatFloat(
        averageStats.death_count - deaths,
        0
      )} deaths less than average`;
    }
    if (deaths > averageStats.death_count) {
      return `${formatFloat(
        deaths - averageStats.death_count,
        0
      )} deaths more than average`;
    }
    return "an average amount of deaths";
  };

  const mobKillComparison = () => {
    const kills = data.info.mob_kill_count;
    if (kills < averageStats.mob_kill_count) {
      return `${formatFloat(
        averageStats.mob_kill_count - kills,
        0
      )} kills less than average`;
    }
    if (kills > averageStats.mob_kill_count) {
      return `${formatFloat(
        kills - averageStats.mob_kill_count,
        0
      )} kills more than average`;
    }
    return "an average amount of kills";
  };

  return (
    <>
      <Head>
        <title>
          CloudCraft -{" "}
          {mojang.name.charAt(mojang.name.length - 1) === "s"
            ? `${mojang.name}'`
            : `${mojang.name}'s`}{" "}
          Year 2021
        </title>
      </Head>
      <main className="main">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-image">
              <Image
                width="200px"
                height="200px"
                src={`https://crafatar.com/avatars/${mojang.id}?size=200&overlay=true`}
                alt="Player's Skin"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h1 className="title">
              <span className="primary">
                {mojang.name.charAt(mojang.name.length - 1) === "s"
                  ? `${mojang.name}'`
                  : `${mojang.name}'s`}
              </span>{" "}
              2021 on <span className="primary">CloudCraft</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <p className="description">
              {mojang.name} was the{" "}
              <strong>
                <span className="primary">
                  {numberSuffix(
                    topAwakePlayers.findIndex((p: any) =>
                      p.name.includes(user)
                    ) + 1
                  )}
                </span>
              </strong>{" "}
              most active player in 2021.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <h2>Total Playtime:</h2>
              <h3 className="primary">
                {formatFloat(totalAwakeTime, 0)} minutes
              </h3>
              <p>
                That&apos;s {formatFloat(totalAwakeTime / 60, 0)} hours
                {totalAwakeTime / 60 / 24 > 1
                  ? ` - or 
                ${formatFloat(totalAwakeTime / 60 / 24, 1)} days`
                  : ""}
                !
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <h2>Total AFK:</h2>
              <h3 className="primary">{formatFloat(totalAfk, 0)} minutes</h3>
              <p>
                That&apos;s {formatFloat(totalAfk / 60, 0)} hours
                {totalAfk / 60 / 24 > 1
                  ? ` - or 
                ${formatFloat(totalAfk / 60 / 24, 1)} days`
                  : ""}
                !
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <h2>Deaths:</h2>
              <h3 className="primary">
                {formatFloat(parseFloat(data.info.death_count), 0)}
              </h3>
              <p>That&apos;s {deathComparison()}!</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <h2>Mob Kills:</h2>
              <h3 className="primary">
                {formatFloat(parseFloat(data.info.mob_kill_count), 0)}
              </h3>
              <p>That&apos;s {mobKillComparison()}!</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <h2>Money:</h2>
              <h3 className="primary">
                {formatFloat(parseFloat(leaderboardData.balance.v), 0)} euros
              </h3>
              <p>
                That makes them the{" "}
                {numberSuffix(
                  topBalancePlayers.findIndex((p: any) =>
                    p.name.includes(user)
                  ) + 1
                )}{" "}
                most richest player!
              </p>
            </div>
          </div>
          {parseFloat(leaderboardData.claimedArea.v) > 1000 ? (
            <div className="col-md-6">
              <div className="card">
                <h2>Claimed Area:</h2>
                <h3 className="primary">
                  {formatFloat(parseFloat(leaderboardData.claimedArea.v), 0)}{" "}
                  blocks
                </h3>
                <p>
                  That&apos;s equal to about{" "}
                  {formatFloat(
                    parseFloat(leaderboardData.claimedArea.v) / 1000,
                    0
                  )}{" "}
                  km²!
                </p>
              </div>
            </div>
          ) : (
            <div className="col-md-6" />
          )}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user } = ctx.query;
  const mojangData = await axios({
    method: "get",
    url: `https://api.mojang.com/users/profiles/minecraft/${user}`,
  });
  return {
    props: {
      mojang: mojangData.data,
    },
  };
};
