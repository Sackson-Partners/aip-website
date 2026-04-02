import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Loader2, ArrowLeft, Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const AdminSectorsManager = () => {
  const { toast } = useToast();
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    slug: '',
    tagline: '',
    description: '',
    icon_name: 'Zap',
    is_published: false
  });

  useEffect(() => {
    fetchSectors();
  }, []);

  const fetchSectors = async () => {
    try {
      const { data, error } = await supabase
        .from('sectors')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setSectors(data);
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to fetch sectors", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.id) {
        // Update
        const { error } = await supabase
          .from('sectors')
          .update({
            name: formData.name,
            slug: formData.slug,
            tagline: formData.tagline,
            description: formData.description,
            icon_name: formData.icon_name,
            is_published: formData.is_published
          })
          .eq('id', formData.id);
        if (error) throw error;
        toast({ title: "Success", description: "Sector updated successfully" });
      } else {
        // Create
        const { error } = await supabase
          .from('sectors')
          .insert([{
            name: formData.name,
            slug: formData.slug,
            tagline: formData.tagline,
            description: formData.description,
            icon_name: formData.icon_name,
            is_published: formData.is_published
          }]);
        if (error) throw error;
        toast({ title: "Success", description: "Sector created successfully" });
      }

      setFormData({ id: null, name: '', slug: '', tagline: '', description: '', icon_name: 'Zap', is_published: false });
      setIsEditing(false);
      fetchSectors();

    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Operation failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (sector) => {
    setFormData(sector);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sector?")) return;
    
    try {
      const { error } = await supabase.from('sectors').delete().eq('id', id);
      if (error) throw error;
      toast({ title: "Success", description: "Sector deleted" });
      fetchSectors();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete sector", variant: "destructive" });
    }
  };

  const togglePublish = async (sector) => {
     try {
      const { error } = await supabase
          .from('sectors')
          .update({ is_published: !sector.is_published })
          .eq('id', sector.id);
      if(error) throw error;
      fetchSectors();
     } catch(err) {
         toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
     }
  }

  return (
    <>
      <Helmet><title>Manage Sectors - Admin AIP</title></Helmet>
      <div className="min-h-screen bg-[#0F1419] font-sans text-gray-300">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/admin" className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
              <h1 className="text-2xl font-serif font-bold text-white">Manage Sectors</h1>
            </div>
            <Button onClick={() => setIsEditing(!isEditing)} className="bg-[#D4AF37] text-[#0F1419] hover:bg-white">
               {isEditing ? 'Cancel' : <><Plus className="w-4 h-4 mr-2" /> Add Sector</>}
            </Button>
          </div>

          {isEditing && (
            <div className="bg-[#151a21] p-6 rounded-xl border border-white/10 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">{formData.id ? 'Edit Sector' : 'New Sector'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0F1419] border border-white/10 rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Slug</label>
                    <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-[#0F1419] border border-white/10 rounded px-3 py-2" />
                  </div>
                </div>
                <div>
                   <label className="block text-sm mb-1">Tagline</label>
                   <input type="text" value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} className="w-full bg-[#0F1419] border border-white/10 rounded px-3 py-2" />
                </div>
                <div>
                   <label className="block text-sm mb-1">Description</label>
                   <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#0F1419] border border-white/10 rounded px-3 py-2 h-24" />
                </div>
                 <div>
                   <label className="block text-sm mb-1">Icon Name (Lucide React)</label>
                   <input type="text" value={formData.icon_name} onChange={e => setFormData({...formData, icon_name: e.target.value})} className="w-full bg-[#0F1419] border border-white/10 rounded px-3 py-2" placeholder="e.g. Zap, Truck, Sprout" />
                </div>
                <div className="flex items-center gap-2">
                   <input type="checkbox" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} id="pub" />
                   <label htmlFor="pub" className="text-sm">Publish Immediately</label>
                </div>
                <div className="pt-4">
                  <Button type="submit" disabled={loading} className="bg-[#D4AF37] text-[#0F1419] hover:bg-white">
                    {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Save Sector'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="grid gap-4">
            {sectors.map(sector => (
              <div key={sector.id} className="bg-[#151a21] p-4 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {sector.name} 
                    {!sector.is_published && <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded">Draft</span>}
                  </h3>
                  <p className="text-sm text-gray-500">{sector.tagline}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => togglePublish(sector)} title={sector.is_published ? "Unpublish" : "Publish"}>
                     {sector.is_published ? <Eye className="w-4 h-4 text-green-400" /> : <EyeOff className="w-4 h-4 text-gray-500" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(sector)}>
                    <Edit2 className="w-4 h-4 text-blue-400" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(sector.id)}>
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

export default AdminSectorsManager;