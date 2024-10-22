import React, { Dispatch, RefObject, SetStateAction, useCallback, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  CircularProgress,
  useTheme
} from "@mui/material";
import { tokens } from "../theme.ts";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";

interface Prop {
  selectedFiles: File[] | null;
  setSelectedFiles: Dispatch<SetStateAction<File[]>>;
  containerRef: RefObject<HTMLDivElement>;
  accepted: string[];
  maxSizeInMB: number;
  maxFiles: number;
}

function DragDropFileUpload({
  selectedFiles,
  setSelectedFiles,
  containerRef,
  accepted,
  maxSizeInMB,
  maxFiles,
}: Prop) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const validateFiles = useCallback((files: File[]) => {
    const errors: string[] = [];
  
    for (const file of files) {
      const fileType = file.type;
      const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB
  
      // Check file type
      if (!accepted.includes(fileType)) {
        errors.push(`File type ${fileType} is not accepted.`);
      }
  
      // Check file size
      if (fileSizeMB > maxSizeInMB) {
        errors.push(`File ${file.name} exceeds the maximum size of ${maxSizeInMB}MB.`);
      }
    }
  
    return errors;
  }, [accepted, maxSizeInMB]);

  const handleFileChange = useCallback((files: File[]) => {
    setLoading(true);
  
    // validate files
    const validationErrors = validateFiles(files);
    if (validationErrors.length > 0) {
      toast.error(validationErrors.join(' '));
      setLoading(false);
      return;
    }

    const newFiles = Array.from(files);
  
    // Provide a default empty array if selectedFiles is null
    const currentSelectedFiles = selectedFiles || [];
  
    if ((currentSelectedFiles.length + newFiles.length) > maxFiles) {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: "smooth" });
      }
      toast.error(`You can only upload a maximum of ${maxFiles} images.`);
      setLoading(false);
      return;
    }
  
    const updatedFiles = [...currentSelectedFiles, ...newFiles];
    setSelectedFiles(updatedFiles);
  
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setUploadedFiles((prevPreviews) => [...prevPreviews, ...newPreviews]);
    setLoading(false);
  }, [maxFiles, selectedFiles, setSelectedFiles, containerRef, validateFiles]);

  const handleChange = useCallback((event) => {
    const newFiles: File[] = Array.from(event.target.files);

    if (selectedFiles && selectedFiles?.length + newFiles.length > maxFiles) {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: "smooth" });
      }
      toast.error(`You can only upload a maximum of ${maxFiles} images.`);
      return;
    }

    handleFileChange(newFiles);
  }, [maxFiles, selectedFiles, handleFileChange, containerRef]);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    setDragOver(false);
    const files = event.dataTransfer.files;
    if (files) {
      handleFileChange(files);
    }
  }, [handleFileChange]);

  return (
    <Box>
      <Paper
        variant="outlined"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: dragOver ? "2px dashed #000" : "2px dashed #aaa",
          padding: 20,
          textAlign: "center",
          cursor: "pointer",
          background: dragOver ? "#eee" : "#fafafa",
          position: "relative",
        }}
      >
        <input
          type="file"
          accept="image/jpg, image/png, image/jpeg"
          multiple
          hidden
          id="raised-button-file"
          onChange={handleChange}
        />
        <label htmlFor="raised-button-file">
          <Box display="flex" flexDirection="column" alignItems="center">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <CloudUploadIcon style={{ fontSize: 60 }} />
            </IconButton>
            <Typography color={colors.black}>
              Drag and drop files here or click to select files
            </Typography>
          </Box>
        </label>
        {loading && (
          <CircularProgress
            size={24}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Paper>
      {uploadedFiles.length > 0 && (
        <Grid container spacing={2} style={{ marginTop: 16 }}>
          {uploadedFiles.map((file, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                component="img"
                src={file}
                alt={`Preview ${index + 1}`}
                sx={{ width: "100%", height: "auto" }}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default DragDropFileUpload;
