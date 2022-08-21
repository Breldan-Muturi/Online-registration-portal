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
import { useDispatch, useSelector } from "react-redux";
import { UploadPreview } from "../../Custom";
import {
  removePaymentAttachment,
  addPaymentAttachment,
} from "../../features/payment/paymentFormSlice";

const AttachmentList = () => {
  const dispatch = useDispatch();
  const { dense } = useSelector((state) => state.applicationTable);
  const { paymentAttachments } = useSelector((state) => state.paymentForm);
  const [paymentPage, setPaymentPage] = useState(1);

  const handleImageUpload = (e) => {
    [...e.target.files].forEach((file) => {
      const object = {
        name: file.name,
        size: file.size,
      };
      dispatch(
        addPaymentAttachment({
          data: JSON.stringify(object),
          url: URL.createObjectURL(file),
        })
      );
      setPaymentPage(paymentAttachments.length / 3);
    });
  };

  let content;

  if (paymentAttachments.length > 0) {
    content = (
      <>
        <List dense={dense}>
          {paymentAttachments
            .slice((paymentPage - 1) * 3, (paymentPage - 1) * 3 + 3)
            .map((mappedAttachment, index) => {
              const { data, url } = mappedAttachment;
              const file = JSON.parse(data);
              return (
                <React.Fragment key={index}>
                  <ListItem
                    secondaryAction={
                      <>
                        <Tooltip arrow title="Inspect Attachment">
                          <IconButton
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
                              dispatch(
                                removePaymentAttachment(mappedAttachment)
                              );
                              setPaymentPage(paymentAttachments.length / 3);
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
          count={Math.ceil(paymentAttachments.length / 3)}
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
