import { Button, Step, StepLabel, Stepper } from '@mui/material';
import { useState } from 'react'
import BecomeSellerStep1 from './BecomeSellerStep1';
import { getIn, setIn, useFormik } from 'formik';
import BecomeSellerStep2 from './BecomeSellerStep2';
import BecomeSellerFormStep3 from './BecomeSellerFormStep3';
import BecomeSellerFormStep4 from './BecomeSellerFormStep4';
import * as Yup from 'yup'
import { createSeller } from '../../../state/seller/sellerSlice';
import { useAppDispatch } from '../../../state/store';
import { Seller } from '../../../types/sellerTypes';
import { useNavigate } from 'react-router-dom';

const steps = [
    "Tax Details & Mobile",
    "Pickup Address",
    "Bank Details",
    "Supplier Details"
];

const sellerAccountCreateFromSchema = Yup.object().shape({
    mobile: Yup.string()
        .required("Mobile number is required")
        .matches(/^\d{11}$/, "Mobile number must be 11 digits"),
    // otp: Yup.string()
    //     .required("OTP is required")
    //     .length(6, "OTP must be 6 digits"),
    gstin: Yup.string()
        .required("GSTIN is required"),
    // .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN format"),

    pickupAddress: Yup.object().shape({
        name: Yup.string().required("Pickup name is required"),
        mobile: Yup.string()
            .required("Pickup mobile is required")
            .matches(/^\d{11}$/, "Mobile number must be 11 digits"),
        pincode: Yup.string()
            .required("Pincode is required"),
        // .matches(/^\d{6}$/, "Invalid pincode"),
        address: Yup.string().required("Address is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        locality: Yup.string().required("Locality is required"),
    }),

    bankDetails: Yup.object().shape({
        accountNumber: Yup.string()
            .required("Account number is required"),
        // .matches(/^\d{9,18}$/, "Invalid account number"),
        ifscCode: Yup.string()
            .required("IFSC code is required"),
        // .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
        accountHolderName: Yup.string().required("Account holder name is required"),
    }),

    sellerName: Yup.string().required("Seller name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),

    businessDetails: Yup.object().shape({
        businessName: Yup.string().required("Business name is required"),
        businessEmail: Yup.string()
            .email("Invalid business email")
            .required("Business email is required"),
        businessMobile: Yup.string()
            .required("Business mobile is required")
            .matches(/^\d{11}$/, "Mobile number must be 11 digits"),
        businessAddress: Yup.string().required("Business address is required"),
        logo: Yup.string().required("Business logo is required"),
        banner: Yup.string().required("Business banner is required")
    }),

    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
});



const SellerAccountForm = () => {

    const dispatch = useAppDispatch();
    const [activeState, setActiveState] = useState(0);
    // const handleStep = (value: number) => () => {
    //     ((activeState < steps.length - 1) || (activeState > 0 && value === -1)) && setActiveState(activeState + value)
    //     activeState === steps.length - 1 && handleCreateAccount();
    // };

    const stepFieldsMap = [
        ['mobile', 'gstin'],
        [
            'pickupAddress.name',
            'pickupAddress.mobile',
            'pickupAddress.pincode',
            'pickupAddress.address',
            'pickupAddress.city',
            'pickupAddress.state',
            'pickupAddress.locality'
        ],
        [
            'bankDetails.accountNumber',
            'bankDetails.ifscCode',
            'bankDetails.accountHolderName'
        ],
        [
            'sellerName',
            'email',
            'businessDetails.businessName',
            'businessDetails.businessEmail',
            'businessDetails.businessMobile',
            'businessDetails.businessAddress',
            'businessDetails.logo',
            'businessDetails.banner',
            'password'
        ]
    ];

    const handleStep = (value: number) => async () => {
        // Going BACK — skip validation
        if (value === -1) {
            if (activeState > 0) {
                setActiveState((prev) => prev - 1);
            }
            return;
        }

        // Going FORWARD — validate current step
        const currentStepFields = stepFieldsMap[activeState];

        // Mark current step fields as touched
        let touchedFields: any = {};
        currentStepFields.forEach((field) => {
            touchedFields = setIn(touchedFields, field, true);
        });
        await formik.setTouched(touchedFields, true);

        // Validate
        const errors = await formik.validateForm();

        // Check for errors on current step fields only
        const hasStepErrors = currentStepFields.some((field) => {
            const error = getIn(errors, field);
            return !!error;
        });

        if (hasStepErrors) {
            return; // Don't move forward
        }

        // Move forward
        if (activeState < steps.length - 1) {
            setActiveState((prev) => prev + 1);
        }

        // Final submit
        if (activeState === steps.length - 1) {
            formik.handleSubmit();
        }
    };


    const formik = useFormik({
        initialValues: {
            mobile: '',
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
                businessMobile: '',
                businessAddress: '',
                logo: "",
                banner: ""
            },
            password: ''
        },
        validationSchema: sellerAccountCreateFromSchema,
        onSubmit: (values) => {
            console.log("Form Submitted", values);
            handleCreateAccount(values);
            // dispatch(createSeller(values))
        }
    })

    const handleCreateAccount = (e: Seller) => {
        dispatch(createSeller(e))
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