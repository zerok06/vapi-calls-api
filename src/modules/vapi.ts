


const NUMBER_ID = process.env.VAPI_NUMBER_ID
const ASSISTANT_ID = process.env.VAPI_ASSISTANT_ID
const TOKEN = process.env.VAPI_WEBHOOK_TOKEN
const API_URL = process.env.VAPI_API_URL


const createCall = async (phone: string, name: string) => {


    const optionsVapi = {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + TOKEN,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "customer": {
                "number": phone.replace(/(?!^\+)\D/g, ''),
                "name": name
            },
            "phoneNumberId": NUMBER_ID,
            "assistantId": ASSISTANT_ID
        }),
    }

    const fetchingVapi = await fetch(`${API_URL}/call`, optionsVapi);

    const body = await fetchingVapi.json();
    console.log(body);

    return { success: true, data: body };
}


export const vapi = {
    calls: createCall
}