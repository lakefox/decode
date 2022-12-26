import { error } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
const pb = new PocketBase('https://api.decode.sh/');

/** @type {import('./$types').RequestHandler} */
export function GET({ url, params }) {
    return new Promise((resolve, reject) => {
        console.log(`https://api.decode.sh/api/files/${params.slug}${url.search}`);
        fetch(`https://api.decode.sh/api/files/${params.slug}${url.search}`)
            .then(r => r.blob()).then(async (file) => {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                resolve(new Response(buffer));
            }).catch((e) => {
                resolve(e);
            })
    })
}