"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

import { useEffect, useState } from "react";

import {
  FaArrowRight,
  FaMosque,
  FaQuran,
  FaCampground,
  FaBookOpen,
  FaHeart,
  FaShieldAlt,
  FaHome,
  FaChalkboardTeacher,
  FaUsers,
  FaMoon,
  FaStar,
  FaCheckCircle,
  FaPlay,
  FaChevronDown,
  FaQuoteLeft,
} from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const DEFAULT_HOME_DATA = {
  hero: {
    arabic: "وَقُلْ رَبِّ زِدْنِي عِلْمًا",
    badge: "Website Resmi Pesantren",
    title: "Mondok bukan",
    highlight: "sekadar sekolah.",
    desc: "Ini perjalanan hidup untuk membentuk ilmu, adab, ibadah, disiplin, dan kemandirian santri bersama Pondok Pesantren Al-Furqon.",
    image: "/hero-santri.jpg",
  },

  heroStats: [
    {
      value: "24 Jam",
      label: "Lingkungan pembinaan santri",
    },
    {
      value: "Adab",
      label: "Fokus pendidikan karakter",
    },
    {
      value: "Digital",
      label: "Layanan informasi pesantren",
    },
  ],

  values: [
    {
      title: "Ilmu",
      desc: "Santri dibimbing untuk mencintai ilmu agama dan pengetahuan umum sebagai bekal masa depan.",
      iconKey: "book",
    },
    {
      title: "Adab",
      desc: "Pembinaan akhlak, sopan santun, dan tanggung jawab menjadi bagian penting kehidupan santri.",
      iconKey: "heart",
    },
    {
      title: "Ibadah",
      desc: "Kegiatan harian diarahkan untuk membiasakan santri dekat dengan Al-Qur’an dan ibadah.",
      iconKey: "quran",
    },
    {
      title: "Mandiri",
      desc: "Lingkungan pesantren membantu santri belajar disiplin, rapi, kuat, dan mandiri.",
      iconKey: "shield",
    },
  ],

  storyChapters: [
    {
      number: "01",
      label: "Niat",
      title: "Perjalanan santri dimulai dari niat yang baik.",
      desc: "Mondok bukan hanya berpindah tempat belajar, tetapi memulai perjalanan baru untuk memperbaiki diri.",
      image: "/hero-santri.jpg",
    },
    {
      number: "02",
      label: "Ilmu",
      title: "Santri tumbuh dengan ilmu dan bimbingan.",
      desc: "Setiap kegiatan menjadi bagian dari pembelajaran, mulai dari kelas, ibadah, hingga kehidupan sehari-hari.",
      image: "/hero-santri.jpg",
    },
    {
      number: "03",
      label: "Adab",
      title: "Adab menjadi dasar sebelum ilmu.",
      desc: "Santri dibiasakan menghormati guru, orang tua, teman, dan menjaga akhlak dalam kehidupan pesantren.",
      image: "/hero-santri.jpg",
    },
    {
      number: "04",
      label: "Masa Depan",
      title: "Bekal hari ini menjadi arah masa depan.",
      desc: "Al-Furqon berusaha menjadi tempat tumbuhnya generasi berilmu, beradab, dan bermanfaat.",
      image: "/hero-santri.jpg",
    },
  ],

  programs: [
    {
      title: "Tahfidz & Al-Qur’an",
      tag: "Keislaman",
      desc: "Pembinaan membaca, menghafal, dan mencintai Al-Qur’an dalam kehidupan santri.",
      image: "/hero-santri.jpg",
      iconKey: "quran",
    },
    {
      title: "Pendidikan Formal",
      tag: "Akademik",
      desc: "Kegiatan belajar terarah untuk mendukung kemampuan akademik dan masa depan santri.",
      image: "/hero-santri.jpg",
      iconKey: "teacher",
    },
    {
      title: "Kemandirian Santri",
      tag: "Karakter",
      desc: "Pembiasaan disiplin, tanggung jawab, kebersihan, dan kepedulian dalam lingkungan pesantren.",
      image: "/hero-santri.jpg",
      iconKey: "users",
    },
  ],

  pembina: [
    {
      name: "Pembina Al-Furqon",
      role: "Pembina Santri",
      badge: "Pendamping",
      focus:
        "Mendampingi santri dalam ibadah, adab, kedisiplinan, kebersihan, dan kehidupan sehari-hari.",
      image: "/hero-santri.jpg",
      iconKey: "teacher",
    },
    {
      name: "Guru Pesantren",
      role: "Pengajar",
      badge: "Pendidikan",
      focus:
        "Membimbing santri dalam pembelajaran, pemahaman ilmu, dan pembentukan karakter.",
      image: "/hero-santri.jpg",
      iconKey: "book",
    },
  ],
};

