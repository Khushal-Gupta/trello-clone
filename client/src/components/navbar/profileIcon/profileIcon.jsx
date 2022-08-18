import classes from "./profileIcon.module.css";

export default function ProfileIcon() {
  return (
    <div className={classes.container}>
      <img
        src="https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427__340.jpg"
        alt="profile"
      />
    </div>
  );
}
