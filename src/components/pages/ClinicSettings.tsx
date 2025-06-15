
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { t } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';
import { FileText } from 'lucide-react';
import type { ClinicSettings as ClinicSettingsType } from '@/types';

const ClinicSettings: React.FC = () => {
  const { toast } = useToast();

  const [settings, setSettings] = useState<Partial<ClinicSettingsType>>({
    allowAnimalDoubleBooking: true,
    allowVetDoubleBooking: false,
    blockBookingOutsideWorkHours: true,
    allowDoubleBookingForExamServices: true,
  });

  const handleSettingChange = (key: keyof typeof settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const handleSaveChanges = () => {
    // In a real application, you would save these settings to your backend.
    console.log('Saving clinic settings:', settings);
    toast({
      title: t('saveSuccess'),
      description: t('clinicSettingsSaved'),
    });
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
              <Label htmlFor="allowAnimalDoubleBooking" className="font-semibold text-base">{t('allowAnimalDoubleBooking')}</Label>
              <p className="text-sm text-gray-500">{t('allowAnimalDoubleBookingDesc')}</p>
            </div>
            <Switch
              id="allowAnimalDoubleBooking"
              checked={settings.allowAnimalDoubleBooking}
              onCheckedChange={(value) => handleSettingChange('allowAnimalDoubleBooking', value)}
            />
          </div>
          
          <div className="flex items-start sm:items-center justify-between p-4 border rounded-lg flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="allowVetDoubleBooking" className="font-semibold text-base">{t('allowVetDoubleBooking')}</Label>
              <p className="text-sm text-gray-500">{t('allowVetDoubleBookingDesc')}</p>
            </div>
            <Switch
              id="allowVetDoubleBooking"
              checked={settings.allowVetDoubleBooking}
              onCheckedChange={(value) => handleSettingChange('allowVetDoubleBooking', value)}
            />
          </div>

          <div className="flex items-start sm:items-center justify-between p-4 border rounded-lg flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="allowDoubleBookingForExamServices" className="font-semibold text-base">{t('allowDoubleBookingForExams')}</Label>
              <p className="text-sm text-gray-500">{t('allowDoubleBookingForExamsDesc')}</p>
            </div>
            <Switch
              id="allowDoubleBookingForExamServices"
              checked={settings.allowDoubleBookingForExamServices}
              onCheckedChange={(value) => handleSettingChange('allowDoubleBookingForExamServices', value)}
            />
          </div>
          
          <div className="flex items-start sm:items-center justify-between p-4 border rounded-lg flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="blockBookingOutsideWorkHours" className="font-semibold text-base">{t('blockBookingOutsideWorkHours')}</Label>
              <p className="text-sm text-gray-500">{t('blockBookingOutsideWorkHoursDesc')}</p>
            </div>
            <Switch
              id="blockBookingOutsideWorkHours"
              checked={settings.blockBookingOutsideWorkHours}
              onCheckedChange={(value) => handleSettingChange('blockBookingOutsideWorkHours', value)}
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
