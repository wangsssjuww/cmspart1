import BlogSearch from './BlogSearch';

async function fetchBlogs() {
    const blogs = await getBlogs();
    return blogs;
}

const Blog = async () => {
    const blogs = await fetchBlogs();

    return (
        <>
            {blogs.map((blog) => (
                <article key={blog.id}>
                    <h1>{blog.title}</h1>
                    <div>{blog.content}</div>

                    <BlogSearch />
                </article>
            ))}
        </>
    )
}