export const SITE = {
  name: "Saw Jimmy Moore",
  firstName: "Jimmy",
  tagline: "Co-founder, CTC · Marketing & Social Media · Digital & Tech",
  titles: [
    "Co-founder, CTC (IT & Tech)",
    "Marketing & Social Media",
    "Web & Systems",
  ],
  description:
    "Co-founder of Click to Create (CTC), where I lead technology and build websites and systems such as MMG and Daw Na Yeik. Previously marketing lead at Fen-i, running social and paid campaigns for Zebra Pitch and Young CEO.",
  location: "Bangkok, Thailand",
  email: "mjimm.saw@gmail.com",
  phone: "+66 094-316-3065",
  phoneMyanmar: "+959 440 600 106",
  languages: "Burmese (Native) · English (Advanced)",
  linkedin: "https://linkedin.com/in/jimmy-moore-742b75214",
  status: "Open to opportunities",
  bookingUrl: "https://cal.com/jimmy-moore",
};

export const WORKING_HOURS = {
  days: "Mon to Fri",
  hours: "10:00 to 18:00",
  timezone: "ICT, Bangkok",
};

export const MESSAGE_SUGGESTIONS = [
  { label: "I'm hiring for a role", template: "Hi Jimmy, I'm hiring for a role and would like to talk about your experience. Here are the details: " },
  { label: "Lead a social campaign", template: "Hi Jimmy, we are planning a social media campaign and need someone to lead it. Here is what we have in mind: " },
  { label: "Talk about CTC projects", template: "Hi Jimmy, I'd like to know more about the websites and systems you build at CTC. Here is what I need: " },
  { label: "Ask for your CV", template: "Hi Jimmy, could you share your CV and a short summary of your campaign work? " },
  { label: "Quick question", template: "Hi Jimmy, quick question: " },
  { label: "Something else", template: "" },
];

export const STATS = [
  { value: 8, suffix: "", label: "Websites and systems built" },
  { value: 4, suffix: "", label: "Brand social pages run" },
  { value: 3, suffix: "", label: "Programmes marketed end to end" },
];

export const IMPACT_POINTS = [
  {
    icon: "📈",
    title: "Revenue & Leads",
    description: "Sites and campaigns built to convert visitors into inquiries, bookings, and sales, not just look nice.",
  },
  {
    icon: "⏱️",
    title: "Time Back",
    description: "Automated content flows, CMS systems, and clean handoffs mean less manual work for you every week.",
  },
  {
    icon: "💰",
    title: "ROI-First Scope",
    description: "Every build is scoped around what actually moves the numbers, workload, cost, and payback, not just features.",
  },
];

// Capability-first: what I can do and how I approach a build, not a
// chronological account of what I've done. Proof of the track record lives
// in RESULTS and PROJECTS, this is the pitch, not the CV.
export const ABOUT_PARAGRAPHS = [
  "I co-founded Click to Create (CTC) in August 2026 and lead all of its technology: websites, internal systems and automation. The MMG website and the Daw Na Yeik Odoo system are CTC projects that I build and hand over, including training.",
  "Before CTC I was the marketing lead and strategist at Fen-i (June to August 2026), where I planned and ran social media and paid campaigns for Zebra Pitch, Young CEO and the Fen-i pages, with the content calendars and analytics behind them. I still manage the CTC social pages.",
  "My background is tech and marketing, with earlier roles in education coordination that taught me to run events, communicate clearly and keep a team on schedule. That mix is why I can brief, build and measure a campaign myself, from the page it lands on to the numbers that come back.",
];

export interface SkillCategory {
  icon: string;
  category: string;
  tags: string[];
}

export const SKILLS: SkillCategory[] = [
  {
    icon: "💻",
    category: "Web & Product",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion", "Git & GitHub", "Vercel Deployment", "CMS & Content Systems", "API Integration (Formspree)", "Claude Code / AI-Assisted Dev"],
  },
  {
    icon: "🎨",
    category: "Design & Content",
    tags: ["Canva", "Adobe Premiere Pro", "Graphic Design", "Social Media Content", "UX / Wireframing", "Framer (Learning)"],
  },
  {
    icon: "📣",
    category: "Marketing & Social",
    tags: ["SEO & Keywords", "Blog Content", "Facebook Ads", "Instagram Ads", "Meta Business Suite", "Google Analytics", "Paid Lead Gen", "Content Calendars & Campaign Planning"],
  },
  {
    icon: "🤖",
    category: "Automation & Systems",
    tags: ["Odoo", "n8n Workflows", "AI Agent Building", "Process Automation"],
  },
  {
    icon: "🖥️",
    category: "Technical",
    tags: ["Microsoft Office", "Google Suite", "C# Basics", "Python Basics", "iOS / macOS / Windows", "LINE Business"],
  },
  {
    icon: "🎓",
    category: "Education & Coordination",
    tags: ["Student Records", "Parent Communication", "Event Planning", "Curriculum Support", "Classroom Technology", "Staff Training"],
  },
  {
    icon: "🤝",
    category: "Sales & Operations",
    tags: ["Wholesale Coordination", "Customer Service", "Upselling & Cross-selling", "Cash Handling", "Inventory Management"],
  },
  {
    icon: "💡",
    category: "Soft Skills",
    tags: ["Communication", "Problem Solving", "Critical Thinking", "Multitasking", "Team Leadership", "Presentation"],
  },
];

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  bullets: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: "Aug 2026 – Present",
    role: "Co-founder, IT & Technology Lead",
    company: "Click to Create (CTC)",
    bullets: [
      "Co-founded the company and lead all of its technical work: websites, systems and automation",
      "Build and deliver client projects including the MMG website and the Daw Na Yeik Odoo system",
      "Manage CTC's social media pages and built its bilingual website",
    ],
  },
  {
    period: "Jun 2026 – Aug 2026",
    role: "Marketing Lead & Strategist",
    company: "Feni Space / Future Education Network International (Fen-i), Bangkok",
    bullets: [
      "Led marketing and creative planning for a Bangkok youth education organization focused on entrepreneurship and leadership",
      "Ran social media and paid campaigns for Zebra Pitch International 2026, a youth pitch competition at EMQuartier Bangkok, and for Young CEO",
      "Planned content calendars, campaign monitoring and website analytics, in coordination with the founder and operations team",
    ],
  },
  {
    period: "Jan 2026 – Present",
    role: "Social Media Marketing & Web Management",
    company: "De Fabiano Bespoke Tailor, Bangkok",
    bullets: [
      "Built the e-commerce website and manage its day-to-day content, products and updates",
      "Created and scheduled social content for Facebook and Instagram, and ran paid campaigns",
      "Reached 1,400+ organic visitors in 30 days and 14,000+ ad impressions in one week at 300 THB/day",
    ],
  },
  {
    period: "2022 – 2025",
    role: "Earlier roles",
    company: "Education coordination, sales and teaching, Myanmar & Thailand",
    bullets: [
      "Parent communication, enrollment and events for an international curriculum, plus wholesale and retail sales. This is where my habits in follow-through and clear communication come from.",
    ],
  },
];

export interface ResultCard {
  tag: string;
  title: string;
  metrics: { value: string; label: string }[];
  description: string;
  featured?: boolean;
}

export const RESULTS: ResultCard[] = [
  {
    tag: "Case Study, Digital Marketing",
    title: "De Fabiano, Full Digital Presence Built from Zero",
    featured: true,
    metrics: [
      { value: "1,400+", label: "Organic Visitors / Month" },
      { value: "+1,400%", label: "Week-on-Week Growth" },
      { value: "14K+", label: "Ad Impressions / Week" },
      { value: "~20", label: "Leads Generated" },
      { value: "83/100", label: "Site Performance" },
      { value: "6", label: "Countries Reached" },
    ],
    description:
      "Built and launched the full company website, implemented SEO strategy, set up Google Analytics, and ran paid ad campaigns, all independently. International organic traffic from USA, Hong Kong, Switzerland, Austria, Taiwan and Thailand within the first month.",
  },
  {
    tag: "International Education",
    title: "Fellowship International Study Center",
    metrics: [
      { value: "4–5", label: "Classes Coordinated" },
      { value: "14+", label: "Months" },
    ],
    description:
      "Managed Pearson Edexcel curriculum coordination from Reception to GCSE, full parent communication, enrollment, events, and digital platform management across physical and online environments.",
  },
  {
    tag: "Sales & Operations",
    title: "Wholesale & Retail Sales",
    metrics: [
      { value: "B2B", label: "Wholesale Management" },
      { value: "Multi", label: "Channel Engagement" },
    ],
    description:
      "End-to-end wholesale order coordination, customer engagement across LINE, Meta Business Suite and in-store, with consistent retail sales target achievement.",
  },
];

export interface EducationItem {
  period: string;
  degree: string;
  school: string;
}

export const EDUCATION: EducationItem[] = [
  { period: "2022 – Present", degree: "B.A. Candidate, Computer Science, Liberal Arts", school: "Myanmar Institute of Theology" },
  { period: "2024", degree: "English Language Program", school: "Mahachulalongkornrajavidyalaya University, Bangkok" },
];

export const CERTIFICATIONS = [
  "Leadership Development, British Council",
  "Safeguarding, British Council",
  "Basic First Aid Training",
];

export interface ProjectPage {
  label: string;
  url: string;
  description: string;
}

export interface StaticBlock {
  type: "heading" | "paragraph" | "list" | "features" | "faq";
  text?: string;
  items?: string[];
  features?: { title: string; description: string }[];
  faqs?: { q: string; a: string }[];
}

export interface StaticShowcasePage {
  label: string;
  url: string;
  heroImage?: string;
  blocks: StaticBlock[];
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  description: string;
  tags: string[];
  url?: string;
  logo?: string;
  cover: { gradientFrom: string; gradientTo: string };
  // Case study fields
  role?: string;
  period?: string;
  challenge?: string;
  approach?: string[];
  outcomes?: string[];
  metrics?: { value: string; label: string }[];
  tools?: string[];
  // The client's journey working with me, Discover, Scope, Build, Launch, Grow.
  // Framed around what the client experienced and gained, not my process.
  journey?: { step: string; title: string; description: string }[];
  // Interactive showcase (live iframe, only works for sites that allow embedding)
  showcasePages?: ProjectPage[];
  // Static showcase (rendered content, for sites that block iframe embedding)
  staticShowcase?: StaticShowcasePage[];
  // Real screenshots of the build, shown in a gallery with a lightbox
  screenshots?: { src: string; caption: string }[];
  screenshotNote?: string;
}

