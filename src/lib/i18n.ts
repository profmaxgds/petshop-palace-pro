
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const availableLanguages = ['pt', 'en', 'es'] as const;
export type Language = typeof availableLanguages[number];
let defaultLanguage: Language = 'pt';

// Function to get the current language from localStorage
export const getCurrentLanguage = (): Language => {
  const stored = localStorage.getItem('i18nextLng') as Language;
  return availableLanguages.includes(stored) ? stored : defaultLanguage;
};

// Function to set language
export const setLanguage = (lng: Language) => {
  if (availableLanguages.includes(lng)) {
    i18next.changeLanguage(lng);
  } else {
    console.warn(`Language ${lng} not available`);
  }
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
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
          productCategories: 'Categories',
          users: 'Users',
          profiles: 'Profiles',
          settings: 'Settings',
          breeds: 'Breeds',
          rooms: 'Rooms',
          reports: 'Reports',
          vaccineCardLayout: 'Vaccine Card Layout',
          animalHealth: 'Animal Health',

          // Common actions
          actions: 'Actions',
          add: 'Add',
          edit: 'Edit',
          delete: 'Delete',
          save: 'Save',
          cancel: 'Cancel',
          search: 'Search',
          filter: 'Filter',
          export: 'Export',
          import: 'Import',
          active: 'Active',
          inactive: 'Inactive',

          // Animal related
          addAnimal: 'Add Animal',
          animal: 'Animal',
          selectAnimal: 'Select Animal',
          addTutor: 'Add Tutor',
          tutorName: 'Tutor Name',
          cpf: 'CPF',
          phone: 'Phone',
          email: 'Email',
          street: 'Street',
          neighborhood: 'Neighborhood',
          city: 'City',
          state: 'State',
          zipCode: 'ZIP Code',

          // Species
          dog: 'Dog',
          cat: 'Cat',
          bird: 'Bird',
          rabbit: 'Rabbit',
          hamster: 'Hamster',
          other: 'Other',

          // Vaccine related
          addVaccine: 'Add Vaccine',
          editVaccine: 'Edit Vaccine',
          vaccineType: 'Vaccine Type',
          selectVaccineType: 'Select Type',
          batch: 'Batch',
          applicationDate: 'Application Date',
          nextDueDate: 'Next Due Date',
          veterinarian: 'Veterinarian',
          selectVeterinarian: 'Select Veterinarian',
          notes: 'Notes',
          vaccineCannotBeDeleted: 'Vaccines cannot be deleted after 2 days of registration.',

          // Profile related
          newProfile: 'New Profile',
          editProfile: 'Edit Profile',
          profileName: 'Profile Name',
          profileDescription: 'Profile Description',
          modulePermissions: 'Module Permissions',

          // Permissions
          read: 'Read',
          write: 'Write',
          deletePermission: 'Delete',

          // Financial
          financial: 'Financial',

          // System
          system: 'System',

          // Appointments
          manageAppointments: 'Manage appointments',
          appointmentsList: 'Appointments List',
          appointmentsRegistered: 'appointments registered',
          addAppointment: 'Add Appointment',
          editAppointment: 'Edit Appointment',
          fillAppointmentData: 'Fill appointment data',
          serviceType: 'Service Type',
          selectServiceType: 'Select Service Type',
          date: 'Date',
          time: 'Time',
          room: 'Room',
          selectRoom: 'Select Room',
          observationsNotes: 'Observations/Notes',
          searchByAnimalOrVeterinarian: 'Search by animal or veterinarian',
          allStatuses: 'All Statuses',
          scheduled: 'Scheduled',
          completed: 'Completed',
          cancelled: 'Cancelled',
          animalName: 'Animal Name',
          service: 'Service',
          dateTime: 'Date/Time',
          status: 'Status',
        }
      },
      pt: {
        translation: {
          // Navigation
          dashboard: 'Dashboard',
          tutors: 'Tutores',
          animals: 'Animais',
          vaccines: 'Vacinas',
          appointments: 'Agendamentos',
          grooming: 'Estética',
          veterinarians: 'Veterinários',
          serviceTypes: 'Tipos de Serviço',
          products: 'Produtos',
          inventory: 'Estoque',
          purchases: 'Compras',
          accountsPayable: 'Contas a Pagar',
          accountsReceivable: 'Contas a Receber',
          cashFlow: 'Fluxo de Caixa',
          banks: 'Bancos',
          productCategories: 'Categorias',
          users: 'Usuários',
          profiles: 'Perfis',
          settings: 'Configurações',
          breeds: 'Raças',
          rooms: 'Salas',
          reports: 'Relatórios',
          vaccineCardLayout: 'Layout da Carteirinha',
          animalHealth: 'Saúde Animal',
          actions: 'Ações',
          add: 'Adicionar',
          edit: 'Editar',
          delete: 'Excluir',
          save: 'Salvar',
          cancel: 'Cancelar',
          search: 'Buscar',
          filter: 'Filtrar',
          export: 'Exportar',
          import: 'Importar',
          active: 'Ativo',
          inactive: 'Inativo',
          addAnimal: 'Adicionar Animal',
          animal: 'Animal',
          selectAnimal: 'Selecionar Animal',
          addTutor: 'Adicionar Tutor',
          tutorName: 'Nome do Tutor',
          cpf: 'CPF',
          phone: 'Telefone',
          email: 'Email',
          street: 'Rua',
          neighborhood: 'Bairro',
          city: 'Cidade',
          state: 'Estado',
          zipCode: 'CEP',
          dog: 'Cão',
          cat: 'Gato',
          bird: 'Ave',
          rabbit: 'Coelho',
          hamster: 'Hamster',
          other: 'Outro',
          addVaccine: 'Adicionar Vacina',
          editVaccine: 'Editar Vacina',
          vaccineType: 'Tipo de Vacina',
          selectVaccineType: 'Selecionar Tipo',
          batch: 'Lote',
          applicationDate: 'Data de Aplicação',
          nextDueDate: 'Próxima Dose',
          veterinarian: 'Veterinário',
          selectVeterinarian: 'Selecionar Veterinário',
          notes: 'Observações',
          vaccineCannotBeDeleted: 'Vacinas não podem ser excluídas após 2 dias de seu lançamento.',
          newProfile: 'Novo Perfil',
          editProfile: 'Editar Perfil',
          profileName: 'Nome do Perfil',
          profileDescription: 'Descrição do Perfil',
          modulePermissions: 'Permissões por Módulo',
          read: 'Visualizar',
          write: 'Editar',
          deletePermission: 'Excluir',
          financial: 'Financeiro',
          system: 'Sistema',
          manageAppointments: 'Gerenciar agendamentos',
          appointmentsList: 'Lista de Agendamentos',
          appointmentsRegistered: 'agendamentos registrados',
          addAppointment: 'Adicionar Agendamento',
          editAppointment: 'Editar Agendamento',
          fillAppointmentData: 'Preencha os dados do agendamento',
          serviceType: 'Tipo de Serviço',
          selectServiceType: 'Selecionar Tipo de Serviço',
          date: 'Data',
          time: 'Horário',
          room: 'Sala',
          selectRoom: 'Selecionar Sala',
          observationsNotes: 'Observações/Notas',
          searchByAnimalOrVeterinarian: 'Buscar por animal ou veterinário',
          allStatuses: 'Todos os Status',
          scheduled: 'Agendado',
          completed: 'Concluído',
          cancelled: 'Cancelado',
          animalName: 'Nome do Animal',
          service: 'Serviço',
          dateTime: 'Data/Hora',
          status: 'Status',
        }
      },
      es: {
        translation: {
          // Navigation
          dashboard: 'Panel',
          tutors: 'Tutores',
          animals: 'Animales',
          vaccines: 'Vacunas',
          appointments: 'Citas',
          grooming: 'Estética',
          veterinarians: 'Veterinarios',
          serviceTypes: 'Tipos de Servicio',
          products: 'Productos',
          inventory: 'Inventario',
          purchases: 'Compras',
          accountsPayable: 'Cuentas por Pagar',
          accountsReceivable: 'Cuentas por Cobrar',
          cashFlow: 'Flujo de Caja',
          banks: 'Bancos',
          productCategories: 'Categorías',
          users: 'Usuarios',
          profiles: 'Perfiles',
          settings: 'Configuraciones',
          breeds: 'Razas',
          rooms: 'Salas',
          reports: 'Informes',
          vaccineCardLayout: 'Diseño de Tarjeta de Vacunas',
          animalHealth: 'Salud Animal',
          actions: 'Acciones',
          add: 'Agregar',
          edit: 'Editar',
          delete: 'Eliminar',
          save: 'Guardar',
          cancel: 'Cancelar',
          search: 'Buscar',
          filter: 'Filtrar',
          export: 'Exportar',
          import: 'Importar',
          active: 'Activo',
          inactive: 'Inactivo',
          addAnimal: 'Agregar Animal',
          animal: 'Animal',
          selectAnimal: 'Seleccionar Animal',
          addTutor: 'Agregar Tutor',
          tutorName: 'Nombre del Tutor',
          cpf: 'CPF',
          phone: 'Teléfono',
          email: 'Email',
          street: 'Calle',
          neighborhood: 'Barrio',
          city: 'Ciudad',
          state: 'Estado',
          zipCode: 'Código Postal',
          dog: 'Perro',
          cat: 'Gato',
          bird: 'Ave',
          rabbit: 'Conejo',
          hamster: 'Hámster',
          other: 'Otro',
          addVaccine: 'Agregar Vacuna',
          editVaccine: 'Editar Vacuna',
          vaccineType: 'Tipo de Vacuna',
          selectVaccineType: 'Seleccionar Tipo',
          batch: 'Lote',
          applicationDate: 'Fecha de Aplicación',
          nextDueDate: 'Próxima Dosis',
          veterinarian: 'Veterinario',
          selectVeterinarian: 'Seleccionar Veterinario',
          notes: 'Observaciones',
          vaccineCannotBeDeleted: 'Las vacunas no pueden eliminarse después de 2 días de su registro.',
          newProfile: 'Nuevo Perfil',
          editProfile: 'Editar Perfil',
          profileName: 'Nombre del Perfil',
          profileDescription: 'Descripción del Perfil',
          modulePermissions: 'Permisos por Módulo',
          read: 'Ver',
          write: 'Escribir',
          deletePermission: 'Eliminar',
          financial: 'Financiero',
          system: 'Sistema',
          manageAppointments: 'Gestionar citas',
          appointmentsList: 'Lista de Citas',
          appointmentsRegistered: 'citas registradas',
          addAppointment: 'Agregar Cita',
          editAppointment: 'Editar Cita',
          fillAppointmentData: 'Complete los datos de la cita',
          serviceType: 'Tipo de Servicio',
          selectServiceType: 'Seleccionar Tipo de Servicio',
          date: 'Fecha',
          time: 'Hora',
          room: 'Sala',
          selectRoom: 'Seleccionar Sala',
          observationsNotes: 'Observaciones/Notas',
          searchByAnimalOrVeterinarian: 'Buscar por animal o veterinario',
          allStatuses: 'Todos los Estados',
          scheduled: 'Programado',
          completed: 'Completado',
          cancelled: 'Cancelado',
          animalName: 'Nombre del Animal',
          service: 'Servicio',
          dateTime: 'Fecha/Hora',
          status: 'Estado',
        }
      }
    },
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage']
    },
  });

i18next.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
});

export const t = (key: string) => i18next.t(key);

export const changeLanguage = (lng: string) => {
  if (availableLanguages.includes(lng as Language)) {
    i18next.changeLanguage(lng);
  } else {
    console.warn(`Language ${lng} not available`);
  }
};
