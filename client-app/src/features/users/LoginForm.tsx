import { Formik, Form, ErrorMessage} from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import ResetPasswordForm from "./ResetPasswordForm";

export default observer(function LoginForm() {
    const {userStore} = useStore();
    const navigate = useNavigate();
    const {modalStore} = useStore();

    return (
        <>
        <Formik 
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.login(values).then(() => navigate('/activities'))
                .catch(error => setErrors({error: error.response.data}))}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center' />
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage 
                        name='error' 
                        render={() => <Label style={{marginBottom: 10}} basic color='red' content={errors.error} />}
                    />
                    <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
                    
                </Form>
            )}
        </Formik>
        <Segment clearing basic>
            <Button basic floated='right' onClick={() => modalStore.openModal(<ResetPasswordForm />)}>Forgot password?</Button>
        </Segment>
        </>
    )
})