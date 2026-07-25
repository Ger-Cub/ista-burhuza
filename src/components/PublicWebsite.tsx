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
  AlertCircle,
  Newspaper,
  Pin,
  Share2,
  Tag,
  Bookmark,
  Eye,
  MessageSquare,
  Filter,
  Plus,
  ChevronRight,
  Megaphone,
  Printer,
  ThumbsUp,
  CalendarDays
} from 'lucide-react';
import { Student, Course, ScheduleItem, Grade, Announcement } from '../types';
import heroBgImage from '../assets/images/university_hero_bg_1784981162011.jpg';
import istaLogo from '../assets/images/ista_logo_1784981336164.jpg';

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
  | 'announcements'
  | 'blog'
  | 'registration' 
  | 'schedule' 
  | 'transcripts' 
  | 'campus' 
  | 'contact';

export interface BlogPost {
  id: string;
  titre: string;
  category: 'Recherche & Tech' | 'Vie du Campus' | 'Événements & Soutenances' | 'Partenariats' | 'Infrastructures';
  author: string;
  authorRole?: string;
  date: string;
  readTime: string;
  excerpt: string;
  fullText: string;
  tags: string[];
  featured?: boolean;
  likes: number;
  comments: { id: string; author: string; text: string; date: string }[];
  imageUrl?: string;
}

