import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send(
        "service_tqyxi9q", // ✅ your service ID
        "template_fkx0ztm", // ✅ your template ID
        {
          from_name: formData.name,
          to_name: "Aryan",
          from_email: formData.email,
          to_email: "aryan15king90@gmail.com",
          message: formData.message,
        },
        "4ZDdZzWi7olUplItJ" // ✅ your public key
      );

      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "✅ Your message has been sent!");
    } catch (error) {
      console.error(error);
      showAlertMessage("danger", "❌ Something went wrong. Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("aryan15king90@gmail.com");
    showAlertMessage("success", "📋 Email copied to clipboard!");
  };

  return (
    <section
      id="contact"
      className="relative flex items-center justify-center min-h-screen px-6 py-16 sm:px-12 lg:px-20"
    >
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />

      {showAlert && <Alert type={alertType} text={alertMessage} />}

      {/* Contact Card with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative w-full max-w-2xl p-8 rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.1)] backdrop-blur-lg bg-white/5 border border-white/10"
      >
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-white drop-shadow-lg">
            📬 Contact Me
          </h2>
          <p className="mt-3 text-neutral-300">
            For business queries, collaborations, or just to say hi — drop me a
            message below!
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-neutral-300"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-4 py-3 text-white placeholder-gray-400 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
              placeholder="John Doe"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-neutral-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-4 py-3 text-white placeholder-gray-400 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
              placeholder="johndoe@email.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-neutral-300"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full px-4 py-3 text-white placeholder-gray-400 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
              placeholder="Share your thoughts..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-violet-600 hover:opacity-90 transition focus:outline-none shadow-lg"
          >
            {!isLoading ? "Send Message 🚀" : "Sending..."}
          </motion.button>
        </form>

        {/* Direct email option */}
        <div className="mt-8 text-center text-neutral-300">
          <p>
            Or reach me directly at{" "}
            <a
              href="mailto:aryan15king90@gmail.com"
              className="text-violet-400 hover:underline"
            >
              aryan15king90@gmail.com
            </a>
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyEmail}
            className="mt-3 px-4 py-2 text-sm text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition"
          >
            📋 Copy Email
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
