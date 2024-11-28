import { Box, Typography, Link, Grid } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ bgcolor: '#f5f5f5', p: 6, mt: 8 }} component="footer">
      {/* Contact Info Section */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" align="center" gutterBottom>
            Contact Us
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Email: <Link href="mailto:info@shwiftyauto.com">info@shwiftyauto.com</Link>
            <br />
            Phone: <Link href="tel:1234567890">(123) 456-7890</Link>
          </Typography>
        </Grid>

        {/* Navigation Links Section */}
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Link href="/" color="inherit" underline="hover">
              Home
            </Link>
            <Link href="/jobs" color="inherit" underline="hover">
              Jobs
            </Link>
          </Box>
        </Grid>
      </Grid>

      {/* Copyright Section */}
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 4 }}
      >
        {'© '}
        {new Date().getFullYear()}{' '}
        <Link color="inherit" href="https://shwiftyauto.com/">
          Shwifty Automotive
        </Link>
        {'. All rights reserved.'}
      </Typography>
    </Box>
  );
}

export default Footer;