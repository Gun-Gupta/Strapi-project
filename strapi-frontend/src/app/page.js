async function getArticles() {
  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "https://fruitful-sharing-78c4f0fdd9.strapiapp.com";

  try {
    const headers = {};
    if (process.env.STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`;
    }

    const res = await fetch(`${baseUrl}/api/articles?populate=*`, {
      cache: "no-store",
      headers,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Fetch failed:", res.status, res.statusText, errorText);
      return { data: [] };
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    return { data: [] };
  }
}

export default async function Home() {
  const articles = await getArticles();

  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "https://fruitful-sharing-78c4f0fdd9.strapiapp.com";

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-10">📰 Articles (Live)</h1>

      {(!articles.data || articles.data.length === 0) && (
        <p className="text-center text-gray-500">No articles found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.data?.map((item) => {
          const imageUrl = item.cover?.url
            ? item.cover.url.startsWith("http")
              ? item.cover.url
              : `${baseUrl}${item.cover.url}`
            : null;

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={item.title || "Article image"}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">
                <h2 className="text-xl font-semibold text-black">
                  {item.title}
                </h2>

                <p className="text-gray-600 text-sm mt-2">
                  {item.description || "No description available"}
                </p>

                <button className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                  Read More →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}