import { Box, Button, Divider, IconButton, Typography} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import { Close, Add, Remove } from "@mui/icons-material";
import styled from '@emotion/styled';
import { shades } from '../../theme';
import {decreaseCount, increaseCount, removeFromCart, setIsCartOpen} from '../../state';
import {useNavigate} from 'react-router-dom';


const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CartMenu = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, isCartOpen } = useSelector(state => state.auth);

  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      bgcolor="rgba(0,0,0,0.4)"
      position='fixed'
      zIndex={10}
      width='100%'
      height='100%'
      left='0'
      top='0'
      overflow='auto'
    >
      <Box
        position='fixed'
        right='0'
        bottom='0'
        width='max(400px, 30%)'
        height='100%'
        bgcolor='white'
      >
        <Box
          padding='30px' overflow='auto' height='100%'
        >
          <FlexBox mb='15px'>
            <Typography variant='h3'>SHOPPING BAG ({cart.length})</Typography>
            <IconButton onClick={()=> dispatch(setIsCartOpen({}))}>
              <Close />
            </IconButton>
          </FlexBox>

          <Box>
            {cart.map(item => (
              <Box key={`${item.name}-${item._id}`}>
                <FlexBox p='15px 0' >
                  <Box flex='1 1 40%'>
                    <img
                     src={`../../assets/${item.picturePath}`}
                     alt={item?.name}
                     height='164px'
                     width='123px'
                    />
                  </Box>
                  <Box flex='1 1 60%'>
                    <FlexBox mb='5px'>
                      <Typography fontWeight='bold'>
                        {item.name}
                      </Typography>
                      <IconButton onClick={()=> dispatch(removeFromCart({id: item._id}))} >
                        <Close />
                      </IconButton>
                    </FlexBox>
                    <Typography >{item.description}</Typography>
                    <FlexBox m='15px 0'>
                      <Box 
                        display='flex'
                        alignItems='center'
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={()=> dispatch(decreaseCount({id: item._id}))}
                        >
                          <Remove />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton
                          onClick={()=> dispatch(increaseCount({id: item._id}))}
                        >
                          <Add />
                        </IconButton>                        
                      </Box>
                      <Typography fontWeight='bold'>
                        ${item.displayAmount}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          <Box m='20px 0'>
              <FlexBox m='20px 0'>
                <Typography fontWeight='bold'></Typography>
                <Typography fontWeight='bold'></Typography>
              </FlexBox>
              <Button
                sx={{
                  backgroundColor: shades.primary[400],
                  color: 'white',
                  borderRadius: 0,
                  minWidth: '100%',
                  padding: '20px 40px',
                  m: '20px 0'
                }}
                onClick={()=>{
                  navigate('/checkout');
                  dispatch(setIsCartOpen({}));
                }}
              >CHECKOUT</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default CartMenu;