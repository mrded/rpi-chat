import React, { useState } from "react";

import { MDBCardBody } from "mdb-react-ui-kit";

import { Message, MessageMine } from "./Message";
import { Layout } from "./Layout";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useMessages } from "./useMessages";
import { AuthModal } from "./AuthModal";

export default function App() {
  const { messages, addMessage } = useMessages();

  const [author, setAuthor] = useState(() => {
    return localStorage.getItem("author") || "";
  });

  const [isAuthOpen, setIsAuthOpen] = useState(!author);

  const handleSubmit = (text: string) => {
    addMessage({ text, date: new Date(), author });
  };

  const handleLogin = (name: string) => {
    setIsAuthOpen(false);
    setAuthor(name);
    localStorage.setItem("author", name);
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
