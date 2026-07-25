import React from 'react';
import { User, Student, Course, Payment, DeliberationSession, Announcement, AcademicEvent } from '../types';
import { 
  Users, 
  GraduationCap, 
  Wallet, 
  Award, 
  Clock, 
  Bell, 
  ArrowUpRight, 
  Building, 
  FileCheck, 
  TrendingUp,
  PlusCircle,
  FileSpreadsheet
} from 'lucide-react';

interface DashboardProps {
  currentUser: User;
  students: Student[];
  courses: Course[];
  payments: Payment[];
  deliberations: DeliberationSession[];
  announcements: Announcement[];
  events: AcademicEvent[];
  onNavigateTab: (tab: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  students,
  courses,
  payments,
  deliberations,
  announcements,
  events,
  onNavigateTab
}) => {
  // Metric Calculations
  const totalStudents = students.length;
  const totalPaidUSD = payments.reduce((acc, curr) => acc + (curr.statut === 'Validé' ? curr.montantUSD : 0), 0);
  const totalExpectedUSD = students.reduce((acc, curr) => acc + curr.fraisTotaux, 0);
  const recoveryRate = totalExpectedUSD > 0 ? Math.round((totalPaidUSD / totalExpectedUSD) * 100) : 0;

  const totalCourses = courses.length;
  const activeDeliberations = deliberations.filter(d => d.statut !== 'Clôturée & Validée').length;

  return (
    <div id="sigu-dashboard-view" className="space-y-6 font-sans">
      {/* Welcome Institutional Banner */}
      <div className="bg-emerald-950 text-white p-6 rounded-2xl border border-emerald-900 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1 font-heading">
              <Building className="w-4 h-4 text-emerald-400" /> CAMPUS DE BURHUZA • PORTAIL D'ADMINISTRATION
            </div>
            <h2 className="text-2xl font-extrabold font-heading tracking-tight text-white uppercase">
              Tableau de Bord — {currentUser.name}
            </h2>
            <p className="text-emerald-100 text-xs mt-1 max-w-2xl font-medium">
              Profil actif: <span className="bg-emerald-800 text-white font-bold px-2.5 py-0.5 rounded-full border border-emerald-600 uppercase">{currentUser.role.replace('_', ' ')}</span> | Département: <strong className="text-amber-300">{currentUser.department}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-quick-delib"
              onClick={() => onNavigateTab('deliberation')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 border border-amber-600 transition-all uppercase font-heading shadow-xs"
            >
              <Award className="w-4 h-4" /> Jury LMD & Délibérations
            </button>
            <button
              id="btn-quick-finances"
              onClick={() => onNavigateTab('finances')}
              className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs border border-emerald-600 flex items-center gap-2 transition-all uppercase font-heading shadow-xs"
            >
              <Wallet className="w-4 h-4 text-amber-300" /> Caisse & Finances
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Students */}
        <div 
          onClick={() => onNavigateTab('students')}
          className="bg-white p-5 rounded-xl border border-slate-200/80 hover:border-emerald-700 transition-all cursor-pointer group flex flex-col justify-between shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide font-heading">Effectif Étudiants</span>
            <div className="w-9 h-9 bg-emerald-100 text-emerald-900 group-hover:bg-emerald-800 group-hover:text-white flex items-center justify-center font-bold text-xs rounded-lg transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between font-heading">
            <span className="text-3xl font-extrabold text-slate-900">{totalStudents}</span>
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform uppercase">
              Dossiers <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-600 flex justify-between border-t border-slate-100 pt-2 font-medium">
            <span>5 Sections Agréées</span>
            <span className="font-bold text-emerald-900">Inscrits 2025-2026</span>
          </div>
        </div>

        {/* Card 2: Financial Recovery */}
        <div 
          onClick={() => onNavigateTab('finances')}
          className="bg-white p-5 rounded-xl border border-slate-200/80 hover:border-emerald-700 transition-all cursor-pointer group flex flex-col justify-between shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide font-heading">Recouvrement Frais</span>
            <div className="w-9 h-9 bg-emerald-100 text-emerald-900 group-hover:bg-emerald-800 group-hover:text-white flex items-center justify-center font-bold text-xs rounded-lg transition-colors">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between font-heading">
            <span className="text-3xl font-extrabold text-emerald-900">${totalPaidUSD} <span className="text-xs font-bold text-slate-500">USD</span></span>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
              {recoveryRate}% Récouvré
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-600 flex justify-between border-t border-slate-100 pt-2 font-medium">
            <span>Attendu: ${totalExpectedUSD}</span>
            <span className="font-bold text-emerald-900">Caisse Burhuza</span>
          </div>
        </div>

        {/* Card 3: Courses & Credits */}
        <div 
          onClick={() => onNavigateTab('courses')}
          className="bg-white p-5 rounded-xl border border-slate-200/80 hover:border-emerald-700 transition-all cursor-pointer group flex flex-col justify-between shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide font-heading">Programmes & Cours</span>
            <div className="w-9 h-9 bg-emerald-100 text-emerald-900 group-hover:bg-emerald-800 group-hover:text-white flex items-center justify-center font-bold text-xs rounded-lg transition-colors">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between font-heading">
            <span className="text-3xl font-extrabold text-slate-900">{totalCourses}</span>
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform uppercase">
              Syllabus <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-600 flex justify-between border-t border-slate-100 pt-2 font-medium">
            <span>Crédits ECTS LMD</span>
            <span className="font-bold text-emerald-900">5 Filières</span>
          </div>
        </div>

        {/* Card 4: Active Deliberations */}
        <div 
          onClick={() => onNavigateTab('deliberation')}
          className="bg-white p-5 rounded-xl border border-slate-200/80 hover:border-emerald-700 transition-all cursor-pointer group flex flex-col justify-between shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide font-heading">Sessions du Jury</span>
            <div className="w-9 h-9 bg-emerald-100 text-emerald-900 group-hover:bg-emerald-800 group-hover:text-white flex items-center justify-center font-bold text-xs rounded-lg transition-colors">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between font-heading">
            <span className="text-3xl font-extrabold text-slate-900">{deliberations.length}</span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full border border-emerald-300 uppercase">
              {activeDeliberations} En cours
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-600 flex justify-between border-t border-slate-100 pt-2 font-medium">
            <span>Procès-Verbaux</span>
            <span className="font-bold text-emerald-900">Jury Officiel</span>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section Breakdown / Department Overview */}
          <div className="bg-white border-2 border-slate-200 p-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <h3 className="font-heading font-bold text-sm text-emerald-950 uppercase tracking-wide flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-800" />
                Répartition des Étudiants par Section (Campus Burhuza)
              </h3>
              <button
                onClick={() => onNavigateTab('students')}
                className="text-xs font-bold text-emerald-800 hover:underline uppercase font-heading"
              >
                Voir la Liste →
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { name: 'Informatique Appliquée', count: 12, percent: 35 },
                { name: 'Génie Électrique', count: 8, percent: 25 },
                { name: 'Génie Mécanique', count: 6, percent: 18 },
                { name: 'Génie Civil', count: 5, percent: 12 },
                { name: 'Agronomie & Environnement', count: 4, percent: 10 },
              ].map(sec => (
                <div key={sec.name} className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>{sec.name}</span>
                    <span>{sec.count} Inscrits ({sec.percent}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 border border-slate-200">
                    <div className="bg-emerald-800 h-full transition-all duration-500" style={{ width: `${sec.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deliberation Workflow Quick Access */}
          <div className="bg-emerald-950 text-white p-6 border-2 border-emerald-900 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="font-heading font-bold text-sm tracking-wide text-white uppercase">
                  Workflow des Délibérations LMD (Jury Officiel ISTA)
                </h3>
              </div>
              <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 uppercase border border-amber-500">
                LMD 2026
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-emerald-900/60 p-3 border border-emerald-700">
                <div className="font-bold text-amber-300 font-heading">1. Saisie des Notes</div>
                <div className="text-[11px] text-emerald-100 mt-0.5">Enseignants & Titulaires</div>
              </div>

              <div className="bg-emerald-900/60 p-3 border border-emerald-700">
                <div className="font-bold text-amber-300 font-heading">2. Verrouillage Section</div>
                <div className="text-[11px] text-emerald-100 mt-0.5">Validation Chef Section</div>
              </div>

              <div className="bg-emerald-900/60 p-3 border border-emerald-700">
                <div className="font-bold text-amber-300 font-heading">3. Calcul des Moyennes</div>
                <div className="text-[11px] text-emerald-100 mt-0.5">Pondérations UE & ECTS</div>
              </div>

              <div className="bg-emerald-900/60 p-3 border border-emerald-700">
                <div className="font-bold text-amber-300 font-heading">4. Session du Jury</div>
                <div className="text-[11px] text-emerald-100 mt-0.5">Président & Secrétaire</div>
              </div>

              <div className="bg-emerald-900/60 p-3 border border-emerald-700">
                <div className="font-bold text-amber-300 font-heading">5. Homologation DG</div>
                <div className="text-[11px] text-emerald-100 mt-0.5">Direction Générale ISTA</div>
              </div>

              <div className="bg-emerald-900/60 p-3 border border-emerald-700">
                <div className="font-bold text-amber-300 font-heading">6. Relevé & PV PDF</div>
                <div className="text-[11px] text-emerald-100 mt-0.5">Publication aux étudiants</div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => onNavigateTab('deliberation')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 text-xs transition-colors flex items-center gap-1.5 border border-amber-600 font-heading uppercase"
              >
                Accéder au Module de Délibération →
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col wide) */}
        <div className="space-y-6">
          {/* Institutional Announcements Panel */}
          <div className="bg-white border-2 border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-heading font-bold text-xs text-emerald-950 uppercase tracking-wide flex items-center gap-2">
                <Bell className="w-4 h-4 text-emerald-800" />
                Communiqués Internes
              </h3>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 border border-emerald-300 uppercase">
                Récent
              </span>
            </div>

            <div className="space-y-3">
              {announcements.slice(0, 3).map(ann => (
                <div key={ann.id} className="p-3 bg-slate-50 border-l-4 border-emerald-800 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold bg-emerald-800 text-white px-1.5 py-0.2 uppercase">
                      {ann.auteurRole}
                    </span>
                    <span className="text-slate-500">{ann.date}</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 font-heading">{ann.titre}</h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">{ann.contenu}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigateTab('communication')}
              className="w-full py-2 text-center text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 border border-emerald-950 transition-colors uppercase font-heading"
            >
              Tous les Communiqués →
            </button>
          </div>

          {/* Academic Agenda / Events Preview */}
          <div className="bg-white border-2 border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-heading font-bold text-xs text-emerald-950 uppercase tracking-wide flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-800" />
                Agenda & Dates Clés
              </h3>
            </div>

            <div className="space-y-2.5">
              {events.slice(0, 3).map(evt => (
                <div key={evt.id} className="flex items-start space-x-3 p-2.5 bg-slate-50 border border-slate-200">
                  <div className="bg-emerald-900 text-white font-bold p-1.5 text-center min-w-[45px] border border-emerald-950">
                    <div className="text-[10px] uppercase font-heading text-amber-400">{evt.dateDebut.split('-')[1]}</div>
                    <div className="text-xs leading-none">{evt.dateDebut.split('-')[2]}</div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-900 truncate font-heading">{evt.titre}</div>
                    <div className="text-[11px] text-slate-600 truncate mt-0.5">{evt.lieu} • <strong className="text-emerald-900">{evt.type}</strong></div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigateTab('events')}
              className="w-full py-2 text-center text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors uppercase font-heading"
            >
              Calendrier Académique →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
