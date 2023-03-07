import { useFrameworks } from "@/context/frameworks";
import {
  appwrite,
  PUBLIC_APPWRITE_COLLECTION,
  PUBLIC_APPWRITE_DB,
} from "@/lib/appwrite";
import { FormEventHandler, useEffect, useRef, useState } from "react";

type AddModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const AddModal = ({ open, setOpen }: AddModalProps) => {
  const [loading, setLoading] = useState(false);
  const { refetch } = useFrameworks();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(
    function modifyVisibility() {
      if (open) {
        ref.current?.showModal();
      } else {
        ref.current?.close();
      }
    },
    [open]
  );

  const submit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (loading) return;
    setLoading(true);

    const form = event.target as HTMLFormElement;
    const { name, stars, release_date } = Object.fromEntries(
      new FormData(form).entries()
    );

    if (!name || !stars || !release_date) {
      return;
    }

    await appwrite.databases.createDocument(
      PUBLIC_APPWRITE_DB,
      PUBLIC_APPWRITE_COLLECTION,
      "unique()",
      {
        name,
        stars: Number(stars),
        // Should we use a type-guard/zod?
        release_date: new Date(release_date as string).toISOString(),
      }
    );
    await refetch();

    setOpen(false);
    setLoading(false);
  };

  return (
    <dialog className="modal" ref={ref}>
      <form className="modal-form" onSubmit={submit}>
        <header className="modal-header">
          <h4 className="modal-title heading-level-5">Add framework</h4>

          <button
            className="button is-text is-small is-only-icon"
            aria-label="Close modal"
            onClick={() => setOpen(false)}
          >
            <span className="icon-x" aria-hidden="true" />
          </button>
        </header>

        <div className="modal-content u-small">
          <div className="form u-margin-block-start-24">
            <ul className="form-list">
              <li className="form-item">
                <label className="label" htmlFor="name">
                  Name
                </label>
                <div className="input-text-wrapper">
                  <input
                    type="name"
                    className="input-text u-padding-inline-end-56"
                    placeholder="Framework.js"
                    name="name"
                    required
                  />
                </div>
              </li>
              <li className="form-item">
                <label className="label" htmlFor="stars">
                  Stars
                </label>
                <div className="input-text-wrapper">
                  <input
                    type="number"
                    className="input-text"
                    placeholder="10000"
                    name="stars"
                    required
                    min="0"
                  />
                </div>
              </li>
              <li className="form-item">
                <label className="label" htmlFor="release_date">
                  Release date
                </label>
                <div className="input-text-wrapper">
                  <input
                    type="date"
                    className="input-text"
                    name="release_date"
                    required
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <div className="u-flex u-main-end u-gap-16">
            <button className="button is-text" onClick={() => setOpen(false)}>
              <span className="text">Cancel</span>
            </button>

            <button
              className="button is-secondary"
              type="submit"
              disabled={loading}
            >
              <span className="text">Add</span>
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
};
