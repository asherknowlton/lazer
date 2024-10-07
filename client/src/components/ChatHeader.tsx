import { useAuth } from "src/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "assets/css/ChatHeader.scss";

interface Props {
  contactName: string;
}

const ChatHeader = ({ contactName }: Props) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    auth.logoutUser();
    navigate("/");
  };

  return (
    <>
      <div className="chat-header">
        <div className="channel-name">{contactName}</div>
        <button onClick={handleClick}>SEVER UPLINK</button>
      </div>
    </>
  );
};

export default ChatHeader;
