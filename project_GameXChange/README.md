# GameXChange

## Planlegging
Jeg ble inspirert av Gamestop og andre spillsalg nettsider, fordi de ikke har mye tekst, og fremhever det de selger med en gang du lander på siden. Folk er her bare for å kjøpe spill, og å gi kunden mye tekst kan bli overvelmende eller irriterende.

## UU/UX
Jeg har selvfølgelig også tatt UU i betraktning. Jeg har fikset kontrast problemet og har valgt tre, sterke farger som kontraster hverandre for å fremheve nettsiden. Jeg har også passet på at background.png er open source og free to use. Jeg har også fikset media query og fått nettsiden til å funke på mobil.

## Tilbakemelding for det originale utseendet:
Jeg synes nettsiden var veldig upraktisk og rotete, jeg visste ikke hvordan jeg skulle klikke fram, og mye av teksten lå oppå hverandre. Det var kleint. Men jeg likte rulleteksten på landesiden, så jeg beholdte den men brukte den på en annen måte.

## Hva jeg har endret og diverse tips:
- all style holder seg inne i css og ikke tilfeldig inni htmlen. det får det til å se mer ryddig ut. jeg har gjort en eksepsjon for span som jeg bruker for å vise hvilken side du er på.
- hold språket konsistent. "register" og "all products" på engelsk, men "hjem" og "kontakt" er på norsk? det ser litt klumsete ut.
- bruk div. det blir enklere å justere, og ser ryddig/proft ut.
- landesiden burde hete index.html, det er standard.
- istedenfor ti konsekutive <\br> kan du bare bruke padding og margin inne på css for å dele opp teksten. 

## Alle endringer jeg har gjort:
### Generelt/for alle sidene:
- Fikset layout
- Valgt kontrastende farger
- Enkel navigasjonsheader
- Stilig, open source bakgrunnsbilde
- Gjort nettsiden brukelig på både mobil og pc
- Beholdt rulletekst men har repurposed den til å promotere salg/tilbud istedenfor

### Index:
- Satt opp layout på en måte som med en gang promoterer spillene dere tilbyr for bytting
- 
### Login/Register:
- Satt opp en form som tar bruker input som du kan justere og endre som du ønsker med backend
### Contact:
- Satt opp en standard layout som du kan endre med deres kontaktinfo
### All Products:
- Ryddigere layout med en BYTT NÅ knapp som du selv kan gjøre responsiv med backend
- Du kan også justere eller legge til mer informasjon om spillet sammen med platformen og status

## Annet:
- synes dere trenger flere produkter å selge, siden det bare er to akkurat nå. for å fange flere kunder er det viktig å ha en god variasjon.