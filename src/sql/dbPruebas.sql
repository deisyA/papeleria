CREATE DATABASE inventario;

USE inventario;

CREATE TABLE repaso(
    id_elem INT NOT NULL PRIMARY KEY auto_increment,
    title VARCHAR(100),
    elemento VARCHAR(100),
    data_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DESCRIBE repaso;

INSERT INTO repaso (title, elemento) VALUES ("repaso lunes", "30 estudiantes");
INSERT INTO repaso (title, elemento) VALUES ("repaso martes", "20 estudiantes");
INSERT INTO repaso (title, elemento) VALUES ("repaso miércoles", "40 estudiantes");
SELECT * FROM repaso;


/*insrtar información de empleado, debe tener el id_usuario de la tabla usuario*/
INSERT INTO `empleado` (
    `id_documento`, `id_usuario`, `tipo_documento`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `telefono`, `direccion`, `eps`) 
VALUES ('1111', '14', 'cedula', 'emplname', 'emplsecond', 'empllast', NULL, '111', 'empdir', 'empl');