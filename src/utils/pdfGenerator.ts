import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Student, Course, Grade, Payment, DeliberationSession } from '../types';
import { CURRENT_ACADEMIC_YEAR } from '../data/mockData';

/**
 * Add Official ISTA / Bukavu (Site de Burhuza) Header to a jsPDF document
 */
function addOfficialHeader(doc: jsPDF, title: string) {
  // RDC Coat / Institution Top Bar
  doc.setFillColor(10, 92, 54); // ISTA Green (#0a5c36)
  doc.rect(14, 10, 182, 3, 'F');

  // Institution Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(10, 92, 54);
  doc.text('RÉPUBLIQUE DÉMOCRATIQUE DU CONGO', 105, 18, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(80, 80, 80);
  doc.text('Enseignement Supérieur et Universitaire (E.S.U.)', 105, 22, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(10, 46, 31);
  doc.text('INSTITUT SUPÉRIEUR DES TECHNIQUES APPLIQUÉES', 105, 28, { align: 'center' });

  doc.setFontSize(9);
  doc.setTextColor(10, 92, 54);
  doc.text('ISTA / BUKAVU À BURHUZA', 105, 33, { align: 'center' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text('E-mail: istadebukavuburhuza2016@gmail.com | Tél: +243 993 644 243 / +243 853 985 762', 105, 37, { align: 'center' });

  // Divider line
  doc.setDrawColor(10, 92, 54);
  doc.setLineWidth(0.5);
  doc.line(14, 40, 196, 40);

  // Document Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(10, 46, 31);
  doc.text(title.toUpperCase(), 105, 48, { align: 'center' });
}

/**
 * Generate Official Academic Transcript (Relevé de Cotes)
 */
export function generateTranscriptPDF(student: Student, courses: Course[], grades: Grade[]) {
  const doc = new jsPDF();
  addOfficialHeader(doc, 'Relevé de Cotes Officiel (Système LMD)');

  // Student Info Box
  doc.setFillColor(242, 246, 244);
  doc.rect(14, 53, 182, 24, 'F');
  doc.setDrawColor(220, 232, 225);
  doc.rect(14, 53, 182, 24, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(10, 92, 54);
  doc.text(`MATRICULE: ${student.matricule}`, 18, 59);
  doc.text(`NOM COMPLET: ${student.nom} ${student.postnom} ${student.prenom}`, 18, 65);
  doc.text(`SECTION: ${student.section}`, 18, 71);

  doc.text(`NIVEAU: ${student.niveau}`, 120, 59);
  doc.text(`ANNÉE ACADÉMIQUE: ${student.anneeAcademique}`, 120, 65);
  doc.text(`GENRE: ${student.genre} | STATUT: ${student.statut}`, 120, 71);

  // Filter student grades
  const studentGrades = grades.filter(g => g.studentId === student.id);

  let totalCredits = 0;
  let totalPoints = 0;

  const tableData = courses.map(course => {
    const g = studentGrades.find(grade => grade.courseId === course.id);
    const note = g ? g.noteFinale : 0;
    const isValide = g ? g.valide : false;

    totalCredits += course.credits;
    totalPoints += note * course.credits;

    return [
      course.code,
      course.titre,
      course.ue,
      `${course.credits} ECTS`,
      g ? `${g.noteIntra.toFixed(1)} / 10` : 'N/S',
      g ? `${g.noteExamen.toFixed(1)} / 10` : 'N/S',
      g ? `${g.noteFinale.toFixed(1)} / 20` : 'N/S',
      isValide ? 'VALIDÉ' : 'AJOURNÉ'
    ];
  });

  const moyGenerale = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
  let decisionLMD = 'AJOURNÉ';
  if (moyGenerale >= 16) decisionLMD = 'ADMIS (Grande Distinction)';
  else if (moyGenerale >= 14) decisionLMD = 'ADMIS (Distinction)';
  else if (moyGenerale >= 10) decisionLMD = 'ADMIS (Satisfaction)';

  autoTable(doc, {
    startY: 82,
    head: [['Code', 'Matière / Cours', 'Unité d\'Enseignement', 'Crédits', 'Intra', 'Examen', 'Total', 'Décision']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [10, 92, 54],
      textColor: [255, 255, 255],
      fontSize: 7,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 7,
      textColor: [30, 30, 30]
    },
    columnStyles: {
      0: { cellWidth: 18, fontStyle: 'bold' },
      1: { cellWidth: 50 },
      2: { cellWidth: 38 },
      3: { cellWidth: 16, halign: 'center' },
      4: { cellWidth: 15, halign: 'center' },
      5: { cellWidth: 15, halign: 'center' },
      6: { cellWidth: 15, halign: 'center', fontStyle: 'bold' },
      7: { cellWidth: 15, halign: 'center' }
    }
  });

  // Summary box
  // @ts-expect-error autoTable adds lastAutoTable to doc
  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 8 : 160;

  doc.setFillColor(248, 251, 249);
  doc.rect(14, finalY, 182, 18, 'F');
  doc.setDrawColor(10, 92, 54);
  doc.rect(14, finalY, 182, 18, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(10, 46, 31);
  doc.text(`MOYENNE GÉNÉRALE: ${moyGenerale.toFixed(2)} / 20`, 18, finalY + 6);
  doc.text(`TOTAL CRÉDITS CAPITALISÉS: ${totalCredits} ECTS`, 18, finalY + 12);
  doc.text(`DÉCISION DU JURY: ${decisionLMD}`, 105, finalY + 9);

  // Signatures
  const sigY = finalY + 28;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 30, 30);

  doc.text('Le Secrétaire du Jury', 25, sigY);
  doc.text('Le Chef de Section', 95, sigY);
  doc.text('Le Président du Jury', 150, sigY);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.text('Fait à Burhuza, le ' + new Date().toLocaleDateString('fr-FR'), 14, sigY + 22);
  doc.text('Document officiel certifié sans rature par le SIGU-ISTA', 14, sigY + 26);

  doc.save(`Releve_Cotes_${student.matricule}.pdf`);
}

/**
 * Generate Official Deliberation Minutes (Procès-Verbal de Délibération)
 */
export function generateDeliberationPDF(session: DeliberationSession, students: Student[], courses: Course[], grades: Grade[]) {
  const doc = new jsPDF();
  addOfficialHeader(doc, `Procès-Verbal de Délibération (${session.sessionType})`);

  // Session details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(10, 92, 54);
  doc.text(`CODE SESSION: ${session.code}`, 14, 55);
  doc.text(`SECTION: ${session.section} (${session.niveau})`, 14, 61);
  doc.text(`ANNÉE ACADÉMIQUE: ${session.anneeAcademique}`, 14, 67);

  doc.text(`PRÉSIDENT DU JURY: ${session.presidentJury}`, 110, 55);
  doc.text(`SECRÉTAIRE DU JURY: ${session.secretaireJury}`, 110, 61);
  doc.text(`CHEF DE SECTION: ${session.chefSection}`, 110, 67);

  // Filter students for this section and level
  const sectionStudents = students.filter(s => s.section === session.section && s.niveau === session.niveau);

  const tableData = sectionStudents.map((s, idx) => {
    const sGrades = grades.filter(g => g.studentId === s.id);
    let totalCreds = 0;
    let totalPts = 0;

    courses.filter(c => c.section === session.section && c.niveau === session.niveau).forEach(c => {
      const g = sGrades.find(grade => grade.courseId === c.id);
      if (g) {
        totalCreds += c.credits;
        totalPts += g.noteFinale * c.credits;
      }
    });

    const avg = totalCreds > 0 ? totalPts / totalCreds : 0;
    let mention = 'Ajourné';
    if (avg >= 16) mention = 'Grande Distinction';
    else if (avg >= 14) mention = 'Distinction';
    else if (avg >= 10) mention = 'Satisfaction';

    return [
      (idx + 1).toString(),
      s.matricule,
      `${s.nom} ${s.postnom} ${s.prenom}`,
      s.genre,
      avg > 0 ? `${avg.toFixed(2)} / 20` : 'Incomplet',
      `${totalCreds} ECTS`,
      mention
    ];
  });

  autoTable(doc, {
    startY: 75,
    head: [['N°', 'Matricule', 'Nom & Prénoms Étudiant', 'Genre', 'Moyenne', 'Crédits', 'Mention Jury']],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: [10, 92, 54],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 8
    }
  });

  // @ts-expect-error autoTable adds lastAutoTable to doc
  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 12 : 180;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(10, 46, 31);
  doc.text('MEMBRES DU JURY ET SIGNATURES OFFICIELLES:', 14, finalY);

  const sigY = finalY + 15;
  doc.setFontSize(8);
  doc.text('Le Secrétaire du Jury', 20, sigY);
  doc.text('Le Chef de Section', 85, sigY);
  doc.text('Le Président du Jury', 145, sigY);

  doc.text('.................................................', 20, sigY + 15);
  doc.text('.................................................', 85, sigY + 15);
  doc.text('.................................................', 145, sigY + 15);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text(`Procès-verbal clôturé et scellé à Burhuza le ${session.dateSession}`, 14, sigY + 30);

  doc.save(`PV_Deliberation_${session.code}.pdf`);
}

/**
 * Generate Official Financial Receipt (Reçu de Paiement)
 */
export function generateReceiptPDF(payment: Payment) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [148, 210] // A5 Format for Official Receipt
  });

  // Header
  doc.setFillColor(10, 92, 54);
  doc.rect(8, 6, 132, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(10, 92, 54);
  doc.text('INSTITUT SUPÉRIEUR DES TECHNIQUES APPLIQUÉES', 74, 12, { align: 'center' });
  doc.setFontSize(6);
  doc.setTextColor(60, 60, 60);
  doc.text('ISTA / BUKAVU À BURHUZA - SERVICE FINANCIER', 74, 16, { align: 'center' });

  doc.setDrawColor(10, 92, 54);
  doc.line(8, 19, 140, 19);

  // Title Box
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(10, 46, 31);
  doc.text('REÇU DE PAIEMENT SÉCURISÉ', 74, 26, { align: 'center' });

  // Reference Badge
  doc.setFillColor(242, 246, 244);
  doc.rect(10, 31, 128, 12, 'F');
  doc.setDrawColor(200, 215, 205);
  doc.rect(10, 31, 128, 12, 'S');

  doc.setFontSize(7);
  doc.setTextColor(10, 92, 54);
  doc.text(`RÉFÉRENCE REÇU: ${payment.reference}`, 14, 38);
  doc.text(`DATE DE CAISSE: ${payment.datePaiement}`, 85, 38);

  // Payment details table
  autoTable(doc, {
    startY: 47,
    head: [['Libellé Description', 'Information']],
    body: [
      ['Matricule Étudiant', payment.studentMatricule],
      ['Nom de l\'Étudiant', payment.studentName],
      ['Section & Niveau', `${payment.studentSection} (${payment.studentNiveau})`],
      ['Motif du Paiement', payment.motif],
      ['Mode de Paiement', payment.modePaiement],
      ['N° Bordereau / Trans.', payment.numBordereau],
      ['Montant Payé (USD)', `${payment.montantUSD.toFixed(2)} $ USD`]
    ],
    theme: 'grid',
    headStyles: {
      fillColor: [10, 92, 54],
      textColor: [255, 255, 255],
      fontSize: 7,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 7
    },
    columnStyles: {
      0: { cellWidth: 45, fontStyle: 'bold' },
      1: { cellWidth: 83 }
    }
  });

  // @ts-expect-error autoTable adds lastAutoTable to doc
  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 8 : 130;

  // Amount in words placeholder & Signature
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(40, 40, 40);
  doc.text(`Valide pour quittance auprès du Guichet ISTA / Burhuza.`, 10, finalY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('L\'Agent de Caisse / Perceur', 90, finalY + 8);
  doc.setFont('helvetica', 'normal');
  doc.text(payment.agentCaisse, 90, finalY + 14);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6);
  doc.setTextColor(120, 120, 120);
  doc.text('Ce reçu est délivré électroniquement et fait foi de paiement officiel.', 74, finalY + 30, { align: 'center' });

  doc.save(`Recu_${payment.reference}.pdf`);
}

/**
 * Generate Enrollment Certificate (Attestation de Fréquentation)
 */
export function generateCertificatePDF(student: Student) {
  const doc = new jsPDF();
  addOfficialHeader(doc, 'Attestation de Fréquentation Académique');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);

  const text1 = `Le Secrétaire Général Académique de l'Institut Supérieur des Techniques Appliquées (ISTA / Bukavu à Burhuza) atteste par la présente que l'étudiant(e) :`;

  doc.text(doc.splitTextToSize(text1, 180), 14, 60);

  // Student details frame
  doc.setFillColor(245, 248, 246);
  doc.rect(14, 72, 182, 35, 'F');
  doc.setDrawColor(10, 92, 54);
  doc.rect(14, 72, 182, 35, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(10, 92, 54);
  doc.text(`NOM ET PRÉNOMS : ${student.nom} ${student.postnom} ${student.prenom}`, 20, 80);
  doc.text(`N° MATRICULE : ${student.matricule}`, 20, 87);
  doc.text(`DATE ET LIEU DE NAISSANCE : ${student.dateNaissance} à ${student.lieuNaissance}`, 20, 94);
  doc.text(`SECTION ET NIVEAU : ${student.section} - Promotion ${student.niveau}`, 20, 101);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);

  const text2 = `Est régulièrement inscrit(e) au rôle des étudiants de l'ISTA-Bukavu, site de Burhuza, pour l'année académique ${CURRENT_ACADEMIC_YEAR} et suit régulièrement les enseignements théoriques et travaux pratiques.`;

  doc.text(doc.splitTextToSize(text2, 180), 14, 118);

  const text3 = `En foi de quoi, la présente attestation lui est délivrée pour servir et valoir ce que de droit.`;
  doc.text(text3, 14, 138);

  const sigY = 160;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Fait à Burhuza, le ' + new Date().toLocaleDateString('fr-FR'), 120, sigY);
  doc.text('Pour le Secrétariat Général Académique,', 120, sigY + 8);
  doc.text('Le Directeur Général', 120, sigY + 28);
  doc.setFont('helvetica', 'normal');
  doc.text('Prof. Dieudonné KABANGA', 120, sigY + 34);

  doc.save(`Attestation_${student.matricule}.pdf`);
}
