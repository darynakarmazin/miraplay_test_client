import axios from "axios";
import styles from "./GameCategoriesPage.module.css";
import { useQuery } from "react-query";

async function fetchGames() {
  const { data } = await axios.post(
    `https://api.miraplay.cloud/games/by_page`,
    {
      page: 1,
      isFreshGamesFirst: true,
      genre: false,
      gamesToShow: 9,
    }
  );
  return data.games;
}

function CategoriesPage() {
  const { data, isLoading, isError } = useQuery("games", fetchGames);
  console.log(data);
  if (isLoading) return <p>Завантаження...</p>;
  if (isError) return <p>Помилка завантаження даних</p>;
  if (!data) return <p>Дані відсутні</p>;

  return (
    <div>
      <h1 className={styles.categoriesPage_title}>ВСІ ІГРИ</h1>
      <ul className={styles.categoriesPage_gameList}>
        {data.map((game) => {
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
                  <p className={styles.gameList_free}>FREE</p>
                )}
              </div>
              {/* <div>
                <p>{game.gameLaunchers[0]}</p>
              </div> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CategoriesPage;
