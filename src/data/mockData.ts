import { 
  User, 
  Student, 
  Course, 
  Grade, 
  ScheduleItem, 
  Payment, 
  DeliberationSession, 
  StaffMember, 
  DocumentItem, 
  Announcement, 
  InternalMessage, 
  AcademicEvent 
} from '../types';

export const CURRENT_ACADEMIC_YEAR = '2025-2026';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin',
    name: 'Prof. Dieudonné KABANGA',
    email: 'direction@ista-bukavu.cd',
    role: 'admin',
    department: 'Direction Générale',
    phone: '+243 993 644 243',
    matricule: 'ADM-001'
  },
  {
    id: 'usr-chef-sec',
    name: 'CT Ir. Justin BAHATI',
    email: 'chef.info@ista-bukavu.cd',
    role: 'chef_section',
    department: 'Informatique Appliquée',
    phone: '+243 853 985 762',
    matricule: 'SEC-002'
  },
  {
    id: 'usr-pres-jury',
    name: 'Prof. Dr. Marc MUKAMBA',
    email: 'jury.president@ista-bukavu.cd',
    role: 'president_jury',
    department: 'Génie Électrique',
    phone: '+243 998 123 456',
    matricule: 'JUR-001'
  },
  {
    id: 'usr-sec-jury',
    name: 'Ass. Alain CISHUGI',
    email: 'jury.secretaire@ista-bukavu.cd',
    role: 'secretaire_jury',
    department: 'Génie Mécanique',
    phone: '+243 812 345 678',
    matricule: 'JUR-002'
  },
  {
    id: 'usr-prof-1',
    name: 'CT Ir. Pascal BIRINDWA',
    email: 'pascal.birindwa@ista-bukavu.cd',
    role: 'enseignant',
    department: 'Informatique Appliquée',
    phone: '+243 971 112 233',
    matricule: 'ENS-104'
  },
  {
    id: 'usr-financier',
    name: 'Mme Clarisse MUKESHIMANA',
    email: 'finance@ista-bukavu.cd',
    role: 'financier',
    department: 'Service Financier & Caisse',
    phone: '+243 898 765 432',
    matricule: 'FIN-001'
  },
  {
    id: 'usr-etudiant-1',
    name: 'MUGISHO CHIRIMWAMI',
    email: 'mugisho.2025@etudiant.ista-bukavu.cd',
    role: 'etudiant',
    department: 'Informatique Appliquée',
    phone: '+243 994 556 778',
    matricule: '2025-INF-042'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-1',
    matricule: '2025-INF-042',
    nom: 'MUGISHO',
    postnom: 'CHIRIMWAMI',
    prenom: 'Gloire',
    genre: 'M',
    section: 'Informatique Appliquée',
    niveau: 'L3',
    anneeAcademique: CURRENT_ACADEMIC_YEAR,
    statut: 'Régulier',
    email: 'mugisho.gloire@etudiant.ista-bukavu.cd',
    telephone: '+243 994 556 778',
    dateNaissance: '2002-05-14',
    lieuNaissance: 'Bukavu',
    fraisTotaux: 450,
    fraisPayes: 450
  },
  {
    id: 'std-2',
    matricule: '2025-INF-018',
    nom: 'NINDA',
    postnom: 'CIKURU',
    prenom: 'Espérance',
    genre: 'F',
    section: 'Informatique Appliquée',
    niveau: 'L3',
    anneeAcademique: CURRENT_ACADEMIC_YEAR,
    statut: 'Régulier',
    email: 'esperance.ninda@etudiant.ista-bukavu.cd',
    telephone: '+243 854 112 334',
    dateNaissance: '2003-08-21',
    lieuNaissance: 'Walungu / Burhuza',
    fraisTotaux: 450,
    fraisPayes: 300
  },
  {
    id: 'std-3',
    matricule: '2025-ELE-005',
    nom: 'BARAKA',
    postnom: 'MWAMINI',
    prenom: 'Emanuel',
    genre: 'M',
    section: 'Génie Électrique',
    niveau: 'L2',
    anneeAcademique: CURRENT_ACADEMIC_YEAR,
    statut: 'Régulier',
    email: 'emanuel.baraka@etudiant.ista-bukavu.cd',
    telephone: '+243 971 889 001',
    dateNaissance: '2003-01-10',
    lieuNaissance: 'Uvira',
    fraisTotaux: 450,
    fraisPayes: 150
  },
  {
    id: 'std-4',
    matricule: '2025-MEC-012',
    nom: 'CISHUGI',
    postnom: 'BUHENDWA',
    prenom: 'Patrick',
    genre: 'M',
    section: 'Génie Mécanique',
    niveau: 'L3',
    anneeAcademique: CURRENT_ACADEMIC_YEAR,
    statut: 'Régulier',
    email: 'patrick.cishugi@etudiant.ista-bukavu.cd',
    telephone: '+243 812 990 011',
    dateNaissance: '2001-11-30',
    lieuNaissance: 'Kabare',
    fraisTotaux: 450,
    fraisPayes: 450
  },
  {
    id: 'std-5',
    matricule: '2025-CIV-008',
    nom: 'ZAWADI',
    postnom: 'NABINTU',
    prenom: 'Aline',
    genre: 'F',
    section: 'Génie Civil',
    niveau: 'L1',
    anneeAcademique: CURRENT_ACADEMIC_YEAR,
    statut: 'Régulier',
    email: 'aline.zawadi@etudiant.ista-bukavu.cd',
    telephone: '+243 990 223 344',
    dateNaissance: '2004-03-15',
    lieuNaissance: 'Bukavu',
    fraisTotaux: 450,
    fraisPayes: 150
  },
  {
    id: 'std-6',
    matricule: '2025-MNT-003',
    nom: 'KALEMBA',
    postnom: 'KASHERE',
    prenom: 'Innocent',
    genre: 'M',
    section: 'Maintenance Industrielle',
    niveau: 'M1',
    anneeAcademique: CURRENT_ACADEMIC_YEAR,
    statut: 'Régulier',
    email: 'innocent.kalemba@etudiant.ista-bukavu.cd',
    telephone: '+243 851 334 556',
    dateNaissance: '2000-09-02',
    lieuNaissance: 'Goma',
    fraisTotaux: 500,
    fraisPayes: 250
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'crs-1',
    code: 'INF301',
    titre: 'Développement Web & Applications Cloud',
    ue: 'UE301: Génie Logiciel & Réseaux',
    semestre: 'S5',
    credits: 6,
    heuresCM: 30,
    heuresTP: 30,
    enseignantId: 'usr-prof-1',
    enseignantNom: 'CT Ir. Pascal BIRINDWA',
    section: 'Informatique Appliquée',
    niveau: 'L3'
  },
  {
    id: 'crs-2',
    code: 'INF302',
    titre: 'Bases de Données Relationnelles & SQL',
    ue: 'UE301: Génie Logiciel & Réseaux',
    semestre: 'S5',
    credits: 5,
    heuresCM: 25,
    heuresTP: 25,
    enseignantId: 'usr-chef-sec',
    enseignantNom: 'CT Ir. Justin BAHATI',
    section: 'Informatique Appliquée',
    niveau: 'L3'
  },
  {
    id: 'crs-3',
    code: 'ELE201',
    titre: 'Électronique de Puissance & Convertisseurs',
    ue: 'UE201: Systèmes Électriques',
    semestre: 'S3',
    credits: 6,
    heuresCM: 36,
    heuresTP: 24,
    enseignantId: 'usr-pres-jury',
    enseignantNom: 'Prof. Dr. Marc MUKAMBA',
    section: 'Génie Électrique',
    niveau: 'L2'
  },
  {
    id: 'crs-4',
    code: 'MEC301',
    titre: 'Thermodynamique Appliquée & Moteurs',
    ue: 'UE302: Énergétique & Fluides',
    semestre: 'S5',
    credits: 6,
    heuresCM: 30,
    heuresTP: 20,
    enseignantId: 'usr-sec-jury',
    enseignantNom: 'Ass. Alain CISHUGI',
    section: 'Génie Mécanique',
    niveau: 'L3'
  },
  {
    id: 'crs-5',
    code: 'CIV101',
    titre: 'Résistance des Matériaux (RDM)',
    ue: 'UE101: Structure & Matériaux',
    semestre: 'S1',
    credits: 6,
    heuresCM: 40,
    heuresTP: 20,
    enseignantId: 'usr-sec-jury',
    enseignantNom: 'Ass. Alain CISHUGI',
    section: 'Génie Civil',
    niveau: 'L1'
  },
  {
    id: 'crs-6',
    code: 'INF303',
    titre: 'Sécurité Informatique & Cryptographie',
    ue: 'UE302: Systèmes & Réseaux',
    semestre: 'S5',
    credits: 4,
    heuresCM: 20,
    heuresTP: 20,
    enseignantId: 'usr-prof-1',
    enseignantNom: 'CT Ir. Pascal BIRINDWA',
    section: 'Informatique Appliquée',
    niveau: 'L3'
  }
];

