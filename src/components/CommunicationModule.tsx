import React, { useState } from 'react';
import { Announcement, InternalMessage, User } from '../types';
import { MessageSquare, Send, Plus, Pin, User as UserIcon, X } from 'lucide-react';

interface CommunicationModuleProps {
  currentUser: User;
  announcements: Announcement[];
  messages: InternalMessage[];
  onAddAnnouncement: (announcement: Announcement) => void;
  onSendMessage: (msg: InternalMessage) => void;
}

export const CommunicationModule: React.FC<CommunicationModuleProps> = ({
  currentUser,
  announcements,
  messages,
  onAddAnnouncement,
  onSendMessage
}) => {
  const [activeTab, setActiveTab] = useState<'announcements' | 'messages'>('announcements');
  const [newMsgDest, setNewMsgDest] = useState('Prof. Dieudonné KABANGA');
  const [newMsgSubj, setNewMsgSubj] = useState('');
  const [newMsgBody, setNewMsgBody] = useState('');

  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnBody, setNewAnnBody] = useState('');
  const [showAnnModal, setShowAnnModal] = useState(false);

  const handleSendDirectMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsgSubj || !newMsgBody) return;

    const created: InternalMessage = {
      id: `msg-${Date.now()}`,
      expediteurId: currentUser.id,
      expediteurNom: currentUser.name,
      destinataireId: 'usr-admin',
      destinataireNom: newMsgDest,
      sujet: newMsgSubj,
      message: newMsgBody,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      lu: false
    };

    onSendMessage(created);
    setNewMsgSubj('');
    setNewMsgBody('');
    alert('Message interne envoyé avec succès !');
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle || !newAnnBody) return;

    const created: Announcement = {
      id: `ann-${Date.now()}`,
      titre: newAnnTitle,
      contenu: newAnnBody,
      auteur: currentUser.name,
      auteurRole: currentUser.role.replace('_', ' ').toUpperCase(),
      date: new Date().toISOString().split('T')[0],
      priorite: 'Haute',
      cible: 'Tous',
      epingle: true
    };

    onAddAnnouncement(created);
    setShowAnnModal(false);
    setNewAnnTitle('');
    setNewAnnBody('');
  };

  return (
    <div id="sigu-communication-view" className="space-y-6 font-sans">
      {/* Title Header & Tabs */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1 font-heading">
            <MessageSquare className="w-4 h-4 text-emerald-800" />
            Communication & Informations
          </div>
          <h2 className="text-lg font-bold text-slate-900 font-heading uppercase tracking-tight">
            Annonces Officielles & Messagerie Interne
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Communiqués officiels, avis académiques et échanges directs Campus Burhuza
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200">
            <button
              onClick={() => setActiveTab('announcements')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors uppercase font-heading ${
                activeTab === 'announcements' ? 'bg-emerald-900 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200/60'
              }`}
            >
              Annonces ({announcements.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors uppercase font-heading ${
                activeTab === 'messages' ? 'bg-emerald-900 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200/60'
              }`}
            >
              Messagerie
            </button>
          </div>

          {activeTab === 'announcements' && (
            <button
              onClick={() => setShowAnnModal(true)}
              className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 border border-emerald-950 transition-all uppercase font-heading shadow-xs"
            >
              <Plus className="w-4 h-4 text-amber-400" /> Publier Communiqué
            </button>
          )}
        </div>
      </div>

      {/* Tab 1: Announcements */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          {announcements.map(ann => (
            <div 
              key={ann.id} 
              className={`bg-white rounded-2xl border p-5 space-y-3 relative shadow-xs transition-all ${
                ann.epingle ? 'border-emerald-700 border-l-8 border-l-amber-500' : 'border-slate-200/80'
              }`}
            >
              {ann.epingle && (
                <span className="absolute top-4 right-4 text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full flex items-center gap-1 uppercase font-heading">
                  <Pin className="w-3 h-3 text-amber-700" /> Épinglé
                </span>
              )}

              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-bold uppercase bg-emerald-950 text-white px-2.5 py-0.5 rounded-full font-heading">
                  {ann.auteurRole}
                </span>
                <span className="text-xs font-bold text-slate-900">{ann.auteur}</span>
                <span className="text-xs text-slate-400 font-mono">• {ann.date}</span>
              </div>

              <h3 className="font-bold text-base text-slate-900 font-heading">{ann.titre}</h3>
              <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                {ann.contenu}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Cible: <strong className="text-slate-900 uppercase font-heading">{ann.cible}</strong></span>
                <span className="font-bold text-emerald-900 uppercase text-[10px] font-heading">Diffusion Campus Burhuza</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Direct Messaging */}
      {activeTab === 'messages' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sent/Received Messages List */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-xs uppercase text-slate-700 tracking-wider font-heading">
              Historique des Messages Échangés
            </h3>

            {messages.map(msg => (
              <div key={msg.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2 text-xs">
                    <UserIcon className="w-4 h-4 text-emerald-800" />
                    <span className="font-bold text-slate-900">{msg.expediteurNom}</span>
                    <span className="text-slate-400">→</span>
                    <span className="font-bold text-slate-900">{msg.destinataireNom}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{msg.date}</span>
                </div>

                <div className="font-bold text-xs text-slate-900 font-heading">{msg.sujet}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{msg.message}</p>
              </div>
            ))}
          </div>

          {/* New Message Form */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4 shadow-xs self-start">
            <h3 className="font-bold text-xs uppercase text-slate-900 tracking-wider flex items-center gap-2 font-heading">
              <Send className="w-4 h-4 text-emerald-800" /> Nouveau Message Interne
            </h3>

            <form onSubmit={handleSendDirectMessage} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Destinataire</label>
                <select
                  value={newMsgDest}
                  onChange={(e) => setNewMsgDest(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="Prof. Dieudonné KABANGA">Prof. Dieudonné KABANGA (Directeur Général)</option>
                  <option value="CT Ir. Justin BAHATI">CT Ir. Justin BAHATI (Chef de Section)</option>
                  <option value="Prof. Dr. Marc MUKAMBA">Prof. Dr. Marc MUKAMBA (Président Jury)</option>
                  <option value="Mme Clarisse MUKESHIMANA">Mme Clarisse MUKESHIMANA (Finance)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Sujet *</label>
                <input
                  type="text"
                  required
                  placeholder="Objet du message..."
                  value={newMsgSubj}
                  onChange={(e) => setNewMsgSubj(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Corps du Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Rédigez votre message..."
                  value={newMsgBody}
                  onChange={(e) => setNewMsgBody(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-700"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs flex items-center justify-center gap-2 rounded-xl border border-emerald-950 uppercase transition-all font-heading shadow-xs"
              >
                <Send className="w-4 h-4 text-amber-400" /> Envoyer Message
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Announcement Modal */}
      {showAnnModal && (
        <div className="fixed inset-0 z-50 bg-emerald-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl border border-emerald-900/30 shadow-2xl overflow-hidden">
            <div className="bg-emerald-950 text-white p-4 flex items-center justify-between border-b border-emerald-900">
              <h3 className="font-heading font-bold text-sm uppercase">Publier Communiqué Officiel</h3>
              <button onClick={() => setShowAnnModal(false)} className="text-emerald-300 hover:text-white p-1 rounded-md">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Titre du Communiqué *</label>
                <input
                  type="text"
                  required
                  value={newAnnTitle}
                  onChange={(e) => setNewAnnTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-heading mb-1">Contenu Officiel *</label>
                <textarea
                  rows={5}
                  required
                  value={newAnnBody}
                  onChange={(e) => setNewAnnBody(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-700"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAnnModal(false)}
                  className="px-4 py-2 text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl uppercase font-heading"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-emerald-900 text-white hover:bg-emerald-950 rounded-xl border border-emerald-950 uppercase transition-colors font-heading shadow-xs"
                >
                  Publier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
