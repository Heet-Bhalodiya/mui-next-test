export default async function Dummy3({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  await params; // Consume params to avoid warnings

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dummy Page 3</h1>
      <p>This is dummy page 3.</p>
    </main>
  );
}
