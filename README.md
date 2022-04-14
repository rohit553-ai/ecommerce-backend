## Ecommerce Backend

### Use `npm` for installaion

### Steps:

1. Open cmd line in project directory and run `npm install`
2. Create `.env` file in base directory
3. Need to run mysql and apache (using xampp maybe)
4. In project directory, run `npx sequeilze-cli db:create` in cmd to create database
5. Run `npx sequelize-cli db:migrate`
6. No seeders for now so no need to worry about seeders!
7. Now run `npm start` to run the project

- `.env` file
  ```
  PORT=4000
  EMAIL="your-email"
  EMAIL_PASSWORD="your-email-password"
  JWT_SECRET="your-secret-key"
  ```
