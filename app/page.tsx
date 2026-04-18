"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// --- KOMPONEN BACKGROUND PARTIKEL ---
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Menyesuaikan ukuran kanvas dengan ukuran layar
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Pengaturan Partikel
    const particlesArray: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }[] = [];
    const particleCount = 70; // Jumlah titik
    const connectionDistance = 150; // Jarak maksimal agar garis terbentuk

    // Membuat partikel acak
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5, // Kecepatan gerak X (0.5 = lambat, stabil)
        vy: (Math.random() - 0.5) * 0.5, // Kecepatan gerak Y
        radius: Math.random() * 1.5 + 0.5, // Ukuran titik
      });
    }

    let animationFrameId: number;

    // Fungsi Animasi
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        let p = particlesArray[i];

        // Memindahkan partikel
        p.x += p.vx;
        p.y += p.vy;

        // Memantulkan partikel jika menyentuh ujung layar
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Menggambar titik (dot)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.6)"; // Warna titik (Cyan)
        ctx.fill();

        // Menggambar garis penghubung antar titik
        for (let j = i + 1; j < particlesArray.length; j++) {
          let p2 = particlesArray[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Garis memudar jika jarak makin jauh
            let opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.25})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-slate-950">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
      />
      {/* Efek gelap (vignette) memutar agar konten utama tetap mudah dibaca */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#020617_90%)] pointer-events-none"></div>
    </div>
  );
};

// === DATA PORTOFOLIO ===
const biodata = {
  instagram: "https://instagram.com/dfinazrmd/",
  github: "https://github.com/dfinaz08",
  linkedin: "https://linkedin.com/in/dafinaazahradev",
};

