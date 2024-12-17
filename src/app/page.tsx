const mockURLs = [
  "https://utfs.io/f/Oym9FJnXJ3flmYqJuKUR7C4tOWfbD6Nu5sVklgMaXFUcJpnZ",
  "https://utfs.io/f/Oym9FJnXJ3flmYqJuKUR7C4tOWfbD6Nu5sVklgMaXFUcJpnZ",
  "https://utfs.io/f/Oym9FJnXJ3flL3szGduXsbcTmlVKthHg7rUiwnuN2ojApxzJ",
];

const mockImages = mockURLs.map((url, index) => ({
  id: index,
  url,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {mockImages.map((img) => (
          <div key={img.id} className="w-48">
            <img src={img.url} alt="images" />
          </div>
        ))}
      </div>
    </main>
  );
}
