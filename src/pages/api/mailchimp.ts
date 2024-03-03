import type { APIRoute } from "astro";
import mailchimp from "@mailchimp/mailchimp_marketing";

export const POST: APIRoute = async ({ request }) => {
    const APIKey = import.meta.env.MAILCHIMP_API_KEY;
    const server = import.meta.env.MAILCHIMP_SERVER;
    const listId = import.meta.env.MAILCHIMP_LIST_ID;
    const email = JSON.parse(await request.text()).email;

    console.log(APIKey, server, email)

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
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName
            }
        });
    }

    run();

    return new Response(
        JSON.stringify({
        message: "Success!"
        }),
        { status: 200 }
    );
};