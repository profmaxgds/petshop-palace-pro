
export const translations = {
  'pt-BR': {
    // Navigation
    dashboard: 'Dashboard',
    tutors: 'Tutores',
    animals: 'Animais',
    vaccines: 'Vacinas',
    appointments: 'Agenda',
    grooming: 'Banho e Tosa',
    inventory: 'Estoque',
    purchases: 'Compras',
    accountsPayable: 'Contas a Pagar',
    accountsReceivable: 'Contas a Receber',
    cashFlow: 'Caixa',
    banks: 'Bancos',
    settings: 'Configurações',
    logout: 'Sair',
    
    // Dashboard
    todayAppointments: 'Consultas Hoje',
    lowStock: 'Estoque Baixo',
    pendingPayments: 'Pagamentos Pendentes',
    todayRevenue: 'Receita Hoje',
    overdueVaccines: 'Vacinas Vencidas',
    
    // Tutors
    addTutor: 'Adicionar Tutor',
    tutorName: 'Nome Completo',
    cpf: 'CPF',
    phone: 'Telefone',
    email: 'E-mail',
    address: 'Endereço',
    street: 'Rua',
    number: 'Número',
    neighborhood: 'Bairro',
    city: 'Cidade',
    state: 'Estado',
    zipCode: 'CEP',
    
    // Animals
    addAnimal: 'Adicionar Animal',
    animalName: 'Nome',
    species: 'Espécie',
    breed: 'Raça',
    age: 'Idade',
    sex: 'Sexo',
    weight: 'Peso',
    tutor: 'Tutor',
    
    // Common
    save: 'Salvar',
    cancel: 'Cancelar',
    edit: 'Editar',
    delete: 'Excluir',
    search: 'Buscar',
    add: 'Adicionar',
    view: 'Visualizar',
    total: 'Total',
    date: 'Data',
    status: 'Status',
    actions: 'Ações',
    
    // Status
    paid: 'Pago',
    pending: 'Pendente',
    overdue: 'Atrasado',
    completed: 'Concluído',
    scheduled: 'Agendado',
    cancelled: 'Cancelado',
  },
  'en': {
    // Navigation
    dashboard: 'Dashboard',
    tutors: 'Pet Owners',
    animals: 'Animals',
    vaccines: 'Vaccines',
    appointments: 'Appointments',
    grooming: 'Grooming',
    inventory: 'Inventory',
    purchases: 'Purchases',
    accountsPayable: 'Accounts Payable',
    accountsReceivable: 'Accounts Receivable',
    cashFlow: 'Cash Flow',
    banks: 'Banks',
    settings: 'Settings',
    logout: 'Logout',
    
    // Dashboard
    todayAppointments: 'Today\'s Appointments',
    lowStock: 'Low Stock',
    pendingPayments: 'Pending Payments',
    todayRevenue: 'Today\'s Revenue',
    overdueVaccines: 'Overdue Vaccines',
    
    // Tutors
    addTutor: 'Add Pet Owner',
    tutorName: 'Full Name',
    cpf: 'Tax ID',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    street: 'Street',
    number: 'Number',
    neighborhood: 'Neighborhood',
    city: 'City',
    state: 'State',
    zipCode: 'ZIP Code',
    
    // Animals
    addAnimal: 'Add Animal',
    animalName: 'Name',
    species: 'Species',
    breed: 'Breed',
    age: 'Age',
    sex: 'Sex',
    weight: 'Weight',
    tutor: 'Pet Owner',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    search: 'Search',
    add: 'Add',
    view: 'View',
    total: 'Total',
    date: 'Date',
    status: 'Status',
    actions: 'Actions',
    
    // Status
    paid: 'Paid',
    pending: 'Pending',
    overdue: 'Overdue',
    completed: 'Completed',
    scheduled: 'Scheduled',
    cancelled: 'Cancelled',
  },
  'es': {
    // Navigation
    dashboard: 'Panel',
    tutors: 'Tutores',
    animals: 'Animales',
    vaccines: 'Vacunas',
    appointments: 'Citas',
    grooming: 'Peluquería',
    inventory: 'Inventario',
    purchases: 'Compras',
    accountsPayable: 'Cuentas por Pagar',
    accountsReceivable: 'Cuentas por Cobrar',
    cashFlow: 'Flujo de Caja',
    banks: 'Bancos',
    settings: 'Configuraciones',
    logout: 'Salir',
    
    // Dashboard
    todayAppointments: 'Citas de Hoy',
    lowStock: 'Stock Bajo',
    pendingPayments: 'Pagos Pendientes',
    todayRevenue: 'Ingresos de Hoy',
    overdueVaccines: 'Vacunas Vencidas',
    
    // Tutors
    addTutor: 'Agregar Tutor',
    tutorName: 'Nombre Completo',
    cpf: 'Documento',
    phone: 'Teléfono',
    email: 'Correo',
    address: 'Dirección',
    street: 'Calle',
    number: 'Número',
    neighborhood: 'Barrio',
    city: 'Ciudad',
    state: 'Estado',
    zipCode: 'Código Postal',
    
    // Animals
    addAnimal: 'Agregar Animal',
    animalName: 'Nombre',
    species: 'Especie',
    breed: 'Raza',
    age: 'Edad',
    sex: 'Sexo',
    weight: 'Peso',
    tutor: 'Tutor',
    
    // Common
    save: 'Guardar',
    cancel: 'Cancelar',
    edit: 'Editar',
    delete: 'Eliminar',
    search: 'Buscar',
    add: 'Agregar',
    view: 'Ver',
    total: 'Total',
    date: 'Fecha',
    status: 'Estado',
    actions: 'Acciones',
    
    // Status
    paid: 'Pagado',
    pending: 'Pendiente',
    overdue: 'Vencido',
    completed: 'Completado',
    scheduled: 'Programado',
    cancelled: 'Cancelado',
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations['pt-BR'];

let currentLanguage: Language = 'pt-BR';

export const setLanguage = (lang: Language) => {
  currentLanguage = lang;
  localStorage.setItem('petshop-language', lang);
};

export const getCurrentLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('petshop-language') as Language;
    if (saved && translations[saved]) {
      currentLanguage = saved;
    }
  }
  return currentLanguage;
};

export const t = (key: TranslationKey): string => {
  const lang = getCurrentLanguage();
  return translations[lang][key] || translations['pt-BR'][key] || key;
};
