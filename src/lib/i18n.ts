// Definição de tipos para as traduções
export type Language = 'pt' | 'en' | 'es';
type TranslationKey = keyof typeof translations.pt;

// Objeto de traduções
const translations = {
  pt: {
    // Navegação
    dashboard: 'Dashboard',
    tutors: 'Tutores',
    animals: 'Animais',
    vaccines: 'Vacinas',
    appointments: 'Agendamentos',
    grooming: 'Banho e Tosa',
    veterinarians: 'Veterinários',
    serviceTypes: 'Tipos de Serviços',
    products: 'Produtos',
    inventory: 'Estoque',
    purchases: 'Compras',
    accountsPayable: 'Contas a Pagar',
    accountsReceivable: 'Contas a Receber',
    cashFlow: 'Fluxo de Caixa',
    banks: 'Bancos',
    settings: 'Configurações',
    users: 'Usuários',
    profiles: 'Perfis',
    logout: 'Sair',
    
    // Ações
    add: 'Adicionar',
    addTutor: 'Adicionar Tutor',
    addAnimal: 'Adicionar Animal',
    edit: 'Editar',
    save: 'Salvar',
    cancel: 'Cancelar',
    delete: 'Excluir',
    search: 'Buscar',
    filter: 'Filtrar',
    export: 'Exportar',
    import: 'Importar',
    actions: 'Ações',
    downloadCard: 'Baixar Carteirinha',
    
    // Estados
    active: 'Ativo',
    inactive: 'Inativo',
    pending: 'Pendente',
    completed: 'Concluído',
    cancelled: 'Cancelado',
    
    // Campos
    name: 'Nome',
    animalName: 'Nome do Animal',
    tutorName: 'Nome do Tutor',
    email: 'E-mail',
    phone: 'Telefone',
    cpf: 'CPF',
    address: 'Endereço',
    street: 'Rua',
    number: 'Número',
    neighborhood: 'Bairro',
    city: 'Cidade',
    state: 'Estado',
    zipCode: 'CEP',
    date: 'Data',
    time: 'Hora',
    notes: 'Observações',
    species: 'Espécie',
    breed: 'Raça',
    age: 'Idade',
    sex: 'Sexo',
    weight: 'Peso',
    tutor: 'Tutor',
    
    // Espécies
    dog: 'Cão',
    cat: 'Gato',
    bird: 'Pássaro',
    rabbit: 'Coelho',
    hamster: 'Hamster',
    other: 'Outro',
    
    // Sexo
    male: 'Macho',
    female: 'Fêmea',
    
    // Mensagens
    success: 'Sucesso',
    error: 'Erro',
    warning: 'Atenção',
    info: 'Informação',
    
    // Dashboard
    totalTutors: 'Total de Tutores',
    totalAnimals: 'Total de Animais',
    totalAppointments: 'Total de Agendamentos',
    totalVaccines: 'Total de Vacinas',
    
    // Históricos
    vaccineHistory: 'Histórico de Vacinas',
    appointmentHistory: 'Histórico de Consultas',
    
    // Outros
    loading: 'Carregando...',
    noData: 'Nenhum dado encontrado',
    selectOption: 'Selecione uma opção',
    
    // Perfis de usuário
    admin: 'Administrador',
    veterinarian: 'Veterinário',
    receptionist: 'Recepcionista',
    manager: 'Gerente',
    
    // Novos campos
    rooms: 'Salas',
    surgicalRooms: 'Salas Cirúrgicas',
    breeds: 'Raças',
    profile: 'Perfil',
    permissions: 'Permissões',
    crmv: 'CRMV',
    userProfile: 'Perfil do Usuário',
    
    // Formulários
    tutorData: 'Dados do Tutor',
    personalData: 'Dados Pessoais',
    addressData: 'Dados de Endereço',
    contactData: 'Dados de Contato',
    
    // Perfis e Permissões
    newProfile: 'Novo Perfil',
    editProfile: 'Editar Perfil',
    profileName: 'Nome do Perfil',
    profileDescription: 'Descrição do Perfil',
    systemProfile: 'Perfil do Sistema',
    customProfile: 'Perfil Personalizado',
    profilePermissions: 'Permissões do Perfil',
    modulePermissions: 'Permissões por Módulo',
    read: 'Ler',
    write: 'Escrever',
    deletePermission: 'Excluir',
    
    // Novos textos para outras telas
    productCategories: 'Categorias de Produtos',
    categories: 'Categorias',
    newCategory: 'Nova Categoria',
    editCategory: 'Editar Categoria',
    categoryName: 'Nome da Categoria',
    categoryDescription: 'Descrição da Categoria',
    activeCategory: 'Categoria Ativa',
    searchCategories: 'Buscar categorias...',
    categoriesList: 'Lista de Categorias',
    newAccount: 'Nova Conta',
    editReceivableAccount: 'Editar Conta a Receber',
    newReceivableAccount: 'Nova Conta a Receber',
    client: 'Cliente',
    selectClient: 'Selecione o cliente',
    description: 'Descrição',
    amount: 'Valor',
    dueDate: 'Data de Vencimento',
    paymentMethod: 'Forma de Pagamento',
    selectPaymentMethod: 'Selecione a forma de pagamento',
    money: 'Dinheiro',
    card: 'Cartão',
    pix: 'PIX',
    transfer: 'Transferência',
    pending: 'Pendente',
    paid: 'Pago',
    overdue: 'Vencido',
    cancelled: 'Cancelado',
    totalReceivable: 'Total a Receber',
    totalReceived: 'Total Recebido',
    pendingAccounts: 'Contas Pendentes',
    receivableAccountsList: 'Lista de Contas a Receber',
    receive: 'Receber',
    filters: 'Filtros',
    startDate: 'Data Inicial',
    endDate: 'Data Final',
    type: 'Tipo',
    all: 'Todos',
    income: 'Entradas',
    expenses: 'Saídas',
    clearFilters: 'Limpar Filtros',
    totalIncome: 'Total Entradas',
    totalExpenses: 'Total Saídas',
    periodBalance: 'Saldo do Período',
    transactions: 'Transações',
    movements: 'Movimentações',
    entry: 'Entrada',
    exit: 'Saída',
    bankAccounts: 'Contas Bancárias',
    newBankAccount: 'Nova Conta Bancária',
    editBankAccount: 'Editar Conta Bancária',
    bank: 'Banco',
    agency: 'Agência',
    account: 'Conta',
    holder: 'Titular',
    accountType: 'Tipo de Conta',
    checkingAccount: 'Conta Corrente',
    savings: 'Poupança',
    businessAccount: 'Conta Empresarial',
    initialBalance: 'Saldo Inicial',
    activeAccount: 'Conta Ativa',
    totalBalance: 'Saldo Total',
    bankAccountsList: 'Lista de Contas Bancárias',
    balance: 'Saldo',
    
    // Dashboard specific
    todayAppointments: 'Agendamentos Hoje',
    lowStock: 'Estoque Baixo',
    pendingPayments: 'Pagamentos Pendentes',
    todayRevenue: 'Receita Hoje',
    overdueVaccines: 'Vacinas Atrasadas',
    
    // Appointments
    appointments: 'Agendamentos',
    appointmentDescription: 'Gestão de consultas e exames veterinários',
    appointmentsList: 'Lista de Agendamentos',
    appointmentsFound: 'agendamentos encontrados',
    newAppointment: 'Novo Agendamento',
    dateTime: 'Data/Hora',
    appointmentHistory: 'Histórico de Consultas',
    
    // Status
    scheduled: 'Agendado',
    completed: 'Realizado',
    cancelled: 'Cancelado',
    today: 'Hoje'
  },
  en: {
    // Navigation
    dashboard: 'Dashboard',
    tutors: 'Tutors',
    animals: 'Animals',
    vaccines: 'Vaccines',
    appointments: 'Appointments',
    grooming: 'Grooming',
    veterinarians: 'Veterinarians',
    serviceTypes: 'Service Types',
    products: 'Products',
    inventory: 'Inventory',
    purchases: 'Purchases',
    accountsPayable: 'Accounts Payable',
    accountsReceivable: 'Accounts Receivable',
    cashFlow: 'Cash Flow',
    banks: 'Banks',
    settings: 'Settings',
    users: 'Users',
    profiles: 'Profiles',
    logout: 'Logout',
    
    // Actions
    add: 'Add',
    addTutor: 'Add Tutor',
    addAnimal: 'Add Animal',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    import: 'Import',
    actions: 'Actions',
    downloadCard: 'Download Card',
    
    // States
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    completed: 'Completed',
    cancelled: 'Cancelled',
    
    // Fields
    name: 'Name',
    animalName: 'Animal Name',
    tutorName: 'Tutor Name',
    email: 'Email',
    phone: 'Phone',
    cpf: 'CPF',
    address: 'Address',
    street: 'Street',
    number: 'Number',
    neighborhood: 'Neighborhood',
    city: 'City',
    state: 'State',
    zipCode: 'Zip Code',
    date: 'Date',
    time: 'Time',
    notes: 'Notes',
    species: 'Species',
    breed: 'Breed',
    age: 'Age',
    sex: 'Sex',
    weight: 'Weight',
    tutor: 'Tutor',
    
    // Species
    dog: 'Dog',
    cat: 'Cat',
    bird: 'Bird',
    rabbit: 'Rabbit',
    hamster: 'Hamster',
    other: 'Other',
    
    // Sex
    male: 'Male',
    female: 'Female',
    
    // Messages
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Information',
    
    // Dashboard
    totalTutors: 'Total Tutors',
    totalAnimals: 'Total Animals',
    totalAppointments: 'Total Appointments',
    totalVaccines: 'Total Vaccines',
    
    // History
    vaccineHistory: 'Vaccine History',
    appointmentHistory: 'Appointment History',
    
    // Others
    loading: 'Loading...',
    noData: 'No data found',
    selectOption: 'Select an option',
    
    // User profiles
    admin: 'Administrator',
    veterinarian: 'Veterinarian',
    receptionist: 'Receptionist',
    manager: 'Manager',
    
    // New fields
    rooms: 'Rooms',
    surgicalRooms: 'Surgical Rooms',
    breeds: 'Breeds',
    profile: 'Profile',
    permissions: 'Permissions',
    crmv: 'CRMV',
    userProfile: 'User Profile',
    
    // Forms
    tutorData: 'Tutor Data',
    personalData: 'Personal Data',
    addressData: 'Address Data',
    contactData: 'Contact Data',
    
    // Profiles and Permissions
    newProfile: 'New Profile',
    editProfile: 'Edit Profile',
    profileName: 'Profile Name',
    profileDescription: 'Profile Description',
    systemProfile: 'System Profile',
    customProfile: 'Custom Profile',
    profilePermissions: 'Profile Permissions',
    modulePermissions: 'Module Permissions',
    read: 'Read',
    write: 'Write',
    deletePermission: 'Delete',
    
    // New texts
    productCategories: 'Product Categories',
    categories: 'Categories',
    newCategory: 'New Category',
    editCategory: 'Edit Category',
    categoryName: 'Category Name',
    categoryDescription: 'Category Description',
    activeCategory: 'Active Category',
    searchCategories: 'Search categories...',
    categoriesList: 'Categories List',
    newAccount: 'New Account',
    editReceivableAccount: 'Edit Receivable Account',
    newReceivableAccount: 'New Receivable Account',
    client: 'Client',
    selectClient: 'Select client',
    description: 'Description',
    amount: 'Amount',
    dueDate: 'Due Date',
    paymentMethod: 'Payment Method',
    selectPaymentMethod: 'Select payment method',
    money: 'Cash',
    card: 'Card',
    pix: 'PIX',
    transfer: 'Transfer',
    pending: 'Pending',
    paid: 'Paid',
    overdue: 'Overdue',
    cancelled: 'Cancelled',
    totalReceivable: 'Total Receivable',
    totalReceived: 'Total Received',
    pendingAccounts: 'Pending Accounts',
    receivableAccountsList: 'Receivable Accounts List',
    receive: 'Receive',
    filters: 'Filters',
    startDate: 'Start Date',
    endDate: 'End Date',
    type: 'Type',
    all: 'All',
    income: 'Income',
    expenses: 'Expenses',
    clearFilters: 'Clear Filters',
    totalIncome: 'Total Income',
    totalExpenses: 'Total Expenses',
    periodBalance: 'Period Balance',
    transactions: 'Transactions',
    movements: 'Movements',
    entry: 'Entry',
    exit: 'Exit',
    bankAccounts: 'Bank Accounts',
    newBankAccount: 'New Bank Account',
    editBankAccount: 'Edit Bank Account',
    bank: 'Bank',
    agency: 'Agency',
    account: 'Account',
    holder: 'Holder',
    accountType: 'Account Type',
    checkingAccount: 'Checking Account',
    savings: 'Savings',
    businessAccount: 'Business Account',
    initialBalance: 'Initial Balance',
    activeAccount: 'Active Account',
    totalBalance: 'Total Balance',
    bankAccountsList: 'Bank Accounts List',
    balance: 'Balance'
  },
  es: {
    // Navegación
    dashboard: 'Dashboard',
    tutors: 'Tutores',
    animals: 'Animales',
    vaccines: 'Vacunas',
    appointments: 'Citas',
    grooming: 'Peluquería',
    veterinarians: 'Veterinarios',
    serviceTypes: 'Tipos de Servicios',
    products: 'Productos',
    inventory: 'Inventario',
    purchases: 'Compras',
    accountsPayable: 'Cuentas por Pagar',
    accountsReceivable: 'Cuentas por Cobrar',
    cashFlow: 'Flujo de Caja',
    banks: 'Bancos',
    settings: 'Configuraciones',
    users: 'Usuarios',
    profiles: 'Perfiles',
    logout: 'Salir',
    
    // Acciones
    add: 'Agregar',
    addTutor: 'Agregar Tutor',
    addAnimal: 'Agregar Animal',
    edit: 'Editar',
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    search: 'Buscar',
    filter: 'Filtrar',
    export: 'Exportar',
    import: 'Importar',
    actions: 'Acciones',
    downloadCard: 'Descargar Tarjeta',
    
    // Estados
    active: 'Activo',
    inactive: 'Inactivo',
    pending: 'Pendiente',
    completed: 'Completado',
    cancelled: 'Cancelado',
    
    // Campos
    name: 'Nombre',
    animalName: 'Nombre del Animal',
    tutorName: 'Nombre del Tutor',
    email: 'Email',
    phone: 'Teléfono',
    cpf: 'CPF',
    address: 'Dirección',
    street: 'Calle',
    number: 'Número',
    neighborhood: 'Barrio',
    city: 'Ciudad',
    state: 'Estado',
    zipCode: 'Código Postal',
    date: 'Fecha',
    time: 'Hora',
    notes: 'Observaciones',
    species: 'Especie',
    breed: 'Raza',
    age: 'Edad',
    sex: 'Sexo',
    weight: 'Peso',
    tutor: 'Tutor',
    
    // Especies
    dog: 'Perro',
    cat: 'Gato',
    bird: 'Pájaro',
    rabbit: 'Conejo',
    hamster: 'Hámster',
    other: 'Otro',
    
    // Sexo
    male: 'Macho',
    female: 'Hembra',
    
    // Mensajes
    success: 'Éxito',
    error: 'Error',
    warning: 'Advertencia',
    info: 'Información',
    
    // Dashboard
    totalTutors: 'Total de Tutores',
    totalAnimals: 'Total de Animales',
    totalAppointments: 'Total de Citas',
    totalVaccines: 'Total de Vacunas',
    
    // Historial
    vaccineHistory: 'Historial de Vacunas',
    appointmentHistory: 'Historial de Citas',
    
    // Otros
    loading: 'Cargando...',
    noData: 'No se encontraron datos',
    selectOption: 'Seleccione una opción',
    
    // Perfiles de usuario
    admin: 'Administrador',
    veterinarian: 'Veterinario',
    receptionist: 'Recepcionista',
    manager: 'Gerente',
    
    // Nuevos campos
    rooms: 'Salas',
    surgicalRooms: 'Salas Quirúrgicas',
    breeds: 'Razas',
    profile: 'Perfil',
    permissions: 'Permisos',
    crmv: 'CRMV',
    userProfile: 'Perfil de Usuario',
    
    // Formularios
    tutorData: 'Datos del Tutor',
    personalData: 'Datos Personales',
    addressData: 'Datos de Dirección',
    contactData: 'Datos de Contacto',
    
    // Perfiles y Permisos
    newProfile: 'Nuevo Perfil',
    editProfile: 'Editar Perfil',
    profileName: 'Nombre del Perfil',
    profileDescription: 'Descripción del Perfil',
    systemProfile: 'Perfil del Sistema',
    customProfile: 'Perfil Personalizado',
    profilePermissions: 'Permisos del Perfil',
    modulePermissions: 'Permisos por Módulo',
    read: 'Leer',
    write: 'Escribir',
    deletePermission: 'Eliminar',
    
    // New texts
    productCategories: 'Categorías de Productos',
    categories: 'Categorías',
    newCategory: 'Nueva Categoría',
    editCategory: 'Editar Categoría',
    categoryName: 'Nombre de Categoría',
    categoryDescription: 'Descripción de Categoría',
    activeCategory: 'Categoría Activa',
    searchCategories: 'Buscar categorías...',
    categoriesList: 'Lista de Categorías',
    newAccount: 'Nueva Cuenta',
    editReceivableAccount: 'Editar Cuenta por Cobrar',
    newReceivableAccount: 'Nueva Cuenta por Cobrar',
    client: 'Cliente',
    selectClient: 'Seleccionar cliente',
    description: 'Descripción',
    amount: 'Monto',
    dueDate: 'Fecha de Vencimiento',
    paymentMethod: 'Método de Pago',
    selectPaymentMethod: 'Seleccionar método de pago',
    money: 'Efectivo',
    card: 'Tarjeta',
    pix: 'PIX',
    transfer: 'Transferencia',
    pending: 'Pendiente',
    paid: 'Pagado',
    overdue: 'Vencido',
    cancelled: 'Cancelado',
    totalReceivable: 'Total por Cobrar',
    totalReceived: 'Total Recibido',
    pendingAccounts: 'Cuentas Pendientes',
    receivableAccountsList: 'Lista de Cuentas por Cobrar',
    receive: 'Recibir',
    filters: 'Filtros',
    startDate: 'Fecha Inicial',
    endDate: 'Fecha Final',
    type: 'Tipo',
    all: 'Todos',
    income: 'Ingresos',
    expenses: 'Gastos',
    clearFilters: 'Limpiar Filtros',
    totalIncome: 'Total Ingresos',
    totalExpenses: 'Total Gastos',
    periodBalance: 'Balance del Período',
    transactions: 'Transacciones',
    movements: 'Movimientos',
    entry: 'Entrada',
    exit: 'Salida',
    bankAccounts: 'Cuentas Bancarias',
    newBankAccount: 'Nueva Cuenta Bancaria',
    editBankAccount: 'Editar Cuenta Bancaria',
    bank: 'Banco',
    agency: 'Agencia',
    account: 'Cuenta',
    holder: 'Titular',
    accountType: 'Tipo de Cuenta',
    checkingAccount: 'Cuenta Corriente',
    savings: 'Ahorro',
    businessAccount: 'Cuenta Empresarial',
    initialBalance: 'Saldo Inicial',
    activeAccount: 'Cuenta Activa',
    totalBalance: 'Saldo Total',
    bankAccountsList: 'Lista de Cuentas Bancarias',
    balance: 'Saldo',
    
    // Dashboard specific
    todayAppointments: 'Citas de Hoy',
    lowStock: 'Stock Bajo',
    pendingPayments: 'Pagos Pendientes',
    todayRevenue: 'Ingresos de Hoy',
    overdueVaccines: 'Vacunas Vencidas',
    
    // Appointments
    appointments: 'Citas',
    appointmentDescription: 'Gestión de consultas y exámenes veterinarios',
    appointmentsList: 'Lista de Citas',
    appointmentsFound: 'citas encontradas',
    newAppointment: 'Nueva Cita',
    dateTime: 'Fecha/Hora',
    appointmentHistory: 'Historial de Consultas',
    
    // Status
    scheduled: 'Programado',
    completed: 'Completado',
    cancelled: 'Cancelado',
    today: 'Hoy'
  }
} as const;

// Idioma atual
let currentLanguage: Language = 'pt';

// Função para obter o idioma atual
export const getCurrentLanguage = (): Language => {
  // Verificar se há um idioma salvo no localStorage
  const savedLanguage = localStorage.getItem('petshop_language') as Language;
  if (savedLanguage === 'pt' || savedLanguage === 'en' || savedLanguage === 'es') {
    currentLanguage = savedLanguage;
  }
  return currentLanguage;
};

// Função para alterar o idioma
export const setLanguage = (language: Language): Language => {
  currentLanguage = language;
  localStorage.setItem('petshop_language', language);
  return currentLanguage;
};

// Função para traduzir uma chave
export const t = (key: TranslationKey): string => {
  const lang = getCurrentLanguage();
  return translations[lang][key] || key;
};
