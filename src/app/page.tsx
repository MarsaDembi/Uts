"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import confetti from "canvas-confetti";

type Comment = {
  name: string;
  email: string;
  message: string;
  createdAt: string;
  rating: number | null;
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [avgRating, setAvgRating] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");


  
  
    const sendMessage = async () => {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
  
      const data = await res.json();
      setReply(data.reply);
    };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then((data) => setComments(data.comments || []));
  }, []);

  const skills = [
    "HTML", "CSS", "JavaScript", "React",
    "Next.js", "Node.js", "Tailwind CSS", "Git",
    "REST API", "MongoDB", "UI/UX Design", "Figma"
  ];

  const projects = [
    {
      title: "Website cv-online",
      desc: "Membuat project website cv online",
      image: "/cv.png",
      demoUrl: "https://chalenge-p3.vercel.app/"
    },
    {
      title: "Project Design UI/UX",
      desc: "Desain aplikasi sebuah toko dessert",
      image: "/uiux-mobile.png",
      demoUrl: "https://www.figma.com/design/zvU0CPC5EuCdHgxHGalTBe/Untitled--Copy-?node-id=1-3&t=luLdWiQqmkcOptWW-1"
    },
    {
      title: "Project Design UI/UX",
      desc: "Desain aplikasi sebuah toko online",
      image: "/ecomerce.png",
      demoUrl: "https://www.figma.com/design/t6ka1FzSMm2fyTdrkRWIOp/Untitled?t=luLdWiQqmkcOptWW-1"
    },
  ];

  const handleConfetti = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };


  return (
    <main className="bg-background text-foreground font-sans transition-colors duration-500">
      <nav className="bg-indigo-50/90 dark:bg-indigo-900/50 backdrop-blur-md px-6 py-4 shadow-md sticky top-0 z-50 flex justify-between items-center">
        <ul className="flex space-x-6 text-sm md:text-base font-medium">
          {["home", "skills", "portfolio", "contact"].map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-md text-sm transition"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </nav>

      <motion.section
        id="home"
        className="min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 py-20 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative w-48 h-48 mb-6 md:mb-0 md:mr-12">
          <Image src="/saa.jpg" alt="Marsa Dembi" fill className="rounded-full object-cover shadow-lg" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hi, I&apos;m Marsa Dembi <motion.span animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="inline-block">👋</motion.span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6">
            Front-End Developer & UI Designer based in Sumedang, Indonesia.
          </p>
          <a href="#contact" className="inline-flex items-center justify-center rounded-xl bg-white text-indigo-600 hover:bg-indigo-100 px-6 py-3 font-medium shadow transition">
            Let&apos;s Collaborate
          </a>
          <div className="flex justify-center md:justify-start gap-6 mt-6 text-white">
            <a href="#" className="hover:text-indigo-300 transition"><Github /></a>
            <a href="#" className="hover:text-indigo-300 transition"><Linkedin /></a>
            <a href="mailto:marsa@email.com" className="hover:text-indigo-300 transition"><Mail /></a>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="skills"
        className="min-h-screen px-6 py-20 bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-100 transition"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-10 text-center">🛠 Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {skills.map((skill) => (
            <Tilt key={skill} tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable glareColor="lightblue">
              <div className="bg-white dark:bg-indigo-900 text-indigo-700 dark:text-indigo-100 p-4 rounded-xl shadow-md hover:scale-105 transition-transform">
                {skill}
              </div>
            </Tilt>
          ))}
        </div>
      </motion.section>

      <motion.section
  id="portfolio"
  className="min-h-screen px-6 py-20 bg-background transition"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  <h2 className="text-3xl font-bold mb-10 text-center">📁 Portfolio</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {projects.map((project, idx) => (
      <Tilt
        key={idx}
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        glareEnable
        glareColor="lightblue"
        className="w-full"
      >
        <div className="bg-white dark:bg-indigo-900 p-4 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{project.desc}</p>
          <a
            href={project.demoUrl} // Pastikan data project memiliki key 'demoUrl'
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={300}
              className="rounded-lg w-full h-48 object-cover hover:scale-105 transition-transform"
            />
          </a>
          <div className="mt-4 text-center">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
            >
              🔗 Live Demo
            </a>
          </div>
        </div>
      </Tilt>
    ))}
  </div>
