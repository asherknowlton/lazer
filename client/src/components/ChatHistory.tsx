import { useState, KeyboardEvent, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ChatMessage from "components/ChatMessage";
import { useAuth } from "src/hooks/useAuth";
import "assets/css/ChatHistory.scss";

interface contactI {
  id: string;
  name: string;
  email: string;
}

interface messageI {
  _id: string;
  senderId: string;
  receiverId: string;
  messageText: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  contact: contactI;
}

const ChatHistory = ({ contact }: Props) => {
  const auth = useAuth();

  const {
    isPending: messagesPending,
    isError: messagesError,
    data: messages,
  } = useQuery({
    queryKey: ["getMessages", contact.id],
    queryFn: () => auth.getMessages(auth.user.id, contact.id),
  });

  return (
    <div className="chat-history">
      {!messagesPending && !messagesError && (
        <div>
          {messages.map((message: messageI) => (
            <ChatMessage key={message._id} message={message} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
