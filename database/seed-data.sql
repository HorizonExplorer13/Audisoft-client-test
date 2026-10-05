-- Seed Data Script
-- Creates 5 students, 5 teachers, and 3 grades with associations

USE AudisoftSchool;
GO

-- Insert 5 Students
INSERT INTO [Students] ([Name]) VALUES
('Juan Pérez'),
('María González'),
('Carlos Rodríguez'),
('Ana Martínez'),
('Luis Sánchez');

-- Insert 5 Teachers
INSERT INTO [Teachers] ([Name]) VALUES
('Prof. Elena Ruiz'),
('Prof. Miguel Torres'),
('Prof. Patricia Flores'),
('Prof. Andrés Herrera'),
('Prof. Sofía Jiménez');

-- Insert 3 Grades (associated with existing students/teachers)
-- Grade 1: Juan Pérez (StudentId=1) with Prof. Elena Ruiz (TeacherId=1)
INSERT INTO [Grades] ([Name], [Value], [TeacherId], [StudentId]) VALUES
('Matemáticas - Parcial 1', 8.50, 1, 1);

-- Grade 2: María González (StudentId=2) with Prof. Miguel Torres (TeacherId=2)
INSERT INTO [Grades] ([Name], [Value], [TeacherId], [StudentId]) VALUES
('Historia - Examen Final', 9.00, 2, 2);

-- Grade 3: Carlos Rodríguez (StudentId=3) with Prof. Patricia Flores (TeacherId=3)
INSERT INTO [Grades] ([Name], [Value], [TeacherId], [StudentId]) VALUES
('Ciencias - Proyecto', 7.75, 3, 3);

GO

-- Verify inserted data
SELECT 'Students' AS TableName, COUNT(*) AS Count FROM [Students]
UNION ALL
SELECT 'Teachers', COUNT(*) FROM [Teachers]
UNION ALL
SELECT 'Grades', COUNT(*) FROM [Grades];
GO