import React from "react";
import css from "./FriendsItem.module.css";

const FriendsItem = ({ friends }) => {
  const { title, url, addressUrl, imageUrl, address, workDays, phone, email } =
    friends;

  const firstOpenDay =
    Array.isArray(workDays) && workDays.find((workDay) => workDay.isOpen);

  return (
    <li className={css.friendsItem}>
      <img src={imageUrl} alt={`${title} logo`} className={css.logo} />
      <div className={css.contactBlock}>
        <h2>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={css.title}
          >
            {title}
          </a>
        </h2>
        <div className={css.contactInfo}>
          {email ? (
            <p className={css.text}>
              Email:
              <a href={addressUrl} target="_blank" className={css.link}>
                {email}
              </a>
            </p>
          ) : null}
          {address ? (
            <p className={css.text}>
              Address:
              <a
                href={addressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={css.link}
              >
                {address}
              </a>
            </p>
          ) : null}
          {phone ? (
            <p className={css.text}>
              Phone:
              <a href={addressUrl} target="_blank" className={css.link}>
                {phone}
              </a>
            </p>
          ) : null}
        </div>
      </div>
      <div className={css.workDays}>
        {firstOpenDay ? (
          <p>{`${firstOpenDay.from} - ${firstOpenDay.to}`}</p>
        ) : (
          <p>Day and Night</p>
        )}
      </div>
    </li>
  );
};

export default FriendsItem;
