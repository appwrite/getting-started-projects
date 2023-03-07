import { useState } from "react";
import { appwrite } from "@/lib/appwrite";
import type { AppwriteException } from "appwrite";
import styles from "./signup.module.css";
import { useAccount } from "@/context/account";
import { Link, Navigate } from "react-router-dom";

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { reloadAccount, account } = useAccount();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setFormError(null);

    const form = event.target as HTMLFormElement;
    // Should we use zod here? Maybe handle formErrors with JS instead of HTML?
    const formData = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string | undefined
    >;

    const { name, email, password } = formData;
    if (!name || !email || !password) {
      return;
    }

    try {
      await appwrite.account.create("unique()", email, password, name);
      await appwrite.account.createEmailSession(email, password);
      await reloadAccount();
    } catch (e) {
      const error = e as AppwriteException;
      setFormError(error.message);
    }

    setLoading(false);
  }

  if (account) {
    return <Navigate to="/" />;
  }

  return (
    <div className={`card ${styles.wrapper}`}>
      <div className="u-flex u-main-space-between u-cross-center">
        <h6 className="heading-level-6">Signup</h6>
      </div>
      <form className="form u-margin-block-start-24" onSubmit={handleSubmit}>
        <ul className="form-list">
          <li className="form-item">
            <label className="label" htmlFor="name">
              Name
            </label>
            <div className="input-text-wrapper">
              <input
                type="text"
                className="input-text u-padding-inline-end-56"
                placeholder="Jane Doe"
                name="name"
                id="name"
                required
              />
            </div>
          </li>

          <li className="form-item">
            <label className="label" htmlFor="email">
              Email
            </label>
            <div className="input-text-wrapper">
              <input
                type="email"
                className="input-text u-padding-inline-end-56"
                placeholder="janedoe@appwrite.io"
                name="email"
                id="email"
                required
              />
            </div>
          </li>
          <li className="form-item">
            <label className="label" htmlFor="password">
              Password
            </label>
            <div
              className="input-text-wrapper"
              style={{ "--amount-of-buttons": 1 } as React.CSSProperties}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="input-text"
                placeholder="SuperSecretPassword"
                required
                minLength={8}
              />
              <button
                className="show-password-button"
                aria-label="show password"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span
                  className={showPassword ? "icon-eye-off" : "icon-eye"}
                  aria-hidden="true"
                />
              </button>
            </div>
          </li>
        </ul>
        <div className="form-footer u-grid u-gap-16">
          {formError && (
            <p className=" u-text-center u-color-text-danger">{formError}</p>
          )}
          <div className="u-flex u-main-end u-gap-12">
            <Link to="/" className="button is-secondary" type="button">
              Go back
            </Link>
            <button className="button" type="submit" disabled={loading}>
              Signup
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
