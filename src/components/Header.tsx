import React from 'react';
import { User, Role } from '../types';
import istaLogo from '../assets/images/ista_logo_1784981336164.jpg';
import { 
  Building2, 
  ShieldCheck, 
  Bell, 
  Search, 
  ChevronDown,
  Globe,
  LogOut
} from 'lucide-react';

interface HeaderProps {
  currentUser: User;
  onOpenRoleSelector: () => void;
  unreadCount: number;
  onGoToPublicSite?: () => void;
  onLogout?: () => void;
  onToggleMobileSidebar?: () => void;
}

const ROLE_LABELS: Record<Role, { label: string; badgeColor: string }> = {
  admin: { label: 'Administrateur (DG)', badgeColor: 'bg-emerald-950 text-white border border-emerald-800' },
  chef_section: { label: 'Chef de Section', badgeColor: 'bg-emerald-800 text-white border border-emerald-700 font-bold' },
  president_jury: { label: 'Président du Jury', badgeColor: 'bg-amber-100 text-amber-900 border border-amber-300 font-bold' },
  secretaire_jury: { label: 'Secrétaire du Jury', badgeColor: 'bg-emerald-100 text-emerald-900 border border-emerald-300' },
  enseignant: { label: 'Enseignant / Prof', badgeColor: 'bg-slate-800 text-white border border-slate-700' },
  etudiant: { label: 'Étudiant', badgeColor: 'bg-slate-100 text-slate-900 border border-slate-300' },
  financier: { label: 'Service Financier', badgeColor: 'bg-amber-500 text-slate-950 border border-amber-600 font-bold' }
};

export const Header: React.FC<HeaderProps> = ({ 
  currentUser, 
  onOpenRoleSelector, 
  unreadCount,
  onGoToPublicSite,
  onLogout,
  onToggleMobileSidebar
}) => {
  const roleInfo = ROLE_LABELS[currentUser.role] || { label: currentUser.role, badgeColor: 'bg-emerald-800 text-white' };

  return (
    <header id="sigu-main-header" className="bg-white border-b border-emerald-900/10 sticky top-0 z-30 shadow-xs">
      {/* Top Banner */}
      <div className="bg-emerald-950 text-white text-[11px] font-medium py-1 px-4 sm:px-6 flex items-center justify-between border-b border-emerald-900/40">
        <div className="flex items-center space-x-3">
          <span className="flex items-center gap-1.5 font-bold text-emerald-300">
            <Building2 className="w-3.5 h-3.5 text-amber-400" /> ISTA BURHUZA • PORTAIL ACADÉMIQUE D'ADMINISTRATION (SIGU)
          </span>
          <span className="hidden sm:inline opacity-30">|</span>
          <span className="hidden sm:inline opacity-80 text-emerald-200">
            Enseignement Supérieur et Universitaire (ESU RDC)
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="flex items-center gap-1 text-emerald-300 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Système Sécurisé
          </span>
          <span className="bg-amber-400 text-slate-950 font-bold px-2 py-0.5 text-[10px] uppercase rounded-full">
            2025-2026
          </span>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand / Clean Borderless Logo - Clickable to toggle mobile sidebar */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <button
            onClick={onToggleMobileSidebar}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-emerald-600 rounded-lg p-1 transition-all"
            title="Cliquer pour ouvrir le menu / sidebar mobile"
          >
            {/* Borderless square logo */}
            <img 
              src={istaLogo} 
              alt="Logo ISTA" 
              referrerPolicy="no-referrer" 
              className="w-10 h-10 object-contain aspect-square transition-transform group-hover:scale-105 flex-shrink-0" 
            />
            <div className="text-left flex-shrink-0">
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg text-emerald-950 font-heading tracking-tight leading-none uppercase group-hover:text-emerald-800 transition-colors">
                  SIGU ISTA
                </h1>
                <span className="text-[10px] uppercase font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full border border-emerald-200">
                  Administration
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-semibold uppercase tracking-wide mt-0.5">
                Système Intégré de Gestion Universitaire
              </p>
            </div>
          </button>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input 
              type="text"
              placeholder="Rechercher: Étudiant, Matricule, PV, Reçu..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white text-slate-900 placeholder-slate-400 transition-colors"
            />
          </div>
        </div>

        {/* User Role Switcher, Public Site Link & Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Mobile Sidebar Button Prompt */}
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden bg-emerald-800 hover:bg-emerald-900 text-white p-2 rounded-lg flex items-center justify-center transition-colors"
            title="Menu Nav"
          >
            <img src={istaLogo} alt="Menu" referrerPolicy="no-referrer" className="w-6 h-6 object-contain" />
          </button>

          {/* Link back to public website */}
          {onGoToPublicSite && (
            <button
              onClick={onGoToPublicSite}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 transition-colors uppercase font-heading"
              title="Voir le site web public de l'université"
            >
              <Globe className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">Site Public</span>
            </button>
          )}

          {/* Unread Alerts Counter */}
          <button 
            id="btn-header-notifications"
            className="relative p-2 bg-slate-100 hover:bg-emerald-800 hover:text-white rounded-lg border border-slate-200 transition-colors"
            title="Notifications & Alerte"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-bold text-[9px] w-4 h-4 rounded-full border border-emerald-900 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Active Role Selector Trigger */}
          <button
            id="btn-switch-user-role"
            onClick={onOpenRoleSelector}
            className="flex items-center space-x-2 bg-slate-50 hover:bg-emerald-900 hover:text-white px-3 py-1.5 rounded-lg border border-slate-200 transition-all text-left group"
          >
            <div className="w-7 h-7 bg-emerald-800 text-white group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center text-xs font-bold font-heading rounded-md border border-emerald-900">
              {currentUser.name.charAt(0)}
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-slate-900 group-hover:text-white flex items-center gap-1 leading-tight font-heading uppercase">
                {currentUser.name}
                <ChevronDown className="w-3 h-3 text-slate-500 group-hover:text-amber-400 transition-transform" />
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${roleInfo.badgeColor}`}>
                  {roleInfo.label}
                </span>
              </div>
            </div>
          </button>

          {/* Logout Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-2 bg-slate-100 hover:bg-red-700 hover:text-white text-slate-700 rounded-lg border border-slate-200 transition-colors"
              title="Déconnexion du SIGU"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
