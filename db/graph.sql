CREATE TABLE graph (
    id_edge varchar(100) NOT NULL, 
    id_graph int(11) NOT NULL, 
    node_a varchar(100) NOT NULL,
    node_b varchar(100) NOT NULL,
    weight_edge int(11) NOT NULL,
    modify_date varchar(100) NOT NULL,
    FKuser_id varchar(100) NOT NULL
); 

CREATE TABLE user (
  id_user varchar(50) NOT NULL,
  email varchar(100) NOT NULL,
  name varchar(30) NOT NULL,
  surname varchar(30) NOT NULL,
  role varchar(15) NOT NULL,
  token int(11) NOT NULL
);

ALTER TABLE graph
  ADD PRIMARY KEY (id_edge);
ALTER TABLE user
  ADD PRIMARY KEY (id_user);
ALTER TABLE graph
  ADD CONSTRAINT FKuser_id FOREIGN KEY (FKuser_id) REFERENCES user (id_user) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO user (id_user,email, name, surname,  role, token) VALUES 
  ('T06x323aWb', 'asya@gmail.com', 'Asya', 'Pesaresi', 'user', 500),
  ('Wos78BnB09', 'chiara@gmail.com', 'Chiara', 'Cucchi', 'user', 100),
  ('4p0KF0xkOi', 'francesco@gmail.com', 'Francesco', 'Rossi', 'user', 200),
  ('2Zbo_lX4d5', 'alessandro@gmail.com', 'Alessandro', 'Passarini', 'admin', 300),
  ('nzRH41T5sz', 'natalia@gmail.com', 'Natalia', 'Miccini', 'admin', 100);

INSERT INTO graph (id_edge, id_graph, node_a, node_b, weight_edge, modify_date, FKuser_id) VALUES
  ('0.a16l7ifc5q',1,'A', 'B', 3, '2022-07-31T15:40:00+01:00',"T06x323aWb"),
  ('0.k886s5cwk5d',1,'B', 'C', 10, '2022-07-31T15:40:00+01:00',"T06x323aWb"),
  ('0.iifehwrqlsj',1,'C', 'D', 5, '2022-07-31T15:40:00+01:00',"T06x323aWb"),
  ('0.146lnqn473k',1,'A', 'E', 2, '2022-07-31T15:40:00+01:00',"T06x323aWb"),
  ('0.px6299xjvtb',1,'D', 'E', 1, '2022-07-31T15:40:00+01:00', "T06x323aWb");

