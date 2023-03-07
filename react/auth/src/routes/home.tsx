import { NavCard } from "@/components/NavCard";
import { useAccount } from "@/context/account";
import { appwrite } from "@/lib/appwrite";
import { useState } from "react";

export const Home = () => {
  const { account, reloadAccount } = useAccount();

  const logout = async () => {
    await appwrite.account.deleteSession("current");
    await reloadAccount();
  };

  return (
    <div className="u-flex u-gap-16">
      {!!account ? (
        <>
          <NavCard href="/profile" icon="user">
            Profile
          </NavCard>
          <NavCard icon="logout-right" onClick={logout}>
            Logout
          </NavCard>
        </>
      ) : (
        <>
          <NavCard href="/signup" icon="pencil-alt">
            Signup
          </NavCard>
          <NavCard href="/login" icon="logout-left">
            Login
          </NavCard>
        </>
      )}
    </div>
  );
};
