import { appwrite } from "@/lib/appwrite";
import { Models } from "appwrite";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Context = {
  account: Models.Account<Models.Preferences> | null;
  reloadAccount: () => Promise<void>;
};

const accountContext = createContext<Context>({
  account: null,
  reloadAccount: () => Promise.resolve(),
});

export function AccountProvider({ children }: React.PropsWithChildren) {
  const [initialized, setInitialized] = useState(false);
  const [account, setAccount] = useState<Context["account"]>(null);

  const reloadAccount = useCallback(async () => {
    try {
      const account = await appwrite.account.get();
      setAccount(account);
    } catch {
      setAccount(null);
    }
  }, []);

  useEffect(function init() {
    reloadAccount().then(() => setInitialized(true));
  }, []);

  return (
    <accountContext.Provider value={{ account, reloadAccount }}>
      {initialized ? children : null}
    </accountContext.Provider>
  );
}

export function useAccount() {
  return useContext(accountContext);
}
