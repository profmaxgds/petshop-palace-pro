// Definição de tipos para as traduções
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
    edit: 'Editar',
    save: 'Salvar',
    cancel: 'Cancelar',
    delete: 'Excluir',
    search: 'Buscar',
    filter: 'Filtrar',
    export: 'Exportar',
    import: 'Importar',
    
    // Estados
    active: 'Ativo',
    inactive: 'Inativo',
    pending: 'Pendente',
    completed: 'Concluído',
    cancelled: 'Cancelado',
    
    // Campos
    name: 'Nome',
    email: 'E-mail',
    phone: 'Telefone',
    address: 'Endereço',
    date: 'Data',
    time: 'Hora',
    notes: 'Observações',
    
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
    
    // Outros
    loading: 'Carregando...',
    noData: 'Nenhum dado encontrado',
    selectOption: 'Selecione uma opção',
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
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    import: 'Import',
    
    // States
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    completed: 'Completed',
    cancelled: 'Cancelled',
    
    // Fields
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    date: 'Date',
    time: 'Time',
    notes: 'Notes',
    
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
    
    // Others
    loading: 'Loading...',
    noData: 'No data found',
    selectOption: 'Select an option',
  }
} as const;

// Idioma atual
let currentLanguage: 'pt' | 'en' = 'pt';

// Função para obter o idioma atual
export const getCurrentLanguage = () => {
  // Verificar se há um idioma salvo no localStorage
  const savedLanguage = localStorage.getItem('petshop_language');
  if (savedLanguage === 'pt' || savedLanguage === 'en') {
    currentLanguage = savedLanguage;
  }
  return currentLanguage;
};

// Função para alterar o idioma
export const setLanguage = (language: 'pt' | 'en') => {
  currentLanguage = language;
  localStorage.setItem('petshop_language', language);
  return currentLanguage;
};

// Função para traduzir uma chave
export const t = (key: TranslationKey): string => {
  const lang = getCurrentLanguage();
  return translations[lang][key] || key;
};
