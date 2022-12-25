import { error } from '@sveltejs/kit';
import PocketBase from '/node_modules/pocketbase/dist/pocketbase.es.mjs';
const pb = new PocketBase('http://127.0.0.1:8090');

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return new Promise((resolve, reject) => {
        pb.collection('posts')
            .getList(1, 50)
            .then((e) => {
                let docs = e.items.map((a) => {
                    return {
                        title: a.title,
                        description: a.description,
                        content: a.content,
                        id: a.id,
                        active: a.active,
                        slug: a.slug
                    };
                });
                resolve({ docs: docs });
            });
    }).catch(() => {
        throw error(404, 'Not found');
    })
}