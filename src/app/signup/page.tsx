"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, confirmPassword })
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setError(data.error || "Could not create the account.");
    router.push("/app");
  }

  return (
    <main className="auth-wrap">
      <form className="auth-card" onSubmit={submit}>
        <Link href="/" className="brand"><img src="/mark.svg" alt="" /> PRIVATE</Link>
        <h1>Create your identity.</h1>
        <p className="muted">A username, a password, and a Private ID we generate. That is the whole account.</p>
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="nova" autoComplete="username" />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
        <label>Confirm password</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" />
        <div className="form-error">{error}</div>
        <button className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>{loading ? "Creating…" : "Get Started"}</button>
        <p className="fine">Already have an identity? <Link href="/login">Login</Link></p>
      </form>
    </main>
  );
}
