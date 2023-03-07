import {
  appwrite,
  PUBLIC_APPWRITE_COLLECTION,
  PUBLIC_APPWRITE_DB,
} from "@/lib/appwrite";
import { Models } from "appwrite";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Framework = {
  name: string;
  release_date: string;
  stars: number;
} & Pick<Models.Document, "$id">;

type Context = {
  frameworks: Framework[] | null;
  refetch: () => void;
};

const context = createContext<Context>({
  frameworks: null,
  refetch: () => {},
});

export const FrameworksProvider = ({ children }: PropsWithChildren) => {
  const [frameworks, setFrameworks] = useState<Framework[] | null>(null);

  const fetchFrameworks = useCallback(async () => {
    const { documents } = await appwrite.databases.listDocuments(
      PUBLIC_APPWRITE_DB,
      PUBLIC_APPWRITE_COLLECTION
    );
    setFrameworks(documents as unknown as Framework[]);
  }, []);

  useEffect(() => {
    fetchFrameworks();
  }, []);

  return (
    <context.Provider value={{ frameworks, refetch: fetchFrameworks }}>
      {children}
    </context.Provider>
  );
};

export const useFrameworks = () => {
  return useContext(context);
};
