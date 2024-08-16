'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography, Button, Box, Grid } from "@mui/material";
import Link from "next/link";
import Head from "next/head";

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }
  }

  return (
    <Container maxWidth='100vw'>
      <Head>
        <title>AI.Flashcards</title>
        <meta name='description' content='Create flaschards from your text' />
      </Head>

      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' style={{flexGrow: 1}}>AI.Flashcards</Typography>
          <SignedOut>
            <Button color='inherit' href='/sign-in'>Login</Button>
            <Button color="inherit" href='/sign-up'>Sign up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{
        textAlign: 'center',
        my: 4,
      }}>
        <Typography variant='h2' gutterBottom>Welcome to AI.Flashcards!</Typography>
        <Typography variant='h5' gutterBottom>
          {' '}
          The easiest way to create flaschards from your own text!
        </Typography>
        <Button variant='contained' color='primary' sx={{mt: 2}}>
          Get Started
        </Button>
      </Box>
      <Box sx={{my: 6}}>
        <Typography variant='h4' textAlign='center' gutterBottom sx={{my:4}}>Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant='h6' gutterBottom>Easy Text Input and Fast Generation</Typography>       
            <Typography>
              {' '}
              Simply input your text and allow our software to do the rest for you! Creating flashcards has never been easier.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant='h6' gutterBottom>Detailed and Clear</Typography>       
            <Typography>
              {' '}
              Our product provides comprehensive explanations that are relevant to your topic while also maintaining a clear and easy understandable format. 
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant='h6'>Adjustable</Typography>       
            <Typography>
              {' '}
              The flashcard generator is designed to be open to feedback from users and is prepared to adjust its flashcards to help you achieve your learning objective.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{my: 6, textAlign: 'center',}}>
        <Typography variant='h4' gutterBottom sx={{mb:4}}>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p:3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2
            }}
            >
              <Typography variant='h5' gutterBottom>Basic</Typography>      
              <Typography variant='h6' gutterBottom>$5 / month</Typography> 
              <Typography>
                {' '}
                Access to basic flaschard features and limited storage.
              </Typography>
              <Button variant='contained' color='primary' sx={{mt: 2}}>Choose Basic</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
          <Box sx={{
              p:3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2
            }}
            >
              <Typography variant='h5' gutterBottom>Pro</Typography>      
              <Typography variant='h6' gutterBottom>$10 / month</Typography> 
              <Typography>
                {' '}
                Access to unlimited flashcards and storage.
              </Typography>
              <Button variant='contained' color='primary' onClick={handleSubmit} sx={{mt: 2}}>Choose Pro</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
