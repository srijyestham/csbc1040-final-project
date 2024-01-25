                        Instructions to run program

    In Bash :
                1. cd csbc1030/assignment_08

				2. Login to mysql

				3. create database ASSIGNMENT_08; 
				
				4. use database ASSIGNMENT_08;

				5. INSERT INTO User (email, name, password) VALUES
					('a@mail.com', 'a', '$2b$10$gClrAclaFpPWkYf64ZMn0e8uy6.ODX/1OFIjBJC5EOSfSmuMLc4ES'),
					('b@mail.com', 'b', '$2b$10$XzS0i4QTGtwJUAnKM6ZgSOLImNh71WgA5nzqCPG/6PhfFFIciIN5e');	
 				
				6. npm i
                
				7. node index.js
				
				8. To Login, Open the following url in browser for Access('/')
					http://localhost:3000/api/users/login

				9. Json Body example for auth
		
					{
						"email": "a@mail.com",
						"password": "123"
					}
		
				10. Open the following url in browser for get('/')
					http://localhost:3000/api/users
		
				11: Open the following url in browser for get('/:id')
					http://localhost:3000/api/users/{id}
				
				12: Open the following url in browser for new users, post('/')
					http://localhost:3000/api/users

					Json Body example
						{
						"email": "a@mail.com",
						"name": "a",
						"password": "1234"
						}

				13. 
		