
-- Criação do banco de dados PetShop
-- Execute este script em um servidor PostgreSQL

-- Criação das tabelas principais

-- Tabela de Usuários do Sistema (movida para o início para referências)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('admin', 'veterinarian', 'receptionist', 'manager')) DEFAULT 'receptionist',
    permissions JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Animais
CREATE TABLE animals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    species VARCHAR(100) NOT NULL CHECK (species IN ('dog', 'cat', 'bird', 'rabbit', 'hamster', 'other')),
    breed VARCHAR(100),
    age INTEGER,
    sex VARCHAR(10) CHECK (sex IN ('male', 'female')),
    weight DECIMAL(5,2),
    color VARCHAR(100),
    microchip VARCHAR(50),
    observations TEXT,
    tutor_id UUID REFERENCES tutors(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
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
    schedule JSONB, -- Horários de trabalho
    consultation_price DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'vacation')),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Categorias de Produtos
CREATE TABLE product_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Fornecedores
CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18),
    phone VARCHAR(20),
    email VARCHAR(255),
    contact_person VARCHAR(255),
    address TEXT,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Tipos de Serviços
CREATE TABLE service_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) CHECK (category IN ('consultation', 'exam', 'surgery', 'grooming', 'vaccine')),
    duration INTEGER NOT NULL, -- em minutos
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    requires_veterinarian BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Produtos
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category_id UUID REFERENCES product_categories(id),
    barcode VARCHAR(50),
    quantity INTEGER DEFAULT 0,
    min_quantity INTEGER DEFAULT 0,
    cost_price DECIMAL(10,2),
    sale_price DECIMAL(10,2),
    margin_percentage DECIMAL(5,2),
    supplier_id UUID REFERENCES suppliers(id),
    expiration_control BOOLEAN DEFAULT false,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Agendamentos
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    animal_id UUID REFERENCES animals(id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    service_type_id UUID REFERENCES service_types(id),
    veterinarian_id UUID REFERENCES veterinarians(id),
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')),
    total_price DECIMAL(10,2),
    notes TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Vacinas
CREATE TABLE vaccines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    animal_id UUID REFERENCES animals(id) ON DELETE CASCADE,
    vaccine_type VARCHAR(255) NOT NULL,
    brand VARCHAR(100),
    batch VARCHAR(100),
    application_date DATE NOT NULL,
    next_due_date DATE,
    veterinarian_id UUID REFERENCES veterinarians(id),
    price DECIMAL(10,2),
    notes TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Serviços de Banho e Tosa
CREATE TABLE grooming_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    animal_id UUID REFERENCES animals(id) ON DELETE CASCADE,
    service_date DATE NOT NULL,
    service_time TIME,
    service_type_id UUID REFERENCES service_types(id),
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
    price DECIMAL(10,2),
    notes TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Compras
CREATE TABLE purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_id UUID REFERENCES suppliers(id),
    purchase_date DATE NOT NULL,
    invoice_number VARCHAR(100),
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'received', 'completed', 'cancelled')),
    notes TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Itens de Compra
