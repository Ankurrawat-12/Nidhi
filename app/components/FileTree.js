"use client";
import { useState, useEffect } from "react";
import useFileStore from "../context/FileContext";
import { useDrop } from "react-dnd";
import DraggableFile from "./DraggableFile";
import { Breadcrumbs, Container, Paper, List, Link, Button , TextField} from "@mui/material";

export default function FileTree() {
    const { files, fetchFiles, createFile, moveFile, currentFolderId, setCurrentFolder } = useFileStore();
    const [newFileName, setNewFileName] = useState("");
    const [fileType, setFileType] = useState("folder");
    const [path, setPath] = useState([{ id: null, name: "Home" }]);

    useEffect(() => {
        fetchFiles();
    }, []);

    // Filter files based on the current folder
    const visibleFiles = files.filter(file => file.parentId === (currentFolderId === "Home"?null:currentFolderId));

    // Navigate inside a folder
    const navigateToFolder = (folderId, folderName) => {
        if (!folderId) {
            console.error("Tried to navigate to a null folderId");
            return;
        }

        setCurrentFolder(folderId);
        setPath([...path, { id: folderId, name: folderName }]);
    };

    // Drag & Drop target (for folders)
    const [, drop] = useDrop({
        accept: "FILE",
        drop: async (item, monitor) => {
            const dropTarget = monitor.getDropResult(); // Get the target folder details
            console.log("Dropped item:", item);
            console.log("Drop target:", dropTarget);

            if (!dropTarget || !dropTarget.folderId) {
                console.error("Invalid drop target: folderId is null");
                return;
            }

            if (item.id !== dropTarget.folderId) {
                await moveFile(item.id, dropTarget.folderId);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    // Create a new file or folder
    const handleCreateFile = () => {
        if (newFileName.trim()) {
            let fileName = newFileName.trim();

            // Ensure files have an extension
            if (fileType === "file" && !fileName.includes(".")) {
                fileName += ".txt"; // Default extension
            }

            createFile(fileName, fileType, currentFolderId);
            setNewFileName("");
        }
    };


    // Navigate by clicking breadcrumb links
    const navigateTo = (index) => {
        const newPath = path.slice(0, index + 1);
        setPath(newPath);
        setCurrentFolder(newPath[newPath.length - 1].id || "root");
    };


    return (
        <Container maxWidth="md" className="mt-[20px]">
            <Paper elevation={3} className="p-[20px] border rounded-lg">

                {/* Breadcrumbs for navigation */}
                <Breadcrumbs aria-label="breadcrumb" className="mb-[20px] ">
                    {path.map((folder, index) => (
                        <Link
                            key={folder.id || "home"}
                            color={index === path.length - 1 ? 'textPrimary' : 'inherit'}
                            onClick={() => navigateTo(index)}
                            style={{ cursor: 'pointer'}}
                        >
                            {folder.name}
                        </Link>
                    ))}
                </Breadcrumbs>

                {/* File Creation */}
                <div className="flex gap-[10px] mb-[20px] mt-2" >
                    <TextField
                        label="New File/Folder Name"
                        variant="outlined"
                        size="small"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                    />
                    <Button variant={fileType === "folder" ? "contained" : "outlined"} onClick={() => setFileType("folder")}>📁 Folder</Button>
                    <Button variant={fileType === "file" ? "contained" : "outlined"} onClick={() => setFileType("file")}>📄 File</Button>
                    <Button variant="contained" color="primary" onClick={handleCreateFile}>Create</Button>
                </div>
                <List>
                    {visibleFiles.map((file) => (
                        <DraggableFile
                            key={file._id}
                            file={file}
                            navigateToFolder={navigateToFolder}
                            moveFile={moveFile}
                        />
                    ))}
                </List>
            </Paper>
        </Container>
    );
}

