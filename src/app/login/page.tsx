"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password })
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setError(data.error || "Could not sign in.");
    router.push(data.user?.role === "admin" ? "/admin" : "/app");
  }

  return (
    <main className="auth-wrap">
      <form className="auth-card" onSubmit={submit}>
        <Link href="/" className="brand"><img src="/mark.svg" alt="" /> PRIVATE</Link>
        <h1>Welcome back.</h1>
        <p className="muted">Sign in with a username or a Private ID. No phone, no email.</p>
        <label>Username or Private ID</label>
        <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="@nova or PRV-8F42K91" autoComplete="username" />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        <div className="form-error">{error}</div>
        <button className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>{loading ? "Checking…" : "Login"}</button>
        <p className="fine">New here? <Link href="/signup">Create an account</Link></p>
        <p className="fine">Demo · nova / private123 · Admin · admin / private123</p>
      </form>
    </main>
  );
}
