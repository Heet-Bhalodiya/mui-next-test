export default async function Dummy2({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  await params; // Consume params to avoid warnings

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dummy Page 2</h1>
      <p>This is dummy page 2.</p>
    </main>
  );
}
