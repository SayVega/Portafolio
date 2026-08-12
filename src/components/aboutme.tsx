import TypeWriter from "./typewriter";

export default function AboutMe() {
    return (
        <section className="flex items-center justify-center p-4 sm:p-6 lg:p-12 min-[1700px]:p-16">
            <div className="flex flex-col lg:flex-row w-full max-w-[60%] max-[500px]:max-w-[90%] rounded-xl bg-black shadow-2xl p-6 sm:p-8 lg:p-12 min-[1700px]:p-16 gap-8 lg:gap-12 min-[1700px]:gap-16 transition-all duration-300">
                
                <div className="flex flex-col w-full lg:w-3/5 min-[1700px]:w-2/3">
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl min-[1700px]:text-8xl font-bold pb-4 lg:pb-6 text-white">
                        <TypeWriter 
                            text="Santiago Vega"
                            maxSpeed={100}
                            minSpeed={80}
                        />
                    </h1>

                    <h2 className="mt-2 lg:mt-4 font-mono text-xl sm:text-2xl lg:text-3xl min-[1700px]:text-5xl text-zinc-300">
                        <TypeWriter 
                            text="> Software Engineer"
                            minSpeed={50}
                            maxSpeed={70}
                        />
                    </h2>

                    <h2 className="mt-2 lg:mt-4 font-mono text-xl sm:text-2xl lg:text-3xl min-[1700px]:text-5xl text-zinc-300">
                        <TypeWriter 
                            text="Computer Engineering Student @ UNLaM" 
                            maxSpeed={40}
                            minSpeed={20}
                        />
                    </h2>

                    <p className="mt-6 lg:mt-8 text-base sm:text-lg lg:text-xl min-[1700px]:text-3xl text-zinc-400 min-h-[100px]">
                        <TypeWriter 
                            text="Building software focused on performance, clean architecture and low-level systems." 
                            maxSpeed={20}
                            minSpeed={10}
                        />
                    </p>
                </div>
            
                <div className="flex flex-col items-center justify-center w-full lg:w-2/5 min-[1700px]:w-1/3">
                    <img
                        src="https://placehold.co/600x400"
                        alt="Profile"
                        className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 min-[1700px]:w-80 min-[1700px]:h-80 rounded-full object-cover shadow-lg"
                    />
                </div>
            </div>          
        </section>
    );
}