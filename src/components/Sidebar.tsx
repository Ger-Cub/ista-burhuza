import React from 'react';
import { Role } from '../types';
import istaLogo from '../assets/images/ista_logo_1784981336164.jpg';
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
  Newspaper,
  ChevronRight,
  X
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
  | 'events'
  | 'blog';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  userRole: Role;
  pendingBlogCount?: number;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  id: TabType;
  label: string;
  icon: React.ElementType;
  description: string;
  rolesAllowed: Role[];
  badgeCount?: number;
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
    id: 'blog',
    label: 'Articles de Blog',
    icon: Newspaper,
    description: 'Modération, Propositions & News',
    rolesAllowed: ['admin', 'chef_section', 'president_jury', 'secretaire_jury', 'enseignant', 'etudiant', 'financier']
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

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  userRole,
  pendingBlogCount = 0,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const filteredItems = NAV_ITEMS.filter(item => item.rolesAllowed.includes(userRole));

  const handleSelectTab = (tab: TabType) => {
    setActiveTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  const navContent = (
    <div className="flex flex-col h-full bg-white rounded-xl border border-emerald-900/15 overflow-hidden shadow-sm">
      {/* Sidebar Header */}
      <div className="p-3.5 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-900">
        <div className="flex items-center space-x-2.5">
          <img src={istaLogo} alt="Logo ISTA" referrerPolicy="no-referrer" className="w-8 h-8 object-contain aspect-square" />
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-400 block leading-tight">
              CAMPUS ISTA BURHUZA
            </span>
            <h2 className="font-heading font-bold text-xs text-white uppercase tracking-wider">
              MODULES D'ADMINISTRATION
            </h2>
          </div>
        </div>

        {onCloseMobile && (
          <button 
            onClick={onCloseMobile} 
            className="md:hidden p-1 text-emerald-300 hover:text-white hover:bg-emerald-900 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav List */}
      <nav className="p-2 space-y-1.5 flex-1 overflow-y-auto">
        {filteredItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isBlog = item.id === 'blog';

          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => handleSelectTab(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-all border ${
                isActive 
                  ? 'bg-emerald-900 text-white font-bold border-emerald-950 shadow-xs' 
                  : 'bg-white text-slate-800 hover:bg-emerald-50 hover:text-emerald-900 border-transparent font-medium'
              }`}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className={`p-1.5 rounded-md relative ${isActive ? 'bg-amber-400 text-slate-950' : 'bg-emerald-100 text-emerald-900'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-xs leading-none uppercase font-heading font-bold flex items-center gap-1.5">
                    <span>{item.label}</span>
                    {isBlog && pendingBlogCount > 0 && (
                      <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                        {pendingBlogCount}
                      </span>
                    )}
                  </div>
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
      <div className="p-3 border-t border-emerald-900/10 bg-slate-50 rounded-b-xl">
        <div className="text-[10px] font-bold font-heading text-emerald-950 uppercase tracking-wider">
          SECRÉTARIAT ACADÉMIQUE
        </div>
        <div className="text-[10px] text-slate-600 mt-0.5 leading-tight">
          contact@ista-burhuza.ac.cd
        </div>
        <div className="text-[10px] font-bold text-emerald-800 mt-0.5">
          +243 997 123 456
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Persistent, fixed height, internal scroll) */}
      <aside id="sigu-sidebar" className="hidden md:block w-64 flex-shrink-0 h-full overflow-hidden">
        {navContent}
      </aside>

      {/* Mobile Slide-over Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-emerald-950/80 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          
          {/* Slide Drawer Panel */}
          <div className="relative w-80 max-w-[85vw] h-full p-3 z-10 animate-in slide-in-from-left duration-200">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};