const ADMIN_WHATSAPP_NUMBER = "6283899601027";

const ADMIN_WHATSAPP_MESSAGE =
  "Assalamu'alaikum Admin Pesantren Al-Furqon, saya ingin bertanya mengenai pesantren.";

const WHATSAPP_ADMIN_URL = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
  ADMIN_WHATSAPP_MESSAGE
)}`;

function normalizeHomeData(data) {
  if (!data || typeof data !== "object") {
    return DEFAULT_HOME_DATA;
  }

  return {
    hero: {
      ...DEFAULT_HOME_DATA.hero,
      ...(data.hero || {}),
    },
    heroStats:
      Array.isArray(data.heroStats) && data.heroStats.length
        ? data.heroStats
        : DEFAULT_HOME_DATA.heroStats,
    values:
      Array.isArray(data.values) && data.values.length
        ? data.values
        : DEFAULT_HOME_DATA.values,
    storyChapters:
      Array.isArray(data.storyChapters) && data.storyChapters.length
        ? data.storyChapters
        : DEFAULT_HOME_DATA.storyChapters,
    programs:
      Array.isArray(data.programs) && data.programs.length
        ? data.programs
        : DEFAULT_HOME_DATA.programs,
    pembina:
      Array.isArray(data.pembina) && data.pembina.length
        ? data.pembina
        : DEFAULT_HOME_DATA.pembina,
  };
}

function getIcon(key) {
  const icons = {
    mosque: <FaMosque />,
    quran: <FaQuran />,
    camp: <FaCampground />,
    book: <FaBookOpen />,
    heart: <FaHeart />,
    shield: <FaShieldAlt />,
    home: <FaHome />,
    teacher: <FaChalkboardTeacher />,
    users: <FaUsers />,
    moon: <FaMoon />,
    star: <FaStar />,
  };

  return icons[key] || <FaStar />;
}

function SafeImage({ src, alt, className = "", fallback = "/hero-santri.jpg" }) {
  const [currentSrc, setCurrentSrc] = useState(src || fallback);

  useEffect(() => {
    setCurrentSrc(src || fallback);
  }, [src, fallback]);

  return (
    <img
      src={currentSrc}
      alt={alt || "image"}
      className={className}
      onError={() => {
        if (currentSrc !== fallback) {
          setCurrentSrc(fallback);
        }
      }}
    />
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[9999] h-1 w-full origin-left bg-gradient-to-r from-yellow-400 via-emerald-300 to-yellow-400"
    />
  );
}

function CursorGlow() {
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 160);
      mouseY.set(e.clientY - 160);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
      }}
      className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-80 w-80 rounded-full bg-yellow-300/10 blur-3xl lg:block"
    />
  );
}

function IslamicBackground({ dark = false, intense = false }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`absolute inset-0 bg-[url('/pattern.png')] bg-repeat ${
          intense ? "opacity-[0.09]" : "opacity-[0.055]"
        }`}
      />

      <motion.div
        animate={{
          rotate: [0, 18, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute -left-32 top-20 h-72 w-72 rounded-full border ${
          dark
            ? "border-yellow-300/20 bg-yellow-300/5"
            : "border-emerald-900/10 bg-emerald-300/20"
        }`}
      />

      <motion.div
        animate={{
          rotate: [0, -18, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute -right-40 bottom-16 h-[30rem] w-[30rem] rounded-full border ${
          dark
            ? "border-emerald-300/20 bg-emerald-300/5"
            : "border-yellow-600/10 bg-yellow-300/25"
        }`}
      />

      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.45, 0.8, 0.45],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${
          dark ? "bg-emerald-400/10" : "bg-yellow-300/20"
        }`}
      />

      <motion.div
        animate={{
          y: [0, 22, 0],
          x: [0, 14, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[12%] top-[18%] h-3 w-3 rounded-full bg-yellow-300/80 shadow-[0_0_35px_rgba(250,204,21,0.8)]"
      />

      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, -12, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[10%] bottom-[24%] h-2 w-2 rounded-full bg-emerald-300/80 shadow-[0_0_35px_rgba(110,231,183,0.8)]"
      />
    </div>
  );
}

function Badge({ children, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55 }}
      className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] sm:text-xs ${
        light
          ? "border-yellow-300/30 bg-yellow-300/10 text-yellow-300"
          : "border-emerald-200 bg-white/85 text-emerald-800"
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      {children}
    </motion.div>
  );
}

function Section({
  children,
  dark = false,
  className = "",
  id = "",
  scene = 0,
  label = "",
}) {
  const { scrollY } = useScroll();

  const start = scene * 900;
  const bgY = useTransform(scrollY, [start - 700, start + 900], [-120, 120]);
  const orbY = useTransform(scrollY, [start - 700, start + 900], [120, -120]);
  const lineScale = useTransform(scrollY, [start - 500, start + 500], [0, 1]);

  return (
    <section
      id={id}
      className={`relative min-h-[100svh] w-full overflow-hidden ${
        dark ? "bg-[#041b15] text-white" : "bg-[#f7f1df] text-slate-900"
      } ${className}`}
    >
      <motion.div
        style={{ y: bgY }}
        className={`pointer-events-none absolute -left-32 top-20 h-[30rem] w-[30rem] rounded-full blur-3xl ${
          dark ? "bg-yellow-300/10" : "bg-emerald-300/20"
        }`}
      />

      <motion.div
        style={{ y: orbY }}
        className={`pointer-events-none absolute -right-32 bottom-20 h-[34rem] w-[34rem] rounded-full blur-3xl ${
          dark ? "bg-emerald-300/10" : "bg-yellow-300/25"
        }`}
      />

      {label && (
        <div className="pointer-events-none absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 xl:block">
          <div className="flex items-center gap-4">
            <div className="h-32 w-[2px] overflow-hidden rounded-full bg-white/10">
              <motion.div
                style={{ scaleY: lineScale }}
                className="h-full w-full origin-top rounded-full bg-yellow-400"
              />
            </div>

            <div
              className={`rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] backdrop-blur-xl ${
                dark
                  ? "border-white/10 bg-white/10 text-yellow-300"
                  : "border-emerald-200 bg-white/70 text-emerald-800"
              }`}
            >
              {label}
            </div>
          </div>
        </div>
      )}

      {children}
    </section>
  );
}

function Container({ children, className = "", style }) {
  return (
    <motion.div
      style={style}
      className={`relative z-10 mx-auto w-[92vw] max-w-[1500px] py-24 will-change-transform sm:py-28 lg:py-32 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function ResponsiveMotionContainer({ children, className = "", desktopStyle }) {
  return (
    <>
      <div
        className={`relative z-10 mx-auto w-[92vw] max-w-[1500px] py-20 sm:py-24 lg:hidden ${className}`}
      >
        {children}
      </div>

      <motion.div
        style={desktopStyle}
        className={`relative z-10 mx-auto hidden w-[92vw] max-w-[1500px] py-28 will-change-transform lg:block ${className}`}
      >
        {children}
      </motion.div>
    </>
  );
}

function ParallaxBlock({
  children,
  range = [0, 1000],
  y = [0, 0],
  x = [0, 0],
  scale = [1, 1],
  rotate = [0, 0],
  opacity = [1, 1],
  className = "",
}) {
  const { scrollY } = useScroll();

  const motionY = useTransform(scrollY, range, y);
  const motionX = useTransform(scrollY, range, x);
  const motionScale = useTransform(scrollY, range, scale);
  const motionRotate = useTransform(scrollY, range, rotate);
  const motionOpacity = useTransform(scrollY, range, opacity);

  return (
    <motion.div
      style={{
        y: motionY,
        x: motionX,
        scale: motionScale,
        rotate: motionRotate,
        opacity: motionOpacity,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Reveal({ children, delay = 0, className = "", type = "up" }) {
  const variants = {
    up: {
      hidden: { opacity: 0, y: 45, filter: "blur(10px)" },
      show: { opacity: 1, y: 0, filter: "blur(0px)" },
    },
    left: {
      hidden: { opacity: 0, x: -45, filter: "blur(10px)" },
      show: { opacity: 1, x: 0, filter: "blur(0px)" },
    },
    right: {
      hidden: { opacity: 0, x: 45, filter: "blur(10px)" },
      show: { opacity: 1, x: 0, filter: "blur(0px)" },
    },
    zoom: {
      hidden: { opacity: 0, scale: 0.92, filter: "blur(10px)" },
      show: { opacity: 1, scale: 1, filter: "blur(0px)" },
    },
  };

  return (
    <motion.div
      variants={variants[type] || variants.up}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ badge, title, desc, light = false, align = "center" }) {
  return (
    <Reveal
      className={`${
        align === "center" ? "mx-auto text-center" : "text-left"
      } max-w-5xl`}
    >
      {badge && (
        <div className="mb-4">
          <Badge light={light}>{badge}</Badge>
        </div>
      )}

      <h2
        className={`text-[clamp(2rem,5vw,5.4rem)] font-black leading-[0.95] tracking-[-0.06em] ${
          light ? "text-white" : "text-emerald-950"
        }`}
      >
        {title}
      </h2>

      {desc && (
        <p
          className={`mt-5 max-w-3xl text-sm leading-relaxed sm:text-base lg:text-lg ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-emerald-100" : "text-slate-600"}`}
        >
          {desc}
        </p>
      )}
    </Reveal>
  );
}

