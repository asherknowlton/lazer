import { useAuth } from "src/hooks/useAuth";
import "assets/css/ChatMessage.scss";
import { useQuery } from "@tanstack/react-query";

interface messageI {
  _id: string;
  senderId: string;
  receiverId: string;
  messageText: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  message: messageI;
}

const ChatMessage = ({ message }: Props) => {
  const auth = useAuth();

  const { _id, senderId, receiverId, messageText, createdAt, updatedAt } =
    message;

  const {
    isPending: userPending,
    isError: userError,
    data: user,
  } = useQuery({
    queryKey: ["getUserData", senderId],
    queryFn: () => auth.getUserData(senderId),
  });

  return (
    <div className="chat-message">
      <div className="message-header">
        {userPending && (
          <div className="sender-id">TODO: make a cool skeleton</div>
        )}
        {user && <div className="sender-id">{user.name}</div>}
        <div>{createdAt}</div>
      </div>
      <div>{messageText}</div>
    </div>
  );
};

export default ChatMessage;
