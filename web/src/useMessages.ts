import { Doc, usePouchDB } from "./usePouchDB";

type MessageDoc = Doc & {
  text: string;
  author: string;
  date: Date;
  image?: string;
  imageType?: string;
};

export const useMessages = () => {
  const { docs, addDoc } = usePouchDB<MessageDoc>();

  return { messages: docs, addMessage: addDoc };
};
