import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import ApplicationStatus from "./pages/ApplicationStatus";
import Meals from "./pages/Meals";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/haqida" element={<About />} />
            <Route path="/talim" element={<Academics />} />
            <Route path="/qabul" element={<Admissions />} />
            <Route path="/ariza-holati" element={<ApplicationStatus />} />
            <Route path="/taomnoma" element={<Meals />} />
            <Route path="/galereya" element={<Gallery />} />
            <Route path="/yangiliklar" element={<News />} />
            <Route path="/yangiliklar/:slug" element={<NewsDetail />} />
            <Route path="/aloqa" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
