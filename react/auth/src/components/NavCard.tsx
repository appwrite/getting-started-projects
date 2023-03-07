import { Link } from "react-router-dom";
import styles from "./NavCard.module.css";

type AnchorProps = {
  href: string;
} & ContentProps;

type ButtonProps = {
  onClick: () => void;
} & ContentProps;

type NavCardProps = AnchorProps | ButtonProps;

export const NavCard = ({ icon, children, ...props }: NavCardProps) => {
  if ("href" in props) {
    return (
      <Link className={`card ${styles.card}`} to={props.href}>
        <Content icon={icon} children={children} />
      </Link>
    );
  }

  return (
    <button className={`card ${styles.card}`} onClick={props.onClick}>
      <Content icon={icon} children={children} />
    </button>
  );
};

type ContentProps = {
  icon: string;
  children: React.ReactNode;
};

function Content({ icon, children }: ContentProps) {
  return (
    <div className="u-grid">
      <span className={`icon-${icon}`} />
      <span className="heading-level-7">{children}</span>
    </div>
  );
}