export const INITIAL_GRADES: Grade[] = [
  {
    id: 'grd-1',
    studentId: 'std-1',
    courseId: 'crs-1',
    noteIntra: 8.5, // sur 10
    noteExamen: 8.0, // sur 10
    noteFinale: 16.5, // sur 20
    session: 'Première Session',
    valide: true,
    statutControle: 'Verrouillé Jury',
    remarque: 'Très Bien - Crédits Capitalisés'
  },
  {
    id: 'grd-2',
    studentId: 'std-1',
    courseId: 'crs-2',
    noteIntra: 7.5,
    noteExamen: 7.5,
    noteFinale: 15.0,
    session: 'Première Session',
    valide: true,
    statutControle: 'Verrouillé Jury',
    remarque: 'Bien'
  },
  {
    id: 'grd-3',
    studentId: 'std-1',
    courseId: 'crs-6',
    noteIntra: 7.0,
    noteExamen: 7.0,
    noteFinale: 14.0,
    session: 'Première Session',
    valide: true,
    statutControle: 'Vérifié Chef Section',
    remarque: 'Satisfaisant'
  },
  {
    id: 'grd-4',
    studentId: 'std-2',
    courseId: 'crs-1',
    noteIntra: 6.5,
    noteExamen: 7.0,
    noteFinale: 13.5,
    session: 'Première Session',
    valide: true,
    statutControle: 'Vérifié Chef Section'
  },
  {
    id: 'grd-5',
    studentId: 'std-2',
    courseId: 'crs-2',
    noteIntra: 5.0,
    noteExamen: 4.5,
    noteFinale: 9.5,
    session: 'Première Session',
    valide: false,
    statutControle: 'Saisi',
    remarque: 'À reprendre en 2ème session'
  },
  {
    id: 'grd-6',
    studentId: 'std-3',
    courseId: 'crs-3',
    noteIntra: 7.0,
    noteExamen: 6.5,
    noteFinale: 13.5,
    session: 'Première Session',
    valide: true,
    statutControle: 'Vérifié Chef Section'
  }
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  {
    id: 'sch-1',
    courseId: 'crs-1',
    courseTitre: 'Développement Web & Cloud',
    enseignantNom: 'CT Ir. Pascal BIRINDWA',
    salle: 'Labo Informatique 1 - Burhuza',
    jour: 'Lundi',
    heureDebut: '08:00',
    heureFin: '11:00',
    type: 'TP',
    section: 'Informatique Appliquée',
    niveau: 'L3'
  },
  {
    id: 'sch-2',
    courseId: 'crs-2',
    courseTitre: 'Bases de Données & SQL',
    enseignantNom: 'CT Ir. Justin BAHATI',
    salle: 'Salle 102 - Site Burhuza',
    jour: 'Mardi',
    heureDebut: '11:15',
    heureFin: '14:15',
    type: 'CM',
    section: 'Informatique Appliquée',
    niveau: 'L3'
  },
  {
    id: 'sch-3',
    courseId: 'crs-3',
    courseTitre: 'Électronique de Puissance',
    enseignantNom: 'Prof. Dr. Marc MUKAMBA',
    salle: 'Atelier Électrique - Burhuza',
    jour: 'Mercredi',
    heureDebut: '08:00',
    heureFin: '11:00',
    type: 'CM',
    section: 'Génie Électrique',
    niveau: 'L2'
  },
  {
    id: 'sch-4',
    courseId: 'crs-4',
    courseTitre: 'Thermodynamique Appliquée',
    enseignantNom: 'Ass. Alain CISHUGI',
    salle: 'Amphi Principal ISTA',
    jour: 'Jeudi',
    heureDebut: '11:15',
    heureFin: '14:15',
    type: 'CM',
    section: 'Génie Mécanique',
    niveau: 'L3'
  },
  {
    id: 'sch-5',
    courseId: 'crs-5',
    courseTitre: 'Résistance des Matériaux (RDM)',
    enseignantNom: 'Ass. Alain CISHUGI',
    salle: 'Amphi Principal ISTA',
    jour: 'Vendredi',
    heureDebut: '08:00',
    heureFin: '11:00',
    type: 'TD',
    section: 'Génie Civil',
    niveau: 'L1'
  }
];

