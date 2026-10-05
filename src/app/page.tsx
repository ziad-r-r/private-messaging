import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="landing">
      <nav className="nav">
        <div className="brand"><img src="/mark.svg" alt="" /> PRIVATE</div>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <Link href="/login">Login</Link>
          <Link href="/signup" className="btn btn-primary">Get Started</Link>
        </div>
      </nav>
      <section className="hero">
        <div>
          <div className="kicker">Privacy-first messaging</div>
          <h1>Connect without giving away your number.</h1>
          <p className="lede">
            PRIVATE is a messenger built around a username and a Private ID. No phone number. No email. No real name. People reach you only if you hand them an identity you chose.
          </p>
          <div className="hero-actions">
            <Link href="/signup" className="btn btn-primary">Create an account</Link>
            <Link href="/login" className="btn btn-ghost">Login</Link>
          </div>
        </div>
        <div className="hero-card">
          <div className="fake-chat">
            <div className="bubble them">Looking for Mira. I only have a Private ID.<div className="meta">karim · delivered</div></div>
            <div className="bubble me">Search PRV-3K91LQ2. That is the whole address.<div className="meta">seen</div></div>
            <div className="bubble them">No number on the profile. Good.<div className="meta">typing…</div></div>
          </div>
        </div>
      </section>
      <section className="section" id="how">
        <div className="grid-4">
          <article className="card"><div className="kicker">01</div><h3>No phone number</h3><p>Registration never asks for a SIM, a carrier, or a recovery number.</p></article>
          <article className="card"><div className="kicker">02</div><h3>No email required</h3><p>There is no inbox to verify and no address book to upload.</p></article>
          <article className="card"><div className="kicker">03</div><h3>Username or Private ID</h3><p>Find someone with @nova or PRV-8F42K91. Nothing else resolves.</p></article>
          <article className="card"><div className="kicker">04</div><h3>Privacy first</h3><p>Decide who can message you, see you online, or read your receipts.</p></article>
        </div>
      </section>
      <section className="section">
        <div className="grid-3">
          <article className="card"><h3>A room, not a directory</h3><p>Search only works with an identity someone shared. PRIVATE does not suggest contacts from a phone.</p></article>
          <article className="card"><h3>Messages that keep up</h3><p>Text, photos, video, files, and voice notes, with replies, reactions, edits, and seen status.</p></article>
          <article className="card"><h3>You hold the keys to reach</h3><p>Block, report, and a separate admin desk for bans and open reports. Passwords are hashed, never stored raw.</p></article>
        </div>
      </section>
      <footer className="footer"><span>PRIVATE</span><span>No phone. No email. Just the identity you share.</span></footer>
    </main>
  );
}
