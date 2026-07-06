import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";

import Home from "./pages/home";
import Projects from "./pages/projects.tsx";
import Blog from "./pages/blog.tsx";
import Contact from "./pages/contact";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App


// About me
// #333D6D
// #723EC3
// #FFCF95
// #FFF0D9

// Home
// #000000
// #CB2957
// #DDDDDD
// #EEEEEE

// Projects
// #FFF8F0
// #C08552
// #8C5A3C
// #4B2E2B

// Contact
// #FFDE42
// #4C5C2D
// #313E17
// #1B0C0C