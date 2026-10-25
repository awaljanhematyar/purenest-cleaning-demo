import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";
import {
  House,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Check,
  Menu,
  X,
  Leaf,
  KeyRound,
  Building2,
  Plus,
  MapPin,
  Clock,
  ShieldCheck,
  Heart,
  CheckCircle2,
  LoaderCircle,
  MoveRight,
} from "lucide-react";
import {
  brand,
  nav,
  photos,
  imageUrl,
  services,
  pricing,
  estimate,
  faqs,
  testimonials,
  pageMeta,
} from "./config";
import "./styles.css";
const icons = {
  home: House,
  sparkles: Sparkles,
  key: KeyRound,
  building: Building2,
};
const money = (value) =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: brand.currency,
    maximumFractionDigits: 0,
  }).format(value);
function Photo({ index = 0, className = "", eager = false }) {
  const photo = photos[index];
  return (
    <img
      className={className}
      src={imageUrl(photo)}
      srcSet={`${imageUrl(photo, 600)} 600w, ${imageUrl(photo, 1000)} 1000w, ${imageUrl(photo, 1600)} 1600w`}
      sizes="(max-width: 700px) 100vw, 50vw"
      alt={photo.alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      width="1200"
      height="1000"
    />
  );
}
function Button({ to = "/quote", children, className = "" }) {
  return (
    <Link className={`button ${className}`} to={to}>
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
function Brand() {
  return (
    <Link to="/" className="brand" aria-label={`${brand.name} Cleaning home`}>
      <span className="brand-icon">
        <House size={26} />
        <Sparkles size={13} />
      </span>
      <span>
        {brand.name}
        <small>{brand.suffix}</small>
      </span>
    </Link>
  );
}
function Shell() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const mainRef = useRef(null);
  const previousLocation = useRef(location.key);
  useEffect(() => {
    setOpen(false);
    const meta = pageMeta[location.pathname] || [
      "Page not found",
      "This demo page could not be found.",
    ];
    document.title = `${meta[0]} | ${brand.name} Cleaning Demo`;
    document.querySelector('meta[name="description"]').content = meta[1];
    if (location.hash) {
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView(),
      );
    } else window.scrollTo({ top: 0, behavior: "instant" });
    if (previousLocation.current !== location.key) {
      mainRef.current?.focus({ preventScroll: true });
    }
    previousLocation.current = location.key;
  }, [location]);
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <div className="demo-bar">
        <span className="demo-dot" /> {brand.name} Cleaning · Fictional demo{" "}
        <span className="demo-label">Fictional website demo · No bookings</span>
      </div>
      <header>
        <div className="container nav-row">
          <Brand />
          <nav
            id="main-navigation"
            className={open ? "nav open" : "nav"}
            aria-label="Main navigation"
          >
            {nav.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === "/"}>
                {label}
              </NavLink>
            ))}
            <Button className="nav-quote">Get a sample quote</Button>
          </nav>
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="main-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        <div id="mobile-nav" className="sr-only">
          Navigation menu {open ? "open" : "closed"}
        </div>
      </header>
      <main id="main" tabIndex="-1" ref={mainRef}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
