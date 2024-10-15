import "./App.scss";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { AppProviders } from "./context/AppProviders";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AboutPage from "./pages/AboutPage";
import ProjectPage from "./pages/ProjectPage";
import SnippetsPage from "./pages/SnippetsPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProjectsPage from "./pages/ProjectsPage";
import PageNotFound from "./pages/PageNotFound";

function App() {
	return (
		<Router>
			<Provider store={store}>
				<div className="App">
					<AppProviders>
						<Navbar />
						<div className="App_main">
							{/* BACK-BUTTON */}
							<Routes>
								{/* <Route index={true} element={<HomePage />} /> */}
								<Route index element={<HomePage />} />
								<Route path="about" element={<AboutPage />} />
								<Route path="projects" element={<ProjectsPage />} />
								<Route path="projects/:id" element={<ProjectPage />} />
								<Route path="snippets" element={<SnippetsPage />} />
								<Route path="contact" element={<ContactPage />} />
								<Route path="*" element={<PageNotFound />} />
							</Routes>
							{/* SCROLL-TO-TOP */}
						</div>
						<Footer />
					</AppProviders>
				</div>
			</Provider>
		</Router>
	);
}

export default App;
