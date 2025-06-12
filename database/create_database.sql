
-- Criação do banco de dados PetShop
-- Execute este script em um servidor PostgreSQL

-- Criação das tabelas principais

-- Tabela de Tutores
CREATE TABLE tutors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    street VARCHAR(255),
    number VARCHAR(10),
    neighborhood VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(2),
    zip_code VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Animais
CREATE TABLE animals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    species VARCHAR(100) NOT NULL,
    breed VARCHAR(100),
    age INTEGER,
    sex VARCHAR(10) CHECK (sex IN ('male', 'female')),
    weight DECIMAL(5,2),
    tutor_id UUID REFERENCES tutors(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Veterinários
CREATE TABLE veterinarians (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    crmv VARCHAR(20) UNIQUE NOT NULL,
    specialties TEXT[],
    phone VARCHAR(20),
    email VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Tipos de Serviços
CREATE TABLE service_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) CHECK (category IN ('consultation', 'exam', 'surgery', 'grooming')),
    duration INTEGER NOT NULL, -- em minutos
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Agendamentos
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    animal_id UUID REFERENCES animals(id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    type VARCHAR(50) CHECK (type IN ('consultation', 'exam', 'surgery', 'grooming')),
    service_type_id UUID REFERENCES service_types(id),
    veterinarian_id UUID REFERENCES veterinarians(id),
    veterinarian_name VARCHAR(255),
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Vacinas
CREATE TABLE vaccines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    animal_id UUID REFERENCES animals(id) ON DELETE CASCADE,
    vaccine_type VARCHAR(255) NOT NULL,
    batch VARCHAR(100),
    application_date DATE NOT NULL,
    next_due_date DATE,
    veterinarian VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Serviços de Banho e Tosa
CREATE TABLE grooming_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    animal_id UUID REFERENCES animals(id) ON DELETE CASCADE,
    service_date DATE NOT NULL,
    service_type VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in-progress', 'completed')),
    notes TEXT,
    price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Categorias de Produtos
CREATE TABLE product_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Fornecedores
CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18),
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Produtos
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category_id UUID REFERENCES product_categories(id),
    category VARCHAR(255), -- Para compatibilidade com dados existentes
    quantity INTEGER DEFAULT 0,
    min_quantity INTEGER DEFAULT 0,
    cost_price DECIMAL(10,2),
    sale_price DECIMAL(10,2),
    supplier_id UUID REFERENCES suppliers(id),
    supplier VARCHAR(255), -- Para compatibilidade com dados existentes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Compras
CREATE TABLE purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_id UUID REFERENCES suppliers(id),
    purchase_date DATE NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Itens de Compra
CREATE TABLE purchase_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchase_id UUID REFERENCES purchases(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Contas a Pagar
CREATE TABLE accounts_payable (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    supplier_id UUID REFERENCES suppliers(id),
    supplier VARCHAR(255), -- Para compatibilidade
    category VARCHAR(100),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
    payment_date DATE,
    purchase_id UUID REFERENCES purchases(id), -- Relaciona com compra se aplicável
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Contas a Receber
CREATE TABLE accounts_receivable (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tutor_id UUID REFERENCES tutors(id),
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    payment_method VARCHAR(100),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
    payment_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Transações de Caixa
CREATE TABLE cash_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_date DATE NOT NULL,
    type VARCHAR(20) CHECK (type IN ('income', 'expense')),
    amount DECIMAL(10,2) NOT NULL,
    description VARCHAR(255) NOT NULL,
    payment_method VARCHAR(100),
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Contas Bancárias
CREATE TABLE bank_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bank VARCHAR(255) NOT NULL,
    agency VARCHAR(20),
    account VARCHAR(20),
    holder VARCHAR(255),
    balance DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Usuários do Sistema
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('admin', 'veterinarian', 'receptionist')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Movimentações de Estoque
CREATE TABLE inventory_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id),
    movement_type VARCHAR(20) CHECK (movement_type IN ('in', 'out', 'adjustment')),
    quantity INTEGER NOT NULL,
    previous_quantity INTEGER,
    new_quantity INTEGER,
    reason VARCHAR(255),
    reference_id UUID, -- Pode referenciar compra, venda, etc.
    reference_type VARCHAR(50), -- 'purchase', 'sale', 'adjustment', etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id)
);

-- Índices para melhor performance
CREATE INDEX idx_animals_tutor_id ON animals(tutor_id);
CREATE INDEX idx_appointments_animal_id ON appointments(animal_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_vaccines_animal_id ON vaccines(animal_id);
CREATE INDEX idx_grooming_animal_id ON grooming_services(animal_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_purchase_items_purchase_id ON purchase_items(purchase_id);
CREATE INDEX idx_purchase_items_product_id ON purchase_items(product_id);
CREATE INDEX idx_accounts_payable_due_date ON accounts_payable(due_date);
CREATE INDEX idx_accounts_receivable_tutor_id ON accounts_receivable(tutor_id);
CREATE INDEX idx_inventory_movements_product_id ON inventory_movements(product_id);

-- Triggers para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tutors_updated_at BEFORE UPDATE ON tutors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_animals_updated_at BEFORE UPDATE ON animals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_veterinarians_updated_at BEFORE UPDATE ON veterinarians FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bank_accounts_updated_at BEFORE UPDATE ON bank_accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Inserção de dados de exemplo para categorias de produtos
INSERT INTO product_categories (name, description) VALUES
('Ração', 'Rações para cães e gatos'),
('Medicamentos', 'Medicamentos veterinários'),
('Brinquedos', 'Brinquedos para pets'),
('Higiene', 'Produtos de higiene e limpeza'),
('Acessórios', 'Coleiras, guias e outros acessórios');

-- Inserção de dados de exemplo para tipos de serviços
INSERT INTO service_types (name, category, duration, price, description) VALUES
('Consulta Geral', 'consultation', 30, 80.00, 'Consulta veterinária geral'),
('Exame de Sangue', 'exam', 15, 120.00, 'Coleta e análise de sangue'),
('Castração', 'surgery', 120, 300.00, 'Cirurgia de castração'),
('Banho Simples', 'grooming', 60, 40.00, 'Banho básico para pets'),
('Banho e Tosa', 'grooming', 90, 60.00, 'Banho completo com tosa'),
('Tosa Higiênica', 'grooming', 45, 35.00, 'Tosa apenas das áreas higiênicas');

-- Comentários nas tabelas
COMMENT ON TABLE tutors IS 'Tabela de tutores/proprietários dos animais';
COMMENT ON TABLE animals IS 'Tabela de animais cadastrados';
COMMENT ON TABLE veterinarians IS 'Tabela de veterinários';
COMMENT ON TABLE service_types IS 'Tabela de tipos de serviços oferecidos';
COMMENT ON TABLE appointments IS 'Tabela de agendamentos';
COMMENT ON TABLE vaccines IS 'Tabela de controle de vacinas';
COMMENT ON TABLE grooming_services IS 'Tabela de serviços de banho e tosa';
COMMENT ON TABLE products IS 'Tabela de produtos/itens';
COMMENT ON TABLE purchases IS 'Tabela de compras';
COMMENT ON TABLE purchase_items IS 'Tabela de itens das compras';
COMMENT ON TABLE accounts_payable IS 'Tabela de contas a pagar';
COMMENT ON TABLE accounts_receivable IS 'Tabela de contas a receber';
COMMENT ON TABLE inventory_movements IS 'Tabela de movimentações de estoque';
