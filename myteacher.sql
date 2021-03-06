--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: students; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.students (
    id integer NOT NULL,
    avatar_url text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    birth timestamp without time zone NOT NULL,
    school_year text NOT NULL,
    course_load text NOT NULL,
    teacher_id integer
);


--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- Name: teachers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.teachers (
    id integer NOT NULL,
    avatar_url text NOT NULL,
    name text NOT NULL,
    birthdate timestamp without time zone NOT NULL,
    educationlevel text NOT NULL,
    classtype text NOT NULL,
    subjectstaught text NOT NULL,
    created_at timestamp without time zone NOT NULL
);


--
-- Name: teachers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.teachers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: teachers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.teachers_id_seq OWNED BY public.teachers.id;


--
-- Name: students id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- Name: teachers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teachers ALTER COLUMN id SET DEFAULT nextval('public.teachers_id_seq'::regclass);


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.students (id, avatar_url, name, email, birth, school_year, course_load, teacher_id) FROM stdin;
2	https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80	Geovana Martinez	email@email.com	1991-07-04 00:00:00	1	20	6
4	https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80	Jo├úo da Silva	email@email.com	1990-12-28 00:00:00	5	30	6
1	https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80	Helcio Itiyama	helcio.itiyama@gmail.com	1979-07-06 00:00:00	5	50	7
5	https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80	Fernanda Souza	email@email.com	2001-07-23 00:00:00	2	30	12
\.


--
-- Data for Name: teachers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.teachers (id, avatar_url, name, birthdate, educationlevel, classtype, subjectstaught, created_at) FROM stdin;
6	https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80	Lucas Damasceno	2000-02-02 00:00:00	Doutorado	├Ç distancia	RH, Administra├º├úo	2020-02-19 00:00:00
7	https://images.unsplash.com/photo-1575859694244-0b337bf58e0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80	Jorge Pascal	2000-08-09 00:00:00	Doutorado	Presencial	Matem├ítica, F├¡sica	2020-02-20 00:00:00
8	https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80	Jos├® do Nascimento	1980-09-15 00:00:00	Mestrado	Presencial	Matem├ítica, F├¡sica	2020-02-21 00:00:00
9	https://images.unsplash.com/photo-1575859694244-0b337bf58e0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80	Mateus Alencar	1965-03-12 00:00:00	Mestrado	Presencial	Portugu├¬s, Literatura	2020-02-21 00:00:00
10	https://images.unsplash.com/photo-1575859694244-0b337bf58e0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80	Alexandre Morais	1980-04-28 00:00:00	Mestrado	Presencial	Qu├¡mica, F├¡sica	2020-02-21 00:00:00
11	https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80	Rodrigo Santos	1978-07-19 00:00:00	Mestrado	Presencial	Hist├│ria, Geografia	2020-02-21 00:00:00
12	https://images.unsplash.com/photo-1575859694244-0b337bf58e0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80	Eduardo Santana	1980-01-23 00:00:00	Mestrado	Presencial	Trigonometria, Geometria	2020-02-21 00:00:00
13	https://images.unsplash.com/photo-1575859694244-0b337bf58e0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80	Eduardo Santana	1980-01-23 00:00:00	Mestrado	Presencial	Trigonometria, Geometria	2020-02-21 00:00:00
14	https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80	Mara Andrade	1990-03-26 00:00:00	Mestrado	Presencial	Reda├º├úo, Gram├ítica	2020-02-21 00:00:00
15	https://images.unsplash.com/photo-1571844307363-13b4a27ec7f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=775&q=80	Angelica Pereira	1989-03-30 00:00:00	Mestrado	Presencial	Mec├ónica, F├¡sica	2020-02-21 00:00:00
\.


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.students_id_seq', 5, true);


--
-- Name: teachers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.teachers_id_seq', 15, true);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: teachers teachers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

