export default function PageHeader({ title, breadcrumb, children }) {
  const renderBreadcrumb = () => {
    if (Array.isArray(breadcrumb)) {
      return breadcrumb.join(" / ");
    }

    return breadcrumb;
  };

  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">{title}</h1>
        <p className="mt-2 text-gray-500">{renderBreadcrumb()}</p>
      </div>

      <div>{children}</div>
    </div>
  );
}