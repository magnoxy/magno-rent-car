
import React, { useState } from 'react';
import { Car, CarStatus } from '../types';
import { generateCarDescription, getPriceEstimation } from '../services/geminiService';

interface ListingFormProps {
  onAddCar: (car: Car) => void;
  ownerId: string;
}

export const ListingForm: React.FC<ListingFormProps> = ({ onAddCar, ownerId }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    pricePerDay: 0,
    description: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);

  const handleAiDescription = async () => {
    if (!formData.brand || !formData.model) return alert('Fill brand and model first!');
    setLoading(true);
    const desc = await generateCarDescription(formData.brand, formData.model, formData.year);
    const price = await getPriceEstimation(formData.brand, formData.model, formData.year);
    setFormData(prev => ({ ...prev, description: desc || '', pricePerDay: price || 100 }));
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCar: Car = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      ownerId,
      status: CarStatus.AVAILABLE,
      imageUrl: `https://picsum.photos/seed/${formData.brand+formData.model}/800/600`
    };
    onAddCar(newCar);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Brand</label>
          <input 
            type="text" 
            required
            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            value={formData.brand}
            onChange={e => setFormData({...formData, brand: e.target.value})}
            placeholder="e.g. BMW"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Model</label>
          <input 
            type="text" 
            required
            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            value={formData.model}
            onChange={e => setFormData({...formData, model: e.target.value})}
            placeholder="e.g. M4"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Year</label>
          <input 
            type="number" 
            required
            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            value={formData.year}
            onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Daily Price ($)</label>
          <input 
            type="number" 
            required
            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            value={formData.pricePerDay}
            onChange={e => setFormData({...formData, pricePerDay: parseInt(e.target.value)})}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
        <input 
          type="text" 
          required
          className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          value={formData.location}
          onChange={e => setFormData({...formData, location: e.target.value})}
          placeholder="City, State"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-slate-700">Description</label>
          <button 
            type="button" 
            onClick={handleAiDescription}
            disabled={loading}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.726 2.179a2 2 0 01-1.902 1.365h-4.862a2 2 0 01-1.902-1.365l-.726-2.179a2 2 0 00-1.96-1.414l-2.387.477a2 2 0 00-1.022.547l-1.144.915a2 2 0 01-1.898.397L1.64 16.51a2 2 0 01-1.296-1.865V4.2a2 2 0 011.296-1.865l.504-.202a2 2 0 011.898.397l1.144.915a2 2 0 001.022.547l2.387.477a2 2 0 001.96-1.414l.726-2.179a2 2 0 011.902-1.365h4.862a2 2 0 011.902 1.365l.726 2.179a2 2 0 001.96 1.414l2.387-.477a2 2 0 001.022-.547l1.144-.915a2 2 0 011.898-.397l.504.202a2 2 0 011.296 1.865v10.445a2 2 0 01-1.296 1.865l-.504.202a2 2 0 01-1.898-.397l-1.144-.915z" /></svg>
            {loading ? 'Optimizing...' : 'AI Enhance Listing'}
          </button>
        </div>
        <textarea 
          required
          rows={4}
          className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
          placeholder="Describe your car's features..."
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/20"
      >
        Post Listing
      </button>
    </form>
  );
};
