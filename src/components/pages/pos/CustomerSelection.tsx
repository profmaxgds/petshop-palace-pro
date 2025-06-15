
import React, { useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tutor, Animal } from '@/types';

interface CustomerSelectionProps {
    tutors: Tutor[];
    animals: Animal[];
    selectedTutorId: string;
    onTutorChange: (tutorId: string) => void;
    selectedAnimalId: string;
    onAnimalChange: (animalId: string) => void;
}

const CustomerSelection: React.FC<CustomerSelectionProps> = ({
    tutors,
    animals,
    selectedTutorId,
    onTutorChange,
    selectedAnimalId,
    onAnimalChange,
}) => {
    const availableAnimals = useMemo(() => {
        if (!selectedTutorId) return [];
        return animals.filter(a => a.tutorId === selectedTutorId);
    }, [selectedTutorId, animals]);

    useEffect(() => {
        onAnimalChange('');
    }, [selectedTutorId]);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">1. Cliente e Animal</h3>
            <div>
                <Label htmlFor="tutor">Tutor</Label>
                <Select value={selectedTutorId} onValueChange={onTutorChange}>
                    <SelectTrigger id="tutor"><SelectValue placeholder="Selecione um tutor..." /></SelectTrigger>
                    <SelectContent>
                        {tutors.map(tutor => (
                            <SelectItem key={tutor.id} value={tutor.id}>{tutor.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="animal">Animal</Label>
                <Select value={selectedAnimalId} onValueChange={onAnimalChange} disabled={!selectedTutorId}>
                    <SelectTrigger id="animal"><SelectValue placeholder="Selecione um animal..." /></SelectTrigger>
                    <SelectContent>
                        {availableAnimals.map(animal => (
                            <SelectItem key={animal.id} value={animal.id}>{animal.name} ({animal.species})</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default CustomerSelection;