// The standard client journey, reused across every case study and on the
// homepage Process section, Delve's "Book a Demo" pattern adapted to a
// freelance engagement: discovery call, scoped quote, build, launch, grow.
export interface ServiceJourneyStep {
  stage: string;
  detail: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceDetail {
  slug: string;
  name: string;
  icon: "code" | "cart" | "megaphone" | "calendar" | "database" | "heart" | "user" | "layers";
  tagline: string;
  painPoint: string;
  impact: string;
  whatYouGet: string[];
  journey: ServiceJourneyStep[];
  investmentNote: string;
  faqs: ServiceFaq[];
  /** A real reference mockup for this service, shown full and uncropped
      both on the Services list (as the stacking-card cover) and on the
      service's own detail page (as a full-width visual), never as a
      cover-cropped sliver on either. */
  image?: string;
}

export const SERVICES: ServiceDetail[] = [
  {
    slug: "web-development",
    image: "/images/showcase/krugunn-business-website.jpg",
    name: "Web Development",
    icon: "code",
    tagline: "A site built to convert, not just to exist",
    painPoint: "No real website, or one that looks fine but does not bring in a single inquiry.",
    impact: "Every week without a working site is a customer who found a competitor first, and never even considered you.",
    whatYouGet: [
      "A fast, mobile-first site built on React or Next.js, not a drag-and-drop template",
      "Clean information architecture so visitors find what they need in seconds, not clicks",
      "SEO foundations (metadata, structured data, sitemap) wired in from day one",
      "A lead capture flow connected to your inbox or a tracker dashboard, not a dead contact form",
    ],
    journey: [
      { stage: "Free Demo", detail: "A short call to understand your business and what the site actually needs to do for you." },
      { stage: "Scope", detail: "A fixed package tier and price range, agreed before any work starts." },
      { stage: "Build", detail: "Regular check-ins as the site takes shape, no black box." },
      { stage: "Launch", detail: "Live, tested on real devices, and handed over with a walkthrough." },
      { stage: "Grow", detail: "Optional ongoing content, SEO, and maintenance to keep it working after launch." },
    ],
    investmentNote: "Scoped from a Foundation site (a handful of pages) up to a full Commerce build, see the Pricing page for tier ranges.",
    faqs: [
      { q: "How long does a website take to build?", a: "A Foundation site is typically 1 to 2 weeks. A full Commerce or booking platform runs 3 to 6 weeks depending on scope, agreed upfront before work starts." },
      { q: "Do I own the site afterward?", a: "Yes. Domain, hosting, and code are yours, no lock-in, no recurring fees unless you choose ongoing maintenance." },
      { q: "Can you redesign an existing site instead of starting over?", a: "Yes, a lot of projects are redesigns. The scoping call covers what to keep and what to rebuild." },
      { q: "What platforms do you build on?", a: "Mostly React and Next.js for anything that needs real performance or custom logic. Simpler brochure sites can also run on a managed builder if that fits the budget better." },
    ],
  },
  {
    slug: "e-commerce",
    image: "/images/showcase/defabiano-ecommerce-desktop.jpg",
    name: "E-Commerce",
    icon: "cart",
    tagline: "Turn browsing into a completed order",
    painPoint: "Selling through Instagram DMs and manual invoices, or a store that customers abandon at checkout.",
    impact: "Every manual order is time you are not spending on the product, and every confusing checkout is a sale walking away.",
    whatYouGet: [
      "A real product catalogue with search, filtering, and clear product pages",
      "Cart and checkout built for the payment methods your customers actually use (cards, PromptPay, QR)",
      "Inventory and order tracking so nothing gets sold twice or forgotten",
      "Optional appointment booking alongside the cart, for businesses like tailors or salons that close sales in person",
    ],
    journey: [
      { stage: "Free Demo", detail: "Walk through your current sales process, DMs, invoices, marketplace, whatever it is today." },
      { stage: "Scope", detail: "Commerce-tier package agreed, covering catalogue, cart, and payment integration." },
      { stage: "Build", detail: "Store built and populated with your real products before launch." },
      { stage: "Launch", detail: "Live store, tested checkout flow, and a walkthrough of managing orders." },
      { stage: "Grow", detail: "Ongoing catalogue updates, promotions, and ad management to keep traffic flowing to it." },
    ],
    investmentNote: "Commerce-tier scope, see the Pricing page for the range.",
    faqs: [
      { q: "What payment methods can the store accept?", a: "Cards, PromptPay, and QR checkout are standard. Other gateways can be added depending on your bank and region." },
      { q: "Can it integrate with what I already sell on (Instagram, LINE, Facebook)?", a: "Yes, product feeds and social integrations are part of the standard Commerce scope." },
      { q: "Do you handle inventory across multiple sales channels?", a: "Basic inventory sync is included. More complex multi-channel inventory is scoped case by case." },
    ],
  },
  {
    slug: "digital-marketing",
    image: "/images/showcase/marketing-nextgen.jpg",
    name: "Digital Marketing",
    icon: "megaphone",
    tagline: "Traffic and leads, not just a pretty feed",
    painPoint: "Posting content with no strategy behind it, or running ads that spend money without a clear return.",
    impact: "A site with no traffic behind it is a storefront with the lights off. Marketing is what turns the lights on.",
    whatYouGet: [
      "A content calendar and posting cadence built around what your audience actually responds to",
      "Meta, Google, or TikTok ad campaigns set up and managed with clear reporting",
      "SEO work that targets commercial-intent searches, not just vanity keywords",
      "Monthly reporting so you know exactly what is working and what is not",
    ],
    journey: [
      { stage: "Free Demo", detail: "Review your current channels, what is working, what is not, and where the gaps are." },
      { stage: "Scope", detail: "A recurring plan built around your goals, content, ads, SEO, or a mix." },
      { stage: "Build", detail: "Campaigns and content set up, tracking wired in before the first post or ad goes live." },
      { stage: "Launch", detail: "Campaigns run, content publishes on cadence." },
      { stage: "Grow", detail: "Monthly review and iteration based on what the data actually shows." },
    ],
    investmentNote: "Sold as a monthly retainer, scoped to your channels and goals, see the Pricing page.",
    faqs: [
      { q: "How fast will I see results?", a: "Paid ads can show leads within days. Organic SEO and content typically take 4 to 8 weeks to build momentum." },
      { q: "Do you write and design the content, or just manage the strategy?", a: "Both, content creation and campaign management are part of the retainer." },
      { q: "Can I start with ads only, or content only?", a: "Yes, the retainer is scoped to whichever channels make sense for your business, not a fixed bundle." },
    ],
  },
  {
    slug: "booking-platforms",
    image: "/images/showcase/defabiano-booking.jpg",
    name: "Booking & Service Platforms",
    icon: "calendar",
    tagline: "Let customers book themselves in, any hour of the day",
    painPoint: "Booking happens over DMs and phone calls, and double-bookings or missed messages cost you appointments.",
    impact: "Every booking handled manually is an appointment that could have been lost while you were busy with something else.",
    whatYouGet: [
      "A working-hours-aware calendar customers can book directly, no back-and-forth",
      "Automated confirmation and reminder messages so no-shows drop",
      "Deposit or payment collection at the time of booking, if you want it",
      "A simple admin view so you can see and manage the schedule at a glance",
    ],
    journey: [
      { stage: "Free Demo", detail: "Understand your current booking flow and where it breaks down." },
      { stage: "Scope", detail: "Growth-tier package agreed, covering the booking calendar and automations." },
      { stage: "Build", detail: "Calendar built around your real working hours and service durations." },
      { stage: "Launch", detail: "Live booking flow, tested end to end including confirmations." },
      { stage: "Grow", detail: "Ongoing adjustments as your hours or services change." },
    ],
    investmentNote: "Growth-tier scope, see the Pricing page for the range.",
    faqs: [
      { q: "Can customers only book during my actual working hours?", a: "Yes, the calendar is built around your real hours and blocks out days off automatically." },
      { q: "Does it send reminders automatically?", a: "Yes, confirmation and reminder messages are part of the standard build." },
    ],
  },
  {
    slug: "web-applications",
    image: "/images/showcase/webapp-lumatech.jpg",
    name: "Web Applications & Admin Dashboards",
    icon: "database",
    tagline: "Custom software for how your business actually runs",
    painPoint: "Your team runs on spreadsheets, shared docs, or manual message threads for something that should just be a system, and every update means waiting on a developer.",
    impact: "Every hour spent reconciling a spreadsheet by hand is an hour not spent serving customers, and every routine content change that needs a developer is a bottleneck on your own business.",
    whatYouGet: [
      "A real custom admin panel, login-protected, not a shared spreadsheet or a third-party tool bent out of shape",
      "A live-preview content editor so non-technical staff can update text, images, and pages themselves, safely, with zero code changes",
      "A proper database behind it (not a flat file), built to grow with real data over time",
      "Workflow automation for whatever repetitive task is currently eating your team's time",
    ],
    journey: [
      { stage: "Free Demo", detail: "Walk through the actual workflow that is broken today, and who touches it." },
      { stage: "Scope", detail: "A fixed-scope build agreed around the specific system needed, not a generic template." },
      { stage: "Build", detail: "Built and reviewed in stages so you see it taking shape before launch." },
      { stage: "Launch", detail: "Deployed, staff logins created, and handed over with a walkthrough." },
      { stage: "Grow", detail: "Ongoing feature additions as the system's real use reveals what is needed next." },
    ],
    investmentNote: "Enterprise-tier scope, priced per system since every internal tool solves a different problem, see the Pricing page.",
    faqs: [
      { q: "Is this like buying an off-the-shelf CMS?", a: "No, this is built specifically around your data and workflow, not a generic plugin bent to fit. A recent build was a full custom CMS with live-preview editing for a nonprofit client, not WordPress or a page builder." },
      { q: "Can my non-technical staff really use it safely?", a: "Yes, that is the actual point. Draft and publish states mean staff can edit safely without ever affecting the live site until they choose to publish." },
      { q: "Do I own the system afterward?", a: "Yes, full ownership, no lock-in to a subscription platform you do not control." },
    ],
  },
  {
    slug: "nonprofit-government",
    image: "/images/showcase/nonprofit-admin-cms.jpg",
    name: "Nonprofit & Government-Facing Sites",
    icon: "heart",
    tagline: "Built for donor trust and staff who are not developers",
    painPoint: "A site that cannot show individual programs in depth, has no real donation flow, and cannot be updated by anyone on staff without waiting on a developer.",
    impact: "A donor who cannot find clear information or a working donation flow moves on, and an organization that depends on a developer for every content update will eventually stop updating it at all.",
    whatYouGet: [
      "Bilingual or multi-language support built in from the start, not bolted on later",
      "Individual program or initiative pages that actually explain the work, not just a paragraph on a homepage",
      "A real donation flow with tiered giving and clear impact messaging per amount",
      "A custom admin CMS so staff maintain the site themselves, long after launch",
    ],
    journey: [
      { stage: "Free Demo", detail: "Understand the organization's programs, donor base, and who will maintain the site." },
      { stage: "Scope", detail: "Enterprise-tier scope agreed, covering multi-language, donation flow, and CMS." },
      { stage: "Build", detail: "Built and reviewed in stages, with real program content, not lorem ipsum." },
      { stage: "Launch", detail: "Deployed to a real domain, staff logins created, and handed over." },
      { stage: "Grow", detail: "Ongoing support as programs, staff, or donation needs change." },
    ],
    investmentNote: "Enterprise-tier scope, see the Pricing page. A recent build for a Myanmar nonprofit scoped in the $3,000 to $6,000 range for the full site plus custom CMS.",
    faqs: [
      { q: "Do you have real experience with nonprofit sites specifically?", a: "Yes, a recent project built a full bilingual (English/Myanmar) donor platform with a custom admin CMS for a Mon State civil society organization, live and in production." },
      { q: "What if our organization has real infrastructure or connectivity constraints?", a: "That gets scoped in from the start, not discovered after launch. It's a real consideration for organizations working in regions with less reliable infrastructure." },
      { q: "Can staff with no technical background actually maintain it?", a: "Yes, that is the specific point of the custom CMS: no developer dependency for routine updates." },
    ],
  },
  {
    slug: "personal-brand",
    image: "/images/showcase/personal-brand-krugunn.jpg",
    name: "Portfolio & Personal Brand Sites",
    icon: "user",
    tagline: "A site that gets you picked, not just seen",
    painPoint: "A resume PDF or a generic template portfolio that does not actually show what it is like to work with you, or why you're worth choosing over the next name on the list.",
    impact: "A portfolio that only lists projects reads like a CV. A portfolio that shows the problem, the build, and the result reads like proof, and proof is what gets a reply.",
    whatYouGet: [
      "Case studies structured around the client's actual journey and outcome, not just a screenshot and a paragraph",
      "A clear, direct positioning statement so a visitor knows in one glance what you do and who it's for",
      "A booking or contact flow that captures real project intent, not just a bare email link",
      "Video-first layout options for work that is better shown moving than static",
    ],
    journey: [
      { stage: "Free Demo", detail: "Go through the existing work and figure out which projects actually prove the pitch." },
      { stage: "Scope", detail: "Foundation or Growth-tier scope agreed, depending on how much case-study depth is needed." },
      { stage: "Build", detail: "Built around real project narratives, not generic portfolio filler." },
      { stage: "Launch", detail: "Live and ready to send to the next opportunity." },
      { stage: "Grow", detail: "New case studies added as new work wraps." },
    ],
    investmentNote: "Foundation to Growth-tier scope depending on depth, see the Pricing page.",
    faqs: [
      { q: "What if I do not have many finished projects yet?", a: "Unlaunched demos, self-initiated rebuilds, and internal tools all count as real proof of skill, they just get framed honestly as what they are." },
      { q: "Can this double as a lead-gen site, not just a resume?", a: "Yes, that is the actual goal, a booking flow and clear positioning turn a portfolio into a pipeline, not just a gallery." },
    ],
  },
  {
    slug: "agency-hub",
    image: "/images/showcase/agency-hub-horizon.jpg",
    name: "Multi-Service Agency Hubs",
    icon: "layers",
    tagline: "One site, many services, one clear path to each",
    painPoint: "A business offering multiple service lines squeezed onto one page, so visitors cannot tell which service applies to them or how to ask about it.",
    impact: "A visitor who cannot immediately find the service they need leaves and finds a competitor with a clearer site, even if your actual work is better.",
    whatYouGet: [
      "A dedicated page per service line, each with its own pitch, proof, and call to action",
      "A request-a-quote flow that routes inquiries by service, not one generic contact form for everything",
      "A clear services taxonomy so visitors self-select into the right offering fast",
      "Optional client portal for ongoing project visibility",
    ],
    journey: [
      { stage: "Free Demo", detail: "Map out the actual service lines and how customers currently find (or fail to find) each one." },
      { stage: "Scope", detail: "Enterprise-tier scope agreed, covering the multi-service structure and portal if needed." },
      { stage: "Build", detail: "Each service line built out with its own dedicated page and proof." },
      { stage: "Launch", detail: "Live, with routing tested so inquiries land where they should." },
      { stage: "Grow", detail: "New service lines added as the business expands." },
    ],
    investmentNote: "Enterprise-tier scope, see the Pricing page.",
    faqs: [
      { q: "How is this different from just a normal multi-page site?", a: "The structure is built around routing visitors and inquiries to the right service line specifically, not just listing pages under one nav." },
    ],
  },
  {
    slug: "learning-platforms",
    image: "/images/showcase/learning-learnhub.jpg",
    name: "Learning Platforms & LMS",
    icon: "database",
    tagline: "Sell and deliver a course without chasing payments in a chat app",
    painPoint: "Course content scattered across a Drive folder and a group chat, payment collected manually, and no real way to track who has actually finished what.",
    impact: "Every manual step between someone wanting to pay and actually getting access is a chance for them to change their mind, or for you to lose track of who paid for what.",
    whatYouGet: [
      "A course catalog with video hosting or streaming built in, not a public Drive link",
      "Per-course or subscription payment gating, so access is automatic on payment",
      "Quizzes, progress tracking, and certificates where the course calls for it",
      "Role-based accounts, student, instructor, and admin, so the right people see the right things",
    ],
    journey: [
      { stage: "Free Demo", detail: "Walk through how the course is currently delivered and where people drop off or get confused." },
      { stage: "Scope", detail: "Commerce-tier scope covering course structure, payment gating, and any certification needs." },
      { stage: "Build", detail: "Course catalog and content layer built and populated together, not handed over empty." },
      { stage: "Launch", detail: "Live, tested with a real enrollment and payment run-through before students see it." },
      { stage: "Grow", detail: "Ongoing course and lesson uploads available as a monthly add-on." },
    ],
    investmentNote: "Commerce-tier scope, see the Pricing page for the range.",
    faqs: [
      { q: "Can students pay per course instead of a subscription?", a: "Yes, both per-course and subscription payment gating are supported, scoped to whichever fits the business." },
      { q: "Do you host the video, or does it embed from somewhere else?", a: "Either, depending on volume and budget, direct hosting for full control, or an embedded streaming provider to keep costs down." },
    ],
  },
  {
    slug: "directory-listing",
    image: "/images/showcase/directory-localfind.jpg",
    name: "Directory & Listing Sites",
    icon: "user",
    tagline: "A searchable list of things, that people can actually search",
    painPoint: "A real-estate portfolio, job board, or local business list that lives in a spreadsheet or a static page nobody can filter or search.",
    impact: "Listings that cannot be filtered or searched get skimmed once and abandoned, no matter how good the underlying inventory is.",
    whatYouGet: [
      "Searchable, filterable listings, by category, location, price, or whatever dimension actually matters",
      "A clean submission or admin flow for adding and updating listings without a developer",
      "Category and location-based browsing built in from the structure, not bolted on after",
      "SEO structured data per listing, so individual listings can rank on their own",
    ],
    journey: [
      { stage: "Free Demo", detail: "Understand what's being listed, how it's filtered today, and what a good search actually needs to do." },
      { stage: "Scope", detail: "Growth or Commerce-tier scope depending on listing volume and submission workflow." },
      { stage: "Build", detail: "Search and filter logic built and tested against real listing data, not placeholder rows." },
      { stage: "Launch", detail: "Live with the current listing set imported and searchable." },
      { stage: "Grow", detail: "Ongoing listing management available as a monthly add-on." },
    ],
    investmentNote: "Growth to Commerce-tier scope depending on volume, see the Pricing page.",
    faqs: [
      { q: "Can listings be added without a developer?", a: "Yes, that's the point, an admin or submission flow is part of the build so listings can be managed directly." },
      { q: "Does this work for a small number of listings too?", a: "Yes, the search and filter structure still helps even at a smaller scale, it just has more room to grow into." },
    ],
  },
];

export const PACKAGES = [
  {
    name: "Foundation",
    priceMinTHB: 5000,
    priceMaxTHB: 15000,
    bestFor: "A simple, credible presence, company profile or portfolio",
    includes: ["Up to 5 pages", "Mobile-responsive", "Basic SEO", "Contact form"],
  },
  {
    name: "Growth",
    priceMinTHB: 12000,
    priceMaxTHB: 25000,
    bestFor: "Lead generation, marketing site or booking platform",
    includes: ["Landing or booking pages", "Lead capture wired to a tracker dashboard", "1 marketing automation"],
    featured: true,
  },
  {
    name: "Commerce",
    priceMinTHB: 25000,
    priceMaxTHB: 40000,
    priceIsFloor: true,
    bestFor: "Selling directly, e-commerce or course platform",
    includes: ["Payment integration", "Inventory or course management", "Standard tracker dashboard"],
  },
  {
    name: "Enterprise",
    priceMinTHB: null,
    priceMaxTHB: null,
    bestFor: "Larger or multi-service, multi-language operations",
    includes: ["Multi-service hub or directory", "Client portal", "Multi-language support", "Full automation & security review"],
  },
];

export interface AddOn {
  name: string;
  cadence: string;
  why: string;
  /** Optional cost-anchor line: what the alternative (hiring someone, doing
   * nothing, or a one-off fix later) tends to run, so the monthly figure
   * reads as cheap insurance rather than a recurring bill nobody asked for.
   * No commitment required either way, month to month, cancel any time. */
  costAnchor?: string;
}

// Recurring services, sold standalone or bundled into any package above.
// The "why" line exists so this reads as an investment with a reason, not
// a line item, matching how the packages above are framed.
export const ADDONS: AddOn[] = [
  {
    name: "Website Maintenance",
    cadence: "Monthly",
    why: "Hosting, updates, and uptime monitoring handled before something breaks, not after a customer notices it first.",
    costAnchor: "A part-time webmaster to do this alone typically runs 8,000-15,000 THB/month elsewhere, this covers the same ground for less, no separate hire needed.",
  },
  {
    name: "Content Updates",
    cadence: "Monthly, weekly, or daily",
    why: "New pages, posts, and listing changes go live without you waiting on a developer's schedule.",
    costAnchor: "A dedicated content coordinator commonly runs 500-800 USD/month on their own, this is a fraction of that, and it's month to month, not a fixed contract.",
  },
  {
    name: "Promotional Updates",
    cadence: "Monthly, weekly, or daily",
    why: "Homepage banners and campaign sections swap on your timeline, useful for anyone running frequent offers.",
    costAnchor: "Bundled with Content Updates, it costs less than paying for the two separately, and either one can be paused the month you don't need it.",
  },
  {
    name: "Web Ad Campaign Management",
    cadence: "Monthly",
    why: "Meta, Google, and TikTok ads set up, targeted, and reported on, so ad spend is a tracked investment, not a guess.",
    costAnchor: "Agencies typically charge 15-20% of ad spend on top of a flat monthly retainer, often 500 USD or more before a single ad runs, this is scoped to be lighter than that.",
  },
  {
    name: "Marketing Retainer",
    cadence: "Monthly",
    why: "Content calendar, social scheduling, and email campaigns running on a cadence, so marketing keeps happening even on your busy weeks.",
    costAnchor: "A junior in-house marketer alone typically costs 15,000-25,000 THB/month before tools or ad spend, this covers the recurring work for meaningfully less, no severance or sick leave to plan around either.",
  },
  {
    name: "Website Security",
    cadence: "Monthly",
    why: "SSL, malware scanning, and access hardening on the site itself, the difference between a small fix and a full rebuild after something goes wrong.",
    costAnchor: "Cleaning up after an actual hack routinely costs more than several years of this add-on combined, this is the cheaper problem to have.",
  },
  {
    name: "SEO & Analytics Monitoring",
    cadence: "Monthly",
    why: "Ranking and traffic tracked with real recommendations, not just a dashboard nobody reads.",
    costAnchor: "Standalone SEO retainers elsewhere commonly start around 500 USD/month, this rides on top of a site already built to rank, so it starts lower.",
  },
  {
    name: "Lead & Tracker Dashboard Management",
    cadence: "Monthly",
    why: "Your pipeline stays current and followed up on, not a dashboard that quietly goes stale after month one.",
    costAnchor: "Cheaper than a part-time coordinator whose only job is chasing the pipeline, and it never forgets to follow up.",
  },
];

// Figures above are illustrative market ranges for positioning only, not a
// quote, real cost depends on the market and scope and gets confirmed on
// the free call before anything is billed.
export const ADDON_PRICING_DISCLAIMER =
  "Ballpark comparisons only, not a quote. Your actual add-on rate is confirmed on the free call, and every add-on is month to month, cancel any time.";

export const GENERAL_FAQS: ServiceFaq[] = [
  { q: "How do I get started?", a: "Book a free call, no pitch deck, no obligation. We talk through what you need and whether it's a fit." },
  { q: "Do you work with businesses outside Bangkok?", a: "Yes, everything is remote-friendly. Most communication happens over call, email, or LINE/WhatsApp." },
  { q: "What if I'm not sure what I need yet?", a: "That's normal, the free call exists exactly for that. We figure out the right scope together." },
  { q: "Do you offer ongoing support after launch?", a: "Yes, maintenance, content updates, and marketing retainers are all available add-ons, sold separately from the build." },
  { q: "Can you take over a project someone else started?", a: "Usually, yes. It depends on the state of the existing code and platform, worth a call to check." },
];

export const CLIENT_JOURNEY_TEMPLATE = [
  { step: "01", title: "Free Discovery Call", description: "We talk through the problem, not just the project, what's costing you leads, time, or trust right now." },
  { step: "02", title: "Scope & Quote", description: "A clear, fixed-scope proposal, what's built, what it costs, what it's expected to return. No open-ended hours." },
  { step: "03", title: "Build", description: "Regular milestone check-ins, not a black box for weeks. You see it taking shape before launch." },
  { step: "04", title: "Launch", description: "Deployed, tested, and handed off with documentation, you're never locked out of your own site." },
  { step: "05", title: "Grow", description: "Post-launch support and content-update options so the site keeps working after handoff, not just at delivery." },
];

export const PROJECTS: Project[] = [
  {
    slug: "mmg-website",
    title: "MMG, Migrants Monitoring Group",
    client: "Migrants Monitoring Group (MMG), delivered through CTC",
    url: "https://mmgmyanmar.org",
    category: "Web & Product",
    role: "Web Developer, CTC",
    period: "2026",
    summary: "A bilingual (English and Myanmar) website with a staff admin dashboard, built on Next.js and Supabase.",
    description: "Built through CTC: the full website for MMG with its own branding, program structure and copy. Staff can edit text and images themselves from an admin dashboard, with no developer needed.",
    approach: [
      "English and Myanmar language toggle across the whole site",
      "Admin dashboard where staff edit content, events and contact sections themselves",
      "Photo and media gallery organized by program, with five program pages",
      "Organization profile, events and activities page, donate and opportunity pages",
      "Contact form and newsletter signup connected to a Supabase database",
    ],
    tags: ["Next.js", "Supabase", "Bilingual", "CMS"],
    tools: ["Next.js", "Tailwind CSS", "Supabase", "Vercel"],
    logo: "/images/logos/mmg-logo.png",
    cover: { gradientFrom: "#0b1f3a", gradientTo: "#2a5fa8" },
  },
  {
    slug: "ctc",
    title: "Click to Create (CTC)",
    client: "Click to Create, co-founded",
    url: "https://ctcmyanmar.com",
    category: "Company & Tech",
    role: "Co-founder, IT & Technology",
    period: "Aug 2026 – Present",
    summary: "The company I co-founded. I run the technology side and built its bilingual website, admin and social presence.",
    description: "CTC's website is bilingual (English and Burmese) and fully editable through an admin dashboard. I build and maintain it, and I manage the company's social pages.",
    approach: [
      "Bilingual website with English and Burmese toggle",
      "Admin area for content, events, updates and messages",
      "Project brief and package request flow that arrives as a message in the admin",
      "Events with registration, and an updates section",
    ],
    tags: ["Next.js", "Supabase", "Bilingual", "Social Media"],
    tools: ["Next.js", "Tailwind CSS", "Supabase", "Vercel"],
    logo: "/images/logos/ctc-logo.png",
    cover: { gradientFrom: "#162a4a", gradientTo: "#8fb08a" },
  },
  {
    slug: "daw-na-yeik",
    title: "Daw Na Yeik, Odoo Business System",
    client: "Daw Na Yeik, Myanmar, delivered through CTC",
    category: "Business Systems",
    role: "Odoo Implementer, CTC",
    period: "2026",
    summary: "Accounting, project budgets, HR, purchasing and approvals in one Odoo system for a Myanmar organization.",
    description: "An Odoo setup that replaces spreadsheets and paper vouchers with one connected system: chart of accounts, project and donor tracking, advances and settlements, purchase approvals and budget against actual.",
    approach: [
      "Chart of accounts and cash and bank journals in MMK",
      "Analytic plans for donor, project, area, activity and staff, so every cost is tracked to its source",
      "Advance and settlement flow through Expenses, with budget against actual by activity",
      "Employee records, time off with Myanmar public holidays, and expense categories",
      "Purchasing with three-quote comparison, attachments and approval rules",
      "Training for staff, approvers and admin, with a short user guide",
    ],
    tags: ["Odoo", "Accounting", "Budgeting", "Approvals", "Training"],
    tools: ["Odoo Online"],
    cover: { gradientFrom: "#1a1a1a", gradientTo: "#714b67" },
  },
  {
    slug: "de-fabiano",
    title: "De Fabiano Bespoke Tailor",
    client: "De Fabiano Bespoke Tailor, Bangkok",
    category: "Web Development & Marketing",
    role: "Digital Marketing & Web Manager",
    period: "Jan 2026 – Present",
    summary:
      "Full digital presence built from zero, website, SEO, paid ads, and organic social, for a premium bespoke tailoring brand on Sukhumvit.",
    description:
      "Built and launched the complete company website from scratch, implemented SEO strategy, set up Google Analytics, and ran paid ad campaigns independently. Achieved international organic traffic across six countries within the first month.",
    challenge:
      "De Fabiano had no digital presence, no website, no tracking, no paid ads, and no content strategy. The goal was to build everything from zero and start generating real leads within weeks, not months.",
    journey: [
      { step: "Free Demo", title: "Free Demo", description: "Assessed the brand's actual position: strong in-store reputation, zero digital footprint." },
      { step: "Scope", title: "Scope", description: "Full-stack scope agreed: website, SEO, analytics, and paid ads, built and launched together, not phased over months." },
      { step: "Build", title: "Build", description: "Site, tracking, and ad campaigns all set up in parallel so nothing launched without the others already in place." },
      { step: "Launch", title: "Launch", description: "Live site, ads running, and social content publishing within the same week." },
      { step: "Grow", title: "Grow", description: "Ongoing management of content, ads, and site updates, still active today." },
    ],
    approach: [
      "Designed and built the full website structure, product pages, navigation, and UX using GoDaddy Website Builder, optimized for mobile-first since 70%+ of Bangkok traffic is mobile",
      "Implemented on-page SEO across all pages: keyword research targeting 'Bangkok bespoke tailor', 'custom suit Bangkok', structured metadata, and alt tags throughout",
      "Set up Google Analytics and Google Search Console from scratch to establish baseline tracking before launch",
      "Launched Meta Ads campaigns simultaneously across cold and warm audiences, skipping awareness phase entirely since the brand needed leads, not impressions",
      "Created all social media content: product posts, reels, promotional content, and brand storytelling across Facebook and Instagram",
      "Managed ongoing website operations, product uploads, pricing updates, and inventory adjustments week-to-week, the same product-catalog and stock-management work an e-commerce store runs on, just for a made-to-order product instead of shelf stock",
    ],
    outcomes: [
      "1,400+ organic visitors in the first 30 days, from zero",
      "+1,400% week-on-week user growth in month one",
      "14,000+ ad impressions generated in one week at ฿300/day spend",
      "~20 qualified leads generated from a single week of paid campaigns",
      "83/100 Google PageSpeed performance score on launch",
      "Organic international reach across USA, Hong Kong, Switzerland, Austria, Taiwan, and Thailand, with no paid international targeting",
    ],
    metrics: [
      { value: "1,400+", label: "Organic Monthly Visitors" },
      { value: "+1,400%", label: "WoW Growth" },
      { value: "14K+", label: "Ad Impressions/wk" },
      { value: "~20", label: "Leads/week" },
      { value: "83/100", label: "Performance Score" },
      { value: "6", label: "Countries Reached" },
    ],
    tags: ["Web Development", "SEO", "Meta Ads", "Social Media", "E-Commerce", "Analytics"],
    tools: ["GoDaddy Website Builder", "Meta Ads Manager", "Google Analytics", "Google Search Console", "Canva", "Adobe Premiere Pro"],
    url: "https://defabiano.com",
    logo: "/images/logos/defabiano-logo.png",
    cover: { gradientFrom: "#1a2332", gradientTo: "#4a7fa5" },
    staticShowcase: [
      {
        label: "Home",
        url: "https://defabiano.com/home",
        heroImage: "https://img1.wsimg.com/isteam/ip/67ab67ce-c960-462a-af80-096829e33a41/photo.jpg",
        blocks: [
          { type: "heading", text: "Custom Bespoke Tailoring Services in Bangkok" },
          {
            type: "paragraph",
            text: "Bespoke suits built around fit, premium fabric, and detail, designed for comfort and lasting style, with booking and collection links front and center.",
          },
          {
            type: "features",
            features: [
              { title: "Men", description: "Sharp, precisely tailored suits and shirts." },
              { title: "Women", description: "Custom blazers, formal dresses, and occasion wear." },
              { title: "Children", description: "Bespoke formal and school wear built for growing frames." },
            ],
          },
          {
            type: "paragraph",
            text: "18+ years of tailoring experience, with a trust section pulling in 5-star ratings from Google and TripAdvisor to build confidence before booking.",
          },
        ],
      },
      {
        label: "Product",
        url: "https://defabiano.com/product",
        blocks: [
          { type: "heading", text: "Suits, Shirts & Occasion Wear, Made to Measure" },
          {
            type: "paragraph",
            text: "Product catalogue organized by category, each item shown with fabric swatches, pricing guidance, and a direct 'Book a Fitting' path rather than an add-to-cart flow, matching how bespoke buying actually works.",
          },
          {
            type: "features",
            features: [
              { title: "Business Suits", description: "Two and three-piece suits, single or double-breasted." },
              { title: "Formal Shirts", description: "Made-to-measure dress shirts in cotton and cotton-blend fabrics." },
              { title: "Occasion Wear", description: "Wedding suits, blazers, and event-specific tailoring." },
            ],
          },
        ],
      },
      {
        label: "About",
        url: "https://defabiano.com/about-us",
        blocks: [
          { type: "heading", text: "Two Decades of Bespoke Craft" },
          {
            type: "paragraph",
            text: "Founded by three brothers in 2006, the brand story blends traditional tailoring with modern design, built on personalized service across every garment.",
          },
          {
            type: "features",
            features: [
              { title: "20+ Years Experience", description: "A tailoring house trusted by local and international clients alike." },
              { title: "Premium Fabric Selection", description: "Sourced from respected textile mills." },
              { title: "Precision Craftsmanship", description: "Careful measurement and detailed finishing on every piece." },
              { title: "Worldwide Shipping", description: "Custom garments delivered internationally, securely packaged." },
            ],
          },
        ],
      },
      {
        label: "Services",
        url: "https://defabiano.com/service",
        blocks: [
          { type: "heading", text: "Elevating Style Through Exceptional Service" },
          {
            type: "features",
            features: [
              { title: "Bespoke Tailoring", description: "Fully custom suits and shirts, drafted individually for each client." },
              { title: "Alterations & Repairs", description: "Precise adjustments so garments fit exactly right." },
              { title: "Branding Clothes", description: "Custom corporate and promotional apparel." },
              { title: "Shuttle Service", description: "Pickup from hotels for fittings and collection." },
              { title: "Home Consultations", description: "Measurements and fittings without leaving your hotel." },
            ],
          },
          {
            type: "faq",
            faqs: [
              { q: "What materials do you work with?", a: "Wool, cotton, silk, linen, and specialty fabrics on request." },
              { q: "Is every garment drafted individually?", a: "Yes, each client gets a unique pattern, not an adjusted house block." },
              { q: "How many fittings are typically needed?", a: "Depends on complexity, usually one to two fittings for a precise result." },
            ],
          },
        ],
      },
      {
        label: "Fabric Gallery",
        url: "https://defabiano.com/premium-fabric-gallery",
        blocks: [
          { type: "heading", text: "Premium Fabric Gallery" },
          {
            type: "paragraph",
            text: "Visual swatch gallery organized by fabric type, wool, cotton, linen, silk blends, so clients can pick fabric before booking a fitting, cutting down back-and-forth during consultations.",
          },
          {
            type: "list",
            items: [
              "Wool suiting, Italian and English mill sources",
              "Premium cotton shirting in solid and pattern weaves",
              "Linen and linen-blend for warm-weather tailoring",
              "Silk accents for formal and occasion pieces",
            ],
          },
        ],
      },
      {
        label: "How We Work",
        url: "https://defabiano.com/how-we-work",
        blocks: [
          { type: "heading", text: "From Measurement to Finished Garment" },
          {
            type: "list",
            items: [
              "Consultation, fabric, style, and fit preferences discussed in person or via home visit",
              "Measurement, full body measurements taken, unique pattern drafted per client",
              "First Fitting, initial garment shaped and adjusted to the client's exact body",
              "Final Fitting & Collection, finishing touches confirmed, garment collected or shipped",
            ],
          },
          {
            type: "paragraph",
            text: "Process page built to set expectations up front, reduces pre-booking questions and positions the shop as structured and professional rather than ad-hoc.",
          },
        ],
      },
      {
        label: "Our Store",
        url: "https://defabiano.com/our-store",
        blocks: [
          { type: "heading", text: "Visit the Showroom" },
          {
            type: "paragraph",
            text: "Located on Sukhumvit Road near Thonglor BTS, a short walk from the station, with clear directions for both walk-in and destination clients.",
          },
          {
            type: "list",
            items: [
              "762/12 Sukhumvit Road, Sukhumvit Soi 32, Khlong Tan, Khlong Toei, Bangkok 10110",
              "Phone / WhatsApp booking available",
              "By-appointment fittings recommended",
            ],
          },
        ],
      },
      {
        label: "Contact",
        url: "https://defabiano.com/contact-us",
        blocks: [
          { type: "heading", text: "Book a Fitting or Ask a Question" },
          {
            type: "paragraph",
            text: "Contact form plus direct phone/WhatsApp booking, built to capture leads immediately rather than routing everyone through a generic inbox.",
          },
          {
            type: "list",
            items: [
              "Contact form: name, phone, preferred date, garment type",
              "Direct WhatsApp booking link",
              "Shuttle service pickup requests handled via the same form",
            ],
          },
        ],
      },
      {
        label: "Blog",
        url: "https://defabiano.com/blogs",
        blocks: [
          { type: "heading", text: "Style Guides & Tailoring Tips" },
          {
            type: "paragraph",
            text: "Editorial content built for SEO, fabric care guides, 'how to choose a suit fit', and seasonal style posts, targeting search terms like 'bespoke tailor Bangkok' beyond the product pages alone.",
          },
        ],
      },
      {
        label: "Policies",
        url: "https://defabiano.com/terms-conditions",
        blocks: [
          { type: "heading", text: "Terms, Privacy & Shipping" },
          {
            type: "paragraph",
            text: "Standard policy pages, Terms & Conditions, Privacy Policy, and Shipping & Returns, required for the international shipping option and to support the paid ad campaigns running to cold traffic.",
          },
          {
            type: "list",
            items: [
              "Terms & Conditions",
              "Privacy Policy",
              "Shipping & Returns Policy",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "hazel-portfolio",
    title: "Hazel Chan, Portfolio Site",
    client: "Aye Chan Pwint Phyu (Hazel)",
    category: "Web & Product",
    role: "Full-Stack Web Developer",
    period: "Jun 2026",
    summary:
      "A full multi-page React portfolio site built and deployed for a social media marketer and program designer, with project galleries, image carousels, and lightbox viewing.",
    description:
      "Designed and built a complete React portfolio site from scratch. Multi-page, fully animated, with project case studies, image carousels, and a working contact form. Deployed on Vercel with continuous deployment from GitHub.",
    challenge:
      "Hazel needed a professional portfolio fast, she had a range of projects (student union leadership, program design, youth entrepreneurship events) but no central place to show them, no technical background to maintain it herself, and no budget for a design agency.",
    journey: [
      { step: "Free Demo", title: "Free Demo", description: "Reviewed Hazel's existing work across student leadership, program design, and events, scattered with no central home." },
      { step: "Scope", title: "Scope", description: "Foundation-tier scope agreed: a multi-page portfolio site with galleries and a working contact form." },
      { step: "Build", title: "Build", description: "Built on React and Vite so the site stays maintainable without an ongoing agency retainer." },
      { step: "Launch", title: "Launch", description: "Deployed on Vercel with continuous deployment from GitHub, live and ready to share." },
    ],
    approach: [
      "Chose React + TypeScript + Vite + Tailwind, same stack that powers modern startup sites, giving Hazel a professional-grade site she can maintain with simple file edits",
      "Designed a dark, minimal aesthetic (near-black background, violet accent) that positions her as a modern creative professional rather than a student",
      "Built a project detail system with a reusable ProjectDetail component, each project gets its own full case study page, image carousel with click-to-expand lightbox, and highlights section",
      "Added category filtering on the Projects page (All / Competition / Educational) so recruiters can browse by what's relevant to them",
      "Wired up GitHub + Vercel continuous deployment, every change Hazel needs just gets pushed and goes live automatically, no re-deploying manually",
      "Embedded her PromptPay QR code and bank details directly into the contact flow for her freelance/coordination work",
    ],
    outcomes: [
      "Full portfolio live at hazelchan.vercel.app within days of starting",
      "7 project case studies with custom descriptions, tags, and gallery images",
      "Fully mobile-responsive, works on the devices her network actually uses",
      "Continuous deployment set up, Hazel can now update her portfolio by editing a single content file and pushing, no code knowledge needed",
      "Image carousel + lightbox on all projects, full-resolution photo viewing without leaving the page",
    ],
    metrics: [
      { value: "7", label: "Project Case Studies" },
      { value: "6", label: "Pages Built" },
      { value: "<1wk", label: "Delivery Time" },
      { value: "100%", label: "Mobile Responsive" },
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Vercel", "GitHub", "Portfolio Design"],
    tools: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "Vercel", "GitHub"],
    url: "https://hazelchan.vercel.app",
    logo: "/images/logos/hazel-logo.png",
    cover: { gradientFrom: "#7456c9", gradientTo: "#cdbdf5" },
    showcasePages: [
      {
        label: "Home",
        url: "https://hazelchan.vercel.app/",
        description: "The homepage I designed for Hazel, animated hero with TypeAnimation role cycling, stats, and a clean introduction. Violet-on-dark palette chosen to match her creative professional positioning.",
      },
      {
        label: "Projects",
        url: "https://hazelchan.vercel.app/projects",
        description: "Project grid with category filter tabs (All / Competition / Educational). Each card shows a thumbnail, date, and summary, designed to let recruiters scan quickly.",
      },
      {
        label: "RIC Student Union",
        url: "https://hazelchan.vercel.app/projects/ric-student-union",
        description: "Example project detail page, photo carousel at the top (Panel Moderator slide + RIC Projects overview), highlighted MC role callout box, and full event breakdown.",
      },
      {
        label: "Zebra Camp & Pitch",
        url: "https://hazelchan.vercel.app/projects/zebra-camp-pitch-2026",
        description: "Zebra Seed for Change case study, welcome banner as cover image, Z.E.B.R.A. framework breakdown, stats, program journey, and Wattanawittayalai Academy MC highlight.",
      },
      {
        label: "Experience",
        url: "https://hazelchan.vercel.app/experience",
        description: "Experience timeline page with education, certifications, and work history laid out in a clean vertical timeline structure.",
      },
      {
        label: "Contact",
        url: "https://hazelchan.vercel.app/contact",
        description: "Contact page with mailto form, clicking Send My Message opens the user's email client pre-filled with Hazel's address and the message content.",
      },
    ],
  },
  {
    slug: "feni-marketing",
    title: "Fen-i, Marketing Lead & Strategist",
    client: "Future Education Network International (Fen-i)",
    category: "Marketing & Strategy",
    role: "Marketing Lead & Strategist",
    period: "Jun 2026 – Aug 2026",
    summary:
      "Owned the full marketing lifecycle for Fen-i's education programmes, strategy, lead generation, paid ads, content, and website infrastructure, reporting directly to the CEO & Founder.",
    description:
      "Owned Fen-i's full marketing function across the entire funnel, brand awareness through enrollment and retention, for Young CEO Programme, Startup Pathway, and Feni Online Courses. Covered strategy, paid campaigns, content direction, lead tracking, GA4/GTM setup, and developer handouts for the fenispace.com marketing pages.",
    challenge:
      "Fen-i needed a Marketing Lead who could own strategy and execution at once across multiple live programmes, each with different audiences and price points, while fixing a conversion funnel stuck at 1.8%, and building the reporting systems and developer specs a growing team could eventually run without relying on one person.",
    journey: [
      { step: "Onboarding", title: "Onboarding", description: "Took over marketing across Young CEO Programme, Startup Pathway, and Feni Online Courses at once, each with different audiences and price points." },
      { step: "Diagnose", title: "Diagnose", description: "Identified the lead-to-enrollment bottleneck stuck at 1.8% and where in the funnel it was actually breaking down." },
      { step: "Rebuild", title: "Rebuild", description: "Rebuilt the funnel around human takeover at high-ticket decision points, with GA4/GTM tracking wired in to measure it properly." },
      { step: "Scale", title: "Scale", description: "Campaign management, content direction, and developer handouts for fenispace.com." },
    ],
    approach: [
      "Owned full Fen-i marketing strategy, brand positioning, audience targeting, campaign phasing, and channel mix across Facebook, Instagram, YouTube, and LINE OA",
      "Planned and launched cohort campaigns for Young CEO Programme (4-week entrepreneurship programme, ages 7–18, THB 49,000) from trial class through full enrollment, first cohort Jul 7–Aug 5",
      "Drove enrollment for Startup Pathway toward a 100-active-student target by December 2026 (12–14 new students/month)",
      "Built and managed lead generation campaigns across Facebook, Instagram, LINE OA, and Messenger, tracking funnel stage from Intake to Qualified to Converted",
      "Diagnosed a lead-to-enrollment bottleneck at 1.8% and recommended human takeover on high-ticket decision points instead of AI-handled responses, targeting 5%+ conversion",
      "Briefed, managed, and reported weekly on Meta Ads performance (CPM, CPC, CPR, reach, message conversions) across all Fen-i programmes",
      "Planned the Fen-i content calendar and briefed the content team on bilingual (Thai-first) captions, hook-based reels, and CEO/business-owner-parent targeted messaging",
      "Owned marketing requirements for fenispace.com, landing pages, courses page, registration forms, and coordinate development with Application Support, delivering flowcharts, wireframes, copy, and developer handout docs covering registration flow, placement test flow, and certificate delivery",
      "Managed GA4 + GTM setup, Meta Pixel installation, and UTM link discipline across every campaign for accurate lead-source attribution",
    ],
    outcomes: [
      "Young CEO trial campaign: 11,810 impressions, 8,696 reach, ฿1.45 CPC, ฿50.63 cost/message",
      "2 confirmed Young CEO enrollments + 13 warm leads within the first cohort window",
      "Full funnel diagnosis delivered: 52 Intake → 7 Qualified → 1 Converted, with a human-takeover fix recommended to lift conversion from 1.8% toward a 5%+ target",
      "Developer handout package delivered for fenispace.com covering site flowchart, registration flow, placement test flow, and certificate delivery",
      "GA4, GTM, and Meta Pixel tracking gaps identified and flagged as priority attribution fixes",
      "Weekly KPI dashboard built covering social engagement, leads, conversion, content, enrollments, and revenue",
    ],
    metrics: [
      { value: "3", label: "Programmes Marketed" },
      { value: "5%+", label: "Conversion Target (from 1.8%)" },
      { value: "฿1.45", label: "CPC, Young CEO" },
      { value: "฿50.63", label: "Cost / Message" },
      { value: "100", label: "Startup Pathway Target" },
      { value: "11.8K", label: "Trial Campaign Impressions" },
    ],
    tags: ["Marketing Strategy", "Meta Ads", "Lead Generation", "GA4 / GTM", "Content Strategy", "Website Infrastructure"],
    tools: ["Meta Ads Manager", "Meta Business Suite", "Google Analytics 4", "Google Tag Manager", "Canva", "Microsoft Excel", "LINE OA", "WhatsApp Business"],
    logo: "/images/logos/feni-logo.png",
    cover: { gradientFrom: "#0f2027", gradientTo: "#2c5364" },
  },
  {
    slug: "zebra-camp-pitch",
    title: "Zebra Camp & Pitch International",
    client: "Zebra Camp & Pitch International (a Fen-i brand)",
    category: "Marketing & Strategy",
    role: "Marketing Lead & Strategist",
    period: "Jun 2026 – Aug 2026",
    summary:
      "Standalone brand campaign for a youth entrepreneurship pitch competition, landing page strategy, 5-step registration funnel, event marketing, and a live paid ad budget.",
    description:
      "Owned marketing for Zebra Camp & Pitch as its own brand, separate from Fen-i's core programmes, landing page conversion strategy, the multi-step registration flow at fenispace.com/zebra, school roadshow lead generation, sponsor outreach, and a phased paid ad campaign building toward the Sep 4–6 event.",
    challenge:
      "Zebra needed to launch as a credible standalone brand fast, a live registration site with role-based signup (Student / Parent / School), a phased ad budget to hit registration milestones before a hard registration close (Jul 31), and offline lead generation through school roadshows, all while proving out a category with no direct competitor in Thailand/SEA to benchmark against.",
    journey: [
      { step: "Launch Strategy", title: "Launch Strategy", description: "Positioned Zebra Camp as its own standalone brand, separate from Fen-i's core programmes, with no direct local competitor to benchmark against." },
      { step: "Build the Funnel", title: "Build the Funnel", description: "Mapped role-based signup (Student/Parent/School) into a 5-step registration flow, pricing shown only at Step 3 to avoid early drop-off." },
      { step: "Drive Registrations", title: "Drive Registrations", description: "Ran a phased ad budget alongside school roadshows and sponsor outreach, working toward the hard Jul 31 registration close." },
      { step: "Event", title: "Event", description: "Delivered registrations ahead of the Sep 4 to 6 event date." },
    ],
    approach: [
      "Built campaign strategy for fenispace.com/zebra, the landing page's single job is driving clicks to Register, with every section built to answer objections and build trust before the CTA",
      "Mapped the role-based Register dropdown (Student / Parent / School) into the 5-step, mobile-first registration flow at /zebra/register, pricing shown only at Step 3 to avoid early drop-off",
      "Built and got approved a THB 15,700 ad budget across a 3-phase, 41-day campaign structure, phased to hit registration milestones ahead of the Jul 31 registration close and Sep 4–6 event",
      "Launched Meta Ads cold + warm audiences simultaneously, skipping the awareness phase since organic presence was already active",
      "Ran the Zebra Seeds school roadshow at Wattana School as MC and Project Manager, collected 62 leads from 68 attending students (91% collection rate)",
      "Set UTM structure across every channel, organic social, paid ads, email (zebra_seeds / zebra_urgency), and WhatsApp outreach, so registration source is attributable end-to-end",
      "Negotiated Gold Sponsorship (THB 20,000) outreach to Udefined Tech Academy for the Northern Roboding Challenge tie-in",
      "Tracked the registration funnel weekly against the Jul 31 close date to catch drop-off early",
    ],
    outcomes: [
      "91% lead collection rate at the Wattana School roadshow (62 of 68 attending students)",
      "THB 15,700 ad budget approved and live across a 3-phase, 41-day campaign structure",
      "5-step mobile-first registration flow live at fenispace.com/zebra/register with GTM + GA4 tracking installed",
      "Competitor analysis confirmed no direct competitor for Zebra Pitch's category in Thailand/SEA",
      "Full UTM attribution structure live across organic, paid, email, and WhatsApp channels ahead of ad scale-up",
      "Gold Sponsorship outreach to Udefined Tech Academy (THB 20,000)",
    ],
    metrics: [
      { value: "91%", label: "Lead Capture Rate" },
      { value: "62", label: "Leads from Roadshow" },
      { value: "฿15,700", label: "Ad Budget Approved" },
      { value: "41-day", label: "3-Phase Campaign" },
      { value: "5-step", label: "Registration Flow" },
      { value: "Jul 31", label: "Registration Close" },
    ],
    tags: ["Campaign Management", "Event Marketing", "Meta Ads", "Registration Funnel", "Sponsorship", "UTM Attribution"],
    tools: ["Meta Ads Manager", "Meta Business Suite", "Google Analytics 4", "Google Tag Manager", "Canva", "Microsoft Excel", "LINE", "WhatsApp Business"],
    url: "https://fenispace.com/zebra",
    logo: "/images/logos/zebra-logo.png",
    cover: { gradientFrom: "#444733", gradientTo: "#1a1a1a" },
  },
  {
    slug: "mtss-myittasonesee",
    title: "MTSS (Myittasonesee), Nonprofit Platform & Admin CMS",
    client: "Myittasonesee (MTSS), Mon State CSO, Myanmar",
    category: "Web Development & Custom Software",
    role: "Full-Stack Developer",
    period: "Sep 2026",
    summary:
      "A bilingual donor platform for a Myanmar nonprofit, built with its own admin system so staff can update content without a developer, ever again.",
    description:
      "MTSS needed a site donors could trust and staff could actually maintain. Delivered a bilingual (English/Myanmar) platform with real donation and program pages, plus a custom-built admin CMS with live-preview editing, a $3,000–$6,000 scope of work for a client that needed it to just work, in a country with real infrastructure constraints.",
    challenge:
      "MTSS had no way to showcase individual programs to donors, no real donation flow, and, the real blocker, no way for staff to update the site themselves. Every text change meant waiting on a developer. For a small nonprofit team, that's not sustainable, and it quietly discourages the org from keeping the site current.",
    approach: [
      "Built individual program pages with donor-facing detail, photo galleries, and direct donate CTAs",
      "Designed a multi-step donation flow with tiered amounts and live impact statements per tier",
      "Built a custom admin CMS from scratch, auth, database, a live-preview editor showing real draft changes on the real site before publishing",
      "Added a photo upload manager so placeholder tiles get replaced with real photography with zero code changes",
      "Deployed and supported through a region with real connectivity constraints, walked the client through Supabase and Vercel setup end to end",
    ],
    journey: [
      { step: "01", title: "The Problem", description: "A nonprofit site nobody on staff could update, every change was a bottleneck." },
      { step: "02", title: "Scope & Quote", description: "Fixed scope: bilingual site rebuild + a from-scratch admin CMS, not an off-the-shelf plugin." },
      { step: "03", title: "Build", description: "Donation flow, program pages, and a live-preview editor built and reviewed in stages." },
      { step: "04", title: "Launch", description: "Deployed to a real custom domain, with staff logins created and handed over." },
      { step: "05", title: "Result", description: "Staff edit and publish content themselves, zero developer dependency going forward." },
    ],
    outcomes: [
      "Fully bilingual (English/Myanmar) donor platform, live on a real custom domain",
      "Staff edit every section of the site themselves, text, programs, photos, with zero developer involvement",
      "Live-preview editing: staff see their exact changes before anything goes public",
      "A complete donation flow and program pages built where none existed before",
    ],
    metrics: [
      { value: "$3–6K", label: "Project Value" },
      { value: "100%", label: "Admin-Editable" },
      { value: "2", label: "Languages" },
      { value: "0", label: "Dev Hours Needed to Update Content, Post-Launch" },
    ],
    tags: ["Next.js", "TypeScript", "Supabase", "Custom CMS", "Framer Motion", "Nonprofit"],
    tools: ["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase", "Vercel"],
    url: "https://www.myittasonesee.org/",
    logo: "/images/logos/mtss-logo.png",
    cover: { gradientFrom: "#1a0f0d", gradientTo: "#4a1015" },
  },
  {
    slug: "de-fabiano-rebuild",
    title: "De Fabiano, Custom E-Commerce Rebuild",
    client: "De Fabiano Bespoke Tailor, Bangkok",
    category: "Web & Product",
    role: "Full-Stack Developer",
    period: "2026",
    summary:
      "A self-initiated full e-commerce rebuild, showing De Fabiano what a real custom platform looks like beyond a page-builder site.",
    description:
      "Already running De Fabiano's marketing and site-builder website day to day, I built a full custom Next.js e-commerce version, real cart, checkout, and booking flow, as a proactive upgrade pitch, not a client request. It's the difference between a template site and owned infrastructure.",
    challenge:
      "The existing site (built on a page builder) covers marketing fine, but has no real cart, checkout, or booking system, every product inquiry and appointment still runs through manual messages, capping how much De Fabiano can scale bookings without more staff time.",
    approach: [
      "Built a full custom e-commerce flow, product catalog, cart, checkout, and appointment booking, replacing manual message-based ordering",
      "Designed it to be honest about what's placeholder vs. real: product photography and payment gateway are clearly marked as next steps, not hidden",
      "Structured the codebase as a reusable template, so the same build pattern can serve other bespoke/boutique retail clients",
    ],
    journey: [
      { step: "01", title: "The Problem", description: "Manual, message-based ordering, no real cart or booking system to scale on." },
      { step: "02", title: "The Pitch", description: "Built the upgrade myself as a working demo, not a proposal deck, De Fabiano could click through it." },
      { step: "03", title: "Build", description: "Full cart, checkout, and appointment booking flow, built on real e-commerce infrastructure." },
      { step: "04", title: "Next Step", description: "Product photography and live payment gateway are the two remaining pieces to go fully live." },
    ],
    outcomes: [
      "A working, clickable proof of what a real e-commerce platform looks like, not a slide deck pitch",
      "Reusable as a template for other boutique/bespoke retail clients",
      "Clear, honest scoping of what's left (photography, payment gateway) to go fully live",
    ],
    metrics: [
      { value: "Live", label: "Working Demo" },
      { value: "3", label: "Core Flows (Catalog/Cart/Booking)" },
    ],
    tags: ["Next.js", "TypeScript", "E-Commerce", "Tailwind CSS"],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    url: "https://defabiano.vercel.app",
    logo: "/images/logos/defabiano-logo.png",
    cover: { gradientFrom: "#1a1a1a", gradientTo: "#3a2a1a" },
  },
  {
    slug: "command-center",
    title: "Business Command Center, Internal Business OS",
    client: "Self-built internal system",
    category: "Web Application",
    role: "Full-Stack Developer",
    period: "2026",
    summary:
      "A self-hosted business dashboard with a real login, CRM pipeline, cashflow tracking and AI-assisted insights, running on infrastructure I own end to end.",
    description:
      "Pipeline, tasks and cashflow were scattered across spreadsheets, so I built a full frontend and backend command center to bring them into one place. It is a working application with real accounts and data, not a static dashboard mockup.",
    challenge:
      "No single view of what is happening in the business day to day: leads, follow-ups and cashflow lived in disconnected spreadsheets, with nothing rolling up into a clear picture of pipeline health.",
    approach: [
      "Node.js and Express backend with role-based login (admin with full access, viewer read-only), a REST API and a JSON-file database",
      "A 7-stage CRM pipeline in table and Kanban views, with qualification tracking, filters and a live funnel breakdown",
      "Daily activity logging that rolls up automatically into monthly goal tracking, so nobody compiles a status report by hand",
      "Tasks board, outreach log, client directory, service catalog and build status tracker",
      "Cashflow with period filters, invoices with Draft, Sent, Paid and Overdue states, and a runway and debt payoff tracker",
      "Reports with revenue by month, CSV and Excel import and export, plus full backup and restore",
      "An AI Insights feature that runs an evaluation over real pipeline and cashflow data using the owner's own API key",
    ],
    outcomes: [
      "One source of truth for pipeline, tasks and cashflow",
      "Self-hosted with full data ownership and no SaaS subscription dependency",
      "Daily logging habit reinforced by automatic goal roll-up",
      "A reusable pattern for pipeline, inventory and workflow dashboards",
    ],
    metrics: [
      { value: "15", label: "Modules" },
      { value: "7", label: "Pipeline Stages" },
      { value: "100%", label: "Self-Hosted" },
    ],
    tags: ["Node.js", "Express", "CRM", "Internal Tools", "AI Integration"],
    tools: ["Node.js", "Express", "Chart.js", "Vanilla JavaScript", "AI API Integration"],
    cover: { gradientFrom: "#0f1a14", gradientTo: "#1e3a2a" },
    screenshotNote: "Screens shown with sample data.",
    screenshots: [
      { src: "/images/projects/command-center/overview.jpg", caption: "Overview: KPI cards, daily targets, cash balance and leads by stage" },
      { src: "/images/projects/command-center/pipeline.jpg", caption: "Pipeline: lead CRM with funnel breakdown, filters and inline stage changes" },
      { src: "/images/projects/command-center/kanban.jpg", caption: "Kanban view of the 7-stage pipeline" },
      { src: "/images/projects/command-center/cashflow.jpg", caption: "Cashflow: income and expenses with period filters" },
      { src: "/images/projects/command-center/reports.jpg", caption: "Reports: revenue by month and leads by business line" },
      { src: "/images/projects/command-center/ai-insights.jpg", caption: "AI Insights: evaluation over live pipeline and cashflow data" },
    ],
  },
  {
    slug: "naw-gay-gay-portfolio",
    title: "Naw Gay Gay, Portfolio Site",
    client: "Naw Gay Gay",
    category: "Web & Product",
    role: "Web Developer",
    period: "2026",
    url: "https://naw-gay-gay-portfolio.vercel.app",
    summary:
      "A five-page personal site for an educator and youth advocate, with a story timeline, an impact page and a photo gallery with lightbox.",
    description:
      "Designed and built a complete multi-page portfolio in HTML, CSS and JavaScript, deployed on Vercel. It tells a personal story clearly: who she is, the path she took, the programs she has run, and how to reach her.",
    approach: [
      "Five pages: Home, About, Journey, Impact and Contact, with one consistent navigation and layout",
      "A journey page that maps eighteen years as a single continuous timeline",
      "An impact page covering community projects, certifications and a photo gallery with a lightbox viewer",
      "Scroll-reveal animations, a responsive mobile menu and a contact form",
      "Static build with no framework, so it loads fast and is simple to host and update",
    ],
    metrics: [
      { value: "5", label: "Pages" },
      { value: "0", label: "Frameworks, plain HTML/CSS/JS" },
    ],
    tags: ["HTML", "CSS", "JavaScript", "Portfolio", "Vercel"],
    tools: ["HTML", "CSS", "JavaScript", "Vercel"],
    cover: { gradientFrom: "#1f2d22", gradientTo: "#b8862b" },
    screenshots: [
      { src: "/images/projects/naw/home.jpg", caption: "Home: hero, headline and milestone strip" },
      { src: "/images/projects/naw/journey.jpg", caption: "Journey: eighteen years as one timeline" },
      { src: "/images/projects/naw/impact.jpg", caption: "Impact: projects, certifications and gallery" },
    ],
  },
];


export const SOCIAL_LINKS = [
  { label: "LinkedIn", value: SITE.linkedin },
];

// ──────────────────────────────────────────────────────────
// QUOTE PAGE DATA, Fen-i colleagues & friends rate card
// ──────────────────────────────────────────────────────────

export interface QuotePackage {
  id: string;
  tag: string;
  title: string;
  description: string;
  priceFriend: number;
  priceMarket: number;
  exampleSlug?: string;
  accent?: "green" | "gold";
  features: string[];
}

export const QUOTE_PACKAGES: QuotePackage[] = [
  {
    id: "pkg-1",
    exampleSlug: "hazel-portfolio",
    tag: "Starter",
    title: "Single Page Website",
    description: "Perfect for a simple online presence or personal brand",
    priceFriend: 2000,
    priceMarket: 5000,
    features: [
      "One page, all sections",
      "Mobile responsive design",
      "Hero, About, Services, Contact",
      "WhatsApp / LINE button",
      "Google Map embed",
      "Social media links",
      "Basic SEO setup",
      "Deployed & domain connected",
      "1 round of revision",
    ],
  },
  {
    id: "pkg-2",
    exampleSlug: "hazel-portfolio",
    tag: "Popular",
    title: "Multi-Page Portfolio",
    description: "For professionals and businesses who want to look established",
    priceFriend: 5000,
    priceMarket: 12000,
    features: [
      "3–5 pages (Home, About, Services, Portfolio, Contact)",
      "Custom homepage design",
      "Smooth animations & transitions",
      "Project / work showcase section",
      "Contact form + WhatsApp / LINE",
      "Google Analytics setup",
      "SEO for all pages",
      "Deployed & domain connected",
      "2 rounds of revision",
    ],
  },
  {
    id: "pkg-3",
    exampleSlug: "de-fabiano",
    tag: "Business",
    title: "E-Commerce (PromptPay/QR)",
    description: "Sell products online with Thai bank payment",
    priceFriend: 10000,
    priceMarket: 25000,
    accent: "green",
    features: [
      "All Multi-Page features included",
      "Product listings & categories",
      "Shopping cart system",
      "PromptPay / QR code checkout",
      "Order notification via email",
      "Basic inventory setup",
      "Admin panel training session",
      "3 rounds of revision",
    ],
  },
  {
    id: "pkg-4",
    exampleSlug: "de-fabiano",
    tag: "Premium",
    title: "E-Commerce Full",
    description: "Complete online store with international payment & user accounts",
    priceFriend: 18000,
    priceMarket: 40000,
    accent: "gold",
    features: [
      "All E-Commerce features included",
      "Stripe / international payment gateway",
      "Customer account & login system",
      "Order tracking & history",
      "Email confirmation automation",
      "Inventory management panel",
      "Blog / news section",
      "Advanced SEO optimization",
      "Priority support during build",
      "3+ rounds of revision",
    ],
  },
  {
    id: "pkg-5",
    tag: "Education",
    title: "E-Learning Basic",
    description: "Course pages, video embed & enrollment system",
    priceFriend: 15000,
    priceMarket: 30000,
    features: [
      "Course listing & detail pages",
      "Video embed (YouTube / Vimeo)",
      "Enrollment / contact form",
      "Instructor profile section",
      "Course curriculum layout",
      "PromptPay payment option",
      "Mobile responsive design",
      "SEO optimization",
      "2 rounds of revision",
    ],
  },
  {
    id: "pkg-6",
    tag: "Education+",
    title: "E-Learning Full",
    description: "Complete LMS with login, access control & progress tracking",
    priceFriend: 25000,
    priceMarket: 55000,
    accent: "green",
    features: [
      "All E-Learning Basic features",
      "Student login & account system",
      "Course access control",
      "Progress tracking per student",
      "Certificate generation",
      "Payment gateway (Stripe / PromptPay)",
      "Admin dashboard",
      "Email automation for students",
      "3+ rounds of revision",
    ],
  },
];

export interface QuoteAddon {
  id: string;
  title: string;
  description: string;
  price: number;
  recurring?: boolean;
}

export const QUOTE_ADDONS: QuoteAddon[] = [
  { id: "addon-1", title: "AI Chat Assistant", description: "Automated chatbot that answers customer questions 24/7", price: 5000 },
  { id: "addon-2", title: "Monthly Maintenance", description: "Updates, backups & security checks every month", price: 3000, recurring: true },
  { id: "addon-3", title: "SEO Boost Package", description: "Keyword research, meta setup & Google Search Console", price: 3000 },
  { id: "addon-4", title: "Social Media Integration", description: "Instagram feed, Facebook page & TikTok embedded", price: 2000 },
  { id: "addon-5", title: "Speed Optimisation", description: "Image compression, caching & Core Web Vitals tuning", price: 2500 },
  { id: "addon-6", title: "Multilingual Support", description: "English & Thai language toggle built into the site", price: 4000 },
  { id: "addon-7", title: "Custom Domain Email", description: "Professional email address at your own domain (e.g. info@yourbiz.com)", price: 1500 },
  { id: "addon-8", title: "Analytics Dashboard", description: "Live visitor stats, traffic sources & conversion tracking", price: 3500 },
];

export const WHY_ME = [
  { title: "Mobile-First by Default", description: "Over 70% of traffic in Thailand comes from phones. Every site I build works perfectly on every device." },
  { title: "Fast Turnaround", description: "No endless back-and-forth. Clear milestones, honest timelines, and regular updates throughout." },
  { title: "Real SEO, Not Fluff", description: "Proper metadata, structured data, and Google Search Console, so people can actually find you." },
  { title: "You Own Everything", description: "Domain, hosting, code, it's all yours. No lock-in, no recurring fees unless you want maintenance." },
  { title: "Thai Payment Ready", description: "PromptPay and QR checkout built in from the start, no third-party payment drama." },
  { title: "Flexible Scope", description: "Not sure exactly what you need? That's fine. We can figure out the scope together before anything is confirmed." },
];

export const QUOTE_PASSCODE = "feniclient2026";
export const QUOTE_FORMSPREE_ID = "mojozkzw";

// ---------------------------------------------------------------------------
// Homepage/mobile-rebuild additions
// ---------------------------------------------------------------------------

// Per-route SEO metadata, applied by useDocumentMeta(). Titles stay under
// ~60 chars, descriptions under ~155, and every one carries an actual
// keyword (service, location) instead of repeating the same generic line
// on every page.
export interface PageMeta {
  title: string;
  description: string;
}

export const PAGE_META: Record<string, PageMeta> = {
  "/": {
    title: "Saw Jimmy Moore | Marketing & Tech, Co-founder of CTC, Bangkok",
    description: "Co-founder of CTC and former marketing lead at Fen-i. Social media campaigns, analytics and the web and systems behind them.",
  },
  "/projects": {
    title: "Work | Saw Jimmy Moore",
    description: "Selected work: social campaigns for Fen-i and Zebra, the MMG and CTC websites, and an Odoo business system.",
  },
  "/about": {
    title: "About | Saw Jimmy Moore, Co-founder of CTC, Bangkok",
    description: "Co-founder of Click to Create, former marketing lead at Fen-i. Background in tech, marketing and social media.",
  },
  "/contact": {
    title: "Contact | Saw Jimmy Moore",
    description: "Get in touch about roles and projects. Based in Bangkok, Mon to Fri, 10:00 to 18:00 ICT.",
  },
};

// "Problems businesses actually have," used as one of the rotating item
// kinds in the homepage sphere gallery. Each routes straight to the service
// page that solves it, a lightweight self-diagnostic rather than another
// project tile. These are Jimmy's own framing of common pain points, not
// quotes from any client.
export interface ProblemPrompt {
  id: string;
  label: string;
  servicePath: string;
}

export const PROBLEM_PROMPTS: ProblemPrompt[] = [
  { id: "problem-no-leads", label: "My site gets visits but no inquiries", servicePath: "/services/web-development" },
  { id: "problem-manual-orders", label: "I still sell through DMs and invoices", servicePath: "/services/e-commerce" },
  { id: "problem-no-strategy", label: "I post content with no real strategy", servicePath: "/services/digital-marketing" },
  { id: "problem-double-booked", label: "Bookings happen over texts and calls", servicePath: "/services/booking-platforms" },
  { id: "problem-spreadsheets", label: "My team still runs on spreadsheets", servicePath: "/services/web-applications" },
];

// Real metric highlights pulled from PROJECTS/RESULTS, used as the "proof"
// item kind in the sphere gallery, actual numbers, not invented quotes.
export interface ResultHighlight {
  id: string;
  value: string;
  label: string;
  projectSlug: string;
}

export const RESULT_HIGHLIGHTS: ResultHighlight[] = [
  { id: "result-visitors", value: "1,400+", label: "Organic monthly visitors, De Fabiano", projectSlug: "de-fabiano" },
  { id: "result-growth", value: "+1,400%", label: "Week-on-week growth from zero", projectSlug: "de-fabiano" },
  { id: "result-cms", value: "Zero", label: "Developer dependency after CMS handoff, MTSS", projectSlug: "mtss-myittasonesee" },
];

// Display order for Home and Work. Social and campaign work leads, then
// delivery work. Anything not listed stays reachable by direct URL only.
export const FEATURED_ORDER = [
  "zebra-camp-pitch",
  "feni-marketing",
  "mmg-website",
  "daw-na-yeik",
  "ctc",
  "de-fabiano",
  "mtss-myittasonesee",
  "hazel-portfolio",
  "naw-gay-gay-portfolio",
  "command-center",
];

export const WHAT_I_LEAD = [
  {
    title: "Social media & campaigns",
    text: "Content calendars, paid campaigns and promotion, from Zebra Pitch and Young CEO at Fen-i to the CTC pages, planned around real program dates.",
  },
  {
    title: "Marketing strategy & analytics",
    text: "Campaign planning, monitoring and reporting with Google Analytics and Meta Ads, reviewed with founders and operations.",
  },
  {
    title: "Web & digital delivery",
    text: "Websites I design and build myself, so landing pages, tracking and content updates ship with the campaign.",
  },
  {
    title: "Systems & coordination",
    text: "Business systems such as Odoo, automation, and the training and handover that make a team actually use them.",
  },
];
