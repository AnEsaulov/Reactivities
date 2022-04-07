import { observer } from "mobx-react-lite";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Header, Segment, Image, Button, Divider } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer( function HomePage() {
    const {userStore, modalStore} = useStore();
    const navigate = useNavigate();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
                    Event Up
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to Event Up' />
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to Activities!
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                            Login!
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                            Register!
                        </Button>   
                        <Divider horizontal inverted>Or</Divider>   
                        <Button 
                            loading={userStore.fbLoading}
                            size='huge'
                            inverted
                            color='facebook'
                            content='Login with Facebook'
                            onClick={userStore.facebookLogin}
                        />     
                        <Button onClick={() => userStore.login({email: 'cys64151@jiooq.com', password: 'Pa$$w0rd'})
                            .then(() => navigate('/activities'))} size='huge' inverted>
                            Login as Guest
                        </Button>          
                    </>

                )}
            </Container>
        </Segment>
    )
})