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

# Mengubah data User dummy menjadi data dari Firebase Authetication
Install Firebase SDK
`$ npm i --save firebase`

Install [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)
`$ npm i --save react-firebase-hooks`

Gunakan useContext Api, cek di web react nya langsung<br/>

### Testing
Test Firebase Auth
- http://localhost:3000/pengaturan
atau
- http://localhost:3000/produk
atau
- http://localhost:3000/transaksi

Hasilnya akan redirect ke login, karena ada auth dari firebase,<br/>
dan sampai sini kita belum bikin auth user nya

# Install Material UI
`$ npm i --save @material-ui/core`
`$ npm i --save @material-ui/styles`

## Add Roboto Font
Add roboto font on public/index.html

# Install Validator
`$ npm i --save validator`

# Lupa Password
Install notisstack<br/>
`$ npm i --save notistack`

# Page Layout Examples
[Free Template from Material-ui](https://material-ui.com/getting-started/templates/)
<br/>

yg di pakai
[Dashboard Layout](https://material-ui.com/getting-started/templates/dashboard/)

## Install MaterialUI Icons
`$ npm i --save @material-ui/icons`

# firebase init firestore
di terminal
`$ firebase init firestore`
- pilih project yg akan di pakai
- enter enter aja sampai selesai

## deploy firebase rules
`$ firebase deploy --only firestore:rules`

## Security Rules untuk Firebase Cloud Storage
`$ firebase init storage`
<br />
Deploy <br />

`$ firebase deploy --only storage`
Setelah di deploy cek di console firebase google

## Numeral.js
untuk membuat format currency<br/>
`$ npm i --save numeral`

## date-fnd library untuk Tanggal
`$ npm i --save date-fns`

### Disini tambahin rules di firestore.rules
kemudian deploy dengan cara<br/>
`$ firebase deploy --only firestore:rules`

# Cara Deploy Web App ke Firebase
1. `$ npm run build`
2. `$ npm install -g firebase-tools`
3. `$ firebase login`
4. `$ firebase init`
5. Are you ready to procees? Jawab Y
6. Pilih Hosting: Configure and deploy Firebase Hosting sites
7. What do you want to use as your public directory? (public) - Enter aja
8. Configure as a single-page app (rewrite all urls to /index.html)? (y/N) , jawab YES aja
9. Overwrite index.html? jawab No, karena mau pake index.html yg di build
10. `$ firebase deploy`