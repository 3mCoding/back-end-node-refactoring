create database tmc_db;

use tmc_db

create table user(
    email VARCHAR(30) PRIMARY KEY,
    student_num VARCHAR(4) NOT NULL,
    name VARCHAR(10) NOT NULL,
    password VARCHAR(60) NOT NULL,
    step INT NOT NULL, 
	date DATETIME
);

-- java 0
-- c 1
-- cpp 2
create table question(
    id INT PRIMARY KEY,
    no INT Not NULL,
    type VARCHAR(1) NOT NULL,
    title VARCHAR(30) NOT NULL,
    question VARCHAR(200) NOT NULL,
    print VARCHAR(200) NOT NULL,
    code VARCHAR(500) NOT NULL,
    answer_cnt INT NOT NULL,
    answers VARCHAR(20) NOT NULL,
    desc_path VARCHAR(10) NOT NULL
)ENGINE = InnoDB DEFAULT CHARSET = utf8;