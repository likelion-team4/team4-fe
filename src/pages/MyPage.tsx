import React from "react";
import BadgeListRow from "../components/BadgeListRow";
import VisitCountRow from "../components/VisitCountRow";
import profileImage from "../assets/profile.png";

const MyPage: React.FC = () => {
  const userName = "사용자";
  const visits = 10;

  return (
    <div className="mx-auto w-full max-w-[480px] px-6 pt-10">
      {/* 상단 사용자 정보 */}
      <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
        <div className="mx-auto h-32 w-32 overflow-hidden rounded-full">
          <img src={profileImage} alt="사용자 프로필" className="h-full w-full object-cover" />
        </div>
        <h1 className="text-[22px] font-extrabold text-black">{userName}</h1>
      </div>      

      <section className="mt-8 flex flex-col gap-4 items-stretch w-full">
        <BadgeListRow onClick={() => console.log("뱃지 목록으로 이동")} />
        <VisitCountRow count={visits} />
      </section>
    </div>
  );
};

export default MyPage;