export const INITIAL_PAYMENTS: Payment[] = [
  {
    id: 'pay-101',
    reference: 'REC-2025-0089',
    studentId: 'std-1',
    studentName: 'MUGISHO CHIRIMWAMI Gloire',
    studentMatricule: '2025-INF-042',
    studentSection: 'Informatique Appliquée',
    studentNiveau: 'L3',
    montantUSD: 150,
    motif: 'Inscriptions',
    modePaiement: 'Banque (Rawbank)',
    datePaiement: '2025-10-05',
    numBordereau: 'RAW-9923841',
    statut: 'Validé',
    agentCaisse: 'Mme Clarisse MUKESHIMANA'
  },
  {
    id: 'pay-102',
    reference: 'REC-2025-0145',
    studentId: 'std-1',
    studentName: 'MUGISHO CHIRIMWAMI Gloire',
    studentMatricule: '2025-INF-042',
    studentSection: 'Informatique Appliquée',
    studentNiveau: 'L3',
    montantUSD: 150,
    motif: 'Tranche 1',
    modePaiement: 'Airtel Money',
    datePaiement: '2025-12-10',
    numBordereau: 'AIR-5541092',
    statut: 'Validé',
    agentCaisse: 'Mme Clarisse MUKESHIMANA'
  },
  {
    id: 'pay-103',
    reference: 'REC-2026-0021',
    studentId: 'std-1',
    studentName: 'MUGISHO CHIRIMWAMI Gloire',
    studentMatricule: '2025-INF-042',
    studentSection: 'Informatique Appliquée',
    studentNiveau: 'L3',
    montantUSD: 150,
    motif: 'Tranche 2',
    modePaiement: 'Banque (Equity BCDC)',
    datePaiement: '2026-03-02',
    numBordereau: 'EQU-8871203',
    statut: 'Validé',
    agentCaisse: 'Mme Clarisse MUKESHIMANA'
  },
  {
    id: 'pay-104',
    reference: 'REC-2025-0201',
    studentId: 'std-2',
    studentName: 'NINDA CIKURU Espérance',
    studentMatricule: '2025-INF-018',
    studentSection: 'Informatique Appliquée',
    studentNiveau: 'L3',
    montantUSD: 300,
    motif: 'Tranche 1',
    modePaiement: 'M-Pesa',
    datePaiement: '2025-11-15',
    numBordereau: 'MPS-1102938',
    statut: 'Validé',
    agentCaisse: 'Mme Clarisse MUKESHIMANA'
  },
  {
    id: 'pay-105',
    reference: 'REC-2025-0044',
    studentId: 'std-4',
    studentName: 'CISHUGI BUHENDWA Patrick',
    studentMatricule: '2025-MEC-012',
    studentSection: 'Génie Mécanique',
    studentNiveau: 'L3',
    montantUSD: 450,
    motif: 'Tranche 2',
    modePaiement: 'Banque (Rawbank)',
    datePaiement: '2025-10-12',
    numBordereau: 'RAW-7740192',
    statut: 'Validé',
    agentCaisse: 'Mme Clarisse MUKESHIMANA'
  }
];

