export type Role = 
  | 'admin' 
  | 'chef_section' 
  | 'president_jury' 
  | 'secretaire_jury' 
  | 'enseignant' 
  | 'etudiant'
  | 'financier';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  department?: string;
  phone?: string;
  matricule?: string;
}

export type Section = 
  | 'Génie Électrique'
  | 'Génie Mécanique'
  | 'Informatique Appliquée'
  | 'Génie Civil'
  | 'Maintenance Industrielle';

export type Level = 'L1' | 'L2' | 'L3' | 'M1' | 'M2';

export interface Student {
  id: string;
  matricule: string;
  nom: string;
  postnom: string;
  prenom: string;
  genre: 'M' | 'F';
  section: Section;
  niveau: Level;
  anneeAcademique: string;
  statut: 'Régulier' | 'Répétition' | 'Suspendu';
  email: string;
  telephone: string;
  photoUrl?: string;
  dateNaissance: string;
  lieuNaissance: string;
  fraisTotaux: number;
  fraisPayes: number;
}

export interface Course {
  id: string;
  code: string;
  titre: string;
  ue: string; // Unité d'Enseignement
  semestre: 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6';
  credits: number;
  heuresCM: number;
  heuresTP: number;
  enseignantId: string;
  enseignantNom: string;
  section: Section;
  niveau: Level;
  syllabusUrl?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  noteIntra: number; // /20 ou /10
  noteExamen: number; // /20 ou /10
  noteFinale: number; // Sur 20
  session: 'Première Session' | 'Deuxième Session';
  valide: boolean;
  statutControle: 'Saisi' | 'Vérifié Chef Section' | 'Verrouillé Jury';
  remarque?: string;
}

export interface ScheduleItem {
  id: string;
  courseId: string;
  courseTitre: string;
  enseignantNom: string;
  salle: string;
  jour: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi';
  heureDebut: string;
  heureFin: string;
  type: 'CM' | 'TD' | 'TP';
  section: Section;
  niveau: Level;
}

export interface Payment {
  id: string;
  reference: string;
  studentId: string;
  studentName: string;
  studentMatricule: string;
  studentSection: Section;
  studentNiveau: Level;
  montantUSD: number;
  motif: 'Acompte/Minerval' | 'Tranche 1' | 'Tranche 2' | 'Tranche 3' | 'Frais Labo/Pratique' | 'Inscriptions';
  modePaiement: 'Banque (Rawbank)' | 'Banque (Equity BCDC)' | 'Airtel Money' | 'M-Pesa' | 'Caisse Centrale';
  datePaiement: string;
  numBordereau: string;
  statut: 'Validé' | 'En attente' | 'Rejeté';
  agentCaisse: string;
}

export interface DeliberationSession {
  id: string;
  code: string;
  anneeAcademique: string;
  sessionType: 'Première Session' | 'Deuxième Session';
  section: Section;
  niveau: Level;
  presidentJury: string;
  secretaireJury: string;
  chefSection: string;
  dateSession: string;
  statut: 'En préparation' | 'Contrôle Section' | 'Session en cours' | 'Clôturée & Validée';
  pvUrl?: string;
  etudiantsEvaluated: number;
  tauxReussite?: number;
}

export interface StaffMember {
  id: string;
  matricule: string;
  nom: string;
  prenom: string;
  grade: 'Professeur Ordinaire' | 'Professeur' | 'Chef de Travaux' | 'Assistant' | 'Agent Administratif';
  fonction: string;
  typeContrat: 'Permanent' | 'Vacataire' | 'Contractuel';
  departement: Section | 'Administration' | 'Finance';
  email: string;
  telephone: string;
  chargeHoraireAttribuee: number; // heures
  tauxHoraireUSD: number;
  prestationMoisUSD: number;
  statut: 'Actif' | 'En Congé' | 'Inactif';
}

export interface DocumentItem {
  id: string;
  titre: string;
  category: 'Syllabus' | 'PV Délibération' | 'Relevé de Cotes' | 'Communiqué' | 'Rapport Financier' | 'Règlement';
  description: string;
  datePublication: string;
  auteur: string;
  anneeAcademique: string;
  section?: Section;
  fileSize: string;
  downloadUrl?: string;
}

export interface Announcement {
  id: string;
  titre: string;
  contenu: string;
  auteur: string;
  auteurRole: string;
  date: string;
  priorite: 'Haute' | 'Normale' | 'Urgente';
  cible: 'Tous' | 'Étudiants' | 'Enseignants' | 'Administration';
  epingle?: boolean;
}

export interface InternalMessage {
  id: string;
  expediteurId: string;
  expediteurNom: string;
  destinataireId: string;
  destinataireNom: string;
  sujet: string;
  message: string;
  date: string;
  lu: boolean;
}

export interface AcademicEvent {
  id: string;
  titre: string;
  type: 'Examen' | 'Soutenance TFC/Mémoire' | 'Délibération' | 'Conférence' | 'Cérémonie' | 'Congé Académique';
  dateDebut: string;
  dateFin: string;
  lieu: string;
  organisateur: string;
  description: string;
  concerne: string;
}

export interface BlogComment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface BlogPost {
  id: string;
  titre: string;
  category: 'Recherche & Tech' | 'Vie Estudiantine' | 'Projets Académiques' | 'Partenariats' | 'Vie du Campus' | 'Événements & Soutenances';
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  excerpt: string;
  fullText: string;
  tags: string[];
  featured?: boolean;
  likes: number;
  comments: BlogComment[];
  statut: 'Publié' | 'En attente' | 'Rejeté';
  submittedByEmail?: string;
  notesModeration?: string;
}
