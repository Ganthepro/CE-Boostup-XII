import { useState } from "react";
import Button from "../../utils/Button";
import Input from "../../utils/Input";
import { authService } from "../../../services/auth.service";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { LoginValues, emptyLoginValues, loginValidationSchema } from "../../../constants/formik/login.formik";
import { getFieldProps } from "../../../utils/getFieldProps";

type LoginFormProps = {
    setShowForgotPassword: React.Dispatch<React.SetStateAction<boolean>>
}

function LoginForm({ setShowForgotPassword }: LoginFormProps) {
    const [savePassword, setSavePassword] = useState<boolean>(false)
    const cookies = new Cookies()

    async function handleLogin() {
        try {
            const response = await authService.login({
                email: formik.values.email,
                password: formik.values.password
            })
            // cookies.set("token", response.data.token, { path: "/" })
            // console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const formik = useFormik<LoginValues>({
        initialValues: {
            ...emptyLoginValues,
        },
        validateOnChange: true,
        enableReinitialize: true,
        validationSchema: loginValidationSchema,
        onSubmit: handleLogin,
    });

    const emailInputProps = getFieldProps(formik, "email");

    return (
        <div className="absolute bottom-0 w-full h-[90%] min-h-[400px] max-h-[450px] p-[30px]">
            <form onSubmit={formik.handleSubmit} className="flex flex-col items-center place-content-between w-full h-full">
                <div className="flex flex-col items-center place-content-between w-full h-[75%]">
                    <div className="w-full text-stone05 text-[40px] text-center font-[700] leading-[3rem] bg-stone01">
                        เข้าสู่ระบบ
                    </div>

                    <div className="relative w-full h-full max-h-[90px]">
                        <div className="input-container w-full absolute bottom-0">
                            <Input {...emailInputProps} label="อีเมล" type="email" placeholder=" " required={true} inputClass="w-full h-[48px] px-[16px] py-[8px] border-stone03 border-[1px] rounded-[10px] text-[18px]" labelClass="absolute left-[16px] bottom-[6px] text-[24px] font-[700]" 
                            onChange={(e) => formik.setFieldValue("email", e.target.value)} />
                        </div>
                    </div>
                    <div className="relative w-full h-full max-h-[90px]">
                        <div className="input-container w-full absolute bottom-0">
                            <Input label="รหัสผ่าน" type="password" placeholder=" " required={true} inputClass="w-full h-[48px] px-[16px] py-[8px] border-stone03 border-[1px] rounded-[10px] text-[18px]" labelClass="absolute left-[16px] bottom-[6px] text-[24px] font-[700]"
                                onChange={(e) => formik.setFieldValue("password", e.target.value)} />
                        </div>
                    </div>
                    <div className="flex items-center place-content-between w-[96%]">
                        <div className="flex items-center place-content-between h-full">
                            <Input label="จดจำรหัสผ่าน?" type="checkbox" placeholder="_" required={false} inputClass="scale-[0.66]" labelClass="text-[16px]"
                                onChange={(e) => setSavePassword(e.target.checked)} />
                        </div>
                        <div>
                            <Button ClickFunc={() => setShowForgotPassword(true)} className="text-[16px]" text="ลืมหรัสผ่าน?" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center place-content-between w-[40%] h-[22.5%] min-h-[80px] max-h-[90px]">
                    <Button className='bg-accent text-stone01 hover:bg-accent2 transition ease-in-out duration-200 shadow-md cursor-pointer w-36 h-10 rounded-lg flex items-center justify-center' text="เข้าสู่ระบบ" />
                    <Link to="/register" className="text-stone04">ยังไม่มีแอคเคาท์?</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginForm