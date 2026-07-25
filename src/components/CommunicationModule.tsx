import React, { useState } from 'react';
import { Announcement, InternalMessage, User } from '../types';
import { MessageSquare, Bell, Send, Plus, Pin, AlertCircle, CheckCircle2, User as UserIcon } from 'lucide-react';

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
    <div id="sigu-communication-view" className="space-y-4 font-mono">
      {/* Title & Tabs */}
      <div className="bg-white p-4 border border-[#141414] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-mono font-bold text-[#141414] flex items-center gap-2 uppercase tracking-wide">
            <MessageSquare className="w-5 h-5 text-[#F27D26]" />
            COMMUNICATION_INTERNE // ANNONCES_INSTITUTIONNELLES
          </h2>
          <p className="text-xs text-[#141414]/70 mt-0.5">
            COMMUNIQUES OFFICIELS ET MESSAGERIE DIRECTE CAMPUS BURHUZA
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="bg-[#E4E3E0] p-1 flex border border-[#141414]">
            <button
              onClick={() => setActiveTab('announcements')}
              className={`px-3 py-1 text-xs font-mono font-bold uppercase transition-colors ${
                activeTab === 'announcements' ? 'bg-[#141414] text-white' : 'text-[#141414] hover:bg-white'
              }`}
            >
              ANNONCES ({announcements.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-3 py-1 text-xs font-mono font-bold uppercase transition-colors ${
                activeTab === 'messages' ? 'bg-[#141414] text-white' : 'text-[#141414] hover:bg-white'
              }`}
            >
              MESSAGERIE
            </button>
          </div>

          {activeTab === 'announcements' && (
            <button
              onClick={() => setShowAnnModal(true)}
              className="bg-[#141414] hover:bg-[#F27D26] hover:text-black text-white font-mono font-bold px-3 py-2 text-xs flex items-center gap-1 border border-[#141414] transition-colors uppercase"
            >
              <Plus className="w-4 h-4 text-[#F27D26]" /> PUBLIER_COMMUNIQUE
            </button>
          )}
        </div>
      </div>

      {/* Tab 1: Announcements */}
      {activeTab === 'announcements' && (
        <div className="space-y-3 font-mono">
          {announcements.map(ann => (
            <div 
              key={ann.id} 
              className={`bg-white border p-4 space-y-2 relative ${
                ann.epingle ? 'border-[#141414] border-l-8 border-l-[#F27D26]' : 'border-[#141414]'
              }`}
            >
              {ann.epingle && (
                <span className="absolute top-3 right-3 text-[9px] font-bold bg-[#F27D26] text-black px-2 py-0.5 flex items-center gap-1 uppercase border border-[#141414]">
                  <Pin className="w-3 h-3" /> EPINGLE
                </span>
              )}

              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold uppercase bg-[#141414] text-white px-1.5 py-0.5">
                  {ann.auteurRole}
                </span>
                <span className="text-xs font-bold text-[#141414] uppercase">{ann.auteur}</span>
                <span className="text-[10px] text-gray-500 font-mono">• {ann.date}</span>
              </div>

              <h3 className="font-mono font-bold text-sm text-[#141414] uppercase">{ann.titre}</h3>
              <p className="text-xs text-[#141414]/90 whitespace-pre-line leading-relaxed uppercase">
                {ann.contenu}
              </p>

              <div className="pt-2 border-t border-[#141414]/20 flex items-center justify-between text-[10px] text-gray-700">
                <span>CIBLE: <strong className="text-[#141414] uppercase">{ann.cible}</strong></span>
                <span className="font-bold text-[#141414] uppercase">DIFFUSION_CAMPUS_BURHUZA</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Direct Messaging */}
      {activeTab === 'messages' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono">
          {/* Sent/Received Messages List */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-mono font-bold text-xs uppercase text-[#141414] tracking-wider">
              HISTORIQUE_DES_MESSAGES_ECHANGES
            </h3>

            {messages.map(msg => (
              <div key={msg.id} className="bg-white border border-[#141414] p-4 space-y-2">
                <div className="flex items-center justify-between border-b border-[#141414]/20 pb-2">
                  <div className="flex items-center gap-2 text-xs">
                    <UserIcon className="w-4 h-4 text-[#F27D26]" />
                    <span className="font-bold text-[#141414] uppercase">{msg.expediteurNom}</span>
                    <span className="text-[#141414]">→</span>
                    <span className="font-bold text-[#141414] uppercase">{msg.destinataireNom}</span>
                  </div>
                  <span className="text-[10px] text-gray-600 font-mono">{msg.date}</span>
                </div>

                <div className="font-bold text-xs text-[#141414] uppercase">{msg.sujet}</div>
                <p className="text-xs text-[#141414]/80">{msg.message}</p>
              </div>
            ))}
          </div>

          {/* New Message Form */}
          <div className="bg-white border border-[#141414] p-4 space-y-3">
            <h3 className="font-mono font-bold text-xs uppercase text-[#141414] tracking-wider flex items-center gap-1">
              <Send className="w-4 h-4 text-[#F27D26]" /> NOUVEAU_MESSAGE_INTERNE
            </h3>

            <form onSubmit={handleSendDirectMessage} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">DESTINATAIRE</label>
                <select
                  value={newMsgDest}
                  onChange={(e) => setNewMsgDest(e.target.value)}
                  className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
                >
                  <option value="Prof. Dieudonné KABANGA">Prof. Dieudonné KABANGA (Directeur Général)</option>
                  <option value="CT Ir. Justin BAHATI">CT Ir. Justin BAHATI (Chef de Section)</option>
                  <option value="Prof. Dr. Marc MUKAMBA">Prof. Dr. Marc MUKAMBA (Président Jury)</option>
                  <option value="Mme Clarisse MUKESHIMANA">Mme Clarisse MUKESHIMANA (Finance)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">SUJET *</label>
                <input
                  type="text"
                  required
                  placeholder="Objet du message..."
                  value={newMsgSubj}
                  onChange={(e) => setNewMsgSubj(e.target.value)}
                  className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">CORPS_DU_MESSAGE *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Rédigez votre message..."
                  value={newMsgBody}
                  onChange={(e) => setNewMsgBody(e.target.value)}
                  className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] text-[#141414]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#141414] hover:bg-[#F27D26] hover:text-black text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 border border-[#141414] uppercase transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-[#F27D26]" /> ENVOYER_MESSAGE
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Announcement Modal */}
      {showAnnModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 font-mono">
          <div className="bg-white max-w-md w-full border-2 border-[#141414]">
            <div className="bg-[#141414] text-white p-3 flex items-center justify-between">
              <h3 className="font-mono font-bold text-xs uppercase">PUBLIER_COMMUNIQUE_OFFICIEL</h3>
              <button onClick={() => setShowAnnModal(false)} className="text-white hover:text-[#F27D26]">X</button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">TITRE_COMMUNIQUE *</label>
                <input
                  type="text"
                  required
                  value={newAnnTitle}
                  onChange={(e) => setNewAnnTitle(e.target.value)}
                  className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] font-bold text-[#141414] uppercase"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#141414] uppercase mb-1">CONTENU_OFFICIEL *</label>
                <textarea
                  rows={5}
                  required
                  value={newAnnBody}
                  onChange={(e) => setNewAnnBody(e.target.value)}
                  className="w-full p-2 text-xs bg-[#E4E3E0] border border-[#141414] text-[#141414]"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-[#141414] flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAnnModal(false)}
                  className="px-3 py-1.5 text-xs font-bold bg-[#E4E3E0] text-[#141414] border border-[#141414] uppercase"
                >
                  ANNULER
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-bold bg-[#141414] text-white hover:bg-[#F27D26] hover:text-black border border-[#141414] uppercase transition-colors"
                >
                  PUBLIER
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
