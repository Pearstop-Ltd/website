import type { Metadata } from "next";
import { AssistantsNav } from "./assistants-nav";
import { ASSISTANTS_CSS } from "./styles";

export const metadata: Metadata = {
  title: "AI assistants that sound like you | Pearstop",
  description:
    "We set up AI assistants around how you actually work, in your voice. One to one, or in a small group.",
};

export default function AssistantsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        />
        {/* eslint-disable-next-line react/no-danger */}
        <style dangerouslySetInnerHTML={{ __html: ASSISTANTS_CSS }} />
      </head>
      <body>
        <div className="wrap">
          <AssistantsNav />
          {children}
          <footer>
            Stephanie Wiechers, Pearstop
            <br />
            <a href="mailto:stephanie@pearstop.com">stephanie@pearstop.com</a>
          </footer>
        </div>
      </body>
    </html>
  );
}
