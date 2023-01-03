import { error } from '@sveltejs/kit';
import PocketBase from '/node_modules/pocketbase/dist/pocketbase.es.mjs';
const pb = new PocketBase('https://api.decode.sh/');

/** @type {import('./$types').PageLoad} */
export function GET({ params }) {
    return new Promise((resolve, reject) => {
        pb.collection('posts').getList(1, 100).then((data) => {
            console.log(data);
            let rss = data.items.filter(e => e.active).map((a) => {
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
                    timestamp: timestamp(a.created)
                };
            });
            let items = ``;
            for (let i = 0; i < rss.length; i++) {
                const item = rss[i];
                let image = "";
                if (item.images.length > 0) {
                    image = `<image>
    <url>${item.images[0].url}</url>
    <title>${item.images[0].name}</title>
    <link>https://decode.sh/${item.slug}</link>
</image>`
                }

                items += `<item>
    <title>${item.title}</title>
    <link>https://decode.sh/${item.slug}</link>
    <description>${item.description}</description>
    ${image}
    <lastmod>${item.timestamp}</lastmod>
</item>`;
            }

            let feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">

<channel>
  <title>DECODE.sh Home Page</title>
  <link>https://decode.sh</link>
  <description>Free web building tutorials and tech guides</description>
  ${items}
</channel>

</rss>`;
            resolve(new Response(feed));
        }).catch(() => {
            throw error(404, 'Not found');
        });
    });
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