function TiltCard({ children, className = "" }) {
  const [rotate, setRotate] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -8;
    const rotateY = (x / rect.width - 0.5) * 8;

    setRotate({
      x: rotateX,
      y: rotateY,
    });
  };

  const reset = () => {
    setRotate({
      x: 0,
      y: 0,
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
      }}
      whileHover={{
        y: -8,
        scale: 1.015,
      }}
      transition={{
        type: "spring",
        stiffness: 230,
        damping: 22,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={`group ${className}`}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({ children, href, variant = "primary" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 180, damping: 14 });
  const springY = useSpring(y, { stiffness: 180, damping: 14 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const moveX = e.clientX - rect.left - rect.width / 2;
    const moveY = e.clientY - rect.top - rect.height / 2;

    x.set(moveX * 0.18);
    y.set(moveY * 0.18);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const className =
    variant === "primary"
      ? "bg-yellow-400 text-emerald-950 shadow-[0_0_50px_rgba(250,204,21,0.35)] hover:bg-yellow-300"
      : "border border-white/25 bg-white/10 text-white backdrop-blur-xl hover:bg-white/20";

  return (
    <Link href={href}>
      <motion.button
        type="button"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          x: springX,
          y: springY,
        }}
        whileTap={{ scale: 0.96 }}
        className={`group inline-flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 font-black transition hover:-translate-y-1 sm:w-auto ${className}`}
      >
        {children}
      </motion.button>
    </Link>
  );
}

function SectionNavigator() {
  const sections = [
    { id: "hero", label: "Awal" },
    { id: "values", label: "Nilai" },
    { id: "story", label: "Cerita" },
    { id: "program", label: "Program" },
    { id: "pembina", label: "Pembina" },
    { id: "cta", label: "Daftar" },
  ];

  return (
    <div className="fixed right-5 top-1/2 z-[70] hidden -translate-y-1/2 flex-col gap-3 xl:flex">
      {sections.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="group flex items-center justify-end gap-3"
        >
          <span className="rounded-full bg-emerald-950/80 px-3 py-1 text-[11px] font-black text-yellow-300 opacity-0 shadow-lg backdrop-blur-xl transition group-hover:opacity-100">
            {item.label}
          </span>

          <span className="h-3 w-3 rounded-full border border-black/60 bg-yellow-300/40 shadow-[0_0_20px_rgba(250,204,21,0.5)] transition group-hover:scale-150 group-hover:bg-yellow-300" />
        </a>
      ))}
    </div>
  );
}

