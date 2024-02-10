````markdown
# Backend API Documentation

## Book Routes (`book.routes.ts`)

### GET /books

- **Description**: Retrieve all books.
- **Controller**: BookController.getAllBooks
- **Endpoint in Postman**: [GET https://bookstore-backend-jhjs.onrender.com/api/books/](https://bookstore-backend-jhjs.onrender.com/api/books/)

### GET /books/:id

- **Description**: Retrieve a specific book by its ID.
- **Controller**: BookController.getBookById
- **Endpoint in Postman**: [GET https://bookstore-backend-jhjs.onrender.com/api/books/:id](https://bookstore-backend-jhjs.onrender.com/api/books/:id)

### POST /books

- **Description**: Create a new book.
- **Controller**: BookController.createBook
- **Endpoint in Postman**: [POST https://bookstore-backend-jhjs.onrender.com/api/books/](https://bookstore-backend-jhjs.onrender.com/api/books/)
- **Body**:

```json
{
  "title": "book1",
  "tags": "fiction",
  "writer": "author",
  "price": 20
}
```
````

### PUT /books/:id

- **Description**: Update a specific book by its ID. Requires authentication and admin authorization.
- **Middleware**:
  - authentication
  - authorization(["admin"])
- **Controller**: BookController.updateBook
- **Endpoint in Postman**: [PUT https://bookstore-backend-jhjs.onrender.com/api/books/:id](https://bookstore-backend-jhjs.onrender.com/api/books/:id)

### DELETE /books/:id

- **Description**: Delete a specific book by its ID. Requires authentication and admin authorization.
- **Middleware**:
  - authentication
  - authorization(["admin"])
- **Controller**: BookController.deleteBook
- **Endpoint in Postman**: [DELETE https://bookstore-backend-jhjs.onrender.com/api/books/:id](https://bookstore-backend-jhjs.onrender.com/api/books/:id)

## Order Routes (`orderRoutes.ts`)

### POST /order

- **Description**: Place a new order.
- **Controller**: OrderController.placeOrder
- **Endpoint in Postman**: [POST https://bookstore-backend-jhjs.onrender.com/api/order/](https://bookstore-backend-jhjs.onrender.com/api/order/)
- **Body**:

```json
{
  "userId": "13efc502-2466-4e31-b70d-02277f20fbaf",
  "bookId": "8e616030-e9d5-47e2-9e64-f8b522dd64c4",
  "points": 500
}
```

### DELETE /order/:orderId

- **Description**: Cancel a specific order by its ID.
- **Controller**: OrderController.cancelOrder
- **Endpoint in Postman**: [DELETE https://bookstore-backend-jhjs.onrender.com/api/order/:orderId](https://bookstore-backend-jhjs.onrender.com/api/order/:orderId)

### GET /orders/:id

- **Description**: Retrieve a specific order by its ID.
- **Controller**: OrderController.getOrderById
- **Endpoint in Postman**: [GET https://bookstore-backend-jhjs.onrender.com/api/order/:orderId](https://bookstore-backend-jhjs.onrender.com/api/order/:orderId)

### GET /orders/

- **Description**: Retrieve all orders.
- **Controller**: OrderController.getOrders
- **Endpoint in Postman**: [GET https://bookstore-backend-jhjs.onrender.com/api/order/](https://bookstore-backend-jhjs.onrender.com/api/order/)

### DELETE /orders/:id/cancel

- **Description**: Cancel a specific order by user ID.
- **Controller**: OrderController.cancelOrder
- **Endpoint in Postman**: [DELETE https://bookstore-backend-jhjs.onrender.com/api/order/:id/cancel](https://bookstore-backend-jhjs.onrender.com/api/order/:id/cancel)

## User Routes (`user.routes.ts`)

### POST /signup

- **Description**: Sign up a new user.
- **Controller**: UserController.signup
- **Endpoint in Postman**: [POST https://bookstore-backend-jhjs.onrender.com/auth/signup/](https://bookstore-backend-jhjs.onrender.com/auth/signup/)
- **Body**:

```json
{
  "name": "joe ",
  "email": "joe@gmail.com",
  "password": "description"
}
```

### POST /login

- **Description**: Log in an existing user.
- **Controller**: UserController.login
- **Endpoint in Postman**: [POST https://bookstore-backend-jhjs.onrender.com/auth/login/](https://bookstore-backend-jhjs.onrender.com/auth/login/)

### GET /users

- **Description**: Retrieve all users. Requires authentication and admin authorization.
- **Middleware**:
  - authentication
  - authorization(["admin"])
- **Controller**: UserController.getUsers
- **Endpoint in Postman**: [GET https://bookstore-backend-jhjs.onrender.com/auth/login/](https://bookstore-backend-jhjs.onrender.com/auth/login/)

### GET /profile

- **Description**: Retrieve the profile of the authenticated user. Requires authentication and either user or admin authorization.
- **Middleware**:
  - authentication
  - authorization(["user", "admin"])
- **Controller**: AuthController.getProfile
- **Endpoint in Postman**: [GET https://bookstore-backend-jhjs.onrender.com/auth/profile/](https://bookstore-backend-jhjs.onrender.com/auth/profile/)

### PUT /update/:id

- **Description**: Update the details of a specific user by their ID. Requires authentication and either user or admin authorization.
- **Middleware**:
  - authentication
  - authorization(["user", "admin"])
- **Controller**: UserController.updateUser
- **Endpoint in Postman**: [PUT https://bookstore-backend-jhjs.onrender.com/auth/update/:id](https://bookstore-backend-jhjs.onrender.com/auth/update/:id)

### DELETE /delete/:id

- **Description**: Delete a specific user by their ID. (Note: Authentication and authorization are commented out, meaning this route is accessible without authentication and authorization, please ensure security considerations before uncommenting these lines.)
- **Controller**: UserController.deleteUser
- **Endpoint in Postman**: [DELETE https://bookstore-backend-jhjs.onrender.com/auth/delete/:id](https://bookstore-backend-jhjs.onrender.com/auth/delete/:id)

```

```
