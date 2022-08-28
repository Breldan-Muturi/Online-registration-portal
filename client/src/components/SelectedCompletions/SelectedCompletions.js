import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import { UploadPreview } from "../../Custom";

const SelectedCompletions = ({ evidence, setEvidence }) => {
  const files = Array.from(evidence);
  const [page, setPage] = useState(1);
  const handleUpload = (e) => {
    setEvidence(e.target.files);
    setPage(files.length / 3);
  };
  const handleRemove = (mappedEvidence) => {
    setEvidence(files.filter((file) => file !== mappedEvidence));
    setPage(files.length / 3);
  };

  useEffect(() => {
    let content;
    if (files.length) {
      content = (
        <>
          <List dense>
            {files
              .slice((page - 1) * 3, (page - 1) * 3 + 3)
              .map((mappedEvidence, index) => {
                const name = `${mappedEvidence.name.substring(0, 15)} ${
                  mappedEvidence.name.length > 15 && "..."
                }`;
                const size = `${(mappedEvidence.size / 1000)
                  .toFixed(2)
                  .toString()} KBs`;
                const path = URL.createObjectURL(mappedEvidence);
                return (
                  <React.Fragment key={index}>
                    <ListItem
                      secondaryAction={
                        <>
                          <Tooltip arrow title="Inspect Evidence">
                            <IconButton
                              component="a"
                              href={path}
                              target="_blank"
                              edge="end"
                              color="primary"
                              aria-labelledby="inspect-evidence"
                            >
                              <LaunchIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip arrow title="Delete Evidence">
                            <IconButton
                              edge="end"
                              color="error"
                              aria-labelledby="delete-evidence"
                              onClick={handleRemove(mappedEvidence)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      }
                    >
                      <UploadPreview size="small" src={path} alt={name}>
                        {<UploadFileIcon />}
                      </UploadPreview>
                      <ListItemText primary={name} secondary={size} />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                );
              })}
          </List>
          <Pagination
            count={Math.ceil(files.length / 3)}
            onChange={(_, value) => setPage(value)}
          />
        </>
      );
    }
  }, []);

  return (
    <>
      <Button
        component="label"
        color="primary"
        size="small"
        startIcon={<UploadFileIcon />}
      >
        upload completion evidence
        <input multiple type="file" hidden onChange={handleUpload} />
      </Button>
      {content}
    </>
  );
};

export default SelectedCompletions;
