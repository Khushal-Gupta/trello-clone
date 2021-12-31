import { Fragment } from 'react';
import AddCardButton from './AddCardButton';
import classes from './ProjectCard.module.css';
import SubCard from './SubCard';

const ProjectCard = (props) => {
  return <Fragment>
      <div className={classes.wrapper}>
          <h3 className={classes.header}>Project Card Header</h3>
          <SubCard/>
          <SubCard/>
          <AddCardButton/>
      </div>
  </Fragment>;
};

export default ProjectCard;
