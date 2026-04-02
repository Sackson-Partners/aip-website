import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Loader2, ArrowLeft, Plus, Edit2, Trash2, Eye, EyeOff, Upload, Music, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const AdminPodcastManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('episodes'); // 'show' or 'episodes'
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Forms
  const [showForm, setShowForm] = useState({ id: null, title: '', description: '', cover_image_url: '', is_published: false });
  const [episodeForm, setEpisodeForm] = useState({
    id: null, show_id: '', title: '', description: '', episode_number: '', 
    audio_url: '', cover_image_url: '', duration_seconds: 0, guest_name: '', is_published: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Show
      const { data: shows, error: showError } = await supabase.from('podcast_show').select('*').limit(1);
      if (showError) throw showError;
      
      const currentShow = shows[0] || null;
      setShow(currentShow);
      if (currentShow) {
          setShowForm(currentShow);
          setEpisodeForm(prev => ({ ...prev, show_id: currentShow.id }));
      }

      // Fetch Episodes
      if (currentShow) {
          const { data: eps, error: epsError } = await supabase
            .from('podcast_episodes')
            .select('*')
            .eq('show_id', currentShow.id)
            .order('episode_number', { ascending: false });
          if (epsError) throw epsError;
          setEpisodes(eps);
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to fetch data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e, bucket, field, setForm) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = bucket === 'podcast-audio' ? `episodes/${fileName}` : `covers/${fileName}`;

      const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath);

      setForm(prev => ({ ...prev, [field]: publicUrl }));
      toast({ title: "Success", description: "File uploaded successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Upload failed: " + error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleShowSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (showForm.id) {
         const { error } = await supabase.from('podcast_show').update(showForm).eq('id', showForm.id);
         if (error) throw error;
      } else {
         const { error } = await supabase.from('podcast_show').insert([showForm]);
         if (error) throw error;
      }
      toast({ title: "Success", description: "Show details saved" });
      fetchData();
    } catch (err) {
      toast({ title: "Error", description: "Failed to save show", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleEpisodeSubmit = async (e) => {
    e.preventDefault();
    if (!episodeForm.show_id) {
        toast({ title: "Error", description: "No podcast show exists. Create a show first.", variant: "destructive" });
        return;
    }
    setLoading(true);
    try {
      if (episodeForm.id) {
         const { error } = await supabase.from('podcast_episodes').update(episodeForm).eq('id', episodeForm.id);
         if (error) throw error;
      } else {
         const { error } = await supabase.from('podcast_episodes').insert([episodeForm]);
         if (error) throw error;
      }
      toast({ title: "Success", description: "Episode saved" });
      setIsEditing(false);
      resetEpisodeForm();
      fetchData();
    } catch (err) {
        console.log(err);
      toast({ title: "Error", description: "Failed to save episode", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const resetEpisodeForm = () => {
      setEpisodeForm({
        id: null, show_id: show?.id || '', title: '', description: '', episode_number: '', 
        audio_url: '', cover_image_url: '', duration_seconds: 0, guest_name: '', is_published: false
      });
  };

  const handleDeleteEpisode = async (id) => {
      if(!confirm("Delete this episode?")) return;
      try {
          const { error } = await supabase.from('podcast_episodes').delete().eq('id', id);
          if(error) throw error;
          fetchData();
          toast({ title: "Deleted", description: "Episode removed" });
      } catch(err) {
          toast({ title: "Error", variant: "destructive" });
      }
  }

  return (
    <>
      <Helmet><title>Manage Podcast - Admin AIP</title></Helmet>
      <div className="min-h-screen bg-[#0F1419] font-sans text-gray-300">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/admin" className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
              <h1 className="text-2xl font-serif font-bold text-white">Manage Podcast</h1>
            </div>
          </div>

          <div className="flex space-x-4 mb-8 border-b border-white/10">
              <button 
                onClick={() => setActiveTab('show')}
                className={`pb-4 px-4 font-medium transition-colors ${activeTab === 'show' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                  Show Details
              </button>
              <button 
                onClick={() => setActiveTab('episodes')}
                className={`pb-4 px-4 font-medium transition-colors ${activeTab === 'episodes' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                  Episodes
              </button>
          </div>

          {activeTab === 'show' && (
              <div className="max-w-2xl bg-[#151a21] p-8 rounded-xl border border-white/10">
                  <h2 className="text-xl font-bold text-white mb-6">Podcast Show Settings</h2>
                  <form onSubmit={handleShowSubmit} className="space-y-6">
                      <div>
                          <label className="block text-sm mb-2">Show Title</label>
                          <input type="text" required value={showForm.title} onChange={e => setShowForm({...showForm, title: e.target.value})} className="w-full bg-[#0F1419] border border-white/10 rounded px-4 py-2" />
                      </div>
                      <div>
                          <label className="block text-sm mb-2">Description</label>
                          <textarea rows={4} value={showForm.description} onChange={e => setShowForm({...showForm, description: e.target.value})} className="w-full bg-[#0F1419] border border-white/10 rounded px-4 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Cover Image</label>
                        <div className="flex items-center gap-4">
                            {showForm.cover_image_url && <img src={showForm.cover_image_url} alt="Cover" className="w-20 h-20 rounded object-cover" />}
                            <label className="cursor-pointer bg-[#0F1419] border border-white/10 px-4 py-2 rounded hover:bg-white/5 flex items-center gap-2">
                                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                Upload Cover
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'images', 'cover_image_url', setShowForm)} disabled={uploading} />
                            </label>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                          <input type="checkbox" checked={showForm.is_published} onChange={e => setShowForm({...showForm, is_published: e.target.checked})} id="showPub" />
                          <label htmlFor="showPub">Publish Show</label>
                      </div>
                      <Button type="submit" disabled={loading} className="bg-[#D4AF37] text-[#0F1419] hover:bg-white">
                          Save Show Details
                      </Button>
                  </form>
              </div>
          )}

          {activeTab === 'episodes' && (
              <>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Episodes ({episodes.length})</h2>
                    <Button onClick={() => { resetEpisodeForm(); setIsEditing(!isEditing); }} className="bg-[#D4AF37] text-[#0F1419] hover:bg-white">
                        {isEditing ? 'Cancel' : <><Plus className="w-4 h-4 mr-2" /> New Episode</>}
                    </Button>
                </div>

                {isEditing && (
                    <div className="bg-[#151a21] p-6 rounded-xl border border-white/10 mb-8">
                        <h3 className="text-lg font-bold text-white mb-4">{episodeForm.id ? 'Edit Episode' : 'New Episode'}</h3>
                        <form onSubmit={handleEpisodeSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-1">Title</label>
                                    <input type="text" required value={episodeForm.title} onChange={e => setEpisodeForm({...episodeForm, title: e.target.value})} className="w-full bg-[#0F1419] border border-white/10 rounded px-3 py-2" />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Episode Number</label>
                                    <input type="number" required value={episodeForm.episode_number} onChange={e => setEpisodeForm({...episodeForm, episode_number: e.target.value})} className="w-full bg-[#0F1419] border border-white/10 rounded px-3 py-2" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm mb-1">Guest Name</label>
                                <input type="text" value={episodeForm.guest_name} onChange={e => setEpisodeForm({...episodeForm, guest_name: e.target.value})} className="w-full bg-[#0F1419] border border-white/10 rounded px-3 py-2" />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Description</label>
                                <textarea rows={3} value={episodeForm.description} onChange={e => setEpisodeForm({...episodeForm, description: e.target.value})} className="w-full bg-[#0F1419] border border-white/10 rounded px-3 py-2" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm mb-2">Audio File</label>
                                    <div className="flex flex-col gap-2">
                                        <label className="cursor-pointer bg-[#0F1419] border border-white/10 px-4 py-2 rounded hover:bg-white/5 flex items-center gap-2 justify-center">
                                            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Music className="w-4 h-4" />}
                                            Upload Audio (MP3)
                                            <input type="file" accept="audio/*" className="hidden" onChange={(e) => handleFileUpload(e, 'podcast-audio', 'audio_url', setEpisodeForm)} disabled={uploading} />
                                        </label>
                                        {episodeForm.audio_url && <span className="text-xs text-green-400 break-all">Audio file uploaded</span>}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Cover Image</label>
                                    <div className="flex items-center gap-4">
                                        {episodeForm.cover_image_url && <img src={episodeForm.cover_image_url} alt="Cover" className="w-12 h-12 rounded object-cover" />}
                                        <label className="cursor-pointer bg-[#0F1419] border border-white/10 px-4 py-2 rounded hover:bg-white/5 flex items-center gap-2 justify-center flex-1">
                                            <Upload className="w-4 h-4" /> Upload Image
                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'images', 'cover_image_url', setEpisodeForm)} disabled={uploading} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                 <label className="block text-sm mb-1">Duration (Seconds)</label>
                                 <input type="number" value={episodeForm.duration_seconds} onChange={e => setEpisodeForm({...episodeForm, duration_seconds: parseInt(e.target.value)})} className="w-full bg-[#0F1419] border border-white/10 rounded px-3 py-2" />
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" checked={episodeForm.is_published} onChange={e => setEpisodeForm({...episodeForm, is_published: e.target.checked})} id="epPub" />
                                <label htmlFor="epPub">Publish Episode</label>
                            </div>

                            <Button type="submit" disabled={loading || uploading} className="bg-[#D4AF37] text-[#0F1419] hover:bg-white">
                                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Save Episode'}
                            </Button>
                        </form>
                    </div>
                )}

                <div className="space-y-4">
                    {episodes.map(ep => (
                        <div key={ep.id} className="bg-[#151a21] p-4 rounded-xl border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center shrink-0">
                                    {ep.cover_image_url ? <img src={ep.cover_image_url} alt="" className="w-full h-full object-cover rounded" /> : <Music className="w-6 h-6 text-gray-500" />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Ep. {ep.episode_number}: {ep.title}</h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span>{Math.floor(ep.duration_seconds / 60)} mins</span>
                                        {ep.guest_name && <span>• w/ {ep.guest_name}</span>}
                                        {!ep.is_published && <span className="text-yellow-500 bg-yellow-500/10 px-1 rounded">Draft</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" onClick={() => { setEpisodeForm(ep); setIsEditing(true); window.scrollTo(0,0); }}>
                                    <Edit2 className="w-4 h-4 text-blue-400" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteEpisode(ep.id)}>
                                    <Trash2 className="w-4 h-4 text-red-400" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {episodes.length === 0 && <div className="text-gray-500 text-center py-8">No episodes found.</div>}
                </div>
              </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPodcastManager;