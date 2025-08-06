import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../../state/store';
import { fetchSellerOrders, updateOrderStatus } from '../../../state/seller/sellerOrderSlice';
import { Button, Menu, MenuItem } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const orderStatusColor = {
    PENDING: { color: '#FFA500', lable: "PENDING" },
    CONFIRMED: { color: '#F5BCBA', lable: "CONFIRMED" },
    PLACED: { color: '#F5BCBA', lable: "PLACED" },
    SHIPPED: { color: '#1E90FF', lable: "SHIPPED" },
    DELIVERED: { color: '#32CD32', lable: "DELIVERED" },
    CANCELLED: { color: '#FF0000', lable: "CANCELLED" },
}

const orderStatus = [
    { color: '#FFA500', lable: "PENDING" },
    { color: '#F5BCBA', lable: "CONFIRMED" },
    { color: '#F5BCBA', lable: "PLACED" },
    { color: '#1E90FF', lable: "SHIPPED" },
    { color: '#32CD32', lable: "DELIVERED" },
    { color: '#FF0000', lable: "CANCELLED" },
]

const OrderTable = () => {

    const dispatch = useAppDispatch();
    const { sellerOrder } = useAppSelector(store => store)
    const [anchorEl, setAnchorEl] = React.useState<null | any>({});
    // const open = Boolean(anchorEl);
    const handleClick = (event: any, orderId: number) => {
        setAnchorEl((prev: any) => ({ ...prev, [orderId]: event.currentTarget }));
    };

    const handleClose = (orderId: number) => () => {
        setAnchorEl((prev: any) => ({ ...prev, [orderId]: null }));
    };

    React.useEffect(() => {
        dispatch(fetchSellerOrders(localStorage.getItem("jwt") || ""))
    }, [])

    const handleUpdateOrderStatus = (orderId: number, orderStatus: any) => () => {
        dispatch(updateOrderStatus({ jwt: localStorage.getItem("jwt") || "", orderId, orderStatus }))
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Order Id</StyledTableCell>
                        <StyledTableCell>Products</StyledTableCell>
                        <StyledTableCell align="right">Shipping Address</StyledTableCell>
                        <StyledTableCell align="right">Order Status</StyledTableCell>
                        <StyledTableCell align="right">Update</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sellerOrder.orders?.map((item) => (
                        <StyledTableRow key={item.id}>
                            <StyledTableCell component="th" scope="row">
                                {item.id}
                            </StyledTableCell>
                            <StyledTableCell >
                                <div className='flex gap-1 flex-wrap'>
                                    {
                                        item.orderItems.map((orderItem) => <div key={orderItem.id} className='flex gap-5'>
                                            <img className='w-20 rounded-md' src={orderItem.product?.images[0]} alt="" />
                                            <div className='flex flex-col justify-between py-2'>
                                                <h1>Title: {orderItem.product.title}</h1>
                                                <h1>Price: {orderItem.product.sellingPrice}</h1>
                                                <h1>Color: {orderItem.product.color}</h1>
                                            </div>
                                        </div>)
                                    }
                                </div>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <div className='flex flex-col gap-y-2'>
                                    <h1>{item.shippingAddress.name}</h1>
                                    <h1>{item.shippingAddress.address}, {item.shippingAddress.city}</h1>
                                    <h1>{item.shippingAddress.state} - {item.shippingAddress.pinCode}</h1>
                                    <h1><strong>Mobile: </strong> {item.shippingAddress.mobile}</h1>
                                </div>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <span className='px-5 py-2 border rounded-full border-primary-color text-primary-color '>{item.orderStatus}</span>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <Button
                                    size='small'
                                    color='primary'
                                    onClick={(e) => handleClick(e, item.id)}
                                >
                                    status
                                </Button>
                                <Menu
                                    id={`status-menu ${item.id}`}
                                    anchorEl={anchorEl[item.id]}
                                    open={Boolean(anchorEl[item.id])}
                                    onClose={handleClose(item.id)}
                                    slotProps={{
                                        list: {
                                            'aria-labelledby': `status-menu ${item.id}`,
                                        },
                                    }}
                                >
                                    {
                                        orderStatus.map((status) => <MenuItem key={status.lable} onClick={
                                            handleUpdateOrderStatus(item.id, status.lable)
                                        }>{
                                                status.lable
                                            }</MenuItem>)
                                    }
                                </Menu>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default OrderTable;
