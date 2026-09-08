import  { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// CONFIG — point this at your real API
// ─────────────────────────────────────────────────────────────
const API_ENDPOINT = "https://your-api.example.com/query";

// Adjust this if your API expects a different body shape.
function buildRequestBody(query) {
  return { query };
}

// Adjust this if your API returns a different response shape.
// Right now it assumes { answer: "..." } or a raw string.
function parseResponse(data) {
  if (typeof data === "string") return data;
  if (data?.answer) return data.answer;
  if (data?.result) return data.result;
  if (data?.message) return data.message;
  return JSON.stringify(data, null, 2);
}
// ─────────────────────────────────────────────────────────────

const palette = {
  ink: "#1C1C1E",
  paper: "#FAFAF7",
  ledger: "#1F4B3F",
  ledgerLight: "#E8F0EC",
  line: "#DDD8CC",
  muted: "#6B6B63",
  error: "#8A3324",
};

export default function ExpenseChatWidget() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "system",
      text: "Paste an expense query below — e.g. \"How much did I spend on travel in August?\"",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  async function handleSend() {
    const trimmed = query.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setQuery("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildRequestBody(trimmed)),
      });

      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }

      const data = await res.json();
      const answer = parseResponse(data);
      setMessages((prev) => [...prev, { role: "assistant", text: answer }]);
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setMessages((prev) => [
        ...prev,
        { role: "error", text: err.message || "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div
      style={{
        fontFamily:
          "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Floating trigger button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open expense chat"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: palette.ledger,
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(31,75,63,0.35)",
            transition: "transform 0.15s ease",
            zIndex: 1000,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <MessageCircle color={palette.paper} size={24} strokeWidth={2} />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Expense chat"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 360,
            maxWidth: "calc(100vw - 32px)",
            height: 480,
            maxHeight: "calc(100vh - 48px)",
            background: palette.paper,
            border: `1px solid ${palette.line}`,
            borderRadius: 12,
            boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 1000,
          }}
        >
          {/* Header */}
          <div
            style={{
              background: palette.ledger,
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div>
              <div style={{ color: palette.paper, fontWeight: 600, fontSize: 14 }}>
                Expense Assistant
              </div>
              <div style={{ color: "#B7CFC5", fontSize: 12, marginTop: 2 }}>
                Ask about your spending
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 4,
                display: "flex",
              }}
            >
              <X color={palette.paper} size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((m, i) => (
              <MessageBubble key={i} role={m.role} text={m.text} />
            ))}
            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: palette.muted, fontSize: 13 }}>
                <Loader2 size={14} className="spin" style={{ animation: "spin 0.8s linear infinite" }} />
                Fetching your answer…
              </div>
            )}
          </div>

          {/* Input */}
          <div
            style={{
              borderTop: `1px solid ${palette.line}`,
              padding: 10,
              display: "flex",
              gap: 8,
              flexShrink: 0,
              background: palette.paper,
            }}
          >
            <textarea
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. How much did I spend on food last week?"
              rows={1}
              style={{
                flex: 1,
                resize: "none",
                border: `1px solid ${palette.line}`,
                borderRadius: 8,
                padding: "10px 12px",
                fontSize: 13,
                fontFamily: "inherit",
                outline: "none",
                color: palette.ink,
                background: "#FFFFFF",
                lineHeight: 1.4,
                maxHeight: 80,
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading || !query.trim()}
              aria-label="Send"
              style={{
                background: query.trim() && !loading ? palette.ledger : palette.line,
                border: "none",
                borderRadius: 8,
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: query.trim() && !loading ? "pointer" : "not-allowed",
                flexShrink: 0,
              }}
            >
              <Send size={16} color={query.trim() && !loading ? palette.paper : palette.muted} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function MessageBubble({ role, text }) {
  if (role === "system") {
    return (
      <div
        style={{
          fontSize: 12,
          color: palette.muted,
          textAlign: "center",
          padding: "8px 12px",
        }}
      >
        {text}
      </div>
    );
  }

  const isUser = role === "user";
  const isError = role === "error";

  return (
    <div
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "85%",
        background: isUser ? palette.ledger : isError ? "#FBEAE5" : palette.ledgerLight,
        color: isUser ? palette.paper : isError ? palette.error : palette.ink,
        padding: "9px 13px",
        borderRadius: 10,
        borderBottomRightRadius: isUser ? 3 : 10,
        borderBottomLeftRadius: isUser ? 10 : 3,
        fontSize: 13.5,
        lineHeight: 1.5,
        whiteSpace: "pre-wrap",
        fontFamily: isUser ? "inherit" : "'IBM Plex Mono', monospace",
      }}
    >
      {text}
    </div>
  );
}
