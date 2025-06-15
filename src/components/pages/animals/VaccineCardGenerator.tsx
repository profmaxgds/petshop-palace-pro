
import type { Animal, Vaccine } from '@/types';
import { t } from '@/lib/i18n';

interface VaccineCardLayout {
  title: string;
  subtitle: string;
  headerColor: string;
  backgroundColor: string;
  fontFamily: string;
  fontSize: string;
  showLogo: boolean;
  logoPosition: 'left' | 'right';
  logoUrl?: string;
  showBorder: boolean;
  borderColor: string;
  fields: {
    animalName: boolean;
    tutorName: boolean;
    species: boolean;
    breed: boolean;
    birthDate: boolean;
    weight: boolean;
    microchip: boolean;
    veterinarian: boolean;
    clinicInfo: boolean;
  };
}

// Mock function to get clinic info from settings
const getClinicInfo = () => {
  // In a real scenario, this would fetch from a global state, context, or API
  // For now, we'll use mock data.
  const storedSettings = localStorage.getItem('clinicSettings');
  if (storedSettings) {
    try {
      return JSON.parse(storedSettings);
    } catch (e) {
      console.error("Could not parse clinic settings from localStorage", e)
    }
  }
  return {
    name: 'Clínica Veterinária PetShop',
    phone: '(11) 99999-9999',
    website: 'www.petshop.com.br',
    email: 'contato@petshop.com.br'
  };
};

const getStoredLayout = (): VaccineCardLayout => {
  try {
    const stored = localStorage.getItem('vaccineCardLayout');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading vaccine card layout:', error);
  }
  
  // Default layout
  return {
    title: 'CARTEIRINHA DE VACINAÇÃO',
    subtitle: 'Controle Sanitário Veterinário',
    headerColor: '#0d9488',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial',
    fontSize: '14',
    showLogo: true,
    logoPosition: 'left',
    showBorder: true,
    borderColor: '#e5e7eb',
    fields: {
      animalName: true,
      tutorName: true,
      species: true,
      breed: true,
      birthDate: true,
      weight: true,
      microchip: false,
      veterinarian: true,
      clinicInfo: true,
    }
  };
};

