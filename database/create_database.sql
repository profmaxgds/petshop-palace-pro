
-- Criar banco de dados
CREATE DATABASE petshop_db;
USE petshop_db;

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de usuários (unificada com veterinários)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'veterinarian', 'receptionist', 'manager')),
    crmv VARCHAR(20), -- Apenas para veterinários
    specialties TEXT[], -- Apenas para veterinários
    consultation_price DECIMAL(10,2), -- Apenas para veterinários
    permissions JSONB NOT NULL DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de sessões de usuário
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de raças
CREATE TABLE breeds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    species VARCHAR(50) NOT NULL CHECK (species IN ('dog', 'cat', 'bird', 'rabbit', 'hamster', 'other')),
    characteristics TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de salas
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('consultation', 'surgery', 'grooming', 'other')),
    capacity INTEGER DEFAULT 1,
    equipment TEXT[],
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de tutores
CREATE TABLE tutors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    phone VARCHAR(20),
    email VARCHAR(255),
    street VARCHAR(255),
    number VARCHAR(20),
    neighborhood VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(2),
    zip_code VARCHAR(10),
    notes TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de animais
CREATE TABLE animals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    species VARCHAR(50) NOT NULL CHECK (species IN ('dog', 'cat', 'bird', 'rabbit', 'hamster', 'other')),
    breed_id UUID REFERENCES breeds(id),
    age INTEGER,
    sex VARCHAR(10) CHECK (sex IN ('male', 'female')),
    weight DECIMAL(5,2),
    color VARCHAR(100),
    microchip VARCHAR(50),
    observations TEXT,
    tutor_id UUID NOT NULL REFERENCES tutors(id) ON DELETE CASCADE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de tipos de serviços
CREATE TABLE service_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('consultation', 'exam', 'surgery', 'grooming', 'vaccine')),
    duration INTEGER NOT NULL, -- em minutos
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    requires_veterinarian BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de agendamentos
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    animal_id UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    service_type_id UUID NOT NULL REFERENCES service_types(id),
    veterinarian_id UUID REFERENCES users(id),
    room_id UUID REFERENCES rooms(id),
    status VARCHAR(50) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')),
    total_price DECIMAL(10,2),
    notes TEXT,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de vacinas
CREATE TABLE vaccines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    animal_id UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
    vaccine_type VARCHAR(255) NOT NULL,
    brand VARCHAR(255),
    batch VARCHAR(50),
    application_date DATE NOT NULL,
    next_due_date DATE,
    veterinarian_id UUID REFERENCES users(id),
    price DECIMAL(10,2),
    notes TEXT,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de serviços de banho e tosa
CREATE TABLE grooming_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    animal_id UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
    service_date DATE NOT NULL,
    service_time TIME,
    service_type_id UUID NOT NULL REFERENCES service_types(id),
    room_id UUID REFERENCES rooms(id),
    status VARCHAR(50) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
    price DECIMAL(10,2),
    notes TEXT,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de categorias de produtos
CREATE TABLE product_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de fornecedores
CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18),
    phone VARCHAR(20),
    email VARCHAR(255),
    contact_person VARCHAR(255),
    address TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de produtos
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category_id UUID NOT NULL REFERENCES product_categories(id),
    barcode VARCHAR(50),
    quantity INTEGER NOT NULL DEFAULT 0,
    min_quantity INTEGER NOT NULL DEFAULT 0,
    cost_price DECIMAL(10,2),
    sale_price DECIMAL(10,2),
    margin_percentage DECIMAL(5,2),
    supplier_id UUID REFERENCES suppliers(id),
    expiration_control BOOLEAN NOT NULL DEFAULT false,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de compras
CREATE TABLE purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    supplier_id UUID NOT NULL REFERENCES suppliers(id),
    purchase_date DATE NOT NULL,
    invoice_number VARCHAR(100),
    total DECIMAL(12,2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'received', 'completed', 'cancelled')),
    notes TEXT,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de itens da compra
