import React, { Component } from "react";
import { Table } from "react-bootstrap";
import UploadService from "../services/upload-files.service";

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",

      fileInfos: [],
    };
  }

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        return UploadService.getFiles();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  render() {
    const {
      selectedFiles,
      fileInfos,
    } = this.state;

    return (
      <center>
        <h1 class="mb-3 text-light">Files Upload</h1>

        <label className="btn btn-default text-light">
          <input type="file" onChange={this.selectFile} />
        </label>

        <button
          className="btn btn-warning"
          disabled={!selectedFiles}
          onClick={this.upload}
        >
          Upload
        </button>

        <h1 class="mt-5 mb-3 text-light">Files List</h1>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Type</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {fileInfos &&
              fileInfos.map((file, index) => (
                <tr>
                  <td>{index}</td>
                  <td><a href={file.fileDownloadUri}>{file.fileName}</a></td>
                  <td>{file.fileType}</td>
                  <td>{file.size} mb</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </center>
    );
  }
}
