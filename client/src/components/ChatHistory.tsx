import { useState, KeyboardEvent, useMemo, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAuth } from "src/hooks/useAuth";
import "assets/css/ChatHistory.scss";

interface contactI {
  id: number;
  name: string;
  email: string;
}

interface messageI {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  contact: contactI;
}

const ChatHistory = ({ contact }: Props) => {
  const auth = useAuth();

  const getMessages = async () => {
    let messages = await auth.getMessages(auth.user.id, contact.id);
    return messages;
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getMessages", contact.id],
    queryFn: () => auth.getMessages(auth.user.id, contact.id),
  });

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="chat-history" onClick={getMessages}>
      {isPending && <div>Loading</div>}
      {isError && <div>Error</div>}
      {!isPending && !isError && (
        <div>
          {data.map((message: messageI) => (
            <div key={message._id}>{message.message}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