CREATE TABLE purchase_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    purchase_id UUID NOT NULL REFERENCES purchases(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total DECIMAL(12,2) NOT NULL,
    expiration_date DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de contas a pagar
CREATE TABLE accounts_payable (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    due_date DATE NOT NULL,
    supplier_id UUID REFERENCES suppliers(id),
    category VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
    payment_date DATE,
    payment_method VARCHAR(50),
    purchase_id UUID REFERENCES purchases(id),
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de contas a receber
CREATE TABLE accounts_receivable (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tutor_id UUID NOT NULL REFERENCES tutors(id),
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    due_date DATE NOT NULL,
    payment_method VARCHAR(50),
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
    payment_date DATE,
    appointment_id UUID REFERENCES appointments(id),
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de transações de caixa
CREATE TABLE cash_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_date DATE NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
    amount DECIMAL(12,2) NOT NULL,
    description TEXT NOT NULL,
    payment_method VARCHAR(50),
    category VARCHAR(100),
    reference_id UUID,
    reference_type VARCHAR(50),
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de contas bancárias
CREATE TABLE bank_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bank VARCHAR(255) NOT NULL,
    agency VARCHAR(20),
    account VARCHAR(20),
    holder VARCHAR(255),
    account_type VARCHAR(20) NOT NULL CHECK (account_type IN ('checking', 'savings', 'business')),
    balance DECIMAL(15,2) NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de movimentações de estoque
CREATE TABLE inventory_movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id),
    movement_type VARCHAR(20) NOT NULL CHECK (movement_type IN ('in', 'out', 'adjustment', 'transfer')),
    quantity INTEGER NOT NULL,
    previous_quantity INTEGER,
    new_quantity INTEGER,
    reason TEXT,
    reference_id UUID,
    reference_type VARCHAR(50),
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de logs de atividade
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    table_name VARCHAR(100),
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de configurações do sistema
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(255) UNIQUE NOT NULL,
    value JSONB,
    description TEXT,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX idx_animals_tutor ON animals(tutor_id);
CREATE INDEX idx_animals_breed ON animals(breed_id);
CREATE INDEX idx_animals_species ON animals(species);
CREATE INDEX idx_appointments_animal ON appointments(animal_id);
CREATE INDEX idx_appointments_veterinarian ON appointments(veterinarian_id);
CREATE INDEX idx_appointments_room ON appointments(room_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_vaccines_animal ON vaccines(animal_id);
CREATE INDEX idx_vaccines_veterinarian ON vaccines(veterinarian_id);
CREATE INDEX idx_grooming_animal ON grooming_services(animal_id);
CREATE INDEX idx_grooming_room ON grooming_services(room_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_supplier ON products(supplier_id);
CREATE INDEX idx_products_barcode ON products(barcode);
CREATE INDEX idx_purchase_items_purchase ON purchase_items(purchase_id);
CREATE INDEX idx_purchase_items_product ON purchase_items(product_id);
CREATE INDEX idx_accounts_payable_supplier ON accounts_payable(supplier_id);
CREATE INDEX idx_accounts_payable_status ON accounts_payable(status);
CREATE INDEX idx_accounts_payable_due_date ON accounts_payable(due_date);
CREATE INDEX idx_accounts_receivable_tutor ON accounts_receivable(tutor_id);
CREATE INDEX idx_accounts_receivable_status ON accounts_receivable(status);
CREATE INDEX idx_accounts_receivable_due_date ON accounts_receivable(due_date);
CREATE INDEX idx_cash_transactions_date ON cash_transactions(transaction_date);
CREATE INDEX idx_cash_transactions_type ON cash_transactions(type);
CREATE INDEX idx_inventory_movements_product ON inventory_movements(product_id);
CREATE INDEX idx_inventory_movements_type ON inventory_movements(movement_type);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email ON users(email);

-- Triggers para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger a todas as tabelas necessárias
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_breeds_updated_at BEFORE UPDATE ON breeds
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON rooms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tutors_updated_at BEFORE UPDATE ON tutors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_animals_updated_at BEFORE UPDATE ON animals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_types_updated_at BEFORE UPDATE ON service_types
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_categories_updated_at BEFORE UPDATE ON product_categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON suppliers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_purchases_updated_at BEFORE UPDATE ON purchases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accounts_payable_updated_at BEFORE UPDATE ON accounts_payable
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accounts_receivable_updated_at BEFORE UPDATE ON accounts_receivable
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bank_accounts_updated_at BEFORE UPDATE ON bank_accounts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Triggers para automação

-- Trigger para movimentação automática de estoque nas compras
CREATE OR REPLACE FUNCTION handle_purchase_item_inventory()
RETURNS TRIGGER AS $$
BEGIN
    -- Atualizar quantidade do produto
    UPDATE products 
    SET quantity = quantity + NEW.quantity,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.product_id;
    
    -- Registrar movimentação de estoque
    INSERT INTO inventory_movements (
        product_id,
        movement_type,
        quantity,
        previous_quantity,
        new_quantity,
        reason,
        reference_id,
        reference_type,
        created_by
    )
    SELECT 
        NEW.product_id,
        'in',
        NEW.quantity,
        p.quantity - NEW.quantity,
        p.quantity,
        'Entrada por compra',
        NEW.purchase_id,
        'purchase',
        (SELECT created_by FROM purchases WHERE id = NEW.purchase_id)
    FROM products p WHERE p.id = NEW.product_id;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_purchase_item_inventory
    AFTER INSERT ON purchase_items
    FOR EACH ROW EXECUTE FUNCTION handle_purchase_item_inventory();

-- Trigger para criar conta a pagar automaticamente
CREATE OR REPLACE FUNCTION create_account_payable_for_purchase()
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
        NEW.purchase_date + INTERVAL '30 days',
        NEW.supplier_id,
        'Compras',
        NEW.id,
        NEW.created_by
    );
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_create_account_payable
    AFTER INSERT ON purchases
    FOR EACH ROW EXECUTE FUNCTION create_account_payable_for_purchase();

-- Trigger para criar conta a receber para agendamentos
CREATE OR REPLACE FUNCTION create_account_receivable_for_appointment()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND NEW.total_price > 0 THEN
        INSERT INTO accounts_receivable (
            tutor_id,
            description,
            amount,
            due_date,
            appointment_id,
            created_by
        )
        SELECT 
            a.tutor_id,
            'Serviço: ' || st.name || ' - ' || an.name,
            NEW.total_price,
            NEW.appointment_date,
            NEW.id,
            NEW.created_by
        FROM animals a
        JOIN service_types st ON st.id = NEW.service_type_id
        JOIN animals an ON an.id = NEW.animal_id
        WHERE a.id = NEW.animal_id;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_create_account_receivable
    AFTER UPDATE ON appointments
    FOR EACH ROW EXECUTE FUNCTION create_account_receivable_for_appointment();

-- Trigger para registrar transações de caixa
CREATE OR REPLACE FUNCTION register_cash_transaction()
RETURNS TRIGGER AS $$
BEGIN
    -- Para contas a pagar pagas
    IF TG_TABLE_NAME = 'accounts_payable' AND OLD.status != 'paid' AND NEW.status = 'paid' THEN
        INSERT INTO cash_transactions (
            transaction_date,
            type,
            amount,
            description,
            payment_method,
            category,
            reference_id,
            reference_type,
            created_by
        ) VALUES (
            COALESCE(NEW.payment_date, CURRENT_DATE),
            'expense',
            NEW.amount,
            NEW.description,
            NEW.payment_method,
            NEW.category,
            NEW.id,
            'account_payable',
            NEW.created_by
        );
    END IF;
    
    -- Para contas a receber pagas
    IF TG_TABLE_NAME = 'accounts_receivable' AND OLD.status != 'paid' AND NEW.status = 'paid' THEN
        INSERT INTO cash_transactions (
            transaction_date,
            type,
            amount,
            description,
            payment_method,
            category,
            reference_id,
            reference_type,
            created_by
        ) VALUES (
            COALESCE(NEW.payment_date, CURRENT_DATE),
            'income',
            NEW.amount,
            NEW.description,
            NEW.payment_method,
            'Serviços',
            NEW.id,
            'account_receivable',
            NEW.created_by
        );
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_register_cash_transaction_payable
    AFTER UPDATE ON accounts_payable
    FOR EACH ROW EXECUTE FUNCTION register_cash_transaction();

CREATE TRIGGER trigger_register_cash_transaction_receivable
    AFTER UPDATE ON accounts_receivable
    FOR EACH ROW EXECUTE FUNCTION register_cash_transaction();

-- Dados iniciais

-- Usuário administrador master
INSERT INTO users (name, email, password_hash, role, permissions) VALUES
('Administrador Master', 'admin@petshop.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '{"all": true}');

-- Raças padrão organizadas por espécie
INSERT INTO breeds (name, species, characteristics, created_by) VALUES
-- Cães
('Labrador', 'dog', 'Cão dócil e amigável, excelente para famílias', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Golden Retriever', 'dog', 'Cão inteligente e leal, muito carinhoso', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Pastor Alemão', 'dog', 'Cão protetor e inteligente, ótimo para guarda', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Bulldog', 'dog', 'Cão calmo e companeiro, ideal para apartamentos', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Poodle', 'dog', 'Cão inteligente e hipoalergênico', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('SRD', 'dog', 'Sem Raça Definida', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
-- Gatos
('Persa', 'cat', 'Gato de pelo longo, elegante e tranquilo', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Siamês', 'cat', 'Gato ativo e vocal, muito inteligente', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Maine Coon', 'cat', 'Gato grande e peludo, muito gentil', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('British Shorthair', 'cat', 'Gato calmo e de temperamento equilibrado', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('SRD', 'cat', 'Sem Raça Definida', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
-- Outros
('Canário', 'bird', 'Ave canora pequena e colorida', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Coelho Anão', 'rabbit', 'Coelho de pequeno porte, dócil', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Hamster Sírio', 'hamster', 'Hamster de médio porte, solitário', (SELECT id FROM users WHERE email = 'admin@petshop.com'));

-- Salas organizadas por tipo
INSERT INTO rooms (name, type, capacity, equipment, created_by) VALUES
('Consultório 1', 'consultation', 4, ARRAY['Mesa de exame', 'Estetoscópio', 'Balança', 'Termômetro'], (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Consultório 2', 'consultation', 4, ARRAY['Mesa de exame', 'Estetoscópio', 'Balança', 'Termômetro'], (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Consultório 3', 'consultation', 4, ARRAY['Mesa de exame', 'Estetoscópio', 'Balança', 'Oftalmoscópio'], (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Centro Cirúrgico 1', 'surgery', 6, ARRAY['Mesa cirúrgica', 'Aparelho de anestesia', 'Monitor cardíaco', 'Respirador'], (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Centro Cirúrgico 2', 'surgery', 6, ARRAY['Mesa cirúrgica', 'Aparelho de anestesia', 'Monitor cardíaco', 'Respirador'], (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Sala de Banho e Tosa 1', 'grooming', 2, ARRAY['Banheira', 'Secador', 'Mesa de tosa', 'Tesouras'], (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Sala de Banho e Tosa 2', 'grooming', 2, ARRAY['Banheira', 'Secador', 'Mesa de tosa', 'Máquina de corte'], (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Sala de Banho e Tosa 3', 'grooming', 2, ARRAY['Banheira grande', 'Secador potente', 'Mesa hidráulica'], (SELECT id FROM users WHERE email = 'admin@petshop.com'));

-- Tipos de serviços categorizados
INSERT INTO service_types (name, category, duration, price, requires_veterinarian, created_by) VALUES
-- Consultas
('Consulta Veterinária Geral', 'consultation', 30, 80.00, true, (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Consulta de Retorno', 'consultation', 20, 50.00, true, (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Consulta de Emergência', 'consultation', 45, 150.00, true, (SELECT id FROM users WHERE email = 'admin@petshop.com')),
-- Exames
('Exame de Sangue Completo', 'exam', 15, 120.00, true, (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Exame de Urina', 'exam', 10, 80.00, true, (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Raio-X', 'exam', 30, 200.00, true, (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Ultrassom', 'exam', 45, 250.00, true, (SELECT id FROM users WHERE email = 'admin@petshop.com')),
-- Cirurgias
('Castração Macho', 'surgery', 90, 300.00, true, (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Castração Fêmea', 'surgery', 120, 400.00, true, (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Cirurgia Dentária', 'surgery', 180, 600.00, true, (SELECT id FROM users WHERE email = 'admin@petshop.com')),
-- Banho e Tosa
('Banho Simples', 'grooming', 60, 40.00, false, (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Banho e Tosa Completa', 'grooming', 90, 60.00, false, (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Banho e Tosa Higiênica', 'grooming', 45, 45.00, false, (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Tosa Bebê', 'grooming', 75, 55.00, false, (SELECT id FROM users WHERE email = 'admin@petshop.com')),
-- Vacinas
('Vacinação V8', 'vaccine', 15, 45.00, true, (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Vacinação V10', 'vaccine', 15, 55.00, true, (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Vacinação Antirrábica', 'vaccine', 15, 35.00, true, (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Vacinação Tríplice Felina', 'vaccine', 15, 50.00, true, (SELECT id FROM users WHERE email = 'admin@petshop.com'));

-- Categorias de produtos
INSERT INTO product_categories (name, description, created_by) VALUES
('Medicamentos', 'Medicamentos veterinários e farmacêuticos', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Rações', 'Rações para diferentes tipos e idades de animais', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Acessórios', 'Coleiras, brinquedos e acessórios diversos', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Higiene', 'Produtos de higiene e limpeza para animais', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('Equipamentos', 'Equipamentos médicos e de uso veterinário', (SELECT id FROM users WHERE email = 'admin@petshop.com'));

-- Configurações do sistema
INSERT INTO system_settings (key, value, description, created_by) VALUES
('system_name', '"Sistema PetShop"', 'Nome do sistema', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('default_language', '"pt"', 'Idioma padrão do sistema', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('appointment_duration', '30', 'Duração padrão dos agendamentos em minutos', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('working_hours', '{"start": "08:00", "end": "18:00"}', 'Horário de funcionamento', (SELECT id FROM users WHERE email = 'admin@petshop.com')),
('working_days', '["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]', 'Dias de funcionamento', (SELECT id FROM users WHERE email = 'admin@petshop.com'));
