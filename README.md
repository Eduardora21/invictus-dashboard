# ⚽ Dashboard Deportivo - Invictus Quebradas

Sistema web Full-Stack desarrollado para la administración, monitoreo deportivo y control financiero de un club de fútbol. La aplicación centraliza la gestión de jugadores, inventario de utilería, pagos y una pizarra táctica interactiva mediante una interfaz moderna, responsiva y conectada a una API REST.

## 🚀 Funcionalidades

* Gestión de jugadores con operaciones CRUD.
* Estadísticas de la plantilla en tiempo real.
* Control del estado de los jugadores (Activo, Inactivo y Lesionado).
* Administración del inventario deportivo.
* Gestión y seguimiento de pagos.
* Pizarra táctica interactiva con almacenamiento de posiciones.
* Interfaz responsiva desarrollada con Bootstrap.
* Alertas y confirmaciones mediante SweetAlert2.

## 🛠️ Tecnologías utilizadas

* Node.js
* Express.js
* MySQL
* Docker
* HTML5
* CSS3
* Bootstrap 5
* JavaScript
* SweetAlert2
* Font Awesome

## 📂 Módulos del sistema

### 👥 Plantilla

Permite registrar, editar, consultar y administrar la información de los jugadores del club, además de visualizar estadísticas generales y aplicar filtros de búsqueda.

### 🎒 Inventario

Controla los implementos deportivos, registrando cantidades, estado del equipo y observaciones para facilitar su administración.

### 💰 Pagos

Administra la información financiera del club, permitiendo llevar un control organizado de los pagos registrados.

### 🧩 Pizarra táctica

Permite organizar tácticamente al equipo sobre un campo de juego interactivo y guardar automáticamente las posiciones en la base de datos.

## 💾 Base de datos

El sistema utiliza MySQL para almacenar de forma persistente la información de:

* Jugadores
* Inventario
* Pagos
* Posiciones de la pizarra táctica

## ⚙️ Backend

El servidor fue desarrollado con Node.js y Express, implementando una API REST encargada de gestionar todas las operaciones entre el frontend y la base de datos.

## 🐳 Entorno de desarrollo

La aplicación se ejecuta de forma local utilizando Docker para el backend y la base de datos MySQL. El frontend consume los servicios mediante peticiones asíncronas utilizando `fetch()`.

## 🎯 Objetivo

Desarrollar una solución centralizada que facilite la administración deportiva y operativa de un club de fútbol, integrando diferentes módulos en una única plataforma web moderna, organizada y fácil de utilizar.
