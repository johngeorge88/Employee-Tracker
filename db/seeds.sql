INSERT INTO department (name)
VALUES
("Sales"),
("Marketing"),
("Acconting");

INSERT INTO role (title, department_id, salary)
VALUES
(Sales Manager, 1, 100.000),
(Marketing Manager, 2, 110.000),
(Director of finance, 3, 90.000);

INSERT INTO employee (first_name, Last_name, role_id, manager_id)
VALUES
    ("John", "Awad", 1, 2),
    ("Mike", "Nakhla", 2, 3),
    ("Mark", "Brown", 3, 3),
    ("Kevin", "Parras", 1, 1),
    ("Matthew", "Mcgowan", 2, 2),
    ("David", "Barscout", 3, 1),
    ("Tom", "Baker", 1, 2);