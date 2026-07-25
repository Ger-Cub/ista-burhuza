import React, { useState } from 'react';
import { AcademicEvent } from '../types';
import { CalendarDays, MapPin, Clock, Plus, Filter, Users, Award, X } from 'lucide-react';

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
    <div id="sigu-events-view" className="space-y-4 font-mono">
      {/* Title */}
      <div className="bg-white p-4 border border-[#141414] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-mono font-bold text-[#141414] flex items-center gap-2 uppercase tracking-wide">
            <CalendarDays className="w-5 h-5 text-[#F27D26]" />
            EVENEMENTS // CALENDRIER_ACADEMIQUE
          </h2>
          <p className="text-xs text-[#141414]/70 mt-0.5">
            PLANNING DES EXAMENS, SOUTENANCES TFC/MEMOIRES, DELIBERATIONS ET CEREMONIES
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#141414] hover:bg-[#F27D26] hover:text-black text-white font-mono font-bold px-3.5 py-2 text-xs flex items-center gap-1.5 border border-[#141414] transition-colors uppercase"
        >
          <Plus className="w-4 h-4 text-[#F27D26]" /> AJOUTER_EVENEMENT
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white p-3 border border-[#141414] flex items-center space-x-2 text-xs font-mono">
        <Filter className="w-4 h-4 text-[#141414]" />
        <span className="font-bold text-[#141414] uppercase">TYPE_EVENEMENT:</span>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-1.5 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
        >
          <option value="Tous">TOUS_LES_EVENEMENTS</option>
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
          <div key={evt.id} className="bg-white border border-[#141414] p-4 space-y-3 font-mono">
            <div className="flex items-start space-x-3">
              <div className="bg-[#141414] text-white p-2 text-center font-bold min-w-[50px] border border-[#141414]">
                <div className="text-[10px] uppercase font-mono text-[#F27D26]">{evt.dateDebut.split('-')[1]}</div>
                <div className="text-base font-mono leading-none mt-0.5">{evt.dateDebut.split('-')[2]}</div>
              </div>

              <div>
                <span className="text-[9px] font-bold uppercase bg-[#F27D26] text-black border border-[#141414] px-1.5 py-0.5">
                  {evt.type}
                </span>
                <h3 className="font-mono font-bold text-sm text-[#141414] mt-1.5 uppercase">{evt.titre}</h3>
                <p className="text-xs text-[#141414]/80 mt-1 uppercase">{evt.description}</p>
              </div>
            </div>

            <div className="border-t border-[#141414]/20 pt-2 flex flex-wrap items-center justify-between text-xs text-[#141414] font-mono gap-2">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#F27D26]" /> {evt.lieu}</span>
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-[#141414]" /> {evt.concerne}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 font-mono">
          <div className="bg-white max-w-md w-full border-2 border-[#141414]">
            <div className="bg-[#141414] text-white p-3 flex items-center justify-between">
              <h3 className="font-mono font-bold text-xs uppercase">PROGRAMMER_EVENEMENT_ACADEMIQUE</h3>
              <button onClick={() => setShowAddModal(false)} className="text-white hover:text-[#F27D26]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">TITRE_EVENEMENT *</label>
                <input
                  type="text"
                  required
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">TYPE</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
                  >
                    <option value="Examen">Examen</option>
                    <option value="Soutenance TFC/Mémoire">Soutenance TFC/Mémoire</option>
                    <option value="Délibération">Délibération</option>
                    <option value="Conférence">Conférence</option>
                    <option value="Cérémonie">Cérémonie</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">DATE *</label>
                  <input
                    type="date"
                    required
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                    className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">LIEU_SALLE</label>
                <input
                  type="text"
                  value={lieu}
                  onChange={(e) => setLieu(e.target.value)}
                  className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] text-[#141414]"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-[#141414] flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-xs font-bold bg-[#E4E3E0] text-[#141414] border border-[#141414] uppercase"
                >
                  ANNULER
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-bold bg-[#141414] text-white hover:bg-[#F27D26] hover:text-black border border-[#141414] uppercase transition-colors"
                >
                  PROGRAMMER
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
