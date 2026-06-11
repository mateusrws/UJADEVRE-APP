import { Users, UserPlus, Trash2, Shield, User as UserIcon, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { userService, type User } from '../services/userService'
import { congregationService, type Congregation } from '../services/congregationService'
import { addressService } from '../services/addressService'

export function AdminPanel() {
    console.log('🎯 AdminPanel component mounted')

    const [users, setUsers] = useState<User[]>([])
    const [congregations, setCongregations] = useState<Congregation[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    // Form state
    const [newUserName, setNewUserName] = useState('')
    const [newUserEmail, setNewUserEmail] = useState('')
    const [newUserPassword, setNewUserPassword] = useState('')
    const [newUserPhone, setNewUserPhone] = useState('')
    const [newUserCpf, setNewUserCpf] = useState('')
    const [newUserBirthDate, setNewUserBirthDate] = useState('')
    const [newUserDesc, setNewUserDesc] = useState('')
    const [selectedCongregation, setSelectedCongregation] = useState('')

    // Address form state
    const [newUserStreet, setNewUserStreet] = useState('')
    const [newUserNumber, setNewUserNumber] = useState('')
    const [newUserComplement, setNewUserComplement] = useState('')
    const [newUserNeighborhood, setNewUserNeighborhood] = useState('')
    const [newUserCity, setNewUserCity] = useState('')
    const [newUserState, setNewUserState] = useState('')
    const [newUserZipCode, setNewUserZipCode] = useState('')

    const fetchUsers = async () => {
        try {
            const data = await userService.getAll()
            setUsers(data)
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Não foi possível carregar os usuários',
                confirmButtonColor: '#000',
            })
        } finally {
            setIsLoading(false)
        }
    }

    const fetchCongregations = async () => {
        try {
            console.log('🔄 Fetching congregations from API...')
            const data = await congregationService.getAll()
            console.log('✅ Congregations received:', data)
            setCongregations(data)
            // Set first congregation as default if none selected
            if (data.length > 0) {
                console.log('✅ Setting first congregation as default:', data[0]._con_id)
                setSelectedCongregation(data[0]._con_id)
            } else {
                console.warn('⚠️ No congregations found - API returned empty array')
            }
        } catch (error: any) {
            console.error('❌ Error fetching congregations:', error)
            console.error('❌ Error details:', {
                message: error?.message,
                response: error?.response?.data,
                status: error?.response?.status,
                url: error?.config?.url,
            })
            Swal.fire({
                icon: 'error',
                title: 'Erro ao carregar congregações',
                text: error?.response?.data?.message || 'Não foi possível carregar as congregações',
                confirmButtonColor: '#000',
            })
        }
    }

    useEffect(() => {
        console.log('🔄 useEffect running - fetching users and congregations')
        fetchUsers()
        fetchCongregations()
    }, [])

    const resetForm = () => {
        setNewUserName('')
        setNewUserEmail('')
        setNewUserPassword('')
        setNewUserPhone('')
        setNewUserCpf('')
        setNewUserBirthDate('')
        setNewUserDesc('')
        setNewUserStreet('')
        setNewUserNumber('')
        setNewUserComplement('')
        setNewUserNeighborhood('')
        setNewUserCity('')
        setNewUserState('')
        setNewUserZipCode('')
        // Reset to first congregation
        if (congregations.length > 0) {
            setSelectedCongregation(congregations[0]._con_id)
        }
    }

    const handleCreateUser = async () => {
        if (
            !newUserName.trim() ||
            !newUserEmail.trim() ||
            !newUserPassword.trim() ||
            !newUserPhone.trim() ||
            !newUserCpf.trim() ||
            !newUserBirthDate ||
            !selectedCongregation ||
            !newUserStreet.trim() ||
            !newUserNumber.trim() ||
            !newUserNeighborhood.trim() ||
            !newUserCity.trim() ||
            !newUserState.trim() ||
            !newUserZipCode.trim()
        ) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos obrigatórios',
                text: 'Por favor, preencha todos os campos obrigatórios!',
                confirmButtonColor: '#000',
            })
            return
        }

        if (users.some((u) => u.user_email === newUserEmail)) {
            Swal.fire({
                icon: 'warning',
                title: 'Email já cadastrado',
                text: 'Já existe um usuário com este email!',
                confirmButtonColor: '#000',
            })
            return
        }

        setIsSaving(true)
        try {
            // Step 1: Create address for the user if not exist
            const address = await addressService.getByObject({
                add_bairro: newUserNeighborhood,
                add_cidade: newUserCity,
                add_uf: newUserState,
                add_cep: newUserZipCode,
                add_rua: newUserStreet,
                add_number: newUserNumber,
                add_comp: newUserComplement || undefined,
            })
            console.log('🔍 Address search result:', address)
            if(!address) {
                console.log('📍 Creating address...')
                const address = await addressService.create({
                    add_rua: newUserStreet,
                    add_bairro: newUserNeighborhood,
                    add_cidade: newUserCity,
                    add_uf: newUserState,
                    add_cep: newUserZipCode,
                    add_number: newUserNumber,
                    add_comp: newUserComplement || undefined,
                })
                console.log('✅ Address created:', address._add_id)
            }

            // Step 2: Use selected congregation
            console.log('✅ Using selected congregation:', selectedCongregation)

            // Step 3: Create user with address ID and selected congregation
            console.log('👤 Creating user with end_id:', address._add_id, 'and con_id:', selectedCongregation)

            await userService.create({
                user_name: newUserName,
                user_email: newUserEmail,
                user_senha: newUserPassword,
                user_tel: newUserPhone,
                user_cpf: newUserCpf,
                user_data_nasc: new Date(newUserBirthDate).toISOString(),
                // user_desc and user_foto_url are @IsNotEmpty() — must not be empty
                user_desc: newUserDesc.trim() || 'Membro da comunidade',
                user_foto_url: 'https://ujadevre.com/avatar-default.png',
                user_tipo: 'ADOLESCENTE',
                con_id: selectedCongregation,
                end_id: address._add_id,
            })
            console.log('✅ User created successfully')

            await fetchUsers() // Refresh list from server
            setIsModalOpen(false)
            resetForm()
            Swal.fire({
                icon: 'success',
                title: 'Usuário criado!',
                text: 'Endereço e usuário cadastrados com sucesso',
                timer: 2000,
                showConfirmButton: false
            })
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                (Array.isArray(err?.response?.data?.message)
                    ? err.response.data.message.join(', ')
                    : null) ||
                err?.message ||
                'Não foi possível criar o usuário'

            // Check if error occurred during address creation
            const msgStr = String(msg || '')
            const isAddressError = msgStr.toLowerCase().includes('endereço') ||
                msgStr.toLowerCase().includes('address') ||
                msgStr.toLowerCase().includes('cep') ||
                msgStr.toLowerCase().includes('rua')

            Swal.fire({
                icon: 'error',
                title: isAddressError ? 'Erro ao criar endereço' : 'Erro ao criar usuário',
                text: msg,
                confirmButtonColor: '#000'
            })
        } finally {
            setIsSaving(false)
        }
    }

    const handleDeleteUser = async (user_id: string) => {
        const result = await Swal.fire({
            icon: 'warning',
            title: 'Excluir usuário?',
            text: 'Esta ação não pode ser desfeita.',
            showCancelButton: true,
            confirmButtonColor: '#000',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sim, excluir',
            cancelButtonText: 'Cancelar',
        })
        if (!result.isConfirmed) return

        try {
            await userService.delete(user_id)
            setUsers((prev) => prev.filter((u) => u.user_id !== user_id))
            Swal.fire({ icon: 'success', title: 'Usuário excluído!', timer: 1500, showConfirmButton: false })
        } catch (err: any) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: err?.response?.data?.message || 'Não foi possível excluir o usuário',
                confirmButtonColor: '#000',
            })
        }
    }

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
                    onClick={() => setIsModalOpen(true)}
                    className="bg-black text-white px-4 py-3 rounded-xl hover:bg-gray-800 transition-all shadow-sm flex items-center gap-2"
                >
                    <UserPlus size={20} />
                    Novo Usuário
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <span className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
                </div>
            ) : users.length === 0 ? (
                <div className="text-center text-gray-500 py-12">Nenhum usuário encontrado</div>
            ) : (
                <div className="flex flex-col gap-3">
                    {users.map((user) => (
                        <div
                            key={user.user_id}
                            className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
                        >
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
                                            <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                                                Admin
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-600">{user.user_email}</div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {user.user_point} pontos • Membro desde{' '}
                                        {new Date(user.createdAt).toLocaleDateString('pt-BR')}
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
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[90vh]">
                        {/* Header - Fixed */}
                        <div className="flex items-center justify-between p-6 border-b">
                            <div className="flex items-center gap-3">
                                <div className="bg-black p-2 rounded-xl">
                                    <UserPlus className="text-white" size={20} />
                                </div>
                                <h2 className="text-xl font-semibold">Novo Usuário</h2>
                            </div>
                            <button
                                onClick={() => { setIsModalOpen(false); resetForm() }}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="text-sm text-gray-600 mb-2 block">Nome Completo *</label>
                                    <input
                                        type="text"
                                        value={newUserName}
                                        onChange={(e) => setNewUserName(e.target.value)}
                                        placeholder="Ex: Maria Silva"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600 mb-2 block">Email *</label>
                                    <input
                                        type="email"
                                        value={newUserEmail}
                                        onChange={(e) => setNewUserEmail(e.target.value)}
                                        placeholder="Ex: maria@email.com"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600 mb-2 block">Congregação *</label>
                                    <select
                                        value={selectedCongregation}
                                        onChange={(e) => {
                                            console.log('📝 Congregation selected:', e.target.value)
                                            setSelectedCongregation(e.target.value)
                                        }}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
                                    >
                                        <option value="">Selecione uma congregação</option>
                                        {congregations.length === 0 ? (
                                            <option disabled>Carregando congregações...</option>
                                        ) : (
                                            congregations.map((cong) => {
                                                console.log('🏛️ Rendering congregation option:', cong.props.con_name, cong._con_id)
                                                return (
                                                    <option key={cong._con_id} value={cong._con_id}>
                                                        {cong.props.con_name}
                                                    </option>
                                                )
                                            })
                                        )}
                                    </select>
                                    {congregations.length === 0 && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Nenhuma congregação encontrada. Crie uma congregação primeiro.
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-400 mt-1">
                                        Total de congregações: {congregations.length}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600 mb-2 block">Senha *</label>
                                    <input
                                        type="password"
                                        value={newUserPassword}
                                        onChange={(e) => setNewUserPassword(e.target.value)}
                                        placeholder="Mínimo 6 caracteres"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600 mb-2 block">Telefone * (formato internacional: +5511999999999)</label>
                                    <input
                                        type="tel"
                                        value={newUserPhone}
                                        onChange={(e) => setNewUserPhone(e.target.value)}
                                        placeholder="+5511999999999"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600 mb-2 block">CPF *</label>
                                    <input
                                        type="text"
                                        value={newUserCpf}
                                        onChange={(e) => setNewUserCpf(e.target.value)}
                                        placeholder="000.000.000-00"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600 mb-2 block">Data de Nascimento *</label>
                                    <input
                                        type="date"
                                        value={newUserBirthDate}
                                        onChange={(e) => setNewUserBirthDate(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600 mb-2 block">Descrição / Bio</label>
                                    <input
                                        type="text"
                                        value={newUserDesc}
                                        onChange={(e) => setNewUserDesc(e.target.value)}
                                        placeholder="Ex: Membro ativo da comunidade"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>

                                {/* Address Section */}
                                <div className="border-t pt-4 mt-2">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Endereço</h3>

                                    <div className="grid grid-cols-3 gap-3 mb-3">
                                        <div className="col-span-2">
                                            <label className="text-sm text-gray-600 mb-2 block">Rua / Logradouro *</label>
                                            <input
                                                type="text"
                                                value={newUserStreet}
                                                onChange={(e) => setNewUserStreet(e.target.value)}
                                                placeholder="Ex: Rua das Flores"
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600 mb-2 block">Número *</label>
                                            <input
                                                type="text"
                                                value={newUserNumber}
                                                onChange={(e) => setNewUserNumber(e.target.value)}
                                                placeholder="123"
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="text-sm text-gray-600 mb-2 block">Complemento</label>
                                        <input
                                            type="text"
                                            value={newUserComplement}
                                            onChange={(e) => setNewUserComplement(e.target.value)}
                                            placeholder="Apto, Sala, Bloco..."
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <div>
                                            <label className="text-sm text-gray-600 mb-2 block">Bairro *</label>
                                            <input
                                                type="text"
                                                value={newUserNeighborhood}
                                                onChange={(e) => setNewUserNeighborhood(e.target.value)}
                                                placeholder="Centro"
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600 mb-2 block">CEP *</label>
                                            <input
                                                type="text"
                                                value={newUserZipCode}
                                                onChange={(e) => setNewUserZipCode(e.target.value)}
                                                placeholder="00000-000"
                                                maxLength={9}
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="col-span-2">
                                            <label className="text-sm text-gray-600 mb-2 block">Cidade *</label>
                                            <input
                                                type="text"
                                                value={newUserCity}
                                                onChange={(e) => setNewUserCity(e.target.value)}
                                                placeholder="São Paulo"
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600 mb-2 block">UF *</label>
                                            <input
                                                type="text"
                                                value={newUserState}
                                                onChange={(e) => setNewUserState(e.target.value.toUpperCase().slice(0, 2))}
                                                placeholder="SP"
                                                maxLength={2}
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer - Fixed */}
                        <div className="p-6 border-t bg-white">
                            <div className="flex gap-3">
                                <button
                                    onClick={() => { setIsModalOpen(false); resetForm() }}
                                    className="flex-1 bg-white text-black border-2 border-black py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleCreateUser}
                                    disabled={isSaving}
                                    className="flex-1 bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-sm disabled:opacity-60"
                                >
                                    {isSaving ? (
                                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto block" />
                                    ) : (
                                        'Criar'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
