import { Outlet } from "react-router-dom";
import "./App.css";
import { Footer, Header } from "./components/ImportCompo";

function App() {
    return (
        <>
            <Header />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default App;
