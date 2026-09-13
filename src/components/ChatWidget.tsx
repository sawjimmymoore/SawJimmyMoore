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
  "What services do you offer?",
  "How much does a website cost?",
  "Do you build online stores?",
  "Can I book appointments through my site?",
  "Can I book a call?",
];

const OPENING_MESSAGE =
  "Hi, I'm Jimmy's assistant. I can tell you about his web development, e-commerce, and marketing services, walk you through pricing tiers, or help you book a free call. What are you working on?";

// Stand-in reply logic, replace with a real API call to your AI backend.
async function getReply(userText: string): Promise<string> {
  const text = userText.toLowerCase();
  if (text.includes("price") || text.includes("cost") || text.includes("much")) {
    return "Pricing runs in fixed tiers, Foundation, Growth, Commerce, and Enterprise, so you know the range before committing to anything. Check the Pricing page, or book a free call for a number specific to your project.";
  }
  if (text.includes("book") || text.includes("call") || text.includes("demo")) {
    return "You can pick a slot directly on the Get In Touch page, working hours only, Monday to Friday. Want me to take you there?";
  }
  if (text.includes("store") || text.includes("shop") || text.includes("sell") || text.includes("ecommerce") || text.includes("e-commerce")) {
    return "Yes, full e-commerce builds are a core service, product catalogue, cart, checkout, PromptPay/card payments, and inventory tracking. Check out the E-Commerce service page for details, or tell me a bit about what you're selling.";
  }
  if (text.includes("appointment") || text.includes("booking") || text.includes("schedule")) {
    return "Yes, booking and service platforms are one of the core offerings, a working-hours-aware calendar with automated confirmations. Want to see the Booking & Service Platforms page?";
  }
  if (text.includes("service") || text.includes("offer") || text.includes("what do you")) {
    return "Jimmy offers four core services: Web Development, E-Commerce, Digital Marketing, and Booking Platforms. Every project starts with a free discovery call so scope and investment are clear up front. Which one sounds closest to what you need?";
  }
  return "Thanks, that's helpful context. For anything specific to your project, the best next step is a quick free call with Jimmy directly, want me to help you book one?";
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
        className="fixed bottom-24 right-5 md:bottom-28 md:right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-ink-900 shadow-lg hover:bg-primary-400 transition-colors"
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
            className="fixed bottom-[168px] right-5 md:bottom-[184px] md:right-8 z-50 w-[340px] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-primary-500/20 bg-ink-900 shadow-2xl overflow-hidden flex flex-col"
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
                      : "bg-primary-500 text-ink-900 ml-auto"
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
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-500 text-ink-900 px-4 py-2.5 text-[12.5px] font-bold hover:bg-primary-400 transition-colors"
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
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-ink-900 disabled:opacity-40"
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
