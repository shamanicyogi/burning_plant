import type { APIRoute } from "astro";
import mailchimp from "@mailchimp/mailchimp_marketing";

export const POST: APIRoute = async ({ request }) => {
    const mailChimpAPIKey = import.meta.env.MAILCHIMP_API_KEY;
    const mailChimpServer = import.meta.env.MAILCHIMP_SERVER;
    const email = JSON.parse(await request.text()).email;

    console.log(mailChimpAPIKey, mailChimpServer, email)

    mailchimp.setConfig({
        apiKey: mailChimpAPIKey,
        server: mailChimpServer,
    });


    async function run() {
        const response = await mailchimp.ping.get();
        console.log(response);
      }
      
      run();

//   const data = await request.formData();
//   const name = data.get("name");
//   const email = data.get("email");
//   const message = data.get("message");
//   // Validate the data - you'll probably want to do more than this
//   if (!name || !email || !message) {
//     return new Response(
//       JSON.stringify({
//         message: "Missing required fields",
//       }),
//       { status: 400 }
//     );
//   }
  // Do something with the data, then return a success response

  return new Response(
    JSON.stringify({
      message: "Success!"
    }),
    { status: 200 }
  );
};