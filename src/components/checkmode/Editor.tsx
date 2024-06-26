import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Button from "../utils/Button"
import BackIcon from "../../assets/back.svg";

import CodeMirror from '@uiw/react-codemirror';
import { cpp } from "@codemirror/legacy-modes/mode/clike";
import { StreamLanguage } from '@codemirror/language';
import { githubLight } from "@uiw/codemirror-theme-github";
import { useCompilerSettingStore } from "../../store/zustand/compiler-setting.zustand";
import { useProblemStore } from "../../store/zustand/problem.zustand";
import EditorFooter from "./ProblemComponents/EditorFooter";
import { useAppSelector } from "../../store/hook";
import PopUp from "./PopUp/PopUp";
import { useProblem } from "../../hooks/problem.hook";
import { PublicationStatus } from "../../enum/problem.enum";
import SuccessCard from "./SuccessCard";
import { usePermission } from "../../hooks/permission.hook";
import { Role } from "../../enum/roles.enum";

type EditorProps = {
    height: number;
}


export default function Editor({ height }: EditorProps) {
    const navigate = useNavigate();
    const { code, setCode } = useCompilerSettingStore();
    const [mode, setMode] = useState<"solution" | "starter">("starter");
    const { problem } = useProblemStore();
    const userId = useAppSelector(state => state.auth.user?.id);
    const isOwner = problem?.owner.id === userId;
    const [isPopup, setIsPopup] = useState<number | undefined>();
    const { updateProblemMutation } = useProblem();
    const [show, setShow] = useState<boolean>(false);
    const permission = usePermission([Role.Reviewer, Role.Admin, Role.SuperAdmin]);

    useEffect(() => {
        if (mode === "solution" && permission)
            setCode(problem?.solution);
        else
            setCode(problem?.starterCode ? problem.starterCode : "");
    }, [mode, problem]);

    async function handleUpdateProblem() {
        try {
            await updateProblemMutation.mutateAsync({
                publicationStatus: PublicationStatus.Draft,
            });
            setShow(true);
        } catch (error) {
            console.error(error);
            alert("Failed to update problem: " + (error as Error).message);
        }
        setIsPopup(undefined);
    }

    const components = [
        <PopUp handleSubmit={handleUpdateProblem} setPopup={setIsPopup} title="แก้แบบร่างใช่หรือไม่" description="หากกดยืนยันจะกลับไปหน้าแก้แบบร่าง และต้องได้รับ สถานะ Approved จึงจะสามารถกลับมาหน้านี้ใหม่ได้อีกครั้ง" />
    ]

    return (
        <>
            {show && <SuccessCard publicationStatus={PublicationStatus.Draft} setShow={setShow} />}
            {isPopup != undefined && components[isPopup]}
            <div className="flex flex-col w-full h-full overflow-y-hidden">
                <div className="flex place-content-between w-full h-[55px]">
                    <Button text="กลับ" img={BackIcon} className="flex items-center justify-evenly w-[96px] h-[40px] bg-jenna rounded-[8px] text-[16px] font-medium" imgClassName="w-[16px] h-[16px]" ClickFunc={() => navigate(-1)} />
                    <div className="flex gap-[16px] h-[40px]">
                        {permission && <Button ClickFunc={() => setMode("solution")} text="Solution Code" className={`${mode === "solution" ? "bg-accent text-stone01 font-bold" : "bg-jenna text-black font-medium"} h-full px-[28px] text-nowrap rounded-[8px]`} />}
                        <Button ClickFunc={() => setMode("starter")} text="Starter Code" className={`${mode === "starter" ? "bg-accent text-stone01 font-bold" : "bg-jenna text-black font-medium"} h-full px-[28px] rounded-[8px]`} />
                        {
                            isOwner && <Button ClickFunc={() => setIsPopup(0)} className="flex items-center justify-evenly px-[28px] h-[40px] bg-jenna rounded-[8px] text-[16px] font-medium" text="แก้แบบร่าง" />
                        }
                    </div>
                </div>
                <div id="editor-space" className="relative bg-stone01 w-full h-[calc(100%-55px)] rounded-[10px] overflow-y-auto">
                    <CodeMirror editable={false} value={code} height={`${height - 55 - 230}px`} extensions={[StreamLanguage.define(cpp)]} theme={githubLight} />
                    <EditorFooter />
                </div>
            </div>
        </>
    )
};