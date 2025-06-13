
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Stethoscope, Scissors } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Animal, Vaccine, Appointment, GroomingService } from '@/types';

interface AnimalHistoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal | null;
  vaccines: Vaccine[];
  appointments: Appointment[];
  grooming: GroomingService[];
  onDownloadCard: (animalId: string) => void;
}

const AnimalHistoryDialog: React.FC<AnimalHistoryDialogProps> = ({
  isOpen,
  onClose,
  animal,
  vaccines,
  appointments,
  grooming,
  onDownloadCard
}) => {
  if (!animal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Histórico - {animal.name}</DialogTitle>
          <DialogDescription>
            Histórico completo de vacinas, consultas e serviços
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="vaccines" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vaccines">{t('vaccines')}</TabsTrigger>
            <TabsTrigger value="appointments">Consultas</TabsTrigger>
            <TabsTrigger value="exams">Exames</TabsTrigger>
            <TabsTrigger value="grooming">Banho & Tosa</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vaccines" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{t('vaccineHistory')}</h3>
              <Button
                size="sm"
                onClick={() => onDownloadCard(animal.id)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                {t('downloadCard')}
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vacina</TableHead>
                    <TableHead>Lote</TableHead>
                    <TableHead>Aplicação</TableHead>
                    <TableHead>Próxima Dose</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vaccines.filter(v => v.animalId === animal.id).map((vaccine) => (
                    <TableRow key={vaccine.id}>
                      <TableCell>{vaccine.vaccineType}</TableCell>
                      <TableCell>{vaccine.batch}</TableCell>
                      <TableCell>{vaccine.applicationDate.toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{vaccine.nextDueDate?.toLocaleDateString('pt-BR')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="appointments" className="space-y-4">
            <h3 className="text-lg font-semibold">{t('appointmentHistory')}</h3>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.filter(a => a.animalId === animal.id).map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.appointmentDate.toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{appointment.appointmentTime}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-blue-600" />
                          Consulta
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={appointment.status === 'completed' ? 'default' : 'secondary'}>
                          {appointment.status === 'completed' ? 'Realizada' : 'Agendada'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="exams" className="space-y-4">
            <h3 className="text-lg font-semibold">Histórico de Exames</h3>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Tipo de Exame</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500">
                      Nenhum exame registrado
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="grooming" className="space-y-4">
            <h3 className="text-lg font-semibold">Histórico de Banho & Tosa</h3>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grooming.filter(g => g.animalId === animal.id).map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>{service.serviceDate.toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Scissors className="w-4 h-4 text-green-600" />
                          Banho e Tosa
                        </div>
                      </TableCell>
                      <TableCell>R$ {service.price?.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={service.status === 'completed' ? 'default' : 'secondary'}>
                          {service.status === 'completed' ? 'Concluído' : 'Agendado'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AnimalHistoryDialog;
