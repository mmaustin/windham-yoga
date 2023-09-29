import {Box, Grid, Button, TextField, useTheme, Typography} from '@mui/material';
import customFetch from '../../utils/customFetch';
import getFormValues from '../../utils/getFormValues';
import { shades } from '../../theme';

function MessageForm() {

  const {palette: {info }} = useTheme();

  const onSubmit = async (e) => {
    e.preventDefault();

    const {isEmpty, instanceData} = getFormValues(e.currentTarget);
    console.log(e.currentTarget);
     
    if(isEmpty) {
      console.log('please provide all values');
      return;
    }
    
    try {
      //if async data fetch fells, the error below is an axios error
      const {data} = await customFetch.post('/messages', instanceData);
      console.log(data.success);
    } catch (error) {
      //an axios error whose message can be overwritten
      if(error){
        //error.message = "coocoo for cocoa puffs!"
        console.log(error.message);
      }
    }
  }

  return (
    <Box width='100%' m='10px auto' bgcolor={info.light} sx={{border: 2 , borderColor: 'black', borderRadius: '16px'}}>
      <Box>
        <Box m='30px auto'>
          <Box>
            <Box
              sx={{
                marginTop: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography sx={{m: '15px 0'}} color={shades.secondary[500]} variant='h3' fontWeight='bold'>Send Us A Message</Typography>
              <Box m='10px' component="form" onSubmit={onSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      // autoComplete="given-name"
                      name="messenger"
                      required
                      fullWidth
                      id="messenger"
                      label="Name"
                      autoFocus
                      type='text'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      required
                      fullWidth
                      name="phoneNumber"
                      label="Phone Number"
                      type="text"
                      id="phoneNumber"
                      // autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      required
                      fullWidth
                      name="content"
                      label="Message"
                      multiline
                      rows={4}
                      id="content"
                      // autoComplete="new-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Send
                </Button>
              </Box>
            </Box>              
          </Box>
        </Box>
      </Box>      
    </Box>
  )
}
export default MessageForm;