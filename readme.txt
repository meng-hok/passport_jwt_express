Securing Api with passport JWT strategy

ENDPOINT
	1. Start with registering with , id email status and password
	/users/signup 

	2. request email password to get token
	/auth/getToken

	3. send token to currentUser
	/auth/getUser

Noticed Controller and Configuration file
	./app.js
	./config/authentication_token.js
	./controller/AuthenticationController.js
	./.env
Flow Config
	after login  
		1. local session = randomstring
		2. token as pair in redis
		3. send token 
	check only randomstring match 
