import AboutMe from "../components/aboutme";
import TechCarousel, { languages, tools} from "../components/techcarousel";

function Home() {
    return <div>
        <AboutMe />
        <h3 className="text-2xl font-display text-center">Languages</h3>
        <TechCarousel items={languages} />
        <h3 className="text-2xl font-display text-center">Tools</h3>
        <TechCarousel items={tools} />
    </div>
}

export default Home;
