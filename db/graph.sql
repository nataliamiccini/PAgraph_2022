CREATE TABLE edge (
  id_edge varchar(100) NOT NULL, 
  node_a varchar(100) NOT NULL,
  node_b varchar(100) NOT NULL,
  versions int(11) NOT NULL,
  weight_edge int(11) NOT NULL,
  modify_date varchar(100) NOT NULL,
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
  tot_edge int(11) NOT NULL
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

  
INSERT INTO graph (id_graph, tot_node, tot_edge) VALUES
  (1, 5, 10);

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
  ('0.146lnqn473k', 'A', 'E', 1, 2, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1);


