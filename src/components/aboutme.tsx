import TypeWriter from "./typewriter";

export default function AboutMe() {
    return (
        <section className="flex items-center justify-center ">
            <div className="flex flex-col lg:flex-row items-center w-full max-[500px]:max-w-[95%] max-w-[65%] lg:max-w-[88%] xl:max-w-[70%] 2xl:max-w-[60%] rounded-xl bg-black shadow-2xl p-4 sm:p-8 lg:p-10 xl:p-12 transition-all duration-300 bg-black/20">

                <div className="flex flex-col justify-center flex-1 w-full lg:w-3/5">
                    <h1 className="font-display text-3xl sm:text-5xl lg:text-4xl xl:text-6xl 2xl:text-7xl font-bold pb-1 lg:pb-3 text-white min-h-[40px] sm:min-h-[60px] lg:min-h-[52px] xl:min-h-[72px]">
                        <TypeWriter 
                            text="Santiago Vega"
                            maxSpeed={100}
                            minSpeed={80}
                        />
                    </h1>

                    <h2 className="mt-1 sm:mt-2 font-mono text-lg sm:text-2xl lg:text-[1.1rem] xl:text-2xl 2xl:text-3xl text-zinc-300 min-h-[28px] sm:min-h-[36px]">
                        <TypeWriter 
                            text="> Software Engineer"
                            minSpeed={50}
                            maxSpeed={70}
                        />
                    </h2>

                    <h2 className="mt-1 sm:mt-2 font-mono text-lg sm:text-2xl lg:text-[1.1rem] xl:text-2xl 2xl:text-3xl text-zinc-300 min-h-[56px] sm:min-h-[36px] lg:min-h-[28px] xl:min-h-[36px] whitespace-nowrap">
                        <TypeWriter 
                            text="Computer Engineering Student @ UNLaM" 
                            maxSpeed={40}
                            minSpeed={20}
                        />
                    </h2>

                    <p className="mt-3 sm:mt-4 lg:mt-5 text-sm sm:text-lg lg:text-sm xl:text-lg 2xl:text-xl text-zinc-400 min-h-[60px] sm:min-h-[56px] lg:min-h-[42px] xl:min-h-[56px]">
                        <TypeWriter 
                            text="Building software focused on performance, clean architecture and low-level systems." 
                            maxSpeed={20}
                            minSpeed={10}
                        />
                    </p>
                </div>
            
                <div className="flex flex-col items-center justify-center shrink-0 w-full lg:w-2/5 mt-4 lg:mt-0">
                    <img
                        src="https://placehold.co/600x400"
                        alt="Profile"
                        className="w-28 h-28 sm:w-40 sm:h-40 lg:w-36 lg:h-36 xl:w-52 xl:h-52 2xl:w-60 2xl:h-60 rounded-full object-cover shadow-lg shrink-0"
                    />
                </div>
            </div>          
        </section>
    );
}