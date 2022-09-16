import { ReactElement } from "react";

type NotificationToast = {
    label: string;
}

export const NotificationToast = ({label}: NotificationToast) : ReactElement => {
    return (
        <>
            <div>
                <img src="" alt="" />
                <p>hey {label}</p>
            </div>
        </>
    )
}