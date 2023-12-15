import Image from "next/image";

const SideBar = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="h-[50px] w-[50px] relative rounded-[50%] overflow-hidden">
          <Image
            src={"/images/people.jpg"}
            alt="profile"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="font-bold">Jhon Doe</h1>
      </div>

      <main className="w-full">
        <ul className="flex flex-col gap-4 font-bold w-full items-center">
          <li className="min-h-[30px] text-[#5c5c5c] cursor-pointer">
            <span>
              <i className="fa-solid fa-house w-[15px] mr-1"></i>
            </span>
            All Tasks
          </li>
          <li>
            <span>
              <i className="fa-solid fa-list w-[20px] mr-1"></i>
            </span>
            Important
          </li>
          <li>
            <span>
              <i className="fa-solid fa-check w-[20px] mr-1"></i>
            </span>
            Completed
          </li>
          <li>
            <span>
              <i className="fa-solid fa-clipboard w-[20px] mr-1"></i>
            </span>
            Do it Now
          </li>
        </ul>
      </main>

      <button className="font-bold text-[18px]">
        <span>
          <i className="fa-solid fa-arrow-right-from-bracket w-[20px] mr-1"></i>
        </span>
        Sign Out
      </button>
    </div>
  );
};

export default SideBar;
