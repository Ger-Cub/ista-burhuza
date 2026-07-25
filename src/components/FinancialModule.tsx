import React, { useState } from 'react';
import { Payment, Student, Section, Level } from '../types';
import { generateReceiptPDF } from '../utils/pdfGenerator';
import { 
  Wallet, 
  Plus, 
  Printer, 
  Search, 
  CheckCircle2, 
  DollarSign, 
  Building, 
  TrendingUp, 
  X,
  CreditCard,
  FileCheck
} from 'lucide-react';

interface FinancialModuleProps {
  payments: Payment[];
  students: Student[];
  onAddPayment: (payment: Payment) => void;
}

export const FinancialModule: React.FC<FinancialModuleProps> = ({
  payments,
  students,
  onAddPayment
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);

  // Form state
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [montantUSD, setMontantUSD] = useState(150);
  const [motif, setMotif] = useState<'Acompte/Minerval' | 'Tranche 1' | 'Tranche 2' | 'Tranche 3' | 'Frais Labo/Pratique' | 'Inscriptions'>('Tranche 2');
  const [modePaiement, setModePaiement] = useState<'Banque (Rawbank)' | 'Banque (Equity BCDC)' | 'Airtel Money' | 'M-Pesa' | 'Caisse Centrale'>('Banque (Rawbank)');
  const [numBordereau, setNumBordereau] = useState('');

  const totalCollectedUSD = payments.reduce((acc, p) => acc + (p.statut === 'Validé' ? p.montantUSD : 0), 0);
  const totalExpectedUSD = students.reduce((acc, s) => acc + s.fraisTotaux, 0);

  const filteredPayments = payments.filter(p => 
    p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.studentMatricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.numBordereau.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRegisterPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find(s => s.id === selectedStudentId);
    if (!st) return;

    const ref = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPay: Payment = {
      id: `pay-${Date.now()}`,
      reference: ref,
      studentId: st.id,
      studentName: `${st.nom} ${st.postnom} ${st.prenom}`,
      studentMatricule: st.matricule,
      studentSection: st.section,
      studentNiveau: st.niveau,
      montantUSD: Number(montantUSD),
      motif,
      modePaiement,
      datePaiement: new Date().toISOString().split('T')[0],
      numBordereau: numBordereau || `BRD-${Math.floor(100000 + Math.random() * 900000)}`,
      statut: 'Validé',
      agentCaisse: 'Mme Clarisse MUKESHIMANA'
    };

    onAddPayment(newPay);
    setShowAddPaymentModal(false);
    setNumBordereau('');
  };  return (
    <div id="sigu-financial-view" className="space-y-4 font-mono">
      {/* Title */}
      <div className="bg-white p-4 border border-[#141414] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-mono font-bold text-[#141414] flex items-center gap-2 uppercase tracking-wide">
            <Wallet className="w-5 h-5 text-[#F27D26]" />
            GESTION_FINANCIERE // CAISSE_RECETTES_BURHUZA
          </h2>
          <p className="text-xs text-[#141414]/70 mt-0.5">
            ENCAISSEMENT PAR BORDEREAU BANCAIRE (RAWBANK, EQUITY, MOBILE MONEY) & REÇUS OFFICIELS PDF
          </p>
        </div>

        <button
          onClick={() => setShowAddPaymentModal(true)}
          className="bg-[#141414] hover:bg-[#F27D26] hover:text-black text-white font-mono font-bold px-3.5 py-2 text-xs flex items-center gap-1.5 border border-[#141414] transition-colors uppercase"
        >
          <Plus className="w-4 h-4" /> ENREGISTRER_PAIEMENT_FRAIS
        </button>
      </div>

      {/* KPI Cards - High Density Style */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#141414] text-white p-4 border border-[#141414]">
          <div className="text-[10px] font-bold text-[#F27D26] uppercase tracking-widest">RECETTES_TOTALES_PERCUES</div>
          <div className="text-3xl font-black text-white font-mono mt-1">${totalCollectedUSD.toFixed(2)} USD</div>
          <div className="text-[9px] text-gray-400 mt-2 uppercase">GUICHET_CAISSE_BURHUZA</div>
        </div>

        <div className="bg-white p-4 border border-[#141414]">
          <div className="text-[10px] font-bold text-[#141414] uppercase tracking-widest opacity-60">TOTAL_PREVISION_FRAIS</div>
          <div className="text-3xl font-black text-[#141414] font-mono mt-1">${totalExpectedUSD.toFixed(2)} USD</div>
          <div className="text-[9px] text-gray-600 mt-2 uppercase">SUR {students.length} ETUDIANTS INSCRITS</div>
        </div>

        <div className="bg-white p-4 border border-[#141414]">
          <div className="text-[10px] font-bold text-[#141414] uppercase tracking-widest opacity-60">TAUX_RECOUVREMENT_GLOBAL</div>
          <div className="text-3xl font-black text-[#F27D26] font-mono mt-1">
            {totalExpectedUSD > 0 ? Math.round((totalCollectedUSD / totalExpectedUSD) * 100) : 0}%
          </div>
          <div className="text-[9px] text-gray-600 mt-2 uppercase">PERCEPTION_ANNEE_2025_2026</div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-3 border border-[#141414]">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-[#141414]/60 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="RECHERCHE: Reçu, Bordereau, Nom étudiant, Matricule..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#E4E3E0] border border-[#141414] focus:outline-none focus:bg-white font-mono uppercase"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white border border-[#141414] overflow-x-auto">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead>
            <tr className="bg-[#141414] text-white font-bold uppercase tracking-wider text-[10px]">
              <th className="p-2.5">REF_REÇU</th>
              <th className="p-2.5">ETUDIANT_IDENTITE</th>
              <th className="p-2.5">MOTIF_PAIEMENT</th>
              <th className="p-2.5">MODE_BORDEREAU</th>
              <th className="p-2.5">MONTANT_USD</th>
              <th className="p-2.5">DATE_CAISSE</th>
              <th className="p-2.5">STATUT</th>
              <th className="p-2.5 text-right">DOCUMENT_REÇU</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#141414]/20">
            {filteredPayments.map(p => (
              <tr key={p.id} className="hover:bg-[#E4E3E0]/70 transition-colors">
                <td className="p-2.5 font-mono font-bold text-[#141414] border-r border-[#141414]/10">{p.reference}</td>
                <td className="p-2.5 font-bold text-[#141414]">
                  {p.studentName}
                  <div className="text-[9px] text-gray-600 font-mono">{p.studentMatricule} ({p.studentSection})</div>
                </td>
                <td className="p-2.5 font-bold text-[#141414] uppercase">{p.motif}</td>
                <td className="p-2.5">
                  <div className="font-bold text-[#141414] uppercase">{p.modePaiement}</div>
                  <div className="text-[9px] text-gray-600 font-mono">REF: {p.numBordereau}</div>
                </td>
                <td className="p-2.5 font-black text-[#F27D26] text-sm">${p.montantUSD.toFixed(2)}</td>
                <td className="p-2.5 text-[#141414] font-mono text-[10px]">{p.datePaiement}</td>
                <td className="p-2.5">
                  <span className="bg-[#141414] text-white px-2 py-0.5 text-[9px] font-bold border border-[#141414] inline-flex items-center gap-1 uppercase">
                    <CheckCircle2 className="w-3 h-3 text-[#F27D26]" /> {p.statut}
                  </span>
                </td>
                <td className="p-2.5 text-right">
                  <button
                    onClick={() => generateReceiptPDF(p)}
                    className="bg-[#141414] hover:bg-[#F27D26] hover:text-black text-white font-mono font-bold px-2 py-1 text-[10px] transition-colors inline-flex items-center gap-1 border border-[#141414] uppercase"
                  >
                    <Printer className="w-3 h-3 text-[#F27D26]" /> REÇU_PDF_A5
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Payment Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 font-mono">
          <div className="bg-white max-w-lg w-full border-2 border-[#141414]">
            <div className="bg-[#141414] text-white p-3 flex items-center justify-between">
              <h3 className="font-mono font-bold text-xs uppercase flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#F27D26]" />
                ENREGISTRER_VERSEMENT_FRAIS
              </h3>
              <button onClick={() => setShowAddPaymentModal(false)} className="text-white hover:text-[#F27D26]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterPayment} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">SELECTIONNER_ETUDIANT *</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.nom} {s.postnom} {s.prenom} ({s.matricule} - {s.section})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">MOTIF_PAIEMENT</label>
                  <select
                    value={motif}
                    onChange={(e) => setMotif(e.target.value as any)}
                    className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
                  >
                    <option value="Inscriptions">Inscriptions</option>
                    <option value="Tranche 1">Tranche 1</option>
                    <option value="Tranche 2">Tranche 2</option>
                    <option value="Tranche 3">Tranche 3</option>
                    <option value="Frais Labo/Pratique">Frais Labo/Pratique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">MONTANT_USD</label>
                  <input
                    type="number"
                    min={10}
                    step={10}
                    value={montantUSD}
                    onChange={(e) => setMontantUSD(Number(e.target.value))}
                    className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-black text-[#F27D26]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">CANAL_PAIEMENT</label>
                <select
                  value={modePaiement}
                  onChange={(e) => setModePaiement(e.target.value as any)}
                  className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
                >
                  <option value="Banque (Rawbank)">Banque (Rawbank)</option>
                  <option value="Banque (Equity BCDC)">Banque (Equity BCDC)</option>
                  <option value="Airtel Money">Airtel Money</option>
                  <option value="M-Pesa">Vodacom M-Pesa</option>
                  <option value="Caisse Centrale">Caisse Centrale Burhuza (Espèces)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">N° BORDEREAU / TRANSACTION</label>
                <input
                  type="text"
                  placeholder="RAW-9923812 ou AIR-554109"
                  value={numBordereau}
                  onChange={(e) => setNumBordereau(e.target.value)}
                  className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-mono font-bold text-[#141414] uppercase"
                />
              </div>

              <div className="pt-3 border-t border-[#141414] flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddPaymentModal(false)}
                  className="px-3 py-1.5 text-xs font-bold bg-[#E4E3E0] text-[#141414] border border-[#141414] uppercase"
                >
                  ANNULER
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-bold bg-[#141414] text-white hover:bg-[#F27D26] hover:text-black border border-[#141414] uppercase transition-colors"
                >
                  ENREGISTRER & REÇU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
