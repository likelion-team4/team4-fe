import React from "react";
import { useNavigate } from "react-router-dom"; 
import BadgeListRow from "../components/my/BadgeListRow";
import VisitCountRow from "../components/my/VisitCountRow";
import profileImage from "../assets/profile.png";

const MyPage: React.FC = () => {
  const userName = "사용자";
  const visits = 10;
  const navigate = useNavigate();              

  return (
    <div className="w-full max-w-[720px] px-6 pt-10 mx-auto">
      {/* 상단 사용자 정보 */}
      <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
        <div className="mx-auto h-32 w-32 overflow-hidden rounded-full">
          <img
            src={profileImage}
            alt="사용자 프로필"
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="text-[22px] font-extrabold text-black">{userName}</h1>
      </div>

      {/* 리스트 영역 */}
      <section className="mt-8 flex w-full flex-col items-stretch gap-4 text-left">
        <BadgeListRow onClick={() => navigate("/badges")} /> 
        <VisitCountRow count={visits} />
      </section>
    </div>
  );
};

export default MyPage;