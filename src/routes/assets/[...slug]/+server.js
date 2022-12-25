import { error } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');

/** @type {import('./$types').RequestHandler} */
export function GET({ url, params }) {
    console.log(params.slug, params, url, `http://127.0.0.1:8090/api/files/${params.slug}${url.search}`);
    return new Promise((resolve, reject) => {
        fetch(`http://127.0.0.1:8090/api/files/${params.slug}${url.search}`)
            .then(r => r.blob()).then(async (file) => {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                resolve(new Response(buffer));
            }).catch((e) => {
                resolve(e);
            })
    })
}