import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, CalendarCheck } from "lucide-react";
import { SITE } from "@/data/content";

/**
 * Floating chat widget shell. The reply logic below is a stand-in: it
 * returns one of a few canned, sales-oriented responses so the UI is fully
 * functional out of the box. Swap `getReply` for a real call to your AI
 * backend (an API route, a hosted assistant, whatever you wire up) and the
 * rest of the widget (open/close, message list, quick replies, input) keeps
 * working unchanged.
 */

type ChatMessage = { role: "bot" | "user"; text: string };

const QUICK_REPLIES = [
  "What do you do at CTC?",
  "What campaigns have you led?",
  "What have you built?",
  "Are you open to a staff role?",
  "Can I book a call?",
];

const OPENING_MESSAGE =
  "Hi, I'm Jimmy's assistant. Ask me about his marketing and social media work, what he builds at CTC, or how to book a call with him.";

// Stand-in reply logic, replace with a real API call to your AI backend.
async function getReply(userText: string): Promise<string> {
  const text = userText.toLowerCase();
  if (text.includes("ctc") || text.includes("click to create")) {
    return "Jimmy co-founded Click to Create (CTC) in August 2026 and leads all of its technology. MMG's website and the Daw Na Yeik Odoo system are CTC projects he builds. You can see them on the Work page.";
  }
  if (text.includes("campaign") || text.includes("social") || text.includes("marketing") || text.includes("lead")) {
    return "Jimmy was marketing lead and strategist at Fen-i from June to August 2026, running social and paid campaigns for Zebra Pitch, Young CEO and Fen-i. He now manages the CTC social pages. The Zebra and Fen-i case studies are on the Work page.";
  }
  if (text.includes("built") || text.includes("build") || text.includes("website") || text.includes("project") || text.includes("odoo") || text.includes("mmg")) {
    return "Recent builds include the bilingual MMG and CTC websites with admin dashboards, an Odoo business system for Daw Na Yeik, and the MTSS platform. Check the Work page for each one.";
  }
  if (text.includes("role") || text.includes("hire") || text.includes("job") || text.includes("staff") || text.includes("open")) {
    return "Yes, Jimmy is open to opportunities, especially roles leading projects and social campaigns. Send him a message on the Contact page with the details of the role.";
  }
  if (text.includes("book") || text.includes("call") || text.includes("meet")) {
    return "You can pick a slot directly on the Contact page, Monday to Friday during working hours. Want me to take you there?";
  }
  return "Thanks, that's helpful. The quickest next step is a short call or a message to Jimmy directly. Want me to take you to the Contact page?";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "bot", text: OPENING_MESSAGE }]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  // Tapping anywhere outside the panel minimizes it, same as the X button.
  // Before this, the only way to close it was the button itself, so it sat
  // open over whatever the visitor was trying to read next.
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setSending(true);
    const reply = await getReply(trimmed);
    setMessages((m) => [...m, { role: "bot", text: reply }]);
    setSending(false);
  };

  return (
    <>
      <motion.button
        ref={buttonRef}
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-24 right-5 md:bottom-24 md:right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-glow text-ink-900 shadow-lg hover:bg-white transition-colors"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[168px] right-5 md:bottom-[168px] md:right-8 z-50 w-[340px] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-primary-500/20 bg-ink-900 shadow-2xl overflow-hidden flex flex-col"
            style={{ height: 460 }}
          >
            <div className="px-4 py-3 border-b border-primary-500/15 bg-ink-700">
              <p className="text-[13.5px] font-semibold text-parchment-100">Ask about Jimmy's services</p>
              <p className="text-[11px] text-parchment-500">Usually replies in a few minutes during working hours</p>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    m.role === "bot"
                      ? "bg-bg-card text-parchment-200 mr-auto"
                      : "bg-glow text-ink-900 ml-auto"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {sending && (
                <div className="max-w-[60%] rounded-xl px-3.5 py-2.5 text-[13px] bg-bg-card text-parchment-500 mr-auto">
                  Typing...
                </div>
              )}
            </div>

            {messages.length < 3 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-primary-500/25 px-2.5 py-1 text-[11px] text-parchment-300 hover:border-primary-500 hover:text-primary-500 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="px-4 pb-3">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-glow text-ink-900 px-4 py-2.5 text-[12.5px] font-bold hover:bg-white transition-colors"
              >
                <CalendarCheck size={14} /> Book a Free Demo
              </Link>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-primary-500/15 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-full bg-bg-card border border-primary-500/20 px-4 py-2 text-[13px] text-parchment-100 outline-none focus:border-primary-500"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-glow text-ink-900 disabled:opacity-40"
                aria-label="Send"
              >
                <Send size={15} />
              </button>
            </form>
            <p className="px-3 pb-2 text-[9.5px] text-parchment-700 text-center">
              For anything urgent, email {SITE.email} directly.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
