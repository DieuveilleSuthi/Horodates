import React, { useEffect, useState } from 'react';

export default function EventForm({ onCreate, onUpdate, editing, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(''); // 👈 renommé timestamp → date

  useEffect(() => {
    if (editing) {
      setTitle(editing.title || '');
      setDescription(editing.description || '');
      if (editing.date) {
        const dt = new Date(editing.date);
        const local = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16);
        setDate(local);
      } else {
        setDate('');
      }
    } else {
      setTitle('');
      setDescription('');
      setDate('');
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date) {
      alert('Titre et date/heure obligatoires');
      return;
    }
    const iso = new Date(date).toISOString();
    const payload = { title, description, date: iso }; // 👈 on envoie "date"
    if (editing) {
      await onUpdate(editing._id, payload);
    } else {
      await onCreate(payload);
    }
    setTitle('');
    setDescription('');
    setDate('');
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3 className="card-title">
        {editing ? 'Modifier l’événement' : 'Créer un événement'}
      </h3>

      <label className="form-label">
        Titre
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="form-input"
        />
      </label>

      <label className="form-label">
        Description
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          className="form-textarea"
        />
      </label>

      <label className="form-label">
        Date et heure
        <input
          type="datetime-local"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="form-input"
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editing ? 'Enregistrer' : 'Créer'}
        </button>
        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
