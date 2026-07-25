import React from 'react';
import { Role } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Wallet, 
  Award, 
  UserCheck, 
  FileText, 
  MessageSquare, 
  CalendarDays,
  ChevronRight
} from 'lucide-react';

export type TabType = 
  | 'dashboard'
  | 'students'
  | 'courses'
  | 'finances'
  | 'deliberation'
  | 'hr'
  | 'documents'
  | 'communication'
  | 'events';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  userRole: Role;
}

interface NavItem {
  id: TabType;
  label: string;
  icon: React.ElementType;
  description: string;
  rolesAllowed: Role[];
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Tableau de bord',
    icon: LayoutDashboard,
    description: 'Vue d\'ensemble & Synthèse',
    rolesAllowed: ['admin', 'chef_section', 'president_jury', 'secretaire_jury', 'enseignant', 'etudiant', 'financier']
  },
  {
    id: 'students',
    label: 'Gestion des Étudiants',
    icon: Users,
    description: 'Inscriptions, Profils & Parcours',
    rolesAllowed: ['admin', 'chef_section', 'secretaire_jury', 'enseignant', 'etudiant', 'financier']
  },
  {
    id: 'courses',
    label: 'Cours & Planning',
    icon: BookOpen,
    description: 'Matières, UEs & Horaires',
    rolesAllowed: ['admin', 'chef_section', 'president_jury', 'secretaire_jury', 'enseignant', 'etudiant']
  },
  {
    id: 'deliberation',
    label: 'Délibération LMD',
    icon: Award,
    description: 'Cotes, Jury & Procès-Verbaux',
    rolesAllowed: ['admin', 'chef_section', 'president_jury', 'secretaire_jury', 'enseignant', 'etudiant']
  },
  {
    id: 'finances',
    label: 'Gestion Financière',
    icon: Wallet,
    description: 'Frais, Reçus PDF & Caisse',
    rolesAllowed: ['admin', 'financier', 'etudiant']
  },
  {
    id: 'hr',
    label: 'Ressources Humaines',
    icon: UserCheck,
    description: 'Corps Enseignant & Contrats',
    rolesAllowed: ['admin', 'chef_section']
  },
  {
    id: 'documents',
    label: 'Gestion Documentaire',
    icon: FileText,
    description: 'PV, Syllabus & Attestations',
    rolesAllowed: ['admin', 'chef_section', 'president_jury', 'secretaire_jury', 'enseignant', 'etudiant', 'financier']
  },
  {
    id: 'communication',
    label: 'Communication',
    icon: MessageSquare,
    description: 'Annonces & Messagerie',
    rolesAllowed: ['admin', 'chef_section', 'president_jury', 'secretaire_jury', 'enseignant', 'etudiant', 'financier']
  },
  {
    id: 'events',
    label: 'Événements & Agenda',
    icon: CalendarDays,
    description: 'Examens, Soutenances & Cérémonies',
    rolesAllowed: ['admin', 'chef_section', 'president_jury', 'secretaire_jury', 'enseignant', 'etudiant', 'financier']
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, userRole }) => {
  const filteredItems = NAV_ITEMS.filter(item => item.rolesAllowed.includes(userRole));

  return (
    <aside id="sigu-sidebar" className="w-full md:w-64 bg-white text-slate-900 flex-shrink-0 border border-emerald-900/20 shadow-xs">
      <div className="p-3 border-b border-emerald-900/20 bg-emerald-950 text-white">
        <span className="text-[10px] uppercase font-bold text-amber-400 block mb-0.5 tracking-wider">
          CAMPUS ISTA BURHUZA
        </span>
        <h2 className="font-heading font-bold text-xs text-white uppercase tracking-wider">
          MODULES D'ADMINISTRATION
        </h2>
      </div>

      <nav className="p-1 space-y-1">
        {filteredItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors border ${
                isActive 
                  ? 'bg-emerald-900 text-white font-bold border-emerald-950 border-l-4 border-l-amber-400' 
                  : 'bg-white text-slate-800 hover:bg-emerald-50 hover:text-emerald-900 border-transparent font-medium'
              }`}
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-amber-400' : 'text-emerald-800'}`} />
                <div className="truncate">
                  <div className="text-xs leading-none uppercase font-heading font-bold">{item.label}</div>
                  <div className={`text-[10px] truncate mt-1 ${isActive ? 'text-emerald-200' : 'text-slate-500'}`}>
                    {item.description}
                  </div>
                </div>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${
                isActive ? 'text-amber-400 translate-x-0.5' : 'text-slate-400'
              }`} />
            </button>
          );
        })}
      </nav>

      {/* Institutional Contact Footnote */}
      <div className="p-3 border-t border-emerald-900/20 mt-4 bg-slate-50">
        <div className="text-[10px] font-bold font-heading text-emerald-950 uppercase tracking-wider">
          SECRÉTARIAT ACADÉMIQUE
        </div>
        <div className="text-[10px] text-slate-600 mt-1 leading-tight">
          contact@ista-burhuza.ac.cd
        </div>
        <div className="text-[10px] font-bold text-emerald-800 mt-0.5">
          +243 997 123 456
        </div>
      </div>
    </aside>
  );
};