function Eyebrow({ children }) {
  return (
    <p className="eyebrow">
      <span /> {children}
    </p>
  );
}
function Intro({ label, title, children }) {
  return (
    <section className="page-intro container">
      <Eyebrow>{label}</Eyebrow>
      <h1>{title}</h1>
      <p>{children}</p>
    </section>
  );
}
function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <Eyebrow>A FRESH PERSPECTIVE ON CLEAN</Eyebrow>
          <h1>
            A cleaner home.
            <br />A <em>lighter</em> life.
          </h1>
          <p>
            Less time cleaning. More time for what matters.
            <br className="desktop-break" /> Thoughtful care for homes and
            workspaces in {brand.city}.
          </p>
          <div className="hero-actions">
            <Button>Explore your sample quote</Button>
            <Link className="text-link" to="/services">
              Discover our services <ArrowRight size={18} />
            </Link>
          </div>
          <div className="hero-perks">
            <span>
              <Check size={15} /> Your space, your routine
            </span>
            <span>
              <Check size={15} /> A thoughtful approach
            </span>
          </div>
          <p className="small-note">
            A fictional {brand.city} cleaning company. Made to inspire.
          </p>
        </div>
        <div className="hero-visual">
          <Photo eager />
          <div className="image-tag">
            <span className="icon-circle">
              <Sparkles size={22} />
            </span>
            <div>
              A fresh space.
              <br />
              <strong>A fresh state of mind.</strong>
            </div>
          </div>
          <div className="vertical-caption">
            A LITTLE CARE CHANGES EVERYTHING
          </div>
        </div>
      </section>
      <section className="values-strip">
        <div className="container values-row">
          <span>
            <House /> A clean for every kind of home
          </span>
          <span>
            <Leaf /> Care in the little details
          </span>
          <span>
            <Clock /> More time for your everyday
          </span>
          <span>
            <Heart /> Made around your needs
          </span>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <Eyebrow>OUR SAMPLE SERVICES</Eyebrow>
            <h2>
              Life gets busy.
              <br />
              Let clean come easy.
            </h2>
          </div>
          <div>
            <p>
              From an everyday refresh to a brand-new beginning,
              <br /> explore a clean that fits your space.
            </p>
            <Link to="/services" className="text-link">
              View all services <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div className="service-grid">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
        <p className="small-note">
          All services and prices are illustrative. This demo does not accept
          bookings.
        </p>
      </section>
      <section className="story-section">
        <div className="container split">
          <div className="story-image">
            <Photo index={5} />
            <span className="photo-caption">
              STOCK PHOTOGRAPHY · ILLUSTRATIVE ONLY
            </span>
          </div>
          <div className="story-copy">
            <Eyebrow>MORE THAN A TIDY SPACE</Eyebrow>
            <h2>
              Good care is
              <br />
              in the details.
            </h2>
            <p>
              A clear countertop. A freshly made bed. That feeling when you walk
              through the door and can finally exhale.
            </p>
            <p>
              {brand.name} imagines a cleaning experience built around the small
              things that make home feel like home.
            </p>
            <ul className="check-list">
              <li>
                <Check /> Room-by-room attention
              </li>
              <li>
                <Check /> A routine that works around you
              </li>
              <li>
                <Check /> Clear expectations from the start
              </li>
            </ul>
            <Button to="/about" className="button-outline">
              The {brand.name} idea
            </Button>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="center-heading">
          <Eyebrow>A SIMPLE PATH TO A FRESHER SPACE</Eyebrow>
          <h2>A little less on your to-do list.</h2>
        </div>
        <div className="steps">
          {[
            [
              "01",
              "Make it yours",
              "Choose a sample service, your space, and a routine.",
            ],
            [
              "02",
              "See the possibilities",
              "Explore an instant, illustrative estimate. No surprises.",
            ],
            [
              "03",
              "Imagine the feeling",
              "Try the demo request flow and picture your fresh start.",
            ],
          ].map(([n, title, copy]) => (
            <div key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="testimonial-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>IMAGINE COMING HOME TO THIS</Eyebrow>
              <h2>
                Little moments.
                <br />A lighter everyday.
              </h2>
            </div>
            <p className="fiction-label">
              Fictional testimonial examples
              <br />
              These are not real customer reviews.
            </p>
          </div>
          <div className="testimonials">
            {testimonials.map((t) => (
              <figure key={t.name}>
                <span className="quote-mark">“</span>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.type} · Fictional example</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="section container faq-layout">
        <div>
          <Eyebrow>A FEW HELPFUL ANSWERS</Eyebrow>
          <h2>
            Good questions.
            <br />
            Clear answers.
          </h2>
          <p>Get to know the demo before you explore.</p>
          <Link className="text-link" to="/contact">
            Still curious? <ArrowUpRight size={18} />
          </Link>
        </div>
        <FAQ />
      </section>
      <CTA />
    </>
  );
}
function ServiceCard({ service, index }) {
  const Icon = icons[service.icon];
  return (
    <Link className="service-card" to={`/services#${service.id}`}>
      <div className="card-photo">
        <Photo index={service.photo} />
        <span className="service-number">0{index + 1}</span>
      </div>
      <div className="card-content">
        <Icon size={23} />
        <h3>{service.name}</h3>
        <p>{service.short}</p>
        <span className="card-bottom">
          Explore service <ArrowUpRight size={19} />
        </span>
      </div>
    </Link>
  );
}
function FAQ() {
  return (
    <div className="faqs">
      {faqs.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <Plus size={19} />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
function CTA() {
  return (
    <section className="cta-wrap container">
      <div className="cta">
        <div>
          <Eyebrow>A FRESH START IS A FEW CLICKS AWAY</Eyebrow>
          <h2>
            Make room for
            <br />a little more living.
          </h2>
          <p>Try the sample estimator. Imagine the possibilities.</p>
        </div>
        <div>
          <Button>Get a sample quote</Button>
          <span className="cta-note">
            Illustrative pricing · No personal details needed
          </span>
        </div>
        <Sparkles className="cta-sparkle" />
      </div>
    </section>
  );
}
function Services() {
  return (
    <>
      <Intro
        label="A CLEAN FOR EVERY CHAPTER"
        title="Your space. Our kind of care."
      >
        Explore four sample services, each with a clear checklist. Every service
        shown here is fictional and available for demonstration only.
      </Intro>
      <div className="container service-details">
        {services.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <section
              className={`split service-detail ${i % 2 ? "reverse" : ""}`}
              id={s.id}
              key={s.id}
            >
              <Photo index={s.photo} />
              <div>
                <Eyebrow>SAMPLE SERVICE 0{i + 1}</Eyebrow>
                <Icon size={32} />
                <h2>{s.name}</h2>
                <p>{s.description}</p>
                <ul className="check-list">
                  {s.includes.map((item) => (
                    <li key={item}>
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="price-line">
                  Sample base {money(s.base)}{" "}
                  <span>+ room adjustments · CAD, before tax</span>
                </p>
                <Button>Customize sample estimate</Button>
              </div>
            </section>
          );
        })}
        <aside className="notice">
          <ShieldCheck />
          <div>
            <h3>Clear scope, from the start.</h3>
            <p>
              Sample services exclude hazardous materials, pest treatment,
              exterior or high-access windows, heavy lifting, and specialist
              restoration. Photos are illustrative stock images, not completed
              {brand.name} work.
            </p>
          </div>
        </aside>
      </div>
      <CTA />
    </>
  );
}
function About() {
  return (
    <>
      <Intro
        label="THE PURENEST IDEA"
        title="A fresh space makes room for more."
      >
        A concept for thoughtful cleaning, built around a simple belief: feeling
        at home starts with feeling at ease.
      </Intro>
      <section className="container split about-split">
        <Photo index={0} eager />
        <div>
          <Eyebrow>DESIGNED WITH EVERYDAY LIFE IN MIND</Eyebrow>
          <h2>
            Less on your list.
            <br />
            More in your day.
          </h2>
          <p>
            {brand.name} is a fictional cleaning brand created to show how a modern
            {" "}{brand.city} cleaning business could present its services with warmth,
            clarity, and care.
          </p>
          <p>
            The spaces, sample service plans, and example stories are here to
            help you imagine that experience. There is no operating business,
            team, physical office, or booking service behind this site.
          </p>
          <Link className="text-link" to="/services">
            Explore the sample services <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section container">
        <div className="center-heading">
          <Eyebrow>THE PRINCIPLES BEHIND THE CONCEPT</Eyebrow>
          <h2>Thoughtful from the ground up.</h2>
        </div>
        <div className="principles">
          {[
            [
              Heart,
              "Care that feels personal",
              "A welcoming experience with room for different homes, routines, and priorities.",
            ],
            [
              ShieldCheck,
              "Clarity you can feel",
              "Visible sample pricing, understandable checklists, and honest demo labels.",
            ],
            [
              Leaf,
              "A considered approach",
              "Attention to everyday spaces without unverified environmental or certification claims.",
            ],
          ].map(([Icon, t, p]) => (
            <article key={t}>
              <Icon />
              <h3>{t}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
function Gallery() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);
  const dialog = useRef(null);
  const closeButton = useRef(null);
  useEffect(() => {
    if (active !== null) {
      dialog.current?.showModal();
      closeButton.current?.focus();
    } else dialog.current?.close();
  }, [active]);
  const list = photos.filter((p) => filter === "All" || p.category === filter);
  return (
    <>
      <Intro
        label="A LITTLE FRESH-SPACE INSPIRATION"
        title="Picture a lighter everyday."
      >
        A curated moodboard of clean, welcoming spaces. Licensed stock
        photography for illustration, not a portfolio of completed work.
      </Intro>
      <section className="container gallery-section">
        <div className="filters" aria-label="Filter gallery">
          {["All", ...new Set(photos.map((p) => p.category))].map((f) => (
            <button
              key={f}
              className={filter === f ? "selected" : ""}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="gallery-grid">
          {list.map((p) => (
            <button
              className="gallery-item"
              key={p.id}
              onClick={() => setActive(photos.indexOf(p))}
              aria-label={`Enlarge ${p.label}`}
            >
              <Photo index={photos.indexOf(p)} />
              <span>
                <strong>{p.label}</strong>
                <Plus />
              </span>
            </button>
          ))}
        </div>
        <p className="small-note">
          Images provided by Unsplash under the{" "}
          <a
            href="https://unsplash.com/license"
            target="_blank"
            rel="noreferrer"
          >
            Unsplash License
          </a>
          . See README for image sources.
        </p>
      </section>
      <dialog
        ref={dialog}
        className="lightbox"
        onCancel={() => setActive(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null);
        }}
        aria-label="Enlarged gallery photograph"
      >
        <button
          ref={closeButton}
          className="lightbox-close"
          onClick={() => setActive(null)}
          aria-label="Close photograph"
        >
          <X />
        </button>
        {active !== null && (
          <>
            <img
              src={imageUrl(photos[active], 1600)}
              alt={photos[active].alt}
            />
            <p>{photos[active].label} · Illustrative stock photography</p>
          </>
        )}
      </dialog>
      <CTA />
    </>
  );
}
function Select({ label, value, onChange, children, id }) {
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <select id={id} value={value} onChange={onChange}>
        {children}
      </select>
    </label>
  );
}
function Quote() {
  const [service, setService] = useState("residential");
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [frequency, setFrequency] = useState("once");
  const [extras, setExtras] = useState([]);
  const total = estimate({ service, bedrooms, bathrooms, frequency, extras });
  return (
    <>
      <Intro
        label="YOUR SPACE, YOUR SAMPLE ESTIMATE"
        title="A fresh start. Clear possibilities."
      >
        Build a sample cleaning plan in a few clicks. All prices are
        illustrative CAD amounts before applicable taxes, not real offers or
        binding quotes.
      </Intro>
      <section className="container quote-layout">
        <div className="calculator">
          <h2>Make it feel like you.</h2>
          <p>Try different options to see the sample estimate change.</p>
          <Select
            label="1. Choose a sample service"
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
          <div className="form-row">
            <Select
              label={
                service === "office"
                  ? "Office rooms (sample units)"
                  : "Bedrooms"
              }
              id="bedrooms"
              value={bedrooms}
              onChange={(e) => setBedrooms(Number(e.target.value))}
            >
              {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </Select>
            <Select
              label="Bathrooms"
              id="bathrooms"
              value={bathrooms}
              onChange={(e) => setBathrooms(Number(e.target.value))}
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </Select>
          </div>
          <fieldset>
            <legend>2. Pick a sample routine</legend>
            <div className="frequency-options">
              {pricing.frequencies.map((f) => (
                <label
                  className={frequency === f.id ? "chosen" : ""}
                  key={f.id}
                >
                  <input
                    type="radio"
                    name="frequency"
                    value={f.id}
                    checked={frequency === f.id}
                    onChange={() => setFrequency(f.id)}
                  />
                  <span>
                    {f.label}
                    {f.discount > 0 && (
                      <small>Sample {f.discount * 100}% saving</small>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>3. Add a little extra</legend>
            {pricing.extras.map((e) => (
              <label className="extra" key={e.id}>
                <span>
                  <input
                    type="checkbox"
                    checked={extras.includes(e.id)}
                    onChange={() =>
                      setExtras(
                        extras.includes(e.id)
                          ? extras.filter((id) => id !== e.id)
                          : [...extras, e.id],
                      )
                    }
                  />
                  {e.label}
                </span>
                <span>+{money(e.price)}</span>
              </label>
            ))}
          </fieldset>
          <p className="small-note">
            Demo formula: service base + {money(pricing.bedroom)} per
            bedroom/office room + {money(pricing.bathroom)} per bathroom +
            extras, then the selected routine discount. Real estimates would
            consider size and condition.
          </p>
        </div>
        <aside className="estimate-card">
          <span className="eyebrow">YOUR ILLUSTRATIVE ESTIMATE</span>
          <output aria-live="polite" aria-atomic="true">
            {money(total)}
            <span> CAD / visit</span>
          </output>
          <p>Sample only · Before applicable taxes</p>
          <div className="estimate-lines">
            <span>
              {services.find((s) => s.id === service).name}
              <Check size={17} />
            </span>
            <span>
              {bedrooms} {service === "office" ? "office rooms" : "bedrooms"} ·{" "}
              {bathrooms} bathrooms
            </span>
            <span>
              {pricing.frequencies.find((f) => f.id === frequency).label}
            </span>
            {extras.length > 0 && (
              <span>
                {extras.length} sample extra{extras.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
          <a className="button" href="#demo-request">
            Try a demo request <ArrowRight size={18} />
          </a>
          <p className="small-note">
            No real quote, reservation, or payment. No personal details needed.
          </p>
        </aside>
      </section>
      <section className="container request-section" id="demo-request">
        <div>
          <Eyebrow>TRY THE NEXT STEP</Eyebrow>
          <h2>
            All the experience.
            <br />
            None of the commitment.
          </h2>
          <p>
            Use a fictional scenario to preview the request experience. Your
            selections stay in this page and disappear when you leave or reload.
          </p>
        </div>
        <DemoForm type="quote" />
      </section>
    </>
  );
}
function DemoForm({ type = "contact" }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  function submit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!data.get("scenario") || !data.get("topic") || !data.get("consent")) {
      setError("Choose a sample scenario and topic, then confirm demo mode.");
      return;
    }
    setError("");
    setStatus("loading");
    timer.current = setTimeout(() => setStatus("success"), 700);
  }
  if (status === "success")
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={38} />
        <h3>Demo simulation complete.</h3>
        <p>
          No request was sent. No booking was made. No information was saved. A
          real business could connect this step to its own secure booking
          system.
        </p>
        <button
          className="button button-outline"
          onClick={() => setStatus("idle")}
        >
          Try another scenario <ArrowRight size={18} />
        </button>
      </div>
    );
  return (
    <form className="demo-form" onSubmit={submit} noValidate>
      <div className="form-notice">
        <ShieldCheck size={22} />
        <span>
          <strong>Demo mode only</strong> Please use the sample choices. Do not
          enter real personal information.
        </span>
      </div>
      <label className="field">
        <span>
          Fictional scenario <span aria-hidden="true">*</span>
        </span>
        <select
          name="scenario"
          required
          aria-invalid={!!error}
          disabled={status === "loading"}
        >
          <option value="">Choose an example</option>
          <option value="home">Sample homeowner · Alex</option>
          <option value="move">Sample renter · Jordan</option>
          <option value="office">Sample office manager · Taylor</option>
        </select>
      </label>
      <label className="field">
        <span>
          {type === "quote"
            ? "Sample preferred timing"
            : "Sample enquiry topic"}{" "}
          <span aria-hidden="true">*</span>
        </span>
        <select name="topic" required disabled={status === "loading"}>
          <option value="">Choose an option</option>
          {(type === "quote"
            ? ["Next week (sample)", "In two weeks (sample)", "Just exploring"]
            : [
                "Residential service example",
                "Moving clean example",
                "Office cleaning example",
                "Website demonstration",
              ]
          ).map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="consent">
        <input
          type="checkbox"
          name="consent"
          required
          disabled={status === "loading"}
        />
        <span>
          I understand this is a simulation, and no message or quote request
          will be sent. *
        </span>
      </label>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button className="button" type="submit" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <LoaderCircle className="spin" size={18} /> Simulating…
          </>
        ) : (
          <>
            Simulate {type === "quote" ? "quote request" : "message"}{" "}
            <ArrowUpRight size={18} />
          </>
        )}
      </button>
      <p className="small-note">
        Required fields marked *. No network requests, emails, or storage are
        used by this form. <Link to="/privacy">Privacy details</Link>
      </p>
    </form>
  );
}
function Contact() {
  return (
    <>
      <Intro
        label="LET’S IMAGINE SOMETHING FRESH"
        title="A friendly place to start."
      >
        Try the simulated contact experience. {brand.name} is a fictional business,
        so there is no real phone number, email, office address, or customer
        support.
      </Intro>
      <section className="container contact-layout">
        <div>
          <div className="contact-detail">
            <MapPin />
            <div>
              <h3>{brand.city}, {brand.province}</h3>
              <p>
                Illustrative service area only.
                <br />
                No physical business location.
              </p>
            </div>
          </div>
          <div className="contact-detail">
            <Clock />
            <div>
              <h3>Explore on your schedule</h3>
              <p>
                This demo is available to browse anytime.
                <br />
                No actual appointments are available.
              </p>
            </div>
          </div>
          <div className="contact-detail">
            <Sparkles />
            <div>
              <h3>Curious about the cost?</h3>
              <p>Get an instant illustrative estimate.</p>
              <Link to="/quote" className="text-link">
                Try the calculator <ArrowRight size={17} />
              </Link>
            </div>
          </div>
          <div className="location-card">
            <span>THE EXAMPLE SERVICE AREA</span>
            <strong>{brand.city}</strong>
            <p>{brand.province}, Canada</p>
            <div className="map-art" aria-hidden="true">
              <MapPin size={40} />
            </div>
            <small>Decorative illustration · Not a coverage map</small>
          </div>
        </div>
        <DemoForm />
      </section>
      <section className="section container faq-layout">
        <div>
          <Eyebrow>BEFORE YOU CLICK</Eyebrow>
          <h2>A few useful answers.</h2>
        </div>
        <FAQ />
      </section>
    </>
  );
}
function Privacy() {
  return (
    <>
      <Intro label="DEMO PRIVACY POLICY" title="Your privacy, kept simple.">
        Effective October 25, 2026. This policy explains this fictional website
        demonstration.
      </Intro>
      <article className="container policy">
        <h2>A demonstration, not a service</h2>
        <p>
          {brand.name} Cleaning is fictional. This website does not provide cleaning
          services or accept real enquiries, bookings, or payments.
        </p>
        <h2>Forms and calculator</h2>
        <p>
          The forms contain only preset fictional choices. They do not request
          names, email addresses, telephone numbers, street addresses, or
          free-text messages. Form and calculator values exist only in page
          memory and are not sent to a server, stored in browser storage, or
          retained after a reload. Please do not provide real customer
          information.
        </p>
        <h2>Hosting and external images</h2>
        <p>
          The site does not install analytics, advertising trackers, or
          application cookies. The hosting provider may process technical
          request data such as IP addresses, timestamps, and browser information
          to deliver and secure the site. Stock images load from
          images.unsplash.com, which receives normal request information
          including your IP address. Review the{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noreferrer"
          >
            Vercel privacy policy
          </a>{" "}
          and{" "}
          <a
            href="https://unsplash.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Unsplash privacy policy
          </a>{" "}
          for their practices.
        </p>
        <h2>Sample content</h2>
        <p>
          All service offerings, prices, scenarios, and testimonials are
          illustrative. Photographs are licensed stock images and do not show
          actual {brand.name} employees, customers, or completed work.
        </p>
        <h2>Rebranding this demo</h2>
        <p>
          A real business adopting this template must replace this policy with
          one that accurately describes its identity, contact details, service
          providers, and actual data handling before collecting any customer
          information.
        </p>
      </article>
    </>
  );
}
function NotFound() {
  return (
    <section className="container not-found">
      <Eyebrow>404 · A LITTLE OFF THE PATH</Eyebrow>
      <Sparkles size={54} />
      <h1>
        This corner is spotless.
        <br />
        And a little empty.
      </h1>
      <p>The page you are looking for could not be found.</p>
      <Button to="/">Back to a fresh start</Button>
    </section>
  );
}
function Footer() {
  return (
    <footer>
      <div className="container footer-main">
        <div>
          <Brand />
          <p>A cleaner home. A lighter life.</p>
          <span className="footer-demo">FICTIONAL BUSINESS · DEMO ONLY</span>
        </div>
        <div>
          <h3>Explore</h3>
          {nav.slice(1).map(([to, label]) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <h3>Find your fresh start</h3>
          <Link to="/quote">
            Sample quote calculator <ArrowUpRight size={15} />
          </Link>
          <p>
            {brand.city}, {brand.province}, Canada
            <br />
            Illustrative service area
          </p>
          <span>No real bookings or contact details.</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {brand.name} Cleaning. Fictional website
          demo.
        </span>
        <Link to="/privacy">Privacy policy</Link>
        <span>Sample prices in CAD. All testimonials are fictional.</span>
      </div>
      <div className="mobile-contact">
        <Link to="/contact">
          Demo contact <MoveRight size={17} />
        </Link>
        <Link to="/quote">
          Sample quote <ArrowUpRight size={17} />
        </Link>
      </div>
    </footer>
  );
}
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  </React.StrictMode>,
);
