import { Link } from "react-router-dom";
import type { IconType } from "react-icons";

export interface TechTag {
  name: string;
  Icon: IconType;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: TechTag[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-black/50 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 p-0">
      <Link
        to={`/projects/${project.id}`}
        className="relative block w-full aspect-video overflow-hidden border-b border-zinc-800 bg-zinc-900"
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
      </Link>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 w-full">
        <div>
          <div className="mb-2.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
            {project.tags.map(({ name, Icon }) => (
              <span
                key={name}
                title={name}
                className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/80 px-2 py-0.5 text-xs text-zinc-300 transition-colors hover:text-white"
              >
                <Icon className="text-xs sm:text-sm text-zinc-400" />
                <span className="font-mono text-[10px] sm:text-[11px]">{name}</span>
              </span>
            ))}
          </div>

          <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white">
            <Link to={`/projects/${project.id}`}>{project.title}</Link>
          </h3>

          <p className="mt-1.5 text-xs sm:text-sm lg:text-base text-zinc-400 line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-zinc-900 pt-4">
          <Link
            to={`/projects/${project.id}`}
            className="font-mono text-xs font-medium text-zinc-400 transition-colors duration-200 hover:text-[#fff]"
          >
            See more &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}