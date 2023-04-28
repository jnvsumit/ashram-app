import {
    DonateForm,
    DonateButton,
    InputWrapper,
    DonorInformationInput,
} from "./DonatePage.styles";

const DonorInfo = ({ donorInformation, handleDonorChange, handleDonorSubmit }) => {

    return (
        <DonateForm onSubmit={handleDonorSubmit}>
            <InputWrapper>
                <DonorInformationInput
                    type="text"
                    name="name"
                    value={donorInformation.name}
                    onChange={handleDonorChange}
                    placeholder="Enter your name"
                    required
                />
                <DonorInformationInput
                    type="email"
                    name="email"
                    value={donorInformation.email}
                    onChange={handleDonorChange}
                    placeholder="Enter your email"
                    required
                />
                <DonorInformationInput
                    type="tel"
                    name="phone"
                    value={donorInformation.phone}
                    onChange={handleDonorChange}
                    placeholder="Enter your phone number"
                    required
                />
                <DonorInformationInput
                    type="text"
                    name="address"
                    value={donorInformation.address}
                    onChange={handleDonorChange}
                    placeholder="Enter your address"
                />
                <DonorInformationInput
                    type="text"
                    name="city"
                    value={donorInformation.city}
                    onChange={handleDonorChange}
                    placeholder="Enter your city"
                />
                <DonorInformationInput
                    type="text"
                    name="postalCode"
                    value={donorInformation.postalCode}
                    onChange={handleDonorChange}
                    placeholder="Enter your postal code"
                />
                <DonorInformationInput
                    type="text"
                    name="state"
                    value={donorInformation.state}
                    onChange={handleDonorChange}
                    placeholder="Enter your state"
                />
                <DonorInformationInput
                    type="text"
                    name="country"
                    value={donorInformation.country}
                    onChange={handleDonorChange}
                    placeholder="Enter your country"
                />
            </InputWrapper>
            <DonateButton type="submit">Next</DonateButton>
        </DonateForm>
    );
};

export default DonorInfo;
