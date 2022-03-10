import React from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ResetPasswordForm from "./ResetPasswordForm";

export default function SendNewPasswordUrlSuccess() {
    const {modalStore} = useStore();
    
    return (
        <Segment placeholder textAlign='center'>
            <Header icon color='green'>
                <Icon name='envelope' />
                Check email!
            </Header>
            <p>Please check your email (including junk email) for the email with link to set new password.</p>

                <>
                    <p>Didn't receive email? Click the below button to resend</p>
                    <Button primary onClick={() => modalStore.openModal(<ResetPasswordForm />)} content='Resend email' size='huge' />
                </>

        </Segment>
    )
}