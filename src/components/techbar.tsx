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
} from "react-icons/si";

import {
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

export const languages = [
    { name: "C", Icon: SiC },
    { name: "C++", Icon: SiCplusplus },
    { name: "Rust", Icon: SiRust },
    { name: "JavaScript", Icon: SiJavascript },
    { name: "TypeScript", Icon: SiTypescript },
    { name: "HTML5", Icon: SiHtml5 },
    { name: "CSS3", Icon: SiCss },
    { name: "PHP", Icon: SiPhp },
    { name: "Solidity", Icon: SiSolidity },
    { name: "SQL", Icon: SiPostgresql },
    { name: "Elixir", Icon: SiElixir },
];

export const tools = [
    { name: "React", Icon: SiReact },
    { name: "Tailwind CSS", Icon: SiTailwindcss },
    { name: "Qt", Icon: SiQt },
    { name: "Phoenix", Icon: SiPhoenixframework },
    { name: "Laravel", Icon: SiLaravel },
    { name: "Git", Icon: SiGit },
    { name: "GitHub", Icon: SiGithub },
    { name: "GitHub Actions", Icon: SiGithubactions },
    { name: "Docker", Icon: SiDocker },
    { name: "Vim", Icon: SiVim },
    { name: "Linux", Icon: SiLinux },
    { name: "Ollama", Icon: SiOllama },
];

export default function TechBar({
    items,
}: {
    items: typeof languages;
}) {
    return (
        <section className="my-2 overflow-hidden">
            <div className="flex items-center justify-center gap-10 py-3">
                {items.map(({ name, Icon }) => (
                    <Icon
                        key={name}
                        title={name}
                        className="text-4xl
                            transition-all
                            duration-300
                            hover:scale-105
                            text-red-600"
                    />
                ))}
            </div>
        </section>
    );
}

