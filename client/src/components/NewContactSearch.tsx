import "assets/css/NewContactSearch.scss";
import { SyntheticEvent, useState, useRef } from "react";
import { useAuth } from "src/hooks/useAuth";
import { useClickOutside } from "src/hooks/useClickOutside";
import NewContactTile from "./NewContactTile";

interface user {
  _id: string;
  name: string;
  email: string;
}

const NewContactSearch = () => {
  const auth = useAuth();
  const [searchWindowOpen, setSearchWindowOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userArray, setUserArray] = useState<user[]>([]);
  const searchWindowRef = useRef(null);

  const toggleWindowOpen = () => {
    setSearchWindowOpen(!searchWindowOpen);
  };

  const closeWindow = () => {
    setSearchWindowOpen(false);
  };

  useClickOutside(searchWindowRef, closeWindow);

  const searchForUsers = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setSearchTerm(target.value);
    let users = await auth.searchForUsers(target.value);
    setUserArray(users);
    console.log(users);
  };

  return (
    <section className="contact-search-section">
      {searchWindowOpen && (
        <div className="contact-search-popup" ref={searchWindowRef}>
          <input
            type="text"
            name="searchTerm"
            value={searchTerm}
            className="contact-search-input"
            placeholder="SEARCH FOR USER"
            onChange={searchForUsers}
          />
          <div className="user-list">
            {userArray.length > 0 &&
              userArray.map((user) => (
                <NewContactTile
                  user={user}
                  closeContactSearchWindow={closeWindow}
                />
              ))}
          </div>
        </div>
      )}
      <button className="add-new-contact-button" onClick={toggleWindowOpen}>
        ADD NEW CONTACT
      </button>
    </section>
  );
};

export default NewContactSearch;
