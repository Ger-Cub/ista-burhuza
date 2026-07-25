import React, { useState } from 'react';
import { BlogPost } from '../types';
import { 
  Newspaper, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Trash2, 
  Plus, 
  Eye, 
  ThumbsUp, 
  MessageSquare, 
  Search, 
  Filter, 
  Sparkles, 
  Send, 
  AlertTriangle,
  User,
  Tag,
  Share2,
  Calendar
} from 'lucide-react';

interface BlogModuleProps {
  blogPosts: BlogPost[];
  onAddBlogPost: (newPost: BlogPost) => void;
  onUpdateBlogPost: (updatedPost: BlogPost) => void;
  onDeleteBlogPost: (postId: string) => void;
}

export const BlogModule: React.FC<BlogModuleProps> = ({
  blogPosts,
  onAddBlogPost,
  onUpdateBlogPost,
  onDeleteBlogPost
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'published' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    titre: '',
    category: 'Vie du Campus' as BlogPost['category'],
    author: '',
    authorRole: '',
    excerpt: '',
    fullText: '',
    tags: '',
    featured: false,
    statut: 'Publié' as BlogPost['statut']
  });

  // Calculate statistics
  const totalPosts = blogPosts.length;
  const pendingPosts = blogPosts.filter(p => p.statut === 'En attente');
  const publishedPosts = blogPosts.filter(p => p.statut === 'Publié');
  const rejectedPosts = blogPosts.filter(p => p.statut === 'Rejeté');
  const totalInteractions = blogPosts.reduce((acc, p) => acc + (p.likes || 0) + (p.comments?.length || 0), 0);

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesFilter = 
      activeFilter === 'all' ? true :
      activeFilter === 'pending' ? post.statut === 'En attente' :
      activeFilter === 'published' ? post.statut === 'Publié' :
      post.statut === 'Rejeté';

    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;

    const matchesSearch = 
      post.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesCategory && matchesSearch;
  });

  const handleOpenCreateModal = () => {
    setEditingPost(null);
    setFormData({
      titre: '',
      category: 'Vie du Campus',
      author: 'Comité de Rédaction ISTA',
      authorRole: 'Administration / Communication',
      excerpt: '',
      fullText: '',
      tags: 'ISTA, Burhuza, Campus',
      featured: false,
      statut: 'Publié'
    });
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      titre: post.titre,
      category: post.category,
      author: post.author,
      authorRole: post.authorRole,
      excerpt: post.excerpt,
      fullText: post.fullText,
      tags: post.tags.join(', '),
      featured: post.featured || false,
      statut: post.statut
    });
    setIsCreateModalOpen(true);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titre.trim() || !formData.excerpt.trim() || !formData.fullText.trim()) return;

    const tagsArray = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    if (editingPost) {
      // Update
      const updated: BlogPost = {
        ...editingPost,
        titre: formData.titre,
        category: formData.category,
        author: formData.author,
        authorRole: formData.authorRole,
        excerpt: formData.excerpt,
        fullText: formData.fullText,
        tags: tagsArray,
        featured: formData.featured,
        statut: formData.statut
      };
      onUpdateBlogPost(updated);
    } else {
      // Create new
      const newPost: BlogPost = {
        id: `blog-${Date.now()}`,
        titre: formData.titre,
        category: formData.category,
        author: formData.author,
        authorRole: formData.authorRole,
        date: new Date().toISOString().split('T')[0],
        readTime: `${Math.max(2, Math.ceil(formData.fullText.length / 500))} min de lecture`,
        excerpt: formData.excerpt,
        fullText: formData.fullText,
        tags: tagsArray.length > 0 ? tagsArray : ['ISTA', 'Burhuza'],
        featured: formData.featured,
        likes: 0,
        comments: [],
        statut: formData.statut
      };
      onAddBlogPost(newPost);
    }

    setIsCreateModalOpen(false);
  };

  const handleQuickStatusChange = (post: BlogPost, newStatut: BlogPost['statut']) => {
    onUpdateBlogPost({
      ...post,
      statut: newStatut
    });
  };

  return (
    <div id="sigu-blog-module" className="space-y-6">
      {/* Module Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 text-emerald-900 rounded-lg">
              <Newspaper className="w-5 h-5 text-emerald-800" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 uppercase font-heading tracking-tight">
              Gestion des Blogues & Actualités
            </h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Validez et modérez les articles soumis depuis le site public, rédigez de nouvelles actualités académiques et gérez les publications.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-emerald-950 flex items-center justify-center gap-2 transition-all shadow-xs uppercase font-heading flex-shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Créer un Article</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Total Articles</span>
            <Newspaper className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-heading mt-1">{totalPosts}</div>
          <p className="text-[10px] text-slate-500 mt-0.5">Base documentaire d'actualités</p>
        </div>

        <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 uppercase font-heading">En Attente</span>
            <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
          </div>
          <div className="text-2xl font-black text-amber-950 font-heading mt-1 flex items-center gap-2">
            <span>{pendingPosts.length}</span>
            {pendingPosts.length > 0 && (
              <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase animate-bounce">
                À Valider
              </span>
            )}
          </div>
          <p className="text-[10px] text-amber-800/80 mt-0.5">Soumis depuis le site public</p>
        </div>

        <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900 uppercase font-heading">Articles Publiés</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-950 font-heading mt-1">{publishedPosts.length}</div>
          <p className="text-[10px] text-emerald-800/80 mt-0.5">Visibles par les visiteurs</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Interactions</span>
            <ThumbsUp className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-heading mt-1">{totalInteractions}</div>
          <p className="text-[10px] text-slate-500 mt-0.5">Likes & Commentaires cumulés</p>
        </div>
      </div>

      {/* Moderation Warning Notice if Pending Items exist */}
      {pendingPosts.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl flex items-start gap-3 shadow-2xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <h3 className="font-bold text-amber-950 uppercase font-heading">
              {pendingPosts.length} {pendingPosts.length > 1 ? 'articles sont' : 'article est'} en attente de publication
            </h3>
            <p className="text-amber-800 mt-0.5">
              Des étudiants ou membres de la communauté ont proposé des articles. Recommandation : lisez attentivement le contenu avant de cliquer sur <span className="font-bold underline text-amber-950">Publier</span> pour les rendre visibles sur le portal public.
            </p>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto discrete-scrollbar pb-1">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase font-heading transition-all whitespace-nowrap border ${
                activeFilter === 'all'
                  ? 'bg-emerald-950 text-white border-emerald-900 shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-transparent'
              }`}
            >
              Tous ({totalPosts})
            </button>

            <button
              onClick={() => setActiveFilter('pending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase font-heading transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                activeFilter === 'pending'
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-2xs'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border-amber-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>En Attente</span>
              {pendingPosts.length > 0 && (
                <span className="bg-amber-950 text-amber-300 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                  {pendingPosts.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveFilter('published')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase font-heading transition-all whitespace-nowrap border ${
                activeFilter === 'published'
                  ? 'bg-emerald-800 text-white border-emerald-900 shadow-2xs'
                  : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border-emerald-200'
              }`}
            >
              Publiés ({publishedPosts.length})
            </button>

            <button
              onClick={() => setActiveFilter('rejected')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase font-heading transition-all whitespace-nowrap border ${
                activeFilter === 'rejected'
                  ? 'bg-rose-800 text-white border-rose-900 shadow-2xs'
                  : 'bg-rose-50 text-rose-900 hover:bg-rose-100 border-rose-200'
              }`}
            >
              Rejetés ({rejectedPosts.length})
            </button>
          </div>

          {/* Search & Category Filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Rechercher titre, auteur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 text-slate-900"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-1.5 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:border-emerald-600"
            >
              <option value="all">Toutes les catégories</option>
              <option value="Recherche & Tech">Recherche & Tech</option>
              <option value="Vie Estudiantine">Vie Estudiantine</option>
              <option value="Projets Académiques">Projets Académiques</option>
              <option value="Partenariats">Partenariats</option>
              <option value="Vie du Campus">Vie du Campus</option>
              <option value="Événements & Soutenances">Événements & Soutenances</option>
            </select>
          </div>
        </div>
      </div>

      {/* Articles List / Cards Grid */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <Newspaper className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 font-heading uppercase">Aucun article trouvé</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Aucun billet de blog ne correspond à vos critères de recherche ou au filtre sélectionné.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => {
            const isPending = post.statut === 'En attente';
            const isPublished = post.statut === 'Publié';
            const isRejected = post.statut === 'Rejeté';

            return (
              <div
                key={post.id}
                className={`bg-white p-5 rounded-2xl border transition-all shadow-2xs hover:shadow-md ${
                  isPending ? 'border-amber-300 ring-1 ring-amber-300/50 bg-amber-50/20' : 
                  isPublished ? 'border-slate-200/80 hover:border-emerald-300' : 'border-rose-200 bg-rose-50/10'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Column: Post Info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Status Badge */}
                      {isPending && (
                        <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1 shadow-2xs animate-pulse">
                          <Clock className="w-3 h-3" /> En attente de validation
                        </span>
                      )}
                      {isPublished && (
                        <span className="bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Publié sur le site
                        </span>
                      )}
                      {isRejected && (
                        <span className="bg-rose-100 text-rose-900 border border-rose-200 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                          <XCircle className="w-3 h-3 text-rose-600" /> Article Rejeté
                        </span>
                      )}

                      {/* Category Badge */}
                      <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase font-heading">
                        {post.category}
                      </span>

                      {/* Featured Star Badge */}
                      {post.featured && (
                        <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-600" /> En Vedette
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-base font-bold text-slate-900 font-heading leading-snug">
                      {post.titre}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Author & Meta info */}
                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-1">
                      <span className="flex items-center gap-1 font-semibold text-slate-800">
                        <User className="w-3.5 h-3.5 text-emerald-700" /> {post.author} ({post.authorRole})
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> {post.readTime}
                      </span>
                      {post.submittedByEmail && (
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-mono text-slate-600">
                          Mail: {post.submittedByEmail}
                        </span>
                      )}
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1 pt-1">
                        <Tag className="w-3 h-3 text-slate-400" />
                        {post.tags.map((t, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Moderation Action Buttons */}
                  <div className="flex flex-wrap lg:flex-col items-center justify-end gap-2 pt-3 lg:pt-0 lg:border-l lg:border-slate-100 lg:pl-5 flex-shrink-0">
                    {/* Primary Action for Pending Posts */}
                    {isPending && (
                      <button
                        onClick={() => handleQuickStatusChange(post, 'Publié')}
                        className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-3.5 py-2 rounded-xl border border-emerald-950 flex items-center justify-center gap-1.5 transition-all shadow-xs uppercase font-heading w-full sm:w-auto"
                        title="Valider et publier cet article sur le site public"
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-400" />
                        <span>Publier l'Article</span>
                      </button>
                    )}

                    {isRejected && (
                      <button
                        onClick={() => handleQuickStatusChange(post, 'Publié')}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 uppercase font-heading"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Republier</span>
                      </button>
                    )}

                    {isPublished && (
                      <button
                        onClick={() => handleQuickStatusChange(post, 'Rejeté')}
                        className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 uppercase font-heading"
                        title="Désactiver / Dépublier cet article"
                      >
                        <XCircle className="w-3.5 h-3.5 text-amber-700" />
                        <span>Retirer</span>
                      </button>
                    )}

                    <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
                      {/* Read Preview Button */}
                      <button
                        onClick={() => setPreviewPost(post)}
                        className="p-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-900 text-slate-700 rounded-lg border border-slate-200 transition-colors"
                        title="Aperçu de la lecture complète"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => handleOpenEditModal(post)}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors"
                        title="Modifier l'article"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          if (confirm(`Voulez-vous vraiment supprimer l'article "${post.titre}" ?`)) {
                            onDeleteBlogPost(post.id);
                          }
                        }}
                        className="p-2 bg-rose-50 hover:bg-rose-700 text-rose-700 hover:text-white rounded-lg border border-rose-200 transition-colors"
                        title="Supprimer définitivement"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-emerald-950 p-4 text-white flex items-center justify-between border-b border-emerald-900">
              <div className="flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-amber-400" />
                <h2 className="font-heading font-bold text-sm uppercase tracking-wide">
                  {editingPost ? "Modifier l'Article de Blog" : "Créer un Nouvel Article de Blog"}
                </h2>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-emerald-200 hover:text-white hover:bg-emerald-900 p-1 rounded-lg"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSavePost} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase font-heading mb-1">
                  Titre de l'Article *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Projet de recherche sur les énergies solaires..."
                  value={formData.titre}
                  onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase font-heading mb-1">
                    Catégorie *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600 font-medium"
                  >
                    <option value="Recherche & Tech">Recherche & Tech</option>
                    <option value="Vie Estudiantine">Vie Estudiantine</option>
                    <option value="Projets Académiques">Projets Académiques</option>
                    <option value="Partenariats">Partenariats</option>
                    <option value="Vie du Campus">Vie du Campus</option>
                    <option value="Événements & Soutenances">Événements & Soutenances</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase font-heading mb-1">
                    Statut de Publication
                  </label>
                  <select
                    value={formData.statut}
                    onChange={(e) => setFormData({ ...formData, statut: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600 font-bold text-emerald-900"
                  >
                    <option value="Publié">Publié (Directement sur le site)</option>
                    <option value="En attente">En attente (Modération requise)</option>
                    <option value="Rejeté">Rejeté</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase font-heading mb-1">
                    Auteur (Nom Complet) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Prof. KABANGA / Ir. BAHATI"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase font-heading mb-1">
                    Rôle / Titre de l'Auteur
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Enseignant-Chercheur / Étudiant L3"
                    value={formData.authorRole}
                    onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase font-heading mb-1">
                  Extrait / Résumé Court *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Court résumé de 2 à 3 phrases affiché dans les cartes d'actualités..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase font-heading mb-1">
                  Contenu Complet de l'Article *
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Rédigez l'intégralité du texte de l'article ici..."
                  value={formData.fullText}
                  onChange={(e) => setFormData({ ...formData, fullText: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase font-heading mb-1">
                  Mots-Clés / Tags (séparés par des virgules)
                </label>
                <input
                  type="text"
                  placeholder="Informatique, Laboratoire, LMD"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-emerald-800 rounded focus:ring-emerald-600"
                />
                <label htmlFor="featured-checkbox" className="text-xs font-bold text-slate-800 font-heading uppercase cursor-pointer">
                  Mettre en vedette (Article Principal à la Une du site)
                </label>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 uppercase font-heading"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs px-5 py-2.5 rounded-xl border border-emerald-950 flex items-center gap-2 shadow-sm uppercase font-heading"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>{editingPost ? "Enregistrer les modifications" : "Publier l'Article"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULL ARTICLE PREVIEW MODAL */}
      {previewPost && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-slate-900 p-4 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-emerald-400" />
                <h2 className="font-heading font-bold text-xs uppercase tracking-wide">
                  Aperçu de la Lecture de l'Article
                </h2>
              </div>
              <button
                onClick={() => setPreviewPost(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-900 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase font-heading">
                  {previewPost.category}
                </span>
                <span className="text-xs text-slate-500">• {previewPost.date}</span>
                <span className="text-xs text-slate-500">• {previewPost.readTime}</span>
              </div>

              <h1 className="text-xl font-extrabold text-slate-900 font-heading leading-tight">
                {previewPost.titre}
              </h1>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 italic">
                "{previewPost.excerpt}"
              </div>

              <div className="prose prose-slate prose-sm max-w-none text-slate-800 whitespace-pre-wrap leading-relaxed pt-2">
                {previewPost.fullText}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <div>
                  <strong>Auteur :</strong> {previewPost.author} ({previewPost.authorRole})
                </div>
                <div className="flex items-center gap-3 font-bold text-slate-800">
                  <span>👍 {previewPost.likes} Likes</span>
                  <span>💬 {previewPost.comments?.length || 0} Commentaires</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              {previewPost.statut === 'En attente' && (
                <button
                  onClick={() => {
                    handleQuickStatusChange(previewPost, 'Publié');
                    setPreviewPost(null);
                  }}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2 rounded-xl border border-emerald-950 flex items-center gap-2 uppercase font-heading"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Valider & Publier sur le Site</span>
                </button>
              )}
              <button
                onClick={() => setPreviewPost(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs px-4 py-2 rounded-xl uppercase font-heading"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
