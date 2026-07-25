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
  AlertCircle, 
  X, 
  Printer, 
  Eye, 
  GraduationCap,
  Wallet,
  Phone,
  Mail,
  MapPin,
  Calendar
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
    <div id="sigu-students-view" className="space-y-4">
      {/* Module Title Bar */}
      <div className="bg-white p-4 border border-[#141414] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-mono font-bold text-[#141414] flex items-center gap-2 uppercase tracking-wide">
            <Users className="w-5 h-5 text-[#F27D26]" />
            DOSSIERS_ETUDIANTS // EFFECTIF_CAMPUS_BURHUZA
          </h2>
          <p className="text-xs font-mono text-[#141414]/70 mt-0.5">
            EFFECTIF TOTAL: {students.length} DOSSIERS REGULIERS (ANNEE ACADEMIQUE 2025-2026)
          </p>
        </div>

        <button
          id="btn-add-student"
          onClick={() => setShowAddModal(true)}
          className="bg-[#141414] hover:bg-[#F27D26] hover:text-black text-white font-mono font-bold px-3.5 py-2 text-xs flex items-center gap-1.5 border border-[#141414] transition-colors self-start sm:self-auto uppercase"
        >
          <Plus className="w-4 h-4" /> NOUVEAU_DOSSIER_ETUDIANT
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 border border-[#141414] grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#141414]/60 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="RECHERCHE: Nom, Matricule..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#E4E3E0] border border-[#141414] focus:outline-none focus:bg-white text-[#141414] font-mono uppercase"
          />
        </div>

        {/* Section Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-[#141414]" />
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full py-1.5 px-2 text-xs bg-[#E4E3E0] border border-[#141414] focus:outline-none focus:bg-white font-mono font-bold uppercase"
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
            className="w-full py-1.5 px-2 text-xs bg-[#E4E3E0] border border-[#141414] focus:outline-none focus:bg-white font-mono font-bold uppercase"
          >
            <option value="Tous">Tous les Niveaux</option>
            <option value="L1">L1 (Bachelier 1)</option>
            <option value="L2">L2 (Bachelier 2)</option>
            <option value="L3">L3 (Bachelier 3)</option>
            <option value="M1">M1 (Master 1)</option>
            <option value="M2">M2 (Master 2)</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white border border-[#141414] overflow-x-auto">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead>
            <tr className="bg-[#141414] text-white font-bold uppercase text-[10px] tracking-wider border-b border-[#141414]">
              <th className="p-2.5">MATRICULE</th>
              <th className="p-2.5">NOM_PRENOM_IDENTITE</th>
              <th className="p-2.5">SECTION</th>
              <th className="p-2.5">NIVEAU</th>
              <th className="p-2.5">SOLDE_FRAIS</th>
              <th className="p-2.5">STATUT</th>
              <th className="p-2.5 text-right">ACTIONS_DOSSIER</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#141414]/20">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500 italic font-mono">
                  AUCUN DOSSIER ETUDIANT CORRESPONDANT.
                </td>
              </tr>
            ) : (
              filteredStudents.map(std => {
                const percentPaid = Math.round((std.fraisPayes / std.fraisTotaux) * 100);
                const isPaidFull = std.fraisPayes >= std.fraisTotaux;

                return (
                  <tr key={std.id} className="hover:bg-[#E4E3E0]/70 transition-colors">
                    <td className="p-2.5 font-mono font-bold text-[#141414] border-r border-[#141414]/10">
                      {std.matricule}
                    </td>
                    <td className="p-2.5">
                      <div className="font-bold text-[#141414]">{std.nom} {std.postnom} {std.prenom}</div>
                      <div className="text-[9px] text-gray-600 font-mono">{std.email}</div>
                    </td>
                    <td className="p-2.5 font-bold text-[#141414] uppercase">
                      {std.section}
                    </td>
                    <td className="p-2.5">
                      <span className="bg-[#141414] text-white px-2 py-0.5 font-bold text-[10px] border border-[#141414]">
                        {std.niveau}
                      </span>
                    </td>
                    <td className="p-2.5">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-bold ${isPaidFull ? 'text-green-700' : 'text-[#F27D26]'}`}>
                          ${std.fraisPayes} / ${std.fraisTotaux} USD
                        </span>
                        <span className={`text-[9px] px-1 py-0.2 font-bold ${isPaidFull ? 'bg-green-100 text-green-900 border border-green-700' : 'bg-[#F27D26] text-black border border-[#141414]'}`}>
                          {percentPaid}%
                        </span>
                      </div>
                    </td>
                    <td className="p-2.5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#141414] uppercase">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600" /> {std.statut}
                      </span>
                    </td>
                    <td className="p-2.5 text-right space-x-1.5">
                      <button
                        onClick={() => setSelectedStudent(std)}
                        className="bg-[#141414] hover:bg-[#F27D26] hover:text-black text-white font-mono font-bold px-2 py-1 text-[10px] transition-colors inline-flex items-center gap-1 border border-[#141414] uppercase"
                      >
                        <Eye className="w-3 h-3" /> DOSSIER
                      </button>

                      <button
                        onClick={() => generateCertificatePDF(std)}
                        className="bg-[#E4E3E0] hover:bg-[#141414] hover:text-white text-[#141414] font-mono font-bold px-2 py-1 text-[10px] transition-colors inline-flex items-center gap-1 border border-[#141414] uppercase"
                        title="Télécharger Attestation de fréquentation PDF"
                      >
                        <FileText className="w-3 h-3" /> ATTESTATION
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Student Profile Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-emerald-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-3xl w-full border-2 border-emerald-900 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-emerald-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-800 text-amber-400 flex items-center justify-center font-bold text-lg border border-amber-400/40">
                  {selectedStudent.nom.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">
                    {selectedStudent.nom} {selectedStudent.postnom} {selectedStudent.prenom}
                  </h3>
                  <p className="text-xs text-emerald-200">
                    Matricule: {selectedStudent.matricule} • {selectedStudent.section} ({selectedStudent.niveau})
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 text-emerald-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-emerald-50/60 p-4 border border-emerald-900/10">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Genre & Naissance</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">
                    {selectedStudent.genre === 'M' ? 'Masculin' : 'Féminin'} • Né(e) le {selectedStudent.dateNaissance} à {selectedStudent.lieuNaissance}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 font-medium">Contacts</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5 flex items-center gap-2">
                    <span><Phone className="w-3 h-3 inline text-emerald-800" /> {selectedStudent.telephone}</span>
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

              {/* Grades Table preview for this student */}
              <div>
                <h4 className="font-bold text-xs uppercase text-emerald-950 tracking-wider mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-800" />
                  Notes & Évaluations d'Examens (LMD)
                </h4>

                <div className="border border-slate-200 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-100 font-bold text-slate-700">
                        <th className="p-2">Code</th>
                        <th className="p-2">Matière</th>
                        <th className="p-2">Intra /10</th>
                        <th className="p-2">Examen /10</th>
                        <th className="p-2">Note Finale /20</th>
                        <th className="p-2">Statut Validé</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {grades.filter(g => g.studentId === selectedStudent.id).map(g => {
                        const course = courses.find(c => c.id === g.courseId);
                        return (
                          <tr key={g.id}>
                            <td className="p-2 font-mono font-bold text-emerald-900">{course?.code || 'INF'}</td>
                            <td className="p-2">{course?.titre || 'Cours'}</td>
                            <td className="p-2 font-semibold">{g.noteIntra} / 10</td>
                            <td className="p-2 font-semibold">{g.noteExamen} / 10</td>
                            <td className="p-2 font-bold text-slate-900">{g.noteFinale} / 20</td>
                            <td className="p-2">
                              <span className={`px-1.5 py-0.5 text-[10px] font-bold ${g.valide ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
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

              {/* Official Document Actions */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-2 justify-end">
                <button
                  onClick={() => generateTranscriptPDF(selectedStudent, courses, grades)}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-4 py-2 text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4 text-amber-300" /> Imprimer Relevé de Cotes Officiel (PDF)
                </button>

                <button
                  onClick={() => generateCertificatePDF(selectedStudent)}
                  className="bg-slate-700 hover:bg-slate-800 text-white font-bold px-4 py-2 text-xs flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-4 h-4" /> Attestation de Fréquentation (PDF)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-emerald-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full border-2 border-emerald-900 shadow-2xl">
            <div className="bg-emerald-900 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                Inscription d'un Nouvel Étudiant (Burhuza)
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-emerald-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nom *</label>
                  <input
                    type="text"
                    required
                    value={newNom}
                    onChange={(e) => setNewNom(e.target.value)}
                    placeholder="MUGISHO"
                    className="w-full p-2 text-xs border border-slate-300 focus:border-emerald-700 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Postnom *</label>
                  <input
                    type="text"
                    required
                    value={newPostnom}
                    onChange={(e) => setNewPostnom(e.target.value)}
                    placeholder="CHIRIMWAMI"
                    className="w-full p-2 text-xs border border-slate-300 focus:border-emerald-700 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Prénom *</label>
                  <input
                    type="text"
                    required
                    value={newPrenom}
                    onChange={(e) => setNewPrenom(e.target.value)}
                    placeholder="Gloire"
                    className="w-full p-2 text-xs border border-slate-300 focus:border-emerald-700 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Genre</label>
                  <select
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value as any)}
                    className="w-full p-2 text-xs border border-slate-300 focus:border-emerald-700"
                  >
                    <option value="M">Masculin (M)</option>
                    <option value="F">Féminin (F)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Section *</label>
                  <select
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value as Section)}
                    className="w-full p-2 text-xs border border-slate-300 focus:border-emerald-700"
                  >
                    <option value="Informatique Appliquée">Informatique Appliquée</option>
                    <option value="Génie Électrique">Génie Électrique</option>
                    <option value="Génie Mécanique">Génie Mécanique</option>
                    <option value="Génie Civil">Génie Civil</option>
                    <option value="Maintenance Industrielle">Maintenance Industrielle</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Niveau *</label>
                  <select
                    value={newNiveau}
                    onChange={(e) => setNewNiveau(e.target.value as Level)}
                    className="w-full p-2 text-xs border border-slate-300 focus:border-emerald-700"
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Téléphone</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+243 993 000 000"
                    className="w-full p-2 text-xs border border-slate-300 focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">E-mail</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="etudiant@ista-bukavu.cd"
                    className="w-full p-2 text-xs border border-slate-300 focus:border-emerald-700"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900"
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
