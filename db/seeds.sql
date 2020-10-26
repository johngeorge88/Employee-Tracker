INSERT INTO department (name)
VALUES
("Sales"),
("Marketing"),
("Acconting");

INSERT INTO role (title, department_id, salary)
VALUES
("Sales Manager", 1, 100000),
("Marketing Manager", 2, 110000),
("Director of finance", 3, 90000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("John", "Awad", 1, 1),
("Kevin", "Parras", 2, 2),
("Matthew", "Mcgowan", 3, 2),
("Matt", "Baker", 3, 2),
("David", "Barascout", 1, 1),
("Brendon", "Grimes", 2, 1),
("Anthony", "Richards", 1, 2),
("Scott", "Sparow", 2, 1),
("Daniel", "Pillin", 2, 1);