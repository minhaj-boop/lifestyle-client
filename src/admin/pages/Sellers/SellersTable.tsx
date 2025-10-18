import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
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

import { fetchAllSellers, updatSellerStatus } from '../../../state/admin/adminSellerSlice';

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

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const accountStatus = [
    { status: "PENDING_VERIFICATION", title: "Pending Verification", description: "Your account is pending verification. Please wait for the admin to verify your account." },
    { status: "ACTIVE", title: "Active", description: "Your account is active. You can start selling products." },
    { status: "SUSPENDED", title: "Suspended", description: "Your account has been suspended. Please contact support for more information." },
    { status: "DEACTIVATED", title: "Deactivated", description: "Your account has been deactivated. You can reactivate it by contacting support." },
    { status: "BANNED", title: "Banned", description: "Your account has been banned. You cannot use this account anymore." },
    { status: "CLOSED", title: "Closed", description: "Your account has been closed. You cannot use this account anymore." }
];

const SellersTable = () => {

    const dispatch = useAppDispatch()
    const jwt = localStorage.getItem("jwt");

    const adminSellers = useAppSelector((state) => state.adminSellers.seller);

    const [accoutStatus, setAccountStatus] = React.useState("PENDING_VERIFICATION");

    const handleChange = (event: any) => {
        const selectedStatus = event.target.value;
        setAccountStatus(selectedStatus);

        if (jwt) {
            dispatch(fetchAllSellers({ jwt, status: selectedStatus }));
        }
    };

    React.useEffect(() => {
        if (jwt) {
            dispatch(fetchAllSellers({ jwt, status: accoutStatus }))
        }
    }, [dispatch, jwt])

    const handleStatusUpdate = (sellerId: number, newStatus: string) => {
        if (!jwt) return;

        dispatch(updatSellerStatus({ jwt, sellerId, status: newStatus }))
            .unwrap()
            .then(() => {
                // Optionally re-fetch sellers after status update
                dispatch(fetchAllSellers({ jwt, status: accoutStatus }));
            })
            .catch((err) => {
                console.error("Failed to update status:", err);
            });
    };

    return (
        <>
            <div className='pb-5 w-60'>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Account Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={accoutStatus}
                        label="Account Status"
                        onChange={handleChange}
                    >
                        {accountStatus.map((status, index) =>
                            <MenuItem key={index} value={status.status}>
                                {status.title}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Seller Name</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell align="right">Mobile</StyledTableCell>
                            <StyledTableCell align="right">GSTIN</StyledTableCell>
                            <StyledTableCell align="right">Business Name</StyledTableCell>
                            <StyledTableCell align="right">Account Status</StyledTableCell>
                            <StyledTableCell align="right">Change Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {adminSellers.map((seller, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {seller.sellerName}
                                </StyledTableCell>
                                <StyledTableCell >{seller.email}</StyledTableCell>
                                <StyledTableCell align="right">{seller.mobile}</StyledTableCell>
                                <StyledTableCell align="right">{seller.gstin}</StyledTableCell>
                                <StyledTableCell align="right">{seller.businessDetails.businessName}</StyledTableCell>
                                <StyledTableCell align="right">{seller.accountStatus}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <FormControl size="small" fullWidth>
                                        <Select
                                            value={seller.accountStatus}
                                            onChange={(e) => handleStatusUpdate(seller.id, e.target.value)}
                                        >
                                            {accountStatus.map((statusOption) => (
                                                <MenuItem key={statusOption.status} value={statusOption.status}>
                                                    {statusOption.title}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default SellersTable