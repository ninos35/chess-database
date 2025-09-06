# Chess Database

Aplikacija za unos i pregled šahovskih partija, razvijena kao završni rad na preddiplomskom studiju na Fakultetu elektrotehnike i računarstva u Zagrebu.

Aplikacija koristi React za frontend i Node.js s Expressom za backend, dok se podaci pohranjuju lokalno u PostgreSQL bazu.

---

## Tehnologije

- React  
- Node.js, Express.js  
- PostgreSQL  
- Bootstrap, CSS
 

---

## Korištene biblioteke

- `react-chessboard` — za prikaz šahovske ploče  
- `chess.js` — za validaciju poteza i logiku igre  

---

## Kako pokrenuti aplikaciju lokalno

### Backend

1. Otvori terminal i pozicioniraj se u folder `/backend/src`  
2. Pokreni server naredbom:  
   ```bash
   node server.js

### Frontend

1. Otvori terminal i pozicioniraj se u folder `/frontend/GameBase/src/App`
2. Instaliraj potrebne pakete naredbom:
   ```bash
   npm install
3. Pokreni server naredbom:  
   ```bash
   npm run dev

Aplikacija će biti dostupna na adresi: http://localhost:5173/ 

---

### Izgled aplikacije prilikom unošenja partije
![Unosenje partije u aplikaciju](./docs/unosenje.jpg)

### Izgled forme za unos informacija o partiji
![Forma za unos informacija](./docs/forma.jpg)

### Izgled aplikacije pri pregledavanju određene partije
![Pregledavanje partije u aplikaciji](./docs/pregled.jpg)