export const generateVaccineCard = (animal: Animal, vaccines: Vaccine[]) => {
  const layout = getStoredLayout();
  const clinicInfo = getClinicInfo();
  const animalVaccines = vaccines
    .filter(v => v.animalId === animal.id)
    .sort((a, b) => {
      if (a.vaccineType.toLowerCase() < b.vaccineType.toLowerCase()) return -1;
      if (a.vaccineType.toLowerCase() > b.vaccineType.toLowerCase()) return 1;
      
      const dateA = a.applicationDate instanceof Date ? a.applicationDate : new Date(a.applicationDate);
      const dateB = b.applicationDate instanceof Date ? b.applicationDate : new Date(b.applicationDate);

      return dateA.getTime() - dateB.getTime();
    });
  
  const logoHtml = layout.showLogo ? `
    <div class="logo" style="
      position: ${layout.logoPosition === 'left' ? 'absolute; left: 20px' : 'absolute; right: 20px'};
      top: 20px;
      width: 60px;
      height: 60px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      ${layout.logoUrl ? `background-image: url(${layout.logoUrl}); background-size: cover; background-position: center;` : ''}
    ">
      ${!layout.logoUrl ? '<span style="font-size: 24px;">🐾</span>' : ''}
    </div>
  ` : '';
  
  const cardContent = `
    <html>
      <head>
        <title>Carteirinha de Vacinação - ${animal.name}</title>
        <meta charset="UTF-8">
        <style>
          body { 
            font-family: ${layout.fontFamily}, sans-serif; 
            padding: 20px; 
            margin: 0;
            font-size: ${layout.fontSize}px;
            background-color: ${layout.backgroundColor};
          }
          .card-container {
            max-width: 600px;
            margin: 0 auto;
            background: ${layout.backgroundColor};
            ${layout.showBorder ? `border: 2px solid ${layout.borderColor};` : ''}
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: ${layout.headerColor};
            color: white;
            padding: 30px 20px;
            text-align: center;
            position: relative;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
          }
          .header p {
            margin: 5px 0 0 0;
            font-size: 16px;
            opacity: 0.9;
          }
          .animal-info { 
            background: #f8f9fa; 
            padding: 20px; 
            margin: 20px;
            border-radius: 8px;
          }
          .animal-info h2 {
            margin: 0 0 15px 0;
            font-size: 18px;
            color: #333;
            border-bottom: 2px solid ${layout.headerColor};
            padding-bottom: 8px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .info-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
          }
          .info-label {
            font-weight: 600;
            color: #555;
          }
          .info-value {
            color: #333;
          }
          .vaccines-section {
            margin: 20px;
          }
          .vaccines-section h2 {
            margin: 0 0 15px 0;
            font-size: 18px;
            color: #333;
            border-bottom: 2px solid ${layout.headerColor};
            padding-bottom: 8px;
          }
          .vaccine-record { 
            border: 1px solid #ddd; 
            padding: 15px; 
            margin-bottom: 15px; 
            border-radius: 6px;
            background: white;
            transition: background-color 0.3s;
          }
          .vaccine-record.scheduled {
            background-color: #f8fafc; /* slate-50 */
            border-color: #e2e8f0; /* slate-200 */
          }
          .vaccine-record.scheduled .vaccine-name {
            color: #64748b; /* slate-500 */
          }
          .vaccine-record.scheduled .vaccine-date {
            background-color: #e2e8f0; /* slate-200 */
            color: #475569; /* slate-600 */
          }
          .vaccine-record.scheduled .vaccine-detail {
            color: #94a3b8; /* slate-400 */
          }
          .vaccine-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
          }
          .vaccine-name {
            font-size: 16px;
            font-weight: bold;
            color: ${layout.headerColor};
          }
          .vaccine-date {
            background: ${layout.headerColor};
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
          }
          .vaccine-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            font-size: 13px;
          }
          .vaccine-detail {
            color: #666;
          }
          .vaccine-signature {
            margin-top: 20px;
            text-align: center;
          }
          .signature-line {
            border-bottom: 1px solid #333;
            width: 250px;
            margin: 0 auto 5px auto;
          }
          .signature-info {
            font-size: 12px;
            color: #333;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #e9ecef;
            background: #f8f9fa;
          }
          @media print {
            body { padding: 0; }
            .card-container { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="card-container">
          <div class="header">
            ${logoHtml}
            <h1>${layout.title}</h1>
            <p>${layout.subtitle}</p>
          </div>
          
          <div class="animal-info">
            <h2>Dados do Animal</h2>
            <div class="info-grid">
              ${layout.fields.animalName ? `
                <div class="info-item">
                  <span class="info-label">Nome:</span>
                  <span class="info-value">${animal.name}</span>
                </div>
              ` : ''}
              ${layout.fields.tutorName ? `
                <div class="info-item">
                  <span class="info-label">Tutor:</span>
                  <span class="info-value">${animal.tutor?.name || 'N/A'}</span>
                </div>
              ` : ''}
              ${layout.fields.species ? `
                <div class="info-item">
                  <span class="info-label">Espécie:</span>
                  <span class="info-value">${t(animal.species)}</span>
                </div>
              ` : ''}
              ${layout.fields.breed ? `
                <div class="info-item">
                  <span class="info-label">Raça:</span>
                  <span class="info-value">${animal.breed?.name || 'SRD'}</span>
                </div>
              ` : ''}
              ${layout.fields.birthDate && animal.age ? `
                <div class="info-item">
                  <span class="info-label">Idade:</span>
                  <span class="info-value">${animal.age} anos</span>
                </div>
              ` : ''}
              ${layout.fields.weight && animal.weight ? `
                <div class="info-item">
                  <span class="info-label">Peso:</span>
                  <span class="info-value">${animal.weight} kg</span>
                </div>
              ` : ''}
              ${layout.fields.microchip && animal.microchip ? `
                <div class="info-item">
                  <span class="info-label">Microchip:</span>
                  <span class="info-value">${animal.microchip}</span>
                </div>
              ` : ''}
            </div>
          </div>

          <div class="vaccines-section">
            <h2>Histórico de Vacinação</h2>
            ${animalVaccines.length === 0 ? `
              <p style="text-align: center; padding: 20px; color: #666;">
                Nenhuma vacina registrada para este animal.
              </p>
            ` : animalVaccines.map(vaccine => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const appDate = vaccine.applicationDate instanceof Date ? vaccine.applicationDate : new Date(vaccine.applicationDate);
                appDate.setHours(0, 0, 0, 0);

                const isScheduled = appDate > today;
                const dateString = appDate.toLocaleDateString('pt-BR');
                const nextDueDateString = vaccine.nextDueDate 
                  ? (vaccine.nextDueDate instanceof Date ? vaccine.nextDueDate.toLocaleDateString('pt-BR') : new Date(vaccine.nextDueDate).toLocaleDateString('pt-BR')) 
                  : '';

                return `
              <div class="vaccine-record ${isScheduled ? 'scheduled' : ''}">
                <div class="vaccine-header">
                  <span class="vaccine-name">${vaccine.vaccineType}</span>
                  <span class="vaccine-date">${dateString}${isScheduled ? ' (Agendada)' : ''}</span>
                </div>
                <div class="vaccine-details">
                  ${vaccine.batch ? `<div class="vaccine-detail"><strong>Lote:</strong> ${vaccine.batch}</div>` : ''}
                  ${nextDueDateString ? `<div class="vaccine-detail"><strong>Próxima Dose:</strong> ${nextDueDateString}</div>` : ''}
                  ${vaccine.notes ? `<div class="vaccine-detail" style="grid-column: 1 / -1;"><strong>Observações:</strong> ${vaccine.notes}</div>` : ''}
                </div>
                ${!isScheduled && layout.fields.veterinarian && vaccine.veterinarian ? `
                  <div class="vaccine-signature">
                    <div class="signature-line"></div>
                    <div class="signature-info">
                      ${vaccine.veterinarian.name}<br>
                      CRMV: ${vaccine.veterinarian.crmv}
                    </div>
                  </div>
                ` : ''}
              </div>
            `}).join('')}
          </div>

          ${layout.fields.clinicInfo ? `
            <div class="footer">
              <h3 style="margin: 0 0 10px 0; color: ${layout.headerColor};">${clinicInfo.name}</h3>
              <p style="margin: 5px 0;">📞 Telefone: ${clinicInfo.phone}</p>
              <p style="margin: 5px 0;">🌐 ${clinicInfo.website}</p>
              <p style="margin: 5px 0;">📧 ${clinicInfo.email}</p>
            </div>
          ` : ''}
        </div>
      </body>
    </html>
  `;

  const blob = new Blob([cardContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `carteirinha-${animal.name.replace(/\s+/g, '-')}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
