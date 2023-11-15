import axios from "axios";
import styles from "./GameCategoriesPage.module.css";
import { useQuery } from "react-query";
import { useState } from "react";

function CategoriesPage() {
  const [filter, setFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [games, setGames] = useState([]);
  const [sort, setSort] = useState(true);

  const { data, isLoading, isError } = useQuery(
    ["games", filter, currentPage, sort],
    fetchGames
  );
  console.log(data);

  async function fetchGames() {
    const { data } = await axios.post(
      `https://api.miraplay.cloud/games/by_page`,
      {
        page: currentPage,
        isFreshGamesFirst: sort,
        genre: filter,
        gamesToShow: 9,
      }
    );
    return data;
  }

  const handleFilterClick = (selectedFilter) => {
    setFilter(selectedFilter === "ALL" ? false : selectedFilter);
    setCurrentPage(1);
    setGames([]);
  };

  const handleSortClick = (selectedSort) => {
    setSort(selectedSort);
    setCurrentPage(1);
    setGames([]);
  };

  const handleShowMoreClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const canLoadMore = data && data.gamesListLength >= currentPage * 9;

  if (isLoading) return <p>Завантаження...</p>;
  if (isError) return <p>Помилка завантаження даних</p>;
  if (!data) return <p>Дані відсутні</p>;

  const updatedGames = [...games, ...data.games];

  return (
    <div>
      <h1 className={styles.categoriesPage_title}>ВСІ ІГРИ</h1>

      <div className={styles.categoriesPage_filters}>
        <ul className={styles.categoriesPage_filterList}>
          {[
            "ALL",
            "FREE",
            "MOBA",
            "SHOOTERS",
            "LAUNCHERS",
            "MMORPG",
            "STRATEGY",
            "FIGHTING",
            "RACING",
            "SURVIVAL",
            "ONLINE",
          ].map((filterItem) => (
            <li
              key={filterItem}
              onClick={() => handleFilterClick(filterItem)}
              className={
                filter === filterItem ||
                (filterItem === "ALL" && filter === false)
                  ? `${styles.activeFilter}  ${styles.filter}`
                  : styles.filter
              }
            >
              {filterItem}
            </li>
          ))}
        </ul>

        <ul className={styles.categoriesPage_sortList}>
          <li
            onClick={() => handleSortClick(true)}
            className={sort === true ? styles.activeSort : styles.sort}
          >
            Спочатку нові
          </li>
          <li
            onClick={() => handleSortClick(false)}
            className={sort === false ? styles.activeSort : styles.sort}
          >
            Спочатку старі
          </li>
        </ul>
      </div>

      <ul className={styles.categoriesPage_gameList}>
        {updatedGames.map((game) => {
          return (
            <li key={game._id} className={styles.gameList_item}>
              <img
                className={styles.gameList_img}
                src={game.gameImage}
                alt="game view"
                width={335}
                height={335}
              />
              <div className={styles.gameList_trumb}>
                <h3 className={styles.gameTrumb_title}>
                  {game.commonGameName}
                </h3>
                <p className={styles.gameTrumb_desc}>{game.gameDescription}</p>
              </div>
              <div className={styles.gameList_genres}>
                <div className={styles.gameList_genresTop}>
                  {game.inTop && <p className={styles.gameList_top}>TOP</p>}
                  <p className={styles.gameList_genre}>{game.genre}</p>
                </div>
                {game.gameClass === "STANDART" && (
                  <p className={styles.gameList_free}>БЕЗКОШТОВНО</p>
                )}
              </div>
              <div className={styles.gameList_launchers}>
                <p className={styles.gameList_launchersP}>
                  {game.gameLaunchers[0]}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      {canLoadMore && (
        <button
          className={styles.categoriesPage_btnMore}
          onClick={handleShowMoreClick}
        >
          Показати ще
        </button>
      )}
    </div>
  );
}

export default CategoriesPage;
