import React, { useState } from 'react';
import { Course, ScheduleItem, Section, Level, StaffMember } from '../types';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  Download, 
  Filter, 
  X
} from 'lucide-react';

interface CoursesModuleProps {
  courses: Course[];
  schedules: ScheduleItem[];
  staff: StaffMember[];
  onAddCourse: (course: Course) => void;
  onAddScheduleItem: (item: ScheduleItem) => void;
}

export const CoursesModule: React.FC<CoursesModuleProps> = ({
  courses,
  schedules,
  staff,
  onAddCourse,
  onAddScheduleItem
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'courses' | 'timetable'>('timetable');
  const [selectedSection, setSelectedSection] = useState<string>('Tous');
  const [selectedLevel, setSelectedLevel] = useState<string>('Tous');
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);

  // New course state
  const [code, setCode] = useState('');
  const [titre, setTitre] = useState('');
  const [ue, setUe] = useState('UE301: Génie Logiciel & Réseaux');
  const [credits, setCredits] = useState(5);
  const [section, setSection] = useState<Section>('Informatique Appliquée');
  const [niveau, setNiveau] = useState<Level>('L3');
  const [enseignantNom, setEnseignantNom] = useState('CT Ir. Pascal BIRINDWA');

  const filteredCourses = courses.filter(c => {
    const matchSec = selectedSection === 'Tous' || c.section === selectedSection;
    const matchLev = selectedLevel === 'Tous' || c.niveau === selectedLevel;
    return matchSec && matchLev;
  });

  const filteredSchedules = schedules.filter(s => {
    const matchSec = selectedSection === 'Tous' || s.section === selectedSection;
    const matchLev = selectedLevel === 'Tous' || s.niveau === selectedLevel;
    return matchSec && matchLev;
  });

  const DAYS: Array<'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi'> = [
    'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
  ];

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !titre) return;

    const created: Course = {
      id: `crs-${Date.now()}`,
      code,
      titre,
      ue,
      semestre: 'S5',
      credits: Number(credits),
      heuresCM: 30,
      heuresTP: 20,
      enseignantId: 'usr-prof-1',
      enseignantNom,
      section,
      niveau
    };

    onAddCourse(created);
    setShowAddCourseModal(false);
    setCode('');
    setTitre('');
  };

  return (
    <div id="sigu-courses-view" className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1 font-heading">
            <BookOpen className="w-4 h-4 text-emerald-800" />
            Secrétariat Académique & Pédagogie
          </div>
          <h2 className="text-lg font-bold text-slate-900 font-heading uppercase tracking-tight">
            Programmes d'Enseignement & Emplois du Temps
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Planification des cours LMD, affectation des salles et crédits ECTS
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200">
            <button
              onClick={() => setActiveSubTab('timetable')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors font-heading uppercase ${
                activeSubTab === 'timetable' ? 'bg-emerald-900 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200/60'
              }`}
            >
              Emploi du Temps
            </button>
            <button
              onClick={() => setActiveSubTab('courses')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors font-heading uppercase ${
                activeSubTab === 'courses' ? 'bg-emerald-900 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200/60'
              }`}
            >
              Programme ({courses.length})
            </button>
          </div>

          <button
            onClick={() => setShowAddCourseModal(true)}
            className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 border border-emerald-950 transition-all uppercase font-heading shadow-xs"
          >
            <Plus className="w-4 h-4 text-amber-400" /> Ajouter un Cours
          </button>
        </div>
      </div>

      {/* Section Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center space-x-1.5 font-bold text-slate-700 uppercase font-heading">
          <Filter className="w-4 h-4 text-emerald-800" /> Filtrer:
        </div>

        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium text-slate-900"
        >
          <option value="Tous">Toutes les Sections</option>
          <option value="Informatique Appliquée">Informatique Appliquée</option>
          <option value="Génie Électrique">Génie Électrique</option>
          <option value="Génie Mécanique">Génie Mécanique</option>
          <option value="Génie Civil">Génie Civil</option>
          <option value="Maintenance Industrielle">Maintenance Industrielle</option>
        </select>

        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium text-slate-900"
        >
          <option value="Tous">Tous les Niveaux (LMD)</option>
          <option value="L1">L1</option>
          <option value="L2">L2</option>
          <option value="L3">L3</option>
          <option value="M1">M1</option>
          <option value="M2">M2</option>
        </select>
      </div>

      {/* Subtab 1: Timetable */}
      {activeSubTab === 'timetable' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DAYS.map(day => {
              const daySchedules = filteredSchedules.filter(s => s.jour === day);

              return (
                <div key={day} className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                  <div className="bg-emerald-950 text-white px-4 py-3 font-bold text-xs flex items-center justify-between uppercase font-heading">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400" /> {day}
                    </span>
                    <span className="text-[10px] bg-emerald-900 text-emerald-100 font-bold px-2.5 py-0.5 rounded-full border border-emerald-800">
                      {daySchedules.length} séance(s)
                    </span>
                  </div>

                  <div className="p-3.5 space-y-2.5 min-h-[140px]">
                    {daySchedules.length === 0 ? (
                      <div className="text-xs text-slate-400 italic text-center py-8">
                        Aucun cours programmé
                      </div>
                    ) : (
                      daySchedules.map(sch => (
                        <div key={sch.id} className="p-3 bg-slate-50 rounded-xl border-l-4 border-emerald-800 border border-slate-200/60 space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                            <span>{sch.courseTitre}</span>
                            <span className="bg-amber-100 text-amber-900 px-2 py-0.5 text-[10px] font-bold rounded-full border border-amber-200 uppercase font-heading">
                              {sch.type}
                            </span>
                          </div>

                          <div className="text-[11px] text-slate-600 flex items-center gap-1.5 font-medium">
                            <Clock className="w-3.5 h-3.5 text-emerald-800" /> {sch.heureDebut} - {sch.heureFin}
                          </div>

                          <div className="text-[11px] text-slate-600 flex items-center gap-1.5 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-amber-600" /> {sch.salle}
                          </div>

                          <div className="text-[10px] text-emerald-900 font-bold border-t border-slate-200/80 pt-1.5 mt-1 uppercase">
                            {sch.enseignantNom} ({sch.section} {sch.niveau})
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subtab 2: Course List View */}
      {activeSubTab === 'courses' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-emerald-950 text-white font-bold uppercase tracking-wider text-[10px] font-heading">
                  <th className="p-3.5">Code</th>
                  <th className="p-3.5">Intitulé du Cours</th>
                  <th className="p-3.5">Unité d'Enseignement (UE)</th>
                  <th className="p-3.5">Crédits ECTS</th>
                  <th className="p-3.5">Volume Horaire</th>
                  <th className="p-3.5">Enseignant Titulaire</th>
                  <th className="p-3.5">Filière & Niveau</th>
                  <th className="p-3.5 text-right">Syllabus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCourses.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-emerald-900">{c.code}</td>
                    <td className="p-3.5 font-bold text-slate-900">{c.titre}</td>
                    <td className="p-3.5 text-slate-600 font-medium">{c.ue}</td>
                    <td className="p-3.5 font-extrabold text-emerald-900">{c.credits} ECTS</td>
                    <td className="p-3.5 text-slate-600">{c.heuresCM}h CM / {c.heuresTP}h TP</td>
                    <td className="p-3.5 font-semibold text-slate-800">{c.enseignantNom}</td>
                    <td className="p-3.5">
                      <span className="bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-emerald-300">
                        {c.section} ({c.niveau})
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button 
                        onClick={() => alert(`Téléchargement du syllabus officiel pour ${c.code} - ISTA Burhuza`)}
                        className="bg-emerald-900 hover:bg-emerald-950 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold inline-flex items-center gap-1.5 shadow-xs font-heading uppercase transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-amber-300" /> Syllabus PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 bg-emerald-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl border border-emerald-900/30 shadow-2xl overflow-hidden">
            <div className="bg-emerald-950 text-white p-4 flex items-center justify-between border-b border-emerald-900">
              <h3 className="font-heading font-bold text-sm uppercase">Ajouter un Cours au Programme</h3>
              <button onClick={() => setShowAddCourseModal(false)} className="text-emerald-300 hover:text-white p-1 rounded-md">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Code du Cours (ex: INF304) *</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="INF304"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-700 uppercase"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Intitulé du Cours *</label>
                <input
                  type="text"
                  required
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  placeholder="Intelligence Artificielle"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Crédits ECTS</label>
                  <input
                    type="number"
                    min={1}
                    max={15}
                    value={credits}
                    onChange={(e) => setCredits(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-emerald-900 focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Section</label>
                  <select
                    value={section}
                    onChange={(e) => setSection(e.target.value as Section)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="Informatique Appliquée">Informatique Appliquée</option>
                    <option value="Génie Électrique">Génie Électrique</option>
                    <option value="Génie Mécanique">Génie Mécanique</option>
                    <option value="Génie Civil">Génie Civil</option>
                    <option value="Maintenance Industrielle">Maintenance Industrielle</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Enseignant Titulaire</label>
                <input
                  type="text"
                  value={enseignantNom}
                  onChange={(e) => setEnseignantNom(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddCourseModal(false)}
                  className="px-4 py-2 text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl uppercase font-heading"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-emerald-900 text-white hover:bg-emerald-950 rounded-xl border border-emerald-950 uppercase transition-colors font-heading shadow-xs"
                >
                  Ajouter au Programme
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
