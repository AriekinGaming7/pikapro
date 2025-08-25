import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);
  const email = "aryan15king90@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <motion.button
      onClick={copyToClipboard}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 1.05 }}
      className="relative px-1 py-4 text-sm text-center rounded-full font-extralight 
                 bg-gradient-to-r from-indigo-600 to-purple-600 
                 hover:from-indigo-500 hover:to-purple-500 
                 text-white w-[12rem] cursor-pointer overflow-hidden shadow-lg"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="copied"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <img src="assets/copy-done.svg" className="w-5" alt="copy Icon" />
            Email has Copied
          </motion.p>
        ) : (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <img src="assets/copy.svg" className="w-5" alt="copy icon" />
            Copy Email Address
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const CopyEmailSection = () => {
  return (
    <div className="w-full flex justify-center items-center py-10">
      <motion.div
        className="p-6 rounded-2xl shadow-xl 
                   bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900
                   border border-zinc-700/50 backdrop-blur-md"
        whileHover={{
          boxShadow: "0 0 25px rgba(139, 92, 246, 0.6)", // purple glow
        }}
        transition={{ duration: 0.3 }}
      >
        <CopyEmailButton />
      </motion.div>
    </div>
  );
};

export default CopyEmailSection;
