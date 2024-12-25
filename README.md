# server (back-end)
 **setup environment**
- nodejs 20.10 
- `cd server` 
- `npm install`
- `copy .env.example .env` chỉnh lại đúng với thông số của mình
- `npm run server`

 **db init**
- tạo 1 db trong xampp hoặc msql workbench
- chỉnh thông số của .env đúng với thông số của mình
- `cd server` 
- `npm run init_db`
- hạn chế sử dụng `npm run reset_db`

 **db seeder**
- `cd server` 
- AdminSeeder `npx sequelize db:seed --seed AdminSeeder --config=config/mysql.config.js`


# client (front-end)
 **setup environment**
- `cd client` 
- `npm install`
- `copy .env.example .env` chỉnh lại đúng với thông số của mình
- `npm start`


# PORT
- PORT=3000
- APP_PORT=3030
