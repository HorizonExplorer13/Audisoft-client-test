IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
CREATE TABLE [Estudiantes] (
    [Id] int NOT NULL IDENTITY,
    [Nombre] nvarchar(200) NOT NULL,
    CONSTRAINT [PK_Estudiantes] PRIMARY KEY ([Id])
);

CREATE TABLE [Profesores] (
    [Id] int NOT NULL IDENTITY,
    [Nombre] nvarchar(200) NOT NULL,
    CONSTRAINT [PK_Profesores] PRIMARY KEY ([Id])
);

CREATE TABLE [Notas] (
    [Id] int NOT NULL IDENTITY,
    [Nombre] nvarchar(200) NOT NULL,
    [Valor] decimal(5,2) NOT NULL,
    [IdProfesor] int NOT NULL,
    [IdEstudiante] int NOT NULL,
    CONSTRAINT [PK_Notas] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Notas_Estudiantes] FOREIGN KEY ([IdEstudiante]) REFERENCES [Estudiantes] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Notas_Profesores] FOREIGN KEY ([IdProfesor]) REFERENCES [Profesores] ([Id]) ON DELETE NO ACTION
);

CREATE INDEX [IX_Notas_IdEstudiante] ON [Notas] ([IdEstudiante]);

CREATE INDEX [IX_Notas_IdProfesor] ON [Notas] ([IdProfesor]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20261002170126_initCreateMigration', N'9.0.20');

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20261002194233_InitialCreate', N'9.0.20');

COMMIT;
GO

