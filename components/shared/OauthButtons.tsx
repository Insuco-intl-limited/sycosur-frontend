"use client";

import { GoogleLogin } from "@/utils";
import OauthButton from "@/components/shared/OauthButtton";
import Image from "next/image";
import logo  from "@/app/insuco.png"

export default function OauthButtons() {
	return (
		<div className="mb-3 flex items-center justify-between gap-2">
			<OauthButton provider="google" onClick={GoogleLogin}>
				  <Image src={logo} alt="App icon" width={20} height={20} className="mr-2" />
  					Continue with Insuco Workspace
			</OauthButton>
		</div>
	);
}