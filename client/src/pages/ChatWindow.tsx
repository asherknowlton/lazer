import { useContext, useState } from "react";
import { UserContext } from "src/context/userContext";
import Chat from "components/Chat";
import ContactList from "components/ContactList";
import "assets/css/ChatWindow.scss";

interface contactI {
  id: number;
  name: string;
  email: string;
}

const ChatWindow = () => {
  const { user } = useContext(UserContext);

  const [to, setTo] = useState<contactI>(contacts[0]);
  const [contentMap, setContentMap] = useState(new Map());
  const updateContent = (to: contactI, message: string) => {
    setContentMap(new Map(contentMap).set(to, message));
  };

  return (
    <>
      {user && (
        <>
          <div className="sidebar">
            <ContactList
              contacts={contacts}
              selectedContact={to}
              onSelect={(contact: contactI) => setTo(contact)}
            />
          </div>
          <div className="main-content">
            <div className="header">{to.name}</div>
            <div className="channel-content" />
            <Chat
              key={to.id}
              contact={to}
              content={contentMap.get(to)}
              updateContent={updateContent}
            />
          </div>
        </>
      )}
      {!user && <h1>DISQUALIFIED</h1>}
    </>
  );
};

const contacts: contactI[] = [
  { id: 0, name: "Taylor", email: "taylor@mail.com" },
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
];

export default ChatWindow;
