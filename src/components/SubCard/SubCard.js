import classes from './SubCard.module.css';

const SubCard = ({title}) => {
    return <div className={classes.wrapper}>
        {title}
    </div>
};

export default SubCard;