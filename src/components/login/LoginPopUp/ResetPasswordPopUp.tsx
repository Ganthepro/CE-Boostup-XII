import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { ResetPasswordValues, emptyResetPasswordValues, ResetPasswordValidationSchema } from "../../../formik/resetPassword.formik";
import DarkBackground from "../../utils/DarkBackground";
import { useFormik } from "formik";
import { getFieldProps } from "../../../utils/getFieldProps";
import { authService } from "../../../services/auth.service";
import { useMutation } from "react-query";
import Input from "../../utils/Input";

function ResetPasswordPopUp() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { status, mutate } = useMutation(authService.resetPassword, {
        onSuccess: () => {
            navigate("/");
        },
        onError: (error) => {
            console.error(error);
            alert((error as any).message);
        },
    });

    function handleResetPassword() {
        const token = searchParams.get('token');
        if (!token)
            return navigate("/");
        mutate({
            password: formik.values.password,
            token
        });
    }

    const formik = useFormik<ResetPasswordValues>({
        initialValues: {
            ...emptyResetPasswordValues,
        },
        validateOnChange: true,
        enableReinitialize: true,
        validationSchema: ResetPasswordValidationSchema,
        onSubmit: handleResetPassword,
    });

    const passwordInputProps = getFieldProps(formik, "password");
    const confirmPasswordInputProps = getFieldProps(formik, "confirmPassword");

    return (
        <div className="flex justify-center items-center fixed top-0 w-screen h-screen z-10">
            <DarkBackground />
            <form action="" className="flex flex-col items-center place-content-between absolute
            w-[50%] min-w-[450px] max-w-[500px] h-[50%] min-h-[460px] max-h-[470px] rounded-[30px] p-[36px] bg-stone01">
                <div className="border-none border-red-500 flex flex-col items-center w-full h-auto">
                    <div className="text-stone05 text-[40px] font-[700] leading-[4rem]">
                        รีเซ็ตรหัสผ่าน
                    </div>
                    <p className="text-stone04">ใส่รหัสผ่านใหม่</p>
                </div>
                <div className="border-none border-red-500 relative w-full h-[40%] max-h-[50px]">
                    <div className="input-container w-full absolute bottom-0">
                        <Input {...passwordInputProps} type={"password"} 
                        inputClass="w-full h-[48px] px-[16px] py-[8px] border-stone03 border-[1px] rounded-[10px] 
                        text-stone04 text-[18px]" placeholder=" " label="สร้างรหัสผ่านใหม่" labelClass="absolute left-[16px] bottom-[6px] 
                        text-stone04 text-[24px] font-[700]" onChange={(e) => formik.setFieldValue("password", e.target.value)}/>
                    </div>
                </div>
                <div className="border-none border-red-500 relative w-full h-[40%] max-h-[50px]">
                    <div className="input-container w-full absolute bottom-0">
                        <Input {...confirmPasswordInputProps} type="password" placeholder=" " required={true}
                        inputClass="w-full h-[48px] px-[16px] py-[8px] border-stone03 border-[1px] rounded-[10px] 
                        text-stone04 text-[18px]" label="ยืนยันรหัสผ่าน" labelClass="absolute left-[16px] bottom-[6px] 
                        text-stone04 text-[24px] font-[700]" onChange={(e) => formik.setFieldValue("confirmPassword", e.target.value)}/>
                    </div>
                </div>
                <div className="border-none border-red-500 flex flex-col items-center place-content-between w-[50%] h-[30%] min-w-[140px] max-w-[150px] min-h-[60px] max-h-[70px]">
                    <button className="flex justify-center items-center w-full h-[66%] min-h-[36px] max-h-[42px] 
                    rounded-lg shadow-md bg-accent text-stone01 text-[18px] font-[700]" type="submit">
                        ตกลง
                    </button>
                    <Link to="/" className="text-stone04 text-[16px] leading-[0.5rem]">กลับเข้าสู่ระบบ</Link>
                </div>

            </form>
        </div>
    );
}

export default ResetPasswordPopUp;