import React, { useState } from 'react';
import { Payment, Student } from '../types';
import { generateReceiptPDF } from '../utils/pdfGenerator';
import { 
  Wallet, 
  Plus, 
  Printer, 
  Search, 
  CheckCircle2, 
  X,
  CreditCard
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
  };

  return (
    <div id="sigu-financial-view" className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-1 font-heading">
            <Wallet className="w-4 h-4 text-emerald-800" />
            Service de la Caisse & Comptabilité
          </div>
          <h2 className="text-lg font-bold text-slate-900 font-heading uppercase tracking-tight">
            Gestion Financière & Perception des Frais
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Encaissement par bordereau bancaire (Rawbank, Equity) & reçu officiel PDF A5
          </p>
        </div>

        <button
          onClick={() => setShowAddPaymentModal(true)}
          className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 border border-emerald-950 transition-all uppercase font-heading shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-400" /> Enregistrer Versement
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-950 text-white p-5 rounded-2xl border border-emerald-900 shadow-xs">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider font-heading">Recettes Totales Perçues</div>
          <div className="text-3xl font-extrabold text-white mt-1.5">${totalCollectedUSD.toFixed(2)} <span className="text-xs text-emerald-200 font-normal">USD</span></div>
          <div className="text-[10px] text-emerald-300 mt-2 uppercase font-medium">Guichet Caisse Burhuza</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Prévision Totale Frais</div>
          <div className="text-3xl font-extrabold text-slate-900 mt-1.5">${totalExpectedUSD.toFixed(2)} <span className="text-xs text-slate-500 font-normal">USD</span></div>
          <div className="text-[10px] text-slate-500 mt-2 uppercase font-medium">Sur {students.length} étudiants inscrits</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Taux de Recouvrement</div>
          <div className="text-3xl font-extrabold text-emerald-900 mt-1.5">
            {totalExpectedUSD > 0 ? Math.round((totalCollectedUSD / totalExpectedUSD) * 100) : 0}%
          </div>
          <div className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-2 uppercase">
            Année Académique 2025-2026
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Rechercher: Reçu, bordereau, nom étudiant, matricule..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-slate-900"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-emerald-950 text-white font-bold uppercase tracking-wider text-[10px] font-heading">
                <th className="p-3.5">Ref Reçu</th>
                <th className="p-3.5">Étudiant & Matricule</th>
                <th className="p-3.5">Motif</th>
                <th className="p-3.5">Mode & Bordereau</th>
                <th className="p-3.5">Montant USD</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Statut</th>
                <th className="p-3.5 text-right">Document</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">{p.reference}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{p.studentName}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{p.studentMatricule} ({p.studentSection})</div>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-800">{p.motif}</td>
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-800">{p.modePaiement}</div>
                    <div className="text-[10px] text-slate-500 font-mono">REF: {p.numBordereau}</div>
                  </td>
                  <td className="p-3.5 font-extrabold text-emerald-900 text-sm">${p.montantUSD.toFixed(2)}</td>
                  <td className="p-3.5 text-slate-600 text-[11px]">{p.datePaiement}</td>
                  <td className="p-3.5">
                    <span className="bg-emerald-100 text-emerald-900 px-2.5 py-0.5 text-[10px] font-bold rounded-full border border-emerald-300 inline-flex items-center gap-1 uppercase">
                      <CheckCircle2 className="w-3 h-3 text-emerald-800" /> {p.statut}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => generateReceiptPDF(p)}
                      className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] transition-colors inline-flex items-center gap-1.5 shadow-xs font-heading"
                    >
                      <Printer className="w-3.5 h-3.5 text-amber-300" /> Reçu PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Payment Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 z-50 bg-emerald-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl border border-emerald-900/30 shadow-2xl overflow-hidden">
            <div className="bg-emerald-950 text-white p-4 flex items-center justify-between border-b border-emerald-900">
              <h3 className="font-heading font-bold text-sm uppercase flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-400" />
                Enregistrer un Versement de Frais
              </h3>
              <button onClick={() => setShowAddPaymentModal(false)} className="text-emerald-300 hover:text-white p-1 rounded-md transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterPayment} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Sélectionner l'Étudiant *</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
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
                  <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Motif de Paiement</label>
                  <select
                    value={motif}
                    onChange={(e) => setMotif(e.target.value as any)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  >
                    <option value="Inscriptions">Inscriptions</option>
                    <option value="Tranche 1">Tranche 1</option>
                    <option value="Tranche 2">Tranche 2</option>
                    <option value="Tranche 3">Tranche 3</option>
                    <option value="Frais Labo/Pratique">Frais Labo/Pratique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Montant USD ($)</label>
                  <input
                    type="number"
                    min={10}
                    step={10}
                    value={montantUSD}
                    onChange={(e) => setMontantUSD(Number(e.target.value))}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-emerald-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Canal de Paiement</label>
                <select
                  value={modePaiement}
                  onChange={(e) => setModePaiement(e.target.value as any)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                >
                  <option value="Banque (Rawbank)">Banque (Rawbank)</option>
                  <option value="Banque (Equity BCDC)">Banque (Equity BCDC)</option>
                  <option value="Airtel Money">Airtel Money</option>
                  <option value="M-Pesa">Vodacom M-Pesa</option>
                  <option value="Caisse Centrale">Caisse Centrale Burhuza (Espèces)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">N° Bordereau / Reference Transaction</label>
                <input
                  type="text"
                  placeholder="RAW-9923812 ou AIR-554109"
                  value={numBordereau}
                  onChange={(e) => setNumBordereau(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddPaymentModal(false)}
                  className="px-4 py-2 text-xs font-bold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors uppercase font-heading"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-emerald-900 text-white hover:bg-emerald-950 rounded-xl border border-emerald-950 uppercase transition-colors font-heading shadow-xs"
                >
                  Enregistrer & Générer Reçu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
