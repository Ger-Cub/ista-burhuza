import React, { useState } from 'react';
import { StaffMember, Section } from '../types';
import { 
  UserCheck, 
  Plus, 
  Search, 
  Briefcase, 
  Clock, 
  DollarSign, 
  Mail, 
  Phone, 
  CheckCircle, 
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
    <div id="sigu-hr-view" className="space-y-4 font-mono">
      {/* Title */}
      <div className="bg-white p-4 border border-[#141414] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-mono font-bold text-[#141414] flex items-center gap-2 uppercase tracking-wide">
            <UserCheck className="w-5 h-5 text-[#F27D26]" />
            RESSOURCES_HUMAINES // CORPS_ENSEIGNANT
          </h2>
          <p className="text-xs text-[#141414]/70 mt-0.5">
            PROFESSEURS, CHEFS DE TRAVAUX, ASSISTANTS, CONTRATS ET PRESTATIONS
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#141414] hover:bg-[#F27D26] hover:text-black text-white font-mono font-bold px-3.5 py-2 text-xs flex items-center gap-1.5 border border-[#141414] transition-colors uppercase"
        >
          <Plus className="w-4 h-4 text-[#F27D26]" /> AJOUTER_AGENT
        </button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStaff.map(s => (
          <div key={s.id} className="bg-white border border-[#141414] p-4 space-y-3 font-mono">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase bg-[#141414] text-white border border-[#141414] px-1.5 py-0.5">
                  {s.grade}
                </span>
                <h3 className="font-mono font-bold text-sm text-[#141414] mt-1.5 uppercase">{s.nom} {s.prenom}</h3>
                <p className="text-xs text-gray-600 font-bold uppercase">{s.fonction}</p>
              </div>
              <span className="font-mono text-xs font-bold text-[#F27D26]">{s.matricule}</span>
            </div>

            <div className="space-y-1 text-xs text-[#141414] border-t border-[#141414]/20 pt-2 font-mono">
              <div className="flex justify-between">
                <span className="opacity-70">DEPARTEMENT:</span>
                <span className="font-bold text-[#141414] uppercase">{s.departement}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">CHARGE_HORAIRE:</span>
                <span className="font-bold text-[#141414]">{s.chargeHoraireAttribuee} HEURES</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">PRESTATION_MENSUELLE:</span>
                <span className="font-black text-[#F27D26]">${s.prestationMoisUSD} USD</span>
              </div>
            </div>

            <div className="border-t border-[#141414]/20 pt-2 flex items-center justify-between text-[10px] font-mono">
              <span className="flex items-center gap-1 text-gray-700"><Mail className="w-3 h-3 text-[#141414]" /> {s.email}</span>
              <span className="font-bold bg-[#E4E3E0] text-[#141414] px-1.5 py-0.5 border border-[#141414] uppercase">{s.statut}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 font-mono">
          <div className="bg-white max-w-md w-full border-2 border-[#141414]">
            <div className="bg-[#141414] text-white p-3 flex items-center justify-between">
              <h3 className="font-mono font-bold text-xs uppercase">NOUVEAU_MEMBRE_ENSEIGNANT</h3>
              <button onClick={() => setShowAddModal(false)} className="text-white hover:text-[#F27D26]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStaff} className="p-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">NOM *</label>
                  <input
                    type="text"
                    required
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">PRENOM *</label>
                  <input
                    type="text"
                    required
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">GRADE_ACADEMIQUE</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as any)}
                  className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
                >
                  <option value="Professeur Ordinaire">Professeur Ordinaire</option>
                  <option value="Professeur">Professeur</option>
                  <option value="Chef de Travaux">Chef de Travaux</option>
                  <option value="Assistant">Assistant</option>
                  <option value="Agent Administratif">Agent Administratif</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">FONCTION_OFFICIELLE</label>
                <input
                  type="text"
                  value={fonction}
                  onChange={(e) => setFonction(e.target.value)}
                  className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
                />
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
                  ENREGISTRER
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
