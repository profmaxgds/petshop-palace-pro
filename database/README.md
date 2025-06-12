
# Configuração do Banco de Dados PostgreSQL

## Pré-requisitos
- PostgreSQL instalado (versão 12 ou superior)
- Cliente PostgreSQL (psql, pgAdmin, ou similar)

## Passos para configurar o banco

### 1. Criar o banco de dados
```sql
CREATE DATABASE petshop_db;
```

### 2. Executar o script de criação
Execute o arquivo `create_database.sql` no banco criado:

```bash
psql -U postgres -d petshop_db -f create_database.sql
```

Ou usando pgAdmin:
1. Conecte-se ao servidor PostgreSQL
2. Selecione o banco `petshop_db`
3. Abra o Query Tool
4. Carregue e execute o arquivo `create_database.sql`

### 3. Verificar a criação das tabelas
```sql
\dt -- Lista todas as tabelas
```

## Estrutura do Banco

### Módulo Cadastros
- `tutors` - Tutores/proprietários
- `animals` - Animais
- `veterinarians` - Veterinários

### Módulo Serviços
- `appointments` - Agendamentos
- `grooming_services` - Banho e tosa
- `vaccines` - Vacinas
- `service_types` - Tipos de serviços

### Módulo Financeiro
- `accounts_payable` - Contas a pagar
- `accounts_receivable` - Contas a receber
- `cash_transactions` - Movimentações de caixa
- `bank_accounts` - Contas bancárias

### Módulo Produtos e Estoque
- `products` - Produtos
- `product_categories` - Categorias de produtos
- `purchases` - Compras
- `purchase_items` - Itens das compras
- `inventory_movements` - Movimentações de estoque
- `suppliers` - Fornecedores

### Módulo Sistema
- `users` - Usuários do sistema

## Relacionamentos Principais

1. **Tutores → Animais**: Um tutor pode ter vários animais
2. **Animais → Agendamentos/Vacinas/Banho**: Um animal pode ter vários serviços
3. **Compras → Itens de Compra**: Uma compra tem vários itens
4. **Compras → Contas a Pagar**: Compras geram contas a pagar automaticamente
5. **Itens de Compra → Movimentação de Estoque**: Compras atualizam o estoque
6. **Produtos → Categorias**: Produtos pertencem a categorias

## Configuração da Aplicação

Para conectar a aplicação ao banco, você precisará configurar as variáveis de ambiente:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/petshop_db
```

## Backup e Restore

### Backup
```bash
pg_dump -U postgres -d petshop_db > backup_petshop.sql
```

### Restore
```bash
psql -U postgres -d petshop_db < backup_petshop.sql
```
