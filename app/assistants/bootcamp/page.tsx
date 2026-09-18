import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The bootcamp | Pearstop",
  description:
    "Two months, a small group, one to two hours a week. How the AI assistant bootcamp is structured.",
};

export default function AssistantsBootcampPage() {
  return (
    <>
      <h1>What the bootcamp looks like</h1>
      <p className="lede">
        A small group, online. One to two hours a week over two months. You leave with your
        assistants running, not with a folder of notes.
      </p>

      <section className="first">
        <h2>How a week works</h2>
        <ul className="plain">
          <li>
            <span className="dot" />
            <span>
              <strong>Homework before the session.</strong> A few things to think about and
              write down. Do not use AI for this part. Your own thinking is the raw material,
              and it is what makes the assistants any good later.
            </span>
          </li>
          <li>
            <span className="dot" />
            <span>
              <strong>A short piece of teaching.</strong> Enough to do the week&apos;s build,
              nothing more.
            </span>
          </li>
          <li>
            <span className="dot" />
            <span>
              <strong>Questions and peer learning.</strong> You see the examples, and you get
              time to share what you have found and built yourself. This is the part people
              underestimate. Eight people finding things beats one person finding things.
            </span>
          </li>
          <li>
            <span className="dot" />
            <span>
              <strong>Videos between sessions.</strong> Watch them whenever it suits you.
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2>The eight weeks</h2>
        <div className="week">
          <div className="no">Week 1&ndash;2</div>
          <div>
            <div className="t">Your voice and your worldview</div>
            <div className="d">
              We write down how you speak, what you believe about your work and the things you
              would never say. Everything else gets built on top of this, so it comes first.
            </div>
          </div>
        </div>
        <div className="week">
          <div className="no">Week 3&ndash;4</div>
          <div>
            <div className="t">Email triage</div>
            <div className="d">
              Your inbox sorted into what needs you, what is background and what can wait, with
              replies drafted and waiting.
            </div>
          </div>
        </div>
        <div className="week">
          <div className="no">Week 5&ndash;6</div>
          <div>
            <div className="t">Your morning brief and meeting prep</div>
            <div className="d">
              Clients who have gone quiet, what your team is waiting on, and prep for today&apos;s
              meetings before you think to ask.
            </div>
          </div>
        </div>
        <div className="week">
          <div className="no">Week 7&ndash;8</div>
          <div>
            <div className="t">Your marketing coach, and whatever is specific to you</div>
            <div className="d">
              What your customers are talking about and what to write next. Then we spend the
              last stretch on the assistants only your business needs.
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>What you keep afterwards</h2>
        <ul className="plain">
          <li>
            <span className="dot" />
            <span>Lifetime access to every recording.</span>
          </li>
          <li>
            <span className="dot" />
            <span>
              Access to the community after the programme ends, so you keep seeing what other
              people are building.
            </span>
          </li>
          <li>
            <span className="dot" />
            <span>The self-service guide, for when you want to add something new on your own.</span>
          </li>
        </ul>
      </section>

      <section>
        <h2>Price</h2>
        <div className="price lead">
          <div className="tag">The bootcamp</div>
          <h3>Two months, small group</h3>
          <p>
            One to two hours a week, online. Homework, teaching, peer learning, and your
            assistants running by the end of it.
          </p>
          <div className="amount">&euro;1,200</div>
          <div className="fineprint">One off, per person.</div>
        </div>
        <div className="anchor">
          A good VA costs <strong>&euro;20,000 to &euro;30,000 a year</strong>, depending on
          hours. An executive assistant to a CEO is closer to <strong>&euro;50,000 a year</strong>,
          and general EA roles in major cities like Dublin run{" "}
          <strong>&euro;36,000 to &euro;58,000</strong>.
        </div>
        <a className="cta" href="mailto:stephanie@pearstop.com?subject=Bootcamp">
          Ask about the next group
        </a>
      </section>
    </>
  );
}
