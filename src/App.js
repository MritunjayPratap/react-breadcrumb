import React, { Component } from "react";
import "./styles.css";
import { Link, Route, Switch } from "react-router-dom";
import Breadcrumbs from "./breadcrumb";
import FileBrowserComponent from "./FileBrowserComponent";
import mockData from "./folder-mock.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listContent: [],
      currentPath: "",
      currentFileType: ""
    };
  }

  componentDidMount() {
    this.getContents("");
  }

  getContents = (path) => {
    let pathInState = this.state.currentPath;
    let currpath = path;
    if (!pathInState.includes(path)) {
      currpath = pathInState + path;
    }
    let { result, fileType } = this.fetchContent(currpath);
    this.setState({
      listContent: result,
      currentPath: currpath,
      currentFileType: fileType
    });
  };

  fetchContent = (path) => {
    if (path === "") {
      return this.getPathContent(mockData);
    } else {
      let pathObj = this.getContentByKey(mockData, path.split("/").slice(1));
      return this.getPathContent(pathObj);
    }
  };

  getPathContent = (obj) => {
    let children = obj.children;
    let result = [];
    let fileType = obj.type;
    if (obj.type === "dir") {
      Object.keys(children).reduce((acc, val) => {
        let tmp = {};
        tmp.path = `/${val}`;
        tmp.type = children[val].type;
        tmp.name = val;
        result.push(tmp);
        return result;
      }, result);
    } else if (obj.type === "file") {
      result.push(obj);
    }
    return { result, fileType };
  };

  getContentByKey = (obj, keys) => {
    let result = obj;
    if (obj === null) return null;
    for (let key of keys) {
      if (result.children[key]) {
        result =
          result.children[key].type === "dir"
            ? result.children[key]
            : { name: key, ...result.children[key] };
      }
    }
    return result;
  };

  render() {
    return (
      <div className="App">
        <Breadcrumbs
          breadcrumbPath={this.state.currentPath}
          getContents={this.getContents}
        />
        <div className="content">
          <Switch>
            <Route
              path="/"
              component={(props) => (
                <FileBrowserComponent
                  listContent={this.state.listContent}
                  getContents={this.getContents}
                  fileType={this.state.currentFileType}
                  {...props}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
