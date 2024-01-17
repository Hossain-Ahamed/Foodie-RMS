import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const Dish_Add_Description = ({contents,setContents,setValue,valueName}) => {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ size: [] }],
            [{ font: [] }],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link",/** "image" */],
            [
                {
                    color: [
                        "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#A52A2A",
                        "#800080", "#008000", "#DC143C", "#00CED1", "#FFD700", "#8B4513", "#9400D3", "#556B2F", "#008080", "#FF6347",
                        "#7CFC00", "#8A2BE2", "#FF4500", "#DA70D6", "#40E0D0", "#8B008B", "#B8860B", "#2F4F4F", "#FF69B4", "#00FA9A",
                        "#4B0082", "#ADFF2F", "#7B68EE", "#FF8C00", "#20B2AA", "#BDB76B", "#191970", "#FFC0CB", "#7FFFD4", "#800000",
                        "#4169E1", "#228B22"
                    ]
                },
                {
                    background: [
                        "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#A52A2A",
                        "#800080", "#008000", "#DC143C", "#00CED1", "#FFD700", "#8B4513", "#9400D3", "#556B2F", "#008080", "#FF6347",
                        "#7CFC00", "#8A2BE2", "#FF4500", "#DA70D6", "#40E0D0", "#8B008B", "#B8860B", "#2F4F4F", "#FF69B4", "#00FA9A",
                        "#4B0082", "#ADFF2F", "#7B68EE", "#FF8C00", "#20B2AA", "#BDB76B", "#191970", "#FFC0CB", "#7FFFD4", "#800000",
                        "#4169E1", "#228B22"
                    ]
                }
            ]

        ]
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "color",
        "image",
        "background",
        "align",
        "size",
        "font"
    ];

 
    const handleProcedureContentChange = (content, delta, source, editor) => {
        setContents(content);
        //let has_attribues = delta.ops[1].attributes || "";
        //console.log(has_attribues);
        //const cursorPosition = e.quill.getSelection().index;
        // this.quill.insertText(cursorPosition, "★");
        //this.quill.setSelection(cursorPosition + 1);
        setValue(valueName,content);
    };

    return (
        <>
            <ReactQuill
              
                theme="snow"

                style={{height:'6rem'}}
                modules={modules}
                formats={formats}
                value={contents}
             
                onChange={handleProcedureContentChange}
            />
        </>
    );
}

export default Dish_Add_Description
