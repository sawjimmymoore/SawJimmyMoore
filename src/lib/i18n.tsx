import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "th";
const STORAGE_KEY = "jimmy-lang";

// Compact dictionary, covers navigation, CTAs, and section chrome across
// the site. Long-form case-study prose stays in English to keep this file
// small; only interface text is translated.
const dict = {
  nav_home: { en: "Home", th: "หน้าแรก" },
  nav_projects: { en: "Projects", th: "ผลงาน" },
  nav_services: { en: "Services", th: "บริการ" },
  nav_pricing: { en: "Pricing", th: "ราคา" },
  nav_experience: { en: "Experience", th: "ประสบการณ์" },
  nav_about: { en: "About", th: "เกี่ยวกับ" },
  nav_quote: { en: "Quote", th: "ขอราคา" },
  nav_contact: { en: "Contact", th: "ติดต่อ" },
  nav_get_in_touch: { en: "Get in Touch", th: "ติดต่อเลย" },

  hero_view_projects: { en: "View Projects", th: "ดูผลงาน" },
  hero_get_in_touch: { en: "Get In Touch", th: "ติดต่อฉัน" },

  footer_tagline: { en: "Let's create something\nthat works.", th: "มาสร้างสิ่งที่\nใช้งานได้จริงกัน" },
  footer_get_in_touch: { en: "Get in touch", th: "ติดต่อฉัน" },
  footer_sitemap: { en: "Sitemap", th: "สารบัญ" },
  footer_elsewhere: { en: "Elsewhere", th: "ช่องทางอื่น" },
  footer_rights: { en: "All rights reserved.", th: "สงวนลิขสิทธิ์" },
  footer_email_note: { en: "Email", th: "อีเมล" },

  section_selected_work: { en: "Selected Work", th: "ผลงานที่คัดสรร" },
  section_projects_built: { en: "Projects I've built", th: "โปรเจกต์ที่ฉันสร้าง" },
  view_all: { en: "View all", th: "ดูทั้งหมด" },
  view_case_study: { en: "View case study", th: "ดูกรณีศึกษา" },
  visit_live_site: { en: "Visit live site", th: "เยี่ยมชมเว็บไซต์จริง" },

  cta_project_in_mind: { en: "Have a project in mind?", th: "มีโปรเจกต์ในใจไหม?" },

  contact_title: { en: "Contact Me", th: "ติดต่อฉัน" },
  contact_name: { en: "Name", th: "ชื่อ" },
  contact_email: { en: "Email", th: "อีเมล" },
  contact_message: { en: "Message", th: "ข้อความ" },
  contact_send: { en: "Send message", th: "ส่งข้อความ" },
  contact_custom_checkbox: {
    en: "This is a custom / more complex request",
    th: "นี่เป็นคำขอที่กำหนดเอง / ซับซ้อนกว่าปกติ",
  },
  contact_custom_note: {
    en: "Flagged as custom, I'll read closely and may follow up with a few questions before quoting anything.",
    th: "ทำเครื่องหมายว่าเป็นคำขอพิเศษ, ฉันจะอ่านอย่างละเอียดและอาจถามกลับก่อนเสนอราคา",
  },

  quote_public_price_note: { en: "Market Rate", th: "ราคาตลาด" },
  quote_friend_price_note: { en: "Fen-i Colleague Rate", th: "ราคาพนักงาน Fen-i" },
  quote_unlock_link: { en: "Have an access code?", th: "มีรหัสส่วนลดไหม?" },
  quote_unlock_button: { en: "Unlock", th: "ปลดล็อก" },
  quote_custom_checkbox: {
    en: "None of these fit, I need something custom",
    th: "ไม่มีแพ็กเกจไหนตรงกับที่ต้องการ, ฉันต้องการแบบกำหนดเอง",
  },
  quote_custom_cta: {
    en: "No problem, tell me what you have in mind and I'll get back to you directly.",
    th: "ไม่มีปัญหา, บอกฉันว่าคุณต้องการอะไร แล้วฉันจะติดต่อกลับโดยตรง",
  },
  quote_custom_button: { en: "Go to Contact Form", th: "ไปที่ฟอร์มติดต่อ" },
  quote_hero_eyebrow: { en: "Fen-i Colleagues & Friends", th: "เพื่อนร่วมงาน Fen-i" },
  quote_hero_title: { en: "Building your digital presence the right way.", th: "สร้างตัวตนดิจิทัลให้คุณอย่างถูกต้อง" },
  quote_hero_subtitle: {
    en: "Browse packages at market rate, or unlock friend & colleague pricing with an access code.",
    th: "ดูราคาแพ็กเกจตามราคาตลาด หรือปลดล็อกราคาพิเศษด้วยรหัสส่วนลด",
  },
  quote_send_request: { en: "Send My Request", th: "ส่งคำขอ" },

  about_eyebrow: { en: "Background", th: "ภูมิหลัง" },
  about_title: { en: "About Me", th: "เกี่ยวกับฉัน" },
  experience_eyebrow: { en: "Career Path", th: "เส้นทางอาชีพ" },
  experience_title: { en: "Experience", th: "ประสบการณ์" },
  projects_eyebrow: { en: "Selected Work", th: "ผลงานที่คัดสรร" },
  projects_title: { en: "Projects", th: "ผลงาน" },

  theme_toggle: { en: "Toggle theme", th: "สลับธีม" },
  lang_toggle: { en: "TH", th: "EN" },
} as const;

export type DictKey = keyof typeof dict;

const LanguageContext = createContext<{ lang: Lang; toggle: () => void; t: (key: DictKey) => string } | null>(null);

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "th" ? "th" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = () => setLang((l) => (l === "en" ? "th" : "en"));
  const t = (key: DictKey) => dict[key][lang];

  return <LanguageContext.Provider value={{ lang, toggle, t }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
