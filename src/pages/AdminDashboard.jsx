import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Image as ImageIcon, MessageSquare, Settings, LogOut, Plus, Edit2, Trash2, Save, ShieldCheck, Lock, FileText, Tag } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function AdminDashboard() {
  const { isAuthenticated, login, logout } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
  
  const tabs = [
    { id: "products", name: "Products", icon: Package },
    { id: "offers", name: "Combined Offers", icon: Tag },
    { id: "hero", name: "Hero Images", icon: ImageIcon },
    { id: "reviews", name: "Reviews", icon: MessageSquare },
    { id: "legal", name: "Legal Pages", icon: FileText },
    { id: "settings", name: "Site Settings", icon: Settings },
  ];

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
        <div className="h-16 flex items-center gap-2 px-6 border-b border-gray-200">
          <ShieldCheck size={24} className="text-primary" />
          <span className="font-serif text-xl font-bold text-gray-900">Store Admin</span>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon size={18} />
                {tab.name}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Link 
            to="/"
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors"
          >
            <LogOut size={18} /> Exit to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64 overflow-y-auto min-h-screen relative">
        <div className="absolute top-8 right-8">
          <button 
            onClick={() => logout()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors border border-red-100"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-h-[80vh] mt-12">
          {activeTab === "products" && <ProductsManager />}
          {activeTab === "offers" && <OffersManager />}
          {activeTab === "hero" && <HeroManager />}
          {activeTab === "reviews" && <ReviewsManager />}
          {activeTab === "legal" && <LegalManager />}
          {activeTab === "settings" && <SettingsManager />}
        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function AdminLogin() {
  const { login } = useAdmin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login(username, password)) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock size={32} className="text-primary" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
        <p className="text-sm text-gray-500 mb-8">Enter your credentials to access the store dashboard.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-center mb-4"
              autoFocus
            />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-center"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
            Login to Dashboard
          </button>
        </form>
        <div className="mt-8">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 flex items-center justify-center gap-2">
            <LogOut size={14} className="rotate-180" /> Return to Store
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductsManager() {
  const { products, addProduct, updateProduct, deleteProduct, categories } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData(product);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setEditingId("new");
    setIsAdding(true);
    setFormData({
      id: "saree-" + Date.now(),
      name: "",
      price: 0,
      category: categories[0],
      image: "",
      description: "",
      isNew: false,
      isFeatured: false,
      stock: 10
    });
  };

  const handleSave = () => {
    if (isAdding) {
      addProduct(formData);
    } else {
      updateProduct(formData.id, formData);
    }
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif text-gray-900">Manage Products</h2>
        <button onClick={handleAdd} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-primary/90">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {editingId && (
        <div className="mb-8 bg-gray-50 p-6 rounded-md border border-gray-200">
          <h3 className="text-lg font-medium mb-4">{isAdding ? "Add New Product" : "Edit Product"}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-bold text-gray-600 mb-1">Name</label><input type="text" className="w-full border p-2 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
            <div><label className="block text-xs font-bold text-gray-600 mb-1">Price (₹)</label><input type="number" className="w-full border p-2 rounded" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} /></div>
            <div><label className="block text-xs font-bold text-gray-600 mb-1">Category</label><select className="w-full border p-2 rounded" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>{categories.map(c => <option key={c}>{c}</option>)}</select></div>
            <div><label className="block text-xs font-bold text-gray-600 mb-1">Image URL</label><input type="text" className="w-full border p-2 rounded" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://..." /></div>
            <div><label className="block text-xs font-bold text-gray-600 mb-1">Stock Quantity</label><input type="number" className="w-full border p-2 rounded" value={formData.stock || 0} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} /></div>
            <div className="flex items-center gap-4 mt-6">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={formData.isNew} onChange={e => setFormData({...formData, isNew: e.target.checked})} /> New Arrival</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} /> Featured Masterpiece</label>
            </div>
            <div className="col-span-2"><label className="block text-xs font-bold text-gray-600 mb-1">Description</label><textarea rows={3} className="w-full border p-2 rounded" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <button onClick={() => setEditingId(null)} className="px-4 py-2 border text-gray-600 rounded text-sm">Cancel</button>
            <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded text-sm"><Save size={16} /> Save</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-3"><img src={p.image} className="w-12 h-16 object-cover rounded" alt="" /></td>
                <td className="p-3 font-medium text-gray-900">{p.name} {p.isNew && <span className="ml-2 text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded">NEW</span>} {p.isFeatured && <span className="ml-2 text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">FEATURED</span>}</td>
                <td className="p-3 text-gray-600">₹{p.price}</td>
                <td className="p-3 text-gray-600">{p.category}</td>
                <td className="p-3 text-right">
                  <button onClick={() => handleEdit(p)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded mr-2"><Edit2 size={16} /></button>
                  <button onClick={() => deleteProduct(p.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HeroManager() {
  const { heroImages, updateHeroImages } = useAdmin();
  const [images, setImages] = useState(heroImages);

  const handleSave = () => {
    updateHeroImages(images);
    alert("Hero images updated successfully!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-serif text-gray-900 mb-6">Manage Hero Images</h2>
      <p className="text-sm text-gray-500 mb-6">Provide 3 image URLs to display in the continuous rotating carousel on the homepage.</p>
      
      <div className="space-y-6">
        {images.map((img, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className="w-24 h-32 bg-gray-200 rounded overflow-hidden shrink-0">
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-600 mb-1">Image {i + 1} URL</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded" 
                value={img} 
                onChange={(e) => {
                  const newImgs = [...images];
                  newImgs[i] = e.target.value;
                  setImages(newImgs);
                }} 
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 border-t pt-6">
        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded font-medium hover:bg-primary/90">
          <Save size={18} /> Update Hero Section
        </button>
      </div>
    </div>
  );
}

function ReviewsManager() {
  const { reviews, addReview, updateReview, deleteReview } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (r) => { setEditingId(r.id); setFormData(r); setIsAdding(false); };
  const handleAdd = () => { setEditingId("new"); setIsAdding(true); setFormData({ id: Date.now(), name: "", location: "", content: "", rating: 5, type: "text", thumbnail: "" }); };
  const handleSave = () => { isAdding ? addReview(formData) : updateReview(formData.id, formData); setEditingId(null); setIsAdding(false); };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif text-gray-900">Manage Reviews</h2>
        <button onClick={handleAdd} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-primary/90">
          <Plus size={16} /> Add Review
        </button>
      </div>

      {editingId && (
        <div className="mb-8 bg-gray-50 p-6 rounded-md border border-gray-200">
          <h3 className="text-lg font-medium mb-4">{isAdding ? "Add New Review" : "Edit Review"}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-bold text-gray-600 mb-1">Customer Name</label><input type="text" className="w-full border p-2 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
            <div><label className="block text-xs font-bold text-gray-600 mb-1">Location</label><input type="text" className="w-full border p-2 rounded" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} /></div>
            <div><label className="block text-xs font-bold text-gray-600 mb-1">Rating (1-5)</label><input type="number" min="1" max="5" className="w-full border p-2 rounded" value={formData.rating} onChange={e => setFormData({...formData, rating: Number(e.target.value)})} /></div>
            <div><label className="block text-xs font-bold text-gray-600 mb-1">Type (text/photo/video)</label><select className="w-full border p-2 rounded" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}><option value="text">Text</option><option value="photo">Photo</option><option value="video">Video</option></select></div>
            {formData.type !== "text" && <div className="col-span-2"><label className="block text-xs font-bold text-gray-600 mb-1">Image/Video Thumbnail URL</label><input type="text" className="w-full border p-2 rounded" value={formData.thumbnail} onChange={e => setFormData({...formData, thumbnail: e.target.value})} placeholder="https://..." /></div>}
            <div className="col-span-2"><label className="block text-xs font-bold text-gray-600 mb-1">Review Content</label><textarea rows={3} className="w-full border p-2 rounded" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} /></div>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <button onClick={() => setEditingId(null)} className="px-4 py-2 border text-gray-600 rounded text-sm">Cancel</button>
            <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded text-sm"><Save size={16} /> Save</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {reviews.map(r => (
          <div key={r.id} className="p-4 border rounded-md flex justify-between items-start hover:bg-gray-50">
            <div>
              <div className="font-bold text-gray-900">{r.name} <span className="text-sm font-normal text-gray-500 ml-2">{r.location}</span></div>
              <div className="text-yellow-500 text-sm my-1">{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div>
              <p className="text-gray-600 text-sm mt-2 italic">"{r.content}"</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => handleEdit(r)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16} /></button>
              <button onClick={() => deleteReview(r.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsManager() {
  const { contactInfo, updateContactInfo } = useAdmin();
  const [info, setInfo] = useState(contactInfo);

  const handleSave = () => {
    updateContactInfo(info);
    alert("Settings updated successfully!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-serif text-gray-900 mb-6">Site Settings (Contact Info)</h2>
      
      <div className="space-y-4 max-w-xl">
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">WhatsApp / Phone Number</label>
          <input type="text" className="w-full border p-2 rounded" value={info.phone} onChange={e => setInfo({...info, phone: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Email Address</label>
          <input type="text" className="w-full border p-2 rounded" value={info.email} onChange={e => setInfo({...info, email: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Store Address</label>
          <input type="text" className="w-full border p-2 rounded" value={info.address} onChange={e => setInfo({...info, address: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Business Hours</label>
          <input type="text" className="w-full border p-2 rounded" value={info.hours} onChange={e => setInfo({...info, hours: e.target.value})} />
        </div>
      </div>
      
      <div className="mt-8 border-t pt-6">
        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded font-medium hover:bg-primary/90">
          <Save size={18} /> Update Settings
        </button>
      </div>
    </div>
  );
}

function LegalManager() {
  const { legalPages, updateLegalPages } = useAdmin();
  const [pages, setPages] = useState(legalPages);

  const handleSave = () => {
    updateLegalPages(pages);
    alert("Legal pages updated successfully!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-serif text-gray-900 mb-6">Manage Legal Pages</h2>
      
      <div className="space-y-8">
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Privacy Policy</label>
          <textarea 
            rows={10} 
            className="w-full border p-4 rounded text-sm font-serif leading-relaxed" 
            value={pages.privacy} 
            onChange={e => setPages({...pages, privacy: e.target.value})} 
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Terms of Service</label>
          <textarea 
            rows={10} 
            className="w-full border p-4 rounded text-sm font-serif leading-relaxed" 
            value={pages.terms} 
            onChange={e => setPages({...pages, terms: e.target.value})} 
          />
        </div>
      </div>
      
      <div className="mt-8 border-t pt-6">
        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded font-medium hover:bg-primary/90">
          <Save size={18} /> Update Legal Pages
        </button>
      </div>
    </div>
  );
}

function OffersManager() {
  const { offers, addOffer, updateOffer, deleteOffer } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", image: "", isActive: true });

  const resetForm = () => {
    setFormData({ title: "", description: "", image: "", isActive: true });
    setEditingId(null);
  };

  const handleSave = () => {
    if (!formData.title || !formData.image) return;
    
    if (editingId) {
      updateOffer(editingId, { ...formData, id: editingId });
    } else {
      addOffer({ ...formData, id: `offer-${Date.now()}` });
    }
    resetForm();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif text-gray-900">Manage Combined Offers</h2>
        <button onClick={resetForm} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded text-sm hover:bg-primary/90">
          <Plus size={16} /> New Offer
        </button>
      </div>

      {/* Form */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
        <h3 className="font-bold mb-4">{editingId ? "Edit Offer" : "Add New Offer"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Offer Title" className="border p-2 rounded" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <input type="text" placeholder="Image URL (e.g. https://images.unsplash.com/...)" className="border p-2 rounded" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
          <textarea placeholder="Offer Description" className="border p-2 rounded md:col-span-2" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isActive" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} />
            <label htmlFor="isActive" className="text-sm font-medium">Offer is Active</label>
          </div>
        </div>
        <button onClick={handleSave} className="mt-4 flex items-center gap-2 px-6 py-2 bg-primary text-white rounded font-medium hover:bg-primary/90">
          <Save size={16} /> Save Offer
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {offers.map(offer => (
          <div key={offer.id} className={`flex items-center gap-4 p-4 border rounded-lg bg-white ${!offer.isActive ? 'opacity-50' : ''}`}>
            <img src={offer.image} alt={offer.title} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-bold text-lg">{offer.title} {!offer.isActive && "(Inactive)"}</h3>
              <p className="text-gray-600 text-sm mt-1">{offer.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setFormData(offer); setEditingId(offer.id); }} className="p-2 text-blue-600 bg-blue-50 rounded hover:bg-blue-100"><Edit2 size={16} /></button>
              <button onClick={() => deleteOffer(offer.id)} className="p-2 text-red-600 bg-red-50 rounded hover:bg-red-100"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
