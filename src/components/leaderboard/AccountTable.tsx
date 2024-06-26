import CrownIcon from "../../assets/CrownIcon.svg";
import { useAppSelector } from "../../store/hook";

type AccountTableProps = {
  id: string;
  number: number;
  img: string;
  name: string;
  group: string;
  score: number;
  pass: number;
  latest: string;
};

function AccountTable({
  number,
  img,
  name,
  group,
  score,
  pass,
  latest,
  id,
}: AccountTableProps) {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      {number === 1 ? (
        <div className="text-black grid grid-cols-[repeat(16,minmax(0,1fr))] w-full h-[84px] my-2 rounded-md bg-[#EBD7A3] ">
          <div className="text-black flex justify-start items-center col-span-1 p-[0rem_1rem]">
            {number}
          </div>
          <div
            className="text-black flex justify-start items-center col-span-4 p-[0.4rem_0.6rem]
            leading-[2rem] overflow-y-scroll hide-scrollbar text-[16px] relative"
          >
            <img
              src={CrownIcon}
              alt="รูป"
              className="absolute top-1 left-0"
            />
            <img
              src={img}
              alt="รูป"
              className="text-black bg-white rounded-[100%] h-9 w-9 object-cover object-center mr-6"
            />
            {name}
          </div>
          <div
            className="text-black flex justify-start items-center col-span-3 p-[0.4rem_0.6rem]
            leading-[2rem] overflow-y-scroll hide-scrollbar"
          >
            {group}
          </div>
          <div className="text-black flex justify-start items-center col-span-3 p-[0rem_0.6rem]">
            {score}
          </div>
          <div className="text-black flex justify-start items-center col-span-3 p-[0rem_0.6rem]">
            {pass}
          </div>
          <div className="text-black flex justify-start items-center col-span-2 pr-[1rem] ">
            {latest}
          </div>
        </div>
      ) : (
        <>
          <div className={`text-black grid grid-cols-[repeat(16,minmax(0,1fr))] w-full h-[72px] rounded-md ${user?.id === id ? "bg-jenna" : "bg-stone01"}`}>
            <div className="text-black flex justify-start items-center col-span-1 p-[0rem_1rem]">
              {number}
            </div>
            <div
              className="text-black flex justify-start items-center col-span-4 p-[0.4rem_0.6rem]
            leading-[2rem] overflow-y-scroll hide-scrollbar text-[16px]"
            >
              <img
                src={img}
                alt="รูป"
                className="text-black bg-white rounded-[100%] w-9 h-9 object-cover object-center mr-6 overflow-hidden"
              />
              {name}
            </div>
            <div
              className="text-black flex justify-start items-center col-span-3 p-[0.4rem_0.6rem]
            leading-[2rem] overflow-y-scroll hide-scrollbar"
            >
              {group}
            </div>
            <div className="text-black flex justify-start items-center col-span-3 p-[0rem_0.6rem]">
              {score}
            </div>
            <div className="text-black flex justify-start items-center col-span-3 p-[0rem_0.6rem]">
              {pass}
            </div>
            <div className="text-black flex justify-start items-center col-span-2  pr-[1rem] ">
              {latest}
            </div>
          </div>
          <hr />
        </>
      )}
    </>
  );
}

export default AccountTable;
