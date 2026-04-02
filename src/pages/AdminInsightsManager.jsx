import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Loader2, ArrowLeft, Plus, Edit2, Trash2, Eye, EyeOff, Upload, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const AdminInsightsManager = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author_name: '',
    category: '',
    read_time: '',
    image_url: '',
    is_featured: false,
    is_published: false
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('insights_articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setArticles(data);
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to fetch articles", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `articles/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
      toast({ title: "Success", description: "Image uploaded successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Image upload failed", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        author_name: formData.author_name,
        category: formData.category,
        read_time: formData.read_time,
        image_url: formData.image_url,
        is_featured: formData.is_featured,
        is_published: formData.is_published,
        // Set published_at if publishing for the first time could be handled here, 
        // but typically db default or trigger handles creation timestamp.
        published_at: formData.is_published ? new Date().toISOString() : null 
      };

      if (formData.id) {
        const { error } = await supabase
          .from('insights_articles')
          .update(payload)
          .eq('id', formData.id);
        if (error) throw error;
        toast({ title: "Success", description: "Article updated successfully" });
      } else {
        const { error } = await supabase
          .from('insights_articles')
          .insert([payload]);
        if (error) throw error;
        toast({ title: "Success", description: "Article created successfully" });
      }

      resetForm();
      setIsEditing(false);
      fetchArticles();

    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Operation failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author_name: '',
      category: '',
      read_time: '',
      image_url: '',
      is_featured: false,
      is_published: false
    });
  };

  const handleEdit = (article) => {
    setFormData(article);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    
    try {
      const { error } = await supabase.from('insights_articles').delete().eq('id', id);
      if (error) throw error;
      toast({ title: "Success", description: "Article deleted" });
      fetchArticles();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete article", variant: "destructive" });
    }
  };

  const togglePublish = async (article) => {
     try {
      const { error } = await supabase
          .from('insights_articles')
          .update({ is_published: !article.is_published })
          .eq('id', article.id);
      if(error) throw error;
      fetchArticles();
      toast({ title: "Success", description: `Article ${article.is_published ? 'unpublished' : 'published'}` });
     } catch(err) {
         toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
     }
  };

  return (
    <>
      <Helmet><title>Manage Insights - Admin AIP</title></Helmet>
      <div className="min-h-screen bg-[#0F1419] font-sans text-gray-300">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/admin" className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
              <h1 className="text-2xl font-serif font-bold text-white">Manage Insights</h1>
            </div>
            <Button onClick={() => { resetForm(); setIsEditing(!isEditing); }} className="bg-[#D4AF37] text-[#0F1419] hover:bg-white">
               {isEditing ? 'Cancel' : <><Plus className="w-4 h-4 mr-2" /> Add Article</>}
            </Button>
          </div>

          {isEditing && (
            <div className="bg-[#151a21] p-6 rounded-xl border border-white/10 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">{formData.id ? 'Edit Article' : 'New Article'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Title</label>
                    <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#0F1419] border border-white/10 rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Slug</label>
                    <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-[#0F1419] border border-white/10 rounded px-3 py-2" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Author Name</label>
                    <input type="text" value={formData.author_name} onChange={e => setFormData({...formData, author_name: e.target.value})} className="w-full bg-[#0F1419] border border-white/10 rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Category</label>
                    <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[#0F1419] border border-white/10 rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Read Time</label>
                    <input type="text" value={formData.read_time} onChange={e => setFormData({...formData, read_time: e.target.value})} className="w-full bg-[#0F1419] border border-white/10 rounded px-3 py-2" placeholder="e.g. 5 min read" />
                  </div>
                </div>

                <div>
                   <label className="block text-sm mb-1">Excerpt</label>
                   <textarea rows={2} value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full bg-[#0F1419] border border-white/10 rounded px-3 py-2" />
                </div>
                
                <div>
                   <label className="block text-sm mb-1">Content (Rich Text / HTML)</label>
                   <textarea rows={8} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-[#0F1419] border border-white/10 rounded px-3 py-2 font-mono text-sm" />
                </div>

                <div>
                  <label className="block text-sm mb-1">Featured Image</label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="hidden" 
                        id="image-upload"
                        disabled={uploading}
                      />
                      <label 
                        htmlFor="image-upload" 
                        className={`flex items-center gap-2 px-4 py-2 rounded bg-[#0F1419] border border-white/10 cursor-pointer hover:bg-white/5 ${uploading ? 'opacity-50' : ''}`}
                      >
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        Upload Image
                      </label>
                    </div>
                    {formData.image_url && (
                      <div className="h-10 w-10 relative rounded overflow-hidden border border-white/20">
                         <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <input 
                      type="text" 
                      value={formData.image_url} 
                      onChange={e => setFormData({...formData, image_url: e.target.value})} 
                      className="flex-1 bg-[#0F1419] border border-white/10 rounded px-3 py-2 text-sm text-gray-400" 
                      placeholder="Or enter image URL manually"
                    />
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                     <input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} id="feat" className="rounded bg-[#0F1419] border-white/10" />
                     <label htmlFor="feat" className="text-sm">Featured Article</label>
                  </div>
                  <div className="flex items-center gap-2">
                     <input type="checkbox" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} id="pub" className="rounded bg-[#0F1419] border-white/10" />
                     <label htmlFor="pub" className="text-sm">Publish Immediately</label>
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" disabled={loading || uploading} className="bg-[#D4AF37] text-[#0F1419] hover:bg-white">
                    {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Save Article'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="grid gap-4">
            {articles.length === 0 && !loading && (
                <div className="text-center py-12 text-gray-500">No articles found. Create one to get started.</div>
            )}
            
            {articles.map(article => (
              <div key={article.id} className="bg-[#151a21] p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  {article.image_url ? (
                    <img src={article.image_url} alt="" className="w-16 h-16 object-cover rounded-lg bg-gray-800" />
                  ) : (
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-gray-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-white flex flex-wrap items-center gap-2">
                      {article.title}
                      {!article.is_published && <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded border border-yellow-500/20">Draft</span>}
                      {article.is_featured && <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20">Featured</span>}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{article.excerpt || 'No excerpt'}</p>
                    <div className="text-xs text-gray-600 mt-1 flex gap-3">
                        <span>{article.category || 'Uncategorized'}</span>
                        <span>•</span>
                        <span>{article.author_name || 'Unknown Author'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Button variant="ghost" size="icon" onClick={() => togglePublish(article)} title={article.is_published ? "Unpublish" : "Publish"}>
                     {article.is_published ? <Eye className="w-4 h-4 text-green-400" /> : <EyeOff className="w-4 h-4 text-gray-500" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(article)}>
                    <Edit2 className="w-4 h-4 text-blue-400" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id)}>
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminInsightsManager;