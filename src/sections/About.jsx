import { useRef, useState } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks.jsx";

const About = () => {
  const grid2Container = useRef();
  const [dragging, setDragging] = useState(false);

  const handleJoinMission = () => {
    window.open("https://www.youtube.com/@HaremkingRover", "_blank");
    alert("🔥 Don’t forget to SUBSCRIBE to the channel!");
  };

  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">

        {/* Grid 1 */}
        <div className="flex items-end grid-default-color grid-1 relative rounded-2xl shadow-lg overflow-hidden">
          <img
            src="assets/coding-pov.png"
            alt="Coding POV"
            className="w-full h-full sm:object-cover object-contain sm:aspect-auto aspect-square"
          />
          <div className="absolute bottom-4 left-4 z-10">
            <p className="headtext text-white text-lg sm:text-2xl">
              Hi I am Aryan Singh
            </p>
            <p className="subtext text-neutral-200 text-sm sm:text-base">
              I am a Gamer and also a Game Developer, currently a student,
              in Future I have plans to become an Esports player and a streamer
            </p>
          </div>
          <div className="absolute inset-x-0 -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo pointer-events-none" />
        </div>

        {/* Grid 2 */}
        <div className="grid-default-color grid-2 relative rounded-2xl shadow-lg overflow-hidden">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full relative"
          >
            <p className="flex items-end text-4xl md:text-5xl text-yellow-200 font-bold drop-shadow-lg">
              GAMING IS LIFE
            </p>
            <Card style={{ rotate: "75deg", top: "30%", left: "20%" }} text="DOMINATE" containerRef={grid2Container} />
            <Card style={{ rotate: "-30deg", top: "60%", left: "45%" }} text="ASCEND" containerRef={grid2Container} />
            <Card style={{ rotate: "90deg", bottom: "30%", left: "70%" }} text="FLOW STATE" containerRef={grid2Container} />
            <Card style={{ rotate: "-45deg", top: "55%", left: "0%" }} text="WINNERS WIN" containerRef={grid2Container} />
            <Card style={{ rotate: "20deg", top: "10%", left: "38%" }} text="RADIANT" containerRef={grid2Container} />
            <Card style={{ rotate: "30deg", top: "70%", left: "70%" }} image="assets/logos/csharp-pink.png" containerRef={grid2Container} />
            <Card style={{ rotate: "-45deg", top: "70%", left: "25%" }} image="assets/logos/valorant.svg" containerRef={grid2Container} />
            <Card style={{ rotate: "-45deg", top: "5%", left: "10%" }} image="assets/logos/wuwa.svg" containerRef={grid2Container} />
          </div>
        </div>

        {/* Grid 3 - Goal + Globe */}
        <div className="grid-black-color grid-3 relative rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center justify-between p-6 gap-8">
          
          {/* Left Text */}
          <div className="w-full md:w-1/2 z-20 text-center md:text-left space-y-4 relative">
            <p className="headtext text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              GOAL 🌍
            </p>
            <p className="subtext text-neutral-300 leading-relaxed">
              I am working hard to achieve <span className="text-yellow-300 font-semibold">world domination</span>.
              <br />
              <span className="text-pink-400">YOU CAN JOIN ME TOO 🚀</span>
            </p>
            <button
              onClick={handleJoinMission}
              className="relative mt-4 px-6 py-2 rounded-full 
                         bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 
                         text-white font-semibold shadow-lg 
                         transition-all duration-300 transform 
                         hover:scale-110 hover:shadow-pink-500/50 active:scale-95 
                         overflow-hidden hover:animate-shake z-30"
            >
              <span className="relative z-10">Join the Mission</span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r 
                               from-yellow-400 via-pink-500 to-purple-600 
                               opacity-0 group-hover:opacity-40 blur-xl 
                               transition-opacity duration-300"></span>
            </button>
          </div>

          {/* Right Globe */}
          <div className="w-full md:w-1/2 relative mt-6 md:mt-0 flex justify-end z-10">
            {/* Subtle background glow */}
            <div
              className="absolute right-[-4rem] top-1/2 -translate-y-1/2 
                          w-72 h-72 md:w-[26rem] md:h-[26rem] rounded-full 
                          bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 
                          blur-3xl opacity-25 animate-pulse pointer-events-none z-0"
            />

            {/* Globe + Orbit Rings */}
            <div className="relative z-10 mr-[-5rem] -mt-10 pointer-events-auto">
              <div className="w-96 h-96 md:w-[28rem] md:h-[28rem] relative">
                <Globe
                  onDragStart={() => setDragging(true)}
                  onDragEnd={() => setDragging(false)}
                />

                {/* Orbiting Curved Rings */}
                <span
                  className={`pointer-events-none absolute inset-0 rounded-full 
                              border-2 ${dragging ? "border-pink-400/80" : "border-pink-500/40"} 
                              blur-sm animate-[rotateRing_14s_linear_infinite] z-0`}
                  style={{ transform: "rotateX(65deg)" }}
                />
                <span
                  className={`pointer-events-none absolute inset-0 rounded-full 
                              border-2 ${dragging ? "border-yellow-300/70" : "border-yellow-400/30"} 
                              blur-sm animate-[rotateRing_20s_linear_infinite] z-0`}
                  style={{ transform: "rotateY(75deg)" }}
                />
                <span
                  className={`pointer-events-none absolute inset-0 rounded-full 
                              border-2 ${dragging ? "border-purple-400/70" : "border-purple-500/30"} 
                              blur-sm animate-[rotateRing_28s_linear_infinite] z-0`}
                  style={{ transform: "rotateX(50deg) rotateY(20deg)" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Grid 4 - Copy Email */}
        <div className="relative grid-4 rounded-2xl bg-zinc-900 shadow-xl border border-zinc-700 flex flex-col items-center justify-center gap-5 p-6 transition-all duration-300 hover:shadow-yellow-500/30 hover:-translate-y-1">
          <p className="text-center headtext text-yellow-200 drop-shadow-md">
            For Business Purposes And Collab
          </p>
          <div className="w-full flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 blur-lg opacity-75 animate-pulse" />
              <div className="relative">
                <CopyEmailButton />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />
        </div>

       {/* Grid 5 */}
<div className="grid-default-color grid-5 relative rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center">
  {/* Left Content */}
  <div className="z-20 w-full md:w-1/2 p-6 text-center md:text-left space-y-3">
    <p className="headtext text-3xl md:text-4xl font-bold 
                 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 
                 bg-clip-text text-transparent drop-shadow-md animate-pulse">
      Multi-Talented 🎮
    </p>
    <p className="subtext text-neutral-300 leading-relaxed max-w-md mx-auto md:mx-0">
      I specialize in a variety of <span className="text-yellow-300 font-semibold">softwares</span> 
      and <span className="text-pink-400 font-semibold">games</span>, 
      constantly pushing my creative and technical limits.
    </p>
    <div className="inline-block mt-2">
      <span className="relative text-sm font-semibold text-white/80">
        EXPLORE MY STACK
        <span className="absolute left-0 -bottom-1 w-full h-[2px] 
                         bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 
                         animate-pulse"></span>
      </span>
    </div>
  </div>

  {/* Right Orbiting Frameworks */}
  <div className="w-full md:w-1/2 relative flex justify-center items-center p-6">
    {/* Soft glowing background */}
    <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full 
                    bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 
                    blur-[100px] opacity-30 animate-pulse"></div>

    {/* Orbiting icons (Frameworks component) */}
    <div className="relative w-80 h-80 md:w-[28rem] md:h-[28rem]">
      <Frameworks />
    </div>
  </div>
</div>
</div>

    </section>
  );
};

export default About;
