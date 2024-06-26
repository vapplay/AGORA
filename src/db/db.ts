import * as SQLite from "expo-sqlite/legacy";
const db = SQLite.openDatabase("addcapitulos.db");

export const creaTeble = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS favorites (id TEXT PRIMARY KEY, title TEXT, poster TEXT);",
      [],
      (_, result) => {}
    );
  });
};

///  episodeos ya vistos indicator
export const getEpisode = (episode_id: string) => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM savetime WHERE episode_id = ?",
        [episode_id],
        (_, { rows: { _array } }) => {
          resolve(_array);
        }
      );
    });
  });
};

/// epiodes
export const createTableForSeries = (seriesName: string) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${seriesName} (id TEXT PRIMARY KEY, title TEXT, season TEXT ,time INTEGER , duration INTEGER  , data TEXT );`,
        [],
        (_, result) => {
          //   console.log(`Tabla creada exitosamente para la serie: ${seriesName}`);
        }
      );
    },
    (error) => {
      console.log("Error en la transacción", error);
    }
  );
};

export const saveEpisodeDb = (
  seriesName: string,
  id: string,
  title: string,
  season: number,
  time: number,
  duration: number
) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `SELECT * FROM ${seriesName} WHERE id = ?`,
        [id],
        (_, result) => {
          if (result.rows.length > 0) {
            // console.log("El episodio ya ha sido guardado previamente");
          } else {
            tx.executeSql(
              `INSERT INTO ${seriesName} (id, title, season , time , duration ,data  ) VALUES (?, ?, ? , ? , ? , ?)`,
              [
                id,
                title,
                season,
                time ?? 0,
                duration ?? 0,
                new Date().toISOString(),
              ],
              (_, result) => {
                if (result.rowsAffected > 0) {
                  console.log("Episodio guardado exitosamente");
                } else {
                  console.log("Error al guardar el episodio");
                }
              }
            );
          }
        }
      );
    },
    (error) => {
      console.log("Error en la transacción", error);
    }
  );
};

export const updateEpisodeDb = (
  seriesName: string,
  id: string,
  time: number,
  duration: number
) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `SELECT * FROM ${seriesName} WHERE id = ?`,
        [id],
        (_, result) => {
          if (result.rows.length > 0) {
            tx.executeSql(
              `UPDATE ${seriesName} SET time = ?, duration = ? WHERE id = ?`,
              [time, duration, id],
              (_, result) => {
                if (result.rowsAffected > 0) {
                  // console.log("Episodio actualizado exitosamente");
                } else {
                 //  console.log("Error al actualizar el episodio");
                }
              }
            );
          } else {
            // console.log("El episodio no existe en la base de datos");
          }
        }
      );
    },
    (error) => {
      console.log("Error en la transacción", error);
    }
  );
};

export const getEpisodeInfo = async (seriesName: string, id: string) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `SELECT * FROM ${seriesName} WHERE id = ?`,
          [id],
          (_, result) => {
            if (result.rows.length > 0) {
              const episodeInfo = result.rows.item(0);
              resolve(episodeInfo);
            } else {
              reject("No se encontró el episodio en la base de datos");
            }
          }
        );
      },
      (error) => {
        reject("Error en la transacción");
      }
    );
  });
};

////////===================/////=====///// favorites /////////////////////////////// ===========================

///  favorites
export const getSeriesTable = async (seriesName: string) => {
  return new Promise<any[]>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`SELECT * FROM ${seriesName}`, [], (_, result) => {
          const rows = result.rows;
          const episodes = [];
          for (let i = 0; i < rows.length; i++) {
            episodes.push(rows.item(i));
          }
          resolve(episodes);
        });
      },
      (error) => {
        console.log("Error en la transacción", error);
        reject(error);
      }
    );
  });
};

export const remoFavorite = (id: string) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM favorites WHERE id = ?;",
      [id],
      (_, result) => {}
    );
  });
};

export const addFavorite = (item: {
  id: string | "";
  title: string | "";
  poster: string | "";
}) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO favorites (id, title, poster) VALUES (?, ?, ?);",
      [item.id || "", item.title || "", item.poster || ""],
      (_, result) => {}
    );
  });
};

export const clearFavoritesSQLite = () => {
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM favorites;", [], (_, result) => {});
  });
};

export const getFavorites = () => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM favorites",
        [],
        (_, { rows: { _array } }) => {
          resolve(_array?.reverse());
        }
      );
    });
  });
};

export const getSeeEpisodes = () => {
  return new Promise((resolve) => {});
};
