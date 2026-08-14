import AboutMe from "../components/aboutme";
import TechBar, { languages, tools } from "../components/techbar";
import FireBackground from "./bgs/firebg";
import "../pages/bgs/firebg.css";

function Home() {
    return <main>
        <AboutMe />
        <h3 className="text-2xl font-display text-center">Languages</h3>
        <TechBar items={languages} />
        <h3 className="text-2xl font-display text-center">Tools</h3>
        <TechBar items={tools} />
        <FireBackground />
    </main>
}

export default Home;
