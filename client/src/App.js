import "./App.css";
import Navbar from "./components/navbar";
import ProjectCardList from "./pages/ProjectCardList";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="completeWrapper">
        <Navbar />
        <ProjectCardList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
