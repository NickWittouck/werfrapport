// Werfuren – verstuurt de week-Excel automatisch vanaf jouw Gmail-account.
// Installeren: zie de stappen in de Werfuren-thread of LEESMIJ.md.

// 1. Vul hier het adres (of de adressen) in dat de uren mag ontvangen.
//    Alleen deze adressen kunnen mail krijgen via dit script.
const ONTVANGERS = ['boekhouding@jullie-bedrijf.be'];

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.app !== 'werfuren' || !d.bestand) return antwoord({ ok: false, fout: 'Ongeldige aanvraag' });
    const gevraagd = String(d.aan || '').trim().toLowerCase();
    const toegelaten = ONTVANGERS.map(a => a.trim().toLowerCase());
    const aan = toegelaten.includes(gevraagd) ? gevraagd : toegelaten.join(',');
    const bijlage = Utilities.newBlob(
      Utilities.base64Decode(d.bestand),
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      String(d.bestandsnaam || 'Uren.xlsx').slice(0, 120)
    );
    MailApp.sendEmail({
      to: aan,
      subject: String(d.onderwerp || 'Uren werf').slice(0, 200),
      body: String(d.tekst || '').slice(0, 5000),
      attachments: [bijlage],
      name: 'Werfuren'
    });
    return antwoord({ ok: true, aan: aan });
  } catch (err) {
    return antwoord({ ok: false, fout: String(err) });
  }
}

// Test vanuit de editor: kies "test" en klik op Uitvoeren. Je krijgt een testmail.
function test() {
  MailApp.sendEmail({ to: ONTVANGERS.join(','), subject: 'Werfuren testmail', body: 'Het script werkt.', name: 'Werfuren' });
}

function antwoord(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
