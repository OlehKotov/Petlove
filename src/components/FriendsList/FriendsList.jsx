import React, { useEffect } from "react";
import css from "./FriendsList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFriends,
  selectFriendsError,
  selectFriendsLoading,
} from "../../redux/selectors";
import FriendsItem from "../FriendsItem/FriendsItem";
import { fetchFriends } from "../../redux/friends/friendsOps";

const FriendsList = () => {
  const dispatch = useDispatch();
  const friends = useSelector(selectFriends);
  const loading = useSelector(selectFriendsLoading);
  const error = useSelector(selectFriendsError);

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul className={css.friendsList}>
      {Array.isArray(friends) &&
        friends.map((friendsItem) => (
          <FriendsItem key={friendsItem._id} friends={friendsItem} />
        ))}
    </ul>
  );
};

export default FriendsList;
