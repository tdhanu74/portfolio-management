import { useState, useEffect } from 'react';

interface Blog {
  id: number;
  title: string;
  summary: string;
  date: string;
  author: string;
}

interface BlogsProps {
  blogs: Blog[];
}

const BlogArticle: React.FC<{ blog: Blog }> = ({ blog }) => {
  const [expanded, setExpanded] = useState(false);

  const handleReadMore = () => setExpanded((prev) => !prev);

  const summaryPreview = blog.summary.length > 100 ? blog.summary.slice(0, 300) + "..." : blog.summary;

  return (
    <article
      className="p-4 flex flex-col h-full gap-2"
      key={blog.id || blog.title}
    >
      <p className="text-gray-500 text-sm">{blog.date}</p>
      <h2 className="text-xl font-semibold text-black-500">{blog.title}</h2>
      <p className="text-gray-700 flex-1 text-sm transition-all duration-300 ease-in-out">
        {expanded ? blog.summary : summaryPreview}
      </p>
      {blog.summary.length > 300 && (
        <button
          className="text-primary-500 text-sm self-start hover:underline cursor-pointer"
          onClick={handleReadMore}
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      )}
    </article>
  );
};

const Blogs: React.FC<BlogsProps> = ({ blogs }) => (
  <div
    className="
      w-full
      max-w-7xl
      mx-auto
      grid
      gap-6
      grid-cols-1
      sm:grid-cols-1
      lg:grid-cols-2
    "
  >
    {blogs.length === 0 ? (
      <div className="col-span-full text-center text-gray-500">No blogs available.</div>
    ) : (
      blogs.map((blog) => <BlogArticle key={blog.id || blog.title} blog={blog} />)
    )}
  </div>
);

const Home = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const dummyBlogs = [
      {
        id: 1,
        title: "How to Build a React App",
        summary: "A step-by-step guide to building your first React application. In this comprehensive tutorial, we will walk you through the entire process of setting up your development environment, creating your first components, managing state, and handling user interactions. You'll also learn best practices for organizing your project, using hooks effectively, and deploying your finished app. Whether you're a complete beginner or looking to refresh your skills, this guide provides clear explanations and practical examples to help you succeed. By the end, you'll have a solid understanding of React fundamentals and the confidence to build your own projects from scratch.",
        author: "Jane Doe",
        date: "2024-06-01",
      },
      {
        id: 2,
        title: "Understanding TypeScript",
        summary: "Learn the basics and benefits of using TypeScript in your projects. This article covers why TypeScript is a powerful addition to JavaScript, how it helps catch errors early, and how to get started with type annotations, interfaces, and generics. We’ll explore real-world scenarios where TypeScript can improve code quality and maintainability, and provide tips for integrating it into existing codebases. Whether you’re new to TypeScript or looking to deepen your understanding, this guide will help you write safer, more robust code and take advantage of modern development tools and workflows.",
        author: "John Smith",
        date: "2024-05-28",
      },
      {
        id: 3,
        title: "Styling with Tailwind CSS",
        summary: "Tips and tricks for rapid UI development with Tailwind CSS. Discover how utility-first classes can speed up your workflow, keep your styles consistent, and make your codebase easier to maintain. This article covers the basics of configuring Tailwind, customizing your design system, and using advanced features like responsive design and dark mode. We’ll also share strategies for organizing your components and avoiding common pitfalls. Whether you’re building a small project or a large application, these insights will help you create beautiful, responsive interfaces efficiently.",
        author: "Alex Lee",
        date: "2024-05-20",
      },
    ];
    setBlogs(dummyBlogs);
  }, []);

  return (
    <div className="mx-4 p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome to Home</h1>
        <p className="text-gray-600 text-lg">Get started, join our community, or visit our website.</p>
      </header>
      <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {/* Get Started Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Get Started</h2>
          <p className="text-gray-600 mb-4 text-center">
            Learn how to begin your journey with our platform. Find guides, documentation, and resources to help you get up and running quickly.
          </p>
          <a
            href="#get-started"
            className="inline-block px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors font-medium"
          >
            Get Started
          </a>
        </div>
        {/* Community Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Community</h2>
          <p className="text-gray-600 mb-4 text-center">
            Connect with other users, ask questions, and share your experiences. Join our vibrant community to learn and grow together.
          </p>
          <a
            href="#community"
            className="inline-block px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition-colors font-medium"
          >
            Join Community
          </a>
        </div>
        {/* Visit Website Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Visit Website</h2>
          <p className="text-gray-600 mb-4 text-center">
            Explore our main website for more information, updates, and additional resources about our products and services.
          </p>
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors font-medium"
          >
            Visit Website
          </a>
        </div>
      </section>
      <main>
        <Blogs blogs={blogs} />
      </main>
      <footer className="text-center mt-8">
        <p>&copy; {new Date().getFullYear()} My Blog</p>
      </footer>
    </div>
  );
};

export default Home;