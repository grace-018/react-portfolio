import { Box } from "@mui/material";
import Header from "./component/header/Header";
import Home from "./component/home/Home";
import About from "./component/about/About";
import Skills from "./component/skills/Skills";
import Projects from "./component/projects/Projects";
import "./index.css";
import ContactForm from "./component/contact/ContactForm";
import Footer from "./component/footer/Footer";

function App() {
  return (
    <Box sx={{ width: "100vw" }}>
      <Header />
      <Home />
      <About />
      <Skills />
      <Projects />
      <ContactForm />
      <Footer />
    </Box>
  );
}

export default App;
