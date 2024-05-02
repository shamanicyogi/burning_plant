import type { APIRoute } from "astro";
import mailchimp from "@mailchimp/mailchimp_marketing";
import Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://91b2023e87299fcd382ad74bc5eb8330@o4506345239609344.ingest.sentry.io/4506848607272960",
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  profilesSampleRate: 1.0,
});

export const POST: APIRoute = async ({ request }) => {
  const APIKey = import.meta.env.MAILCHIMP_API_KEY;
  const server = import.meta.env.MAILCHIMP_SERVER;
  const listId = import.meta.env.MAILCHIMP_LIST_ID;
  const email = JSON.parse(await request.text()).email;

  mailchimp.setConfig({
    apiKey: APIKey,
    server: server,
  });

  const subscribingUser = {
    firstName: "",
    lastName: "",
    email,
  };

  async function run() {
    try {
      await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName,
        },
      });
    } catch (error) {
      Sentry.withScope(scope => {
        scope.setExtra("Error", "Failed to add subscriber to MailChimp");
        scope.captureException(error);
      });
    }
  }

  run();

  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 }
  );
};

// Code to get lists id
// Swap out the run function with this to get list id

// const run = async () => {
//   const response = await mailchimp.lists.getAllLists();
//   console.log(response, "@@@@@@@");
// };

// run();
