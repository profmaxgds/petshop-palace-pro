import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const availableLanguages = ['pt', 'en', 'es'];
let defaultLanguage = 'pt';

// Function to get the current language from localStorage
export const getCurrentLanguage = () => {
  return localStorage.getItem('i18nextLng') || defaultLanguage;
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

          // Numbers (for navigation consistency)
          number: 'Number',
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

          // Common actions
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

          // Animal related
          addAnimal: 'Adicionar Animal',
          animal: 'Animal',
          selectAnimal: 'Selecionar Animal',

          // Species
          dog: 'Cão',
          cat: 'Gato',
          bird: 'Ave',
          rabbit: 'Coelho',
          hamster: 'Hamster',
          other: 'Outro',

          // Vaccine related
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

          // Profile related
          newProfile: 'Novo Perfil',
          editProfile: 'Editar Perfil',
          profileName: 'Nome do Perfil',
          profileDescription: 'Descrição do Perfil',
          modulePermissions: 'Permissões por Módulo',

          // Permissions
          read: 'Visualizar',
          write: 'Editar',
          deletePermission: 'Excluir',

          // Financial
          financial: 'Financeiro',

          // System
          system: 'Sistema',

          // Numbers (for navigation consistency)
          number: 'Número',
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

          // Common actions
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

          // Animal related
          addAnimal: 'Agregar Animal',
          animal: 'Animal',
          selectAnimal: 'Seleccionar Animal',

          // Species
          dog: 'Perro',
          cat: 'Gato',
          bird: 'Ave',
          rabbit: 'Conejo',
          hamster: 'Hámster',
          other: 'Otro',

          // Vaccine related
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

          // Profile related
          newProfile: 'Nuevo Perfil',
          editProfile: 'Editar Perfil',
          profileName: 'Nombre del Perfil',
          profileDescription: 'Descripción del Perfil',
          modulePermissions: 'Permisos por Módulo',

          // Permissions
          read: 'Ver',
          write: 'Escribir',
          deletePermission: 'Eliminar',

          // Financial
          financial: 'Financiero',

          // System
          system: 'Sistema',

          // Numbers (for navigation consistency)
          number: 'Número',
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
  if (availableLanguages.includes(lng)) {
    i18next.changeLanguage(lng);
  } else {
    console.warn(`Language ${lng} not available`);
  }
};
