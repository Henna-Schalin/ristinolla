# Teknologiat

Projektiin on käytetty Reactia + Node.js ja tietokanta toimii mongoDB:ssä. 

Projekti on myös deployattuna fly.io:n avulla ja se löytyy osoitteesta: 

https://ristinolla.fly.dev/

## Ohjeet ratkaisun pystyttämiseen

1. Lataa lähdekoodit GitHubista ja tallenna ne paikallisesti tietokoneellesi.

2. Asenna kaikki tarvittavat paketit komennolla "npm install" komentokehotteessa.

3. Luo .env-tiedostot, joihin tallennat kaikki ympäristömuuttujat, joita sovelluksesi tarvitsee. Muista lisätä .env-tiedosto .gitignore-tiedostoon, jotta se ei tallennu GitHubiin.

4. Kun olet asentanut paketit ja määrittänyt ympäristömuuttujat, voit käynnistää frontendin paikallisesti komennolla "npm start". Tämä avaa sovelluksen selaimessa osoitteessa http://localhost:3000.

5. Backendiä varten tulee samat asiat tehdä backend-koodissa, jonka jälkeen frontendissä syötetään komento "npm run build" ja sen luoma build kansio kopioidaan backendin puolelle, jonka jälkeen koodin voi ajaa backendistä ja avata selaimessa osoitteessa http://localhost:3001.

### Ratkaisu

Ratkaisussa on ristinolla-peli 3x3 ruudukolla ja pelilauta on erikseen aukeavassa modalissa. Pistelaskuri laskee modalissa selainistunnon osapuolten voitot sekä tasapelit. 

Backendissä pelejä luodaan, haetaan, lisätään ja poistetaan tietokantaan/tietokannasta. 

Frontendissä on kaikkien pelien listaus, josta voi klikata auki myös yksittäisen pelin siirrot. Pelin sisältönä on pelaajien tiedot, pelin ajankohta ja pelin lopputulos. Lisäksi toisena listana löytyy  parhaiden pelaajien listaus, jonka tiedot haetaan myös backendistä.

### Lisäominaisuudet

Jos pelejä haluaa tallentaa, voi luoda itselleen pelaajanimen. Jotta samaa pelaajanimeä ei voi käyttää kukaan muu, määritellään pelaajalle myös salasana. Peliä voi pelata joko tietokonevastustajaa vastaan tai kahdestaan. Jos pelaa toista pelaajaa vastaan, voi myös toiselle pelaajalle määritellä pelaajanimen ja salasanan. 

Siirtojen katseluun on lisätty myös animaatio, joka näyttää pelin kulun siirto siirrolta.
