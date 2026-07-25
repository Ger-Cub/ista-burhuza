import React, { useState } from 'react';
import { Student, Section, Level, Course, Grade, Payment } from '../types';
import { CURRENT_ACADEMIC_YEAR } from '../data/mockData';
import { 
  generateTranscriptPDF, 
  generateCertificatePDF 
} from '../utils/pdfGenerator';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  Award, 
  CheckCircle, 
  X, 
  Printer, 
  Eye, 
  Phone
} from 'lucide-react';

interface StudentsModuleProps {
  students: Student[];
  courses: Course[];
  grades: Grade[];
  payments: Payment[];
  onAddStudent: (student: Student) => void;
}

export const StudentsModule: React.FC<StudentsModuleProps> = ({
  students,
  courses,
  grades,
  payments,
  onAddStudent
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('Tous');
  const [selectedNiveau, setSelectedNiveau] = useState<string>('Tous');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Student Form State
  const [newNom, setNewNom] = useState('');
  const [newPostnom, setNewPostnom] = useState('');
  const [newPrenom, setNewPrenom] = useState('');
  const [newGenre, setNewGenre] = useState<'M' | 'F'>('M');
  const [newSection, setNewSection] = useState<Section>('Informatique Appliquée');
  const [newNiveau, setNewNiveau] = useState<Level>('L1');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newLieu, setNewLieu] = useState('Bukavu');
  const [newDateNaissance, setNewDateNaissance] = useState('2004-01-01');

  // Filter students
  const filteredStudents = students.filter(s => {
    const matchesSearch = 
      s.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.postnom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.matricule.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSection = selectedSection === 'Tous' || s.section === selectedSection;
    const matchesNiveau = selectedNiveau === 'Tous' || s.niveau === selectedNiveau;

    return matchesSearch && matchesSection && matchesNiveau;
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNom || !newPostnom || !newPrenom) return;

    const autoMatricule = `2025-${newSection.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const created: Student = {
      id: `std-${Date.now()}`,
      matricule: autoMatricule,
      nom: newNom.toUpperCase(),
      postnom: newPostnom.toUpperCase(),
      prenom: newPrenom,
      genre: newGenre,
      section: newSection,
      niveau: newNiveau,
      anneeAcademique: CURRENT_ACADEMIC_YEAR,
      statut: 'Régulier',
      email: newEmail || `${newNom.toLowerCase()}.${newPrenom.toLowerCase()}@etudiant.ista-bukavu.cd`,
      telephone: newPhone || '+243 990 000 000',
      dateNaissance: newDateNaissance,
      lieuNaissance: newLieu,
      fraisTotaux: 450,
      fraisPayes: 150
    };

    onAddStudent(created);
    setShowAddModal(false);
    // Reset
    setNewNom('');
    setNewPostnom('');
    setNewPrenom('');
  };

  return (
    <div id="sigu-students-view" className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1 font-heading">
            <Users className="w-4 h-4 text-emerald-800" />
            Scolarité & Registres Académiques
          </div>
          <h2 className="text-lg font-bold text-slate-900 font-heading uppercase tracking-tight">
            Dossiers Étuadiants & Effectif Campus
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Effectif total: {students.length} dossiers réguliers (Année Académique 2025-2026)
          </p>
        </div>

        <button
          id="btn-add-student"
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 border border-emerald-950 transition-all uppercase font-heading shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-400" /> Nouveau Dossier Étudiant
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Rechercher: Nom, matricule..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-slate-900"
          />
        </div>

        {/* Section Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium text-slate-900"
          >
            <option value="Tous">Toutes les Sections</option>
            <option value="Informatique Appliquée">Informatique Appliquée</option>
            <option value="Génie Électrique">Génie Électrique</option>
            <option value="Génie Mécanique">Génie Mécanique</option>
            <option value="Génie Civil">Génie Civil</option>
            <option value="Maintenance Industrielle">Maintenance Industrielle</option>
          </select>
        </div>

        {/* Level Filter */}
        <div>
          <select
            value={selectedNiveau}
            onChange={(e) => setSelectedNiveau(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium text-slate-900"
          >
            <option value="Tous">Tous les Niveaux (LMD)</option>
            <option value="L1">L1 (Bachelier 1)</option>
            <option value="L2">L2 (Bachelier 2)</option>
            <option value="L3">L3 (Bachelier 3)</option>
            <option value="M1">M1 (Master 1)</option>
            <option value="M2">M2 (Master 2)</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-emerald-950 text-white font-bold uppercase tracking-wider text-[10px] font-heading">
                <th className="p-3.5">Matricule</th>
                <th className="p-3.5">Identité Élève</th>
                <th className="p-3.5">Section</th>
                <th className="p-3.5">Niveau</th>
                <th className="p-3.5">Solde Frais</th>
                <th className="p-3.5">Statut</th>
                <th className="p-3.5 text-right">Actions Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400 italic">
                    Aucun dossier étudiant correspondant.
                  </td>
                </tr>
              ) : (
                filteredStudents.map(std => {
                  const percentPaid = Math.round((std.fraisPayes / std.fraisTotaux) * 100);
                  const isPaidFull = std.fraisPayes >= std.fraisTotaux;

                  return (
                    <tr key={std.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold font-mono text-emerald-900">{std.matricule}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{std.nom} {std.postnom} {std.prenom}</div>
                        <div className="text-[10px] text-slate-500">{std.email}</div>
                      </td>
                      <td className="p-3.5 font-semibold text-slate-800">{std.section}</td>
                      <td className="p-3.5">
                        <span className="bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full font-bold text-[10px] border border-emerald-300">
                          {std.niveau}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[11px] font-bold ${isPaidFull ? 'text-emerald-800' : 'text-amber-700'}`}>
                            ${std.fraisPayes} / ${std.fraisTotaux} USD
                          </span>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${isPaidFull ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'}`}>
                            {percentPaid}%
                          </span>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase">
                          <CheckCircle className="w-3 h-3 text-emerald-700" /> {std.statut}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-1.5">
                        <button
                          onClick={() => setSelectedStudent(std)}
                          className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-2.5 py-1.5 rounded-lg text-[10px] transition-colors inline-flex items-center gap-1 font-heading uppercase"
                        >
                          <Eye className="w-3.5 h-3.5 text-amber-300" /> Dossier
                        </button>

                        <button
                          onClick={() => generateCertificatePDF(std)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-2.5 py-1.5 rounded-lg text-[10px] transition-colors inline-flex items-center gap-1 border border-slate-200 font-heading uppercase"
                          title="Télécharger Attestation de fréquentation PDF"
                        >
                          <FileText className="w-3.5 h-3.5 text-emerald-800" /> Attestation
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Profile Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-emerald-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-3xl w-full rounded-2xl border border-emerald-900/30 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-emerald-950 text-white p-5 flex items-center justify-between border-b border-emerald-900">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 bg-emerald-800 text-amber-400 rounded-xl flex items-center justify-center font-bold text-xl border border-amber-400/40 font-heading">
                  {selectedStudent.nom.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-base text-white font-heading">
                    {selectedStudent.nom} {selectedStudent.postnom} {selectedStudent.prenom}
                  </h3>
                  <p className="text-xs text-emerald-200">
                    Matricule: <span className="font-mono font-bold text-amber-300">{selectedStudent.matricule}</span> • {selectedStudent.section} ({selectedStudent.niveau})
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Genre & Naissance</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">
                    {selectedStudent.genre === 'M' ? 'Masculin' : 'Féminin'} • Né(e) le {selectedStudent.dateNaissance} à {selectedStudent.lieuNaissance}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 font-medium">Contacts</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5 flex items-center gap-2">
                    <span><Phone className="w-3.5 h-3.5 inline text-emerald-800 mr-1" />{selectedStudent.telephone}</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 font-medium">Année Académique</div>
                  <div className="text-xs font-bold text-emerald-900 mt-0.5">
                    {selectedStudent.anneeAcademique} (Site de Burhuza)
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 font-medium">Situation Financière</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">
                    ${selectedStudent.fraisPayes} sur ${selectedStudent.fraisTotaux} USD Payés
                  </div>
                </div>
              </div>

              {/* Grades Table preview */}
              <div>
                <h4 className="font-bold text-xs uppercase text-emerald-950 tracking-wider mb-2.5 flex items-center gap-2 font-heading">
                  <Award className="w-4 h-4 text-emerald-800" />
                  Notes & Évaluations d'Examens (LMD)
                </h4>

                <div className="border border-slate-200/80 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-100 font-bold text-slate-700 border-b border-slate-200/80">
                        <th className="p-2.5">Code</th>
                        <th className="p-2.5">Matière</th>
                        <th className="p-2.5">Intra /10</th>
                        <th className="p-2.5">Examen /10</th>
                        <th className="p-2.5">Note Finale /20</th>
                        <th className="p-2.5">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {grades.filter(g => g.studentId === selectedStudent.id).map(g => {
                        const course = courses.find(c => c.id === g.courseId);
                        return (
                          <tr key={g.id}>
                            <td className="p-2.5 font-mono font-bold text-emerald-900">{course?.code || 'INF'}</td>
                            <td className="p-2.5 font-medium">{course?.titre || 'Cours'}</td>
                            <td className="p-2.5 font-semibold">{g.noteIntra} / 10</td>
                            <td className="p-2.5 font-semibold">{g.noteExamen} / 10</td>
                            <td className="p-2.5 font-bold text-slate-900">{g.noteFinale} / 20</td>
                            <td className="p-2.5">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${g.valide ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                                {g.valide ? 'VALIDÉ' : 'AJOURNÉ'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-2 justify-end">
                <button
                  onClick={() => generateTranscriptPDF(selectedStudent, courses, grades)}
                  className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors font-heading shadow-xs"
                >
                  <Printer className="w-4 h-4 text-amber-300" /> Imprimer Relevé de Cotes Officiel (PDF)
                </button>

                <button
                  onClick={() => generateCertificatePDF(selectedStudent)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors border border-slate-200 font-heading"
                >
                  <FileText className="w-4 h-4 text-emerald-800" /> Attestation de Fréquentation (PDF)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-emerald-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded-2xl border border-emerald-900/30 shadow-2xl overflow-hidden">
            <div className="bg-emerald-950 text-white p-4 flex items-center justify-between border-b border-emerald-900">
              <h3 className="font-heading font-bold text-sm flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                Inscription d'un Nouvel Étudiant (Burhuza)
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-emerald-300 hover:text-white p-1 rounded-md">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Nom *</label>
                  <input
                    type="text"
                    required
                    value={newNom}
                    onChange={(e) => setNewNom(e.target.value)}
                    placeholder="MUGISHO"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Postnom *</label>
                  <input
                    type="text"
                    required
                    value={newPostnom}
                    onChange={(e) => setNewPostnom(e.target.value)}
                    placeholder="CHIRIMWAMI"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Prénom *</label>
                  <input
                    type="text"
                    required
                    value={newPrenom}
                    onChange={(e) => setNewPrenom(e.target.value)}
                    placeholder="Gloire"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700 text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Genre</label>
                  <select
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700 text-xs font-medium"
                  >
                    <option value="M">Masculin (M)</option>
                    <option value="F">Féminin (F)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Section *</label>
                  <select
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value as Section)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700 text-xs font-medium"
                  >
                    <option value="Informatique Appliquée">Informatique Appliquée</option>
                    <option value="Génie Électrique">Génie Électrique</option>
                    <option value="Génie Mécanique">Génie Mécanique</option>
                    <option value="Génie Civil">Génie Civil</option>
                    <option value="Maintenance Industrielle">Maintenance Industrielle</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Niveau *</label>
                  <select
                    value={newNiveau}
                    onChange={(e) => setNewNiveau(e.target.value as Level)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700 text-xs font-medium"
                  >
                    <option value="L1">L1 (Bachelier 1)</option>
                    <option value="L2">L2 (Bachelier 2)</option>
                    <option value="L3">L3 (Bachelier 3)</option>
                    <option value="M1">M1 (Master 1)</option>
                    <option value="M2">M2 (Master 2)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Téléphone</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+243 993 000 000"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">E-mail</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="etudiant@ista-bukavu.cd"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl uppercase font-heading"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-900 hover:bg-emerald-950 rounded-xl border border-emerald-950 uppercase font-heading shadow-xs"
                >
                  Valider l'Inscription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
