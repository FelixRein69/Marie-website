import { motion } from "framer-motion";
import "./App.css";
import SpotifyEmbed from "./components/Spotify";

type TimelineItem = {
  year: string;
  title: string;
  text: string;
  image1?: string;
  image2?: string;
};

const timeline: TimelineItem[] = [
  {
    year: "20. Juni 2025",
    title: "Saufabend",
    text: "Da hast du extrem besoffen mein Herz erobert.",
  },
  {
    year: "5. Juli 2025",
    title: "Altstadtfest",
    text: "Wow dieses Kleid war echt toll ... aber du warst noch toller",
  },

  {
    year: "28. Juli 2025",
    title: "Ich hab dir geschrieben ????",
    text: "An dem Tag hab ich mir so krass in die Hosen geschissen und dir geschrieben. Hat sich gelohnt.",
    image1: "m1.png",
  },
  {
    year: "1. August. 2025",
    title: "Erstes date",
    text: "Wirklich das beste erste Date was man sich vorstellen kann. 😍",
  },
  {
    year: "10. August. 2025",
    title: "Seit dem sind wir zusammen",
    text: "Das war Finkenrech. \"Sind wir jetzt eigentlich zusammen?\"",
  },
  {
    year: "15. August. 2025",
    title: "Erstes mal bei dir und dann der Kurzurlaub",
    text: "Wahrscheinlich das schönste Wochenende meines Lebens🥰. Eigentlich eh die schönste Zeit meines Lebens",
  },
  {
    year: "28. August. 2025",
    title: "Wir schauen Shrek",
    text: "und ich mach dir nen Antrag... und du sagst Ja",
  },
  {
    year: "09. September. 2025",
    title: "Wir sind echt verlobt",
    text: "und das habe ich und werde ich niemals bereuen",
  },
  {
    year: "1. Oktober. 2025",
    title: "Wir ziehen zusammen",
    text: "Ich wohne so gern mit dir zusammen.",
  },

];

const reasons: string[] = [
  "🩷 Dein Lachen 🩷",
  "🩷 Deine Witze 🩷",
  "🩷 Deine Augen 🩷",
  "🩷 Dein Arsch 🩷",
  "🩷 Wie du mich liebst 🩷",
  "🩷 Einfach alles an dir 🩷",
];

function App() {
  return (
    <main className="app">
      {/* HERO */}
      <section className="hero">
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero-content"
        >
          <p className="hero-subtitle">FOR MY WIFE</p>

          <h1>
            Marie x Felix
          </h1>

          <a href="#story" className="hero-button">
            Our Story
          </a>
        </motion.div>
      </section>

      {/* STORY */}
      <section id="story" className="section">
        <h2 className="our-story-text" >Wie alles begann</h2>

        <div className="timeline">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              className="card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="year">{item.year}</p>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

              {item.image1 && <img src={item.image1} className="tilted" />}
              {item.image2 && <img src={item.image2} className="tilted2 tilted-soft" />}
            </motion.div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="section">
        <h2 className="h2-warum" >🩷 Wir sind schon süß 🩷</h2>

        <div className="gallery">
          {[1, 2, 3].map((item) => (
            <div key={item} className="photo-placeholder">
              <img
                key={item}
                className="photo-placeholder"
                src={`/${item}.jpeg`}
                alt="Memory"
              />
            </div>
          ))}
        </div>
      </section>

      {/* REASONS */}
      <section className="section">
        <h2 className="h2-warum">Warum ich dich so sehr liebe</h2>

        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="reason-card"
              whileHover={{ y: -5 }}
            >
              {reason}
            </motion.div>
          ))}
        </div>
      </section>

      {/* LETTER */}
      <section className="section">
        <motion.div
          className="letter"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <p className="letter-label">Ein brief an dich</p>

          <p className="letter-text">
            Danke Marie, dass du mich zu dem Mann gemacht hast.
            der ich heute bin. Du bist mein ganzes Universum.
            Ich liebe dich.
          </p>
        </motion.div>
      </section>
      <SpotifyEmbed />
      {/* FOOTER */}
      <footer className="footer">
        <h2 className="h2-warum">Wir für immer ♡</h2>

        <p>Mein geliebtes Ei</p>
      </footer>
    </main>
  );
}

export default App;