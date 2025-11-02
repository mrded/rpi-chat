import { useEffect, useMemo } from "react";
import { usePouchDB } from "./usePouchDB.client";
import { MessageDoc } from "~/types/message";

export const useMessages = () => {
  const { docs, addDoc, fetchDocs } = usePouchDB<MessageDoc>("rpi-chat");

  // Fetch documents initially
  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  // Sort messages by date (oldest first)
  const sortedMessages = useMemo(() => {
    return [...docs].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });
  }, [docs]);

  return { messages: sortedMessages, addMessage: addDoc };
};
