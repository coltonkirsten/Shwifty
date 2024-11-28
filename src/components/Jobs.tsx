// src/components/Jobs.tsx
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface Job {
  title: string;
  description: string;
  longdescription: string;
}

const jobs: Job[] = [
    {
      title: "Mobile Mechanic",
      description:
        "Travel to customers locations to perform vehicle diagnostics and repairs.",
      longdescription: `
        <p><strong>Job Type:</strong> Full-Time/Part-Time</p>
        <p><strong>Job Description:</strong></p>
        <p>We are seeking a skilled and reliable Mobile Automotive Technician to join our team. The ideal candidate will possess strong diagnostic abilities and a passion for providing exceptional service to our customers in a mobile environment. You will be responsible for performing a range of automotive repairs and maintenance services directly at customer locations.</p>
        <p><strong>Key Responsibilities:</strong></p>
        <ul>
          <li>Diagnose and repair vehicle issues, including engine, transmission, brake, and electrical systems.</li>
          <li>Perform routine maintenance services such as oil changes, tire rotations, and brake inspections.</li>
          <li>Use diagnostic equipment and tools to identify and troubleshoot vehicle problems.</li>
          <li>Maintain accurate records of services performed and parts used.</li>
          <li>Communicate effectively with customers about services needed, repairs, and costs.</li>
          <li>Ensure all safety protocols and standards are followed.</li>
          <li>Stay current with automotive technology and repair techniques.</li>
        </ul>
        <p><strong>Qualifications:</strong></p>
        <ul>
          <li>High school diploma or equivalent; automotive technician certification preferred.</li>
          <li>Proven experience as an automotive technician or mechanic.</li>
          <li>Strong knowledge of automotive systems and repair techniques.</li>
          <li>Valid driver’s license and clean driving record.</li>
          <li>Excellent problem-solving skills and attention to detail.</li>
          <li>Ability to work independently and manage time effectively.</li>
          <li>Strong communication and customer service skills.</li>
        </ul>
        <p><strong>Benefits:</strong></p>
        <ul>
          <li>Competitive salary and commission structure.</li>
          <li>Flexible working hours.</li>
          <li>Company-provided tools and equipment.</li>
          <li>Opportunities for ongoing training and development.</li>
        </ul>
      `,
    },
  ];

function Jobs() {
  const navigate = useNavigate();

  const handleApplyClick = (job: Job) => {
    navigate("/apply", { state: { job } });
  };

  const handleViewApplications = () => {
    navigate("/applications");
  };

  return (
    <Container>
      {/* Job Cards */}
      <Stack spacing={4} mt={4}>
        {jobs.map((job, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              borderRadius: 2,
              boxShadow: 3,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" component="h2" sx={{ fontWeight: "bold", textAlign: "left"}}>
                {job.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2, lineHeight: 1.6}}
              >
                {job.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
              <Button
                size="medium"
                color="primary"
                variant="contained"
                sx={{ fontWeight: "bold" }}
                onClick={() => handleApplyClick(job)}
              >
                Apply
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>

      {/* Action Buttons */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ mt: 10, mr: 2 }}
          onClick={handleViewApplications}
        >
          View Your Applications
        </Button>
      </Box>
    </Container>
  );
}

export default Jobs;