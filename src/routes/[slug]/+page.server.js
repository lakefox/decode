import { error } from '@sveltejs/kit';
import PocketBase from '/node_modules/pocketbase/dist/pocketbase.es.mjs';
const pb = new PocketBase('https://api.decode.sh/');

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return new Promise((resolve, reject) => {
        pb.collection('posts').getList(1, 50, {
            filter: `slug = "${params.slug}"`
        }).then((data) => {
            pb.collection('posts').getList(1, 50).then((posts) => {
                let res = Object.assign({}, data.items[0]);
                res.recommendations = posts.items.sort(() => (Math.random() > 0.5) ? 1 : -1).filter(e => e.active).filter(e => e.id != res.id).slice(0, 4).map((a) => {
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
                        images: images
                    };
                });
                res.timestamp = timestamp(res.published);
                resolve(res);
            });
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