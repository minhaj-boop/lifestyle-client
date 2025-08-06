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
import { fetchSellerPorducts, updateProduct } from '../../../state/seller/sellerPorductSlice';
import { Product } from '../../../types/productTypes';
import { Box, Button, IconButton, Modal } from '@mui/material';
import { Close, Edit } from '@mui/icons-material';
import ProductForm from './ProductForm';

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

const ProductsTable = () => {

    const dispatch = useAppDispatch();
    const { sellerProduct } = useAppSelector((store) => store);

    const [openModal, setOpenModal] = React.useState(false);
    const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);

    const handleEditClick = (product: Product) => {
        setEditingProduct(product);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditingProduct(null);
    };


    // console.log("Seller Products:", sellerProduct.products[0].images);
    React.useEffect(() => {
        dispatch(fetchSellerPorducts(localStorage.getItem("jwt") || ""));
    }, []);

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Images</StyledTableCell>
                            <StyledTableCell >Title</StyledTableCell>
                            <StyledTableCell >MRP</StyledTableCell>
                            <StyledTableCell >Selling Price</StyledTableCell>
                            <StyledTableCell >Color</StyledTableCell>
                            <StyledTableCell >Update Stock</StyledTableCell>
                            <StyledTableCell >Update</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sellerProduct.products?.map((item: Product) => (
                            <StyledTableRow key={item.id}>
                                <StyledTableCell component="th" scope="row">
                                    <div className='flex gap-1 flex-wrap'>
                                        {item.images?.map((image) =>
                                            <img key={image} className='w-20 rounded-md ' src={image} alt="" />
                                        )}
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell >{item.title}</StyledTableCell>
                                <StyledTableCell >{item.mrPrice}</StyledTableCell>
                                <StyledTableCell >{item.sellingPrice}</StyledTableCell>
                                <StyledTableCell >{item.color}</StyledTableCell>
                                <StyledTableCell ><Button size='small'>in stock</Button></StyledTableCell>
                                <StyledTableCell>
                                    <IconButton
                                        color='primary'
                                        size='small'
                                        onClick={() => handleEditClick(item)}
                                    >
                                        <Edit />
                                    </IconButton>
                                </StyledTableCell>

                                {/* <StyledTableCell ><IconButton color='primary' size='small'><Edit /></IconButton></StyledTableCell> */}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxWidth: 800,
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <IconButton
                        onClick={handleCloseModal}
                        className=''
                        size='large'
                        color='error'
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            outline: 'none',
                        }}
                    >
                        <Close sx={{
                            fontSize: '2rem',
                        }} />
                    </IconButton>
                    <ProductForm
                        initialValues={editingProduct}
                        onClose={handleCloseModal}
                        onSubmit={async (values) => {
                            // Dispatch update product logic here
                            console.log("Updated product values:", values);
                            if (!editingProduct) return;

                            const jwt = localStorage.getItem("jwt") || "";
                            try {
                                if (!editingProduct?.id) {
                                    console.error("Product ID is missing");
                                    return;
                                }
                                await dispatch(updateProduct({
                                    productId: editingProduct.id,
                                    request: values,
                                    jwt,
                                }));

                                handleCloseModal();
                            } catch (error) {
                                console.error("Update failed:", error);
                            }
                        }}
                        isEditMode={true}
                    />
                </Box>
            </Modal>

        </>
    );
}

export default ProductsTable;
