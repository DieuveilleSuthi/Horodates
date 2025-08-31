import React, { useState, useEffect } from "react";
import { fetchEvents, createEvent, updateEvent, deleteEvent } from "./api";
import EventForm from "./EventForm";
import EventList from "./EventList";
import Signup from "./Signup";
import Login from "./Login";
import "./App.css";

function App() {
  const [user, setUser] = useState(null); // utilisateur connecté
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(token ? "events" : "login"); // navigation simple

  // Charger les événements si connecté
  async function load() {
    if (!token) return;
    setLoading(true);
    try {
      const data = await fetchEvents(token);
      data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      setEvents(data);
    } catch (e) {
      setError(e.message || "Erreur");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      load();
    }
  }, [token]);

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setPage("login");
  }

  return (
    <div className="app-container">
      <div className="app-box">
        <h1 className="app-title">Gestion d'événements horodatés</h1>

        {/* Navigation */}
        {!token ? (
          <>
            {page === "login" ? (
              <Login
                onLogin={(u, t) => {
                  setUser(u);
                  setToken(t);
                  localStorage.setItem("token", t);
                  setPage("events");
                }}
                onSwitch={() => setPage("signup")}
              />
            ) : (
              <Signup onSwitch={() => setPage("login")} />
            )}
          </>
        ) : (
          <>
            <div style={{ textAlign: "right", marginBottom: "15px" }}>
              <button onClick={handleLogout} className="btn btn-secondary">
                🚪 Déconnexion
              </button>
            </div>

            <EventForm
              onCreate={(payload) =>
                createEvent(payload, token).then((ev) =>
                  setEvents((prev) => [...prev, ev])
                )
              }
              onUpdate={(id, payload) =>
                updateEvent(id, payload, token).then((ev) =>
                  setEvents((prev) =>
                    prev.map((e) => (e._id === id ? ev : e))
                  )
                )
              }
              editing={editing}
              onCancel={() => setEditing(null)}
            />

            {loading ? (
              <p className="loading">Chargement...</p>
            ) : (
              <EventList
                events={events}
                onEdit={setEditing}
                onDelete={(id) =>
                  deleteEvent(id, token).then(() =>
                    setEvents((prev) => prev.filter((e) => e._id !== id))
                  )
                }
              />
            )}

            {error && <div className="error">{error}</div>}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
