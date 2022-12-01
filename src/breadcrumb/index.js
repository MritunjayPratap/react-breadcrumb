import React from "react";
import Link from "./Link";

function getPathTokens(bPath) {
  const paths = ["/"];
  if (bPath === "/") return paths;
  let bpaths = bPath.split("/");
  bpaths.reduce((curr, prev) => {
    const currentPath = `${curr}/${prev}`;
    console.log(currentPath, curr, prev);
    paths.push(currentPath);
    return currentPath;
  });
  return paths;
}

function getBreadCrumbs(currentPath) {
  const paths = getPathTokens(currentPath);
  let result = paths.map((route) => {
    let pathName = route.split("/");
    return {
      path: route,
      name: pathName[pathName.length - 1]
    };
  });
  return result;
}
function breadCrumb(breadcrumb, props) {
  const style = { display: "inline" };
  return (
    <>
      <Link
        type="breadcrumb"
        to={breadcrumb.path}
        style={style}
        onClick={props.getContents}
      >
        {breadcrumb.name}
      </Link>
      {" > "}
    </>
  );
}

function lastBreadCrumb(breadcrumb) {
  return breadcrumb.name;
}

function Breadcrumbs(props) {
  const { breadcrumbPath } = props;
  const pathTokens = getBreadCrumbs(breadcrumbPath || "/") || [];
  return (
    <div>
      {pathTokens.map((breadcrumb, i) => (
        <span>
          {i < pathTokens.length - 1
            ? breadCrumb(breadcrumb, props)
            : lastBreadCrumb(breadcrumb)}
        </span>
      ))}
    </div>
  );
}

export default Breadcrumbs;
