async function getArticles() {
  const res = await fetch("http://localhost:1337/api/articles?populate=*", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  return res.json();
}

export default async function Home() {
  const articles = await getArticles();

  return (
    <main className="min-h-screen bg-black-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        📰 Articles
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.data.map((item) => {
          
          // ✅ FIXED IMAGE
          const image =
            item.cover?.data?.attributes?.url
              ? `http://localhost:1337${item.cover.data.attributes.url}`
              : null;

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {image && (
                <img
                  src={image}
                  alt="cover"
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">
                <h2 className="text-xl font-semibold">
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