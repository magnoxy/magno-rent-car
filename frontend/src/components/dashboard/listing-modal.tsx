'use client';

import React, { useState } from 'react';
import { Car } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X, Wand2, Plus, UploadIcon, Loader2, Save } from 'lucide-react';
import { getCarContent } from '@/app/actions/ai';
import { uploadService } from '@/services/upload.service';

interface Props {
    onClose: () => void;
    onSubmit: (data: Partial<Car>) => void;
    initialData?: Car;
}

export const ListingModal: React.FC<Props> = ({ onClose, onSubmit, initialData }) => {
    const [data, setData] = useState({ 
        brand: initialData?.brand || '', 
        model: initialData?.model || '', 
        year: initialData?.year || 2024, 
        description: initialData?.description || '', 
        price: initialData?.pricePerDay || 0, 
        location: initialData?.location || '', 
        imageUrl: initialData?.imageUrl || '' 
    });
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const handleAi = async () => {
        if (!data.brand || !data.model) return alert("Preencha marca e modelo");
        setLoading(true);
        try {
            const res = await getCarContent(data.brand, data.model, data.year);
            // Ensure res has description and suggestedPrice, handles potential mock fallback
            setData({ ...data, description: res.description, price: res.suggestedPrice || 0 });
        } catch (error) {
            console.error("AI error", error);
            alert("Failed to fetch AI content");
        }
        setLoading(false);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            const url = await uploadService.uploadFile(file);
            setData({ ...data, imageUrl: url });
        } catch (error) {
            console.error("Failed to upload image", error);
            alert("Erro ao enviar imagem");
        } finally {
            setUploadingImage(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <Card className="w-full max-w-lg shadow-2xl relative">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold tracking-tight">{initialData ? 'Editar Veículo' : 'Anunciar Veículo'}</h2>
                        <p className="text-sm text-slate-500">{initialData ? 'Atualize os detalhes do seu veículo.' : 'Insira os detalhes para disponibilizar seu carro.'}</p>
                    </div>
                    <Button variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-slate-500">Marca</label>
                            <Input placeholder="Ex: Porsche" value={data.brand} onChange={e => setData({ ...data, brand: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-slate-500">Modelo</label>
                            <Input placeholder="Ex: 911" value={data.model} onChange={e => setData({ ...data, model: e.target.value })} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-slate-500">Ano</label>
                        <Input placeholder="Ex: 2024" type="number" value={data.year} onChange={e => setData({ ...data, year: Number(e.target.value) })} />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-slate-500">Foto</label>
                        <div
                            onClick={() => document.getElementById('car-image-upload')?.click()}
                            className="flex items-center gap-2 p-2 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-50 transition-colors"
                        >
                            <div className="h-10 w-10 bg-slate-100 rounded flex items-center justify-center overflow-hidden shrink-0">
                                {uploadingImage ? (
                                    <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                                ) : data.imageUrl ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img src={data.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                                ) : (
                                    <UploadIcon className="w-4 h-4 text-slate-400" />
                                )}
                            </div>
                            <span className="text-sm text-slate-500 truncate flex-1">
                                {uploadingImage ? 'Enviando...' : data.imageUrl ? 'Imagem selecionada' : 'Clique para enviar foto'}
                            </span>
                            <input
                                id="car-image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                                disabled={uploadingImage}
                            />
                        </div>
                    </div>

                    <Button variant="outline" className="w-full gap-2 border-indigo-100 bg-indigo-50/50 text-indigo-700 hover:bg-indigo-50" onClick={handleAi} disabled={loading || uploadingImage}>
                        <Wand2 className="w-4 h-4" />
                        {loading ? 'Analisando mercado...' : 'Otimizar com IA'}
                    </Button>

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-slate-500">Descrição</label>
                        <textarea
                            className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
                            value={data.description}
                            onChange={e => setData({ ...data, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-slate-500">Preço ($)</label>
                            <Input 
                                type="number" 
                                min="0"
                                value={data.price} 
                                onChange={e => setData({ ...data, price: Number(e.target.value) })} 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-slate-500">Localização</label>
                            <Input placeholder="Cidade, UF" value={data.location} onChange={e => setData({ ...data, location: e.target.value })} />
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-slate-100 flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button 
                        onClick={() => {
                            const { price, ...rest } = data;
                            onSubmit({ ...rest, pricePerDay: Number(price) });
                        }} 
                        className="gap-2"
                        disabled={uploadingImage || loading}
                    >
                        {initialData ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        {initialData ? 'Salvar Alterações' : 'Publicar Anúncio'}
                    </Button>
                </div>
            </Card>
        </div>
    );
};