
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Banknote, Plus } from 'lucide-react';

const AccountsReceivable: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contas a Receber</h1>
          <p className="text-gray-600">Gestão de receitas e recebimentos</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Contas a Receber</CardTitle>
              <CardDescription>
                Valores pendentes de recebimento
              </CardDescription>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nova Conta
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="text-center py-12">
            <Banknote className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Contas a Receber
            </h3>
            <p className="text-gray-600">
              Funcionalidade em desenvolvimento...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsReceivable;
