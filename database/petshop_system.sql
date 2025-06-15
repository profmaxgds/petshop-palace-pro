-- Criação do banco de dados do sistema PetShop
-- Versão atualizada com todas as funcionalidades

CREATE DATABASE IF NOT EXISTS petshop_system;
USE petshop_system;

-- Tabela de perfis de usuário
CREATE TABLE profiles (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    permissions JSON NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_system_profile BOOLEAN DEFAULT FALSE,
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de usuários
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'veterinarian', 'receptionist', 'manager') NOT NULL,
    profile_id VARCHAR(36),
    crmv VARCHAR(20),
    specialties JSON,
    consultation_price DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (profile_id) REFERENCES profiles(id)
);

-- Tabela de tutores
CREATE TABLE tutors (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    phone VARCHAR(20),
    email VARCHAR(100),
    street VARCHAR(100),
    number VARCHAR(10),
    neighborhood VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(2),
    zip_code VARCHAR(10),
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de raças
CREATE TABLE breeds (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(50) NOT NULL,
    species ENUM('dog', 'cat', 'bird', 'rabbit', 'hamster', 'other') NOT NULL,
    characteristics TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de animais
CREATE TABLE animals (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(50) NOT NULL,
    species ENUM('dog', 'cat', 'bird', 'rabbit', 'hamster', 'other') NOT NULL,
    breed_id VARCHAR(36),
    age INT,
    sex ENUM('male', 'female') NOT NULL,
    weight DECIMAL(5,2),
    color VARCHAR(30),
    microchip VARCHAR(50),
    observations TEXT,
    tutor_id VARCHAR(36) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (breed_id) REFERENCES breeds(id),
    FOREIGN KEY (tutor_id) REFERENCES tutors(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de salas
CREATE TABLE rooms (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(50) NOT NULL,
    type ENUM('consultation', 'surgery', 'grooming', 'other') NOT NULL,
    capacity INT,
    equipment JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de veterinários
CREATE TABLE veterinarians (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    crmv VARCHAR(20) UNIQUE NOT NULL,
    specialties JSON,
    phone VARCHAR(20),
    email VARCHAR(100),
    schedule JSON,
    consultation_price DECIMAL(10,2),
    status ENUM('active', 'inactive', 'vacation') DEFAULT 'active',
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de tipos de serviço
CREATE TABLE service_types (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    category ENUM('consultation', 'exam', 'surgery', 'grooming', 'vaccine') NOT NULL,
    duration INT NOT NULL COMMENT 'Duração em minutos',
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    requires_veterinarian BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de agendamentos (Saúde Animal)
CREATE TABLE appointments (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    animal_id VARCHAR(36) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    service_type_id VARCHAR(36) NOT NULL,
    veterinarian_id VARCHAR(36),
    room_id VARCHAR(36),
    status ENUM('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show') DEFAULT 'scheduled',
    total_price DECIMAL(10,2),
    notes TEXT,
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (animal_id) REFERENCES animals(id),
    FOREIGN KEY (service_type_id) REFERENCES service_types(id),
    FOREIGN KEY (veterinarian_id) REFERENCES veterinarians(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de vacinas
CREATE TABLE vaccines (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    animal_id VARCHAR(36) NOT NULL,
    vaccine_type VARCHAR(50) NOT NULL,
    brand VARCHAR(50),
    batch VARCHAR(50),
    application_date DATE NOT NULL,
    next_due_date DATE,
    veterinarian_id VARCHAR(36),
    price DECIMAL(10,2),
    notes TEXT,
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (animal_id) REFERENCES animals(id),
    FOREIGN KEY (veterinarian_id) REFERENCES veterinarians(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de serviços de estética
CREATE TABLE grooming_services (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    animal_id VARCHAR(36) NOT NULL,
    service_date DATE NOT NULL,
    service_time TIME,
    service_type_id VARCHAR(36) NOT NULL,
    room_id VARCHAR(36),
    status ENUM('scheduled', 'in_progress', 'completed', 'cancelled') DEFAULT 'scheduled',
    price DECIMAL(10,2),
    notes TEXT,
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (animal_id) REFERENCES animals(id),
    FOREIGN KEY (service_type_id) REFERENCES service_types(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de fornecedores
CREATE TABLE suppliers (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18),
    phone VARCHAR(20),
    email VARCHAR(100),
    contact_person VARCHAR(100),
    address TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de categorias de produtos
CREATE TABLE product_categories (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(50) NOT NULL,
    description TEXT,
    is_vaccine_category BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de produtos
CREATE TABLE products (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    category_id VARCHAR(36) NOT NULL,
    barcode VARCHAR(50),
    quantity INT DEFAULT 0,
    min_quantity INT DEFAULT 0,
    cost_price DECIMAL(10,2),
    sale_price DECIMAL(10,2),
    margin_percentage DECIMAL(5,2),
    supplier_id VARCHAR(36),
    expiration_control BOOLEAN DEFAULT FALSE,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES product_categories(id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de compras
CREATE TABLE purchases (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    supplier_id VARCHAR(36) NOT NULL,
    purchase_date DATE NOT NULL,
    invoice_number VARCHAR(50),
    total DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'received', 'completed', 'cancelled') DEFAULT 'pending',
    notes TEXT,
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de itens de compra
CREATE TABLE purchase_items (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    purchase_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    expiration_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Tabela de contas a pagar
CREATE TABLE accounts_payable (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    supplier_id VARCHAR(36),
    category VARCHAR(50),
    status ENUM('pending', 'paid', 'overdue', 'cancelled') DEFAULT 'pending',
    payment_date DATE,
    payment_method VARCHAR(50),
    purchase_id VARCHAR(36),
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de contas a receber
CREATE TABLE accounts_receivable (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    tutor_id VARCHAR(36) NOT NULL,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    payment_method VARCHAR(50),
    status ENUM('pending', 'paid', 'overdue', 'cancelled') DEFAULT 'pending',
    payment_date DATE,
    appointment_id VARCHAR(36),
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tutor_id) REFERENCES tutors(id),
    FOREIGN KEY (appointment_id) REFERENCES appointments(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de transações de caixa
CREATE TABLE cash_transactions (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    transaction_date DATE NOT NULL,
    type ENUM('income', 'expense') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description VARCHAR(255) NOT NULL,
    payment_method VARCHAR(50),
    category VARCHAR(50),
    reference_id VARCHAR(36),
    reference_type VARCHAR(50),
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de contas bancárias
CREATE TABLE bank_accounts (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    bank VARCHAR(100) NOT NULL,
    agency VARCHAR(20),
    account VARCHAR(20),
    holder VARCHAR(100),
    account_type ENUM('checking', 'savings', 'business') NOT NULL,
    balance DECIMAL(15,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de movimentações de estoque
CREATE TABLE inventory_movements (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    product_id VARCHAR(36) NOT NULL,
    movement_type ENUM('in', 'out', 'adjustment', 'transfer') NOT NULL,
    quantity INT NOT NULL,
    previous_quantity INT,
    new_quantity INT,
    reason VARCHAR(255),
    reference_id VARCHAR(36),
    reference_type VARCHAR(50),
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de layouts de carteirinha de vacinação
CREATE TABLE vaccine_card_layouts (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    page_size ENUM('A4', 'A5', 'Letter') DEFAULT 'A4',
    orientation ENUM('portrait', 'landscape') DEFAULT 'portrait',
    fields JSON NOT NULL,
    header_text TEXT,
    footer_text TEXT,
    logo_url VARCHAR(255),
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de sessões de usuário
CREATE TABLE user_sessions (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de log de atividades
CREATE TABLE activity_logs (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(50),
    record_id VARCHAR(36),
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Inserção de dados padrão

-- Perfis padrão do sistema
INSERT INTO profiles (id, name, description, permissions, is_system_profile, created_by) VALUES
('1', 'Administrador', 'Acesso total ao sistema', '{"all": true}', TRUE, '1'),
('2', 'Veterinário', 'Acesso a animais, consultas e vacinas', '{"animals": ["read", "write"], "appointments": ["read", "write"], "vaccines": ["read", "write"], "tutors": ["read"]}', TRUE, '1'),
('3', 'Recepcionista', 'Acesso a agendamentos e cadastros básicos', '{"tutors": ["read", "write"], "animals": ["read", "write"], "appointments": ["read", "write"], "grooming": ["read", "write"]}', TRUE, '1');

-- Usuário administrador padrão
INSERT INTO users (id, name, email, password_hash, role, profile_id, created_at) VALUES
('1', 'Administrador', 'admin@petshop.com', '$2b$10$example_hash', 'admin', '1', NOW());

-- Raças padrão
INSERT INTO breeds (name, species, created_by) VALUES
('Golden Retriever', 'dog', '1'),
('Labrador', 'dog', '1'),
('Pastor Alemão', 'dog', '1'),
('Poodle', 'dog', '1'),
('Persa', 'cat', '1'),
('Siamês', 'cat', '1'),
('Maine Coon',
'cat', '1'),
('British Shorthair', 'cat', '1'),
('Canário', 'bird', '1'),
('Papagaio', 'bird', '1'),
('Coelho Anão', 'rabbit', '1'),
('Hamster Sírio', 'hamster', '1');

-- Tipos de serviço padrão
INSERT INTO service_types (name, category, duration, price, requires_veterinarian, created_by) VALUES
('Consulta Veterinária', 'consultation', 30, 80.00, TRUE, '1'),
('Exame de Sangue', 'exam', 15, 120.00, TRUE, '1'),
('Raio-X', 'exam', 20, 150.00, TRUE, '1'),
('Cirurgia Simples', 'surgery', 60, 300.00, TRUE, '1'),
('Castração', 'surgery', 90, 250.00, TRUE, '1'),
('Banho e Tosa', 'grooming', 60, 50.00, FALSE, '1'),
('Tosa Higiênica', 'grooming', 30, 35.00, FALSE, '1'),
('Vacinação V8', 'vaccine', 10, 40.00, TRUE, '1'),
('Vacinação Antirrábica', 'vaccine', 10, 30.00, TRUE, '1');

-- Salas padrão
INSERT INTO rooms (name, type, created_by) VALUES
('Consultório 1', 'consultation', '1'),
('Consultório 2', 'consultation', '1'),
('Sala de Cirurgia', 'surgery', '1'),
('Sala de Estética', 'grooming', '1');

-- Categorias de produtos padrão
INSERT INTO product_categories (name, description, is_vaccine_category, created_by) VALUES
('Medicamentos', 'Medicamentos veterinários', FALSE, '1'),
('Vacinas', 'Vacinas para animais', TRUE, '1'),
('Rações', 'Rações e alimentos', FALSE, '1'),
('Acessórios', 'Coleiras, brinquedos, etc.', FALSE, '1'),
('Produtos de Higiene', 'Shampoos, condicionadores, etc.', FALSE, '1');

-- Layout padrão da carteirinha
INSERT INTO vaccine_card_layouts (id, name, description, fields, header_text, footer_text, is_default, created_by) VALUES
('1', 'Layout Padrão', 'Layout padrão da carteirinha de vacinação', 
'[{"id": "1", "name": "Nome do Animal", "type": "text", "required": true, "position": {"x": 50, "y": 100}, "width": 200, "height": 30}]',
'CARTEIRINHA DE VACINAÇÃO',
'Este documento comprova a vacinação do animal.',
TRUE, '1');

-- Índices para otimização
CREATE INDEX idx_animals_tutor ON animals(tutor_id);
CREATE INDEX idx_animals_species ON animals(species);
CREATE INDEX idx_vaccines_animal ON vaccines(animal_id);
CREATE INDEX idx_vaccines_date ON vaccines(application_date);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_animal ON appointments(animal_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_inventory_product ON inventory_movements(product_id);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_date ON activity_logs(created_at);

-- Triggers para auditoria e controle de estoque
DELIMITER //

CREATE TRIGGER update_product_quantity_after_purchase
    AFTER INSERT ON purchase_items
    FOR EACH ROW
BEGIN
    UPDATE products 
    SET quantity = quantity + NEW.quantity,
        updated_at = NOW()
    WHERE id = NEW.product_id;
    
    INSERT INTO inventory_movements (product_id, movement_type, quantity, reference_id, reference_type, created_by)
    VALUES (NEW.product_id, 'in', NEW.quantity, NEW.purchase_id, 'purchase', '1');
END//

CREATE TRIGGER log_user_changes
    AFTER UPDATE ON users
    FOR EACH ROW
BEGIN
    INSERT INTO activity_logs (user_id, action, table_name, record_id, old_values, new_values)
    VALUES (NEW.id, 'update', 'users', NEW.id, 
            JSON_OBJECT('name', OLD.name, 'email', OLD.email, 'role', OLD.role),
            JSON_OBJECT('name', NEW.name, 'email', NEW.email, 'role', NEW.role));
END//

DELIMITER ;

-- Views para relatórios
CREATE VIEW vw_animals_summary AS
SELECT 
    a.id,
    a.name,
    a.species,
    b.name as breed_name,
    t.name as tutor_name,
    t.phone as tutor_phone,
    a.created_at
FROM animals a
LEFT JOIN breeds b ON a.breed_id = b.id
LEFT JOIN tutors t ON a.tutor_id = t.id
WHERE a.is_active = TRUE;

CREATE VIEW vw_vaccine_schedule AS
SELECT 
    v.id,
    a.name as animal_name,
    t.name as tutor_name,
    v.vaccine_type,
    v.application_date,
    v.next_due_date,
    DATEDIFF(v.next_due_date, CURDATE()) as days_until_due
FROM vaccines v
JOIN animals a ON v.animal_id = a.id
JOIN tutors t ON a.tutor_id = t.id
WHERE v.next_due_date IS NOT NULL
ORDER BY v.next_due_date;

CREATE VIEW vw_financial_summary AS
SELECT 
    DATE_FORMAT(created_at, '%Y-%m') as month_year,
    SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
    SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expense,
    SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) as net_result
FROM cash_transactions
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY month_year DESC;

CREATE VIEW vw_inventory_alerts AS
SELECT 
    p.id,
    p.name,
    p.quantity as current_quantity,
    p.min_quantity,
    pc.name as category_name,
    CASE 
        WHEN p.quantity <= 0 THEN 'out_of_stock'
        WHEN p.quantity <= p.min_quantity THEN 'low_stock'
        ELSE 'ok'
    END as stock_status
FROM products p
JOIN product_categories pc ON p.category_id = pc.id
WHERE p.is_active = TRUE
ORDER BY p.quantity ASC;

-- Comentários nas tabelas
ALTER TABLE users COMMENT = 'Usuários do sistema';
ALTER TABLE tutors COMMENT = 'Tutores/proprietários dos animais';
ALTER TABLE animals COMMENT = 'Animais cadastrados no sistema';
ALTER TABLE vaccines COMMENT = 'Registros de vacinação dos animais';
ALTER TABLE appointments COMMENT = 'Agendamentos de consultas e procedimentos';
ALTER TABLE products COMMENT = 'Produtos em estoque';
ALTER TABLE inventory_movements COMMENT = 'Movimentações de estoque';
ALTER TABLE activity_logs COMMENT = 'Log de atividades do sistema';

COMMIT;
