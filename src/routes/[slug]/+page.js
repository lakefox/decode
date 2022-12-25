import { error } from '@sveltejs/kit';
import PocketBase from '/node_modules/pocketbase/dist/pocketbase.es.mjs';
const pb = new PocketBase('http://127.0.0.1:3100');

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return new Promise((resolve, reject) => {
        pb.collection('posts').getList(1, 50, {
            filter: `slug = "${params.slug}"`
        }).then((data) => {
            resolve(Object.assign({}, data.items[0]));
        });
    }).catch(() => {
        throw error(404, 'Not found');
    })
}