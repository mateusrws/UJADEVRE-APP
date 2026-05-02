import { User, Mail, Phone, Calendar, Edit2, Camera, LogOut, MapPin, Users, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import type { Address } from '../types/Address/AddressInterface';
import type { Congregation } from '../types/Congregation/CongregationInterface';

// TODO: Fetch congregation and address from the backend using con_id and end_id
// TODO: GET /congregations/:id and GET /addresses/:id (or include them in the user response)

export function Profile() {
    const { currentUser, updateCurrentUser, logout } = useAuth();
    const [user, setUser] = useState(currentUser!);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // TODO: Replace with real data fetched from the backend
    const [congregation] = useState<Congregation | null>(null);
    const [address] = useState<Address | null>(null);

    useEffect(() => {
        if (currentUser) {
            setUser(currentUser);
            setEditedUser(currentUser);
        }
    }, [currentUser]);

    const handleSave = () => {
        updateCurrentUser(editedUser);
        setUser(editedUser);
        setPreviewImage(null);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedUser(user);
        setPreviewImage(null);
        setIsEditing(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setPreviewImage(result);
                setEditedUser({ ...editedUser, user_foto_url: result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-black p-2 rounded-xl">
                        <User className="text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-semibold">Perfil</h1>
                </div>
                <div className="flex items-center gap-2">
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-3 hover:bg-white rounded-xl transition-all"
                        >
                            <Edit2 size={20} className="text-black" />
                        </button>
                    )}
                    <button
                        onClick={logout}
                        className="p-3 hover:bg-red-50 rounded-xl transition-all text-red-600"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
                {/* Avatar + points */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative group">
                        {(previewImage || editedUser.user_foto_url) ? (
                            <img
                                src={previewImage || editedUser.user_foto_url || ''}
                                alt="Avatar"
                                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-100"
                            />
                        ) : (
                            <div className="bg-gray-100 p-8 rounded-full mb-4">
                                <User size={48} className="text-black" />
                            </div>
                        )}
                        {isEditing && (
                            <label className="absolute bottom-4 right-0 bg-black text-white p-3 rounded-full cursor-pointer hover:bg-gray-800 transition-all shadow-lg">
                                <Camera size={20} />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                    <div className="bg-black text-white px-4 py-2 rounded-full font-medium">
                        {user.user_point} pontos
                    </div>
                </div>

                {/* Personal info */}
                <div className="flex flex-col gap-5">
                    {/* Name */}
                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-2 mb-2">
                            <User size={14} />
                            Nome
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedUser.user_name}
                                onChange={(e) => setEditedUser({ ...editedUser, user_name: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        ) : (
                            <div className="font-semibold text-black text-lg">{user.user_name}</div>
                        )}
                    </div>

                    {/* CPG (read-only — unique identifier) */}
                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-2 mb-2">
                            <CreditCard size={14} />
                            CPG
                        </label>
                        <div className="font-medium text-black">{user.user_cpg}</div>
                    </div>

                    {/* Email (read-only — unique) */}
                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-2 mb-2">
                            <Mail size={14} />
                            Email
                        </label>
                        <div className="font-medium text-black">{user.user_email}</div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-2 mb-2">
                            <Phone size={14} />
                            Telefone
                        </label>
                        {isEditing ? (
                            <input
                                type="tel"
                                value={editedUser.user_tel}
                                onChange={(e) => setEditedUser({ ...editedUser, user_tel: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        ) : (
                            <div className="font-medium text-black">{user.user_tel}</div>
                        )}
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">Bio</label>
                        {isEditing ? (
                            <textarea
                                value={editedUser.user_bio}
                                onChange={(e) => setEditedUser({ ...editedUser, user_bio: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-black"
                                rows={3}
                            />
                        ) : (
                            <div className="text-gray-600 leading-relaxed">{user.user_bio}</div>
                        )}
                    </div>

                    {/* Birth date (read-only) */}
                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-2 mb-2">
                            <Calendar size={14} />
                            Data de nascimento
                        </label>
                        <div className="font-medium text-black">
                            {new Date(user.user_data_nasc).toLocaleDateString('pt-BR')}
                        </div>
                    </div>

                    {/* Congregation */}
                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-2 mb-2">
                            <Users size={14} />
                            Congregação
                        </label>
                        <div className="font-medium text-black">
                            {congregation ? congregation.con_name : '—'}
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-2 mb-2">
                            <MapPin size={14} />
                            Endereço
                        </label>
                        {address ? (
                            <div className="font-medium text-black leading-relaxed">
                                {address.add_rua}{address.add_comp ? `, ${address.add_comp}` : ''}<br />
                                {address.add_bairro} — {address.add_cidade}/{address.add_uf}<br />
                                <span className="text-gray-500 text-sm">CEP {address.add_cep}</span>
                            </div>
                        ) : (
                            <div className="text-gray-400">—</div>
                        )}
                    </div>
                </div>

                {isEditing && (
                    <div className="flex gap-3 mt-8">
                        <button
                            onClick={handleSave}
                            className="flex-1 bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-sm"
                        >
                            Salvar
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex-1 bg-white text-black border-2 border-black py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-all"
                        >
                            Cancelar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
