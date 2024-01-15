# Basics of SEO in HTML

Search engine optimization (SEO) is the process of improving the visibility and ranking of a website in search engines like Google. It involves making changes to the website's content and structure to make it more attractive to search engines and easier for users to navigate.

One way to improve SEO is through the use of HTML (Hypertext Markup Language), the standard markup language for creating web pages. There are several HTML elements that can help improve a website's SEO, including:

![Image of a keychain with the word SEO on it](./dall_e_2022_12_29_18_11_42_an_image_of_a_html_tag_with_seo_on_it_with_a_dark_background_7mHdmsLmQE.webp)

- Title tags: The title tag is the main text that describes the content of a web page. It appears on the search engine results page (SERP) as the blue, clickable title of a search result. The title should be concise, relevant, and unique. \* The title tag should be placed within the head element of the HTML document, like this:

`````html
<head>
  <title>My Website | Home</title>
</head>
``` - Headings: Headings are used to break up the content of a web page and
create a hierarchy of information. The main heading should use the "h1" tag,
while subheadings should use "h2," "h3," and so on. Headings should be relevant
and descriptive, and they can help search engines understand the content of a
page. \* Headings should be used to structure the content of a web page, like
this: ```html

<h1>Welcome to My Website</h1>
<h2>Our Products</h2>
<h3>Product 1</h3>
<h3>Product 2</h3>
<h2>Our Services</h2>
<h3>Service 1</h3>
<h3>Service 2</h3>
``` - Alt text: Alt text is a brief description of an image that appears when
the image is not displayed, such as when it is loading or when the user is using
a screen reader. Alt text helps search engines understand the content of an
image and can also improve the accessibility of a website. \* Alt text: Alt text
should be added to image tags, like this: ```html

<img src="logo.jpg" alt="Logo for My Website" />

```` - URLs: URLs should be descriptive and easy to read, with keywords
separated by hyphens or underscores. A clean and simple URL structure can help
search engines understand the content of a page and make it more likely to rank
well. \* The structure of your URLs can be influenced by the way you organize
your content and the naming conventions you use for your files and directories.
For example: ` https://www.example.com/products/product-1.html
https://www.example.com/services/service-1.html ` #### Meta Tags - Meta tags:
Meta tags are HTML tags that provide metadata about a web page. The most
important meta tag for SEO is the "description" tag, which provides a brief
summary of the page's content. This description may appear in the SERP as the
black text below the title. "keywords" meta tag: This tag is used to provide a
list of keywords related to the content of a web page. However, it is not used
by all search engines and is generally not as important as the title and
description tags. ```html
<head>
  <meta name="keywords" content="keyword1, keyword2, keyword3" />
</head>
``` "author" meta tag: This tag is used to specify the author of a web page or
document. ```html
<head>
  <meta name="author" content="John Smith" />
</head>
``` "viewport" meta tag: This tag is used to specify the size and scale of a web
page on different devices. It can help ensure that your website is properly
formatted on mobile devices. ```html
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
``` "robots" meta tag: This tag is used to instruct search engines whether or
not to index a web page and follow its links. ```html
<head>
  <meta name="robots" content="index, follow" />
</head>
``` "revisit-after" meta tag: This tag is used to tell search engines how often
they should crawl a web page. ```html
<head>
  <meta name="revisit-after" content="7 days" />
</head>
``` "canonical" meta tag: This tag is used to specify the preferred URL for a
web page, which can be helpful for handling duplicate content. ```html
<head>
  <link
    rel="canonical"
    href="https://www.example.com/products/product-1.html"
  />
</head>
``` By using these HTML elements and following other SEO best practices, you can
improve the visibility and ranking of your website in search engines and attract
more qualified traffic.
`````
