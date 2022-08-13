import classes from "./navbar.module.css";
import ProfileIcon from "./profileIcon";
import AppIcon from "../../assets/appIcon.svg";

export default function Navbar() {
  return (
    <nav className={classes.navbar}>
      <div className={classes.appHeaderWrapper}>
        <img src={AppIcon} className={classes.appIcon} alt="app-icon" />
        <div className={classes.appHeader}>what Todo now !</div>
      </div>
      <div className={classes.headerEnd}>
        <ProfileIcon />
      </div>
    </nav>
  );
}
