
const translations = {
  // Navigation
  dashboard: { pt: 'Dashboard', en: 'Dashboard' },
  tutors: { pt: 'Tutores', en: 'Tutors' },
  animals: { pt: 'Animais', en: 'Animals' },
  vaccines: { pt: 'Vacinas', en: 'Vaccines' },
  appointments: { pt: 'Agendamentos', en: 'Appointments' },
  grooming: { pt: 'Banho & Tosa', en: 'Grooming' },
  veterinarians: { pt: 'Veterinários', en: 'Veterinarians' },
  serviceTypes: { pt: 'Tipos de Serviço', en: 'Service Types' },
  products: { pt: 'Produtos', en: 'Products' },
  inventory: { pt: 'Estoque', en: 'Inventory' },
  purchases: { pt: 'Compras', en: 'Purchases' },
  accountsPayable: { pt: 'Contas a Pagar', en: 'Accounts Payable' },
  accountsReceivable: { pt: 'Contas a Receber', en: 'Accounts Receivable' },
  cashFlow: { pt: 'Fluxo de Caixa', en: 'Cash Flow' },
  banks: { pt: 'Bancos', en: 'Banks' },
  settings: { pt: 'Configurações', en: 'Settings' },
  users: { pt: 'Usuários', en: 'Users' },
  profiles: { pt: 'Perfis', en: 'Profiles' },
  breeds: { pt: 'Raças', en: 'Breeds' },
  rooms: { pt: 'Salas', en: 'Rooms' },
  productCategories: { pt: 'Categorias de Produtos', en: 'Product Categories' },

  // Common
  name: { pt: 'Nome', en: 'Name' },
  email: { pt: 'E-mail', en: 'Email' },
  phone: { pt: 'Telefone', en: 'Phone' },
  address: { pt: 'Endereço', en: 'Address' },
  actions: { pt: 'Ações', en: 'Actions' },
  add: { pt: 'Adicionar', en: 'Add' },
  edit: { pt: 'Editar', en: 'Edit' },
  delete: { pt: 'Excluir', en: 'Delete' },
  save: { pt: 'Salvar', en: 'Save' },
  cancel: { pt: 'Cancelar', en: 'Cancel' },
  search: { pt: 'Buscar', en: 'Search' },
  filter: { pt: 'Filtrar', en: 'Filter' },
  status: { pt: 'Status', en: 'Status' },
  active: { pt: 'Ativo', en: 'Active' },
  inactive: { pt: 'Inativo', en: 'Inactive' },
  date: { pt: 'Data', en: 'Date' },
  time: { pt: 'Horário', en: 'Time' },
  notes: { pt: 'Observações', en: 'Notes' },
  price: { pt: 'Preço', en: 'Price' },
  total: { pt: 'Total', en: 'Total' },
  description: { pt: 'Descrição', en: 'Description' },
  category: { pt: 'Categoria', en: 'Category' },
  type: { pt: 'Tipo', en: 'Type' },
  number: { pt: 'Número', en: 'Number' },

  // Animals
  animalName: { pt: 'Nome do Animal', en: 'Animal Name' },
  species: { pt: 'Espécie', en: 'Species' },
  breed: { pt: 'Raça', en: 'Breed' },
  age: { pt: 'Idade', en: 'Age' },
  weight: { pt: 'Peso', en: 'Weight' },
  sex: { pt: 'Sexo', en: 'Sex' },
  tutor: { pt: 'Tutor', en: 'Tutor' },
  addAnimal: { pt: 'Adicionar Animal', en: 'Add Animal' },
  editAnimal: { pt: 'Editar Animal', en: 'Edit Animal' },
  
  // Species
  dog: { pt: 'Cão', en: 'Dog' },
  cat: { pt: 'Gato', en: 'Cat' },
  bird: { pt: 'Ave', en: 'Bird' },
  rabbit: { pt: 'Coelho', en: 'Rabbit' },
  hamster: { pt: 'Hamster', en: 'Hamster' },
  other: { pt: 'Outro', en: 'Other' },

  // Sex
  male: { pt: 'Macho', en: 'Male' },
  female: { pt: 'Fêmea', en: 'Female' },

  // Vaccines
  vaccineHistory: { pt: 'Histórico de Vacinas', en: 'Vaccine History' },
  vaccineType: { pt: 'Tipo de Vacina', en: 'Vaccine Type' },
  applicationDate: { pt: 'Data de Aplicação', en: 'Application Date' },
  nextDueDate: { pt: 'Próxima Dose', en: 'Next Due Date' },
  batch: { pt: 'Lote', en: 'Batch' },
  veterinarian: { pt: 'Veterinário', en: 'Veterinarian' },
  downloadCard: { pt: 'Baixar Carteirinha', en: 'Download Card' },
  addVaccine: { pt: 'Adicionar Vacina', en: 'Add Vaccine' },
  editVaccine: { pt: 'Editar Vacina', en: 'Edit Vaccine' },
  animal: { pt: 'Animal', en: 'Animal' },
  selectAnimal: { pt: 'Selecione o animal', en: 'Select animal' },
  selectVaccineType: { pt: 'Selecione o tipo de vacina', en: 'Select vaccine type' },
  selectVeterinarian: { pt: 'Selecione o veterinário', en: 'Select veterinarian' },
  vaccineCannotBeDeleted: { pt: 'Vacina não pode ser excluída após 2 dias do lançamento', en: 'Vaccine cannot be deleted after 2 days from registration' },

  // Appointments  
  appointmentHistory: { pt: 'Histórico de Consultas', en: 'Appointment History' },
  scheduled: { pt: 'Agendado', en: 'Scheduled' },
  completed: { pt: 'Realizado', en: 'Completed' },
  cancelled: { pt: 'Cancelado', en: 'Cancelled' },
  confirmed: { pt: 'Confirmado', en: 'Confirmed' },
  in_progress: { pt: 'Em Andamento', en: 'In Progress' },
  no_show: { pt: 'Faltou', en: 'No Show' },
  addAppointment: { pt: 'Agendar Consulta', en: 'Schedule Appointment' },
  editAppointment: { pt: 'Editar Agendamento', en: 'Edit Appointment' },
  serviceType: { pt: 'Tipo de Serviço', en: 'Service Type' },
  room: { pt: 'Sala', en: 'Room' },
  selectServiceType: { pt: 'Selecione o tipo de serviço', en: 'Select service type' },
  selectRoom: { pt: 'Selecione a sala', en: 'Select room' },
  manageAppointments: { pt: 'Gerencie os agendamentos', en: 'Manage appointments' },
  appointmentsList: { pt: 'Lista de Agendamentos', en: 'Appointments List' },
  appointmentsRegistered: { pt: 'agendamentos cadastrados', en: 'registered appointments' },
  fillAppointmentData: { pt: 'Preencha os dados do agendamento', en: 'Fill appointment data' },
  dateTime: { pt: 'Data/Hora', en: 'Date/Time' },
  service: { pt: 'Serviço', en: 'Service' },
  allStatuses: {pt: 'Todos os Status', en: 'All Statuses' },
  searchByAnimalOrVeterinarian: { pt: 'Buscar por animal ou veterinário...', en: 'Search by animal or veterinarian...' },
  observationsNotes: { pt: 'Observações/Notas', en: 'Observations/Notes' },

  // Service Types
  addServiceType: { pt: 'Adicionar Tipo de Serviço', en: 'Add Service Type' },
  editServiceType: { pt: 'Editar Tipo de Serviço', en: 'Edit Service Type' },
  serviceName: { pt: 'Nome do Serviço', en: 'Service Name' },
  duration: { pt: 'Duração (min)', en: 'Duration (min)' },
  requiresVeterinarian: { pt: 'Requer Veterinário', en: 'Requires Veterinarian' },
  consultation: { pt: 'Consulta', en: 'Consultation' },
  exam: { pt: 'Exame', en: 'Exam' },
  surgery: { pt: 'Cirurgia', en: 'Surgery' },
  vaccine: { pt: 'Vacina', en: 'Vaccine' },

  // Dashboard
  todayAppointments: { pt: 'Consultas Hoje', en: 'Today\'s Appointments' },
  lowStock: { pt: 'Estoque Baixo', en: 'Low Stock' },
  pendingPayments: { pt: 'Pagamentos Pendentes', en: 'Pending Payments' },
  todayRevenue: { pt: 'Faturamento Hoje', en: 'Today\'s Revenue' },
  overdueVaccines: { pt: 'Vacinas Atrasadas', en: 'Overdue Vaccines' },
  recentAppointments: { pt: 'Consultas Recentes', en: 'Recent Appointments' },
  quickStats: { pt: 'Estatísticas Rápidas', en: 'Quick Stats' },
  monthlyRevenue: { pt: 'Faturamento Mensal', en: 'Monthly Revenue' },
  revenue: { pt: 'Faturamento', en: 'Revenue' },
  month: { pt: 'Mês', en: 'Month' },
  jan: { pt: 'Jan', en: 'Jan' },
  feb: { pt: 'Fev', en: 'Feb' },
  mar: { pt: 'Mar', en: 'Mar' },
  apr: { pt: 'Abr', en: 'Apr' },
  may: { pt: 'Mai', en: 'May' },
  jun: { pt: 'Jun', en: 'Jun' },
  jul: { pt: 'Jul', en: 'Jul' },
  aug: { pt: 'Ago', en: 'Aug' },
  sep: { pt: 'Set', en: 'Sep' },
  oct: { pt: 'Out', en: 'Oct' },
  nov: { pt: 'Nov', en: 'Nov' },
  dec: { pt: 'Dez', en: 'Dec' },
  balance: { pt: 'Saldo', en: 'Balance' },
  income: { pt: 'Receita', en: 'Income' },
  expense: { pt: 'Despesa', en: 'Expense' },
  today: { pt: 'Hoje', en: 'Today' },

  // Profiles & Users
  profileName: { pt: 'Nome do Perfil', en: 'Profile Name' },
  permissions: { pt: 'Permissões', en: 'Permissions' },
  canRead: { pt: 'Pode Ler', en: 'Can Read' },
  canWrite: { pt: 'Pode Escrever', en: 'Can Write' },
  canDelete: { pt: 'Pode Excluir', en: 'Can Delete' },
  systemProfile: { pt: 'Perfil do Sistema', en: 'System Profile' },
  customProfile: { pt: 'Perfil Personalizado', en: 'Custom Profile' },
  addProfile: { pt: 'Adicionar Perfil', en: 'Add Profile' },
  editProfile: { pt: 'Editar Perfil', en: 'Edit Profile' },
  selectProfile: { pt: 'Selecione o perfil', en: 'Select profile' },
  username: { pt: 'Nome de Usuário', en: 'Username' },
  password: { pt: 'Senha', en: 'Password' },
  confirmPassword: { pt: 'Confirmar Senha', en: 'Confirm Password' },
  profile: { pt: 'Perfil', en: 'Profile' },
  addUser: { pt: 'Adicionar Usuário', en: 'Add User' },
  editUser: { pt: 'Editar Usuário', en: 'Edit User' },

  // System/Admin
  admin: { pt: 'Administrador', en: 'Administrator' },
  receptionist: { pt: 'Recepcionista', en: 'Receptionist' },
  manager: { pt: 'Gerente', en: 'Manager' },
  userProfile: { pt: 'Perfil do Usuário', en: 'User Profile' },
  logout: { pt: 'Sair', en: 'Logout' },
  success: { pt: 'Sucesso', en: 'Success' },

  // Common actions/messages
  read: { pt: 'Ler', en: 'Read' },
  write: { pt: 'Escrever', en: 'Write' },
  system: { pt: 'Sistema', en: 'System' },
  financial: { pt: 'Financeiro', en: 'Financial' },
};

export type Language = 'pt' | 'en';

let currentLanguage: Language = 'pt';

export const setLanguage = (lang: Language) => {
  currentLanguage = lang;
};

export const getCurrentLanguage = () => currentLanguage;

export const t = (key: keyof typeof translations): string => {
  const translation = translations[key];
  if (!translation) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return translation[currentLanguage] || translation.pt || key;
};
