import { useState } from "react";
import { MDBCardBody } from "mdb-react-ui-kit";

import { Message, MessageMine } from "~/components/Message";
import { Layout } from "~/components/Layout";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { useMessages } from "~/hooks/useMessages.client";
import { AuthModal } from "~/components/AuthModal";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "RPi Chat" },
    { name: "description", content: "Offline chat application" },
  ];
};

export default function Index() {
  const { messages, addMessage } = useMessages();

  const [author, setAuthor] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("author") || "";
    }
    return "";
  });

  const [isAuthOpen, setIsAuthOpen] = useState(!author);

  const handleSubmit = (text: string) => {
    addMessage({ text, date: new Date(), author });
  };

  const handleLogin = (name: string) => {
    setIsAuthOpen(false);
    setAuthor(name);
    if (typeof window !== "undefined") {
      localStorage.setItem("author", name);
    }
  };

  return (
    <Layout>
      <Header onLogout={() => setIsAuthOpen(true)} />

      <AuthModal isOpen={isAuthOpen} onLogin={name => handleLogin(name)} />
      <MDBCardBody>
        {messages.map(message =>
          message.author === author ? (
            <MessageMine key={message._id} {...message} />
          ) : (
            <Message key={message._id} {...message} />
          )
        )}
      </MDBCardBody>

      <Footer onSend={text => handleSubmit(text)} />
    </Layout>
  );
}
