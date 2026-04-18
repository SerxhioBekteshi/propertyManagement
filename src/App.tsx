import { SnackbarProvider } from "notistack";
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./routes";

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <AuthProvider>
        <Router />
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
