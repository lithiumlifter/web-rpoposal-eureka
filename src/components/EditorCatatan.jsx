import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditorCatatan = ({ value, onChange, readOnly }) => {
  return (
    <div className="card mt-3">
      <div className="card-header text-start">F. CATATAN</div>
      <div className="card-body">
        <div className="form-group row">
          <div className="col-12">
                <CKEditor
                editor={ClassicEditor}
                data={value}
                disabled={readOnly}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
                />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorCatatan;
