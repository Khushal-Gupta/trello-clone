// import CardModal from "../CardModal";
import { useCardHook } from "../../hooks/card-hook";
import classes from "./Card.module.css";

export default function Card({ cardId }) {
  const { title: cardTitle } = useCardHook(cardId);

  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className={classes.wrapper}
        onClick={() => {
          // setShowModal(true);
        }}
      >
        {cardTitle}
      </div>

      {/* <CardModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        showCloseButton
        cardId={cardId}
      /> */}
    </>
  );
}
