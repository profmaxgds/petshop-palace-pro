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
    logout: 'Sair',
    
    // Ações
    add: 'Adicionar',
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
    email: 'E-mail',
    phone: 'Telefone',
    address: 'Endereço',
    date: 'Data',
    time: 'Hora',
    notes: 'Observações',
    species: 'Espécie',
    breed: 'Raça',
    age: 'Idade',
    sex: 'Sexo',
    weight: 'Peso',
    tutor: 'Tutor',
    
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
    
    // Novos campos
    rooms: 'Salas',
    surgicalRooms: 'Salas Cirúrgicas',
    breeds: 'Raças',
    profile: 'Perfil',
    permissions: 'Permissões',
    crmv: 'CRMV',
    userProfile: 'Perfil do Usuário',
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
    logout: 'Logout',
    
    // Actions
    add: 'Add',
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
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    date: 'Date',
    time: 'Time',
    notes: 'Notes',
    species: 'Species',
    breed: 'Breed',
    age: 'Age',
    sex: 'Sex',
    weight: 'Weight',
    tutor: 'Tutor',
    
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
    
    // New fields
    rooms: 'Rooms',
    surgicalRooms: 'Surgical Rooms',
    breeds: 'Breeds',
    profile: 'Profile',
    permissions: 'Permissions',
    crmv: 'CRMV',
    userProfile: 'User Profile',
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
    logout: 'Salir',
    
    // Acciones
    add: 'Agregar',
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
    email: 'Email',
    phone: 'Teléfono',
    address: 'Dirección',
    date: 'Fecha',
    time: 'Hora',
    notes: 'Observaciones',
    species: 'Especie',
    breed: 'Raza',
    age: 'Edad',
    sex: 'Sexo',
    weight: 'Peso',
    tutor: 'Tutor',
    
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
    
    // Nuevos campos
    rooms: 'Salas',
    surgicalRooms: 'Salas Quirúrgicas',
    breeds: 'Razas',
    profile: 'Perfil',
    permissions: 'Permisos',
    crmv: 'CRMV',
    userProfile: 'Perfil de Usuario',
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
