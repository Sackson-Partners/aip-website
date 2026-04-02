import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Loader2, ArrowLeft, Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const AdminServicesManager = () => {
  const { toast } = useToast();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    slug: '',
    description: '',
    icon_name: 'Search',
    is_published: false
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('title');
      if (error) throw error;
      setServices(data);
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch services", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
          title: formData.title,
          slug: formData.slug,
          description: formData.description,
          icon_name: formData.icon_name,
          is_published: formData.is_published
      };

      if (formData.id) {
        const { error } = await supabase.from('services').update(payload).eq('id', formData.id);
        if (error) throw error;
        toast({ title: "Success", description: "Service updated" });
      } else {
        const { error } = await supabase.from('services').insert([payload]);
        if (error) throw error;
        toast({ title: "Success", description: "Service created" });
      }

      setFormData({ id: null, title: '', slug: '', description: '', icon_name: 'Search', is_published: false });
      setIsEditing(false);
      fetchServices();
    } catch (error) {
      toast({ title: "Error", description: "Operation failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (!error) {
        toast({ title: "Deleted", description: "Service removed" });
        fetchServices();
    }
  };

  const togglePublish = async (service) => {
      await supabase.from('services').update({ is_published: !service.is_published }).eq('id', service.id);
      fetchServices();
  }

  return (
    <>
      <Helmet><title>Manage Services - Admin AIP</title></Helmet>
      <div className="min-h-screen bg-[#0F1419] font-sans text-gray-300">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/admin" className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
              <h1 className="text-2xl font-serif font-bold text-white">Manage Services</h1>
            </div>
            <Button onClick={() => { setFormData({ id: null, title: '', slug: '', description: '', icon_name: 'Search', is_published: false }); setIsEditing(!isEditing); }} className="bg-[#D4AF37] text-[#0F1419] hover:bg-white">
               {isEditing ? 'Cancel' : <><Plus className="w-4 h-4 mr-2" /> Add Service</>}
            </Button>
          </div>

          {isEditing && (
            <div className="bg-[#151a21] p-6 rounded-xl border border-white/10 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">{formData.id ? 'Edit Service' : 'New Service'}</h3>
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
                 <div>
                   <label className="block text-sm mb-1">Description</label>
                   <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#0F1419] border border-white/10 rounded px-3 py-2 h-24" />
                </div>
                 <div>
                   <label className="block text-sm mb-1">Icon Name</label>
                   <input type="text" value={formData.icon_name} onChange={e => setFormData({...formData, icon_name: e.target.value})} className="w-full bg-[#0F1419] border border-white/10 rounded px-3 py-2" />
                </div>
                 <div className="flex items-center gap-2">
                   <input type="checkbox" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} id="pub" />
                   <label htmlFor="pub" className="text-sm">Publish Immediately</label>
                </div>
                <Button type="submit" disabled={loading} className="bg-[#D4AF37] text-[#0F1419]">
                    {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Save Service'}
                </Button>
              </form>
            </div>
          )}

          <div className="grid gap-4">
            {services.map(service => (
              <div key={service.id} className="bg-[#151a21] p-4 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {service.title}
                     {!service.is_published && <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded">Draft</span>}
                  </h3>
                  <p className="text-sm text-gray-500">{service.description}</p>
                </div>
                 <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => togglePublish(service)}>
                     {service.is_published ? <Eye className="w-4 h-4 text-green-400" /> : <EyeOff className="w-4 h-4 text-gray-500" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => { setFormData(service); setIsEditing(true); }}>
                    <Edit2 className="w-4 h-4 text-blue-400" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)}>
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

export default AdminServicesManager;