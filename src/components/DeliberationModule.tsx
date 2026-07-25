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
  Printer, 
  Sparkles
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
    <div id="sigu-deliberation-view" className="space-y-6 font-sans">
      {/* Title Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1 font-heading">
            <Award className="w-4 h-4 text-emerald-800" />
            Jury d'Évaluation & Procès-Verbaux
          </div>
          <h2 className="text-lg font-bold text-slate-900 font-heading uppercase tracking-tight">
            Délibération Académique LMD (ISTA Burhuza)
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Processus en 6 étapes: Saisie, Contrôle section, Calculs ECTS, Jury, Validation & Génération PV PDF
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {currentSession && (
            <button
              onClick={() => generateDeliberationPDF(currentSession, students, courses, grades)}
              className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 border border-emerald-950 transition-all uppercase font-heading shadow-xs"
            >
              <Printer className="w-4 h-4 text-amber-400" /> Imprimer PV Jury PDF
            </button>
          )}
        </div>
      </div>

      {/* 6-Step Visual Workflow Banner */}
      <div className="bg-emerald-950 text-white p-5 rounded-2xl border border-emerald-900 shadow-xs">
        <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2 font-heading">
          <Sparkles className="w-4 h-4" /> Workflow Académique LMD
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {[
            { step: 1, label: '1. Saisie Cotes', desc: 'Saisie enseignants' },
            { step: 2, label: '2. Contrôle Section', desc: 'Vérification Chef' },
            { step: 3, label: '3. Calcul LMD', desc: 'Moyennes & ECTS' },
            { step: 4, label: '4. Session Jury', desc: 'Examen dossiers' },
            { step: 5, label: '5. Validation', desc: 'Approbation DG' },
            { step: 6, label: '6. Génération PV', desc: 'Impression & Signatures' }
          ].map(s => {
            const isCompleted = currentStepNum >= s.step;
            const isCurrent = currentStepNum === s.step;

            return (
              <div 
                key={s.step} 
                className={`p-2.5 rounded-xl transition-all text-center border ${
                  isCurrent 
                    ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-xs' 
                    : isCompleted 
                    ? 'bg-emerald-900 text-white font-semibold border-emerald-700' 
                    : 'bg-emerald-900/40 text-emerald-300/60 border-emerald-900'
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-tight">{s.label}</div>
                <div className="text-[10px] mt-0.5 opacity-80">{s.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Session Selection & Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-xs">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">Session de Jury Active</label>
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
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-700"
          >
            {deliberations.map(d => (
              <option key={d.id} value={d.id}>
                {d.code} — {d.section} ({d.niveau}) [{d.statut}]
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">Membres Officiels du Jury</label>
          <div className="text-xs font-medium text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
            <strong>Président:</strong> {currentSession?.presidentJury || 'Prof. Marc MUKAMBA'}<br />
            <strong>Secrétaire:</strong> {currentSession?.secretaireJury || 'Ass. Alain CISHUGI'}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">Statut Session Workflow</label>
          <div className="flex gap-2">
            <button
              onClick={() => onUpdateDeliberationStatus(currentSession.id, 'Contrôle Section')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-2 rounded-xl text-xs flex-1 border border-slate-200 uppercase font-heading transition-colors"
            >
              Contrôle Section
            </button>
            <button
              onClick={() => onUpdateDeliberationStatus(currentSession.id, 'Clôturée & Validée')}
              className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-3 py-2 rounded-xl text-xs flex-1 border border-emerald-950 uppercase font-heading transition-colors shadow-xs"
            >
              Valider PV Final
            </button>
          </div>
        </div>
      </div>

      {/* Student Grades & Deliberation Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 bg-emerald-950 text-white font-bold text-xs flex items-center justify-between uppercase font-heading border-b border-emerald-900">
          <span>Matrice des Cotes LMD — {selectedSectionFilter} ({selectedLevelFilter})</span>
          <span className="text-amber-400 font-bold bg-emerald-900 px-3 py-1 rounded-full text-[10px] border border-emerald-800">{sessionStudents.length} Étudiants</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100 font-bold text-slate-700 border-b border-slate-200 text-[10px] uppercase font-heading">
                <th className="p-3">Étudiant & Matricule</th>
                {sessionCourses.map(c => (
                  <th key={c.id} className="p-3 text-center border-l border-slate-200">
                    <div className="font-bold text-slate-900">{c.code}</div>
                    <div className="text-[9px] font-normal text-slate-500">{c.credits} ECTS</div>
                  </th>
                ))}
                <th className="p-3 text-center bg-slate-50 border-l border-slate-200 font-bold text-slate-900">Moyenne LMD</th>
                <th className="p-3 text-center bg-slate-50 font-bold text-slate-900">Décision Jury</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
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
                let badgeStyle = 'bg-red-100 text-red-900 border-red-200';
                if (moy >= 16) { decision = 'Grande Distinction'; badgeStyle = 'bg-emerald-100 text-emerald-900 border-emerald-300'; }
                else if (moy >= 14) { decision = 'Distinction'; badgeStyle = 'bg-emerald-50 text-emerald-900 border-emerald-200'; }
                else if (moy >= 10) { decision = 'Satisfaction'; badgeStyle = 'bg-amber-100 text-amber-900 border-amber-300'; }

                return (
                  <tr key={std.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-bold text-slate-900">
                      {std.nom} {std.postnom} {std.prenom}
                      <div className="text-[10px] text-slate-500 font-mono font-medium">{std.matricule}</div>
                    </td>

                    {sessionCourses.map(c => {
                      const g = stdGrades.find(grade => grade.courseId === c.id);
                      return (
                        <td key={c.id} className="p-3 text-center border-l border-slate-100 font-mono">
                          {g ? (
                            <div className="flex flex-col items-center">
                              <span className="font-bold text-slate-900">{g.noteFinale.toFixed(1)} / 20</span>
                              <span className="text-[9px] text-slate-400">I:{g.noteIntra} | E:{g.noteExamen}</span>
                            </div>
                          ) : (
                            <span className="text-slate-400 italic text-[10px]">Non saisie</span>
                          )}
                        </td>
                      );
                    })}

                    <td className="p-3 text-center bg-slate-50/60 border-l border-slate-200 font-extrabold text-emerald-950 text-xs">
                      {moy.toFixed(2)} / 20
                    </td>

                    <td className="p-3 text-center bg-slate-50/60">
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border uppercase ${badgeStyle}`}>
                        {decision}
                      </span>
                    </td>

                    <td className="p-3 text-right">
                      <button
                        onClick={() => generateTranscriptPDF(std, courses, grades)}
                        className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] inline-flex items-center gap-1.5 shadow-xs font-heading uppercase transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5 text-amber-300" /> Relevé PDF
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
