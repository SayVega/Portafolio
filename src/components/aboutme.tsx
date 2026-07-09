import TypeWriter from "./typewriter";

export default function AboutMe() {
    return (
        <section className="flex items-center justify-center p-6">
            <div className="flex max-w-5xl rounded-xl bg-black shadow-2xl">
                <div className="flex flex-col w-3/5 min-w-2xl min-h-[50vh]">
                    <h1 className="font-display text-6xl font-bold pl-10 pb-6">
                        <TypeWriter text="Santiago Vega"
                        maxSpeed={100}
                        minSpeed={80}
                        />
                    </h1>

                    <h2 className="mt-4 font-mono text-3xl text-zinc-300 pl-10">
                        <TypeWriter text="> Software Engineer" />
                    </h2>

                    <h2 className="mt-4 font-mono text-3xl text-zinc-300 pl-10">
                        <TypeWriter text="Computer Engineering Student @ UNLaM" 
                        maxSpeed={40}
                        minSpeed={20}
                        />
                    </h2>

                    <p className="mt-8 max-w-2xl text-lg text-zinc-400 pl-10 pb-4">
                        <TypeWriter text="Building software focused on performance, clean architecture and low-level systems." 
                        maxSpeed={20}
                        minSpeed={10}
                        />
                    </p>
                </div>
            
                <div className="flex flex-col w-2/5 min-w-1xl min-h-[50vh]">
                    <img
                        src="https://placehold.co/600x400"
                        alt="Profile"
                        className="w-48 h-48 mx-auto mt-10 pr-10"
                    />
                </div>
            </div>          

        </section>
    );
}