import React from 'react';
import { User, Role } from '../types';
import { ShieldCheck, Check, X, Info } from 'lucide-react';

interface UserRoleSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  currentUser: User;
  onSelectUser: (user: User) => void;
}

const ROLE_DESCRIPTIONS: Record<Role, string> = {
  admin: 'Supervision globale du campus, validation finale des PVs, gestion des accès et comptes.',
  chef_section: 'Gestion des programmes de cours, contrôle des notes d\'examens, organisation des délibérations.',
  president_jury: 'Présidence des séances de délibération, arbitrage des notes et signature des PVs officiels.',
  secretaire_jury: 'Saisie et importation des cotes, rédaction des procès-verbaux, impression des relevés.',
  enseignant: 'Saisie des notes (intra/examen) pour ses cours, téléversement des syllabus.',
  etudiant: 'Consultation des notes LMD, relevés de cotes, reçu de frais, emplois du temps et messagerie.',
  financier: 'Encaissement des frais académiques, délivrance des reçus PDF sécurisés, gestion de caisse.'
};

export const UserRoleSelector: React.FC<UserRoleSelectorProps> = ({
  isOpen,
  onClose,
  users,
  currentUser,
  onSelectUser
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-emerald-950/80 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white max-w-2xl w-full border-2 border-emerald-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-950 text-white p-4 flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="font-heading font-bold text-sm uppercase leading-tight text-white">
                Changer de Rôle Utilisateur (Mode Démo RBAC)
              </h3>
              <p className="text-xs text-emerald-200">
                Sélectionnez un profil pour tester les droits d'accès du Portail SIGU-ISTA
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles List */}
        <div className="p-4 max-h-[70vh] overflow-y-auto space-y-2.5">
          {users.map(u => {
            const isSelected = u.id === currentUser.id;
            const description = ROLE_DESCRIPTIONS[u.role];

            return (
              <button
                key={u.id}
                id={`btn-select-user-${u.id}`}
                onClick={() => {
                  onSelectUser(u);
                  onClose();
                }}
                className={`w-full text-left p-3 border transition-colors flex items-start justify-between ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-800 border-l-8 border-l-emerald-800 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-9 h-9 flex-shrink-0 flex items-center justify-center font-bold text-xs text-white border border-emerald-900 font-heading ${
                    isSelected ? 'bg-amber-500 text-slate-950' : 'bg-emerald-900'
                  }`}>
                    {u.name.charAt(0)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 uppercase font-heading">
                        {u.name}
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 border border-emerald-300 uppercase">
                        {u.role.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="text-xs text-slate-700 font-medium mt-0.5">
                      {u.department} • <span className="font-bold text-emerald-800">{u.matricule}</span>
                    </div>

                    <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                      <span>{description}</span>
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-white bg-emerald-800 px-2.5 py-1 border border-emerald-950 uppercase flex-shrink-0 font-heading">
                    <Check className="w-3.5 h-3.5 text-amber-300" /> ACTIF
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-700">
          <span className="font-medium text-xs">Synchronisation instantanée des privilèges RBAC.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs border border-emerald-950 uppercase transition-colors font-heading"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
