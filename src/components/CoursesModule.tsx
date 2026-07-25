import React, { useState } from 'react';
import { Course, ScheduleItem, Section, Level, StaffMember } from '../types';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Plus, 
  Download, 
  Upload, 
  Filter, 
  X,
  FileCheck
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
    <div id="sigu-courses-view" className="space-y-4 font-mono">
      {/* Module Bar */}
      <div className="bg-white p-4 border border-[#141414] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-mono font-bold text-[#141414] flex items-center gap-2 uppercase tracking-wide">
            <BookOpen className="w-5 h-5 text-[#F27D26]" />
            PROGRAMMES_ENSEIGNEMENT // EMPLOIS_DU_TEMPS
          </h2>
          <p className="text-xs text-[#141414]/70 mt-0.5">
            PLANIFICATION DES COURS LMD, AFFECTATION SALLES ET CREDITATION ECTS
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="bg-[#E4E3E0] p-1 flex border border-[#141414]">
            <button
              onClick={() => setActiveSubTab('timetable')}
              className={`px-3 py-1 text-xs font-mono font-bold transition-colors uppercase ${
                activeSubTab === 'timetable' ? 'bg-[#141414] text-white' : 'text-[#141414] hover:bg-white'
              }`}
            >
              EMPLOI_DU_TEMPS
            </button>
            <button
              onClick={() => setActiveSubTab('courses')}
              className={`px-3 py-1 text-xs font-mono font-bold transition-colors uppercase ${
                activeSubTab === 'courses' ? 'bg-[#141414] text-white' : 'text-[#141414] hover:bg-white'
              }`}
            >
              PROGRAMME_COURS ({courses.length})
            </button>
          </div>

          <button
            onClick={() => setShowAddCourseModal(true)}
            className="bg-[#141414] hover:bg-[#F27D26] hover:text-black text-white font-mono font-bold px-3 py-2 text-xs flex items-center gap-1 border border-[#141414] transition-colors uppercase"
          >
            <Plus className="w-4 h-4 text-[#F27D26]" /> AJOUTER_COURS
          </button>
        </div>
      </div>

      {/* Section Filter */}
      <div className="bg-white p-3 border border-[#141414] flex flex-wrap items-center gap-3 font-mono text-xs">
        <div className="flex items-center space-x-2 font-bold text-[#141414] uppercase">
          <Filter className="w-4 h-4 text-[#F27D26]" /> FILTRER:
        </div>

        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="p-1.5 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
        >
          <option value="Tous">TOUTES_LES_SECTIONS</option>
          <option value="Informatique Appliquée">Informatique Appliquée</option>
          <option value="Génie Électrique">Génie Électrique</option>
          <option value="Génie Mécanique">Génie Mécanique</option>
          <option value="Génie Civil">Génie Civil</option>
          <option value="Maintenance Industrielle">Maintenance Industrielle</option>
        </select>

        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="p-1.5 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
        >
          <option value="Tous">TOUS_LES_NIVEAUX</option>
          <option value="L1">L1</option>
          <option value="L2">L2</option>
          <option value="L3">L3</option>
          <option value="M1">M1</option>
          <option value="M2">M2</option>
        </select>
      </div>

      {/* Subtab 1: Timetable / Emploi du Temps View */}
      {activeSubTab === 'timetable' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DAYS.map(day => {
              const daySchedules = filteredSchedules.filter(s => s.jour === day);

              return (
                <div key={day} className="bg-white border border-[#141414]">
                  <div className="bg-[#141414] text-white px-3 py-2 font-bold text-xs flex items-center justify-between uppercase">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#F27D26]" /> {day}
                    </span>
                    <span className="text-[9px] bg-[#E4E3E0] text-black font-bold px-1.5 py-0.5 border border-[#141414]">
                      {daySchedules.length} SEANCE(S)
                    </span>
                  </div>

                  <div className="p-3 space-y-2 min-h-[140px]">
                    {daySchedules.length === 0 ? (
                      <div className="text-[10px] text-gray-500 italic text-center py-6 uppercase font-mono">
                        AUCUN_COURS_PROGRAMME
                      </div>
                    ) : (
                      daySchedules.map(sch => (
                        <div key={sch.id} className="p-2 bg-[#E4E3E0]/70 border-l-4 border-[#141414] space-y-1 font-mono">
                          <div className="flex items-center justify-between text-[10px] font-bold text-[#141414]">
                            <span>{sch.courseTitre}</span>
                            <span className="bg-[#F27D26] text-black px-1 py-0.2 text-[9px] font-black border border-[#141414] uppercase">
                              {sch.type}
                            </span>
                          </div>

                          <div className="text-[10px] text-[#141414] flex items-center gap-1 font-bold">
                            <Clock className="w-3 h-3 text-[#141414]" /> {sch.heureDebut} - {sch.heureFin}
                          </div>

                          <div className="text-[10px] text-[#141414]/80 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#F27D26]" /> {sch.salle}
                          </div>

                          <div className="text-[9px] text-[#141414] font-bold border-t border-[#141414]/20 pt-1 mt-1 uppercase">
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
        <div className="bg-white border border-[#141414] overflow-x-auto font-mono">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#141414] text-white font-bold uppercase tracking-wider text-[10px]">
                <th className="p-2.5">CODE</th>
                <th className="p-2.5">INTITULE_DU_COURS</th>
                <th className="p-2.5">UNITE_ENSEIGNEMENT_(UE)</th>
                <th className="p-2.5">CREDITS_ECTS</th>
                <th className="p-2.5">VOLUME_HORAIRE</th>
                <th className="p-2.5">TITULAIRE_ENSEIGNANT</th>
                <th className="p-2.5">FILIERE_NIVEAU</th>
                <th className="p-2.5 text-right">SYLLABUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141414]/20">
              {filteredCourses.map(c => (
                <tr key={c.id} className="hover:bg-[#E4E3E0]/70 transition-colors">
                  <td className="p-2.5 font-mono font-bold text-[#141414] border-r border-[#141414]/10">{c.code}</td>
                  <td className="p-2.5 font-bold text-[#141414] uppercase">{c.titre}</td>
                  <td className="p-2.5 text-[#141414] font-medium">{c.ue}</td>
                  <td className="p-2.5 font-black text-[#F27D26]">{c.credits} ECTS</td>
                  <td className="p-2.5 text-[#141414]">{c.heuresCM}h CM / {c.heuresTP}h TP</td>
                  <td className="p-2.5 font-bold text-[#141414] uppercase">{c.enseignantNom}</td>
                  <td className="p-2.5">
                    <span className="bg-[#141414] text-white px-2 py-0.5 text-[9px] font-bold border border-[#141414] uppercase">
                      {c.section} ({c.niveau})
                    </span>
                  </td>
                  <td className="p-2.5 text-right">
                    <button 
                      onClick={() => alert(`Téléchargement du syllabus officiel pour ${c.code} - ISTA Burhuza`)}
                      className="bg-[#141414] hover:bg-[#F27D26] hover:text-black text-white px-2 py-1 text-[10px] font-bold inline-flex items-center gap-1 border border-[#141414] uppercase transition-colors"
                    >
                      <Download className="w-3 h-3 text-[#F27D26]" /> SYLLABUS_PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 font-mono">
          <div className="bg-white max-w-lg w-full border-2 border-[#141414]">
            <div className="bg-[#141414] text-white p-3 flex items-center justify-between">
              <h3 className="font-mono font-bold text-xs uppercase">AJOUTER_COURS_PROGRAMME</h3>
              <button onClick={() => setShowAddCourseModal(false)} className="text-white hover:text-[#F27D26]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">CODE_COURS (ex: INF304)</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="INF304"
                  className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-mono font-bold text-[#141414] uppercase"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">INTITULE_DU_COURS</label>
                <input
                  type="text"
                  required
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  placeholder="Intelligence Artificielle"
                  className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">CREDITS_ECTS</label>
                  <input
                    type="number"
                    min={1}
                    max={15}
                    value={credits}
                    onChange={(e) => setCredits(Number(e.target.value))}
                    className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-black text-[#F27D26]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">SECTION</label>
                  <select
                    value={section}
                    onChange={(e) => setSection(e.target.value as Section)}
                    className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
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
                <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">ENSEIGNANT_TITULAIRE</label>
                <input
                  type="text"
                  value={enseignantNom}
                  onChange={(e) => setEnseignantNom(e.target.value)}
                  className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
                />
              </div>

              <div className="pt-3 border-t border-[#141414] flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddCourseModal(false)}
                  className="px-3 py-1.5 text-xs font-bold bg-[#E4E3E0] text-[#141414] border border-[#141414] uppercase"
                >
                  ANNULER
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-bold bg-[#141414] text-white hover:bg-[#F27D26] hover:text-black border border-[#141414] uppercase transition-colors"
                >
                  AJOUTER_COURS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
