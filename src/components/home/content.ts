import type { Program, NewsItem, EventItem } from "./types";
const campus = { src: "/images/campus.jpg", alt: "Placeholder university campus surrounded by trees" };
const students = { src: "/images/students.jpg", alt: "Placeholder students gathering on a university campus" };
const research = { src: "/images/research.jpg", alt: "Placeholder scientist working in a research laboratory" };
const library = { src: "/images/library.jpg", alt: "Placeholder university library and study spaces" };
// Illustrative static records. Replace with CMS or database results.
export const homeContent = {
 hero: { university: "Tiangong University", title: "Ideas take flight.", accent: "Futures begin here.", description: "Discover a place where curiosity meets possibility. Learn, create, and shape a better tomorrow at Tiangong University.", image: campus, primaryAction: { label: "Apply Now", href: "/admissions" }, secondaryAction: { label: "Explore Programs", href: "#programs" } },
 stats: [{ value: 20000, suffix: "+", label: "Students pursuing possibility" }, { value: 1200, suffix: "+", label: "Dedicated faculty members" }, { value: 50, suffix: "+", label: "Academic programs" }, { value: 30, suffix: "+", label: "Countries represented" }],
 about: { eyebrow: "Rooted in tradition. Driven by discovery.", title: "A world of knowledge. A future of your making.", description: "Welcome to Tiangong University. From our home in Tianjin, we bring ambitious minds together to turn bold ideas into meaningful change. Here, a rich academic tradition meets a forward-looking spirit — and your next chapter begins.", image: campus, action: { label: "Get to know Tiangong", href: "/about" }, note: "More than a century of learning, discovery, and impact." },
 programs: { eyebrow: "Find your direction", title: "Big ambitions. Endless possibilities.", description: "Explore fields that challenge your thinking and open doors to what comes next.", action: { label: "Explore all programs", href: "/academics" }, items: [
 { id: "engineering", title: "Engineering & Technology", category: "Build what's next", description: "Solve real-world challenges through innovative engineering and emerging technologies.", icon: "engineering", href: "/academics" },
 { id: "science", title: "Science & Research", category: "Question. Discover. Transform.", description: "Push the boundaries of knowledge with hands-on scientific exploration.", icon: "science", href: "/academics" },
 { id: "design", title: "Arts & Design", category: "Make your mark", description: "Bring fresh perspectives to life through creativity and cultural expression.", icon: "design", href: "/academics" },
 { id: "business", title: "Business & Economics", category: "Lead with purpose", description: "Develop the insight and confidence to lead in an interconnected global economy.", icon: "business", href: "/academics" },
 ] satisfies Program[] },
 news: { eyebrow: "The latest from Tiangong", title: "Ideas, discoveries & campus stories.", action: { label: "View all news", href: "/news" }, items: [
 { id: "research", title: "New frontiers in sustainable materials research", summary: "Our researchers are exploring smarter materials for a more sustainable tomorrow.", date: "2026-10-02", category: "Research", image: research, href: "/news" },
 { id: "students", title: "A new chapter for our newest generation", summary: "Meet the curious minds bringing new energy and fresh perspectives to campus.", date: "2026-09-28", category: "Campus news", image: students, href: "/news" },
 { id: "library", title: "More space to explore, connect, and create", summary: "Discover welcoming learning spaces designed for collaboration and discovery.", date: "2026-09-24", category: "University life", image: library, href: "/news" },
 ] satisfies NewsItem[] },
 events: { eyebrow: "Be part of the moment", title: "What's happening on campus.", action: { label: "Explore campus events", href: "/campus-life" }, items: [
 { id: "open-day", title: "Discover Tiangong: Campus Open Day", startsAt: "2026-10-24T09:00:00+08:00", location: "Main Campus, Tianjin", category: "Open day", href: "/admissions" },
 { id: "innovation", title: "Innovation & Future Technology Forum", startsAt: "2026-11-06T10:00:00+08:00", location: "University Conference Center", category: "Talks & ideas", href: "/research" },
 { id: "culture", title: "International Culture Festival", startsAt: "2026-11-12T10:00:00+08:00", location: "Student Activity Center", category: "Community", href: "/international" },
 ] satisfies EventItem[] },
 campus: { eyebrow: "More than a classroom", title: "Your people. Your place. Your Tiangong.", description: "Find your community in the everyday moments that make university life unforgettable.", action: { label: "Discover campus life", href: "/campus-life" }, items: [{ ...students, title: "A community to belong to", href: "/campus-life" }, { ...library, title: "Room to discover", href: "/campus-life" }, { ...campus, title: "A place to grow", href: "/campus-life" }] },
 international: { eyebrow: "Connected to the world", title: "Different backgrounds. Shared horizons.", description: "Join a welcoming international community. Explore new perspectives, build connections across borders, and make Tianjin your home away from home.", image: students, stat: "30+", statLabel: "Countries. One shared community.", action: { label: "Your international journey", href: "/international" } },
 cta: { eyebrow: "Your next chapter starts here", title: "Ready to shape your future?", description: "Bring your curiosity. Bring your ambition. We'll help you take the next step.", primaryAction: { label: "Apply to Tiangong", href: "/admissions" }, secondaryAction: { label: "Contact admissions", href: "/contact" } },
};

