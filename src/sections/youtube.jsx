import React, { useState } from "react";

const YouTubeSection = () => {
  const [imgError, setImgError] = useState(false);

  const channelData = {
    channelName: "Haremking Rover",
    // YouTube CDN profile pic
    profilePic:
      "https://yt3.googleusercontent.com/d17YaPtdKnLNOjVOWrdyR1f-h6bWl3W1pU-H7Pgo0M6c6oyQdSaa9Sy__xrlB9XPbM_Li0pkpg=s400",
    // Local fallback (put pfp.jpg in your /public folder)
    fallbackPic: "/pfp.jpg",
  };

  return (
    <section className="relative py-12 px-4 md:py-16 md:px-6">
      <div
        className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,0,0,0.2)] 
                   bg-gradient-to-br from-gray-900 via-black to-gray-800 border border-gray-700"
      >
        <div className="flex flex-col items-center p-6 md:p-8">
          {/* Profile Pic */}
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-red-500 shadow-[0_0_25px_rgba(255,0,0,0.6)] mb-6 overflow-hidden bg-black/30">
            <img
              src={imgError ? channelData.fallbackPic : channelData.profilePic}
              alt="Channel Profile"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
            />
          </div>

          {/* Channel Name */}
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400 text-transparent bg-clip-text mb-3 drop-shadow-[0_0_10px_rgba(255,100,100,0.7)] text-center">
            {channelData.channelName}
          </h2>

          <p className="text-base md:text-xl italic text-gray-200 font-medium mb-8 md:mb-12 text-center max-w-2xl drop-shadow-md">
            "Epic gaming adventures and insane builds – join the chaos!"
          </p>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-10 w-full">
            {/* Video */}
            <div className="md:w-1/2">
              <div className="aspect-video rounded-2xl shadow-2xl overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/fnwGTrWt6SA"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Info Card */}
            <div className="md:w-1/2 flex flex-col justify-center items-center bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-700">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-red-400 to-yellow-300 text-transparent bg-clip-text drop-shadow-md">
                Join the <span className="text-red-500">Rover Army!</span>
              </h3>

              {/* Subscribe Button */}
              <a
                href="https://www.youtube.com/channel/UCgkqpa3_FFE_MKZK_cxWbXA?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 md:px-12 py-3 md:py-4 text-base md:text-lg bg-gradient-to-r from-red-600 to-pink-500 text-white font-bold rounded-full shadow-lg hover:from-pink-500 hover:to-yellow-400 transition-all transform hover:scale-110 duration-300 drop-shadow-[0_0_10px_rgba(255,100,100,0.8)]"
              >
                🚀 Subscribe
              </a>

              {/* Live Sub Count Styled */}
              <div className="mt-6 md:mt-8 w-full flex justify-center">
                <div className="bg-black/70 rounded-xl p-4 shadow-lg border border-red-500 w-full max-w-[350px] hover:shadow-[0_0_20px_rgba(255,0,0,0.6)] transition-shadow duration-300">
                  <iframe
                    src="https://socialcounts.org/youtube-live-subscriber-count/UCgkqpa3_FFE_MKZK_cxWbXA/embed"
                    width="100%"
                    height="100"
                    frameBorder="0"
                    scrolling="no"
                    className="rounded-lg"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;
