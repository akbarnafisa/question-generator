import Link from "next/link";
import { Profile } from "~/app/home/profile";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <nav className="fixed top-0 z-20 w-full rounded-b border-b bg-white py-2">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link className="flex items-center" href="/">
          <svg
            width="24"
            height="23"
            viewBox="0 0 24 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.74835 8.01919C3.95297 8.01334 4.15593 8.05783 4.33934 8.14872L6.09614 9.16475C6.26285 9.28159 6.40212 9.43338 6.50417 9.60955C6.60626 9.78573 6.6687 9.98204 6.68713 10.1848V12.2088C6.66814 12.4114 6.6055 12.6075 6.50348 12.7836C6.40146 12.9597 6.26247 13.1116 6.09614 13.2288L4.33934 14.2449C4.15551 14.3342 3.95263 14.3773 3.74835 14.3704C3.54529 14.3783 3.34348 14.3352 3.16139 14.2449L1.40056 13.2288C1.23423 13.1116 1.09527 12.9597 0.993252 12.7836C0.8912 12.6075 0.828556 12.4114 0.809565 12.2088V10.1848C0.828035 9.98204 0.890435 9.78573 0.992522 9.60955C1.09457 9.43338 1.23384 9.28159 1.40056 9.16475L3.16139 8.14872C3.3431 8.05703 3.54494 8.01251 3.74835 8.01919ZM3.74835 7.20962C3.40282 7.20322 3.06139 7.28548 2.75663 7.44844L0.995791 8.47661C0.706748 8.66545 0.466122 8.91946 0.293148 9.21825C0.120209 9.51706 0.0197913 9.8523 0 10.197V12.2209C0.0197913 12.5656 0.120209 12.9008 0.293148 13.1996C0.466122 13.4984 0.706748 13.7524 0.995791 13.9413L2.75663 14.9573C3.06177 15.1189 3.40317 15.1997 3.74835 15.1921C4.09482 15.1995 4.43746 15.1187 4.74414 14.9573L6.50094 13.9413C6.78995 13.7524 7.03061 13.4984 7.20355 13.1996C7.37652 12.9008 7.47691 12.5656 7.4967 12.2209V10.197C7.47691 9.8523 7.37652 9.51706 7.20355 9.21825C7.03061 8.91946 6.78995 8.66545 6.50094 8.47661L4.74414 7.46058C4.43777 7.29793 4.09513 7.21578 3.74835 7.22176V7.20962Z"
              fill="#414042"
            />
            <path
              d="M12.002 8.01921C12.2053 8.0134 12.407 8.05789 12.5889 8.14874L14.3498 9.16478C14.5154 9.28245 14.6536 9.43452 14.7549 9.61059C14.8562 9.78666 14.9182 9.98255 14.9367 10.1848V12.2088C14.9177 12.4109 14.8554 12.6067 14.7542 12.7827C14.6529 12.9587 14.515 13.1108 14.3498 13.2289L12.5889 14.2449C12.4065 14.3342 12.205 14.3773 12.002 14.3704C11.7977 14.3773 11.5949 14.3342 11.411 14.2449L9.65019 13.2289C9.48497 13.1108 9.34702 12.9587 9.24577 12.7827C9.14452 12.6067 9.08226 12.4109 9.06323 12.2088V10.1848C9.08174 9.98255 9.14375 9.78666 9.24508 9.61059C9.34636 9.43452 9.48459 9.28245 9.65019 9.16478L11.411 8.14874C11.5944 8.05786 11.7974 8.01337 12.002 8.01921ZM12.002 7.20965C11.6552 7.20367 11.3126 7.28586 11.0062 7.44847L9.24539 8.47664C8.9569 8.66568 8.71687 8.91984 8.54459 9.21866C8.37235 9.51747 8.27266 9.8526 8.25363 10.197V12.221C8.27266 12.5653 8.37235 12.9005 8.54459 13.1993C8.71687 13.4981 8.9569 13.7523 9.24539 13.9413L11.0062 14.9573C11.3129 15.1187 11.6555 15.1995 12.002 15.1921C12.3472 15.1997 12.6886 15.1189 12.9937 14.9573L14.7546 13.9413C15.0431 13.7523 15.2831 13.4981 15.4554 13.1993C15.6276 12.9005 15.7273 12.5653 15.7463 12.221V10.197C15.7273 9.8526 15.6276 9.51747 15.4554 9.21866C15.2831 8.91984 15.0431 8.66568 14.7546 8.47664L12.9937 7.4606C12.689 7.29765 12.3475 7.21542 12.002 7.22179V7.20965Z"
              fill="#414042"
            />
            <path
              d="M20.2516 8.01919C20.4563 8.01334 20.6592 8.05783 20.8426 8.14872L22.5994 9.16475C22.7662 9.28159 22.9054 9.43338 23.0075 9.60955C23.1096 9.78573 23.172 9.98204 23.1904 10.1848V12.2088C23.1715 12.4114 23.1088 12.6075 23.0068 12.7836C22.9048 12.9597 22.7658 13.1116 22.5994 13.2288L20.8426 14.2449C20.6588 14.3342 20.4559 14.3773 20.2516 14.3704C20.0486 14.3783 19.8468 14.3352 19.6647 14.2449L17.9039 13.2288C17.7375 13.1116 17.5986 12.9597 17.4965 12.7836C17.3945 12.6075 17.3319 12.4114 17.3129 12.2088V10.1848C17.3313 9.98204 17.3938 9.78573 17.4958 9.60955C17.5979 9.43338 17.7371 9.28159 17.9039 9.16475L19.6647 8.14872C19.8464 8.05703 20.0482 8.01251 20.2516 8.01919ZM20.2516 7.20962C19.9061 7.20322 19.5647 7.28548 19.2599 7.44844L17.4991 8.47661C17.2101 8.66545 16.9694 8.91946 16.7964 9.21825C16.6235 9.51706 16.5231 9.8523 16.5033 10.197V12.2209C16.5231 12.5656 16.6235 12.9008 16.7964 13.1996C16.9694 13.4984 17.2101 13.7524 17.4991 13.9413L19.2599 14.9573C19.5651 15.1189 19.9065 15.1997 20.2516 15.1921C20.5981 15.1995 20.9408 15.1187 21.2474 14.9573L23.0042 13.9413C23.2932 13.7524 23.5339 13.4984 23.7069 13.1996C23.8798 12.9008 23.9802 12.5656 24 12.2209V10.197C23.9802 9.8523 23.8798 9.51706 23.7069 9.21825C23.5339 8.91946 23.2932 8.66545 23.0042 8.47661L21.2474 7.46058C20.9411 7.29793 20.5985 7.21578 20.2516 7.22176V7.20962Z"
              fill="#414042"
            />
            <path
              d="M7.87315 15.2285C8.07917 15.2217 8.28365 15.2662 8.46821 15.3581L10.229 16.3741C10.3946 16.4918 10.5328 16.6438 10.6341 16.8199C10.7354 16.996 10.7975 17.1919 10.816 17.3942V19.4181C10.7965 19.6202 10.734 19.8157 10.6328 19.9916C10.5315 20.1675 10.3939 20.3198 10.229 20.4382L8.46821 21.4623C8.28285 21.545 8.08219 21.5878 7.87924 21.5878C7.67628 21.5878 7.47558 21.545 7.29026 21.4623L5.52943 20.4463C5.36459 20.3279 5.22692 20.1756 5.1257 19.9997C5.02449 19.8237 4.96202 19.6282 4.94247 19.4262V17.4023C4.96097 17.2 5.02303 17.0041 5.12431 16.828C5.22563 16.6519 5.36383 16.4999 5.52943 16.3822L7.29026 15.3662C7.47224 15.2753 7.67388 15.2308 7.87722 15.2366L7.87315 15.2285ZM7.87722 14.4271C7.532 14.4195 7.19061 14.5003 6.88546 14.6619L5.12463 15.6779C4.83607 15.8678 4.59603 16.1227 4.42379 16.4222C4.25158 16.7216 4.15193 17.0573 4.1329 17.4023V19.4262C4.15224 19.7705 4.25203 20.1055 4.42424 20.4043C4.59649 20.703 4.83638 20.9573 5.12463 21.1466L6.88546 22.1626C7.19061 22.3242 7.532 22.405 7.87722 22.3974C8.22365 22.4048 8.56633 22.324 8.87297 22.1626L10.6338 21.1466C10.9221 20.9573 11.162 20.703 11.3342 20.4043C11.5064 20.1055 11.6062 19.7705 11.6256 19.4262V17.4023C11.6065 17.0573 11.5069 16.7216 11.3347 16.4222C11.1624 16.1227 10.9224 15.8678 10.6338 15.6779L8.87297 14.6538C8.56633 14.4924 8.22365 14.4116 7.87722 14.419V14.4271Z"
              fill="#414042"
            />
            <path
              d="M16.1268 15.2285C16.3303 15.2218 16.5321 15.2663 16.7138 15.358L18.4746 16.374C18.6414 16.4909 18.7806 16.6427 18.8827 16.8189C18.9847 16.995 19.0472 17.1914 19.0656 17.3941V19.4181C19.0461 19.6206 18.9832 19.8165 18.8813 19.9925C18.7793 20.1685 18.6406 20.3205 18.4746 20.4381L16.7138 21.4541C16.5309 21.5421 16.3297 21.5851 16.1268 21.5796C15.9228 21.5845 15.7204 21.5415 15.5359 21.4541L13.7791 20.4381C13.6131 20.3205 13.4744 20.1685 13.3724 19.9925C13.2704 19.8165 13.2076 19.6206 13.1881 19.4181V17.3941C13.2065 17.1914 13.2689 16.995 13.371 16.8189C13.4731 16.6427 13.6123 16.4909 13.7791 16.374L15.5359 15.358C15.7193 15.2671 15.9222 15.2227 16.1268 15.2285ZM16.1268 14.4189C15.7804 14.4115 15.4377 14.4923 15.1311 14.6537L13.3743 15.6697C13.0852 15.8594 12.8445 16.1142 12.6716 16.4137C12.4987 16.7131 12.3983 17.0489 12.3785 17.3941V19.4181C12.3986 19.7627 12.4991 20.0978 12.6721 20.3965C12.845 20.6953 13.0855 20.9493 13.3743 21.1384L15.1311 22.1544C15.4377 22.3158 15.7804 22.3966 16.1268 22.3892C16.472 22.3968 16.8134 22.316 17.1186 22.1544L18.8794 21.1384C19.1682 20.9493 19.4087 20.6953 19.5816 20.3965C19.7546 20.0978 19.8551 19.7627 19.8752 19.4181V17.3941C19.8554 17.0489 19.755 16.7131 19.5821 16.4137C19.4092 16.1142 19.1685 15.8594 18.8794 15.6697L17.1186 14.6537C16.8134 14.4921 16.472 14.4113 16.1268 14.4189Z"
              fill="#414042"
            />
            <path
              d="M7.87322 0.809893C8.07788 0.803736 8.28091 0.848224 8.46421 0.939424L10.225 1.95546C10.3906 2.07313 10.5288 2.2252 10.6302 2.40127C10.7314 2.57734 10.7935 2.77323 10.812 2.97553V4.99946C10.793 5.20162 10.7307 5.39734 10.6294 5.57334C10.5282 5.74934 10.3903 5.90151 10.225 6.01953L8.46824 7.04367C8.28292 7.12638 8.08223 7.16913 7.87927 7.16913C7.67631 7.16913 7.47565 7.12638 7.29033 7.04367L5.52543 6.04788C5.36021 5.92986 5.2223 5.77769 5.12104 5.60169C5.01976 5.42569 4.9575 5.22996 4.93847 5.02781V3.00384C4.95698 2.80155 5.01903 2.60568 5.12031 2.42961C5.22164 2.25355 5.35983 2.10144 5.52543 1.98381L7.28626 0.967771C7.46825 0.876919 7.66988 0.832398 7.87322 0.838241V0.809893ZM7.87322 0.0286758C7.52765 0.0222758 7.18626 0.104502 6.8815 0.267459L5.12063 1.28349C4.83214 1.47254 4.59211 1.72673 4.41986 2.02554C4.24758 2.32436 4.14793 2.65946 4.12891 3.00384V5.02781C4.14793 5.37219 4.24758 5.70732 4.41986 6.00614C4.59211 6.30495 4.83214 6.55911 5.12063 6.74816L6.8815 7.76419C7.18661 7.92575 7.52804 8.00659 7.87322 7.99897C8.21969 8.00638 8.56233 7.92558 8.86901 7.76419L10.6298 6.74816C10.9183 6.55911 11.1584 6.30495 11.3306 6.00614C11.5029 5.70732 11.6025 5.37219 11.6216 5.02781V3.00384C11.6025 2.65946 11.5029 2.32436 11.3306 2.02554C11.1584 1.72673 10.9183 1.47254 10.6298 1.28349L8.87304 0.239145C8.56668 0.0765362 8.22407 -0.00565498 7.87725 0.000327633L7.87322 0.0286758Z"
              fill="#414042"
            />
            <path
              d="M16.1268 0.809894C16.3303 0.803181 16.5321 0.847738 16.7138 0.939425L18.4746 1.95542C18.6414 2.07229 18.7806 2.22409 18.8827 2.40026C18.9847 2.57643 19.0472 2.77275 19.0656 2.97549V4.99946C19.0467 5.20207 18.984 5.39821 18.882 5.57428C18.7799 5.75038 18.641 5.90228 18.4746 6.01953L16.7138 7.03556C16.5317 7.12583 16.3299 7.16899 16.1268 7.16103C15.9226 7.16795 15.7197 7.12489 15.5359 7.03556L13.7791 6.04788C13.6127 5.93063 13.4738 5.77873 13.3717 5.60262C13.2697 5.42652 13.207 5.23042 13.1881 5.02777V3.00384C13.2065 2.80106 13.2689 2.60478 13.371 2.42861C13.4731 2.25243 13.6123 2.10064 13.7791 1.98377L15.5359 0.967737C15.7193 0.87685 15.9222 0.832399 16.1268 0.838207V0.809894ZM16.1268 0.0286409C15.78 0.0226583 15.4374 0.104816 15.1311 0.26746L13.3743 1.28346C13.0853 1.47233 12.8446 1.72638 12.6717 2.02516C12.4987 2.32395 12.3983 2.65915 12.3785 3.00384V5.02777C12.3983 5.37247 12.4987 5.70767 12.6717 6.00649C12.8446 6.30527 13.0853 6.55929 13.3743 6.74816L15.1311 7.76416C15.4377 7.92558 15.7804 8.00638 16.1268 7.99894C16.472 8.00656 16.8134 7.92576 17.1186 7.76416L18.8794 6.74816C19.1684 6.55929 19.4091 6.30527 19.5821 6.00649C19.755 5.70767 19.8554 5.37247 19.8752 5.02777V3.00384C19.8554 2.65915 19.755 2.32395 19.5821 2.02516C19.4091 1.72638 19.1684 1.47233 18.8794 1.28346L17.1186 0.26746C16.8138 0.104468 16.4724 0.0222757 16.1268 0.0286409Z"
              fill="#414042"
            />
          </svg>
        </Link>

        <div className="w-auto" id="navbar-default">
          {session ? (
            <Profile />
          ) : (
            <Link href="/api/auth/signin">
              {" "}
              <Button size="sm">Login</Button>{" "}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
