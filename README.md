# Servidor Backend-API E-commerce

## Tabla de contenido
<a name="Instalacion"></a>
<a name="Funciones Principales"></a>
<a name="Rutas"></a>
<a name="Registro Usuarios"></a>

### Instalacion

Use npm install o npm i

Luego usar npm start para iniciar el servidor.

La API esta desarollada en NodeJS y Express, usando una base de datos alojada en el SAAS MongoDB Atlas

### Funciones Principales

La api, proporciona funciones especificas para cada una de las rutas.

Productos
 Agregar: permite agregar nuevos productos a la base de datos. 
 ListarTodo: Permite listar todos los productos y los regresa en un Json.
 filtrarID: Entrega un solo producto filtrado por ID.
 filtrarCategoria: Entrega una lista en formato json con todos los productos pertenecientes a una categoria.
 del: Elimina un solo producto filtrado por ID.
 Uptade: Actualiza un item por su ID

Carrito
 Agregar: Permite agregar un item al carrito usando su ID
 CompletarCompra: Realiza el checkout de la compra y envia un email al administrador y un mensaje de whatsapp al usuario con la compra realizada.

Chat
 listarTodo: Entrega un json con todos los mensajes almacenados en la base de datos. 
 agregarMensaje: Permite agregar un mensaje a la base de datos.
 filtrarUsuario: Permite filtrar todos los mensajes de un usuario basado en el email.

La app cuenta con un front End basico basado en JS, HTML y HandleBars, donde se puede registrar un nuevo usuario y ingresar con los usuarios.

### Rutas

La API cuenta con las siguientes rutas:
* / -> Pagina de inicio para gestionar la redireccion de los usuarios logeados o no logeados

#### Productos

* /api/productos/ -> Lista en formato Json todos los productos
* /api/productos/agregar -> Agrega un nuevo producto a la base de datos
* /api/productos/listar/:id  ->Lista un producto basado en su ID y lo regresa en formato JSON
* /api/productos/listar-categoria/:categoria ->Lista los productos basado en su categoria y lo regresa en formato JSON
* /api/productos/borrar/:id -> Elimina un producto basado en su ID
* /api/productos/actualizar/:id -> Actualiza un producto basado en su ID.

#### Carrito

* /api/carrito/agregar/:id -> Agrega un nuevo producto al carrito
* /api/carrito/listar/ ->Lista en formato Json todos los productos del carrito
* /api/carrito/checkout ->Completa la compra y guarda la orden en la base de datos.
* /api/carrito/borrar/:id -> Elimina un producto del carrito basado en su ID

#### Usuarios

* /api/usuario/singin -> Permite ingresar a la API a los usuarios registrados para poder activar la sesion y realizar compras.
* /api/usuario/logout -> Destruye la sesion actual.
* /api/usuario/home ->Pagina principal para los usuarios
* /api/usuario/profile -> Pagina principal para usuarios logeados

#### FrontEndLogin

* /api/login -> Permite ingresar a la API a los desarolladores de FrontEnd autorizados por JWT
* /api/success -> Retorna el Token valido para la sesion de conexion.

#### Chat

* /api/chat/-> Lista en formato Json todos los mensajes
* /api/chat/ (post) -> Permite agregar mensajes
* /api/chat/:email -> Entrega todos los mensajes de un usuario basado en su email.

### Registro Usuarios

Puede registrar usuarios nuevos desde la ruta "/" o si lo desea puede usar un usuario de prueba llamado:
* Usuario: test@test.com
* Contraseña: test123


