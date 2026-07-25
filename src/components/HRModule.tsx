import React, { useState } from 'react';
import { StaffMember, Section } from '../types';
import { 
  UserCheck, 
  Plus, 
  Search, 
  Mail, 
  X 
} from 'lucide-react';

interface HRModuleProps {
  staff: StaffMember[];
  onAddStaff: (member: StaffMember) => void;
}

export const HRModule: React.FC<HRModuleProps> = ({ staff, onAddStaff }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [grade, setGrade] = useState<StaffMember['grade']>('Chef de Travaux');
  const [fonction, setFonction] = useState('Enseignant Chercheur');
  const [departement, setDepartement] = useState<Section | 'Administration' | 'Finance'>('Informatique Appliquée');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const filteredStaff = staff.filter(s =>
    s.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.fonction.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !prenom) return;

    const created: StaffMember = {
      id: `stf-${Date.now()}`,
      matricule: `ENS-${Math.floor(100 + Math.random() * 900)}`,
      nom: nom.toUpperCase(),
      prenom,
      grade,
      fonction,
      typeContrat: 'Permanent',
      departement,
      email: email || `${nom.toLowerCase()}@ista-bukavu.cd`,
      telephone: phone || '+243 993 000 000',
      chargeHoraireAttribuee: 120,
      tauxHoraireUSD: 18,
      prestationMoisUSD: 600,
      statut: 'Actif'
    };

    onAddStaff(created);
    setShowAddModal(false);
    setNom('');
    setPrenom('');
  };

  return (
    <div id="sigu-hr-view" className="space-y-6 font-sans">
      {/* Title Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1 font-heading">
            <UserCheck className="w-4 h-4 text-emerald-800" />
            Direction des Ressources Humaines
          </div>
          <h2 className="text-lg font-bold text-slate-900 font-heading uppercase tracking-tight">
            Ressources Humaines & Corps Enseignant
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Professeurs, Chefs de travaux, Assistants, contrats et prestations mensuelles
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 border border-emerald-950 transition-all uppercase font-heading shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-400" /> Ajouter un Agent
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Rechercher: Nom, fonction, département..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-slate-900"
          />
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStaff.map(s => (
          <div key={s.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-3.5 shadow-xs hover:border-emerald-700 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-0.5 rounded-full font-heading">
                  {s.grade}
                </span>
                <h3 className="font-bold text-sm text-slate-900 mt-2 uppercase font-heading">{s.nom} {s.prenom}</h3>
                <p className="text-xs text-slate-600 font-medium">{s.fonction}</p>
              </div>
              <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">{s.matricule}</span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700 border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Département:</span>
                <span className="font-bold text-slate-900">{s.departement}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Charge Horaire:</span>
                <span className="font-bold text-slate-900">{s.chargeHoraireAttribuee} Heures</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Prestation Mensuelle:</span>
                <span className="font-extrabold text-emerald-900">${s.prestationMoisUSD} USD</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-600"><Mail className="w-3.5 h-3.5 text-emerald-800" /> {s.email}</span>
              <span className="font-bold bg-emerald-50 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[10px] uppercase">{s.statut}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-emerald-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl border border-emerald-900/30 shadow-2xl overflow-hidden">
            <div className="bg-emerald-950 text-white p-4 flex items-center justify-between border-b border-emerald-900">
              <h3 className="font-heading font-bold text-sm uppercase">Nouveau Membre Enseignant / Agent</h3>
              <button onClick={() => setShowAddModal(false)} className="text-emerald-300 hover:text-white p-1 rounded-md">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStaff} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Nom *</label>
                  <input
                    type="text"
                    required
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-700 uppercase"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Prénom *</label>
                  <input
                    type="text"
                    required
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Grade Académique</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="Professeur Ordinaire">Professeur Ordinaire</option>
                  <option value="Professeur">Professeur</option>
                  <option value="Chef de Travaux">Chef de Travaux</option>
                  <option value="Assistant">Assistant</option>
                  <option value="Agent Administratif">Agent Administratif</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Fonction Officielle</label>
                <input
                  type="text"
                  value={fonction}
                  onChange={(e) => setFonction(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700"
                />
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
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
