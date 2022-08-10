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
  ('0.146ju0n473k', 'C', 'F', 1, 4, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.146j9ig473k', 'F', 'G', 1, 2, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.146lnqp0u3k', 'C', 'F', 1, 4, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.1ytl9ol473k', 'F', 'G', 1, 6, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.j9yl9ol473k', 'G', 'F', 1, 6, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.kkyl9ol9uyk', 'A', 'H', 1, 7.5, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.ajll9ol401l', 'H', 'A', 1, 6, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.fg89ol401l', 'H', 'I', 1, 3, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.K6R9ol401l', 'I', 'H', 1, 3, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.gswR9ol432E', 'I', 'L', 1, 8, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.gsi97l432E', 'L', 'I', 1, 8, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.klwR9olfth', 'I', 'D', 1, 2, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.hd7yol432E', 'D', 'I', 1, 2, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.a16l7iLP0q', 'I', 'D', 2, 3.0, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
  ('0.KL8l7iferq', 'A', 'H', 2, 1, '2022-07-31T15:40:00+01:00', "T06x323aWb", 1),
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
  ('0.7YG6aam856k', 'E', 'F', 1, 1, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.14SW4856k', 'F', 'E', 1, 1, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.LP06ajs96k', 'F', 'I', 1, 3, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.fj86aam856k', 'I', 'F', 1, 3, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.1HY7am856k', 'F', 'G', 1, 5, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.906aam856k', 'G', 'F', 1, 3, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.5F5aam856k', 'G', 'L', 1, 11, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.14G9Im856k', 'L', 'G', 1, 2, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.H86a0m856k', 'G', 'H', 1, 4, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.14JKm856UH', 'H', 'G', 1, 6, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.528m856kL', 'H', 'D', 1, 4, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.H9P0am856k', 'D', 'H', 1, 8, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.146lnqa073k', 'A', 'B', 1, 2, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.1splnqa073k', 'B', 'A', 1, 2, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.146lnqasp3k', 'A', 'C', 1, 5, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.14sp09a073k', 'C', 'A', 1, 5, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.1smonqa073k', 'B', 'D', 1, 7, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.948lnqa073k', 'D', 'B', 1, 7, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.146lnqa074k', 'C', 'D', 1, 4, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.146aam856k', 'D', 'C', 1, 4, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.1r6aam856k', 'E', 'C', 1, 2, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.KI8am856k', 'C', 'E', 1, 3, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
   ('0.G6aa4fe6k', 'E', 'F', 2, 1, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.jeW4856k', 'F', 'E', 2, 1, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.lp06aam856k', 'F', 'I', 2, 3, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.fj8nskm856k', 'I', 'F', 2, 10, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.nsi8em856k', 'F', 'G', 2, 5, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.diemam856k', 'G', 'F', 2, 3, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.5F5aameb34', 'G', 'L', 2, 11, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.14G9Imjde', 'L', 'G', 2, 2, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.H86a0jdnwk', 'G', 'H', 2, 4, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.14JKjdnekH', 'H', 'G', 1, 6, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.528mdjnrkL', 'H', 'D', 2, 4, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.H9P0amnwk', 'D', 'H', 2, 8, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.147h3a073k', 'A', 'B', 2, 2, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.1snd3qa073k', 'B', 'A', 2, 2, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.14ehbasp3k', 'A', 'C', 2, 5, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.1g249a073k', 'C', 'A', 2, 5, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.jeu68djp73k', 'B', 'D', 2, 7, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.948lj9e73k', 'D', 'B', 2, 7, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.he8lnqa074k', 'C', 'D', 2, 4, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.1ehuem856k', 'D', 'C', 2, 4, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.1he8am856k', 'E', 'C', 2, 2, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2),
  ('0.Kbeue856k', 'C', 'E', 2, 3, '2022-08-04T13:00:00+01:00', "Wos78BnB09", 2);
  
  


