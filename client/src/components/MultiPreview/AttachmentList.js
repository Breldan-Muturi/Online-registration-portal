import React, { useState } from "react";
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
import UploadPreview from "../../Custom/UploadPreview";
import { useSelector } from "react-redux";

const AttachmentList = ({ attachments, setAttachments }) => {
  const files = Array.from(attachments);
  const { dense } = useSelector((state) => state.applicationTable);
  const [paymentPage, setPaymentPage] = useState(1);

  const handleImageUpload = async (e) => {
    await setAttachments(e.target.files);
    setPaymentPage(files.length / 3);
  };

  let content;

  if (files.length) {
    content = (
      <>
        <List dense={dense}>
          {files
            .slice((paymentPage - 1) * 3, (paymentPage - 1) * 3 + 3)
            .map((mappedAttachment, index) => {
              const file = {
                name: mappedAttachment.name,
                size: mappedAttachment.size,
              };
              const url = URL.createObjectURL(mappedAttachment);
              return (
                <React.Fragment key={index}>
                  <ListItem
                    secondaryAction={
                      <>
                        <Tooltip arrow title="Inspect Attachment">
                          <IconButton
                            component="a"
                            href={url}
                            target="_blank"
                            edge="end"
                            color="primary"
                            aria-labelledby="inspect-attachment"
                          >
                            <LaunchIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip arrow title="Delete Attachment">
                          <IconButton
                            edge="end"
                            color="error"
                            aria-labelledby="delete-attachment"
                            onClick={() => {
                              setAttachments(
                                files.filter(
                                  (file) => file !== mappedAttachment
                                )
                              );
                              setPaymentPage(files.length / 3);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    }
                  >
                    <UploadPreview
                      size={dense ? "small" : null}
                      src={url}
                      alt={`${file.name}`}
                    >
                      {<UploadFileIcon />}
                    </UploadPreview>
                    <ListItemText
                      primary={
                        file.name.length > 15
                          ? `${file.name.substring(0, 15)}...`
                          : file.name
                      }
                      secondary={`${(file.size / 1000)
                        .toFixed(2)
                        .toString()} KBs`}
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              );
            })}
        </List>
        <Pagination
          count={Math.ceil(files.length / 3)}
          onChange={(_, value) => setPaymentPage(value)}
        />
      </>
    );
  }
  return (
    <>
      <Button
        component="label"
        color="primary"
        size="small"
        startIcon={<UploadFileIcon />}
      >
        payment attachments
        <input multiple type="file" hidden onChange={handleImageUpload} />
      </Button>
      {content}
    </>
  );
};

export default AttachmentList;
