# Werfrapport – dagrapport uren & taken per ploeg

Web-app (één map, geen installatie, geen server-database). Werkt offline op gsm, tablet en pc.

## Bestanden
| Bestand | Rol |
|---|---|
| `index.html` | de volledige app (incl. eigen Excel-generator, geen externe bibliotheken) |
| `manifest.json`, `icon.svg` | maakt "Toevoegen aan startscherm" mogelijk |
| `sw.js` | offline-cache (werkt alleen als de map via https gehost wordt) |

## Op de gsm van de werfleider zetten
1. Zet de map op een https-adres (bv. GitHub Pages, Netlify Drop, of een submap van de eigen website).
2. Open het adres op de gsm → menu → **Toevoegen aan startscherm**.
3. Daarna start de app als een gewone app en werkt ook zonder bereik.

Snel testen op pc: `index.html` dubbelklikken (Chrome/Edge). Mailen gaat dan via download + mailprogramma.

## Gebruik
- **Instellingen**: naam, bedrijf, logo, e-mailadres ontvanger(s), standaard begin/einde/pauze,
  ploegen met hun leden, werven, keuzelijsten materieel en voertuigen.
- **Rapport**: datum + werf → ploeg toevoegen (leden komen er automatisch in met de standaarduren)
  → per persoon begin, einde, pauze (uren worden zelf berekend, of typ uren rechtstreeks) en taak.
  "Tijden 1e persoon → iedereen" kopieert de tijden naar de hele ploeg.
  Daaronder: **materieel** (machine + uren) en **verplaatsingen** (voertuig/chauffeur + km + traject).
  Alles wordt bij elke toetsaanslag opgeslagen.
- **✉️ Mail als Excel**: op gsm opent het deelmenu met het .xlsx-bestand als bijlage → kies Outlook/Gmail.
  Op pc: Excel wordt gedownload en het mailprogramma opent (bijlage zelf toevoegen).
- **Historiek**: alle rapporten, openen/aanpassen/opnieuw mailen, zoeken, prullenbak (niets wordt echt gewist).
  Periode-overzicht (bv. maand) naar Excel: alle uren, totaal per persoon, materieel, kilometers
  en elk dagrapport als apart blad.

## Waarom gegevens niet verdwijnen
- Opslag in IndexedDB **én** een tweede kopie in localStorage; bij opstart wordt de ene uit de andere hersteld.
- De app vraagt de browser om **permanente opslag** (wordt niet automatisch opgeruimd).
- Verwijderen gaat altijd naar de prullenbak.
- Backup-knop (JSON) om te bewaren of naar jezelf te mailen; de app waarschuwt als de laatste backup > 7 dagen oud is.
  Terugzetten voegt samen, overschrijft nooit nieuwere gegevens.

Let op: de gegevens staan op **het toestel** van de werfleider. Bij een nieuwe gsm of "browsergegevens wissen"
is de backup nodig — de gemailde Excels blijven natuurlijk ook bewaard in de mailbox.
