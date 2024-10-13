import "./App.scss";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import AboutPage from "./pages/AboutPage";
import ProjectPage from "./pages/ProjectPage";
import SnippetsPage from "./pages/SnippetsPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/layout/Navbar";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
	return (
		<Router>
			<Provider store={store}>
				<div className="App">
					<ThemeProvider>
						<Navbar />
						<div className="App_main">
							{/* BACK-BUTTON */}
							<Routes>
								<Route path="about" element={<AboutPage />} />
								<Route path="projects/:id" element={<ProjectPage />} />
								<Route path="snippets" element={<SnippetsPage />} />
								<Route path="contact" element={<ContactPage />} />
								<Route path="*" element={<HomePage />} />
							</Routes>
							{/* SCROLL-TO-TOP */}
						</div>
						{/* FOOTER */}
					</ThemeProvider>
				</div>
			</Provider>
		</Router>
	);
}

export default App;
