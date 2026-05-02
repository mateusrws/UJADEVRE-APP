import { useState, useEffect } from 'react';
import { Users, UserPlus, Trash2, Shield, User as UserIcon, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { Congregation } from '../types/Congregation/CongregationInterface';
import { fetchCongregations } from '../api/Congregation/congregationService';
import { createAddress } from '../api/Address/addressService';

// TODO: Replace addUser() and removeUser() from AuthContext with direct calls to
//   createUser() and deleteUser() from userService.ts
// TODO: After backend integration, refresh the users list from the server instead of
//   relying on local context state

const EMPTY_FORM = {
    user_name: '',
    user_email: '',
    user_tel: '',
    user_bio: '',
    user_data_nasc: '',
    user_senha: '',
    con_id: '',
    // address fields
    add_rua: '',
    add_comp: '',
    add_bairro: '',
    add_cidade: '',
    add_uf: '',
    add_cep: '',
};

export function AdminPanel() {
    const { users, addUser, removeUser } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [congregations, setCongregations] = useState<Congregation[]>([]);
    const [form, setForm] = useState(EMPTY_FORM);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchCongregations().then(setCongregations);
    }, []);

    const set = (field: keyof typeof EMPTY_FORM) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
            setForm(prev => ({ ...prev, [field]: e.target.value }));

    const handleOpen = () => {
        setForm(EMPTY_FORM);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setForm(EMPTY_FORM);
        setIsModalOpen(false);
    };

    const handleCreateUser = async () => {
        const { user_name, user_email, user_tel, user_data_nasc, user_senha, con_id,
                add_rua, add_bairro, add_cidade, add_uf, add_cep } = form;

        if (!user_name.trim() || !user_email.trim() || !user_tel.trim() ||
            !user_data_nasc.trim() || !user_senha.trim() || !con_id ||
            !add_rua.trim() || !add_bairro.trim() || !add_cidade.trim() ||
            !add_uf.trim() || !add_cep.trim()) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        if (users.some(u => u.user_email === user_email)) {
            alert('Já existe um usuário com este email!');
            return;
        }

        setIsSubmitting(true);
        try {
            // Create the address first, then link it to the user
            // TODO: When backend is ready, this will be a single POST /users call
            //   that accepts nested address data, or the backend creates the address automatically
            const newAddress = await createAddress({
                add_rua: form.add_rua,
                add_comp: form.add_comp || null,
                add_bairro: form.add_bairro,
                add_cidade: form.add_cidade,
                add_uf: form.add_uf,
                add_cep: form.add_cep,
            });

            addUser({
                user_name,
                user_email,
                user_tel,
                user_bio: form.user_bio,
                user_foto_url: null,
                user_data_nasc,
                user_tipo: 'user',
                con_id,
                end_id: newAddress.add_id,
            });

            handleClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteUser = (userId: string) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            removeUser(userId);
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-black p-2 rounded-xl">
                        <Users className="text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-semibold">Gerenciar Usuários</h1>
                </div>
                <button
                    onClick={handleOpen}
                    className="bg-black text-white px-4 py-3 rounded-xl hover:bg-gray-800 transition-all shadow-sm flex items-center gap-2"
                >
                    <UserPlus size={20} />
                    Novo Usuário
                </button>
            </div>

            {/* User list */}
            <div className="flex flex-col gap-3">
                {users.map((user) => (
                    <div key={user.user_id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-4">
                            <div className="bg-gray-100 p-3 rounded-xl">
                                {user.user_tipo === 'admin' ? (
                                    <Shield size={24} className="text-black" />
                                ) : (
                                    <UserIcon size={24} className="text-black" />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-black">{user.user_name}</h3>
                                    {user.user_tipo === 'admin' && (
                                        <span className="bg-black text-white text-xs px-2 py-1 rounded-full">Admin</span>
                                    )}
                                </div>
                                <div className="text-sm text-gray-600">{user.user_email}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {user.user_point} pontos • Membro desde {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                                </div>
                            </div>
                            {user.user_tipo !== 'admin' && (
                                <button
                                    onClick={() => handleDeleteUser(user.user_id)}
                                    className="p-2 hover:bg-red-50 rounded-xl transition-all text-red-600"
                                >
                                    <Trash2 size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Create user modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] flex flex-col">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="bg-black p-2 rounded-xl">
                                    <UserPlus className="text-white" size={20} />
                                </div>
                                <h2 className="text-xl font-semibold">Novo Usuário</h2>
                            </div>
                            <button
                                onClick={handleClose}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Scrollable body */}
                        <div className="overflow-y-auto flex-1 p-6 flex flex-col gap-6">

                            {/* Section: Personal data */}
                            <section>
                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                                    Dados Pessoais
                                </h3>
                                <div className="flex flex-col gap-4">
                                    <Field label="Nome Completo *">
                                        <input type="text" value={form.user_name} onChange={set('user_name')}
                                            placeholder="Ex: Maria Silva" className={inputCls} />
                                    </Field>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Field label="Email *">
                                            <input type="email" value={form.user_email} onChange={set('user_email')}
                                                placeholder="maria@email.com" className={inputCls} />
                                        </Field>
                                        <Field label="Telefone *">
                                            <input type="tel" value={form.user_tel} onChange={set('user_tel')}
                                                placeholder="(11) 99999-9999" className={inputCls} />
                                        </Field>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Field label="Data de Nascimento *">
                                            <input type="date" value={form.user_data_nasc} onChange={set('user_data_nasc')}
                                                className={inputCls} />
                                        </Field>
                                        <Field label="Senha *">
                                            <input type="password" value={form.user_senha} onChange={set('user_senha')}
                                                placeholder="••••••••" className={inputCls} />
                                        </Field>
                                    </div>
                                    <Field label="Bio">
                                        <textarea value={form.user_bio} onChange={set('user_bio')}
                                            placeholder="Breve descrição..." rows={2}
                                            className={`${inputCls} resize-none`} />
                                    </Field>
                                </div>
                            </section>

                            {/* Section: Congregation */}
                            <section>
                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                                    Congregação
                                </h3>
                                <Field label="Congregação *">
                                    <div className="relative">
                                        <select value={form.con_id} onChange={set('con_id')}
                                            className={`${inputCls} appearance-none pr-10`}>
                                            <option value="">Selecione uma congregação</option>
                                            {congregations.map(c => (
                                                <option key={c.con_id} value={c.con_id}>{c.con_name}</option>
                                            ))}
                                        </select>
                                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </Field>
                            </section>

                            {/* Section: Address */}
                            <section>
                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                                    Endereço do Usuário
                                </h3>
                                <div className="flex flex-col gap-4">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="col-span-2">
                                            <Field label="Rua *">
                                                <input type="text" value={form.add_rua} onChange={set('add_rua')}
                                                    placeholder="Ex: Rua das Flores" className={inputCls} />
                                            </Field>
                                        </div>
                                        <Field label="Complemento">
                                            <input type="text" value={form.add_comp} onChange={set('add_comp')}
                                                placeholder="Apto 12" className={inputCls} />
                                        </Field>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Field label="Bairro *">
                                            <input type="text" value={form.add_bairro} onChange={set('add_bairro')}
                                                placeholder="Centro" className={inputCls} />
                                        </Field>
                                        <Field label="CEP *">
                                            <input type="text" value={form.add_cep} onChange={set('add_cep')}
                                                placeholder="00000-000" className={inputCls} />
                                        </Field>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="col-span-2">
                                            <Field label="Cidade *">
                                                <input type="text" value={form.add_cidade} onChange={set('add_cidade')}
                                                    placeholder="São Paulo" className={inputCls} />
                                            </Field>
                                        </div>
                                        <Field label="UF *">
                                            <input type="text" value={form.add_uf} onChange={set('add_uf')}
                                                placeholder="SP" maxLength={2}
                                                className={`${inputCls} uppercase`} />
                                        </Field>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Modal footer */}
                        <div className="flex gap-3 p-6 border-t border-gray-100">
                            <button onClick={handleClose}
                                className="flex-1 bg-white text-black border-2 border-black py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-all">
                                Cancelar
                            </button>
                            <button onClick={handleCreateUser} disabled={isSubmitting}
                                className="flex-1 bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-sm disabled:opacity-50">
                                {isSubmitting ? 'Criando...' : 'Criar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Small helper components to keep the form DRY
const inputCls = 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="text-sm text-gray-600 mb-1.5 block">{label}</label>
            {children}
        </div>
    );
}
