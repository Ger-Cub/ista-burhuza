import React, { useState } from 'react';
import { 
  DeliberationSession, 
  Student, 
  Course, 
  Grade, 
  Section, 
  Level, 
  User 
} from '../types';
import { generateDeliberationPDF, generateTranscriptPDF } from '../utils/pdfGenerator';
import { 
  Award, 
  CheckCircle, 
  Lock, 
  Unlock, 
  Printer, 
  Calculator, 
  FileCheck, 
  Users, 
  AlertTriangle,
  Play,
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface DeliberationModuleProps {
  currentUser: User;
  deliberations: DeliberationSession[];
  students: Student[];
  courses: Course[];
  grades: Grade[];
  onUpdateGrade: (gradeId: string, newIntra: number, newExamen: number) => void;
  onUpdateDeliberationStatus: (sessionId: string, newStatut: DeliberationSession['statut']) => void;
}

export const DeliberationModule: React.FC<DeliberationModuleProps> = ({
  currentUser,
  deliberations,
  students,
  courses,
  grades,
  onUpdateGrade,
  onUpdateDeliberationStatus
}) => {
  const [selectedSessionId, setSelectedSessionId] = useState<string>(deliberations[0]?.id || '');
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<Section>('Informatique Appliquée');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<Level>('L3');

  const currentSession = deliberations.find(d => d.id === selectedSessionId) || deliberations[0];

  // Filter students for the current session
  const sessionStudents = students.filter(s => s.section === selectedSectionFilter && s.niveau === selectedLevelFilter);
  const sessionCourses = courses.filter(c => c.section === selectedSectionFilter && c.niveau === selectedLevelFilter);

  // Workflow steps status calculation
  const getWorkflowStep = (statut: DeliberationSession['statut']) => {
    switch (statut) {
      case 'En préparation': return 1;
      case 'Contrôle Section': return 2;
      case 'Session en cours': return 4;
      case 'Clôturée & Validée': return 6;
      default: return 1;
    }
  };

  const currentStepNum = currentSession ? getWorkflowStep(currentSession.statut) : 1;

  return (
    <div id="sigu-deliberation-view" className="space-y-4 font-mono">
      {/* Title */}
      <div className="bg-white p-4 border border-[#141414] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-mono font-bold text-[#141414] flex items-center gap-2 uppercase tracking-wide">
            <Award className="w-5 h-5 text-[#F27D26]" />
            DELIBERATION_ACADEMIQUE // JURY_LMD (ISTA BURHUZA)
          </h2>
          <p className="text-xs text-[#141414]/70 mt-0.5">
            PROCESSUS EN 6 ETAPES: SAISIE, CONTROLE, CALCUL LMD, JURY, VALIDATION, GENERATION PV PDF
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {currentSession && (
            <button
              onClick={() => generateDeliberationPDF(currentSession, students, courses, grades)}
              className="bg-[#141414] hover:bg-[#F27D26] hover:text-black text-white font-mono font-bold px-3 py-2 text-xs flex items-center gap-1.5 border border-[#141414] transition-colors uppercase"
            >
              <Printer className="w-4 h-4 text-[#F27D26]" /> IMPRIMER_PV_JURY_PDF
            </button>
          )}
        </div>
      </div>

      {/* 6-Step Visual Workflow Banner */}
      <div className="bg-[#141414] text-white p-4 border border-[#141414]">
        <div className="text-[10px] font-bold text-[#F27D26] uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> WORKFLOW_ACADEMIQUE_LMD
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {[
            { step: 1, label: '1. SAISIE_COTES', desc: 'Saisie enseignants' },
            { step: 2, label: '2. CONTROLE_SECTION', desc: 'Vérification Chef' },
            { step: 3, label: '3. CALCUL_LMD', desc: 'Moyennes & ECTS' },
            { step: 4, label: '4. SESSION_JURY', desc: 'Examen dossiers' },
            { step: 5, label: '5. VALIDATION', desc: 'Approbation DG' },
            { step: 6, label: '6. GENERATION_PV', desc: 'Impression & Signatures' }
          ].map(s => {
            const isCompleted = currentStepNum >= s.step;
            const isCurrent = currentStepNum === s.step;

            return (
              <div 
                key={s.step} 
                className={`p-2 border transition-all text-center ${
                  isCurrent 
                    ? 'bg-[#F27D26] text-black font-black border-[#141414]' 
                    : isCompleted 
                    ? 'bg-white text-black font-bold border-white' 
                    : 'bg-white/10 text-gray-400 border-white/20'
                }`}
              >
                <div className="text-[11px] uppercase tracking-tighter">{s.label}</div>
                <div className="text-[9px] mt-0.5 opacity-80 uppercase">{s.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Session Selection & Controls */}
      <div className="bg-white p-4 border border-[#141414] grid grid-cols-1 md:grid-cols-3 gap-4 items-center font-mono text-xs">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#141414] mb-1">SESSION_JURY_ACTIVE</label>
          <select
            value={selectedSessionId}
            onChange={(e) => {
              const session = deliberations.find(d => d.id === e.target.value);
              setSelectedSessionId(e.target.value);
              if (session) {
                setSelectedSectionFilter(session.section);
                setSelectedLevelFilter(session.niveau);
              }
            }}
            className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
          >
            {deliberations.map(d => (
              <option key={d.id} value={d.id}>
                {d.code} — {d.section} ({d.niveau}) [{d.statut}]
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#141414] mb-1">MEMBRES_JURY_OFFICIELS</label>
          <div className="text-[10px] font-bold text-[#141414] bg-[#E4E3E0] p-2 border border-[#141414] uppercase">
            PRESIDENT: {currentSession?.presidentJury || 'Prof. Marc MUKAMBA'}<br />
            SECRETAIRE: {currentSession?.secretaireJury || 'Ass. Alain CISHUGI'}
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#141414] mb-1">STATUT_WORKFLOW_SESSION</label>
          <div className="flex gap-2">
            <button
              onClick={() => onUpdateDeliberationStatus(currentSession.id, 'Contrôle Section')}
              className="bg-[#141414] hover:bg-[#F27D26] hover:text-black text-white font-mono font-bold px-2 py-1.5 text-[10px] flex-1 border border-[#141414] uppercase transition-colors"
            >
              CONTROLE_SECTION
            </button>
            <button
              onClick={() => onUpdateDeliberationStatus(currentSession.id, 'Clôturée & Validée')}
              className="bg-[#F27D26] hover:bg-orange-600 text-black font-mono font-bold px-2 py-1.5 text-[10px] flex-1 border border-[#141414] uppercase transition-colors"
            >
              VALIDER_PV_FINAL
            </button>
          </div>
        </div>
      </div>

      {/* Student Grades & Deliberation Matrix */}
      <div className="bg-white border border-[#141414] overflow-x-auto font-mono">
        <div className="p-2.5 bg-[#141414] text-white font-bold text-xs flex items-center justify-between uppercase">
          <span>MATRICE_COTES_LMD — {selectedSectionFilter} ({selectedLevelFilter})</span>
          <span className="text-[#F27D26] font-mono text-[10px] font-bold">{sessionStudents.length} ETUDIANTS</span>
        </div>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#E4E3E0] font-bold text-[#141414] border-b border-[#141414] text-[10px] uppercase">
              <th className="p-2.5">ETUDIANT_(MATRICULE)</th>
              {sessionCourses.map(c => (
                <th key={c.id} className="p-2.5 text-center border-l border-[#141414]">
                  <div className="font-bold text-[#141414]">{c.code}</div>
                  <div className="text-[9px] font-normal opacity-70">{c.credits} ECTS</div>
                </th>
              ))}
              <th className="p-2.5 text-center bg-white border-l border-[#141414] font-bold text-[#141414]">MOYENNE_LMD</th>
              <th className="p-2.5 text-center bg-white font-bold text-[#141414]">DECISION_JURY</th>
              <th className="p-2.5 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#141414]/20">
            {sessionStudents.map(std => {
              const stdGrades = grades.filter(g => g.studentId === std.id);
              let totalCreds = 0;
              let totalPts = 0;

              sessionCourses.forEach(c => {
                const g = stdGrades.find(grade => grade.courseId === c.id);
                if (g) {
                  totalCreds += c.credits;
                  totalPts += g.noteFinale * c.credits;
                }
              });

              const moy = totalCreds > 0 ? (totalPts / totalCreds) : 0;
              let decision = 'Ajourné';
              let badgeStyle = 'bg-red-100 text-red-900 border-red-700';
              if (moy >= 16) { decision = 'Grande Distinction'; badgeStyle = 'bg-green-100 text-green-900 border-green-700'; }
              else if (moy >= 14) { decision = 'Distinction'; badgeStyle = 'bg-[#E4E3E0] text-[#141414] border-[#141414]'; }
              else if (moy >= 10) { decision = 'Satisfaction'; badgeStyle = 'bg-[#F27D26] text-black border-[#141414]'; }

              return (
                <tr key={std.id} className="hover:bg-[#E4E3E0]/70">
                  <td className="p-2.5 font-bold text-[#141414] border-r border-[#141414]/10">
                    {std.nom} {std.postnom} {std.prenom}
                    <div className="text-[9px] text-gray-600 font-mono">{std.matricule}</div>
                  </td>

                  {sessionCourses.map(c => {
                    const g = stdGrades.find(grade => grade.courseId === c.id);
                    return (
                      <td key={c.id} className="p-2 text-center border-l border-[#141414]/20 font-mono">
                        {g ? (
                          <div className="flex flex-col items-center">
                            <span className="font-black text-[#141414]">{g.noteFinale.toFixed(1)} / 20</span>
                            <span className="text-[8px] opacity-70">I:{g.noteIntra} | E:{g.noteExamen}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic text-[9px]">NON_SAISIE</span>
                        )}
                      </td>
                    );
                  })}

                  <td className="p-2.5 text-center bg-white border-l border-[#141414] font-black text-[#141414] text-xs">
                    {moy.toFixed(2)} / 20
                  </td>

                  <td className="p-2.5 text-center bg-white">
                    <span className={`px-1.5 py-0.5 text-[9px] font-bold border uppercase ${badgeStyle}`}>
                      {decision}
                    </span>
                  </td>

                  <td className="p-2.5 text-right">
                    <button
                      onClick={() => generateTranscriptPDF(std, courses, grades)}
                      className="bg-[#141414] hover:bg-[#F27D26] hover:text-black text-white font-mono font-bold px-2 py-1 text-[10px] inline-flex items-center gap-1 border border-[#141414] uppercase transition-colors"
                    >
                      <Printer className="w-3 h-3 text-[#F27D26]" /> RELEVE_PDF
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
