import { error } from '@sveltejs/kit';
import PocketBase from '/node_modules/pocketbase/dist/pocketbase.es.mjs';
const pb = new PocketBase('https://api.decode.sh/');

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return new Promise((resolve, reject) => {
        console.log(params.slug);
        pb.collection('posts').getList(1, 50, {
            filter: `title ~ "${params.slug}"`
        }).then((data) => {
            let docs = data.items.map((a) => {
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
                    created: a.created,
                    timestamp: timestamp(a.created)
                };
            }).sort((a, b) => {
                let ad = new Date(a.created);
                let bd = new Date(b.created);
                return bd.getTime() - ad.getTime();
            }).filter(e => e.active);
            resolve({ docs: docs, tag: params.slug });
        });
    }).catch(() => {
        throw error(404, 'Not found');
    })
}
function timestamp(ts) {
    const today = new Date(ts);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return mm + '/' + dd + '/' + yyyy;
}