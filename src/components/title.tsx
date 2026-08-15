import TypeWriter from "./typewriter";

export default function Title({ text }: { text: string }) {
  return (
    <div className="mx-auto w-fit min-w-[300px] items-center rounded-xl bg-black/30 shadow-2xl p-4 sm:p-8 lg:p-10 xl:p-12 transition-all duration-300 mb-6">
        <h1 className="text-center font-display font-bold tracking-tight text-white text-5xl sm:text-7xl lg:text-8xl xl:text-9xl">
          <TypeWriter text={text} />
        </h1>
    </div>
  );
}
