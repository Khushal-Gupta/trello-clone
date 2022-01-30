import "./App.css";
import Navbar from "./components/navbar";
import Workspace from "./pages/Workspace";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="completeWrapper">
        <Navbar />
        <Workspace />
      </div>
    </QueryClientProvider>
  );
}

export default App;
