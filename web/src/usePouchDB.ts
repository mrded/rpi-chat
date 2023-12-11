import { useState, useEffect, useCallback } from "react";
import PouchDB from "pouchdb-browser";

// export type Doc = PouchDB.Core.ExistingDocument<PouchDB.Core.AllDocsMeta>;
export type Doc = PouchDB.Core.AllDocsMeta;

type ExistingDoc<T extends Doc> = PouchDB.Core.ExistingDocument<T>;

const host =
  process.env.REACT_APP_COUCH_HOST || "http://admin:password@localhost:5984";

export const usePouchDB = <T extends Doc>() => {
  const [db] = useState(new PouchDB(host + "/rpi-chat"));
  const [docs, setDocs] = useState<ExistingDoc<T>[]>([]);

  // Function to fetch all documents
  const fetchDocs = useCallback(async () => {
    try {
      const result = await db.allDocs({
        include_docs: true,
        attachments: true
      });
      setDocs(result.rows.map(row => row.doc).filter(doc => doc) as ExistingDoc<
        T
      >[]);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  }, [db]);

  // Function to add a new document
  const addDoc = useCallback(
    async (doc: T) => {
      try {
        await db.post(doc);
        fetchDocs(); // Refresh the list of docs
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
    [db, fetchDocs]
  );

  // Subscribe to changes
  useEffect(() => {
    const changes = db
      .changes({
        since: "now",
        live: true,
        include_docs: true,
        attachments: true
      })
      .on("change", fetchDocs);

    return () => changes.cancel();
  }, [db, fetchDocs]);

  // Fetch documents initially
  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  return { docs, addDoc };
};
