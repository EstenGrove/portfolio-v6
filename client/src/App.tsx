import React from "react";
import "./App.scss";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { AppProviders } from "./context/AppProviders";
import { Provider } from "react-redux";
import { store } from "./store/store";
import HomePage from "./pages/HomePage";
import LazyPage from "./pages/LazyPage";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { ErrorBoundary } from "./components/errors/ErrorBoundary";
import ScrollToTop from "./components/layout/ScrollToTop";

const LazySnippets = <LazyPage path="./SnippetsPage.tsx" />;
const LazyAbout = <LazyPage path="./AboutPage.tsx" />;
const LazyContact = <LazyPage path="./ContactPage.tsx" />;
const LazyProject = <LazyPage path="./ProjectPage.tsx" />;
const LazyProjects = <LazyPage path="./ProjectsPage.tsx" />;

function App() {
	return (
		<ErrorBoundary>
			<Router>
				<Provider store={store}>
					<div className="App">
						<AppProviders>
							<Navbar />
							<div className="App_main">
								{/* BACK-BUTTON */}
								<Routes>
									<Route index element={<HomePage />} />
									<Route path="about" element={LazyAbout} />
									<Route path="contact" element={LazyContact} />
									<Route path="snippets" element={LazySnippets} />
									<Route path="projects" element={LazyProjects} />
									<Route path="projects/:id" element={LazyProject} />
									<Route path="*" element={<PageNotFound />} />
								</Routes>
								{/* SCROLL-TO-TOP */}
								<ScrollToTop />
							</div>
							<Footer />
						</AppProviders>
					</div>
				</Provider>
			</Router>
		</ErrorBoundary>
	);
}

export default App;
