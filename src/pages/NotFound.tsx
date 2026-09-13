import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-40 pb-32 px-6 text-center min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-4">404</h1>
      <p className="text-[15px] text-muted-foreground mb-8">This page doesn't exist yet.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-[14px] font-semibold text-on-primary hover:bg-primary-400 transition-colors"
      >
        <ArrowLeft size={14} /> Back to home
      </Link>
    </div>
  );
}
