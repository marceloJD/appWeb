
CREATE TABLE Profesor (
    CODIGO INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre VARCHAR(50) NOT NULL,
    Apellidos VARCHAR(50) NOT NULL,
    DNI VARCHAR(9) UNIQUE NOT NULL,
    Correo VARCHAR(50) NOT NULL,
    Clave VARCHAR(50) NOT NULL
    ) ;
    
    CREATE TABLE Curso (
    CODIGO INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre VARCHAR(50) NOT NULL,
    Descripcion VARCHAR(100) NOT NULL
    );
    
    CREATE TABLE Curso_Profesor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idCurso INTEGER NOT NULL,
    idProfesor INTEGER NOT NULL,
    pesos JSON ,
    CONSTRAINT fk_curso FOREIGN KEY (idCurso) REFERENCES Curso(CODIGO) ON DELETE CASCADE,
    CONSTRAINT fk_profesor FOREIGN KEY (idProfesor) REFERENCES Profesor(CODIGO) ON DELETE CASCADE
    );
    
    CREATE TABLE Alumno (
    CODIGO INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre VARCHAR(50) NOT NULL,
    Apellidos VARCHAR(50) NOT NULL,
    DNI VARCHAR(9) UNIQUE NOT NULL,
    Correo VARCHAR(50) NOT NULL,
    Direccion VARCHAR(100) NOT NULL
    ) ;
    
    CREATE TABLE Matricula (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idAlumno INTEGER NOT NULL,
    idCursoProfesor INTEGER NOT NULL,
    notas JSON,
    CONSTRAINT fk_alumno FOREIGN KEY (idAlumno) REFERENCES Alumno(CODIGO) ON DELETE CASCADE,
    CONSTRAINT fk_curso_profesor FOREIGN KEY (idCursoProfesor) REFERENCES Curso_Profesor(id) ON DELETE CASCADE
    );
    
    
    -- Inserts para profesores
    INSERT INTO Profesor (Nombre, Apellidos, DNI, Correo, Clave)
    VALUES ('Ana', 'López', '111111111', 'ana@example.com', 'clave123');
    
    INSERT INTO Profesor (Nombre, Apellidos, DNI, Correo, Clave)
    VALUES ('Pedro', 'García', '222222222', 'pedro@example.com', 'clave456');
    
    -- Inserts para cursos
    INSERT INTO Curso (Nombre, Descripcion)
    VALUES ('Matemáticas', 'Curso de matemáticas avanzadas');
    
    INSERT INTO Curso (Nombre, Descripcion)
    VALUES ('Historia', 'Curso de historia mundial');
    
    -- Inserts para asignar cursos a profesores
    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (1, 1, '[{"nombre": "n1", "descripcion": "d1", "peso": 20}, {"nombre": "n2", "descripcion": "d2", "peso": 20}, {"nombre": "n3", "descripcion": "d3", "peso": 60}]');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (2, 1, '[{"nombre": "n1", "descripcion": "d1", "peso": 20}, {"nombre": "n2", "descripcion": "d2", "peso": 20}, {"nombre": "n3", "descripcion": "d3", "peso": 60}]');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (2, 2, '[{"nombre": "n1", "descripcion": "d1", "peso": 20}, {"nombre": "n2", "descripcion": "d2", "peso": 20}, {"nombre": "n3", "descripcion": "d3", "peso": 60}]');

    
    -- Inserts para alumnos
    INSERT INTO Alumno (Nombre, Apellidos, DNI, Direccion, Correo)
    VALUES ('Laura', 'González', '987654321', 'Calle Principal 123','LG@mail.com');
    
    INSERT INTO Alumno (Nombre, Apellidos, DNI, Direccion, Correo)
    VALUES ('Carlos', 'Martínez', '876543210', 'Avenida Central 456','CM@mail.com');
    
    INSERT INTO Alumno (Nombre, Apellidos, DNI, Direccion, Correo)
    VALUES ('Lucía', 'Hernández', '765432109', 'Calle Secundaria 789','LH@mail.com');
    
    INSERT INTO Alumno (Nombre, Apellidos, DNI, Direccion, Correo)
    VALUES ('Pedro', 'López', '654321098', 'Calle Principal 456','PL@mail.com');
    
    -- Inserts para asignar alumnos a cursos y profesores
    INSERT INTO Matricula (idAlumno, idCursoProfesor, notas)
    VALUES (1, 1, '[{"nombre": "n1", "calificacion": 12}, {"nombre": "n2", "calificacion": 12}, {"nombre": "n3", "calificacion": 12}]');

    INSERT INTO Matricula (idAlumno, idCursoProfesor, notas)
    VALUES (2, 1, '[{"nombre": "n1", "calificacion": 15}, {"nombre": "n2", "calificacion": 15}, {"nombre": "n3", "calificacion": 15}]');

    INSERT INTO Matricula (idAlumno, idCursoProfesor, notas)
    VALUES (2, 2, '[{"nombre": "n1", "calificacion": 18}, {"nombre": "n2", "calificacion": 18}, {"nombre": "n3", "calificacion": 18}]');

    INSERT INTO Matricula (idAlumno, idCursoProfesor, notas)
    VALUES (4, 3, '[{"nombre": "n1", "calificacion": 14}, {"nombre": "n2", "calificacion": 14}, {"nombre": "n3", "calificacion": 14}]');

    INSERT INTO Matricula (idAlumno, idCursoProfesor, notas)
    VALUES (3, 3, '[{"nombre": "n1", "calificacion": 14}, {"nombre": "n2", "calificacion": 14}, {"nombre": "n3", "calificacion": 14}]');
        