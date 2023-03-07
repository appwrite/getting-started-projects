import { Framework, useFrameworks } from "@/context/frameworks";
import {
  appwrite,
  PUBLIC_APPWRITE_COLLECTION,
  PUBLIC_APPWRITE_DB,
} from "@/lib/appwrite";
import { FormEventHandler, useEffect, useRef, useState } from "react";

type EditModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  framework: Framework | null;
};

export const EditModal = ({ open, setOpen, framework }: EditModalProps) => {
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
    [open, setOpen, ref]
  );

  const submit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (loading || !framework) return;

    setLoading(true);

    const form = event.target as HTMLFormElement;
    const { name, stars, release_date } = Object.fromEntries(
      new FormData(form).entries()
    );

    if (!name || !stars || !release_date) {
      return;
    }

    await appwrite.databases.updateDocument(
      PUBLIC_APPWRITE_DB,
      PUBLIC_APPWRITE_COLLECTION,
      framework.$id,
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
    <dialog
      className="modal"
      ref={ref}
      key={framework?.$id}
      onClose={() => setOpen(false)}
    >
      <form className="modal-form" onSubmit={submit}>
        <header className="modal-header">
          <h4 className="modal-title heading-level-5">Edit framework</h4>

          <button
            className="button is-text is-small is-only-icon"
            aria-label="Close modal"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
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
                    defaultValue={framework?.name}
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
                    defaultValue={framework?.stars}
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
                    defaultValue={framework?.release_date}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <div className="u-flex u-main-end u-gap-16">
            <button
              className="button is-text"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
            >
              <span className="text">Cancel</span>
            </button>

            <button
              className="button is-secondary"
              type="submit"
              disabled={loading}
            >
              <span className="text">Edit</span>
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
};
