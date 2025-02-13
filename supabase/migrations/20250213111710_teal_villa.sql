/*
  # Restaurant Menu System Schema

  1. New Tables
    - categories
      - id (uuid, primary key)
      - name (text)
      - display_order (integer)
      - created_at (timestamp)
    
    - dishes
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - price (decimal)
      - category_id (uuid, foreign key)
      - is_available (boolean)
      - is_active (boolean)
      - created_at (timestamp)
    
    - daily_menu
      - id (uuid, primary key)
      - dish_id (uuid, foreign key)
      - date (date)
      - is_available (boolean)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage all data
    - Add policies for anonymous users to read daily menu

  3. Initial Data
    - Insert default categories
*/

-- Create categories table
CREATE TABLE categories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    display_order integer NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

-- Create dishes table
CREATE TABLE dishes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    price decimal(10,2) NOT NULL,
    category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
    is_available boolean DEFAULT true,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

-- Create daily_menu table
CREATE TABLE daily_menu (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    dish_id uuid REFERENCES dishes(id) ON DELETE CASCADE,
    date date DEFAULT CURRENT_DATE,
    is_available boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_menu ENABLE ROW LEVEL SECURITY;

-- Policies for categories
CREATE POLICY "Allow authenticated users full access to categories"
    ON categories
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow public read access to categories"
    ON categories
    FOR SELECT
    TO anon
    USING (true);

-- Policies for dishes
CREATE POLICY "Allow authenticated users full access to dishes"
    ON dishes
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow public read access to dishes"
    ON dishes
    FOR SELECT
    TO anon
    USING (true);

-- Policies for daily_menu
CREATE POLICY "Allow authenticated users full access to daily_menu"
    ON daily_menu
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow public read access to daily_menu"
    ON daily_menu
    FOR SELECT
    TO anon
    USING (true);

-- Insert default categories
INSERT INTO categories (name, display_order) VALUES
    ('Starters', 1),
    ('Soups', 2),
    ('Main Courses', 3),
    ('Desserts', 4),
    ('Drinks', 5);