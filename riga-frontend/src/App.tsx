import { Toaster } from "react-hot-toast";
import AppRouter from "./router/AppRoter";

function App() {
  return (
    <>
      <AppRouter />
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}

export default App;
