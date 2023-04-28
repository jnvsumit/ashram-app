import {
    DonateForm,
    DonateAmountInput,
    DonateButton,
    InputWrapper,
    CurrencySelect,
} from "./DonatePage.styles";

const DonationInfo = ({ currencies, donationInfo, handleDonationInfoChange, handleDonationSubmit }) => {

    return (
        <DonateForm onSubmit={handleDonationSubmit}>
            <InputWrapper>
                <CurrencySelect
                    name="currency"
                    value={donationInfo.currency}
                    onChange={handleDonationInfoChange}
                >
                    {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                            {currency.label}
                        </option>
                    ))}
                </CurrencySelect>
                <DonateAmountInput
                    type="number"
                    name="amount"
                    min="10"
                    value={donationInfo.amount}
                    onChange={handleDonationInfoChange}
                    placeholder="Enter donation amount"
                    required
                />
            </InputWrapper>
            <DonateButton type="submit">Donate Now</DonateButton>
        </DonateForm>
    );
};

export default DonationInfo;
