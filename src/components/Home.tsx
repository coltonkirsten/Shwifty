// import React from 'react';
import { Container, Typography, Box, TextField, Button, Grid, Card, CardContent } from '@mui/material';

function Home() {
  return (
    <Container>
      {/* Welcome Section */}
      <Box sx={{ textAlign: 'center', mt: 6, mb: 2, bgcolor: '#f5f5f5', py: 6, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Shwifty Automotive
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'text.secondary', maxWidth: '700px', mx: 'auto' }}>
          Revolutionary Mobile Repair at Your Fingertips
        </Typography>
      </Box>

      {/* About Us Section */}
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                About Us
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                Shwifty Automotive is dedicated to providing top-notch mobile vehicle repair services. Our mission is to make vehicle maintenance and repair as convenient and hassle-free as possible. With our easy-to-use app, you can order repairs right from your phone and have our expert mechanics come to you.
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mt: 2 }}>
                We believe that quality and convenience should go hand in hand. That’s why we bring advanced diagnostic tools, skilled professionals, and high-quality parts directly to your location. Whether you're at home, work, or on the go, our team is committed to delivering exceptional service with transparency and integrity.
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mt: 2 }}>
                From routine maintenance like oil changes and brake inspections to more complex repairs, Shwifty Automotive has you covered. Our goal is to redefine how vehicle care is done, saving you time and effort while ensuring your vehicle remains in peak condition. Trust us to keep you moving without the stress of traditional repair shops.
                </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <img
              src="../public/image.png"
              alt="Mobile Repair"
              style={{ maxWidth: '100%', borderRadius: '8px', boxShadow: '0 3px 5px rgba(0,0,0,0.4)' }}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Email Subscription Form */}
      <Box sx={{ mt: 5, textAlign: 'center', py: 6, px: 3, bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          Stay Updated!
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto' }}>
          Enter your email below to receive updates and exclusive offers.
        </Typography>
        <Box component="form" sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <TextField
            label="Email Address"
            variant="outlined"
            type="email"
            required
            sx={{ width: '300px' }}
          />
          <Button variant="contained" color="primary" sx={{ px: 4, py: 1.5, fontSize: '1rem' }}>
            Subscribe
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;