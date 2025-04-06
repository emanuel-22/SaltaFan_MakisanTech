CREATE DATABASE IF NOT EXISTS salta_fan;  
USE salta_fan;  

CREATE TABLE IF NOT EXISTS user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS category (  
    id BIGINT AUTO_INCREMENT PRIMARY KEY,  
    name VARCHAR(255) NOT NULL  
);  
  
CREATE TABLE IF NOT EXISTS location (  
    id BIGINT AUTO_INCREMENT PRIMARY KEY,  
    name VARCHAR(255),  
    address VARCHAR(255),  
    city VARCHAR(255),  
    province VARCHAR(255),  
    url VARCHAR(255)  
);  
  
CREATE TABLE IF NOT EXISTS event (  
    id BIGINT AUTO_INCREMENT PRIMARY KEY,  
    name VARCHAR(255) NOT NULL,  
    description VARCHAR(255),  
    flyer VARCHAR(255),  
    url_ticket VARCHAR(255),  
    category_id BIGINT,  
    location_id BIGINT,  
    FOREIGN KEY (category_id) REFERENCES category (id),  
    FOREIGN KEY (location_id) REFERENCES location (id)  
);  
  
CREATE TABLE IF NOT EXISTS event_schedule (  
    id BIGINT AUTO_INCREMENT PRIMARY KEY,  
    event_date DATE,  
    event_time TIME,  
    event_id BIGINT ,  
    FOREIGN KEY (event_id) REFERENCES event (id)  
);  
  
CREATE TABLE IF NOT EXISTS event_prices (  
    id BIGINT AUTO_INCREMENT PRIMARY KEY,  
    price DOUBLE,  
    description VARCHAR(255),  
    event_id BIGINT,  
    FOREIGN KEY (event_id) REFERENCES event (id)  
);  

INSERT INTO user (username, email, password) VALUES  
('tati', 'tatiana14gutierrez@gmail.com', '$2a$12$IaTg60qwPYL.hmQi3FhErO2sBgD44vCe/6uilWJlMjNQwBYM.Tpri'),
('juan', 'juan10@gmail.com', '$2a$12$75cJibiyOwL5i8HbOdPCQOK7AO2FVh8nD0JeFNnS9okzPCnuXldcG');


/* Category */  
INSERT INTO category (id, name) VALUES (1, 'Música'),  
(2, 'Cine'),  
(3, 'Deportes'),  
(4, 'Tecnología');  
  
/* Location */  
INSERT INTO location (id, name, address, city, province, url) VALUES (1, 'Teatro Don Bosco', 'Av. 9 de Julio 123', 'Salta', 'Salta', 'https://example.com/map/teatro-don-bosco'),  
(2, 'Estadio Delmi', 'Calle España 456', 'Salta', 'Salta', 'https://example.com/map/estadio-delmi'),  
(3, 'Centro de Convenciones', 'Ruta 51 Km 5', 'Salta', 'Salta', 'https://example.com/map/centro-convenciones'),  
(4, 'Sala de Cine Hoyts', 'Shopping Alto NOA', 'Salta', 'Salta', 'https://example.com/map/cine-hoyts');  
  
/* Event */  
INSERT INTO event (id, name, description, flyer, url_ticket, category_id, location_id)   
VALUES (1, 'Concierto de Rock Nacional', 'Disfruta de las mejores bandas de rock nacional en vivo.', 'https://via.placeholder.com/800x400?text=Flyer+Rock', 'https://example.com/tickets/rock', 1, 1),  
(2, 'Maratón de Star Wars', 'Proyección de todas las películas de Star Wars en una noche.', 'https://via.placeholder.com/800x400?text=Flyer+Star+Wars', 'https://example.com/tickets/starwars', 2, 4),  
(3, 'Partido de Fútbol Solidario', 'Un partido benéfico con las estrellas locales.', 'https://via.placeholder.com/800x400?text=Flyer+Fútbol', 'https://example.com/tickets/futbol', 3, 2),  
(4, 'Feria de Innovación Tecnológica', 'Explora los avances tecnológicos más recientes.', 'https://via.placeholder.com/800x400?text=Flyer+Tech', 'https://example.com/tickets/tech', 4, 3),  
(5, 'Concierto de Jazz', 'Un evento íntimo para los amantes del jazz.', 'https://via.placeholder.com/800x400?text=Flyer+Jazz', 'https://example.com/tickets/jazz', 1, 1);  
  
   /* Schedule */  
INSERT INTO event_schedule (event_date, event_time, event_id) VALUES ('2024-12-01', '19:00', 1),  
('2024-12-02', '20:00', 1),  
('2024-12-15', '18:00', 2),  
('2024-12-15', '23:00', 2),  
('2024-12-10', '15:00', 3),  
('2024-12-20', '16:00', 4),  
('2024-12-21', '16:00', 4),  
('2024-12-05', '21:00', 5);  
  
   /* Prices */  
INSERT INTO event_prices (price, description, event_id) VALUES (5000, 'Entrada General', 1),  
(2000, 'Entrada Estudiante', 1),  
(3000, 'Entrada VIP', 2),  
(1000, 'Entrada Niños', 2),  
(1500, 'Donación Recomendada', 3),  
(7000, 'Entrada Completa', 4),  
(2500, 'Pase Diario', 4),  
(3500, 'Entrada General', 5),  
(6000, 'Entrada VIP', 5);