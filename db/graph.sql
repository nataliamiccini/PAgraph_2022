CREATE TABLE graph (
    id_graph int(11) NOT NULL, 
    node_a varchar(100) NOT NULL,
    node_b varchar(100) NOT NULL,
    weight_edge int(11) NOT NULL,
    modify_date varchar(100) NOT NULL
); 

ALTER TABLE graph
  ADD PRIMARY KEY (id_graph);

INSERT INTO graph (id_graph, node_a, node_b, weight_edge, modify_date) VALUES
  (1,'A', 'B', 3, '2022-07-31T15:40:00+01:00'),
  (1,'B', 'C', 10, '2022-07-31T15:40:00+01:00'),
  (1,'C', 'D', 5, '2022-07-31T15:40:00+01:00'),
  (1,'A', 'E', 2, '2022-07-31T15:40:00+01:00'),
  (1,'D', 'E', 1, '2022-07-31T15:40:00+01:00');