const contactCards = [
  {
    id: "email",
    label: "Email me at",
    value: "azahradafina08@gmail.com",
    href: "mailto:azahradafina08@gmail.com",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "location",
    label: "Based in",
    value: "Subang, Indonesia",
    href: "https://maps.google.com/?q=Subang,Indonesia",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

const experiences = [
  {
    id: 1,
    year: "Aug 2025 - Nov 2025",
    role: "System Analyst & Frontend Developer",
    organization: "Dua Putra Diesel – Cirebon",
    description:
      "Menganalisis kebutuhan sistem manajemen bengkel dan penjualan sparepart berbasis web dan mobile. Merancang arsitektur sistem menggunakan UML serta mengembangkan antarmuka aplikasi sesuai kebutuhan pengguna.",
  },
  {
    id: 2,
    year: "Feb 2025 - Jul 2025",
    role: "System Analyst & Frontend Developer",
    organization: "Bumi Purwadadi Indah – Subang",
    description:
      "Menganalisis kebutuhan sistem administrasi dan penjualan perumahan. Merancang arsitektur sistem menggunakan UML serta mengembangkan antarmuka aplikasi mobile untuk mendukung digitalisasi proses bisnis.",
  },
  {
    id: 3,
    year: "Aug 2024 - Nov 2024",
    role: "System Analyst",
    organization: "UMKM Batik Ganasan – Subang",
    description:
      "Berperan dalam pengembangan sistem e-commerce dengan fokus pada perancangan UML, analisis kebutuhan sistem, serta validasi proses bisnis untuk meningkatkan efisiensi transaksi.",
  },
];

const workflows = [
  {
    step: "01",
    title: "Analisis Kebutuhan",
    description:
      "Mengidentifikasi kebutuhan sistem berdasarkan proses bisnis dan kebutuhan pengguna.",
  },
  {
    step: "02",
    title: "Perancangan Sistem",
    description:
      "Menyusun desain sistem menggunakan UML seperti Use Case, Activity, dan Class Diagram.",
  },
  {
    step: "03",
    title: "Implementasi & Validasi",
    description:
      "Berkoordinasi dengan tim developer untuk memastikan sistem sesuai dengan kebutuhan dan berjalan optimal.",
  },
];

const techSkills: Record<
  TabType,
  { name: string; src: string }[]
> = {
  Semua: [
    { name: "Laravel", src: "/logos/Laravel.png" },
    { name: "Python", src: "/logos/Python.png" },
    { name: "React Native", src: "/logos/ReactNative.png" },
    { name: "Flutter", src: "/logos/Flutter.png" },
    { name: "MySQL", src: "/logos/MySQL.png" },
    { name: "Figma", src: "/logos/Figma.png" },
    { name: "Draw.io", src: "/logos/draw.io.png" },
    { name: "VS Code", src: "/logos/vscode.png" },
  ],

  "System Analyst": [
    { name: "Draw.io", src: "/logos/draw.io.png" },
    { name: "Figma", src: "/logos/Figma.png" },
  ],

  "Frontend & Mobile": [
    { name: "React Native", src: "/logos/ReactNative.png" },
    { name: "Flutter", src: "/logos/Flutter.png" },
  ],

  "Backend & Database": [
    { name: "Laravel", src: "/logos/Laravel.png" },
    { name: "MySQL", src: "/logos/MySQL.png" },
    { name: "Python", src: "/logos/Python.png" },
  ],

  "Tools": [
    { name: "VS Code", src: "/logos/vscode.png" },
    { name: "Figma", src: "/logos/Figma.png" },
    { name: "Draw.io", src: "/logos/draw.io.png" },
  ],
};

const projects = [
  {
    id: 1,
    title: "Sistem Bengkel & Sparepart",
    description:
      "Sistem manajemen bengkel berbasis web dan mobile untuk mengelola transaksi dan data sparepart.",
    techStack: ["Laravel", "MySQL", "Flutter"],
    image: "/projects/bengkel.png",
    link: "https://github.com/dfinaz08/sistem-booking-perbaikan-mobil-dua-putra-diesel-master.git",
  },
  {
    id: 2,
    title: "Sistem Penjualan Perumahan",
    description:
      "Aplikasi untuk digitalisasi proses administrasi dan penjualan perumahan.",
    techStack: ["Laravel", "MySQL", "React Native"],
    image: "/projects/perumahan.png",
    link: "https://github.com/dfinaz08/sistem-perumahan.git",
  },
  {
    id: 3,
    title: "E-Commerce Batik Ganasan",
    description:
      "Perancangan sistem e-commerce dengan fokus pada analisis kebutuhan dan desain UML.",
    techStack: ["Laravel", "MySQL"],
    image: "/projects/batik.png",
    link: "https://github.com/dfinaz08/BatikGanasan.git",
  },
];

const certificates = [
  {
    id: 1,
    title: "Junior Web Programmer",
    issuer: "LSP TIK",
    date: "Oktober 2025",
    image: "/certificates/sertifikasi.jpg",
    credentialUrl: "/dokumen/sertifikasiBNSP.pdf",
  },
];

type TabType =
  | "Semua"
  | "System Analyst"
  | "Frontend & Mobile"
  | "Backend & Database"
  | "Tools";

  const categories: TabType[] = [
  "Semua",
  "System Analyst",
  "Frontend & Mobile",
  "Backend & Database",
  "Tools",
];

export default function Home() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [activeTab, setActiveTab] = useState<TabType>("Semua");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <main className="relative min-h-screen text-slate-200 font-sans pb-0 selection:bg-cyan-500 selection:text-white overflow-hidden">
      {/* --- MEMANGGIL ANIMASI LATAR BELAKANG --- */}
      <ParticleBackground />

      {/* 1. Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[90vh] px-6 text-center relative gap-8 md:flex-row md:text-left md:max-w-5xl md:mx-auto pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-48 h-48 md:w-67 md:h-67 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-1 flex-shrink-0"
        >
          <div className="w-full h-full rounded-full bg-slate-900 border-4 border-slate-950 flex items-center justify-center overflow-hidden relative shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <Image
              src="/pp.jpeg"
              alt="Dafina Azahra Ramadhani"
              width={254}
              height={254}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </motion.div>

        <div className="flex flex-col items-center md:items-start">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight"
          >
            Halo, Saya{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Dafina Azahra Ramadhani
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed text-justify drop-shadow-md"
          >
            System Analyst yang berfokus pada analisis kebutuhan sistem dan 
            perancangan solusi berbasis kebutuhan bisnis. Terampil menggunakan 
            UML untuk menyusun spesifikasi teknis yang terstruktur serta 
            mendukung pengembangan sistem yang efisien.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-8"
          >
            <a
              href="#contact"
              className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] backdrop-blur-sm"
            >
              Hubungi Saya
            </a>

            <a
              href={biodata.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg transition-all duration-300 hover:border-[#F75599] hover:text-[#F75599] hover:shadow-[0_0_15px_rgba(247,85,153,0.5)]"
            >
              <span className="sr-only">Instagram</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a
              href={biodata.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-slate-900/80 backdrop-blur-sm border border-slate-800 text-slate-400 rounded-lg transition-all duration-300 hover:border-white hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            >
              <span className="sr-only">GitHub</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a
              href={biodata.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg transition-all duration-300 hover:border-blue-500 hover:text-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            >
              <span className="sr-only">LinkedIn</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. Tentang Saya & Garis Waktu Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-slate-900/50 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-white drop-shadow-md">
              Tentang  <span className="text-cyan-400">Saya</span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6 text-justify drop-shadow-md">
            Saya merupakan mahasiswa Program Studi Teknologi Rekayasa Perangkat Lunak 
            yang berfokus pada bidang <em>System Analyst</em>. Memiliki ketertarikan 
            dalam menganalisis kebutuhan sistem serta merancang solusi teknologi 
            berbasis kebutuhan bisnis. Saat ini berdomisili di Subang, Jawa Barat.
          </p>
            <p className="text-slate-300 text-lg leading-relaxed drop-shadow-md text-justify">
            Saya terbiasa menggunakan pemodelan seperti <em>UML</em> untuk menyusun
            spesifikasi sistem secara terstruktur serta mendukung proses pengembangan
            perangkat lunak agar lebih efisien dan tepat sasaran. Bagi saya, perangkat
            lunak bukan hanya sekadar barisan kode, melainkan solusi nyata yang mampu
            memberikan manfaat dan meningkatkan kualitas proses bisnis.
          </p>
          </motion.div>

          <div className="relative border-l border-slate-700/50 ml-4 md:ml-0 space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative pl-8"
              >
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-1">
                  <h3 className="text-lg font-bold text-white drop-shadow-md">
                    {exp.role}
                  </h3>
                  <span className="text-xs font-semibold text-cyan-400 tracking-wider mt-1 md:mt-0 drop-shadow-md">
                    {exp.year}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-indigo-300 mb-3 drop-shadow-md">
                  {exp.organization}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border border-slate-700/50 shadow-lg">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Alur Kerja Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-slate-900/50 relative z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center text-white drop-shadow-md"
        >
          Alur  <span className="text-cyan-400">Kerja</span> Pengembangan
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {workflows.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-slate-900/60 backdrop-blur-md p-6 rounded-xl border border-slate-600/50 relative z-10 hover:border-cyan-500/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all group cursor-pointer shadow-lg"
            >
              <div className="text-5xl font-black text-slate-800/80 absolute top-4 right-4 -z-10 select-none">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-3 drop-shadow-md">
                {item.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Keahlian Utama Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-slate-900/50 relative z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4 text-center text-white drop-shadow-md"
        >
          Alat &  <span className="text-cyan-400">Teknologi</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-300 text-center mb-8 max-w-2xl mx-auto drop-shadow-md"
        >
          Beberapa teknologi utama yang sering saya gunakan untuk mengembangkan
          sistem cerdas dan antarmuka dinamis.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {(Object.keys(techSkills) as TabType[]).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
                activeTab === category
                  ? "bg-cyan-600/30 text-cyan-300 border border-cyan-500/80 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                  : "bg-slate-900/60 border border-slate-700/50 text-slate-400 hover:border-cyan-500/50 hover:text-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {techSkills[activeTab].map((skill, index) => (
            <motion.div
              key={skill.name + activeTab}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex flex-col items-center justify-center p-6 md:p-8 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl transition-all duration-300 group cursor-default hover:border-cyan-500/80 hover:bg-slate-800/80 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] shadow-lg"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 mb-4 flex items-center justify-center relative transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110">
                <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Image
                  src={skill.src}
                  alt={`Logo ${skill.name}`}
                  width={64}
                  height={64}
                  className="object-contain relative z-10 drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300"
                />
              </div>
              <span className="text-sm md:text-base font-semibold text-slate-300 group-hover:text-white group-hover:text-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-300">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Proyek Terkini Section */}
<section className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-900/50 relative z-10">
  <motion.h2
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="text-3xl font-bold mb-12 text-center text-white drop-shadow-md"
  >
    Proyek <span className="text-cyan-400">Terkini</span>
  </motion.h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {projects.map((project, index) => (
      <motion.a
        href={project.link} // Menghubungkan ke link github di data atas
        target="_blank"     // Membuka di tab baru
        rel="noreferrer"    // Keamanan tambahan
        key={project.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative block bg-slate-900/40 rounded-3xl overflow-hidden border border-slate-800/50 hover:border-cyan-500/50 transition-all duration-500 shadow-2xl cursor-pointer"
      >
        {/* Container Gambar */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-800/50">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          />
        </div>

        {/* Info Konten */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            {/* Ikon panah kecil untuk penanda link */}
            <svg className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.a>
    ))}
  </div>
</section>
      {/* 6. Sertifikasi & Penghargaan Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-slate-900/50 relative z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4 text-center text-white drop-shadow-md"
        >
          Sertifikasi &  <span className="text-cyan-400">Penghargaan</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-300 text-center mb-12 max-w-2xl mx-auto drop-shadow-md"
        >
          Validasi profesional dan pencapaian berkelanjutan dalam pengembangan
          perangkat lunak dan sistem cerdas.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/60 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all duration-300 flex flex-col shadow-lg"
            >
              <div className="relative w-full aspect-[4/3] bg-slate-950 overflow-hidden border-b border-slate-800">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold tracking-wider text-cyan-400 uppercase drop-shadow-sm">
                    {cert.issuer}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {cert.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-4 line-clamp-2 drop-shadow-md">
                  {cert.title}
                </h3>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-cyan-600 hover:text-slate-950 text-sm font-semibold text-cyan-400 rounded-lg transition-all duration-300 border border-slate-700 hover:border-cyan-500 w-max"
                >
                  Lihat Kredensial
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. Form Kontak Section */}
      <section
        id="contact"
        className="max-w-6xl mx-auto px-6 py-24 border-t border-slate-900/50 relative z-10"
      >
        <div className="text-center md:text-left mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md"
          >
            Ayo kita <span className="text-cyan-400">Bekerja Sama</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg max-w-2xl drop-shadow-md"
          >
            Punya ide proyek? Saya ingin mendengarnya. Mari kita bahas bagaimana
            kita bisa mewujudkan ide-ide Anda.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 flex flex-col gap-6">
  {contactCards.map((contact, index) => (
    <motion.a
      key={contact.id}
      href={contact.href}
      target={contact.href.startsWith("mailto:") ? "_self" : "_blank"}
      rel={contact.href.startsWith("mailto:") ? "" : "noreferrer"}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      // Perubahan: Menggunakan w-full dan h-fit agar kotak mengikuti isi
      className="flex items-center gap-5 p-5 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl group cursor-pointer shadow-lg min-h-[90px] w-full"
    >
      <div className="flex items-center justify-center w-14 h-14 shrink-0 rounded-2xl bg-[#0a0f1c]/80 border border-slate-600/50 text-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] group-hover:border-cyan-500/60 group-hover:text-cyan-400 transition-all duration-300">
        {contact.icon}
      </div>
      
      <div className="flex flex-col min-w-0 pr-2"> 
        <span className="text-slate-400 text-xs font-medium mb-0.5 whitespace-nowrap">
          {contact.label}
        </span>
        {/* SAYA UBAH DI SINI: whitespace-nowrap agar teks tidak turun ke bawah */}
        <span className="text-slate-100 font-bold text-sm md:text-base group-hover:text-white transition-colors whitespace-nowrap">
          {contact.value}
        </span>
      </div>
    </motion.a>
  ))}
</div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl"
          >
            {formStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="w-20 h-20 mb-6 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                  <svg
                    className="w-10 h-10 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                  Pesan Berhasil Terkirim!
                </h3>
                <p className="text-slate-300 mb-8 max-w-md">
                  Terima kasih telah menghubungi saya. Saya akan meninjau pesan
                  Anda dan segera membalasnya.
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors border border-slate-600"
                >
                  Kirim Pesan Lain
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                action="https://formspree.io/f/mnjlvarj"
                method="POST"
                className="flex flex-col gap-6"
                suppressHydrationWarning
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-slate-200 text-sm font-medium drop-shadow-sm"
                    >
                      Nama <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                      className="w-full bg-[#0a0f1c]/80 border border-slate-700 rounded-xl px-5 py-3.5 text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-500 disabled:opacity-50"
                      disabled={formStatus === "submitting"}
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-slate-200 text-sm font-medium drop-shadow-sm"
                    >
                      Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                      className="w-full bg-[#0a0f1c]/80 border border-slate-700 rounded-xl px-5 py-3.5 text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-500 disabled:opacity-50"
                      disabled={formStatus === "submitting"}
                      suppressHydrationWarning
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="subject"
                    className="text-slate-200 text-sm font-medium drop-shadow-sm"
                  >
                    Topik
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Project inquiry"
                    className="w-full bg-[#0a0f1c]/80 border border-slate-700 rounded-xl px-5 py-3.5 text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-500 disabled:opacity-50"
                    disabled={formStatus === "submitting"}
                    suppressHydrationWarning
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-slate-200 text-sm font-medium drop-shadow-sm"
                  >
                    Pesan <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    required
                    className="w-full bg-[#0a0f1c]/80 border border-slate-700 rounded-xl px-5 py-4 text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-500 resize-none disabled:opacity-50"
                    disabled={formStatus === "submitting"}
                    suppressHydrationWarning
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="mt-2 w-full md:w-auto self-start px-8 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.7)] disabled:bg-cyan-800 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  suppressHydrationWarning
                >
                  {formStatus === "submitting" ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-slate-950"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Mengirim...
                    </>
                  ) : (
                    "Kirim Pesan"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* 8. Footer Section */}
      <footer className="border-t border-slate-900 bg-slate-950/80 backdrop-blur-md pt-10 pb-8 mt-10 relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-500 text-sm flex items-center gap-1">
            <span>© {new Date().getFullYear()}</span>
            <span className="font-semibold text-slate-300">
              Dafina Azahra Ramadhani
            </span>
            <span>. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Beranda
            </a>
            <a
              href="#contact"
              className="hover:text-cyan-400 transition-colors"
            >
              Kontak
            </a>
            <a
              href={biodata.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}