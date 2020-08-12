### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Aplikasi Point of Sales
latihan dari [jagoreact.com](jagoreact.com)

# Install react-router-dom
`$ npm i --save react-router-dom`

# Install Firebase
- Install Firebase CLI
`$ npm i -g firebase-tools`

- Login firebase
`$ firebase login`

- Cek apakah firebase cli sudah terhubung
`$ firebase projects:list`




# Alur Pembuatan App
1. 01_Routing
2. 02_Styling - Menggunakan Material UI
3. 03_Registration_Page
4. 04_Login_Page
5. 05_ForgetPassword_Page
6. 06_NotFound_Page
7. 07_LayoutPrivate_Page
8. 08_Setting_Page
9. 09_Product_Page
10. 10_HomeTransaction_Page
11. 11_HistoryTransaction_Page
12. 12_DeployToFirebase


# Testing Private Route
Test 01
- http://localhost:3000
- http://localhost:3000/login
- http://localhost:3000/registrasi
- http://localhost:3000/alksdfklasdf
- http://localhost:3000/pengaturan
- http://localhost:3000/produk
- http://localhost:3000/transaksi

See the result and you can see the how the private route work<br/><br/>

Kemudian coba const user pada PrivateRoute.js di folder component ubah menjadi<br/>
const user = { name: 'wilden' } kemudian save dan coba lagi Test 01<br/><br/>

See the result and you can see the how the private route work