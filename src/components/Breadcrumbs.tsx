import { Link, useLocation } from "react-router";
import { formatLabel } from "../utils/breadcrumbUtils";

export default function Breadcrumbs() {
  const location = useLocation();

  

  const segments = location.pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const pathname = "/" + segments.slice(0, index + 1).join("/");
    return {
      breadcrumb: formatLabel(segment),
      pathname,
    };
  });

  return (
    <nav className="flex items-center text-gray-500 space-x-2">
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        const isFirst = index === 0;
        return (
          <span key={crumb.pathname} className="flex items-center space-x-2">
            {!isFirst && <span>/</span>}
            {isLast ? (
              <span className="font-medium text-gray-700">
                {crumb.breadcrumb}
              </span>
            ) : (
              <Link to={crumb.pathname} className="hover:text-blue-600">
                {crumb.breadcrumb}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
