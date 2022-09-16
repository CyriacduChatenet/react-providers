import { ReactElement } from "react";
import './NotificationToast.css';

type NotificationToast = {
    label: string;
}

export const NotificationToast = ({label}: NotificationToast) : ReactElement => {
    return (
        <>
            <div className="toast">
                <img src="" alt="" />
                <p>{label}</p>
            </div>
        </>
    )
}