export const INITIAL_DELIBERATIONS: DeliberationSession[] = [
  {
    id: 'del-1',
    code: 'DELIB-INF-L3-S1',
    anneeAcademique: CURRENT_ACADEMIC_YEAR,
    sessionType: 'Première Session',
    section: 'Informatique Appliquée',
    niveau: 'L3',
    presidentJury: 'Prof. Dr. Marc MUKAMBA',
    secretaireJury: 'Ass. Alain CISHUGI',
    chefSection: 'CT Ir. Justin BAHATI',
    dateSession: '2026-02-18',
    statut: 'Clôturée & Validée',
    etudiantsEvaluated: 28,
    tauxReussite: 82.1,
    pvUrl: '#pv-delib-inf-l3'
  },
  {
    id: 'del-2',
    code: 'DELIB-ELE-L2-S1',
    anneeAcademique: CURRENT_ACADEMIC_YEAR,
    sessionType: 'Première Session',
    section: 'Génie Électrique',
    niveau: 'L2',
    presidentJury: 'Prof. Dr. Marc MUKAMBA',
    secretaireJury: 'Ass. Alain CISHUGI',
    chefSection: 'Prof. Dr. Marc MUKAMBA',
    dateSession: '2026-02-20',
    statut: 'Session en cours',
    etudiantsEvaluated: 19,
    tauxReussite: 73.6
  },
  {
    id: 'del-3',
    code: 'DELIB-CIV-L1-S1',
    anneeAcademique: CURRENT_ACADEMIC_YEAR,
    sessionType: 'Première Session',
    section: 'Génie Civil',
    niveau: 'L1',
    presidentJury: 'Prof. Dieudonné KABANGA',
    secretaireJury: 'Ass. Alain CISHUGI',
    chefSection: 'Ass. Alain CISHUGI',
    dateSession: '2026-03-01',
    statut: 'Contrôle Section',
    etudiantsEvaluated: 34
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'stf-1',
    matricule: 'ENS-101',
    nom: 'KABANGA',
    prenom: 'Dieudonné',
    grade: 'Professeur Ordinaire',
    fonction: 'Directeur Général',
    typeContrat: 'Permanent',
    departement: 'Administration',
    email: 'direction@ista-bukavu.cd',
    telephone: '+243 993 644 243',
    chargeHoraireAttribuee: 120,
    tauxHoraireUSD: 25,
    prestationMoisUSD: 750,
    statut: 'Actif'
  },
  {
    id: 'stf-2',
    matricule: 'ENS-102',
    nom: 'BAHATI',
    prenom: 'Justin',
    grade: 'Chef de Travaux',
    fonction: 'Chef de Section Informatique',
    typeContrat: 'Permanent',
    departement: 'Informatique Appliquée',
    email: 'chef.info@ista-bukavu.cd',
    telephone: '+243 853 985 762',
    chargeHoraireAttribuee: 180,
    tauxHoraireUSD: 18,
    prestationMoisUSD: 810,
    statut: 'Actif'
  },
  {
    id: 'stf-3',
    matricule: 'ENS-103',
    nom: 'MUKAMBA',
    prenom: 'Marc',
    grade: 'Professeur',
    fonction: 'Président du Jury & Professeur',
    typeContrat: 'Permanent',
    departement: 'Génie Électrique',
    email: 'marc.mukamba@ista-bukavu.cd',
    telephone: '+243 998 123 456',
    chargeHoraireAttribuee: 150,
    tauxHoraireUSD: 22,
    prestationMoisUSD: 825,
    statut: 'Actif'
  },
  {
    id: 'stf-4',
    matricule: 'ENS-104',
    nom: 'BIRINDWA',
    prenom: 'Pascal',
    grade: 'Chef de Travaux',
    fonction: 'Enseignant Chercheur',
    typeContrat: 'Permanent',
    departement: 'Informatique Appliquée',
    email: 'pascal.birindwa@ista-bukavu.cd',
    telephone: '+243 971 112 233',
    chargeHoraireAttribuee: 200,
    tauxHoraireUSD: 16,
    prestationMoisUSD: 800,
    statut: 'Actif'
  },
  {
    id: 'stf-5',
    matricule: 'ENS-105',
    nom: 'CISHUGI',
    prenom: 'Alain',
    grade: 'Assistant',
    fonction: 'Secrétaire du Jury & Enseignant',
    typeContrat: 'Permanent',
    departement: 'Génie Mécanique',
    email: 'alain.cishugi@ista-bukavu.cd',
    telephone: '+243 812 345 678',
    chargeHoraireAttribuee: 160,
    tauxHoraireUSD: 12,
    prestationMoisUSD: 480,
    statut: 'Actif'
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    titre: 'Procès-Verbal de Délibération S1 - L3 Informatique Appliquée',
    category: 'PV Délibération',
    description: 'PV officiel de clôture de la première session de délibération de L3 Informatique Appliquée site de Burhuza.',
    datePublication: '2026-02-18',
    auteur: 'Jury Académique ISTA',
    anneeAcademique: CURRENT_ACADEMIC_YEAR,
    section: 'Informatique Appliquée',
    fileSize: '1.2 MB'
  },
  {
    id: 'doc-2',
    titre: 'Syllabus complet - Développement Web & Cloud (INF301)',
    category: 'Syllabus',
    description: 'Support de cours officiel comprenant les TP, travaux pratiques en React & Node.js, et exercices d examen.',
    datePublication: '2025-10-15',
    auteur: 'CT Ir. Pascal BIRINDWA',
    anneeAcademique: CURRENT_ACADEMIC_YEAR,
    section: 'Informatique Appliquée',
    fileSize: '4.5 MB'
  },
  {
    id: 'doc-3',
    titre: 'Règlement d Examen et Code de Conduite Académique',
    category: 'Règlement',
    description: 'Document officiel définissant la charte des examens, les conditions de délibération LMD et l hygiène académique.',
    datePublication: '2025-09-01',
    auteur: 'Secrétariat Général Académique',
    anneeAcademique: CURRENT_ACADEMIC_YEAR,
    fileSize: '890 KB'
  },
  {
    id: 'doc-4',
    titre: 'Rapport Financier Semestriel des Recettes - Burhuza',
    category: 'Rapport Financier',
    description: 'Bilan consolidé des encaissements des frais de scolarité et allocations budgétaires pour le 1er semestre.',
    datePublication: '2026-02-01',
    auteur: 'Service Financier',
    anneeAcademique: CURRENT_ACADEMIC_YEAR,
    fileSize: '2.1 MB'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    titre: 'Calendrier Officiel des Évaluations de Première Session',
    contenu: 'La Direction Académique informe tous les étudiants que les épreuves écrites et pratiques de la première session débuteront le lundi 16 février 2026 à 08h00 au site de Burhuza.',
    auteur: 'Prof. Dieudonné KABANGA',
    auteurRole: 'Directeur Général',
    date: '2026-02-01',
    priorite: 'Urgente',
    cible: 'Tous',
    epingle: true
  },
  {
    id: 'ann-2',
    titre: 'Paiement de la Deuxième Tranche des Frais Académiques',
    contenu: 'Le Service Financier rappelle à tous les étudiants de L1, L2, L3 et M1 que l échéance pour la régularisation de la 2ème tranche est fixée au 15 Mars 2026.',
    auteur: 'Mme Clarisse MUKESHIMANA',
    auteurRole: 'Chef du Service Financier',
    date: '2026-02-10',
    priorite: 'Haute',
    cible: 'Étudiants',
    epingle: true
  },
  {
    id: 'ann-3',
    titre: 'Dépôt des Sujets de TFC et Mémoires de Fin d Études',
    contenu: 'Tous les étudiants de L3 et M2 sont priés de soumettre leur protocole de recherche de TFC/Mémoire auprès de leurs Chefs de Section respectifs avant la fin du mois.',
    auteur: 'CT Ir. Justin BAHATI',
    auteurRole: 'Chef de Section',
    date: '2026-02-22',
    priorite: 'Normale',
    cible: 'Étudiants'
  }
];

