import { User, Mail, Phone, Calendar, Edit2, Camera, LogOut, MapPin, Home, Map } from 'lucide-react'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useAuth } from '../contexts/AuthContext'
import { userService } from '../services/userService'
import { addressService, type Address } from '../services/addressService'

export function Profile() {
    const { currentUser, logout, refreshUser } = useAuth()

    // ── User section state ──────────────────────────────────────────────────
    const [isEditingUser, setIsEditingUser] = useState(false)
    const [isSavingUser, setIsSavingUser] = useState(false)
    const [editedName, setEditedName] = useState('')
    const [editedEmail, setEditedEmail] = useState('')
    const [editedTel, setEditedTel] = useState('')
    const [editedBio, setEditedBio] = useState('')
    const [previewImage, setPreviewImage] = useState<string | null>(null)

    // ── Address section state ───────────────────────────────────────────────
    const [isEditingAddress, setIsEditingAddress] = useState(false)
    const [isSavingAddress, setIsSavingAddress] = useState(false)
    const [isLoadingAddress, setIsLoadingAddress] = useState(false)
    const [address, setAddress] = useState<Address | null>(null)
    const [editedRua, setEditedRua] = useState('')
    const [editedNumber, setEditedNumber] = useState('')
    const [editedComp, setEditedComp] = useState('')
    const [editedBairro, setEditedBairro] = useState('')
    const [editedCidade, setEditedCidade] = useState('')
    const [editedUf, setEditedUf] = useState('')
    const [editedCep, setEditedCep] = useState('')

    // Sync user fields when currentUser changes
    useEffect(() => {
        if (currentUser) {
            setEditedName(currentUser.user_name)
            setEditedEmail(currentUser.user_email)
            setEditedTel(currentUser.user_tel)
            setEditedBio(currentUser.user_bio ?? '')
        }
    }, [currentUser])

    // Fetch address by end_id
    useEffect(() => {
        if (!currentUser?.end_id) return
        setIsLoadingAddress(true)
        addressService
            .getById(currentUser.end_id)
            .then((addr) => {
                setAddress(addr)
                syncAddressFields(addr)
            })
            .catch(() => setAddress(null))
            .finally(() => setIsLoadingAddress(false))
    }, [currentUser?.end_id])

    const syncAddressFields = (addr: Address) => {
        setEditedRua(addr.add_rua)
        setEditedNumber(addr.add_number)
        setEditedComp(addr.add_comp ?? '')
        setEditedBairro(addr.add_bairro)
        setEditedCidade(addr.add_cidade)
        setEditedUf(addr.add_uf)
        setEditedCep(addr.add_cep)
    }

    // ── Handlers: User ──────────────────────────────────────────────────────
    const handleSaveUser = async () => {
        if (!currentUser) return
        setIsSavingUser(true)
        try {
            // PUT /user/:id
            await userService.update(currentUser.user_id, {
                user_name: editedName,
                user_email: editedEmail,
                user_tel: editedTel,
                user_desc: editedBio || 'Membro da comunidade',
                user_foto_url: previewImage || currentUser.user_foto_url || undefined,
            })
            await refreshUser()
            setPreviewImage(null)
            setIsEditingUser(false)
            Swal.fire({ icon: 'success', title: 'Dados pessoais atualizados!', timer: 1500, showConfirmButton: false })
        } catch (err: any) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: err?.response?.data?.message || 'Não foi possível atualizar os dados pessoais',
                confirmButtonColor: '#000',
            })
        } finally {
            setIsSavingUser(false)
        }
    }

    const handleCancelUser = () => {
        if (currentUser) {
            setEditedName(currentUser.user_name)
            setEditedEmail(currentUser.user_email)
            setEditedTel(currentUser.user_tel)
            setEditedBio(currentUser.user_bio ?? '')
        }
        setPreviewImage(null)
        setIsEditingUser(false)
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setPreviewImage(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    // ── Handlers: Address ───────────────────────────────────────────────────
    const handleSaveAddress = async () => {
        if (!address) return
        setIsSavingAddress(true)
        try {
            const updated = await addressService.getByObject({
                add_rua: editedRua,
                add_number: editedNumber,
                add_comp: editedComp || undefined,
                add_bairro: editedBairro,
                add_cidade: editedCidade,
                add_uf: editedUf,
                add_cep: editedCep,
            })
            setAddress(updated)
            setIsEditingAddress(false)
            Swal.fire({ icon: 'success', title: 'Endereço atualizado!', timer: 1500, showConfirmButton: false })
        } catch (err: any) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: err?.response?.data?.message || 'Não foi possível atualizar o endereço',
                confirmButtonColor: '#000',
            })
        } finally {
            setIsSavingAddress(false)
        }
    }

    const handleCancelAddress = () => {
        if (address) syncAddressFields(address)
        setIsEditingAddress(false)
    }

    // ── Logout ──────────────────────────────────────────────────────────────
    const handleLogout = async () => {
        const result = await Swal.fire({
            icon: 'question',
            title: 'Sair?',
            text: 'Deseja encerrar sua sessão?',
            showCancelButton: true,
            confirmButtonColor: '#000',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sim, sair',
            cancelButtonText: 'Cancelar',
        })
        if (result.isConfirmed) logout()
    }

    if (!currentUser) return null

    const avatarSrc = previewImage || currentUser.user_foto_url

    return (
        <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-full">

            {/* ── Page header ── */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-black p-2 rounded-xl">
                        <User className="text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-semibold">Perfil</h1>
                </div>
                <button
                    onClick={handleLogout}
                    className="p-3 hover:bg-red-50 rounded-xl transition-all text-red-600"
                >
                    <LogOut size={20} />
                </button>
            </div>

            {/* ══════════════════════════════════════════════════════════════
                SECTION 1 — Dados Pessoais  →  PUT /user/:id
            ══════════════════════════════════════════════════════════════ */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">

                {/* Section header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <User size={18} className="text-black" />
                        <h2 className="text-base font-semibold">Dados Pessoais</h2>
                    </div>
                    {!isEditingUser && (
                        <button
                            onClick={() => setIsEditingUser(true)}
                            className="p-2 hover:bg-gray-100 rounded-xl transition-all"
                            title="Editar dados pessoais"
                        >
                            <Edit2 size={18} className="text-black" />
                        </button>
                    )}
                </div>

                {/* Avatar + points */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                        {avatarSrc ? (
                            <img
                                src={avatarSrc}
                                alt="Avatar"
                                className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-gray-100"
                            />
                        ) : (
                            <div className="bg-gray-100 p-7 rounded-full mb-4">
                                <User size={44} className="text-black" />
                            </div>
                        )}
                        {isEditingUser && (
                            <label className="absolute bottom-4 right-0 bg-black text-white p-2.5 rounded-full cursor-pointer hover:bg-gray-800 transition-all shadow-lg">
                                <Camera size={18} />
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                        )}
                    </div>
                    <div className="bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium">
                        {currentUser.user_point} pontos
                    </div>
                </div>

                {/* Fields */}
                <div className="flex flex-col gap-4">

                    {/* Name */}
                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                            <User size={13} /> Nome
                        </label>
                        {isEditingUser ? (
                            <input
                                type="text"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        ) : (
                            <p className="font-semibold text-black text-lg">{currentUser.user_name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                            <Mail size={13} /> Email
                        </label>
                        {isEditingUser ? (
                            <input
                                type="email"
                                value={editedEmail}
                                onChange={(e) => setEditedEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        ) : (
                            <p className="font-medium text-black">{currentUser.user_email}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                            <Phone size={13} /> Telefone
                        </label>
                        {isEditingUser ? (
                            <input
                                type="tel"
                                value={editedTel}
                                onChange={(e) => setEditedTel(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        ) : (
                            <p className="font-medium text-black">{currentUser.user_tel}</p>
                        )}
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wide mb-1.5 block">Bio</label>
                        {isEditingUser ? (
                            <textarea
                                value={editedBio}
                                onChange={(e) => setEditedBio(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        ) : (
                            <p className="text-gray-600 leading-relaxed">{currentUser.user_bio || '—'}</p>
                        )}
                    </div>

                    {/* Member since — always read-only */}
                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                            <Calendar size={13} /> Membro desde
                        </label>
                        <p className="font-medium text-black">
                            {new Date(currentUser.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                    </div>
                </div>

                {/* User section action buttons */}
                {isEditingUser && (
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={handleSaveUser}
                            disabled={isSavingUser}
                            className="flex-1 bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-sm disabled:opacity-60"
                        >
                            {isSavingUser ? (
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto block" />
                            ) : (
                                'Salvar dados pessoais'
                            )}
                        </button>
                        <button
                            onClick={handleCancelUser}
                            className="flex-1 bg-white text-black border-2 border-black py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-all"
                        >
                            Cancelar
                        </button>
                    </div>
                )}
            </div>

            {/* ══════════════════════════════════════════════════════════════
                SECTION 2 — Endereço  →  PUT /address/:id
            ══════════════════════════════════════════════════════════════ */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">

                {/* Section header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-black" />
                        <h2 className="text-base font-semibold">Endereço</h2>
                    </div>
                    {!isEditingAddress && address && (
                        <button
                            onClick={() => setIsEditingAddress(true)}
                            className="p-2 hover:bg-gray-100 rounded-xl transition-all"
                            title="Editar endereço"
                        >
                            <Edit2 size={18} className="text-black" />
                        </button>
                    )}
                </div>

                {isLoadingAddress ? (
                    <div className="flex items-center gap-2 text-sm text-gray-400 py-2">
                        <span className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                        Carregando endereço...
                    </div>

                ) : !isEditingAddress ? (
                    /* ── View mode ── */
                    address ? (
                        <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm text-gray-700">
                            <div className="flex items-start gap-2">
                                <Home size={15} className="text-gray-400 mt-0.5 shrink-0" />
                                <span>
                                    {address.add_rua}, {address.add_number}
                                    {address.add_comp ? ` — ${address.add_comp}` : ''}
                                </span>
                            </div>
                            <div className="flex items-start gap-2">
                                <Map size={15} className="text-gray-400 mt-0.5 shrink-0" />
                                <span>
                                    {address.add_bairro}, {address.add_cidade} — {address.add_uf}
                                </span>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin size={15} className="text-gray-400 mt-0.5 shrink-0" />
                                <span>CEP: {address.add_cep}</span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm">Endereço não cadastrado</p>
                    )

                ) : (
                    /* ── Edit mode ── */
                    <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2">
                                <label className="text-xs text-gray-500 mb-1 block">Rua / Logradouro</label>
                                <input
                                    type="text"
                                    value={editedRua}
                                    onChange={(e) => setEditedRua(e.target.value)}
                                    placeholder="Ex: Rua das Flores"
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Número</label>
                                <input
                                    type="text"
                                    value={editedNumber}
                                    onChange={(e) => setEditedNumber(e.target.value)}
                                    placeholder="123"
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Complemento (opcional)</label>
                            <input
                                type="text"
                                value={editedComp}
                                onChange={(e) => setEditedComp(e.target.value)}
                                placeholder="Apto 12, Bloco B"
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Bairro</label>
                                <input
                                    type="text"
                                    value={editedBairro}
                                    onChange={(e) => setEditedBairro(e.target.value)}
                                    placeholder="Centro"
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">CEP</label>
                                <input
                                    type="text"
                                    value={editedCep}
                                    onChange={(e) => setEditedCep(e.target.value)}
                                    placeholder="00000-000"
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2">
                                <label className="text-xs text-gray-500 mb-1 block">Cidade</label>
                                <input
                                    type="text"
                                    value={editedCidade}
                                    onChange={(e) => setEditedCidade(e.target.value)}
                                    placeholder="São Paulo"
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">UF</label>
                                <input
                                    type="text"
                                    value={editedUf}
                                    onChange={(e) => setEditedUf(e.target.value.toUpperCase().slice(0, 2))}
                                    placeholder="SP"
                                    maxLength={2}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                        </div>

                        {/* Address section action buttons */}
                        <div className="flex gap-3 mt-2">
                            <button
                                onClick={handleSaveAddress}
                                disabled={isSavingAddress}
                                className="flex-1 bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-sm disabled:opacity-60"
                            >
                                {isSavingAddress ? (
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto block" />
                                ) : (
                                    'Salvar endereço'
                                )}
                            </button>
                            <button
                                onClick={handleCancelAddress}
                                className="flex-1 bg-white text-black border-2 border-black py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-all"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}
