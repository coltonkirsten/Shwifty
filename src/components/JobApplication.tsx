import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";

import { Authenticator } from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { generateClient } from "aws-amplify/data";
import { Schema } from "../../amplify/data/resource";
import { uploadData } from 'aws-amplify/storage';

const client = generateClient<Schema>();

interface Job {
  title: string;
  description?: string;
  longdescription?: string;
}

function JobApplication() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthenticator((context) => [context.user]); // Use the hook to get the user
  const { job } = (location.state as { job: Job }) || { job: {} };
  const user_email = String(user.signInDetails?.loginId);

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    reason: string;
    resume: File | null;
  }>({
    name: "",
    email: user_email || "", // Prepopulate with the signed-up email
    phone: "",
    reason: "",
    resume: null,
  });
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setUnsavedChanges(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({
      ...prevData,
      resume: file,
    }));
    setUnsavedChanges(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Upload the resume to S3
      if (formData.resume) {
        uploadData({
          path: `user/${user.signInDetails?.loginId}/${formData.resume.name}`,
          // path: ({identityId}) => `private/${identityId}/${formData.resume!.name}`,
          data: formData.resume,
          options: {
            bucket: 'shwifty-resumes',
          },
        });
      }

      const applicationData = {
        jobTitle: job.title || "",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        reason: formData.reason,
        resumeFileName: `user/${user.signInDetails?.loginId}/${formData.resume?.name || ""}`, // Update to match S3 path
        // Include other fields if needed
      };

      const { data, errors } = await client.models.Applications.create(
        applicationData
      );
      console.log(data);
      console.log(errors);

      // Redirect after successful submission
      navigate("/applications");
    } catch (error: any) {
      console.error("Error submitting application:", error);
      alert(
        `Error submitting application: ${error.message || "Unknown error"}`
      );
    }
  };

  const triggerFileInput = () => {
    document.getElementById("resume-upload")?.click();
  };

  const handleExit = () => {
    if (unsavedChanges) {
      setExitDialogOpen(true);
    } else {
      navigate("/jobs");
    }
  };

  const confirmExit = () => {
    setExitDialogOpen(false);
    navigate("/jobs");
  };

  const cancelExit = () => {
    setExitDialogOpen(false);
  };

  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Apply for {job.title || "this Job"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {job.description ||
            "Fill out the application form below to join our team."}
        </Typography>
      </Box>
      {/* Grid container for two-column layout */}
      <Grid container spacing={4}   sx={{
    minHeight: "70vh", // Adjust to fit the viewport minus header/footer height
    alignItems: "stretch",
  }}>
        {/* Left Column: Application Form */}
        <Grid item xs={12} md={6}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              variant="outlined"
              required
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              variant="outlined"
              type="email"
              required
              fullWidth
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              variant="outlined"
              required
              fullWidth
            />
            <TextField
              label="Why are you a good fit for this job?"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              variant="outlined"
              multiline
              rows={4}
              required
              fullWidth
            />
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button variant="outlined" onClick={triggerFileInput}>
                {formData.resume ? formData.resume.name : "Upload Resume"}
              </Button>
              <input
                id="resume-upload"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                style={{ display: "none" }}
                required
              />
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button variant="contained" color="primary" type="submit">
                Submit Application
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleExit}>
                Cancel
              </Button>
            </Stack>
          </Box>
        </Grid>
        {/* Right Column: Job Long Description */}
        <Grid item xs={12} md={6}>
            <Box
                sx={{
                maxWidth: 600,
                mx: "auto",
                textAlign: "left",
                maxHeight: "65vh", // Matches the form's height (adjust as needed)
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: 2,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography
                variant="body1"
                component="div"
                dangerouslySetInnerHTML={{
                    __html: job.longdescription || "No further details provided.",
                }}
                />
            </Box>
        </Grid>
      </Grid>

      {/* Exit Confirmation Dialog (unchanged) */}
      <Dialog
        open={exitDialogOpen}
        onClose={cancelExit}
        aria-labelledby="exit-dialog-title"
        aria-describedby="exit-dialog-description"
      >
        <DialogTitle id="exit-dialog-title">
          Are you sure you want to exit?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="exit-dialog-description">
            You have unsaved changes. Are you sure you want to exit without
            saving?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelExit} color="primary">
            No, Stay
          </Button>
          <Button onClick={confirmExit} color="error" autoFocus>
            Yes, Exit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default function JobApplicationWithAuth() {
  return (
    <Authenticator>
      <JobApplication />
    </Authenticator>
  );
}