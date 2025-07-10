import React from 'react';
import ValidatedInput from "@/components/ValidatedInput";

const BankCard = () => {
    return (
        <div className='bg-lightSecondary dark:bg-darkSecondary w-fit rounded-3xl p-6 flex flex-col gap-2'>
            <ValidatedInput label='Номер' type='card_number' required={true} placeholder='0000 0000 0000 0000'/>
            <ValidatedInput label='Срок' type='card_date' required={true} placeholder='00/00'/>
            <ValidatedInput label='CVV' type='card_cvv' required={true} placeholder='123'/>
        </div>
    );
}

export default BankCard;