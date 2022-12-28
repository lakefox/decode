import { error } from '@sveltejs/kit';
import PocketBase from '/node_modules/pocketbase/dist/pocketbase.es.mjs';
const pb = new PocketBase('https://api.decode.sh/');

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return new Promise((resolve, reject) => {
        pb.collection('posts')
            .getList(1, 50)
            .then((e) => {
                let docs = e.items.map((a) => {
                    let images = (a.content
                        .match(/!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/g) || [])
                        .map((e) => {
                            let a = e.slice(2, -1).split('](');
                            return { name: a[0], url: a[1] };
                        });
                    return {
                        title: a.title,
                        description: a.description,
                        content: a.content,
                        id: a.id,
                        active: a.active,
                        slug: a.slug,
                        images: images,
                        created: a.created
                    };
                }).sort((a, b) => {
                    let ad = new Date(a.created);
                    let bd = new Date(b.created);
                    return bd.getTime() - ad.getTime();
                }).filter(e => e.active);
                resolve({ docs: docs });
            });
    }).catch(() => {
        throw error(404, 'Not found');
    })
}