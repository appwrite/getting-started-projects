import { useAccount } from "@/context/account";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import styles from "./profile.module.css";

export const Profile = () => {
  const { account } = useAccount();

  if (!account) return <Navigate to="/" />;

  return (
    <div className={`card ${styles.wrapper}`}>
      <div className="avatar is-size-x-large">
        <span className="icon-user" />
      </div>
      <h1 className="heading-level-5">{account?.name}</h1>
      <Link
        to="/"
        className="button is-secondary u-margin-block-start-16"
        type="button"
      >
        Go back
      </Link>
    </div>
  );
};
