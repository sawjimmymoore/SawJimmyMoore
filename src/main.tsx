import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ThemeProvider } from "./lib/theme";
import { LanguageProvider } from "./lib/i18n";
import { CurrencyProvider } from "./lib/currency";
import { TimezoneProvider } from "./lib/timezone";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <TimezoneProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </TimezoneProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
);
