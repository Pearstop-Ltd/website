import type { Metadata } from "next";
import Link from "next/link";
import { CalendlyButton } from "@/components/calendly-button";
import { CALENDLY_URL } from "./styles";

export const metadata: Metadata = {
  title: "AI assistants that sound like you | Pearstop",
  description:
    "We set up AI assistants around how you actually work, in your voice. One to one, or in a small group.",
};

export default function AssistantsHomePage() {
  return (
    <>
      <header className="top">
        <h1>Get the work done. Be there for what matters.</h1>
        <p className="lede">
          We set up AI assistants that work the way you work and sound the way you sound. You
          keep every decision. The repetitive part goes.
        </p>
        <CalendlyButton label="Book a 20 minute call" className="cta" url={CALENDLY_URL} />
      </header>

      <section className="first">
        <h2>Your week probably looks like this</h2>
        <ul className="plain">
          <li>
            <span className="dot" />
            <span>You open your inbox at nine and the first two hours are gone.</span>
          </li>
          <li>
            <span className="dot" />
            <span>You know a client has gone quiet. You just cannot remember which one.</span>
          </li>
          <li>
            <span className="dot" />
            <span>You write the same five emails every week, slightly differently each time.</span>
          </li>
          <li>
            <span className="dot" />
            <span>The real thinking waits until everyone else has gone home.</span>
          </li>
        </ul>
      </section>

      <section>
        <h2>And when you do try AI, it does not sound like you</h2>
        <p>
          Most models learned from one slice of the internet. The default voice that comes out
          is confident, corporate and male. Use it straight out of the box and your emails
          slowly stop sounding like you.
        </p>
        <p>
          We start the other way around. We sit down and capture how you speak, what you
          believe about your work and the things you would never say. Everything gets built on
          top of that.
        </p>
        <p>
          You read the first draft it writes and you recognise your own business in it. You
          still make every call. It just stops you doing the same job for the fourth time this
          week.
        </p>
      </section>

      <section>
        <h2>What we build for you</h2>
        <div className="cards">
          <div className="card">
            <div className="t">Email triage</div>
            <div className="d">
              Your inbox sorted into what needs you, what is background and what can wait.
              Replies drafted and ready.
            </div>
          </div>
          <div className="card">
            <div className="t">Your voice profile</div>
            <div className="d">
              How you actually speak and write, written down, so every draft sounds like you.
            </div>
          </div>
          <div className="card">
            <div className="t">Your worldview</div>
            <div className="d">
              What you believe, what matters to you and what you will never say. Your
              assistants work from it.
            </div>
          </div>
          <div className="card">
            <div className="t">Your assistants</div>
            <div className="d">
              A handful of them, built around your real recurring work and running every day.
            </div>
          </div>
          <div className="card bonus">
            <div className="t">Bonus: your marketing coach</div>
            <div className="d">
              It keeps an eye on what your customers are talking about, tells you what is worth
              writing about this week, and walks you through writing it.
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>What that looks like day to day</h2>
        <ul className="plain">
          <li>
            <span className="dot" />
            <span>
              A brief waiting for you every morning: clients who have gone quiet, the news worth
              knowing, the two emails that need you, what your team is waiting on.
            </span>
          </li>
          <li>
            <span className="dot" />
            <span>Prep for today&apos;s meetings, in your inbox before you think to ask for it.</span>
          </li>
          <li>
            <span className="dot" />
            <span>
              A weekly read on what your customers are talking about, and the piece it suggests
              you write next.
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2>Two ways to do this</h2>

        <div className="price lead">
          <div className="tag">Start here</div>
          <h3>
            <Link
              href="/assistants/bootcamp"
              style={{ color: "inherit", textDecoration: "none", borderBottom: "1px solid var(--line)" }}
            >
              The bootcamp
            </Link>
          </h3>
          <p>
            A small group, online. One to two hours a week over two months. The first sessions
            get you set up. Every week after that we refine what is running and add the next
            piece. Self-service guide included.
          </p>
          <div className="amount">&euro;1,200</div>
          <div className="fineprint">One off, per person. Small groups.</div>
        </div>

        <div className="price">
          <div className="tag grey">Or, if you&apos;d rather do it in one go</div>
          <h3>One to one</h3>
          <p>
            A full day together, online or in person. We go through everything you run, then I
            build the whole thing for you. Two follow-up sessions after that, online, once you
            have lived with it.
          </p>
          <div className="amount">&euro;2,000</div>
          <div className="fineprint">One off. Travel and accommodation included if in person.</div>
        </div>

        <div className="anchor">
          A good VA costs <strong>&euro;20,000 to &euro;30,000 a year</strong>. A full-time
          executive assistant is closer to <strong>&euro;50,000 a year</strong>. You make this
          back inside a month, and what you buy is the evening back with your family.
        </div>

        <CalendlyButton label="Book a 20 minute call" className="cta" url={CALENDLY_URL} />
      </section>
    </>
  );
}
