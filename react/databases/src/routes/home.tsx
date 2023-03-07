import { PUBLIC_APPWRITE_ENDPOINT } from "@/lib/appwrite";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import {
  appwrite,
  PUBLIC_APPWRITE_COLLECTION,
  PUBLIC_APPWRITE_DB,
} from "@/lib/appwrite";
import { Models } from "appwrite";
import styles from "./home.module.css";
import { Framework, useFrameworks } from "@/context/frameworks";
import { AddModal } from "@/components/AddModal";
import { EditModal } from "@/components/EditModal";

function formatNumber(num: number) {
  if (num > 999 && num < 1000000) {
    const decimalPoints = num % 1000 === 0 ? 0 : 1;
    return (num / 1000).toFixed(decimalPoints) + "k";
  }

  return num;
}

function formatDate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-UK", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const Home = () => {
  const { frameworks, refetch } = useFrameworks();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFramework, setEditingFramework] = useState<Framework | null>(
    null
  );

  async function handleDelete(id: string) {
    await appwrite.databases.deleteDocument(
      PUBLIC_APPWRITE_DB,
      PUBLIC_APPWRITE_COLLECTION,
      id
    );
    refetch();
  }

  if (frameworks === null) return null;

  return (
    <>
      <div className={styles.wrapper}>
        <button className="button" onClick={() => setAddModalOpen(true)}>
          <span className="icon-plus" aria-hidden="true" />
          <span className="text"> Add framework </span>
        </button>

        <div className="table-with-scroll">
          <div className="table-wrapper">
            <table className="table is-selected-columns-mobile">
              <thead className="table-thead">
                <tr className="table-row">
                  <th
                    className="table-thead-col"
                    style={{ "--p-col-width": 140 } as CSSProperties}
                  >
                    <span className="eyebrow-heading-3">Name</span>
                  </th>
                  <th
                    className="table-thead-col"
                    style={{ "--p-col-width": 140 } as CSSProperties}
                  >
                    <span className="eyebrow-heading-3">Stars</span>
                  </th>
                  <th
                    className="table-thead-col"
                    style={{ "--p-col-width": 200 } as CSSProperties}
                  >
                    <span className="eyebrow-heading-3">Release date</span>
                  </th>
                  <th
                    className="table-thead-col"
                    style={{ "--p-col-width": 40 } as CSSProperties}
                  />
                </tr>
              </thead>
              <tbody className="table-tbody">
                {/* <!-- Deal with empty state --> */}
                {frameworks?.map((framework) => {
                  return (
                    <tr className="table-row" key={framework.$id}>
                      <td className="table-col" data-title="Name">
                        <span className="text">{framework.name}</span>
                      </td>
                      <td className="table-col" data-title="Stars">
                        <div className="tag">
                          <span className="text">
                            {formatNumber(framework.stars)}
                          </span>
                        </div>
                      </td>
                      <td className="table-col" data-title="Release Date">
                        <time className="text">
                          {formatDate(framework.release_date)}
                        </time>
                      </td>
                      <td className="table-col u-overflow-visible">
                        <div className="u-flex u-cross-center">
                          <button
                            className="button is-text is-only-icon"
                            aria-label="more options"
                            onClick={(e) => {
                              e.preventDefault();
                              setEditingFramework({
                                ...framework,
                                // to yyyy-mm-dd
                                release_date: new Date(framework.release_date)
                                  .toISOString()
                                  .slice(0, 10),
                              });
                              setEditModalOpen(true);
                            }}
                          >
                            <span className="icon-pencil" aria-hidden="true" />
                          </button>
                          <button
                            className="button is-text is-only-icon"
                            aria-label="more options"
                            onClick={() => handleDelete(framework.$id)}
                          >
                            <span className="icon-trash" aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddModal open={addModalOpen} setOpen={setAddModalOpen} />

      <EditModal
        open={editModalOpen}
        setOpen={setEditModalOpen}
        framework={editingFramework}
      />
    </>
  );
};
