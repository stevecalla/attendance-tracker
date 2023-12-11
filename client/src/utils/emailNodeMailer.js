const emailNodeMailer = async (emailContent) => {
  console.log(emailNodeMailer);

  if (emailContent?.toEmail) {
    console.log(emailContent);
  }

  const header = "content-type: application/json";
  const url = "http://localhost:3001/graphql";
  console.log(header, url);

  async function sendEmail() {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
            query SEND_EMAIL($toEmail: String!, $fromEmail: String!, $subject: String! $textContent: String $htmlContent: String) {
              sendEmail(toEmail: $toEmail fromEmail: $fromEmail subject: $subject textContent: $textContent htmlContent: $htmlContent) {
                toEmail
                fromEmail
                subject
                textContent
                htmlContent
              }
            }
          `,
        variables: {
          toEmail: "a@a.com",
          fromEmail: "a@a.com",
          subject: "a@a.com",
          textContent: "a@a.com",
          htmlContent: "a@a.com",
        },
      }),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));

    // await fetch('https://www.learnwithjason.dev/graphql', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     query: `
    //         query GetLearnWithJasonEpisodes($now: DateTime!) {
    //           allEpisode(limit: 10, sort: {date: ASC}, where: {date: {gte: $now}}) {
    //             date
    //             title
    //             guest {
    //               name
    //               twitter
    //             }
    //             description
    //           }
    //         }
    //       `,
    //     variables: {
    //       now: new Date().toISOString(),
    //     },
    //   }),
    // })
      // .then((res) => res.json())
      // .then((result) => console.log(result));
  }

  sendEmail();
};

module.exports = { emailNodeMailer };
