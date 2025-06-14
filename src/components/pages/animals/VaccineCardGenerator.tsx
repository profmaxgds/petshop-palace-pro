
import type { Animal, Vaccine } from '@/types';
import { t } from '@/lib/i18n';

export const generateVaccineCard = (animal: Animal, vaccines: Vaccine[]) => {
  const animalVaccines = vaccines.filter(v => v.animalId === animal.id);
  
  const cardContent = `
    <html>
      <head>
        <title>Carteirinha de Vacinação - ${animal.name}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .animal-info { background: #f5f5f5; padding: 15px; margin-bottom: 20px; }
          .vaccine-record { border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Carteirinha de Vacinação</h1>
        </div>
        <div class="animal-info">
          <h2>Dados do Animal</h2>
          <p><strong>Nome:</strong> ${animal.name}</p>
          <p><strong>Espécie:</strong> ${t(animal.species)}</p>
          <p><strong>Raça:</strong> ${animal.breed?.name}</p>
          <p><strong>Tutor:</strong> ${animal.tutor?.name}</p>
        </div>
        ${animalVaccines.map(vaccine => `
          <div class="vaccine-record">
            <h3>Registro de Vacinação</h3>
            <p><strong>Vacina:</strong> ${vaccine.vaccineType}</p>
            <p><strong>Lote:</strong> ${vaccine.batch}</p>
            <p><strong>Data de Aplicação:</strong> ${vaccine.applicationDate.toLocaleDateString('pt-BR')}</p>
            <p><strong>Próxima Dose:</strong> ${vaccine.nextDueDate?.toLocaleDateString('pt-BR')}</p>
            ${vaccine.notes ? `<p><strong>Observações:</strong> ${vaccine.notes}</p>` : ''}
          </div>
        `).join('')}
      </body>
    </html>
  `;

  const blob = new Blob([cardContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `carteirinha-${animal.name}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
