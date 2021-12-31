import classes from './SubCard.module.css';

const SubCard = (props) => {
    return <div className={classes.wrapper}>
        {props.state.title}
    </div>
};

export default SubCard;