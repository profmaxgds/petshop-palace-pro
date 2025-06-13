
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { t } from '@/lib/i18n';
import type { Animal, Tutor, Breed } from '@/types';

interface AnimalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  editingAnimal: Animal | null;
  formData: {
    name: string;
    species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'other';
    breedId: string;
    age: number;
    sex: 'male' | 'female';
    weight: number;
    tutorId: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'other';
    breedId: string;
    age: number;
    sex: 'male' | 'female';
    weight: number;
    tutorId: string;
  }>>;
  tutors: Tutor[];
  breeds: Breed[];
}

const AnimalForm: React.FC<AnimalFormProps> = ({
  isOpen,
  onClose,
  onSave,
  editingAnimal,
  formData,
  setFormData,
  tutors,
  breeds
}) => {
  const getFilteredBreeds = () => {
    return breeds.filter(breed => breed.species === formData.species && breed.isActive);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingAnimal ? t('editAnimal') : t('addAnimal')}
          </DialogTitle>
          <DialogDescription>
            Preencha os dados do animal
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="md:col-span-2">
            <Label htmlFor="name">{t('animalName')}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Nome do animal"
            />
          </div>
          
          <div>
            <Label htmlFor="species">{t('species')}</Label>
            <Select
              value={formData.species}
              onValueChange={(value: 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'other') => setFormData({...formData, species: value, breedId: ''})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a espécie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dog">{t('dog')}</SelectItem>
                <SelectItem value="cat">{t('cat')}</SelectItem>
                <SelectItem value="bird">{t('bird')}</SelectItem>
                <SelectItem value="rabbit">{t('rabbit')}</SelectItem>
                <SelectItem value="hamster">{t('hamster')}</SelectItem>
                <SelectItem value="other">{t('other')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="breedId">{t('breed')}</Label>
            <Select
              value={formData.breedId}
              onValueChange={(value) => setFormData({...formData, breedId: value})}
              disabled={!formData.species}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a raça" />
              </SelectTrigger>
              <SelectContent>
                {getFilteredBreeds().map((breed) => (
                  <SelectItem key={breed.id} value={breed.id}>
                    {breed.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="age">{t('age')}</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
              placeholder="Idade em anos"
            />
          </div>
          
          <div>
            <Label htmlFor="sex">{t('sex')}</Label>
            <Select
              value={formData.sex}
              onValueChange={(value: 'male' | 'female') => setFormData({...formData, sex: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o sexo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{t('male')}</SelectItem>
                <SelectItem value="female">{t('female')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="weight">{t('weight')} (kg)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: parseFloat(e.target.value) || 0})}
              placeholder="Peso em kg"
            />
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="tutorId">{t('tutor')}</Label>
            <Select
              value={formData.tutorId}
              onValueChange={(value) => setFormData({...formData, tutorId: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tutor" />
              </SelectTrigger>
              <SelectContent>
                {tutors.map((tutor) => (
                  <SelectItem key={tutor.id} value={tutor.id}>
                    {tutor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button onClick={onSave} className="bg-teal-600 hover:bg-teal-700">
            {t('save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AnimalForm;
