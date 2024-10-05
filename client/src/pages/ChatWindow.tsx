import { useState } from "react";
import { useAuth } from "src/hooks/useAuth";
import Chat from "components/Chat";
import ContactList from "components/ContactList";
import "assets/css/ChatWindow.scss";
import ChatHistory from "src/components/ChatHistory";

interface contactI {
  id: number;
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
      {auth.user && (
        <div className="chat-window">
          <div className="chat-header">{to.name}</div>
          <div className="chat-body">
            <div className="sidebar">
              <ContactList
                contacts={contacts}
                selectedContact={to}
                onSelect={(contact: contactI) => setTo(contact)}
              />
            </div>
            <div className="chat-content">
              <ChatHistory />
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
      {!auth.user && <h1>ya gotta login first ya hoser</h1>}
    </>
  );
};

const contacts: contactI[] = [
  { id: 0, name: "Taylor", email: "taylor@mail.com" },
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
];

export default ChatWindow;
