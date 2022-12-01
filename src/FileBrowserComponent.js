import React, { Component } from "react";
import Link from "./breadcrumb/Link";

class FileBrowserComponent extends Component {
  render() {
    const { listContent = [], fileType } = this.props;
    console.log(listContent, fileType);

    if (!fileType) return null;
    return (
      <div>
        {fileType === "dir" ? (
          <React.Fragment>
            <h3>Contents of the current Directory are - </h3>
            <div className="menu-list">
              {listContent.map((pathItem) => (
                <Link
                  type="breadcrumb"
                  to={pathItem.path}
                  onClick={this.props.getContents}
                >
                  {pathItem.name}
                </Link>
              ))}
            </div>
          </React.Fragment>
        ) : (
          <h3>{`File Name is :${listContent[0].name}`}</h3>
        )}
      </div>
    );
  }
}

export default FileBrowserComponent;
