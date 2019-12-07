# Barak Levi's dashboard

How to run Barak Levi's dashboard app:

First make sure that npm is installed.

1) Open cmd and navigate to this path.

2) Run the Node.js server:
	2.1) cd dashboard_server
	2.2) npm install
	2.3) node build\server-host.js

3) Run the Angular App:
	
	Two options:
	A) 
		1)cd dashboard_app\dist\dashboard_app
		2)host this folder with the web host of your choice.
		
	B)  
		1)cd dashboard_app
		2)npm install
		3)cd node_modules\.bin\ng serve --prod
		
4) Open http://localhost:4200/ and enjoy the dashboard :)