const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    titre: "Inauguration du Laboratoire Informatique & Réseaux au Campus de Burhuza",
    category: 'Recherche & Tech',
    author: "Cellule de Communication ISTA",
    authorRole: "Direction de l'Information",
    date: "2026-07-22",
    readTime: "4 min de lecture",
    excerpt: "Les étudiants en Informatique Appliquée bénéficient désormais de 40 postes informatiques interconnectés pour les travaux pratiques en génie logiciel et administration réseau.",
    fullText: `Dans le cadre de la modernisation du Campus de Burhuza, le Comité de Gestion de l'ISTA a procédé à l'inauguration officielle des nouvelles installations du Laboratoire d'Informatique.

Équipé de serveurs dédiés, d'une connexion haut débit et d'outils de développement de dernière génération, ce labo permettra aux étudiants des niveaux L1, L2 et L3 d'effectuer leurs séances de travaux pratiques en :
- Développement d'applications Web & Mobiles
- Administration de bases de données relationnelles
- Sécurité des réseaux et systèmes Linux
- Algorithmique et structures de données avancées

Le Directeur Général, Prof. Dieudonné KABANGA, a souligné l'importance de ce laboratoire pour la formation d'ingénieurs techniquement compétents et immédiatement opérationnels sur le marché du travail du Sud-Kivu et de la RDC.`,
    tags: ['Informatique', 'Laboratoire', 'LMD', 'Technologie'],
    featured: true,
    likes: 42,
    comments: [
      { id: 'c1', author: 'Ir. Gloire M.', text: 'Une excellente initiative pour nos étudiants en L2 Informatique ! Bravo à la direction.', date: '2026-07-23' },
      { id: 'c2', author: 'Etudiant L1', text: 'Merci pour ces machines performantes, les TP de langage C vont être géniaux !', date: '2026-07-23' }
    ]
  },
  {
    id: 'blog-2',
    titre: "Calendrier Officiel des Soutenances de TFC et Mémoires - Session Aout 2026",
    category: 'Événements & Soutenances',
    author: "Secrétariat Académique",
    authorRole: "Secrétaire Général Académique",
    date: "2026-07-20",
    readTime: "3 min de lecture",
    excerpt: "Publication des grilles de passage pour les présentations publiques des travaux de fin de cycle (TFC) dans toutes les sections agréées de l'ISTA Burhuza.",
    fullText: `Le Secrétaire Général Académique porte à la connaissance de tous les étudiants finalistes qu'en vertu du calendrier académique officiel 2025-2026, les soutenances publiques des Travaux de Fin de Cycle (TFC) et Mémoires se tiendront du 10 au 15 août 2026.

Chaque candidat doit s'assurer d'avoir :
1. Validé l'ensemble des crédits des semestres S1 à S6.
2. Déposé quatre (4) exemplaires reliés de son travail au secrétariat de section.
3. Obtenu le quitus de la caisse centrale concernant les frais d'études.

Les jurys d'évaluation seront présidés par les Chefs de Travaux et Professeurs désignés par la direction. Les familles, proches et étudiants sont invités à assister aux séances publiques.`,
    tags: ['Soutenances', 'TFC', 'Examens', 'Graduation'],
    featured: false,
    likes: 28,
    comments: [
      { id: 'c3', author: 'MUKAMBA Jean-Luc', text: 'Informations bien reçues. À quel niveau peut-on consulter la liste des jurys ?', date: '2026-07-21' }
    ]
  },
  {
    id: 'blog-3',
    titre: "Micro-centrale Solaire Autonome : La Section Génie Électrique déploie son prototype",
    category: 'Recherche & Tech',
    author: "Prof. Marc KABAMBA",
    authorRole: "Enseignant-Chercheur Génie Électrique",
    date: "2026-07-15",
    readTime: "5 min de lecture",
    excerpt: "Conçue et assemblée sur le campus, une centrale photovoltaïque de 10 kVA fournit un éclairage continu et alimente les équipements de recherche de Burhuza.",
    fullText: `Pour pallier les coupures de courant et promouvoir l'autonomie énergétique en milieu rural, les enseignants et étudiants de la Section Génie Électrique ont mis en place une micro-centrale solaire sur le toit du bâtiment administratif.

Ce projet à vocation didactique et communautaire comprend :
- 16 panneaux solaires monocristallins de 450W
- Un banc de batteries lithium-fer-phosphate
- Un onduleur hybride intelligent paramétré par les étudiants de L3
- Un système de télémesure en temps réel accessible en réseau local

Cette réalisation démontre le savoir-faire pratique de l'ISTA Burhuza et constitue un modèle réplicable pour les collectivités territoriales du Territoire de Walungu.`,
    tags: ['Génie Électrique', 'Énergie Solaire', 'Autonomie', 'Innovation'],
    featured: false,
    likes: 56,
    comments: [
      { id: 'c4', author: 'Aline CHIRUZA', text: 'Magnifique travail des ingénieurs électriciens ! C\'est la preuve que Burhuza innove.', date: '2026-07-16' }
    ]
  },
  {
    id: 'blog-4',
    titre: "Journée d'Accueil et d'Orientation des Nouveaux Étudiants pour l'Année 2025-2026",
    category: 'Vie du Campus',
    author: "Représentation Étudiante (CP)",
    authorRole: "Porte-parole des Étudiants",
    date: "2026-07-10",
    readTime: "3 min de lecture",
    excerpt: "Présentation des règles académiques du système LMD, visite guidée des ateliers et enregistrement des comptes sur le portail SIGU.",
    fullText: `La Représentation des Étudiants de l'ISTA Burhuza a organisé une journée d'orientation chaleureuse à l'attention de la nouvelle promotion d'étudiants inscrits en Licence 1.

Au programme de cette journée :
- Discours de bienvenue du Directeur Général et présentation des Chefs de Section.
- Atelier d'explication du système LMD (Crédits, Semestres, Unités d'Enseignement, Délibérations).
- Démonstration d'utilisation du Portail SIGU pour la consultation des horaires et des bulletins de notes.
- Visite guidée de la bibliothèque, du labo informatique et des ateliers de mécanique.

Bienvenue à tous les nouveaux futurs ingénieurs de l'ISTA Burhuza !`,
    tags: ['Inscriptions', 'Orientation', 'Vie Étudiante', 'LMD'],
    featured: false,
    likes: 31,
    comments: []
  },
  {
    id: 'blog-5',
    titre: "Partenariat ISTA Burhuza & Industriels du Sud-Kivu : 30 Stages Académiques Garantis",
    category: 'Partenariats',
    author: "Cellule de Liaison Entreprises",
    authorRole: "Coordination des Stages",
    date: "2026-07-02",
    readTime: "4 min de lecture",
    excerpt: "Signature d'accords de partenariat permettant l'immersion professionnelle des étudiants de Génie Civil, Mécanique et Électrique dans les entreprises de la région.",
    fullText: `L'Institut Supérieur de Techniques Appliquées (ISTA Burhuza) consolide ses liens avec le secteur privé et industriel du Sud-Kivu. La direction a signé cinq (5) conventions de partenariat stratégique avec des entreprises spécialisées en construction (BTP), maintenance industrielle et télécommunications.

Ces conventions offrent :
1. Des stages pratiques de 2 mois encadrés par des tuteurs d'entreprise.
2. La possibilité de traiter des sujets de TFC orientés vers les problèmes réels des usines locaux.
3. Des opportunités de pré-embauche pour les meilleurs lauréats de la promotion.`,
    tags: ['Stages', 'Emploi', 'Partenariats', 'Génie Civil'],
    featured: false,
    likes: 47,
    comments: []
  }
];

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

  // Blog State & Modals
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [selectedAnnouncementForModal, setSelectedAnnouncementForModal] = useState<Announcement | null>(null);
  const [selectedBlogForModal, setSelectedBlogForModal] = useState<BlogPost | null>(null);
  const [announcementFilter, setAnnouncementFilter] = useState('Tous');
  const [announcementSearch, setAnnouncementSearch] = useState('');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState('Tous');
  const [blogSearch, setBlogSearch] = useState('');
  const [showArticleSubmissionModal, setShowArticleSubmissionModal] = useState(false);
  const [newBlogData, setNewBlogData] = useState({
    titre: '',
    category: 'Recherche & Tech' as BlogPost['category'],
    author: '',
    excerpt: '',
    fullText: '',
    tags: 'Technologie, Burhuza'
  });
  const [newBlogSuccess, setNewBlogSuccess] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

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

  // Blog Handlers
  const handleAddBlogArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogData.titre || !newBlogData.fullText || !newBlogData.author) return;
    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      titre: newBlogData.titre,
      category: newBlogData.category,
      author: newBlogData.author,
      authorRole: 'Contributeur ISTA',
      date: new Date().toISOString().split('T')[0],
      readTime: '3 min de lecture',
      excerpt: newBlogData.excerpt || newBlogData.fullText.substring(0, 140) + '...',
      fullText: newBlogData.fullText,
      tags: newBlogData.tags.split(',').map(t => t.trim()).filter(Boolean),
      featured: false,
      likes: 1,
      comments: []
    };
    setBlogPosts(prev => [newPost, ...prev]);
    setNewBlogSuccess(true);
    setTimeout(() => {
      setNewBlogSuccess(false);
      setShowArticleSubmissionModal(false);
      setNewBlogData({
        titre: '',
        category: 'Recherche & Tech',
        author: '',
        excerpt: '',
        fullText: '',
        tags: 'Technologie, Burhuza'
      });
    }, 1200);
  };

  const handleLikeBlogPost = (postId: string) => {
    setBlogPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
    if (selectedBlogForModal && selectedBlogForModal.id === postId) {
      setSelectedBlogForModal(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
    }
  };

  const handleAddComment = (postId: string) => {
    if (!newCommentText.trim()) return;
    const commentObj = {
      id: `c-${Date.now()}`,
      author: commentAuthor.trim() || 'Visiteur du Site',
      text: newCommentText.trim(),
      date: new Date().toISOString().split('T')[0]
    };
    setBlogPosts(prev => prev.map(p => p.id === postId ? { ...p, comments: [...p.comments, commentObj] } : p));
    if (selectedBlogForModal && selectedBlogForModal.id === postId) {
      setSelectedBlogForModal(prev => prev ? { ...prev, comments: [...prev.comments, commentObj] } : null);
    }
    setNewCommentText('');
  };

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
    { id: 'programs', label: 'Formations' },
    { id: 'announcements', label: 'Communiqués' },
    { id: 'blog', label: 'Blog & Actualités' },
    { id: 'registration', label: 'Inscription' },
    { id: 'schedule', label: 'Horaires' },
    { id: 'transcripts', label: 'Relevés' },
    { id: 'campus', label: 'Vie Éducative' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col w-full max-w-full overflow-x-hidden">
      {/* Top Announcement Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-3 sm:px-4 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="bg-emerald-700 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-xs">
              INSCRIPTIONS 2025-2026
            </span>
            <span className="font-medium text-[11px] sm:text-xs">
              Les admissions en ligne pour l'année académique 2025-2026 sont officiellement ouvertes !
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-300">
              <MapPin className="w-3 h-3 flex-shrink-0" /> Burhuza, Walungu
            </span>
            <span className="hidden md:inline text-emerald-400">|</span>
            <span className="flex items-center gap-1 text-emerald-300">
              <Phone className="w-3 h-3 flex-shrink-0" /> +243 997 123 456
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-xs w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Clean Borderless Square Logo & University Title */}
          <div 
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group flex-shrink-0" 
            onClick={() => setCurrentPage('home')}
          >
            <img 
              src={istaLogo} 
              alt="Logo ISTA" 
              referrerPolicy="no-referrer" 
              className="w-10 h-10 sm:w-14 sm:h-14 object-contain aspect-square transition-transform group-hover:scale-105 flex-shrink-0" 
            />
            <div className="flex-shrink-0">
              <h1 className="font-extrabold text-lg sm:text-2xl text-emerald-950 font-heading tracking-tight leading-none uppercase">
                ISTA
              </h1>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-2 xl:px-2.5 py-1.5 text-[11px] xl:text-xs font-bold font-heading uppercase transition-colors border-b-2 whitespace-nowrap rounded-lg ${
                  currentPage === item.id 
                    ? 'border-emerald-700 text-emerald-900 bg-emerald-50/80' 
                    : 'border-transparent text-slate-700 hover:text-emerald-800 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Button: Espace Administration / SIGU */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {isLoggedIn ? (
              <button
                onClick={onGoToDashboard}
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl flex items-center gap-1.5 border border-emerald-900 shadow-xs transition-colors uppercase font-heading whitespace-nowrap"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>SIGU <span className="hidden sm:inline">({currentUserRole})</span></span>
              </button>
            ) : (
              <button
                onClick={onLoginRequest}
                className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl flex items-center gap-1.5 border border-emerald-950 shadow-xs transition-colors uppercase font-heading whitespace-nowrap"
              >
                <LogIn className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Connexion <span className="hidden md:inline">Portail SIGU</span></span>
              </button>
            )}

            {/* Mobile & Tablet Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl border border-slate-200/80 transition-colors flex-shrink-0"
              title="Menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-1.5 shadow-lg">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 text-xs font-bold uppercase rounded-lg transition-colors ${
                  currentPage === item.id ? 'bg-emerald-800 text-white' : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Page Content */}
      <main className="flex-1">
        {/* PAGE 1: HOME */}
        {currentPage === 'home' && (
          <div>
            {/* Hero Banner Section with Background Image - Extra Transparent Background Overlay per request */}
            <section className="relative overflow-hidden bg-emerald-950 text-white py-16 px-4 sm:px-6 border-b-4 border-emerald-700">
              {/* Background Image with Crisp Extra Transparent Overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={heroBgImage} 
                  alt="Campus ISTA Burhuza" 
                  referrerPolicy="no-referrer" 
                  className="w-full h-full object-cover object-center opacity-65 filter brightness-105 contrast-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/60 via-emerald-950/35 to-slate-950/25 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-emerald-950/20"></div>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase px-3.5 py-1.5 rounded-full border border-emerald-600/60 backdrop-blur-xs">
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
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase px-5 py-3 rounded-xl flex items-center gap-2 border border-emerald-400 shadow-md transition-all font-heading"
                    >
                      <Send className="w-4 h-4" /> S'inscrire en Ligne (2025-2026)
                    </button>
                    <button
                      onClick={() => setCurrentPage('transcripts')}
                      className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase px-5 py-3 rounded-xl flex items-center gap-2 border border-white/30 backdrop-blur-xs transition-all font-heading"
                    >
                      <FileText className="w-4 h-4 text-amber-300" /> Télécharger mon Relevé de Notes
                    </button>
                    <button
                      onClick={() => setCurrentPage('schedule')}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase px-5 py-3 rounded-xl flex items-center gap-2 border border-amber-600 shadow-md transition-all font-heading"
                    >
                      <Calendar className="w-4 h-4" /> Horaires des Cours
                    </button>
                  </div>
                </div>

                {/* Hero Quick Card */}
                <div className="lg:col-span-5 bg-white text-slate-900 p-6 rounded-2xl border border-emerald-500/40 shadow-2xl space-y-4">
                  <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base text-emerald-950 font-heading uppercase">
                        Portail Académique Rapide
                      </h3>
                      <p className="text-xs text-slate-600">Accès direct aux services étudiants ISTA</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-300 uppercase">
                      LMD 2026
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div 
                      onClick={() => setCurrentPage('registration')}
                      className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 rounded-xl cursor-pointer flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-800 text-white flex items-center justify-center font-bold rounded-lg">1</div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-emerald-900">Demande d'Admission</p>
                          <p className="text-[11px] text-slate-500">Formulaire officiel & confirmation immédiate</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-800 group-hover:translate-x-1 transition-transform" />
                    </div>

                    <div 
                      onClick={() => setCurrentPage('transcripts')}
                      className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 rounded-xl cursor-pointer flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-800 text-white flex items-center justify-center font-bold rounded-lg">2</div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-emerald-900">Relevés de Cotes & Bulletins</p>
                          <p className="text-[11px] text-slate-500">Saisie du matricule et génération PDF</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-800 group-hover:translate-x-1 transition-transform" />
                    </div>

                    <div 
                      onClick={() => setCurrentPage('schedule')}
                      className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 rounded-xl cursor-pointer flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-800 text-white flex items-center justify-center font-bold rounded-lg">3</div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-emerald-900">Emploi du Temps Hebdomadaire</p>
                          <p className="text-[11px] text-slate-500">Planning par section, promotion et salle</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-800 group-hover:translate-x-1 transition-transform" />
                    </div>

                    <div 
                      onClick={onLoginRequest}
                      className="p-3 bg-emerald-900 text-white rounded-xl cursor-pointer flex items-center justify-between hover:bg-emerald-950 transition-colors shadow-xs"
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
            <section className="py-12 px-4 sm:px-6 bg-slate-100/70 border-b border-slate-200/80">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-4 bg-white p-6 rounded-2xl border border-emerald-900/20 text-center space-y-3 shadow-sm">
                  <div className="w-24 h-24 mx-auto bg-emerald-800 text-white flex items-center justify-center font-bold text-3xl font-heading rounded-2xl border-2 border-emerald-900 shadow-md">
                    DG
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 font-heading">Prof. Dieudonné KABANGA</h3>
                    <p className="text-xs text-emerald-800 font-bold uppercase">Directeur Général de l'ISTA Burhuza</p>
                  </div>
                  <span className="inline-block bg-amber-100 text-amber-900 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-300 uppercase">
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
            <section className="py-14 px-4 sm:px-6 bg-white border-b border-slate-200/80">
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
                  <div className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50 hover:border-emerald-700 hover:shadow-md transition-all space-y-3">
                    <div className="w-10 h-10 bg-emerald-800 text-white rounded-xl flex items-center justify-center font-bold">
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

                  <div className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50 hover:border-emerald-700 hover:shadow-md transition-all space-y-3">
                    <div className="w-10 h-10 bg-emerald-800 text-white rounded-xl flex items-center justify-center font-bold">
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

                  <div className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50 hover:border-emerald-700 hover:shadow-md transition-all space-y-3">
                    <div className="w-10 h-10 bg-emerald-800 text-white rounded-xl flex items-center justify-center font-bold">
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
                    className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase px-6 py-3 rounded-xl border border-emerald-950 inline-flex items-center gap-2 font-heading shadow-xs transition-colors"
                  >
                    Voir Toutes les 5 Sections & Programmes LMD
                  </button>
                </div>
              </div>
            </section>

            {/* Official Announcements / Communiqués Preview on Homepage */}
            <section className="py-12 px-4 sm:px-6 bg-emerald-950 text-white">
              <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/80 pb-4">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase font-heading tracking-wide">
                      <Megaphone className="w-4 h-4" /> Publication Officielle
                    </span>
                    <h2 className="text-2xl font-extrabold text-white font-heading uppercase">
                      Communiqués Officiels ISTA Burhuza
                    </h2>
                  </div>
                  <button 
                    onClick={() => setCurrentPage('announcements')}
                    className="bg-emerald-800 hover:bg-emerald-700 text-emerald-100 font-bold text-xs uppercase px-4 py-2.5 rounded-xl border border-emerald-600 flex items-center gap-2 self-start sm:self-auto font-heading transition-colors"
                  >
                    <span>Consulter tous les communiqués ({announcements.length})</span>
                    <ChevronRight className="w-4 h-4 text-amber-400" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {announcements.slice(0, 3).map(ann => (
                    <div 
                      key={ann.id} 
                      onClick={() => setSelectedAnnouncementForModal(ann)}
                      className="bg-emerald-900/90 hover:bg-emerald-900 border border-emerald-700/80 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between space-y-4 group"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                            ann.priorite === 'Urgente' 
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' 
                              : ann.priorite === 'Haute' 
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          }`}>
                            {ann.priorite} • {ann.auteurRole}
                          </span>
                          <span className="text-[11px] text-emerald-300 font-mono">{ann.date}</span>
                        </div>
                        <h3 className="font-bold text-base text-white font-heading leading-snug group-hover:text-amber-300 transition-colors">
                          {ann.titre}
                        </h3>
                        <p className="text-xs text-emerald-100/90 line-clamp-3 leading-relaxed">
                          {ann.contenu}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-emerald-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-emerald-300 font-medium">Cible: <strong className="text-white">{ann.cible}</strong></span>
                        <span className="text-amber-400 font-bold group-hover:underline inline-flex items-center gap-1">
                          Consulter <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Blog & Latest News Preview on Homepage */}
            <section className="py-14 px-4 sm:px-6 bg-slate-100 border-b border-slate-200">
              <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase font-heading tracking-wide">
                      <Newspaper className="w-4 h-4 text-emerald-700" /> Journal & Actualités Campus
                    </span>
                    <h2 className="text-2xl font-extrabold text-slate-900 font-heading uppercase">
                      Le Blog Officiel de l'ISTA Burhuza
                    </h2>
                    <p className="text-xs text-slate-600">
                      Innovations technologiques, événements académiques et vie estudiantine au Sud-Kivu.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setShowArticleSubmissionModal(true)}
                      className="bg-white hover:bg-slate-50 text-emerald-900 border border-emerald-300 font-bold text-xs uppercase px-3.5 py-2.5 rounded-xl font-heading transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <Plus className="w-4 h-4 text-emerald-700" /> Proposer un Article
                    </button>
                    <button 
                      onClick={() => setCurrentPage('blog')}
                      className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-xl font-heading transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <span>Voir Tout le Blog</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Featured Post Card + Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Featured Article */}
                  {blogPosts.find(b => b.featured) && (
                    <div 
                      onClick={() => setSelectedBlogForModal(blogPosts.find(b => b.featured)!)}
                      className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden flex flex-col justify-between group"
                    >
                      <div className="p-6 sm:p-8 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="bg-emerald-800 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full font-heading">
                            ARTICLE À LA UNE • {blogPosts.find(b => b.featured)!.category}
                          </span>
                          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-emerald-700" /> {blogPosts.find(b => b.featured)!.readTime}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 group-hover:text-emerald-800 transition-colors leading-tight">
                          {blogPosts.find(b => b.featured)!.titre}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {blogPosts.find(b => b.featured)!.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {blogPosts.find(b => b.featured)!.tags.map((tag, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-md border border-slate-200">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-emerald-900 text-white font-bold rounded-full flex items-center justify-center text-[10px]">
                            ISTA
                          </div>
                          <span className="font-bold text-slate-800">{blogPosts.find(b => b.featured)!.author}</span>
                        </div>
                        <span className="text-emerald-800 font-bold group-hover:underline flex items-center gap-1">
                          Lire l'Article <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Grid of Other Articles */}
                  <div className="lg:col-span-5 space-y-4">
                    {blogPosts.filter(b => !b.featured).slice(0, 3).map(post => (
                      <div 
                        key={post.id}
                        onClick={() => setSelectedBlogForModal(post)}
                        className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-2 group"
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold uppercase text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                            {post.category}
                          </span>
                          <span className="text-slate-500">{post.date}</span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug line-clamp-2">
                          {post.titre}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                          <span>Par <strong className="text-slate-800">{post.author}</strong></span>
                          <span className="text-emerald-800 font-bold group-hover:underline flex items-center gap-0.5">
                            Lire <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
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
                  <div className="flex items-center gap-4">
                    <img src={istaLogo} alt="Logo ISTA" referrerPolicy="no-referrer" className="h-16 w-auto object-contain" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-800 text-white font-bold text-[10px] px-2 py-0.5 rounded-full uppercase">RELEVÉ DE COTES OFFICIEL</span>
                        <span className="font-bold text-xs text-amber-700">{searchedStudent.section} • {searchedStudent.promotion}</span>
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 font-heading uppercase mt-1">
                        {searchedStudent.nom} {searchedStudent.prenom}
                      </h2>
                      <p className="text-xs text-slate-600 font-medium">
                        Matricule: <strong className="text-emerald-900">{searchedStudent.matricule}</strong> | Statut: <strong className="text-emerald-800 uppercase">{searchedStudent.statutPaiement}</strong>
                      </p>
                    </div>
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

        {/* PAGE 9: ANNOUNCEMENTS / COMMUNIQUÉS */}
        {currentPage === 'announcements' && (
          <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
            <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase font-heading mb-2">
                  <Megaphone className="w-3.5 h-3.5 text-emerald-800" /> Secrétariat Académique & Direction
                </span>
                <h1 className="text-3xl font-extrabold text-emerald-950 font-heading uppercase">
                  Communiqués Officiels & Avis au Public
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Retrouvez l'intégralité des communiqués officiels, décisions du jury et notes de la direction de l'ISTA Burhuza.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl">
                  {announcements.length} Communiqué(s) publié(s)
                </span>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-bold text-slate-500 uppercase mr-1">Priorité:</span>
                {['Tous', 'Urgente', 'Haute', 'Normale'].map((prio) => (
                  <button
                    key={prio}
                    onClick={() => setAnnouncementFilter(prio)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      announcementFilter === prio
                        ? 'bg-emerald-800 text-white border-emerald-950 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {prio}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher dans les communiqués..."
                  value={announcementSearch}
                  onChange={(e) => setAnnouncementSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Announcements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements
                .filter(a => announcementFilter === 'Tous' || a.priorite === announcementFilter)
                .filter(a => 
                  a.titre.toLowerCase().includes(announcementSearch.toLowerCase()) || 
                  a.contenu.toLowerCase().includes(announcementSearch.toLowerCase()) ||
                  a.cible.toLowerCase().includes(announcementSearch.toLowerCase())
                )
                .map((ann) => (
                  <div
                    key={ann.id}
                    onClick={() => setSelectedAnnouncementForModal(ann)}
                    className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-700 p-6 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                          ann.priorite === 'Urgente' 
                            ? 'bg-rose-100 text-rose-800 border-rose-300' 
                            : ann.priorite === 'Haute' 
                            ? 'bg-amber-100 text-amber-900 border-amber-300' 
                            : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        }`}>
                          {ann.priorite} • {ann.auteurRole}
                        </span>
                        <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-emerald-700" /> {ann.date}
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-slate-900 font-heading group-hover:text-emerald-800 transition-colors leading-snug">
                        {ann.titre}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-4 leading-relaxed font-normal">
                        {ann.contenu}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Public cible: <strong className="text-emerald-900">{ann.cible}</strong></span>
                      <span className="text-emerald-800 font-bold group-hover:underline inline-flex items-center gap-1">
                        Consulter <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* PAGE 10: BLOG & ACTUALITÉS */}
        {currentPage === 'blog' && (
          <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
            {/* Header */}
            <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase font-heading mb-2">
                  <Newspaper className="w-3.5 h-3.5 text-emerald-800" /> Journal & Actualités Campus ISTA
                </span>
                <h1 className="text-3xl font-extrabold text-emerald-950 font-heading uppercase">
                  Blog Officiel de l'ISTA Burhuza
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Découvrez les travaux de recherche, les projets technologiques des étudiants, les reportages et les nouvelles de la communauté.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowArticleSubmissionModal(true)}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase px-5 py-3 rounded-xl border border-emerald-950 flex items-center gap-2 shadow-sm font-heading transition-all"
                >
                  <Plus className="w-4 h-4 text-amber-300" /> Proposer un Article
                </button>
              </div>
            </div>

            {/* Filter & Search Controls */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Category Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
                {['Tous', 'Recherche & Tech', 'Vie Estudiantine', 'Projets Académiques', 'Partenariats'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setBlogCategoryFilter(cat)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                      blogCategoryFilter === cat
                        ? 'bg-emerald-800 text-white border-emerald-950 shadow-xs font-heading'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full lg:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher par mot-clé, auteur..."
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Main Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts
                .filter(b => blogCategoryFilter === 'Tous' || b.category === blogCategoryFilter)
                .filter(b => 
                  b.titre.toLowerCase().includes(blogSearch.toLowerCase()) || 
                  b.excerpt.toLowerCase().includes(blogSearch.toLowerCase()) ||
                  b.author.toLowerCase().includes(blogSearch.toLowerCase()) ||
                  b.tags.some(t => t.toLowerCase().includes(blogSearch.toLowerCase()))
                )
                .map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
                  >
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold uppercase bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-slate-500 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3 text-emerald-700" /> {post.date}
                        </span>
                      </div>

                      <h3 
                        onClick={() => setSelectedBlogForModal(post)}
                        className="font-bold text-lg text-slate-900 font-heading leading-snug group-hover:text-emerald-800 transition-colors cursor-pointer"
                      >
                        {post.titre}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {post.tags.map((tag, idx) => (
                          <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-emerald-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          {post.author.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-700 text-[11px] truncate max-w-[100px]">{post.author}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleLikeBlogPost(post.id); }}
                          className="flex items-center gap-1 text-slate-500 hover:text-rose-600 font-bold text-[11px] transition-colors"
                        >
                          <ThumbsUp className="w-3.5 h-3.5 text-rose-500" /> {post.likes}
                        </button>
                        <button 
                          onClick={() => setSelectedBlogForModal(post)}
                          className="flex items-center gap-1 text-slate-500 hover:text-emerald-800 font-bold text-[11px] transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-700" /> {post.comments.length}
                        </button>
                        <button 
                          onClick={() => setSelectedBlogForModal(post)}
                          className="text-emerald-800 font-bold text-[11px] hover:underline uppercase font-heading ml-1"
                        >
                          Lire
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* PAGE 11: CONTACT */}
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

      {/* MODAL 1: ANNOUNCEMENT DETAIL READER */}
      {selectedAnnouncementForModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-2xl border-2 border-emerald-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-emerald-950 text-white p-5 flex items-center justify-between border-b border-emerald-800">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base font-heading uppercase text-amber-400">
                  Communiqué Officiel - ISTA Burhuza
                </h3>
              </div>
              <button 
                onClick={() => setSelectedAnnouncementForModal(null)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-emerald-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <span className="bg-emerald-100 text-emerald-900 font-bold uppercase px-3 py-1 rounded-full border border-emerald-300">
                  Émetteur: {selectedAnnouncementForModal.auteurRole}
                </span>
                <span className="text-slate-500 font-mono">Date de publication: {selectedAnnouncementForModal.date}</span>
              </div>

              <h2 className="text-xl font-bold font-heading text-slate-900 leading-snug">
                {selectedAnnouncementForModal.titre}
              </h2>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl font-medium text-amber-950">
                Public Cible Concerné: <strong>{selectedAnnouncementForModal.cible}</strong>
              </div>

              <div className="text-slate-700 space-y-3 leading-relaxed text-sm whitespace-pre-line font-normal">
                {selectedAnnouncementForModal.contenu}
              </div>
            </div>

            <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Document authentifié par le Secrétariat Général Académique</span>
              <button
                onClick={() => setSelectedAnnouncementForModal(null)}
                className="bg-emerald-800 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-xl border border-emerald-950 font-heading"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: BLOG ARTICLE READER & COMMENTS */}
      {selectedBlogForModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-3xl w-full rounded-2xl border-2 border-emerald-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-emerald-950 text-white p-5 flex items-center justify-between border-b border-emerald-800 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-xs font-heading uppercase text-amber-400">
                  Article de Blog • {selectedBlogForModal.category}
                </span>
              </div>
              <button 
                onClick={() => setSelectedBlogForModal(null)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-emerald-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
              <div className="space-y-3 border-b border-slate-200 pb-4">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Par <strong className="text-slate-900">{selectedBlogForModal.author}</strong> ({selectedBlogForModal.authorRole})</span>
                  <span>{selectedBlogForModal.date} • {selectedBlogForModal.readTime}</span>
                </div>

                <h1 className="text-2xl font-bold font-heading text-slate-900 leading-snug">
                  {selectedBlogForModal.titre}
                </h1>

                <div className="flex flex-wrap gap-1.5">
                  {selectedBlogForModal.tags.map((tag, i) => (
                    <span key={i} className="bg-emerald-50 text-emerald-900 font-bold px-2.5 py-0.5 rounded-md border border-emerald-200 text-[10px]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full Content */}
              <div className="text-slate-800 text-sm leading-relaxed whitespace-pre-line space-y-4">
                {selectedBlogForModal.fullText}
              </div>

              {/* Like bar */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => handleLikeBlogPost(selectedBlogForModal.id)}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-4 py-2 rounded-xl border border-rose-200 flex items-center gap-2 text-xs transition-colors"
                >
                  <ThumbsUp className="w-4 h-4 fill-rose-500" />
                  <span>J'aime ({selectedBlogForModal.likes})</span>
                </button>
                <span className="text-slate-500 font-medium">{selectedBlogForModal.comments.length} commentaire(s)</span>
              </div>

              {/* Comments Section */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-bold text-sm text-emerald-950 font-heading uppercase flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-700" /> Commentaires & Réactions
                </h3>

                {/* Add Comment Box */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddComment(selectedBlogForModal.id);
                  }}
                  className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Votre nom complet"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      required
                      className="p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Écrivez votre réaction ou votre question académique..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    required
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium"
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase px-4 py-2 rounded-lg border border-emerald-950 font-heading"
                  >
                    Publier le Commentaire
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-3">
                  {selectedBlogForModal.comments.length === 0 ? (
                    <p className="text-slate-500 text-xs italic">Aucun commentaire pour l'instant. Soyez le premier à réagir !</p>
                  ) : (
                    selectedBlogForModal.comments.map((comm) => (
                      <div key={comm.id} className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <strong className="text-emerald-950 font-bold">{comm.author}</strong>
                          <span className="text-slate-400">{comm.date}</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">{comm.text}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: SUBMIT NEW ARTICLE PROPOSAL */}
      {showArticleSubmissionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded-2xl border-2 border-emerald-800 shadow-2xl overflow-hidden">
            <div className="bg-emerald-950 text-white p-5 flex items-center justify-between border-b border-emerald-800">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base font-heading uppercase text-amber-400">
                  Proposer un Article de Blog
                </h3>
              </div>
              <button 
                onClick={() => setShowArticleSubmissionModal(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-emerald-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddBlogArticle} className="p-6 space-y-3.5 text-xs">
              <p className="text-slate-600">
                Votre proposition sera relue par le comité éditorial de l'ISTA Burhuza avant publication sur le portail public.
              </p>

              <div>
                <label className="block font-bold text-slate-800 uppercase mb-1">Titre de l'Article</label>
                <input
                  type="text"
                  required
                  value={newBlogData.titre}
                  onChange={(e) => setNewBlogData({ ...newBlogData, titre: e.target.value })}
                  placeholder="Ex: Projet de centrale solaire hybride par L3 Électrique"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 uppercase mb-1">Auteur</label>
                  <input
                    type="text"
                    required
                    value={newBlogData.author}
                    onChange={(e) => setNewBlogData({ ...newBlogData, author: e.target.value })}
                    placeholder="Votre nom"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 uppercase mb-1">Catégorie</label>
                  <select
                    value={newBlogData.category}
                    onChange={(e) => setNewBlogData({ ...newBlogData, category: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
                  >
                    <option value="Recherche & Tech">Recherche & Tech</option>
                    <option value="Vie Estudiantine">Vie Estudiantine</option>
                    <option value="Projets Académiques">Projets Académiques</option>
                    <option value="Partenariats">Partenariats</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 uppercase mb-1">Résumé Court (Accroche)</label>
                <input
                  type="text"
                  required
                  value={newBlogData.excerpt}
                  onChange={(e) => setNewBlogData({ ...newBlogData, excerpt: e.target.value })}
                  placeholder="2-3 phrases résumant le sujet..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 uppercase mb-1">Contenu Intégral de l'Article</label>
                <textarea
                  rows={5}
                  required
                  value={newBlogData.fullText}
                  onChange={(e) => setNewBlogData({ ...newBlogData, fullText: e.target.value })}
                  placeholder="Développez votre article ici..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-800 uppercase mb-1">Mots-clés (séparés par des virgules)</label>
                <input
                  type="text"
                  value={newBlogData.tags}
                  onChange={(e) => setNewBlogData({ ...newBlogData, tags: e.target.value })}
                  placeholder="ISTA, Solaire, Burhuza, Walungu"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowArticleSubmissionModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold uppercase rounded-xl border border-emerald-950 font-heading"
                >
                  Soumettre l'Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer without border */}
      <footer className="bg-emerald-950 text-white text-xs py-10 px-4 sm:px-6 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src={istaLogo} alt="Logo ISTA" referrerPolicy="no-referrer" className="h-12 w-auto object-contain" />
              <strong className="text-base font-bold font-heading uppercase text-amber-400 tracking-wide">ISTA BURHUZA</strong>
            </div>
            <p className="text-[11px] text-slate-200 leading-relaxed font-normal">
              Institut Supérieur de Techniques Appliquées. Établissement public d'enseignement supérieur technique au Sud-Kivu (RDC).
            </p>
          </div>

          <div>
            <h4 className="font-bold text-amber-400 font-heading uppercase mb-3 text-xs">Accès Rapide</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-200">
              <li><button onClick={() => setCurrentPage('registration')} className="hover:text-amber-300 transition-colors">Inscription en Ligne</button></li>
              <li><button onClick={() => setCurrentPage('schedule')} className="hover:text-amber-300 transition-colors">Horaires des Cours</button></li>
              <li><button onClick={() => setCurrentPage('transcripts')} className="hover:text-amber-300 transition-colors">Relevés de Notes</button></li>
              <li><button onClick={() => setCurrentPage('programs')} className="hover:text-amber-300 transition-colors">Sections LMD</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-amber-400 font-heading uppercase mb-3 text-xs">Sections Agréées</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-200">
              <li>Informatique Appliquée</li>
              <li>Génie Électrique</li>
              <li>Génie Mécanique</li>
              <li>Génie Civil (BTP)</li>
              <li>Agronomie Appliquée</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-amber-400 font-heading uppercase mb-3 text-xs">Administration (SIGU)</h4>
            <p className="text-[11px] text-slate-200 mb-3 leading-relaxed">Accès réservé aux enseignants, chefs de section, président de jury et direction.</p>
            {isLoggedIn ? (
              <button
                onClick={onGoToDashboard}
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase px-4 py-2 rounded-lg flex items-center gap-2 border border-emerald-500 font-heading transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" /> Accéder au SIGU
              </button>
            ) : (
              <button
                onClick={onLoginRequest}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase px-4 py-2 rounded-lg flex items-center gap-2 border border-amber-600 font-heading transition-colors"
              >
                <LogIn className="w-4 h-4" /> Se Connecter au SIGU
              </button>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-emerald-900/60 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-300 gap-2">
          <span>© {new Date().getFullYear()} ISTA BURHUZA • Ministère de l'ESU, République Démocratique du Congo. Tous droits réservés.</span>
          <span className="bg-emerald-900/80 px-2.5 py-0.5 rounded-full border border-emerald-800 text-emerald-200 font-mono">Portail Universitaire SIGU v1.0</span>
        </div>
      </footer>
    </div>
  );
};
