export default async function ApplicationsClosed() {
  return (
    <main className="h-screen w-full">
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="flex scale-90 transform flex-col items-center px-4 text-center sm:scale-100">
          <h1 className="font-hexaframe text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Applications are Closed
          </h1>

          <p className="mt-4 text-xl font-semibold text-gray-900 sm:text-2xl">
            Applications for Hack the Burgh 2026 open on November 1–2, 2025
          </p>

          <p className="mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            Thank you for your patience, we’re excited to see your applications
            when the process begins!
          </p>
        </div>
      </div>
    </main>
  );
}
