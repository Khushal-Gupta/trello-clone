import ProjectCard from '../components/ProjectCard';
import classes from './ProjectCardList.module.css';

const ProjectCardList = () => {
    return <div className={classes.wrapper}>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
    </div>
};

export default ProjectCardList;