function FloatingVerse() {
  return (
    <motion.div
      animate={{
        y: [0, -14, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute bottom-8 right-8 hidden rounded-[2rem] border border-white/10 bg-white/10 p-5 text-right text-white shadow-2xl backdrop-blur-xl lg:block"
    >
      <p className="text-xl leading-loose text-yellow-300">
        وَقُلْ رَبِّ زِدْنِي عِلْمًا
      </p>

      <p className="mt-1 text-xs font-bold text-emerald-100">
        “Ya Rabb, tambahkanlah ilmuku.”
      </p>
    </motion.div>
  );
}

function LoadingPage() {
  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#041b15] text-white">
      <IslamicBackground dark intense />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="mx-auto mb-6 h-20 w-20 rounded-full border-4 border-yellow-300/20 border-t-yellow-300"
        />

        <p className="text-sm font-black uppercase tracking-[0.35em] text-yellow-300">
          Pondok Pesantren Al-Furqon
        </p>

        <h1 className="mt-4 text-3xl font-black sm:text-5xl">
          Memuat halaman...
        </h1>
      </motion.div>
    </main>
  );
}

export default function Home() {
  const [homeData, setHomeData] = useState(DEFAULT_HOME_DATA);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  const [activeStory, setActiveStory] = useState(0);
  const [activePembina, setActivePembina] = useState(0);

  const { scrollY } = useScroll();

  const heroImageScale = useTransform(scrollY, [0, 900], [1, 1.28]);
  const heroTextY = useTransform(scrollY, [0, 900], [0, 180]);
  const heroOverlayOpacity = useTransform(scrollY, [0, 900], [0.38, 0.9]);

  const valuesScene = {
    y: useTransform(scrollY, [500, 1200, 1900], [160, 0, -120]),
    scale: useTransform(scrollY, [500, 1200, 1900], [0.94, 1, 1.04]),
    opacity: useTransform(scrollY, [500, 850, 1850], [0.35, 1, 0.8]),
  };

  const programScene = {
    y: useTransform(scrollY, [2500, 3500, 4500], [160, 0, -130]),
    scale: useTransform(scrollY, [2500, 3500, 4500], [0.94, 1, 1.03]),
  };

  const pembinaScene = {
    y: useTransform(scrollY, [3600, 4700, 5700], [180, 0, -150]),
    scale: useTransform(scrollY, [3600, 4700, 5700], [0.93, 1, 1.04]),
  };

  const ctaScene = {
    y: useTransform(scrollY, [5000, 6100], [160, 0]),
    scale: useTransform(scrollY, [5000, 6100], [0.92, 1]),
  };

  const fetchHomeData = async () => {
    try {
      setChecking(true);

      if (!API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL belum diatur");
      }

      const health = await fetch(`${API_URL}/api/health`, {
        cache: "no-store",
      });

      if (!health.ok) {
        throw new Error("Backend health check gagal");
      }

      const response = await fetch(`${API_URL}/api/home`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data home");
      }

      const result = await response.json();

      if (!result?.success || !result?.data) {
        throw new Error("Format data backend salah");
      }

      setHomeData(normalizeHomeData(result.data));
    } catch (error) {
      console.error("BACKEND ERROR:", error.message);
      setHomeData(DEFAULT_HOME_DATA);
    } finally {
      setLoading(false);
      setChecking(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  useEffect(() => {
    if (!homeData?.storyChapters?.length) return;

    const timer = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % homeData.storyChapters.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [homeData]);

  useEffect(() => {
    if (!homeData?.pembina?.length) return;

    const timer = setInterval(() => {
      setActivePembina((prev) => (prev + 1) % homeData.pembina.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [homeData]);

  if (loading && checking) {
    return <LoadingPage />;
  }

  const hero = homeData.hero || DEFAULT_HOME_DATA.hero;
  const currentStory =
    homeData.storyChapters?.[activeStory] || DEFAULT_HOME_DATA.storyChapters[0];
  const currentPembina =
    homeData.pembina?.[activePembina] || DEFAULT_HOME_DATA.pembina[0];

  return (
    <main className="overflow-x-hidden bg-[#f7f1df] text-slate-900">
      <ScrollProgress />
      <CursorGlow />
      <SectionNavigator />
      <Navbar />

      <Section id="hero" dark scene={0} label="Awal">
        <div className="absolute inset-0">
          <motion.div style={{ scale: heroImageScale }} className="h-full w-full">
            <SafeImage
              src={hero.image}
              alt="Pondok Pesantren Al-Furqon"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#041b15] via-[#062d22]/95 to-[#0d4f38]/45" />
        <motion.div
          style={{ opacity: heroOverlayOpacity }}
          className="absolute inset-0 bg-black"
        />

        <IslamicBackground dark intense />
        <FloatingVerse />

        <Container className="flex min-h-[100svh] items-center">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              style={{ y: heroTextY }}
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85 }}
              className="max-w-5xl"
            >
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
                className="mb-4 text-lg leading-loose text-yellow-300 sm:text-xl lg:text-2xl"
              >
                {hero.arabic}
              </motion.p>

              <Badge light>{hero.badge}</Badge>

              <motion.h1
                initial={{ opacity: 0, y: 35, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.25, duration: 0.9 }}
                className="mt-5 text-[clamp(2.6rem,7vw,7rem)] font-black leading-[0.92] tracking-[-0.065em]"
              >
                {hero.title}
                <span className="block bg-gradient-to-r from-yellow-300 via-yellow-400 to-emerald-200 bg-clip-text text-transparent">
                  {hero.highlight}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.7 }}
                className="mt-6 max-w-4xl text-sm leading-relaxed text-emerald-50 sm:text-base lg:text-xl"
              >
                {hero.desc}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <MagneticButton href="/pendaftaran">
                  Mulai Pendaftaran
                  <FaArrowRight className="transition group-hover:translate-x-1" />
                </MagneticButton>

                <MagneticButton href="/program" variant="secondary">
                  <FaPlay />
                  Lihat Program
                </MagneticButton>

                <a
                  href={WHATSAPP_ADMIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/25 bg-white/10 px-8 py-4 font-black text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/20 sm:w-auto"
                >
                  Hubungi Admin
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.7 }}
                className="mt-9 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3"
              >
                {homeData.heroStats.map((item, index) => (
                  <TiltCard key={item.label}>
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.08 }}
                      className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
                    >
                      <h3 className="text-3xl font-black text-yellow-300">
                        {item.value}
                      </h3>

                      <p className="mt-1 text-xs font-bold text-emerald-100 sm:text-sm">
                        {item.label}
                      </p>
                    </motion.div>
                  </TiltCard>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="hidden lg:block"
            >
              <TiltCard>
                <div className="relative ml-auto max-w-xl">
                  <motion.div
                    animate={{ rotate: [0, 2, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -left-6 -top-6 h-full w-full rounded-[2.5rem] border border-yellow-300/30"
                  />

                  <motion.div
                    animate={{ rotate: [0, -2, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -bottom-6 -right-6 h-full w-full rounded-[2.5rem] border border-emerald-300/25"
                  />

                  <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <SafeImage
                        src="/logo.png"
                        alt="Logo Al-Furqon"
                        className="mx-auto w-64 drop-shadow-[0_0_40px_rgba(255,255,255,0.35)]"
                      />
                    </motion.div>

                    <div className="mt-8 rounded-3xl bg-emerald-950/80 p-6">
                      <FaQuoteLeft className="mb-4 text-2xl text-yellow-300" />

                      <p className="text-base leading-relaxed text-emerald-50">
                        “Tempat belajar menemukan arah, bukan hanya mengejar
                        nilai.”
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>

          <motion.a
            href="#values"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur-xl transition hover:bg-white/20 lg:inline-flex"
          >
            Scroll
            <FaChevronDown className="text-yellow-300" />
          </motion.a>
        </Container>
      </Section>

      <Section
        id="values"
        scene={1}
        label="Nilai"
        className="bg-gradient-to-br from-[#f7f1df] via-white to-emerald-50"
      >
        <IslamicBackground />

        <Container
          style={valuesScene}
          className="flex min-h-[100svh] flex-col justify-center"
        >
          <SectionHeader
            badge="Nilai Pendidikan"
            title="Lingkungan pesantren membentuk kehidupan santri"
            desc="Pendidikan di Al-Furqon tidak hanya mengajarkan ilmu, tetapi membentuk ibadah, adab, disiplin, dan kemandirian."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {homeData.values.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <TiltCard>
                  <div className="group relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-white/85 p-6 shadow-xl backdrop-blur transition hover:bg-white">
                    <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-yellow-300/20 blur-3xl transition group-hover:scale-125" />

                    <div className="relative z-10">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-950 text-2xl text-yellow-300 transition group-hover:scale-110">
                        {getIcon(item.iconKey)}
                      </div>

                      <h3 className="mt-5 text-2xl font-black text-emerald-950">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="story" dark scene={2} label="Cerita">
        <IslamicBackground dark intense />

        <Container className="flex min-h-[100svh] items-center">
          <div className="grid w-full items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <ParallaxBlock
              range={[1500, 3200]}
              y={[160, -140]}
              scale={[0.92, 1.05]}
              rotate={[-3, 2]}
              className="hidden lg:block"
            >
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-3 shadow-2xl backdrop-blur-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStory}
                    initial={{ opacity: 0, scale: 1.05, rotate: 2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.96, rotate: -2 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-[1.6rem]"
                  >
                    <SafeImage
                      src={currentStory.image}
                      alt={currentStory.label}
                      className="h-[62svh] w-full object-cover"
                    />

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"
                    />

                    <div className="absolute bottom-0 left-0 p-6">
                      <p className="text-sm font-black tracking-[0.35em] text-yellow-300">
                        BAB {currentStory.number}
                      </p>

                      <h3 className="mt-2 text-5xl font-black text-white">
                        {currentStory.label}
                      </h3>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </ParallaxBlock>

            <Reveal type="right">
              <Badge light>Bab Cerita</Badge>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStory}
                  initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -35, filter: "blur(10px)" }}
                  transition={{ duration: 0.45 }}
                >
                  <p className="mt-6 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
                    BAB {currentStory.number} / 04
                  </p>

                  <h2 className="mt-4 text-[clamp(2.1rem,6vw,5rem)] font-black leading-[0.95] tracking-[-0.06em] text-white">
                    {currentStory.title}
                  </h2>

                  <p className="mt-6 max-w-2xl text-sm leading-relaxed text-emerald-100 sm:text-base lg:text-lg">
                    {currentStory.desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-7 grid grid-cols-4 gap-2">
                {homeData.storyChapters.map((item, index) => (
                  <motion.button
                    type="button"
                    key={item.number}
                    onClick={() => setActiveStory(index)}
                    whileTap={{ scale: 0.96 }}
                    className={`relative overflow-hidden rounded-2xl border p-3 text-left transition ${
                      activeStory === index
                        ? "border-yellow-300 bg-yellow-300 text-emerald-950"
                        : "border-white/10 bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {activeStory === index && (
                      <motion.div
                        layoutId="story-active"
                        className="absolute inset-0 bg-yellow-300"
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 28,
                        }}
                      />
                    )}

                    <span className="relative z-10 block">
                      <p className="text-xs font-black">{item.number}</p>
                      <p className="mt-2 hidden text-sm font-black sm:block">
                        {item.label}
                      </p>
                    </span>
                  </motion.button>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section id="program" scene={3} label="Program" className="bg-[#f7f1df]">
        <IslamicBackground />

        <Container
          style={programScene}
          className="flex min-h-[100svh] flex-col justify-center"
        >
          <SectionHeader
            badge="Program Pembinaan"
            title="Program santri yang aktif dan bermakna"
            desc="Kegiatan pesantren menjadi bagian penting dari pembentukan karakter, keberanian, dan kemandirian santri."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {homeData.programs.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <TiltCard>
                  <div className="group overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-2xl">
                    <div className="relative h-[280px] overflow-hidden">
                      <SafeImage
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-transparent" />

                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.4,
                        }}
                        className="absolute bottom-5 left-5 right-5"
                      >
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-2xl text-emerald-950">
                          {getIcon(item.iconKey)}
                        </div>

                        <p className="text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
                          {item.tag}
                        </p>

                        <h3 className="mt-2 text-3xl font-black text-white">
                          {item.title}
                        </h3>
                      </motion.div>
                    </div>

                    <div className="p-6">
                      <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="pembina" dark scene={4} label="Pembina">
        <IslamicBackground dark intense />

        <ResponsiveMotionContainer
          desktopStyle={pembinaScene}
          className="flex min-h-[100svh] items-center"
        >
          <div className="w-full max-w-full overflow-hidden">
            <Reveal>
              <div className="mx-auto max-w-5xl text-center">
                <Badge light>Pembina Pesantren</Badge>

                <h2 className="mt-5 text-[clamp(2rem,7vw,4.5rem)] font-black leading-[0.95] tracking-[-0.06em] text-white">
                  Santri tumbuh bersama
                  <span className="block text-yellow-300">
                    pembina yang mendampingi.
                  </span>
                </h2>

                <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-emerald-100 sm:text-base lg:text-lg">
                  Pembina pesantren mendampingi adab, disiplin, ibadah,
                  kebersihan, dan kehidupan santri sehari-hari agar tumbuh lebih
                  mandiri.
                </p>
              </div>
            </Reveal>

            <div className="mt-8 grid w-full max-w-full grid-cols-1 gap-5 overflow-hidden lg:mt-10 xl:grid-cols-[0.85fr_1.15fr] xl:items-stretch">
              <Reveal type="left">
                <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/10 p-3 shadow-2xl backdrop-blur-xl sm:rounded-[2rem]">
                  <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-yellow-300/10 blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-emerald-300/10 blur-3xl" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePembina}
                      initial={{ opacity: 0, scale: 0.96, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -20 }}
                      transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative overflow-hidden rounded-[1.4rem]"
                    >
                      <div className="relative h-[360px] overflow-hidden sm:h-[460px] xl:h-[620px]">
                        <SafeImage
                          src={currentPembina.image}
                          alt={currentPembina.name}
                          className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent" />

                        <div className="absolute left-4 top-4 rounded-full bg-yellow-400 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-950">
                          {currentPembina.badge}
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                          <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
                            {currentPembina.role}
                          </p>

                          <h3 className="mt-2 line-clamp-2 text-2xl font-black leading-tight text-white sm:text-4xl">
                            {currentPembina.name}
                          </h3>

                          <p className="mt-3 line-clamp-3 max-w-xl text-sm leading-relaxed text-emerald-100">
                            {currentPembina.focus}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Reveal>

              <Reveal type="right">
                <div className="flex h-full min-w-0 max-w-full flex-col overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl sm:rounded-[2rem] sm:p-5 lg:p-6">
                  <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/15 via-white/10 to-yellow-300/10 p-5 sm:p-6 lg:p-7">
                    <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-yellow-300/10 blur-3xl" />

                    <div className="relative z-10">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-2xl text-emerald-950 shadow-lg">
                        {getIcon(currentPembina.iconKey)}
                      </div>

                      <p className="mt-5 text-xs font-black uppercase tracking-[0.24em] text-yellow-300 sm:tracking-[0.28em]">
                        Fokus Pembinaan
                      </p>

                      <h3 className="mt-3 max-w-full break-words text-[clamp(1.35rem,5.5vw,3.2rem)] font-black leading-[1.05] tracking-[-0.04em] text-white">
                        Membina santri dengan ilmu, adab, dan keteladanan.
                      </h3>

                      <p className="mt-5 line-clamp-4 text-sm leading-relaxed text-emerald-100 sm:text-base">
                        {currentPembina.focus}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 hidden gap-3 md:grid">
                    {homeData.pembina.map((item, index) => (
                      <motion.button
                        type="button"
                        key={item.name}
                        onClick={() => setActivePembina(index)}
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ x: 6 }}
                        className={`group flex min-w-0 items-center gap-4 rounded-2xl border p-4 text-left transition ${
                          activePembina === index
                            ? "border-yellow-300 bg-yellow-400 text-emerald-950 shadow-lg shadow-yellow-950/20"
                            : "border-white/10 bg-white/10 text-white hover:border-yellow-300/40 hover:bg-white/15"
                        }`}
                      >
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg transition ${
                            activePembina === index
                              ? "bg-emerald-950 text-yellow-300"
                              : "bg-white/10 text-yellow-300 group-hover:bg-yellow-300 group-hover:text-emerald-950"
                          }`}
                        >
                          {getIcon(item.iconKey)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate font-black">{item.name}</p>

                          <p
                            className={`mt-1 truncate text-xs font-semibold ${
                              activePembina === index
                                ? "text-emerald-900"
                                : "text-emerald-100/75"
                            }`}
                          >
                            {item.role}
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="no-scrollbar mt-5 flex w-full max-w-full gap-3 overflow-x-auto overscroll-x-contain pb-2 md:hidden">
                    {homeData.pembina.map((item, index) => (
                      <motion.button
                        type="button"
                        key={item.name}
                        onClick={() => setActivePembina(index)}
                        whileTap={{ scale: 0.95 }}
                        className={`w-[190px] min-w-[190px] rounded-2xl border p-3 text-left transition sm:w-[220px] sm:min-w-[220px] sm:p-4 ${
                          activePembina === index
                            ? "border-yellow-300 bg-yellow-400 text-emerald-950"
                            : "border-white/10 bg-white/10 text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                              activePembina === index
                                ? "bg-emerald-950 text-yellow-300"
                                : "bg-white/10 text-yellow-300"
                            }`}
                          >
                            {getIcon(item.iconKey)}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-black">
                              {item.name}
                            </p>

                            <p
                              className={`mt-1 truncate text-xs ${
                                activePembina === index
                                  ? "text-emerald-900"
                                  : "text-emerald-100/75"
                              }`}
                            >
                              {item.role}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </ResponsiveMotionContainer>
      </Section>

      <Section id="cta" scene={5} label="Daftar" className="bg-[#f7f1df]">
        <IslamicBackground />

        <Container
          style={ctaScene}
          className="flex min-h-[100svh] items-center justify-center text-center"
        >
          <Reveal type="zoom">
            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-emerald-950 p-8 text-white shadow-2xl md:p-14">
              <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.07]" />
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-300/15 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-300/15 blur-3xl" />

              <div className="relative z-10">
                <motion.div
                  animate={{
                    rotate: [0, 8, -8, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-yellow-400 text-2xl text-emerald-950"
                >
                  <FaCheckCircle />
                </motion.div>

                <p className="font-bold text-yellow-300">
                  Perjalanan dimulai dari keputusan kecil.
                </p>

                <h2 className="mt-4 text-[clamp(2.2rem,5vw,5.6rem)] font-black leading-[0.95] tracking-[-0.06em]">
                  Mulai perjalanan santri bersama Al-Furqon.
                </h2>

                <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-emerald-100 sm:text-base lg:text-lg">
                  Daftarkan calon santri dan jadikan Al-Furqon sebagai tempat
                  tumbuh ilmu, adab, ibadah, dan masa depan.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <MagneticButton href="/pendaftaran">
                    Daftar Sekarang
                    <FaArrowRight />
                  </MagneticButton>

                  <MagneticButton href="/program" variant="secondary">
                    Lihat Program
                  </MagneticButton>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Footer />

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        html,
        body {
          max-width: 100%;
          overflow-x: hidden;
        }

        ::selection {
          background: #facc15;
          color: #064e3b;
        }

        body {
          cursor: default;
          background: #041b15;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media (prefers-reduced-motion: no-preference) {
          section {
            scroll-margin-top: 0px;
          }

          .storytelling-depth {
            transform-style: preserve-3d;
            perspective: 1200px;
          }

          .soft-cinematic-shadow {
            box-shadow: 0 30px 80px rgba(4, 27, 20, 0.22),
              0 0 80px rgba(250, 204, 21, 0.08);
          }
        }

        @media (max-width: 1023px) {
          #pembina {
            overflow-x: hidden;
          }

          #pembina * {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          html {
            scroll-behavior: auto;
          }
        }
      `}</style>
    </main>
  );
}