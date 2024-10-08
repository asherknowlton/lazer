import { useState } from "react";
import { useAuth } from "src/hooks/useAuth";
import Chat from "components/Chat";
import ContactList from "components/ContactList";
import "assets/css/ChatWindow.scss";
import ChatHistory from "src/components/ChatHistory";
import ChatHeader from "src/components/ChatHeader";
import { Navigate } from "react-router-dom";

interface contactI {
  id: string;
  name: string;
  email: string;
}

const ChatWindow = () => {
  const auth = useAuth();

  const [to, setTo] = useState<contactI>(contacts[0]);
  const [contentMap, setContentMap] = useState(new Map());
  const updateContent = (to: contactI, message: string) => {
    setContentMap(new Map(contentMap).set(to, message));
  };

  return (
    <>
      {auth.authing && (
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          Loading
        </div>
      )}
      {auth.user && (
        <div className="chat-window">
          <ChatHeader contactName={to.name} />
          <div className="chat-body">
            <div className="sidebar">
              <ContactList
                contacts={contacts}
                selectedContact={to}
                onSelect={(contact: contactI) => setTo(contact)}
              />
            </div>
            <div className="chat-content">
              <ChatHistory contact={to} />
              <Chat
                key={to.id}
                contact={to}
                content={contentMap.get(to)}
                updateContent={updateContent}
              />
            </div>
          </div>
        </div>
      )}
      {!auth.authing && !auth.user && <Navigate to="/login" />}
    </>
  );
};

const contacts: contactI[] = [
  { id: "67044854c3c7f7274493c459", name: "Taylor", email: "taylor@mail.com" },
  { id: "67044876c3c7f7274493c45a", name: "Alice", email: "alice@mail.com" },
  { id: "67044881c3c7f7274493c45b", name: "Bob", email: "bob@mail.com" },
];

export default ChatWindow;
