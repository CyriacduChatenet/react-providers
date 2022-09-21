import { ReactElement } from 'react';

import './NotificationToast.css';

type NotificationToastType = {
    label: string;
}

export const NotificationToast = ({label}: NotificationToastType) : ReactElement => {
    return (
        <>
            <div className='toast'>
                <img src='' alt='' />
                <p>{label}</p>
            </div>
        </>
    )
}