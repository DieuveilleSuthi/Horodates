const API_URL = "http://localhost:5000/api";

// Fonction pour récupérer le token
function getToken() {
  return localStorage.getItem("token");
}

export async function fetchEvents() {
  const res = await fetch(`${API_URL}/events`, {
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
  });
  if (!res.ok) throw new Error("Erreur fetchEvents");
  return res.json();
}

export async function createEvent(event) {
  const res = await fetch(`${API_URL}/events/create`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(event),
  });
  if (!res.ok) throw new Error("Erreur createEvent");
  return res.json();
}

export async function updateEvent(id, event) {
  const res = await fetch(`${API_URL}/events/${id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(event),
  });
  if (!res.ok) throw new Error("Erreur updateEvent");
  return res.json();
}

export async function deleteEvent(id) {
  const res = await fetch(`${API_URL}/events/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });
  if (!res.ok) throw new Error("Erreur deleteEvent");
  return res.json();
}
