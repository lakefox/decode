import { error } from '@sveltejs/kit';
import PocketBase from '/node_modules/pocketbase/dist/pocketbase.es.mjs';
const pb = new PocketBase('https://api.decode.sh/');

export function GET({ params }) {
    return new Promise((resolve, reject) => {
        pb.collection('posts').getList(1, 50, {
            filter: `slug = "${params.slug}"`
        }).then((data) => {
            resolve(new Response(data.items[0].content));
        });
    }).catch(() => {
        throw error(404, 'Not found');
    })
}