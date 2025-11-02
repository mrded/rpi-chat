import { useState, useEffect, useCallback } from "react";
import PouchDB from "pouchdb-browser";

const DB_HOST = `${window.location.protocol}//${window.location.host}/db`;

type ExistingDoc<T> = T & PouchDB.Core.IdMeta & PouchDB.Core.GetMeta;

export const usePouchDB = <T extends object>(dbName: string) => {
  const [db, setDb] = useState<PouchDB.Database<T> | null>(null);
  const [docs, setDocs] = useState<ExistingDoc<T>[]>([]);

  useEffect(() => {
    const database = new PouchDB<T>(`${DB_HOST}/${dbName}`);
    setDb(database);

    return () => {
      database.close();
    };
  }, [dbName]);

  const fetchDocs = useCallback(async () => {
    if (!db) return;

    try {
      const result = await db.allDocs({
        include_docs: true,
        attachments: true,
      });
      setDocs(
        result.rows
          .map((row) => row.doc)
          .filter((doc): doc is ExistingDoc<T> => doc !== undefined),
      );
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  }, [db]);

  const addDoc = useCallback(
    async (doc: T) => {
      if (!db) return;

      try {
        await db.post(doc);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
    [db],
  );

  // Initial fetch and subscribe to changes
  useEffect(() => {
    if (!db) return;

    fetchDocs();

    const changes = db
      .changes({
        since: "now",
        live: true,
        include_docs: true,
        attachments: true,
      })
      .on("change", fetchDocs);

    return () => changes.cancel();
  }, [db]);

  return { docs, addDoc };
};