export const INITIAL_MESSAGES: InternalMessage[] = [
  {
    id: 'msg-1',
    expediteurId: 'usr-chef-sec',
    expediteurNom: 'CT Ir. Justin BAHATI',
    destinataireId: 'usr-prof-1',
    destinataireNom: 'CT Ir. Pascal BIRINDWA',
    sujet: 'Validation des cotes du cours INF301',
    message: 'Bonjour Cher Collègue, veuillez finaliser la saisie des notes d examen de TP pour INF301 avant la séance de pré-délibération de jeudi.',
    date: '2026-02-14 10:30',
    lu: true
  },
  {
    id: 'msg-2',
    expediteurId: 'usr-financier',
    expediteurNom: 'Mme Clarisse MUKESHIMANA',
    destinataireId: 'usr-etudiant-1',
    destinataireNom: 'MUGISHO CHIRIMWAMI Gloire',
    sujet: 'Confirmation du Quitus Financier',
    message: 'Bonjour MUGISHO, votre paiement de la 2ème tranche (150 USD) a été validé. Vous êtes totalement en règle pour les délibérations.',
    date: '2026-03-02 14:15',
    lu: false
  }
];

export const INITIAL_EVENTS: AcademicEvent[] = [
  {
    id: 'evt-1',
    titre: 'Sessions de Délibération du Jury S1',
    type: 'Délibération',
    dateDebut: '2026-03-10',
    dateFin: '2026-03-12',
    lieu: 'Salle du Conseil - Burhuza',
    organisateur: 'Jury Académique',
    description: 'Examen des procès-verbaux de cotes et proclamation des résultats du premier semestre.',
    concerne: 'Toutes les sections'
  },
  {
    id: 'evt-2',
    titre: 'Soutenances Publiques des TFC (Travaux de Fin de Cycle)',
    type: 'Soutenance TFC/Mémoire',
    dateDebut: '2026-04-05',
    dateFin: '2026-04-08',
    lieu: 'Amphithéâtre Burhuza',
    organisateur: 'Secrétariat Académique',
    description: 'Présentation des projets technologiques et ingénierie devant le jury d évaluation.',
    concerne: 'Étudiants L3 & M2'
  },
  {
    id: 'evt-3',
    titre: 'Conférence Internationale sur les Énergies Renouvelables au Kivu',
    type: 'Conférence',
    dateDebut: '2026-04-20',
    dateFin: '2026-04-21',
    lieu: 'Grande Salle de Conférence - ISTA',
    organisateur: 'Section Génie Électrique & Partenaires',
    description: 'Keynotes et ateliers sur les micro-centrales hydroélectriques et solaires en milieu rural.',
    concerne: 'Enseignants, Étudiants & Invités'
  },
  {
    id: 'evt-4',
    titre: 'Cérémonie de Collation des Grades Académiques',
    type: 'Cérémonie',
    dateDebut: '2026-07-30',
    dateFin: '2026-07-30',
    lieu: 'Campus de Burhuza',
    organisateur: 'Comité de Direction ISTA',
    description: 'Remise officielle des diplômes d Ingénieur Technicien et de Master aux lauréats.',
    concerne: 'Communauté Universitaire'
  }
];
