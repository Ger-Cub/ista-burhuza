import React, { useState } from 'react';
import { DocumentItem } from '../types';
import { FileText, Download, Upload, Search, Filter, Folder, Plus, FileCheck } from 'lucide-react';

interface DocumentsModuleProps {
  documents: DocumentItem[];
  onAddDocument: (doc: DocumentItem) => void;
}

export const DocumentsModule: React.FC<DocumentsModuleProps> = ({
  documents,
  onAddDocument
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');

  const filteredDocs = documents.filter(d => {
    const matchSearch = d.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        d.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'Tous' || d.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div id="sigu-documents-view" className="space-y-4 font-mono">
      {/* Title */}
      <div className="bg-white p-4 border border-[#141414] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-mono font-bold text-[#141414] flex items-center gap-2 uppercase tracking-wide">
            <FileText className="w-5 h-5 text-[#F27D26]" />
            GESTION_DOCUMENTAIRE // ARCHIVES_ACADEMIQUES
          </h2>
          <p className="text-xs text-[#141414]/70 mt-0.5">
            ARCHIVAGE NUMERIQUE DES PVS, SYLLABUS, REGLEMENTS ET RAPPORTS OFFICIELS
          </p>
        </div>

        <button
          onClick={() => alert('Dépôt de document académique officiel vers l archivage ISTA')}
          className="bg-[#141414] hover:bg-[#F27D26] hover:text-black text-white font-mono font-bold px-3.5 py-2 text-xs flex items-center gap-1.5 border border-[#141414] transition-colors uppercase"
        >
          <Upload className="w-4 h-4 text-[#F27D26]" /> DEPOSER_DOCUMENT
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3 border border-[#141414] flex flex-wrap items-center gap-3 font-mono text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#141414]/60 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="RECHERCHE: Titre, auteur, mots clés..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#E4E3E0] border border-[#141414] focus:outline-none focus:bg-white font-mono uppercase"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-1.5 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
        >
          <option value="Tous">TOUTES_LES_CATEGORIES</option>
          <option value="PV Délibération">PVs de Délibération</option>
          <option value="Syllabus">Syllabus de Cours</option>
          <option value="Règlement">Règlements Académiques</option>
          <option value="Rapport Financier">Rapports Financiers</option>
        </select>
      </div>

      {/* Documents List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map(doc => (
          <div key={doc.id} className="bg-white border border-[#141414] p-4 space-y-2 flex flex-col justify-between font-mono">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase bg-[#141414] text-white border border-[#141414] px-1.5 py-0.5">
                  {doc.category}
                </span>
                <span className="text-[10px] text-gray-600 font-mono font-bold">{doc.fileSize}</span>
              </div>

              <h3 className="font-mono font-bold text-sm text-[#141414] mt-2 uppercase">{doc.titre}</h3>
              <p className="text-xs text-[#141414]/80 mt-1 uppercase">{doc.description}</p>
            </div>

            <div className="border-t border-[#141414]/20 pt-2 mt-3 flex items-center justify-between">
              <div className="text-[10px] text-gray-700">
                AUTEUR: <span className="font-bold text-[#141414] uppercase">{doc.auteur}</span> ({doc.datePublication})
              </div>

              <button
                onClick={() => alert(`Téléchargement sécurisé de ${doc.titre}`)}
                className="bg-[#141414] hover:bg-[#F27D26] hover:text-black text-white font-mono font-bold px-3 py-1 text-xs flex items-center gap-1 border border-[#141414] transition-colors uppercase"
              >
                <Download className="w-3.5 h-3.5 text-[#F27D26]" /> TELECHARGER_PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
