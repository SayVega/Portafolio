import ProjectCard from "../components/projectcard";
import PlasmaBackground from "../pages/bgs/plasmabg";
import {
    SiC,
    SiCplusplus,
    SiRust,
    SiJavascript,
    SiTypescript,
    SiHtml5,
    SiCss,
    SiPhp,
    SiSolidity,
    SiPostgresql,
    SiElixir,
    SiReact,
    SiTailwindcss,
    SiQt,
    SiPhoenixframework,
    SiLaravel,
    SiGit,
    SiGithub,
    SiGithubactions,
    SiDocker,
    SiVim,
    SiLinux,
    SiOllama,
} from "react-icons/si";
import Title from "../components/title";
import type { IconType } from "react-icons";

interface TechTag {
  name: string;
  Icon: IconType;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: TechTag[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export default function Projects() {
  const placeholders: Project[] = [
    {
      id: "project-1",
      title: "Project One",
      description: "Short technical overview of the project architecture and main features.",
      image: "https://placehold.co/600x400/09090b/ffffff?text=Project+1",
      tags: [
        { name: "Rust", Icon: SiRust },
        { name: "Linux", Icon: SiLinux },
      ],
    },
    {
      id: "project-2",
      title: "Project Two",
      description: "Short technical overview of the project architecture and main features.",
      image: "https://placehold.co/600x400/09090b/ffffff?text=Project+2",
      tags: [
        { name: "Rust", Icon: SiRust },
        { name: "Linux", Icon: SiLinux },
      ],
    },
    {
      id: "project-3",
      title: "Project Three",
      description: "Short technical overview of the project architecture and main features.",
      image: "https://placehold.co/600x400/09090b/ffffff?text=Project+3",
      tags: [
        { name: "Rust", Icon: SiRust },
        { name: "Linux", Icon: SiLinux },
      ],
    },
  ];

  return (
    <main className="relative min-h-screen px-4 py-12 text-white sm:px-8 lg:px-12">
      <section className="relative z-10 mx-auto max-w-[65%] max-[500px]:max-w-[95%] lg:max-w-[80%] xl:max-w-[70%] 2xl:max-w-[60%]">
        <Title text="Work" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {placeholders.map((project) => (
            <ProjectCard key={project.id} project={project} variant="default" />
          ))}
        </div>
      </section>
            <PlasmaBackground />
    </main>
  );
}