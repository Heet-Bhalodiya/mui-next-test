import { getDictionary } from '@/get-dictionary';
import { type Locale } from '@/i18n';
import { Metadata } from 'next';

// Define the posts that will be statically generated
const posts = [
  { slug: 'getting-started', title: 'Getting Started', content: 'Learn how to get started with our platform.' },
  { slug: 'advanced-features', title: 'Advanced Features', content: 'Explore advanced features and capabilities.' },
  { slug: 'best-practices', title: 'Best Practices', content: 'Follow these best practices for optimal results.' },
];

// Generate static params for both lang and slug
export async function generateStaticParams() {
  const locales: Locale[] = ['en', 'es', 'fr'];

  // Generate all combinations of locale and slug
  const params = locales.flatMap((lang) =>
    posts.map((post) => ({
      lang,
      slug: post.slug,
    }))
  );

  return params;
}

// Generate metadata for each page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  return {
    title: post?.title || 'Post Not Found',
    description: post?.content || 'This post could not be found.',
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dictionary = await getDictionary(lang as Locale);

  // Find the post by slug
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400">
            The post with slug &quot;{slug}&quot; could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <a
            href={`/${lang}`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← {dictionary.navigation.home}
          </a>
        </div>

        <article className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Slug:</strong> {slug}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Language:</strong> {lang}
            </p>
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {post.content}
          </p>

          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3">Dynamic & Static Routing</h2>
            <p className="mb-4">
              This page demonstrates both dynamic and static routing in Next.js:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Static Generation:</strong> Pre-defined slugs are generated at build time
                using <code>generateStaticParams()</code>
              </li>
              <li>
                <strong>Dynamic Routing:</strong> The page accepts any slug via the <code>[slug]</code> parameter
              </li>
              <li>
                <strong>i18n Support:</strong> Combined with language routing for multi-language support
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Available Posts:</h3>
            <ul className="space-y-2">
              {posts.map((p) => (
                <li key={p.slug}>
                  <a
                    href={`/${lang}/posts/${p.slug}`}
                    className={`text-blue-600 dark:text-blue-400 hover:underline ${p.slug === slug ? 'font-bold' : ''
                      }`}
                  >
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
