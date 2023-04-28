// DonatePage.js
import React, {useEffect, useState} from "react";
import {
    DonateContainer,
    DonateTitle,
    DonateDescription,
    DonateForm,
    DonateAmountInput,
    DonateButton,
    InputWrapper,
    CurrencySelect,
    DonorInformationInput,
} from "./DonatePage.styles";
import { apiCall } from "../../api/adapter";
import DonorInfo from "./DonorInfo";
import DonationInfo from "./DonationInfo";

const DonatePage = () => {
    const [donorInformation, setDonorInformation] = useState({
        email: "",
        phone: "",
        name: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: ""
    });

    const [donationInfo, setDonationInfo] = useState({
        currency: "INR",
        amount: 10,
        donorId: ''
    });

    const [currencies, setCurrencies] = useState([]);
    const [step, setStep] = useState(1);

    const handleDonorChange = (e) => {
        const { name, value } = e.target;

        setDonorInformation({
            ...donorInformation,
            [name]: value,
        });
    };

    const handleDonorSubmit = async (e) => {
        e.preventDefault();

        const body = JSON.stringify({
            name: donorInformation.name,
            email: donorInformation.email,
            phone: donorInformation.phone,
            address: donorInformation.address,
            city: donorInformation.city,
            state: donorInformation.state,
            postalCode: donorInformation.postalCode,
            country: donorInformation.country
        });

        const response = await apiCall("api/donor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });

        if (response.success) {
            const { data } = response;
            setDonationInfo({
                ...donationInfo,
                donorId: data.donorId
            });
            setStep(2);
        }
    };

    const handleDonationInfoChange = (e) => {
        const { name, value } = e.target;

        setDonationInfo({
            ...donationInfo,
            [name]: value,
        });
    };

    const handleDonationSubmit = async (e) => {
        e.preventDefault();

        const body = JSON.stringify({
            amount: donationInfo.amount,
            currency: donationInfo.currency,
            donorId: donationInfo.donorId
        });

        const response = await apiCall("api/order/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });

        if (response.success) {
            const { data } = response;

            await razorpayOrderCreate({
                razorpayKey: data.razorpayKey,
                currency: data.currency,
                amount: data.amount.toString(),
                orderId: data.orderId,
                companyName: data.companyName,
                companyDescription: data.companyDescription,
                companyLogo: data.companyLogo,
                donorId: data.donorId
            });
        }
    };

    const razorpayOrderCreate = async ({ razorpayKey, currency, amount, orderId, companyName, companyDescription, companyLogo, donorId }) => {
        const response = await apiCall(`api/donor/${donorId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.success) {
            const { data } = response;
            const {name, email, phone} = data;

            const options = {
                key: razorpayKey,
                currency,
                amount,
                order_id: orderId,
                name: companyName,
                description: companyDescription,
                image: companyLogo,
                handler: async function (response) {
                    await handlePaymentVerification({
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature
                    });
                },
                prefill: {
                    name,
                    email,
                    contact: phone,
                },
                theme: {
                    color: "#F37254",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }
    }

    const handlePaymentVerification = async ({ razorpayPaymentId, razorpayOrderId, razorpaySignature }) => {
        const body = JSON.stringify({
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        });

        const response = await apiCall("api/order/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });

        if (response.success) {
            setStep(3);
        }
    }

    useEffect(() => {
            const getCurrencies = async () => {
                const response = await apiCall("api/currency", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.success) {
                    const {data} = response;
                    setCurrencies(data.map((currency) => {
                        return {
                            code: currency.code,
                            label: currency.name + " (" + currency.symbol + ")"
                        }
                    }));
                }
            }

            getCurrencies();
        }, []);

    return (
        <DonateContainer>
            <DonateTitle>Donate to Support Our Cause</DonateTitle>
            <DonateDescription>
                Your generous contribution helps us continue our mission to bring
                education and resources to those in need. Thank you for your support!
            </DonateDescription>
            {
                step === 1 &&
                    <DonorInfo donorInformation={donorInformation} handleDonorChange={handleDonorChange} handleDonorSubmit={handleDonorSubmit} />
            }
            {
                step === 2 &&
                    <DonationInfo currencies={currencies} donationInfo={donationInfo} handleDonationInfoChange={handleDonationInfoChange} handleDonationSubmit={handleDonationSubmit} />
            }
            {
                step === 3 &&
                    <div>
                        <h1>Thank you for your donation!</h1>
                    </div>
            }
        </DonateContainer>
    );
};

export default DonatePage;
