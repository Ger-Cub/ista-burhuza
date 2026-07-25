import React, { useState } from 'react';
import { DocumentItem } from '../types';
import { FileText, Download, Upload, Search } from 'lucide-react';

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
    <div id="sigu-documents-view" className="space-y-6 font-sans">
      {/* Title Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1 font-heading">
            <FileText className="w-4 h-4 text-emerald-800" />
            Archives & Documentation Officielle
          </div>
          <h2 className="text-lg font-bold text-slate-900 font-heading uppercase tracking-tight">
            Gestion Documentaire & Archives Académiques
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Archivage numérique des PVs, syllabus, règlements et rapports officiels ISTA Burhuza
          </p>
        </div>

        <button
          onClick={() => alert('Dépôt de document académique officiel vers l\'archivage ISTA')}
          className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 border border-emerald-950 transition-all uppercase font-heading shadow-xs self-start sm:self-auto"
        >
          <Upload className="w-4 h-4 text-amber-400" /> Déposer un Document
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Rechercher: Titre, auteur, mots clés..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-slate-900"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium text-slate-900"
        >
          <option value="Tous">Toutes les Catégories</option>
          <option value="PV Délibération">PVs de Délibération</option>
          <option value="Syllabus">Syllabus de Cours</option>
          <option value="Règlement">Règlements Académiques</option>
          <option value="Rapport Financier">Rapports Financiers</option>
        </select>
      </div>

      {/* Documents List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map(doc => (
          <div key={doc.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-3 flex flex-col justify-between shadow-xs hover:border-emerald-700 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-0.5 rounded-full font-heading">
                  {doc.category}
                </span>
                <span className="text-xs text-slate-500 font-mono font-medium">{doc.fileSize}</span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 mt-2 font-heading">{doc.titre}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{doc.description}</p>
            </div>

            <div className="border-t border-slate-100 pt-3 mt-3 flex items-center justify-between">
              <div className="text-[11px] text-slate-500 font-medium">
                Auteur: <span className="font-bold text-slate-900">{doc.auteur}</span> ({doc.datePublication})
              </div>

              <button
                onClick={() => alert(`Téléchargement sécurisé de ${doc.titre}`)}
                className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 border border-emerald-950 uppercase transition-colors font-heading shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" /> Télécharger PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
