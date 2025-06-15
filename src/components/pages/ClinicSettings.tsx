
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { t } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';
import { FileText } from 'lucide-react';
import type { ClinicSettings as ClinicSettingsType } from '@/types';

const CLINIC_SETTINGS_KEY = 'clinicSettings';

const defaultSettings: Partial<ClinicSettingsType> = {
  preventAnimalDoubleBooking: true,
  preventVetDoubleBooking: true,
  preventBookingOutsideWorkHours: true,
  allowDoubleBookingForExamServices: true,
};

const ClinicSettings: React.FC = () => {
  const { toast } = useToast();

  const [settings, setSettings] = useState<Partial<ClinicSettingsType>>(defaultSettings);

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(CLINIC_SETTINGS_KEY);
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error("Failed to load clinic settings from localStorage", error);
    }
  }, []);

  const handleSettingChange = (key: keyof ClinicSettingsType, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const handleSaveChanges = () => {
    try {
      localStorage.setItem(CLINIC_SETTINGS_KEY, JSON.stringify(settings));
      console.log('Saving clinic settings:', settings);
      toast({
        title: t('saveSuccess'),
        description: t('clinicSettingsSaved'),
      });
    } catch (error) {
      console.error('Failed to save clinic settings to localStorage', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar as configurações.",
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('clinicSettings')}</h1>
        <p className="text-gray-600">{t('manageClinicRules')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {t('appointmentRules')}
          </CardTitle>
          <CardDescription>{t('configureAppointmentRules')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start sm:items-center justify-between p-4 border rounded-lg flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="preventAnimalDoubleBooking" className="font-semibold text-base">Impedir agendamento duplo para o mesmo animal no mesmo horário</Label>
              <p className="text-sm text-gray-500">Não permite que um animal tenha múltiplos serviços (ex: consulta e banho) agendados simultaneamente.</p>
            </div>
            <Switch
              id="preventAnimalDoubleBooking"
              checked={!!settings.preventAnimalDoubleBooking}
              onCheckedChange={(value) => handleSettingChange('preventAnimalDoubleBooking', value)}
            />
          </div>
          
          <div className="flex items-start sm:items-center justify-between p-4 border rounded-lg flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="preventVetDoubleBooking" className="font-semibold text-base">Impedir agendamento duplo para o mesmo veterinário no mesmo horário</Label>
              <p className="text-sm text-gray-500">Não permite que um veterinário atenda múltiplos animais ou realize múltiplos serviços simultaneamente.</p>
            </div>
            <Switch
              id="preventVetDoubleBooking"
              checked={!!settings.preventVetDoubleBooking}
              onCheckedChange={(value) => handleSettingChange('preventVetDoubleBooking', value)}
            />
          </div>

          <div className="flex items-start sm:items-center justify-between p-4 border rounded-lg flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="allowDoubleBookingForExamServices" className="font-semibold text-base">Permitir agendamento simultâneo de exames</Label>
              <p className="text-sm text-gray-500">Permite que múltiplos exames sejam agendados ao mesmo tempo para o mesmo animal ou veterinário, ignorando as regras de bloqueio.</p>
            </div>
            <Switch
              id="allowDoubleBookingForExamServices"
              checked={!!settings.allowDoubleBookingForExamServices}
              onCheckedChange={(value) => handleSettingChange('allowDoubleBookingForExamServices', value)}
            />
          </div>
          
          <div className="flex items-start sm:items-center justify-between p-4 border rounded-lg flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="preventBookingOutsideWorkHours" className="font-semibold text-base">Validar horário de trabalho do veterinário</Label>
              <p className="text-sm text-gray-500">Permitir agendamentos apenas dentro dos dias e horários de trabalho definidos para o veterinário.</p>
            </div>
            <Switch
              id="preventBookingOutsideWorkHours"
              checked={!!settings.preventBookingOutsideWorkHours}
              onCheckedChange={(value) => handleSettingChange('preventBookingOutsideWorkHours', value)}
            />
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button onClick={handleSaveChanges} className="bg-teal-600 hover:bg-teal-700">
              {t('save')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicSettings;
