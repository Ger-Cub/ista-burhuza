import React, { useState } from 'react';
import { AcademicEvent } from '../types';
import { CalendarDays, MapPin, Plus, Filter, Users, X } from 'lucide-react';

interface EventsModuleProps {
  events: AcademicEvent[];
  onAddEvent: (event: AcademicEvent) => void;
}

export const EventsModule: React.FC<EventsModuleProps> = ({ events, onAddEvent }) => {
  const [selectedType, setSelectedType] = useState<string>('Tous');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [titre, setTitre] = useState('');
  const [type, setType] = useState<AcademicEvent['type']>('Examen');
  const [dateDebut, setDateDebut] = useState('2026-04-10');
  const [lieu, setLieu] = useState('Amphithéâtre Burhuza');
  const [description, setDescription] = useState('');

  const filteredEvents = events.filter(e => selectedType === 'Tous' || e.type === selectedType);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre) return;

    const created: AcademicEvent = {
      id: `evt-${Date.now()}`,
      titre,
      type,
      dateDebut,
      dateFin: dateDebut,
      lieu,
      organisateur: 'Secrétariat Académique ISTA',
      description,
      concerne: 'Communauté ISTA Burhuza'
    };

    onAddEvent(created);
    setShowAddModal(false);
    setTitre('');
    setDescription('');
  };

  return (
    <div id="sigu-events-view" className="space-y-6 font-sans">
      {/* Title Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1 font-heading">
            <CalendarDays className="w-4 h-4 text-emerald-800" />
            Agenda & Calendrier Académique
          </div>
          <h2 className="text-lg font-bold text-slate-900 font-heading uppercase tracking-tight">
            Événements Académiques & Planning
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Planning des examens, soutenances TFC/Mémoires, délibérations et cérémonies
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 border border-emerald-950 transition-all uppercase font-heading shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-400" /> Ajouter un Événement
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-3 text-xs">
        <Filter className="w-4 h-4 text-emerald-800" />
        <span className="font-bold text-slate-700 uppercase font-heading">Type d'Événement:</span>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium text-slate-900"
        >
          <option value="Tous">Tous les Événements</option>
          <option value="Examen">Examens & Évaluations</option>
          <option value="Soutenance TFC/Mémoire">Soutenances TFC / Mémoire</option>
          <option value="Délibération">Délibérations de Jury</option>
          <option value="Conférence">Conférences & Ateliers</option>
          <option value="Cérémonie">Cérémonies & Collation</option>
        </select>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.map(evt => (
          <div key={evt.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-3.5 shadow-xs hover:border-emerald-700 transition-all">
            <div className="flex items-start space-x-3.5">
              <div className="bg-emerald-950 text-white rounded-xl p-2.5 text-center font-bold min-w-[55px] border border-emerald-900 shadow-xs">
                <div className="text-[10px] uppercase font-heading text-amber-400">{evt.dateDebut.split('-')[1]}</div>
                <div className="text-lg font-bold leading-none mt-0.5">{evt.dateDebut.split('-')[2]}</div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full font-heading">
                  {evt.type}
                </span>
                <h3 className="font-bold text-sm text-slate-900 mt-2 font-heading">{evt.titre}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{evt.description}</p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
              <span className="flex items-center gap-1.5 font-medium"><MapPin className="w-3.5 h-3.5 text-amber-600" /> {evt.lieu}</span>
              <span className="flex items-center gap-1.5 font-medium"><Users className="w-3.5 h-3.5 text-emerald-800" /> {evt.concerne}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-emerald-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl border border-emerald-900/30 shadow-2xl overflow-hidden">
            <div className="bg-emerald-950 text-white p-4 flex items-center justify-between border-b border-emerald-900">
              <h3 className="font-heading font-bold text-sm uppercase">Programmer un Événement Académique</h3>
              <button onClick={() => setShowAddModal(false)} className="text-emerald-300 hover:text-white p-1 rounded-md">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Titre de l'Événement *</label>
                <input
                  type="text"
                  required
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="Examen">Examen</option>
                    <option value="Soutenance TFC/Mémoire">Soutenance TFC/Mémoire</option>
                    <option value="Délibération">Délibération</option>
                    <option value="Conférence">Conférence</option>
                    <option value="Cérémonie">Cérémonie</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Lieu / Salle</label>
                <input
                  type="text"
                  value={lieu}
                  onChange={(e) => setLieu(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-700"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl uppercase font-heading"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-emerald-900 text-white hover:bg-emerald-950 rounded-xl border border-emerald-950 uppercase transition-colors font-heading shadow-xs"
                >
                  Programmer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
