import "assets/css/NewContactSearch.scss";
import { SyntheticEvent, useState } from "react";
import { useAuth } from "src/hooks/useAuth";

interface user {
  _id: string;
  name: string;
  email: string;
}

interface Props {
  user: user;
  closeContactSearchWindow: () => void;
}

const NewContactTile = ({ user, closeContactSearchWindow }: Props) => {
  const auth = useAuth();

  const addUserToFriends = async (e: SyntheticEvent) => {
    e.preventDefault();
    auth.addUserToFriends(auth.user.id, user._id);
    closeContactSearchWindow();
  };

  return (
    <div className="user-tile" onClick={addUserToFriends}>
      <p className="user-name">{user.name}</p>
      <p className="user-email">{user.email}</p>
    </div>
  );
};

export default NewContactTile;