CREATE TABLE purchase_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchase_id UUID REFERENCES purchases(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    expiration_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Contas a Pagar
CREATE TABLE accounts_payable (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    supplier_id UUID REFERENCES suppliers(id),
    category VARCHAR(100),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
    payment_date DATE,
    payment_method VARCHAR(100),
    purchase_id UUID REFERENCES purchases(id), -- Relaciona com compra se aplicável
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Contas a Receber
CREATE TABLE accounts_receivable (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tutor_id UUID REFERENCES tutors(id),
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    payment_method VARCHAR(100),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
    payment_date DATE,
    appointment_id UUID REFERENCES appointments(id),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    reference_id UUID, -- Pode referenciar conta a pagar/receber
    reference_type VARCHAR(50),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Contas Bancárias
CREATE TABLE bank_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bank VARCHAR(255) NOT NULL,
    agency VARCHAR(20),
    account VARCHAR(20),
    holder VARCHAR(255),
    account_type VARCHAR(50) CHECK (account_type IN ('checking', 'savings', 'business')),
    balance DECIMAL(15,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Movimentações de Estoque
CREATE TABLE inventory_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id),
    movement_type VARCHAR(20) CHECK (movement_type IN ('in', 'out', 'adjustment', 'transfer')),
    quantity INTEGER NOT NULL,
    previous_quantity INTEGER,
    new_quantity INTEGER,
    reason VARCHAR(255),
    reference_id UUID, -- Pode referenciar compra, venda, etc.
    reference_type VARCHAR(50), -- 'purchase', 'sale', 'adjustment', etc.
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Sessões de Usuário
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Log de Atividades
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX idx_animals_tutor_id ON animals(tutor_id);
CREATE INDEX idx_appointments_animal_id ON appointments(animal_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_veterinarian ON appointments(veterinarian_id);
CREATE INDEX idx_vaccines_animal_id ON vaccines(animal_id);
CREATE INDEX idx_grooming_animal_id ON grooming_services(animal_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_supplier ON products(supplier_id);
CREATE INDEX idx_purchase_items_purchase_id ON purchase_items(purchase_id);
CREATE INDEX idx_purchase_items_product_id ON purchase_items(product_id);
CREATE INDEX idx_accounts_payable_due_date ON accounts_payable(due_date);
CREATE INDEX idx_accounts_payable_supplier ON accounts_payable(supplier_id);
CREATE INDEX idx_accounts_receivable_tutor_id ON accounts_receivable(tutor_id);
CREATE INDEX idx_inventory_movements_product_id ON inventory_movements(product_id);
CREATE INDEX idx_user_sessions_token ON user_sessions(token);
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);

-- Triggers para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tutors_updated_at BEFORE UPDATE ON tutors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_animals_updated_at BEFORE UPDATE ON animals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_veterinarians_updated_at BEFORE UPDATE ON veterinarians FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_purchases_updated_at BEFORE UPDATE ON purchases FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_accounts_payable_updated_at BEFORE UPDATE ON accounts_payable FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_accounts_receivable_updated_at BEFORE UPDATE ON accounts_receivable FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bank_accounts_updated_at BEFORE UPDATE ON bank_accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger para atualizar estoque automaticamente
CREATE OR REPLACE FUNCTION update_product_stock()
RETURNS TRIGGER AS $$
BEGIN
    -- Atualiza o estoque do produto
    UPDATE products 
    SET quantity = NEW.new_quantity
    WHERE id = NEW.product_id;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_stock_trigger 
    AFTER INSERT ON inventory_movements 
    FOR EACH ROW 
    EXECUTE FUNCTION update_product_stock();

-- Trigger para criar conta a pagar automaticamente quando compra é criada
CREATE OR REPLACE FUNCTION create_payable_from_purchase()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO accounts_payable (
        description,
        amount,
        due_date,
        supplier_id,
        category,
        purchase_id,
        created_by
    ) VALUES (
        'Compra #' || NEW.invoice_number,
        NEW.total,
        NEW.purchase_date + INTERVAL '30 days', -- Vencimento em 30 dias
        NEW.supplier_id,
        'Compra de Produtos',
        NEW.id,
        NEW.created_by
    );
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER create_payable_trigger 
    AFTER INSERT ON purchases 
    FOR EACH ROW 
    EXECUTE FUNCTION create_payable_from_purchase();

-- Inserção de dados de exemplo

-- Inserir usuário administrador padrão
INSERT INTO users (name, email, password_hash, role, permissions) VALUES
('Administrador', 'admin@petshop.com', '$2b$10$hash_exemplo', 'admin', '{"all": true}'),
('Dr. João Silva', 'joao@petshop.com', '$2b$10$hash_exemplo', 'veterinarian', '{"animals": ["read", "write"], "appointments": ["read", "write"], "vaccines": ["read", "write"]}'),
('Maria Recepção', 'maria@petshop.com', '$2b$10$hash_exemplo', 'receptionist', '{"tutors": ["read", "write"], "animals": ["read"], "appointments": ["read", "write"]}');

-- Inserir categorias de produtos
INSERT INTO product_categories (name, description, created_by) VALUES
('Ração', 'Rações para cães e gatos', (SELECT id FROM users WHERE role = 'admin' LIMIT 1)),
('Medicamentos', 'Medicamentos veterinários', (SELECT id FROM users WHERE role = 'admin' LIMIT 1)),
('Brinquedos', 'Brinquedos para pets', (SELECT id FROM users WHERE role = 'admin' LIMIT 1)),
('Higiene', 'Produtos de higiene e limpeza', (SELECT id FROM users WHERE role = 'admin' LIMIT 1)),
('Acessórios', 'Coleiras, guias e outros acessórios', (SELECT id FROM users WHERE role = 'admin' LIMIT 1));

-- Inserir tipos de serviços
INSERT INTO service_types (name, category, duration, price, description, requires_veterinarian, created_by) VALUES
('Consulta Geral', 'consultation', 30, 80.00, 'Consulta veterinária geral', true, (SELECT id FROM users WHERE role = 'admin' LIMIT 1)),
('Exame de Sangue', 'exam', 15, 120.00, 'Coleta e análise de sangue', true, (SELECT id FROM users WHERE role = 'admin' LIMIT 1)),
('Castração', 'surgery', 120, 300.00, 'Cirurgia de castração', true, (SELECT id FROM users WHERE role = 'admin' LIMIT 1)),
('Banho Simples', 'grooming', 60, 40.00, 'Banho básico para pets', false, (SELECT id FROM users WHERE role = 'admin' LIMIT 1)),
('Banho e Tosa', 'grooming', 90, 60.00, 'Banho completo com tosa', false, (SELECT id FROM users WHERE role = 'admin' LIMIT 1)),
('Tosa Higiênica', 'grooming', 45, 35.00, 'Tosa apenas das áreas higiênicas', false, (SELECT id FROM users WHERE role = 'admin' LIMIT 1)),
('Vacina V8', 'vaccine', 10, 45.00, 'Vacina múltipla para cães', true, (SELECT id FROM users WHERE role = 'admin' LIMIT 1)),
('Vacina Antirrábica', 'vaccine', 10, 35.00, 'Vacina contra raiva', true, (SELECT id FROM users WHERE role = 'admin' LIMIT 1));

-- Comentários nas tabelas
COMMENT ON TABLE users IS 'Usuários do sistema com autenticação e permissões';
COMMENT ON TABLE tutors IS 'Tutores/proprietários dos animais';
COMMENT ON TABLE animals IS 'Animais cadastrados';
COMMENT ON TABLE veterinarians IS 'Veterinários credenciados';
COMMENT ON TABLE service_types IS 'Tipos de serviços oferecidos';
COMMENT ON TABLE appointments IS 'Agendamentos de serviços';
COMMENT ON TABLE vaccines IS 'Controle de vacinas aplicadas';
COMMENT ON TABLE grooming_services IS 'Serviços de banho e tosa';
COMMENT ON TABLE products IS 'Produtos/itens do estoque';
COMMENT ON TABLE purchases IS 'Compras realizadas';
COMMENT ON TABLE purchase_items IS 'Itens das compras';
COMMENT ON TABLE accounts_payable IS 'Contas a pagar';
COMMENT ON TABLE accounts_receivable IS 'Contas a receber';
COMMENT ON TABLE inventory_movements IS 'Movimentações de estoque';
COMMENT ON TABLE user_sessions IS 'Sessões ativas dos usuários';
COMMENT ON TABLE activity_logs IS 'Log de atividades do sistema';
