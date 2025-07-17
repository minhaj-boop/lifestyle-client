import { Button, Step, StepLabel, Stepper } from '@mui/material';
import React, { useState } from 'react'
import BecomeSellerStep1 from './BecomeSellerStep1';
import { useFormik } from 'formik';
import BecomeSellerStep2 from './BecomeSellerStep2';
import BecomeSellerFormStep3 from './BecomeSellerFormStep3';
import BecomeSellerFormStep4 from './BecomeSellerFormStep4';

const steps = [
    "Tax Details & Mobile",
    "Pickup Address",
    "Bank Details",
    "Supplier Details"
];


const SellerAccountForm = () => {
    const [activeState, setActiveState] = useState(0);
    const handleStep = (value: number) => () => {
        ((activeState < steps.length - 1) || (activeState > 0 && value === -1)) && setActiveState(activeState + value)
        activeState === steps.length - 1 && handleCreateAccount();
    };

    const formik = useFormik({
        initialValues: {
            mobile: '',
            otp: '',
            gstin: '',
            pickupAddress: {
                name: '',
                mobile: '',
                pincode: '',
                address: '',
                city: '',
                state: '',
                locality: ''
            },
            bankDetails: {
                accountNumber: '',
                ifscCode: '',
                accountHolderName: '',
            },
            sellerName: '',
            email: '',
            businessDetails: {
                businessName: '',
                businessEmail: '',
                businessMoibile: '',
                logo: "",
                banner: "",
                businessAddress: ''
            },
            password: ''
        },
        // validationSchema: addressFormSchema,
        onSubmit: (values) => {
            console.log("Form Submitted", values);
            // handleCreateAccount(); 
        }
    })

    const handleCreateAccount = () => {
        console.log("Account Created Successfully");
    }

    return (
        <div>
            <Stepper activeStep={activeState} alternativeLabel>
                {
                    steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
            <section className='mt-20 space-y-10 '>
                <div>
                    {
                        activeState === 0 ? <BecomeSellerStep1 formik={formik} /> : activeState === 1 ? <BecomeSellerStep2
                            formik={formik} /> : activeState === 2 ? <BecomeSellerFormStep3 formik={formik} />
                            : <BecomeSellerFormStep4 formik={formik} />
                    }
                </div>
                <div className='flex items-center justify-between'>
                    <Button onClick={handleStep(-1)} variant='contained' disabled={activeState === 0}>
                        Back
                    </Button>
                    <Button onClick={handleStep(1)} variant='contained' >
                        {activeState === steps.length - 1 ? "Create Account" : "Next"}
                    </Button>
                </div>
            </section>

        </div>
    )
}

export default SellerAccountForm