</motion.section>


      <section id="contact" className="px-6 py-20 bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-100">
        <div className="max-w-2xl mx-auto bg-white dark:bg-indigo-900 p-6 rounded-xl shadow-lg">
        <form
  onSubmit={async (e) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    if (!name || !email || !message || rating === 0) {
      alert("Semua kolom dan rating wajib diisi!");
      return;
    }

    const data = { name, email, message, rating };

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Gagal menyimpan komentar");

      handleConfetti();
      form.reset();
      setRating(0);
      alert("Komentar berhasil dikirim!");

      const updated = await fetch("/api/comments");
      const { comments: newComments, averageRating } = await updated.json();
setComments(newComments);
setAvgRating(averageRating);
    } catch (err) {
      console.error("Error submitting comment:", err);
      alert("Gagal mengirim komentar. Silakan coba lagi.");
    }
  }}
  className="space-y-4"
>
  <input
    name="name"
    type="text"
    placeholder="Your Name"
    required
    className="w-full px-4 py-3 rounded-lg bg-indigo-50 dark:bg-indigo-800 text-indigo-900 dark:text-white placeholder:text-indigo-400 dark:placeholder:text-indigo-300 shadow transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
  />
  <input
    name="email"
    type="email"
    placeholder="Your Email"
    required
    className="w-full px-4 py-3 rounded-lg bg-indigo-50 dark:bg-indigo-800 text-indigo-900 dark:text-white placeholder:text-indigo-400 dark:placeholder:text-indigo-300 shadow transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
  />
  <textarea
    name="message"
    rows={5}
    placeholder="Your Message"
    required
    className="w-full px-4 py-3 rounded-lg bg-indigo-50 dark:bg-indigo-800 text-indigo-900 dark:text-white placeholder:text-indigo-400 dark:placeholder:text-indigo-300 shadow transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
  />
  <div className="mt-6 text-center">
    <p className="text-indigo-800 dark:text-indigo-200 mb-2">Beri Rating:</p>
    <div className="flex justify-center gap-2">
  {[1, 2, 3, 4, 5].map((star) => (
    <button
      key={star}
      type="button"
      aria-label={`Beri rating ${star} bintang`}
      onClick={() => setRating(star)} // ✅ hanya simpan ke state, tidak kirim
      onMouseEnter={() => setHoverRating(star)}
      onMouseLeave={() => setHoverRating(0)}
      className={`text-3xl transition ${
        (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-400"
      }`}
    >
      ★
    </button>
  ))}
</div>

  </div>
  <button
    type="submit"
    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105 hover:animate-bounce"
  >
    ✉️ Send Message
  </button>
</form>



            {comments.length > 0 && (
              <div className="mt-10 space-y-6">
                <h3 className="text-2xl font-semibold mb-4">💬 Komentar</h3>
                <p className="text-center text-indigo-600 dark:text-indigo-300">
  ⭐ Rata-rata rating: {avgRating.toFixed(1)} / 5
</p>
                {comments.map((comment, idx) => (
                  <div key={idx} className="bg-white dark:bg-indigo-900 p-4 rounded-xl shadow-md">
                    <p className="text-lg font-medium text-indigo-800 dark:text-indigo-200">
                      {comment.name} <span className="text-sm text-gray-500">({new Date(comment.createdAt).toLocaleString()})</span>
                    </p>
                    <p className="text-sm text-indigo-700 dark:text-indigo-300">{comment.message}</p>
                    {comment.rating !== null && <p className="text-yellow-500 mt-2">⭐ {comment.rating} / 5</p>}
                    

                  </div>
                ))}
              </div>
            )}

            {/* Chatbot */}
            <div className="mt-10 border-t pt-6">
            <h3 className="text-2xl font-semibold mb-4">🤖 Chatbot</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-indigo-50 dark:bg-indigo-800 text-indigo-900 dark:text-white placeholder:text-indigo-400 dark:placeholder:text-indigo-300 shadow transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Tulis sesuatu..."
              />
              <button
                onClick={sendMessage}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium shadow-md"
              >
                Kirim ke Bot
              </button>
              {reply && (
                <div className="p-4 bg-indigo-50 dark:bg-indigo-800 rounded-lg shadow text-indigo-800 dark:text-indigo-100">
                  <strong>Bot:</strong> {reply}
                </div>
              )}
            </div>
          </div>


            <div className="text-center mt-10 text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
              <p>Email: <a href="mailto:marsa@email.com" className="underline hover:text-indigo-500">marsa@email.com</a></p>
              <p>Phone: +62 813-1234-5678</p>
              <p>Location: Tanjungsari, Sumedang</p>
            </div>
        </div>
    
      
      
      </section>
    </main>
  );
}
