import AboutMe from "../components/aboutme";
import TechBar, { languages, tools } from "../components/techbar";
import FireBackground from "../components/bgs/firebg";
import "../components/bgs/firebg.css";

function Home() {
    return <div>
        <AboutMe />
        <h3 className="text-2xl font-display text-center">Languages</h3>
        <TechBar items={languages} />
        <h3 className="text-2xl font-display text-center">Tools</h3>
        <TechBar items={tools} />
        <FireBackground />
    </div>
}

export default Home;
