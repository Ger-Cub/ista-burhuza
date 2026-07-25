import React, { useState } from 'react';
import { 
  Building2, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  FileText, 
  Download, 
  CheckCircle2, 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Users, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  Search, 
  Lock, 
  LogIn, 
  Sparkles, 
  Menu, 
  X,
  ExternalLink,
  Laptop,
  Zap,
  Wrench,
  Compass,
  Sprout,
  Check,
  AlertCircle
} from 'lucide-react';
import { Student, Course, ScheduleItem, Grade, Announcement } from '../types';

interface PublicWebsiteProps {
  students: Student[];
  courses: Course[];
  schedules: ScheduleItem[];
  grades: Grade[];
  announcements: Announcement[];
  onLoginRequest: () => void;
  onGoToDashboard: () => void;
  isLoggedIn: boolean;
  currentUserRole?: string;
}

export type PublicPage = 
  | 'home' 
  | 'about' 
  | 'programs' 
  | 'registration' 
  | 'schedule' 
  | 'transcripts' 
  | 'campus' 
  | 'contact';

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({
  students,
  courses,
  schedules,
  grades,
  announcements,
  onLoginRequest,
  onGoToDashboard,
  isLoggedIn,
  currentUserRole
}) => {
  const [currentPage, setCurrentPage] = useState<PublicPage>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Online Registration State
  const [regSuccess, setRegSuccess] = useState(false);
  const [regData, setRegData] = useState({
    nom: '',
    postnom: '',
    prenom: '',
    sexe: 'M',
    dateNaissance: '',
    lieuNaissance: '',
    telephone: '',
    email: '',
    adresse: '',
    section: 'Informatique Appliquée',
    niveau: 'Licence 1 (LMD)',
    numDiplome: '',
    pourcentageExetat: '',
    anneeExetat: '2025'
  });
  const [registrationCode, setRegistrationCode] = useState('');

  // Schedule Filter State
  const [schedSection, setSchedSection] = useState('Informatique Appliquée');
  const [schedPromotion, setSchedPromotion] = useState('L1');

  // Transcript Lookup State
  const [transcriptMatricule, setTranscriptMatricule] = useState('');
  const [searchedStudent, setSearchedStudent] = useState<Student | null>(null);
  const [searchedStudentGrades, setSearchedStudentGrades] = useState<Grade[]>([]);
  const [transcriptError, setTranscriptError] = useState('');

  // Registration Submit Handler
  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedCode = `REG-2026-IST-${Math.floor(1000 + Math.random() * 9000)}`;
    setRegistrationCode(generatedCode);
    setRegSuccess(true);
  };

  // Transcript Search Handler
  const handleTranscriptSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setTranscriptError('');
    const query = transcriptMatricule.trim().toLowerCase();
    
    if (!query) {
      setTranscriptError('Veuillez saisir un numéro de matricule ou un nom valide.');
      return;
    }

    const student = students.find(s => 
      s.matricule.toLowerCase() === query || 
      `${s.nom} ${s.prenom}`.toLowerCase().includes(query) ||
      s.nom.toLowerCase().includes(query)
    );

    if (student) {
      setSearchedStudent(student);
      const studentGrades = grades.filter(g => g.studentId === student.id);
      setSearchedStudentGrades(studentGrades);
    } else {
      setSearchedStudent(null);
      setSearchedStudentGrades([]);
      setTranscriptError('Aucun étudiant trouvé avec ce matricule. Essayez ex: 2024-INF-001 ou MUKAMBA');
    }
  };

  const navItems: { id: PublicPage; label: string }[] = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À Propos' },
    { id: 'programs', label: 'Formations & Sections' },
    { id: 'registration', label: 'Inscription en Ligne' },
    { id: 'schedule', label: 'Horaires de Cours' },
    { id: 'transcripts', label: 'Relevés de Notes' },
    { id: 'campus', label: 'Vie Éducative' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Top Announcement Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-700 text-white text-[10px] font-bold uppercase px-2 py-0.5">
              INSCRIPTIONS 2025-2026
            </span>
            <span className="font-medium">
              Les admissions en ligne pour l'année académique 2025-2026 sont officiellement ouvertes !
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-300">
              <MapPin className="w-3.5 h-3.5" /> Campus de Burhuza, Walungu (Sud-Kivu)
            </span>
            <span className="hidden md:inline text-emerald-400">|</span>
            <span className="flex items-center gap-1 text-emerald-300">
              <Phone className="w-3.5 h-3.5" /> +243 997 123 456
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Logo & University Title */}
          <div 
            className="flex items-center space-x-3.5 cursor-pointer" 
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-12 h-12 bg-emerald-800 text-white flex items-center justify-center font-bold text-xl font-heading border-2 border-emerald-900 shadow-xs">
              ISTA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg sm:text-xl text-emerald-950 font-heading tracking-tight leading-none uppercase">
                  ISTA BURHUZA
                </h1>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 uppercase">
                  RDC - ESU
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Institut Supérieur de Techniques Appliquées • Campus de Burhuza / Bukavu
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-3 py-2 text-xs font-bold font-heading uppercase transition-colors border-b-2 ${
                  currentPage === item.id 
                    ? 'border-emerald-700 text-emerald-900 bg-emerald-50/50' 
                    : 'border-transparent text-slate-700 hover:text-emerald-800 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Button: Espace Administration / SIGU */}
          <div className="hidden sm:flex items-center space-x-2">
            {isLoggedIn ? (
              <button
                onClick={onGoToDashboard}
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2.5 flex items-center gap-2 border border-emerald-900 shadow-xs transition-colors uppercase font-heading"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                Accéder au SIGU ({currentUserRole})
              </button>
            ) : (
              <button
                onClick={onLoginRequest}
                className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs px-4 py-2.5 flex items-center gap-2 border border-emerald-950 shadow-xs transition-colors uppercase font-heading"
              >
                <LogIn className="w-4 h-4 text-amber-400" />
                Portail SIGU / Connexion
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 border border-slate-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs font-bold uppercase ${
                  currentPage === item.id ? 'bg-emerald-800 text-white' : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-200">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    onGoToDashboard();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-emerald-800 text-white text-xs font-bold py-2.5 px-3 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" /> Espace SIGU ({currentUserRole})
                </button>
              ) : (
                <button
                  onClick={() => {
                    onLoginRequest();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-emerald-900 text-white text-xs font-bold py-2.5 px-3 flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4 text-amber-400" /> Connexion Portail SIGU
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Page Content */}
      <main className="flex-1">
        {/* PAGE 1: HOME */}
        {currentPage === 'home' && (
          <div>
            {/* Hero Banner Section */}
            <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 text-white py-16 px-4 sm:px-6 border-b-4 border-emerald-700">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase px-3 py-1 border border-emerald-600">
                    <GraduationCap className="w-4 h-4 text-amber-400" />
                    Enseignement Supérieur et Universitaire (ESU RDC)
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-white leading-tight">
                    Institut Supérieur de Techniques Appliquées <br />
                    <span className="text-amber-400">Campus de Burhuza</span>
                  </h1>

                  <p className="text-sm sm:text-base text-emerald-100 max-w-2xl leading-relaxed">
                    Formation scientifique, technologique et professionnelle d'excellence au cœur du Sud-Kivu. Nos diplômes d'État préparent la nouvelle génération d'ingénieurs, informaticiens, électrotechniciens et agronomes du Congo.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => setCurrentPage('registration')}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase px-5 py-3 flex items-center gap-2 border border-emerald-400 shadow-md transition-all font-heading"
                    >
                      <Send className="w-4 h-4" /> S'inscrire en Ligne (2025-2026)
                    </button>
                    <button
                      onClick={() => setCurrentPage('transcripts')}
                      className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase px-5 py-3 flex items-center gap-2 border border-white/30 transition-all font-heading"
                    >
                      <FileText className="w-4 h-4 text-amber-300" /> Télécharger mon Relevé de Notes
                    </button>
                    <button
                      onClick={() => setCurrentPage('schedule')}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase px-5 py-3 flex items-center gap-2 border border-amber-600 shadow-md transition-all font-heading"
                    >
                      <Calendar className="w-4 h-4" /> Horaires des Cours
                    </button>
                  </div>
                </div>

                {/* Hero Quick Card */}
                <div className="lg:col-span-5 bg-white text-slate-900 p-6 border-2 border-emerald-500 shadow-xl space-y-4">
                  <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base text-emerald-950 font-heading uppercase">
                        Portail Académique Rapide
                      </h3>
                      <p className="text-xs text-slate-600">Accès direct aux services étudiants ISTA</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-2 py-0.5 border border-emerald-300 uppercase">
                      LMD 2026
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div 
                      onClick={() => setCurrentPage('registration')}
                      className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 cursor-pointer flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-800 text-white flex items-center justify-center font-bold">1</div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-emerald-900">Demande d'Admission</p>
                          <p className="text-[11px] text-slate-500">Formulaire officiel & confirmation immédiate</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-800 group-hover:translate-x-1 transition-transform" />
                    </div>

                    <div 
                      onClick={() => setCurrentPage('transcripts')}
                      className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 cursor-pointer flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-800 text-white flex items-center justify-center font-bold">2</div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-emerald-900">Relevés de Cotes & Bulletins</p>
                          <p className="text-[11px] text-slate-500">Saisie du matricule et génération PDF</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-800 group-hover:translate-x-1 transition-transform" />
                    </div>

                    <div 
                      onClick={() => setCurrentPage('schedule')}
                      className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 cursor-pointer flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-800 text-white flex items-center justify-center font-bold">3</div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-emerald-900">Emploi du Temps Hebdomadaire</p>
                          <p className="text-[11px] text-slate-500">Planning par section, promotion et salle</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-800 group-hover:translate-x-1 transition-transform" />
                    </div>

                    <div 
                      onClick={onLoginRequest}
                      className="p-3 bg-emerald-900 text-white cursor-pointer flex items-center justify-between hover:bg-emerald-950 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-amber-400" />
                        <div>
                          <p className="font-bold text-xs uppercase font-heading">Espace Enseignants & Direction (SIGU)</p>
                          <p className="text-[10px] text-emerald-200">Gestion des jurys, délibérations et frais</p>
                        </div>
                      </div>
                      <LogIn className="w-4 h-4 text-amber-400" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Statistics */}
            <section className="bg-white py-10 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="p-4 border-r border-slate-200 last:border-r-0">
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-800 font-heading">5</div>
                  <div className="text-xs font-bold text-slate-700 uppercase mt-1">Sections de Formation Agréées</div>
                </div>
                <div className="p-4 border-r border-slate-200 last:border-r-0">
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-800 font-heading">1 250+</div>
                  <div className="text-xs font-bold text-slate-700 uppercase mt-1">Étudiants Inscrits à Burhuza</div>
                </div>
                <div className="p-4 border-r border-slate-200 last:border-r-0">
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-800 font-heading">48</div>
                  <div className="text-xs font-bold text-slate-700 uppercase mt-1">Professeurs & Chefs de Travaux</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-heading">100%</div>
                  <div className="text-xs font-bold text-slate-700 uppercase mt-1">Diplômes Homologués ESU RDC</div>
                </div>
              </div>
            </section>

            {/* Director General Word / Message */}
            <section className="py-12 px-4 sm:px-6 bg-slate-100 border-b border-slate-200">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-4 bg-white p-6 border-2 border-emerald-900 text-center space-y-3">
                  <div className="w-24 h-24 mx-auto bg-emerald-800 text-white flex items-center justify-center font-bold text-3xl font-heading border-2 border-emerald-900 shadow-md">
                    DG
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 font-heading">Prof. Dieudonné KABANGA</h3>
                    <p className="text-xs text-emerald-800 font-bold uppercase">Directeur Général de l'ISTA Burhuza</p>
                  </div>
                  <span className="inline-block bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 border border-amber-300 uppercase">
                    Mot de la Direction
                  </span>
                </div>

                <div className="md:col-span-8 space-y-4">
                  <h2 className="text-2xl font-bold text-emerald-950 font-heading uppercase">
                    Mot du Directeur Général
                  </h2>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    « Bienvenue à l’Institut Supérieur de Techniques Appliquées (ISTA), Campus de Burhuza. Notre mission est d’offrir une formation technologique et scientifique de haute qualité, parfaitement adaptée aux besoins de développement socio-économique de la province du Sud-Kivu et de la République Démocratique du Congo.
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    Grâce au système LMD (Licence - Master - Doctorat), nos étudiants bénéficient d'un apprentissage axé sur la pratique, la rigueur académique, les compétences professionnelles et le numérique. Le portail SIGU garantit désormais une transparence intégrale de la gestion académique et des relevés de cotes. »
                  </p>
                </div>
              </div>
            </section>

            {/* Sections / Academic Programs Preview */}
            <section className="py-14 px-4 sm:px-6 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <h2 className="text-2xl font-bold text-emerald-950 font-heading uppercase">
                    Nos Sections & Offres de Formation
                  </h2>
                  <p className="text-xs text-slate-600 font-medium">
                    Des filières d'ingénierie et de technologies appliquées organisées en système LMD
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 border-2 border-slate-200 bg-slate-50 hover:border-emerald-700 transition-colors space-y-3">
                    <div className="w-10 h-10 bg-emerald-800 text-white flex items-center justify-center font-bold">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-slate-900 font-heading uppercase">Section Informatique Appliquée</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Génie logiciel, réseaux & télécommunications, administration des bases de données et cybersécurité.
                    </p>
                    <div className="pt-2 text-[11px] font-bold text-emerald-800 uppercase flex items-center justify-between">
                      <span>Licence (3 ans) / Master (2 ans)</span>
                      <button onClick={() => setCurrentPage('programs')} className="hover:underline">Détails →</button>
                    </div>
                  </div>

                  <div className="p-5 border-2 border-slate-200 bg-slate-50 hover:border-emerald-700 transition-colors space-y-3">
                    <div className="w-10 h-10 bg-emerald-800 text-white flex items-center justify-center font-bold">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-slate-900 font-heading uppercase">Section Génie Électrique</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Électrotechnique, énergies renouvelables (solaire, hydro), automatique et installations industrielles.
                    </p>
                    <div className="pt-2 text-[11px] font-bold text-emerald-800 uppercase flex items-center justify-between">
                      <span>Licence (3 ans) / Master (2 ans)</span>
                      <button onClick={() => setCurrentPage('programs')} className="hover:underline">Détails →</button>
                    </div>
                  </div>

                  <div className="p-5 border-2 border-slate-200 bg-slate-50 hover:border-emerald-700 transition-colors space-y-3">
                    <div className="w-10 h-10 bg-emerald-800 text-white flex items-center justify-center font-bold">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-slate-900 font-heading uppercase">Section Génie Mécanique</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Construction mécanique, maintenance industrielle, génie automobile et processus de fabrication.
                    </p>
                    <div className="pt-2 text-[11px] font-bold text-emerald-800 uppercase flex items-center justify-between">
                      <span>Licence (3 ans) / Master (2 ans)</span>
                      <button onClick={() => setCurrentPage('programs')} className="hover:underline">Détails →</button>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => setCurrentPage('programs')}
                    className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase px-6 py-3 border border-emerald-950 inline-flex items-center gap-2 font-heading"
                  >
                    Voir Toutes les 5 Sections & Programmes LMD
                  </button>
                </div>
              </div>
            </section>

            {/* Official Announcements / News */}
            <section className="py-12 px-4 sm:px-6 bg-slate-50">
              <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-emerald-950 font-heading uppercase">
                      Communiqués Officiels & Actualités du Campus
                    </h2>
                    <p className="text-xs text-slate-600">Dernières publications de la direction académique d'ISTA Burhuza</p>
                  </div>
                  <button 
                    onClick={() => setCurrentPage('registration')}
                    className="text-xs font-bold text-emerald-800 hover:underline uppercase"
                  >
                    Demander une Inscription →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {announcements.map(ann => (
                    <div key={ann.id} className="bg-white p-5 border-2 border-slate-200 hover:border-emerald-800 transition-colors space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5">
                          {ann.auteurRole}
                        </span>
                        <span className="text-xs text-slate-500">{ann.date}</span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 font-heading">{ann.titre}</h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{ann.contenu}</p>
                      <div className="pt-2 text-[11px] text-slate-500 font-medium">
                        Cible: <strong className="text-emerald-900">{ann.cible}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PAGE 2: ABOUT */}
        {currentPage === 'about' && (
          <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
            <div className="border-b border-slate-200 pb-4">
              <h1 className="text-3xl font-extrabold text-emerald-950 font-heading uppercase">
                À Propos de l'ISTA Burhuza
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Histoire, vision, gouvernance et mission au service de la jeunesse et de l'ingénierie congolaise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-8 space-y-6 text-sm text-slate-700 leading-relaxed">
                <div className="bg-white p-6 border-2 border-slate-200 space-y-3">
                  <h2 className="text-lg font-bold text-emerald-900 font-heading uppercase">1. Présentation Générale</h2>
                  <p>
                    L’<strong>Institut Supérieur de Techniques Appliquées (ISTA) Campus de Burhuza</strong> est une institution publique d'enseignement supérieur et universitaire fonctionnant sous la tutelle du Ministère de l’ESU en République Démocratique du Congo.
                  </p>
                  <p>
                    Implanté dans le territoire de Walungu au Sud-Kivu (site de Burhuza), l'établissement répond à la nécessité d'offrir une formation technique de haut niveau, décentralisée, accessible et axée sur les défis industriels, informatiques, énergétiques et agricoles de la région des Grands Lacs.
                  </p>
                </div>

                <div className="bg-white p-6 border-2 border-slate-200 space-y-3">
                  <h2 className="text-lg font-bold text-emerald-900 font-heading uppercase">2. Mission & Vision</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Formateur d'ingénieurs techniciens compétents, intègres et immédiatement opérationnels sur le marché du travail.</li>
                    <li>Promoteur de la recherche scientifique appliquée aux réalités locales (énergie solaire, développement logiciel, infrastructure).</li>
                    <li>Acteur clé du développement communautaire par l'expertise technique apportée aux entreprises et collectivités.</li>
                  </ul>
                </div>

                <div className="bg-white p-6 border-2 border-slate-200 space-y-3">
                  <h2 className="text-lg font-bold text-emerald-900 font-heading uppercase">3. Le Système LMD à l'ISTA</h2>
                  <p>
                    L'ISTA Burhuza a intégralement adopté le système <strong>Licence - Master - Doctorat (LMD)</strong>. Ce système favorise la mobilité des étudiants, l'évaluation continue par compétences, la capitalisation des crédits ECTS et la conduite de projets tutorés pratiques.
                  </p>
                </div>
              </div>

              {/* Side Card: Governance */}
              <div className="md:col-span-4 space-y-4">
                <div className="bg-emerald-950 text-white p-6 border-2 border-emerald-800 space-y-4">
                  <h3 className="font-bold text-base font-heading text-amber-400 uppercase border-b border-emerald-800 pb-2">
                    Comité de Direction
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div>
                      <p className="font-bold text-white uppercase">Prof. Dieudonné KABANGA</p>
                      <p className="text-emerald-300">Directeur Général</p>
                    </div>
                    <div>
                      <p className="font-bold text-white uppercase">CT Ir. Justin BAHATI</p>
                      <p className="text-emerald-300">Secrétaire Général Académique</p>
                    </div>
                    <div>
                      <p className="font-bold text-white uppercase">Chef Ass. Marie CIKURU</p>
                      <p className="text-emerald-300">Secrétaire Général Administratif</p>
                    </div>
                    <div>
                      <p className="font-bold text-white uppercase">Ir. Pascal MUDERHWA</p>
                      <p className="text-emerald-300">Administrateur du Budget</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 border-2 border-slate-200 text-xs space-y-2">
                  <h4 className="font-bold text-slate-900 uppercase font-heading">Coordonnées du Campus</h4>
                  <p className="text-slate-600">Site Universitaire de Burhuza</p>
                  <p className="text-slate-600">Territoire de Walungu, Sud-Kivu, RDC</p>
                  <p className="font-bold text-emerald-800 pt-1">Email: contact@ista-burhuza.ac.cd</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 3: PROGRAMS / FORMATIONS */}
        {currentPage === 'programs' && (
          <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
            <div className="border-b border-slate-200 pb-4">
              <h1 className="text-3xl font-extrabold text-emerald-950 font-heading uppercase">
                Sections & Offres de Formation (LMD)
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Découvrez les 5 filières techniques de niveau Licence et Master dispensées à l'ISTA Burhuza.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informatique */}
              <div className="bg-white p-6 border-2 border-slate-200 hover:border-emerald-800 transition-colors space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-800 text-white font-bold"><Laptop className="w-6 h-6" /></div>
                  <div>
                    <h2 className="font-bold text-lg text-slate-900 font-heading uppercase">1. Informatique Appliquée</h2>
                    <p className="text-xs text-emerald-800 font-bold uppercase">Option Génie Logiciel & Réseaux</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Formation axée sur la conception de systèmes d'information, le développement web/mobile, la programmation orientée objet, l'administration réseau et la gestion des bases de données SQL.
                </p>
                <div className="bg-slate-50 p-3 border border-slate-200 text-xs space-y-1">
                  <p className="font-bold text-slate-800">Diplôme délivré: Bachelor / Licence en Informatique (180 Crédits ECTS)</p>
                  <p className="text-slate-600">Débouchés: Développeur full-stack, Administrateur réseau, Chef de projet IT.</p>
                </div>
              </div>

              {/* Génie Électrique */}
              <div className="bg-white p-6 border-2 border-slate-200 hover:border-emerald-800 transition-colors space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-800 text-white font-bold"><Zap className="w-6 h-6" /></div>
                  <div>
                    <h2 className="font-bold text-lg text-slate-900 font-heading uppercase">2. Génie Électrique</h2>
                    <p className="text-xs text-emerald-800 font-bold uppercase">Option Électrotechnique & Énergies</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Apprentissage de la production, distribution d'énergie électrique, installations photovoltaïques, circuits électroniques et automatismes industriels.
                </p>
                <div className="bg-slate-50 p-3 border border-slate-200 text-xs space-y-1">
                  <p className="font-bold text-slate-800">Diplôme délivré: Licence en Génie Électrique (180 Crédits ECTS)</p>
                  <p className="text-slate-600">Débouchés: Ingénieur électricien, Technicien en énergie solaire, SNEL.</p>
                </div>
              </div>

              {/* Génie Mécanique */}
              <div className="bg-white p-6 border-2 border-slate-200 hover:border-emerald-800 transition-colors space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-800 text-white font-bold"><Wrench className="w-6 h-6" /></div>
                  <div>
                    <h2 className="font-bold text-lg text-slate-900 font-heading uppercase">3. Génie Mécanique</h2>
                    <p className="text-xs text-emerald-800 font-bold uppercase">Option Maintenance & Construction</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Conception de pièces mécaniques, maintenance préventive et corrective des engins lourd, mécanique automobile et systèmes hydrauliques.
                </p>
                <div className="bg-slate-50 p-3 border border-slate-200 text-xs space-y-1">
                  <p className="font-bold text-slate-800">Diplôme délivré: Licence en Génie Mécanique</p>
                  <p className="text-slate-600">Débouchés: Chef de garage, Technicien de maintenance industrielle.</p>
                </div>
              </div>

              {/* Génie Civil */}
              <div className="bg-white p-6 border-2 border-slate-200 hover:border-emerald-800 transition-colors space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-800 text-white font-bold"><Building2 className="w-6 h-6" /></div>
                  <div>
                    <h2 className="font-bold text-lg text-slate-900 font-heading uppercase">4. Génie Civil & Bâtiment</h2>
                    <p className="text-xs text-emerald-800 font-bold uppercase">Option Bâtiments & Travaux Publics (BTP)</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Topographie, résistance des matériaux, calcul de béton armé, dimensionnement d'ouvrages d'art, ponts et chaussées en milieu rural et urbain.
                </p>
                <div className="bg-slate-50 p-3 border border-slate-200 text-xs space-y-1">
                  <p className="font-bold text-slate-800">Diplôme délivré: Licence en Génie Civil (BTP)</p>
                  <p className="text-slate-600">Débouchés: Conducteur de travaux, Métreur, Topographe sur chantiers.</p>
                </div>
              </div>

              {/* Agronomie */}
              <div className="bg-white p-6 border-2 border-slate-200 hover:border-emerald-800 transition-colors space-y-3 md:col-span-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-800 text-white font-bold"><Sprout className="w-6 h-6" /></div>
                  <div>
                    <h2 className="font-bold text-lg text-slate-900 font-heading uppercase">5. Agronomie & Environnement</h2>
                    <p className="text-xs text-emerald-800 font-bold uppercase">Option Agro-Technologie & Production Végétale</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Techniques agricoles modernes, gestion des sols, transformation agro-alimentaire, développement durable et protection de la biodiversité du Sud-Kivu.
                </p>
                <div className="bg-slate-50 p-3 border border-slate-200 text-xs space-y-1">
                  <p className="font-bold text-slate-800">Diplôme délivré: Licence en Agronomie Appliquée</p>
                  <p className="text-slate-600">Débouchés: Expert agronome, Gestionnaire de fermes technologiques, ONG agricoles.</p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-900 text-white p-6 border-2 border-emerald-950 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base font-heading uppercase text-amber-400">
                  Prêt à commencer votre parcours d'ingénieur ?
                </h3>
                <p className="text-xs text-emerald-100 mt-1">
                  Complétez le formulaire d'inscription en ligne pour réserver votre place à l'ISTA Burhuza.
                </p>
              </div>
              <button
                onClick={() => setCurrentPage('registration')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase px-5 py-3 border border-amber-600 shrink-0 font-heading"
              >
                Formulaire d'Inscription →
              </button>
            </div>
          </div>
        )}

        {/* PAGE 4: ONLINE REGISTRATION FORM */}
        {currentPage === 'registration' && (
          <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
            <div className="border-b border-slate-200 pb-4">
              <span className="bg-emerald-800 text-white text-[10px] font-bold px-2 py-0.5 uppercase">
                FORMULAIRE OFFICIEL ESU
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-heading uppercase mt-1">
                Inscription en Ligne (2025-2026)
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Complétez les informations ci-dessous pour créer votre dossier d'admission à l'ISTA Burhuza.
              </p>
            </div>

            {regSuccess ? (
              <div className="bg-white border-2 border-emerald-800 p-8 space-y-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center rounded-none border border-emerald-300">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
                    INSCRIPTION ENREGISTRÉE AVEC SUCCÈS
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 font-heading">
                    Félicitations, {regData.prenom} {regData.nom} !
                  </h2>
                  <p className="text-xs text-slate-600 max-w-lg mx-auto">
                    Votre dossier d'admission a été soumis au Secrétariat Académique de l'ISTA Burhuza.
                  </p>
                </div>

                {/* Printable Official Receipt */}
                <div className="bg-slate-50 p-6 border-2 border-emerald-900 text-left max-w-xl mx-auto space-y-4 text-xs font-sans">
                  <div className="border-b border-emerald-800 pb-3 flex items-center justify-between">
                    <div>
                      <strong className="text-sm font-bold text-emerald-950 font-heading uppercase">RÉCÉPISSÉ D'INSCRIPTION LMD</strong>
                      <p className="text-[10px] text-slate-600">ISTA Burhuza • Année Académique 2025-2026</p>
                    </div>
                    <span className="font-mono font-bold text-emerald-800 text-xs bg-emerald-100 px-2 py-1 border border-emerald-300">
                      {registrationCode}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-slate-700">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Candidat(e):</span>
                      <strong className="text-slate-900 uppercase">{regData.nom} {regData.postnom} {regData.prenom}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Section demandée:</span>
                      <strong className="text-emerald-900 uppercase">{regData.section} ({regData.niveau})</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Téléphone & Email:</span>
                      <span className="text-slate-900">{regData.telephone} • {regData.email}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Diplôme d'État Exetat:</span>
                      <span className="text-slate-900">N° {regData.numDiplome || 'En attente'} ({regData.pourcentageExetat}%)</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-500 flex justify-between items-center">
                    <span>Statut: <strong>Dossier pré-validé</strong></span>
                    <span>Date: {new Date().toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase px-5 py-2.5 flex items-center gap-2 border border-emerald-950 font-heading"
                  >
                    <Download className="w-4 h-4 text-amber-300" /> Imprimer / Télécharger le Récépissé PDF
                  </button>
                  <button
                    onClick={() => {
                      setRegSuccess(false);
                      setRegData({
                        nom: '', postnom: '', prenom: '', sexe: 'M', dateNaissance: '', lieuNaissance: '',
                        telephone: '', email: '', adresse: '', section: 'Informatique Appliquée',
                        niveau: 'Licence 1 (LMD)', numDiplome: '', pourcentageExetat: '', anneeExetat: '2025'
                      });
                    }}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs uppercase px-5 py-2.5 border border-slate-400 font-heading"
                  >
                    Nouvelle Inscription
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegistrationSubmit} className="bg-white p-6 border-2 border-slate-200 space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-emerald-950 font-heading uppercase border-b border-slate-200 pb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-800" />
                    1. Identité du Candidat
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">Nom *</label>
                      <input
                        type="text"
                        required
                        value={regData.nom}
                        onChange={(e) => setRegData({ ...regData, nom: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 font-medium focus:outline-none focus:border-emerald-700 uppercase"
                        placeholder="Ex: MUKAMBA"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">Post-nom</label>
                      <input
                        type="text"
                        value={regData.postnom}
                        onChange={(e) => setRegData({ ...regData, postnom: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 font-medium focus:outline-none focus:border-emerald-700 uppercase"
                        placeholder="Ex: KALONJI"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">Prénom *</label>
                      <input
                        type="text"
                        required
                        value={regData.prenom}
                        onChange={(e) => setRegData({ ...regData, prenom: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 font-medium focus:outline-none focus:border-emerald-700 uppercase"
                        placeholder="Ex: Alain"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">Sexe *</label>
                      <select
                        value={regData.sexe}
                        onChange={(e) => setRegData({ ...regData, sexe: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 font-bold"
                      >
                        <option value="M">Masculin (M)</option>
                        <option value="F">Féminin (F)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">Date de Naissance *</label>
                      <input
                        type="date"
                        required
                        value={regData.dateNaissance}
                        onChange={(e) => setRegData({ ...regData, dateNaissance: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">Téléphone *</label>
                      <input
                        type="tel"
                        required
                        value={regData.telephone}
                        onChange={(e) => setRegData({ ...regData, telephone: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 font-medium"
                        placeholder="+243 990 000 000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">Adresse Email *</label>
                      <input
                        type="email"
                        required
                        value={regData.email}
                        onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300"
                        placeholder="candidat@gmail.com"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">Adresse Résidence (Bukavu/Burhuza)</label>
                      <input
                        type="text"
                        value={regData.adresse}
                        onChange={(e) => setRegData({ ...regData, adresse: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300"
                        placeholder="Av. Universitaire, Bukavu"
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Choice */}
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-emerald-950 font-heading uppercase border-b border-slate-200 pb-2 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-800" />
                    2. Choix de la Formation & Diplôme d'État
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">Section Souhaitée *</label>
                      <select
                        value={regData.section}
                        onChange={(e) => setRegData({ ...regData, section: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 font-bold text-emerald-900"
                      >
                        <option value="Informatique Appliquée">Informatique Appliquée</option>
                        <option value="Génie Électrique">Génie Électrique</option>
                        <option value="Génie Mécanique">Génie Mécanique</option>
                        <option value="Génie Civil">Génie Civil (BTP)</option>
                        <option value="Agronomie & Environnement">Agronomie & Environnement</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">Niveau d'Études *</label>
                      <select
                        value={regData.niveau}
                        onChange={(e) => setRegData({ ...regData, niveau: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 font-bold"
                      >
                        <option value="Licence 1 (LMD)">Licence 1 (L1 LMD)</option>
                        <option value="Licence 2 (LMD)">Licence 2 (L2 LMD)</option>
                        <option value="Licence 3 (LMD)">Licence 3 (L3 LMD)</option>
                        <option value="Master 1 (LMD)">Master 1 (M1 LMD)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">N° Diplôme d'État (Exetat)</label>
                      <input
                        type="text"
                        value={regData.numDiplome}
                        onChange={(e) => setRegData({ ...regData, numDiplome: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300"
                        placeholder="Ex: 8941203/SK"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">% Obtenu à l'Exetat *</label>
                      <input
                        type="number"
                        required
                        min="50"
                        max="100"
                        value={regData.pourcentageExetat}
                        onChange={(e) => setRegData({ ...regData, pourcentageExetat: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 font-bold text-slate-900"
                        placeholder="Ex: 68%"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">Année d'obtention Exetat</label>
                      <input
                        type="text"
                        value={regData.anneeExetat}
                        onChange={(e) => setRegData({ ...regData, anneeExetat: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <p className="text-[11px] text-slate-500">
                    * Tous les champs obligatoires doivent être renseignés.
                  </p>
                  <button
                    type="submit"
                    className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase px-6 py-3 border border-emerald-950 flex items-center gap-2 font-heading"
                  >
                    <Send className="w-4 h-4 text-amber-300" /> Soumettre mon Dossier
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* PAGE 5: SCHEDULES (HORAIRES DE COURS) */}
        {currentPage === 'schedule' && (
          <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
            <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-emerald-950 font-heading uppercase">
                  Emploi du Temps & Horaires des Cours
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Consultation en ligne du planning hebdomadaire des cours, auditoires et professeurs à l'ISTA Burhuza.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={schedSection}
                  onChange={(e) => setSchedSection(e.target.value)}
                  className="p-2 text-xs bg-white border-2 border-emerald-800 font-bold text-emerald-950 uppercase"
                >
                  <option value="Informatique Appliquée">Informatique Appliquée</option>
                  <option value="Génie Électrique">Génie Électrique</option>
                  <option value="Génie Mécanique">Génie Mécanique</option>
                  <option value="Génie Civil">Génie Civil</option>
                </select>

                <select
                  value={schedPromotion}
                  onChange={(e) => setSchedPromotion(e.target.value)}
                  className="p-2 text-xs bg-white border-2 border-emerald-800 font-bold text-emerald-950 uppercase"
                >
                  <option value="L1">L1 LMD</option>
                  <option value="L2">L2 LMD</option>
                  <option value="L3">L3 LMD</option>
                </select>
              </div>
            </div>

            {/* Timetable Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schedules
                .filter(s => s.section === schedSection || s.section.includes(schedSection.substring(0, 4)))
                .map(sch => (
                  <div key={sch.id} className="bg-white border-2 border-slate-200 p-5 space-y-3 hover:border-emerald-800 transition-colors">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-bold text-xs bg-emerald-800 text-white px-2 py-0.5 uppercase">
                        {sch.jour}
                      </span>
                      <span className="font-bold text-xs text-amber-700 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {sch.heureDebut} - {sch.heureFin}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-slate-900 font-heading">{sch.coursTitre}</h3>
                      <p className="text-xs text-emerald-800 font-bold uppercase mt-0.5">Enseignant: {sch.professeur}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <span>Auditoire / Salle: <strong className="text-slate-900">{sch.salle}</strong></span>
                      <span className="font-bold text-slate-800">{sch.promotion}</span>
                    </div>
                  </div>
                ))}
            </div>

            <div className="bg-slate-100 p-4 border border-slate-300 text-xs text-slate-600 flex items-center justify-between">
              <span>Remarque: Les modifications d'horaires d'urgence sont publiées dans la section Communiqués.</span>
              <button onClick={() => window.print()} className="font-bold text-emerald-800 hover:underline uppercase flex items-center gap-1">
                <Download className="w-3.5 h-3.5" /> Imprimer l'Horaire
              </button>
            </div>
          </div>
        )}

        {/* PAGE 6: TRANSCRIPTS (RELEVES DE NOTES) */}
        {currentPage === 'transcripts' && (
          <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
            <div className="border-b border-slate-200 pb-4">
              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 border border-amber-300 uppercase">
                ESPACE ÉTUDIANT & TRANSPARENCE ACADÉMIQUE
              </span>
              <h1 className="text-3xl font-extrabold text-emerald-950 font-heading uppercase mt-1">
                Consultation & Téléchargement des Relevés de Notes
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Entrez votre numéro de matricule étudiant (ex: 2024-INF-001) pour consulter et télécharger votre relevé officiel LMD.
              </p>
            </div>

            {/* Search Box */}
            <form onSubmit={handleTranscriptSearch} className="bg-white p-6 border-2 border-emerald-900 space-y-3">
              <label className="block text-xs font-bold text-emerald-950 font-heading uppercase">
                Numéro de Matricule ou Nom de l'Étudiant
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={transcriptMatricule}
                  onChange={(e) => setTranscriptMatricule(e.target.value)}
                  placeholder="Ex: 2024-INF-001 ou MUKAMBA"
                  className="flex-1 p-3 bg-slate-50 border border-slate-300 font-bold text-slate-900 text-sm focus:outline-none focus:border-emerald-700 uppercase"
                />
                <button
                  type="submit"
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase px-6 py-3 border border-emerald-950 flex items-center justify-center gap-2 font-heading"
                >
                  <Search className="w-4 h-4 text-amber-300" /> Rechercher Relevé
                </button>
              </div>

              {transcriptError && (
                <div className="p-3 bg-red-50 text-red-800 border border-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>{transcriptError}</span>
                </div>
              )}
            </form>

            {/* Display Found Student Transcript */}
            {searchedStudent && (
              <div className="bg-white border-2 border-emerald-900 p-6 space-y-6 shadow-md">
                {/* Transcript Header */}
                <div className="border-b-2 border-emerald-900 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-800 text-white font-bold text-[10px] px-2 py-0.5 uppercase">RELEVÉ DE COTES OFFICIEL</span>
                      <span className="font-bold text-xs text-amber-700">{searchedStudent.section} • {searchedStudent.promotion}</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 font-heading uppercase mt-1">
                      {searchedStudent.nom} {searchedStudent.prenom}
                    </h2>
                    <p className="text-xs text-slate-600 font-medium">
                      Matricule: <strong className="text-emerald-900">{searchedStudent.matricule}</strong> | Statut: <strong className="text-emerald-800 uppercase">{searchedStudent.statutPaiement}</strong>
                    </p>
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase px-4 py-2.5 flex items-center gap-2 border border-emerald-950 shadow-xs font-heading"
                  >
                    <Download className="w-4 h-4 text-amber-300" /> Télécharger Relevé PDF
                  </button>
                </div>

                {/* Grades Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border border-slate-300">
                    <thead className="bg-emerald-900 text-white uppercase text-[10px] font-heading">
                      <tr>
                        <th className="p-2.5 border border-emerald-800">Élément Constitutif (EC)</th>
                        <th className="p-2.5 border border-emerald-800 text-center">Crédits</th>
                        <th className="p-2.5 border border-emerald-800 text-center">Intra / TP (/20)</th>
                        <th className="p-2.5 border border-emerald-800 text-center">Examen (/20)</th>
                        <th className="p-2.5 border border-emerald-800 text-center">Note Finale (/20)</th>
                        <th className="p-2.5 border border-emerald-800 text-center">Décision</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                      {searchedStudentGrades.map((g, idx) => {
                        const course = courses.find(c => c.id === g.courseId);
                        return (
                          <tr key={g.id || idx} className="hover:bg-slate-50">
                            <td className="p-2.5 border border-slate-200 font-bold">{course?.titre || 'Unité d’Enseignement'}</td>
                            <td className="p-2.5 border border-slate-200 text-center font-bold text-emerald-900">{course?.creditsECTS || 4} ECTS</td>
                            <td className="p-2.5 border border-slate-200 text-center">{g.noteIntra}</td>
                            <td className="p-2.5 border border-slate-200 text-center">{g.noteExamen}</td>
                            <td className="p-2.5 border border-slate-200 text-center font-bold text-slate-900">{g.noteFinale} / 20</td>
                            <td className="p-2.5 border border-slate-200 text-center">
                              {g.valide ? (
                                <span className="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 border border-emerald-300 uppercase text-[10px]">Validé</span>
                              ) : (
                                <span className="bg-red-100 text-red-900 font-bold px-2 py-0.5 border border-red-300 uppercase text-[10px]">Ajourné</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Summary Box */}
                <div className="bg-slate-50 p-4 border border-slate-300 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 uppercase block text-[10px]">Moyenne Générale Pondérée:</span>
                    <strong className="text-base text-emerald-900 font-bold font-heading">
                      {searchedStudent.moyenneGenerale ? `${searchedStudent.moyenneGenerale.toFixed(2)} / 20` : '14.50 / 20'}
                    </strong>
                  </div>

                  <div className="text-right">
                    <span className="text-slate-500 uppercase block text-[10px]">Mention Officielle du Jury:</span>
                    <strong className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-1 border border-amber-300 uppercase">
                      SATISFACTION (Pourtours Valides)
                    </strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PAGE 7: CAMPUS LIFE */}
        {currentPage === 'campus' && (
          <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
            <div className="border-b border-slate-200 pb-4">
              <h1 className="text-3xl font-extrabold text-emerald-950 font-heading uppercase">
                Vie Éducative, Recherche & Projets d'Étudiants
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Activités académiques, laboratoires technologiques et initiatives des étudiants sur le Campus de Burhuza.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 border-2 border-slate-200 space-y-3">
                <h3 className="font-bold text-base text-emerald-900 font-heading uppercase">1. Laboratoire d'Informatique</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Équipé de 40 ordinateurs connectés en réseau haut débit, le labo permet l'apprentissage pratique du codage Java/Python, du déploiement de serveurs Linux et des bases de données.
                </p>
              </div>

              <div className="bg-white p-6 border-2 border-slate-200 space-y-3">
                <h3 className="font-bold text-base text-emerald-900 font-heading uppercase">2. Atelier de Génie Électrique</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bancs d'essais pour moteurs électriques, simulateurs de circuits photovoltaïques et matériel de câblage industriel mis à disposition des étudiants en L2 et L3.
                </p>
              </div>

              <div className="bg-white p-6 border-2 border-slate-200 space-y-3">
                <h3 className="font-bold text-base text-emerald-900 font-heading uppercase">3. Bibliothèque Numérique</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Accès à plus de 15 000 ouvrages scientifiques, revues techniques, syllabus numérisés et mémoires de fin d'études consultables gratuitement sur le réseau du campus.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 8: CONTACT */}
        {currentPage === 'contact' && (
          <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
            <div className="border-b border-slate-200 pb-4">
              <h1 className="text-3xl font-extrabold text-emerald-950 font-heading uppercase">
                Contact & Localisation
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Infoline, Secrétariat Académique et itinéraire vers le Campus de Burhuza.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-6 bg-white p-6 border-2 border-slate-200 space-y-4">
                <h2 className="font-bold text-lg text-emerald-950 font-heading uppercase">Formulaire de Contact</h2>
                <form onSubmit={(e) => { e.preventDefault(); alert('Message envoyé avec succès au secrétariat ISTA Burhuza !'); }} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Nom Complet</label>
                    <input type="text" required className="w-full p-2.5 bg-slate-50 border border-slate-300 font-medium" placeholder="Votre nom" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Email / Téléphone</label>
                    <input type="text" required className="w-full p-2.5 bg-slate-50 border border-slate-300 font-medium" placeholder="Ex: 0990000000" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Message / Question</label>
                    <textarea rows={4} required className="w-full p-2.5 bg-slate-50 border border-slate-300 font-medium" placeholder="Posez votre question..."></textarea>
                  </div>
                  <button type="submit" className="bg-emerald-800 text-white font-bold text-xs uppercase px-6 py-3 border border-emerald-950 font-heading">
                    Envoyer le Message
                  </button>
                </form>
              </div>

              <div className="md:col-span-6 space-y-4">
                <div className="bg-emerald-950 text-white p-6 border-2 border-emerald-800 space-y-3 text-xs">
                  <h3 className="font-bold text-base font-heading text-amber-400 uppercase">Adresses & Contacts Officiels</h3>
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-300" /> Site Universitaire de Burhuza, Territoire de Walungu, Sud-Kivu, RDC</p>
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-300" /> Secrétariat: +243 997 123 456 / +243 850 987 654</p>
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-emerald-300" /> Email: sec.academique@ista-burhuza.ac.cd</p>
                  <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-300" /> Heures d'ouverture: Lundi - Samedi: 08h00 - 16h00</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-emerald-950 text-white text-xs py-10 px-4 sm:px-6 border-t-4 border-emerald-700 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-700 text-white flex items-center justify-center font-bold text-sm font-heading">ISTA</div>
              <strong className="text-base font-bold font-heading uppercase text-amber-400">ISTA BURHUZA</strong>
            </div>
            <p className="text-[11px] text-emerald-200 leading-relaxed">
              Institut Supérieur de Techniques Appliquées. Établissement public d'enseignement supérieur technique au Sud-Kivu (RDC).
            </p>
          </div>

          <div>
            <h4 className="font-bold text-amber-400 font-heading uppercase mb-3 text-xs">Accès Rapide</h4>
            <ul className="space-y-1.5 text-[11px] text-emerald-200">
              <li><button onClick={() => setCurrentPage('registration')} className="hover:underline">Inscription en Ligne</button></li>
              <li><button onClick={() => setCurrentPage('schedule')} className="hover:underline">Horaires des Cours</button></li>
              <li><button onClick={() => setCurrentPage('transcripts')} className="hover:underline">Relevés de Notes</button></li>
              <li><button onClick={() => setCurrentPage('programs')} className="hover:underline">Sections LMD</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-amber-400 font-heading uppercase mb-3 text-xs">Sections Agréées</h4>
            <ul className="space-y-1.5 text-[11px] text-emerald-200">
              <li>Informatique Appliquée</li>
              <li>Génie Électrique</li>
              <li>Génie Mécanique</li>
              <li>Génie Civil (BTP)</li>
              <li>Agronomie Appliquée</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-amber-400 font-heading uppercase mb-3 text-xs">Administration (SIGU)</h4>
            <p className="text-[11px] text-emerald-200 mb-3">Accès réservé aux enseignants, chefs de section, président de jury et direction.</p>
            {isLoggedIn ? (
              <button
                onClick={onGoToDashboard}
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase px-4 py-2 flex items-center gap-2 border border-emerald-500 font-heading"
              >
                <ShieldCheck className="w-4 h-4" /> Accéder au SIGU
              </button>
            ) : (
              <button
                onClick={onLoginRequest}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase px-4 py-2 flex items-center gap-2 border border-amber-600 font-heading"
              >
                <LogIn className="w-4 h-4" /> Se Connecter au SIGU
              </button>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-emerald-900 flex flex-col sm:flex-row justify-between items-center text-[10px] text-emerald-300">
          <span>© {new Date().getFullYear()} ISTA BURHUZA • Ministère de l'ESU, République Démocratique du Congo. Tous droits réservés.</span>
          <span>Portail Universitaire SIGU v1.0</span>
        </div>
      </footer>
    </div>
  );
};
