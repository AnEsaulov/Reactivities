import { Formik, Form, ErrorMessage} from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';

export default observer(function ResetPasswordForm() {
    const {userStore} = useStore();
    const navigate = useNavigate();

    return (
        <>
            <Formik
                initialValues={{ email: '', password: '', error: null }}
                onSubmit={(values, { setErrors }) => userStore.sendResetPasswordLink(values).then(() => navigate('/account/sendNewPasswordUrlSuccess'))
                    .catch(error => setErrors({ error: error.response.data }))}
                validationSchema={Yup.object({
                    email: Yup.string().required().email()
                })}
            >
                {({ handleSubmit, isSubmitting, errors }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <Header as='h2' content='Reset password' color='teal' textAlign='center' />
                        <MyTextInput name='email' placeholder='Enter email' />
                        
                        <ErrorMessage
                            name='error'
                            render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />}
                        />
                        <Button loading={isSubmitting} positive content='Reset password' type='submit' fluid />

                    </Form>
                )}
            </Formik>

        </>
    )
})