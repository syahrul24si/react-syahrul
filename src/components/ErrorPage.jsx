export default function ErrorPage({ errorCode, description, image }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <img
        src={image}
        alt={`Error ${errorCode}`}
        className="mb-6 w-72 max-w-full"
      />
      <h1 className="text-5xl font-bold text-slate-900">{errorCode}</h1>
      <p className="mt-4 text-lg text-gray-500">{description}</p>
    </div>
  );
}