# API routes
## /admin
### GET /products
### GET /orders

## /users
### GET /
Fetch all users
### POST /
Create user \
req.body:\
name: String
### GET /:userId/bill
gets user bill from current cart
### POST /:userId/confirm
place order from current cart

## /cart
### GET /:userId
gets user cart
### POST /:userId
add product to user cart\
req.body:\
ProductId: Integer
### DELETE /:userId
delete user cart
### DELETE /:userId/item
delete item from user cart\
req.body:\
ProductId: Integer
