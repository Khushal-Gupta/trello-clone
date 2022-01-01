import './App.css';
import Navbar from './components/navbar';
import ProjectCardList from './pages/ProjectCardList';

function App() {
  return (
    <div className="center">
      <Navbar/>
      <ProjectCardList/>
    </div>
  );
}

export default App;
