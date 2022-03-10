import React from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "./LoginForm";

export default function NewPasswordSuccess() {
    const {modalStore} = useStore();

    return (
        <Segment placeholder textAlign='center'>
            <Header icon color='green'>
                <Icon name='check' />
                New password successfully set!
            </Header>
            <Button primary onClick={() => modalStore.openModal(<LoginForm />)} size='huge' content='Login' />
        </Segment>
    )
}