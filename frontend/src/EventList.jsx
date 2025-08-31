import React from 'react';

export default function EventList({ events, onEdit, onDelete }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  if (!events || events.length === 0) {
    return <p className="empty">Aucun événement.</p>;
  }

  return (
    <div className="card">
      <h3 className="card-title">Événements ({events.length})</h3>
      <ul className="event-list">
        {events.map(ev => (
          <li key={ev._id} className="event-item">
            <div>
              <p className="event-title">{ev.title}</p>
              {ev.description && <p className="event-desc">{ev.description}</p>}
            </div>
            <div className="event-meta">
              <p className="event-date">{formatDate(ev.date)}</p>
              <div className="event-actions">
                <button onClick={() => onEdit(ev)} className="btn-link">✏️ Modifier</button>
                <button onClick={() => onDelete(ev._id)} className="btn-link danger">🗑️ Supprimer</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
