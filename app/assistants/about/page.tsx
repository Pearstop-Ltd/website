import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { CALENDLY_URL } from "../styles";

export const metadata: Metadata = {
  title: "Who runs this | Pearstop",
  description:
    "Stephanie Wiechers and Rae Thomas, the two people who run the AI assistant setup programme at Pearstop.",
};

export default function AssistantsAboutPage() {
  return (
    <>
      <h1>Who runs this</h1>
      <p className="lede">
        Two people. One who has been building this kind of thing for years, and one who learned
        it from scratch last year.
      </p>

      <section className="first">
        <div className="bio">
          <div className="role">Founder</div>
          <div className="headshot">
            <img src={siteConfig.assets.team.stephanie} alt="Stephanie Wiechers" />
            <div className="headshot-meta">
              <h3>Stephanie Wiechers</h3>
              <a
                className="linkedin"
                href="https://www.linkedin.com/in/stephanie-wiechers"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn →
              </a>
            </div>
          </div>
          <p>
            I am an engineer. I studied aerospace at TU Delft, then did a master&apos;s in AI for
            systems and a second one in communications. My first job was at Dutch air traffic
            control, where I built an innovation research lab and worked on systems that help
            controllers decide faster without deciding for them.
          </p>
          <p>
            Eight years in data science and software since then. I was working with AI long
            before Claude and Copilot existed, which mostly means I have spent a lot of time on
            the versions that did not work.
          </p>
          <p>
            In every job I have had, I have tried to automate myself out of it. One of them was
            clearing a data entry backlog at a manufacturer. I cleared it, then trained the
            company to use their own system so nobody would have to be hired for that again. It
            has never once cost me a job. Every time, it moved me on to harder work.
          </p>
          <p>
            That is the point of this whole thing. We are not here to replace anyone. We give
            you back your time and your energy, so you can spend them on the people you love and
            on the work that needs a human in the room. Strategy. Judgement calls. Sitting in a
            client meeting and properly caring, instead of burning the morning on admin.
          </p>
        </div>

        <div className="bio">
          <div className="role">Chief of Staff</div>
          <div className="headshot">
            <img src={siteConfig.assets.team.raeesah} alt="Rae Thomas" />
            <div className="headshot-meta">
              <h3>Rae Thomas</h3>
              <a
                className="linkedin"
                href="https://www.linkedin.com/in/raeesah-thomas-114937158/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn →
              </a>
            </div>
          </div>
          <p>
            Rae spent her career in law, in private practice and in-house. She is the most
            structured person you will meet, and that shows up in how the programme runs.
          </p>
          <p>
            She is also the reason this works for people who are not technical. Rae started
            learning all of this recently, from nothing. She can tell you what it actually gave
            her, and she can tell you how easy it was to pick up with no background in it. When
            you get stuck, she was stuck in the same place a few months earlier.
          </p>
        </div>
      </section>

      <section>
        <h2>What we believe</h2>
        <p>
          Most of the work that eats your week does not need you. It needs something that knows
          how you work and what you care about.
        </p>
        <p>
          Every decision stays with you. We are careful about that line. The assistants do the
          repeating, the sorting and the drafting. You do the thinking.
        </p>
        <a className="cta" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
          Book a 20 minute call
        </a>
      </section>
    </>
  );
}
