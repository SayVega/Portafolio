import TypeWriter from "./typewriter";

export default function Title({ text }: { text: string }) {
  return (
      <h1 className=" text-center font-display font-bold tracking-tight text-white text-5xl sm:text-7xl lg:text-8xl xl:text-9xl min-h-[60px] sm:min-h-[84px] lg:min-h-[110px] xl:min-h-[140px]">
        <TypeWriter text={text} />
      </h1>
  );
}