import React from "react";

const PageHeader = ({ title, breadcrumbs }) => {
  return (
    <div className="page-header col-md-4 m-b-10">
      <div className="page-header">
        <h2 className="header-title font-size-25">{title}</h2>
        <div className="header-sub-title">
          <nav className="breadcrumb breadcrumb-dash">
            {breadcrumbs.map((breadcrumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return isLast ? (
                <span key={index} className="breadcrumb-item active">
                  {breadcrumb.label}
                </span>
              ) : (
                <a
                  href={breadcrumb.href}
                  key={index}
                  className="breadcrumb-item"
                >
                  {breadcrumb.icon && (
                    <i className={`${breadcrumb.icon} m-r-5`}></i>
                  )}
                  {breadcrumb.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
