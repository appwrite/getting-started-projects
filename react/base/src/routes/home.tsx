import { PUBLIC_APPWRITE_ENDPOINT } from "@/lib/appwrite";
import { useEffect, useState } from "react";

export const Home = () => {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(function init() {
    if (version) return;
    fetch(`${PUBLIC_APPWRITE_ENDPOINT}/health/version`).then(async (res) => {
      const { version } = await res.json();
      setVersion(version);
    });
  }, []);

  return (
    <div className="u-text-center">
      <h1 className="heading-level-1">Getting Started</h1>
      <p className="eyebrow-heading-2">React base project</p>
      {version && (
        <p className="u-margin-block-start-8">Appwrite version: {version}</p>
      )}
    </div>
  );
};
