import { ErrorMessage, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import useQuery from "../../app/common/util/hooks";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';

export default function EnterNewPasswordForm() {
    const {userStore} = useStore();
    const navigate = useNavigate();
    const email = useQuery().get('email') as string;
    const token = useQuery().get('token') as string;
    
    return (

        <>
        <Formik
            initialValues={{ password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.resetPassword(token, email, values.password).then(() => navigate('/account/newPasswordSuccess'))
                .catch(error => setErrors({ error: error.response.data }))}
            validationSchema={Yup.object({
                password: Yup.string().required()
            })}                
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content={`Enter new password for account ${email}`} color='teal' textAlign='center' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage
                        name='error'
                        render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />}
                    />
                    <Button loading={isSubmitting} positive content='Set new password' type='submit' fluid />

                </Form>
            )}
        </Formik>

    </>
    )
}