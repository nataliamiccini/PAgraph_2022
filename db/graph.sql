CREATE TABLE edge (
  id_edge varchar(100) NOT NULL, 
  node_a varchar(100) NOT NULL,
  node_b varchar(100) NOT NULL,
  versions int(11) NOT NULL,
  weight_edge DECIMAL(6,2) NOT NULL,
  modify_date DATETIME NOT NULL,
  FKuser_id varchar(100) NOT NULL,
  FKid_graph int(11) NOT NULL
); 

CREATE TABLE user (
  id_user varchar(50) NOT NULL,
  email varchar(100) NOT NULL,
  name varchar(30) NOT NULL,
  surname varchar(30) NOT NULL,
  role varchar(15) NOT NULL,
  token DECIMAL(6,2) NOT NULL
);

CREATE TABLE graph (
  id_graph int(11) NOT NULL,
  tot_node int(11) NOT NULL,
  tot_edge int(11) NOT NULL,
  cost DECIMAL(6,5) NOT NULL
);

ALTER TABLE edge
  ADD PRIMARY KEY (id_edge);
ALTER TABLE user
  ADD PRIMARY KEY (id_user);
ALTER TABLE graph
  ADD PRIMARY KEY (id_graph);
ALTER TABLE edge
  ADD CONSTRAINT FKuser_id FOREIGN KEY (FKuser_id) REFERENCES user (id_user) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE edge
  ADD CONSTRAINT FKid_graph FOREIGN KEY (FKid_graph) REFERENCES graph (id_graph) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO user (id_user,email, name, surname,  role, token) VALUES 
  ('T06x323aWb', 'asya@gmail.com', 'Asya', 'Pesaresi', 'user', 500),
  ('Wos78BnB09', 'chiara@gmail.com', 'Chiara', 'Cucchi', 'user', 100),
  ('4p0KF0xkOi', 'francesco@gmail.com', 'Francesco', 'Rossi', 'user', 200),
  ('2Zbo_lX4d5', 'alessandro@gmail.com', 'Alessandro', 'Passarini', 'admin', 300),
  ('nzRH41T5sz', 'natalia@gmail.com', 'Natalia', 'Miccini', 'admin', 100);

  
INSERT INTO graph (id_graph, tot_node, tot_edge, cost) VALUES
  (1, 5, 10, 1.35),
  (2, 4, 8, 1.08);

INSERT INTO edge (id_edge, node_a, node_b, versions, weight_edge, modify_date, FKuser_id, FKid_graph) VALUES
  ('0.a16l7ifc5q', 'A', 'B', 1, 3, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.a16l7ifc5d', 'B', 'A', 1, 3, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.k886s5cwk5d', 'B', 'C', 1, 10, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.k886s5cwk65', 'C', 'B', 1, 10, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.iifehwrqlsj', 'C', 'D', 1, 5, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.iifehmkqlsj', 'D', 'C', 1, 5, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.px6299xjvtb', 'D', 'E', 1, 1, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.14ressn473k', 'E', 'D', 1, 1, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.14renqn473k', 'E', 'A', 1, 2, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.146lnqn473k', 'A', 'E', 1, 2, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.a16l7iferq', 'A', 'B', 2, 3.0, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.a16l7idt5d', 'B', 'A', 2, 1.0, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.k886s5cwwed', 'B', 'C', 2, 8.0, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.k886s5cwos5', 'C', 'B', 2, 1.0, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.iifehwrqasj', 'C', 'D', 2, 5.0, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.iifehsiqlsj', 'D', 'C', 2, 5.0, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.px629spjvtb', 'D', 'E', 2, 6.0, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.14resssm73k', 'E', 'D', 2, 1.0, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.14renqs673k', 'E', 'A', 2, 3.0, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.19k8nqa073k', 'A', 'E', 2, 2.5, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.146lnqa073k', 'A', 'B', 1, 2, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.1splnqa073k', 'B', 'A', 1, 2, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.146lnqasp3k', 'A', 'C', 1, 5, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.14sp09a073k', 'C', 'A', 1, 5, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.1smonqa073k', 'B', 'D', 1, 7, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.948lnqa073k', 'D', 'B', 1, 7, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.146lnqa074k', 'C', 'D', 1, 4, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.146aam856k', 'D', 'C', 1, 4, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2);
  


