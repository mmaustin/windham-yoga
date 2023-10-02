import { Box, Grid, Button, TextField, useTheme, Typography } from '@mui/material';
import customFetch from '../../utils/customFetch';
// import getFormValues from '../../utils/getFormValues';
import { shades } from '../../theme';
import { useState } from 'react';

const initialState = {
  messenger: '',
  email: '',
  phoneNumber: '',
  content: ''
}

function MessageForm() {

  const [values, setValues] = useState(initialState);

  const handleChange = e => setValues({ ...values, [e.target.name]: e.target.value });

  const { palette: { info } } = useTheme();

  const onSubmit = async (e) => {
    e.preventDefault();

    const { messenger, email, phoneNumber, content } = values;
    if (!messenger || !email || !phoneNumber || !content) {
      console.log('Please Add All Values');
      return;
    }

    try {
      //if async data fetch fells, the error below is an axios error
      const { data } = await customFetch.post('/messages', values);
      console.log(data.success);
    } catch (error) {
      //an axios error whose message can be overwritten
      if (error) {
        //error.message = "coocoo for cocoa puffs!"
        console.log(error.message);
      }
    }

    console.log(values);
    setValues({ ...values, messenger: '', email: '', phoneNumber: '', content: '' });

    // const { isEmpty, instanceData } = getFormValues(e.currentTarget);
    // console.log(e.currentTarget);

    // if (isEmpty) {
    //   console.log('please provide all values');
    //   return;
    // }

  }

  return (
    <Box width='100%' m='10px auto' bgcolor={info.light} sx={{ border: 2, borderColor: 'black', borderRadius: '16px' }}>
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
              <Typography sx={{ m: '15px 0' }} color={shades.secondary[500]} variant='h3' fontWeight='bold'>Send Us A Message</Typography>
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
                      value={values.messenger}
                      onChange={e => handleChange(e)}
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
                      value={values.email}
                      onChange={e => handleChange(e)}
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
                      value={values.phoneNumber}
                      onChange={e => handleChange(e)}
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
                      value={values.content}
                      onChange={e => handleChange(e)}
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