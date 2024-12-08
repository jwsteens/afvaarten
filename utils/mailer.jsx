const nodemailer = require("nodemailer");
require("dotenv").config();


const voteVerificationHtml = (vote) => {
  return (
    <div>
      <h1>Bevestig je stem</h1>
      <p>Bedankt voor het stemmen! Je hebt gestemd voor de volgende {vote.votes.length == 1 ? "website" : "websites"}:</p>
      <ul>
        { vote.votes.map((vote) => <li>{vote.id}</li>) }
      </ul>
      <p>Vergeet niet om je {vote.votes.length == 1 ? "stem" : "stemmen"} te bevestigen:</p>
      <form action={`http://${process.env.host}/api/votes`} method="POST">
        <input type="hidden" name="id" value={vote.id} />
        <input type="hidden" name="verificationToken" value={vote.verificationToken} />
        <button type="submit">Bevestig {vote.votes.length} {vote.votes.length == 1 ? "stem" : "stemmen"}</button>
      </form>
    </div>
  )
}

const submissionVerificationHtml = (website) => {
  return (
    <div>
      <h1>Bevestig je inschrijving</h1>
      <p>
        Je inschrijving is bijna voltooid. Klik op de knop om je inschrijving te bevestigen.<br/>
        <bold>Naam:</bold> {website.name}<br/>
        <bold>URL:</bold> {website.url}<br/>
        <bold>Beschrijving:</bold> {website.description}<br/>
      </p>
      <form action={`http://${process.env.host}/api/websites`} method="POST">
        <input type="hidden" name="id" value={website.id} />
        <input type="hidden" name="verificationToken" value={website.verificationToken} />
        <button type="submit">Bevestig inschrijving</button>
      </form>
    </div>
  )
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "eto.stemlokaal@gmail.com",
    pass: "eyav pxqp iurk ocfa",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Jeroen Steens" <eto.stemlokaal@gmail.com>', // sender address
    to: "jeroen.steens@student.nhlstenden.com", // list of receivers
    subject: "Hello ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

async function sendVoteVerificationMail(vote) {
  const info = await transporter.sendMail({
    from: '"Jeroen Steens" <eto.stemlokaal@gmail.com',
    to: vote.email,
    subject: "Bevestig je stem",
    html: `<h1>Bevestig je stem</h1>`
  })
}

main().catch(console.error);
